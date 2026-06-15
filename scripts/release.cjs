const inquirer = require('inquirer')
const semver = require('semver')
const { execSync } = require('child_process')
const fs = require('fs')

const currentVersion = require('../package.json').version

/**
 * 检查 gh CLI 是否可用且已登录
 * @returns {boolean} true 表示 gh 已安装且已登录
 */
function checkGhAuth() {
  // 1. 检查 gh 是否存在
  try {
    execSync('gh --version', { stdio: 'ignore' })
  } catch (e) {
    console.log('⚠️ GitHub CLI (gh) 命令未找到')
    console.log('💡 提示: 安装GitHub CLI可简化此流程: https://cli.github.com/')
    return false
  }

  // 2. 检查 gh 登录状态
  try {
    execSync('gh auth status', { stdio: 'ignore' })
    return true
  } catch (e) {
    console.log('⚠️ GitHub CLI (gh) 未登录，无法创建 PR 和 Release')
    console.log('🔐 请先执行 gh auth login 登录 GitHub 账号')
    console.log('💡 也可设置 GITHUB_TOKEN 环境变量: export GITHUB_TOKEN=ghp_xxxx')
    return false
  }
}

/**
 * 在 gh 未就绪时给出手动创建 PR 的指引
 */
function printManualPRGuide(releaseBranch, newVersion) {
  console.log('🔗 请手动在GitHub上创建Pull Request:')
  console.log(`   - 从分支: ${releaseBranch}`)
  console.log(`   - 到分支: master`)
  console.log(`   - 标题: Release v${newVersion}`)
  console.log(`   - 描述: Release version ${newVersion}`)
}

/**
 * 在 gh 未就绪时给出手动创建 Release 的指引
 */
function printManualReleaseGuide(tagName, isPrerelease) {
  console.log('🔗 请手动在GitHub上创建Release:')
  console.log(`   - 标签: ${tagName}`)
  console.log(`   - 标题: ${tagName}`)
  console.log(`   - 描述: 请从CHANGELOG.md中复制最新的变更日志`)
  if (isPrerelease) {
    console.log(`   - 勾选 "This is a pre-release"`)
  }
}

async function release() {
  // 保存初始状态，用于错误处理时恢复
  let currentBranch = null
  let releaseBranch = null

  try {
    console.log(`Current version: ${currentVersion}`)

    const { releaseType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'releaseType',
        message: 'Select release type:',
        choices: ['stable', 'dev']
      }
    ])

    const { versionType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'versionType',
        message: 'Select version type:',
        choices:
          releaseType === 'stable'
            ? ['patch', 'minor', 'major']
            : ['prepatch', 'preminor', 'premajor', 'prerelease']
      }
    ])

    let newVersion
    if (releaseType === 'stable') {
      newVersion = semver.inc(currentVersion, versionType)
    } else {
      newVersion = semver.inc(currentVersion, versionType, 'beta')
    }

    // 保存当前分支名称，以便在出错时能回到原分支
    currentBranch = execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim()

    // 创建release分支（如果已存在则删除）
    releaseBranch = `release/v${newVersion}`
    try {
      // 检查分支是否已存在
      execSync(`git rev-parse --verify ${releaseBranch}`, { stdio: 'ignore' })
      console.log(`分支 ${releaseBranch} 已存在，正在删除...`)
      execSync(`git branch -D ${releaseBranch}`)
    } catch (e) {
      // 分支不存在，这是预期行为
    }

    console.log(`创建并切换到发布分支: ${releaseBranch}`)
    execSync(`git checkout -b ${releaseBranch}`)

    // 更新版本号
    console.log(`更新版本号至 ${newVersion}`)
    execSync(`npm version ${newVersion} --no-git-tag-version`)

    // 生成变更日志
    console.log('生成变更日志...')
    execSync('npm run changelog')

    // 提交更改
    console.log('提交更改...')
    execSync('git add .')
    execSync(`git commit -m "chore: release v${newVersion}"`)

    // 创建标签
    console.log(`创建标签: v${newVersion}`)
    const tagName = `v${newVersion}`
    try {
      // 检查标签是否已存在
      execSync(`git rev-parse -q --verify "refs/tags/${tagName}"`, { stdio: 'ignore' })
      // 如果没有抛出异常，说明标签已存在，抛出错误
      throw new Error(`标签 ${tagName} 已存在，请选择不同的版本号或手动处理冲突`)
    } catch (e) {
      // 如果是我们自己抛出的错误，直接传递
      if (e.message && e.message.includes('标签已存在')) {
        throw e;
      }
      // 标签不存在，这是预期行为，可以创建新标签
    }
    execSync(`git tag ${tagName}`)

    // 推送到远程分支
    console.log(`推送发布分支到远程: ${releaseBranch}`)
    execSync(`git push -f origin ${releaseBranch}`)

    // 推送标签到远程
    console.log('推送标签到远程...')
    execSync('git push -f origin --tags')

    // --- gh 登录状态检查（在创建 PR 和 Release 之前） ---
    const ghReady = checkGhAuth()

    if (ghReady) {
      // 创建Pull Request到master分支
      console.log('创建Pull Request到master分支...')
      try {
        const prOutput = execSync(`gh pr create \
        --title "Release v${newVersion}" \
        --body "Release version ${newVersion}" \
        --base master \
        --head ${releaseBranch}`).toString()
        console.log(prOutput)
      } catch (e) {
        console.error('创建PR时出错:', e.message)
        printManualPRGuide(releaseBranch, newVersion)
      }

      // 创建 GitHub Release
      console.log('创建GitHub Release...')
      try {
        // 尝试读取变更日志
        const releaseNotes = fs
          .readFileSync('CHANGELOG.md', 'utf-8')
          .split('\n')
          .slice(0, 20)
          .join('\n')
        const isPrerelease = releaseType === 'dev'

        // 创建新的release
        execSync(`gh release create ${tagName} \
        --title "${tagName}" \
        --notes "${releaseNotes}" \
        ${isPrerelease ? '--prerelease' : ''}`)
      } catch (error) {
        console.error('创建GitHub Release时出错:', error.message)
        const isPrerelease = releaseType === 'dev'
        printManualReleaseGuide(tagName, isPrerelease)
      }
    } else {
      // gh 未就绪，打印手动指引
      printManualPRGuide(releaseBranch, newVersion)
      const isPrerelease = releaseType === 'dev'
      printManualReleaseGuide(tagName, isPrerelease)
    }

    // 切换回原分支
    console.log(`切换回原分支: ${currentBranch}`)
    execSync(`git checkout ${currentBranch}`)

    console.log(`🎉 成功发布版本: ${newVersion}`)
    if (ghReady) {
      console.log(`✅ Pull Request已创建，等待审核合并到master分支`)
      console.log(`📝 请手动检查并合并Pull Request, https://github.com/mastergo-design/plugin-typings/pulls`)
    } else {
      console.log('📝 请手动创建 PR 和 Release（见上方指引）')
    }
  } catch (error) {
    console.error('\n❌ 发布过程中出错:', error.message)

    // 清理和恢复操作
    try {
      // 如果创建了release分支，尝试删除
      if (releaseBranch) {
        console.log(`\n🔄 正在清理资源...`)
        // 确保先回到当前分支
        if (currentBranch) {
          try {
            execSync(`git checkout ${currentBranch}`, { stdio: 'ignore' })
          } catch (e) {
            // 忽略切换分支错误
          }
        }
        // 删除临时的release分支
        try {
          execSync(`git branch -D ${releaseBranch}`, { stdio: 'ignore' })
          console.log(`  - 已删除本地发布分支: ${releaseBranch}`)
        } catch (e) {
          // 忽略删除分支错误
        }
      }

      console.log('\n💡 请手动检查发布状态并解决问题后重试')
    } catch (cleanupError) {
      // 清理操作失败，仅记录日志
      console.error('清理过程中出错:', cleanupError.message)
    }

    // 重新抛出原始错误
    throw error
  }
}

release().catch(console.error)

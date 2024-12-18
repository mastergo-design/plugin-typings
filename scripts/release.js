const inquirer = require('inquirer');
const semver = require('semver');
const { execSync } = require('child_process');
const fs = require('fs');

const currentVersion = require('../package.json').version;

async function release() {
  console.log(`Current version: ${currentVersion}`);

  const { releaseType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'releaseType',
      message: 'Select release type:',
      choices: ['stable', 'dev']
    }
  ]);

  const { versionType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'versionType',
      message: 'Select version type:',
      choices: releaseType === 'stable' 
        ? ['patch', 'minor', 'major']
        : ['prepatch', 'preminor', 'premajor', 'prerelease']
    }
  ]);

  let newVersion;
  if (releaseType === 'stable') {
    newVersion = semver.inc(currentVersion, versionType);
  } else {
    newVersion = semver.inc(currentVersion, versionType, 'beta');
  }
  
  execSync(`npm version ${newVersion} --no-git-tag-version`);
  execSync('npm run changelog');
  
  execSync('git add .');
  execSync(`git commit -m "chore: release v${newVersion}"`);

  // 创建 tag
  const tagName = `v${newVersion}`;
  execSync(`git tag ${tagName}`);
  
  // 推送到远程
  execSync('git push origin main');
  execSync('git push origin --tags');

  // 创建 GitHub Release
  const releaseNotes = fs.readFileSync('CHANGELOG.md', 'utf-8').split('\n').slice(0, 20).join('\n');
  const isPrerelease = releaseType === 'dev';
  
  execSync(`gh release create ${tagName} \
    --title "${tagName}" \
    --notes "${releaseNotes}" \
    ${isPrerelease ? '--prerelease' : ''}`);
  
  console.log(`Successfully released version ${newVersion}`);
}

release().catch(console.error); 
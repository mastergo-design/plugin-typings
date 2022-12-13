## [1.10.2](https://github.com/mastergo-design/plugin-typings/compare/v1.10.0...v1.10.2) (2022-12-13)


### Features

* 添加mg.mixed ([8196894](https://github.com/mastergo-design/plugin-typings/commit/8196894b5ad35214319dc311a52e1c441e36bc35))
* 废弃teamLibrary, 换成getTeamLibraryAsync([ffecaa](https://github.com/mastergo-design/plugin-typings/commit/ffecaaf8fae47530e75b818a7918716b4170a984))


# [1.10.0](https://github.com/mastergo-design/plugin-typings/compare/v1.9.0...v1.10.0) (2022-12-01)


### Features

* 文字分段样式增加fontWeight字重字段 ([3619b51](https://github.com/mastergo-design/plugin-typings/commit/3619b518fcd8cbd137df5fa0387bc8162fb53940))
* 文字新增百分比行高 ([a560491](https://github.com/mastergo-design/plugin-typings/commit/a560491b9fb146184fdce13d48b6eb58be4b6949))



# [1.9.0](https://github.com/mastergo-design/plugin-typings/compare/v1.8.0...v1.9.0) (2022-11-24)


### Bug Fixes

* 修复ComponentPropertyDefinitions类型不清晰的问题 ([dd8ad00](https://github.com/mastergo-design/plugin-typings/commit/dd8ad0049e2edfe48c18118991f15f0f97b90f87))
* 修复variantProperties类型不清晰问题 ([1da5b1d](https://github.com/mastergo-design/plugin-typings/commit/1da5b1dc57f3ad8b2116523e03e62165084d0453))
* 移除BooleanOperationNode, ComponentSetNode, InstanceNode无效的appendChild, insertChild方法 ([c3da0cd](https://github.com/mastergo-design/plugin-typings/commit/c3da0cdc00eb37728f816a05dbcd81fb4dd256b6))


### Features

* 添加flatten和rescale接口 ([dc87721](https://github.com/mastergo-design/plugin-typings/commit/dc87721478c725285e3e903beab045c6f175360c))
* 图层新增翻转接口/新增findAllWithCriteria接口/全局创建组件和创建容器方法新增可选参数 ([a318458](https://github.com/mastergo-design/plugin-typings/commit/a318458714cadf0e1c16613c73b3d77f866a3b70))
* 新增setRangeTextStyleId设置分段文字样式 ([7cd5e9c](https://github.com/mastergo-design/plugin-typings/commit/7cd5e9c59cc54a63f2c0a22cf992dcce5b2184ea))
* 与group等接口统一类型 ([4107784](https://github.com/mastergo-design/plugin-typings/commit/410778431defb243d3cc3a191d5fb9790f5ea26e))
* textNode增加setRangeFillStyleId ([f03314b](https://github.com/mastergo-design/plugin-typings/commit/f03314b1e32eb9c327b31ac487dbcb3148781da4))



# [1.8.0](https://github.com/mastergo-design/plugin-typings/compare/v1.7.1...v1.8.0) (2022-11-18)


### Features

* 添加clientStorage的deleteAsync和keysAsync方法 ([481d020](https://github.com/mastergo-design/plugin-typings/commit/481d020c0d7816ebab85290b5b36437474f30761))



## [1.7.1](https://github.com/mastergo-design/plugin-typings/compare/v1.7.0...v1.7.1) (2022-11-16)



# [1.7.0](https://github.com/mastergo-design/plugin-typings/compare/v1.6.1...v1.7.0) (2022-11-11)


### Bug Fixes

* 删除PageNode不存在的pluginData相关接口 ([6bf26d0](https://github.com/mastergo-design/plugin-typings/commit/6bf26d0957859516e02b3a49b4ebae42fe2810f8))
* 修复Document findAll和findOne入参出参类型错误问题 ([4576d99](https://github.com/mastergo-design/plugin-typings/commit/4576d998fa9f2c65cd37587ec3f2ef11e1c23654))
* 修复DocumentNode类型错误问题 ([b34511e](https://github.com/mastergo-design/plugin-typings/commit/b34511ed489d9e20b78b6bc25de9d14f126b5ea6))
* 修复export接口返回类型错误问题 ([8760817](https://github.com/mastergo-design/plugin-typings/commit/87608176944225bc69e27587772b42bbde2ca246))


### Features

* 添加ShowUIOptions.x, ShowUIOption.y ([298e252](https://github.com/mastergo-design/plugin-typings/commit/298e252bfc655245d6829d7598dd54f8d52e92dd))
* 新增teamLibrary, importComponentByKeyAsync, importComponentSetByKeyAsync, importStyleByKeyAsync等团队库接口 ([8a59a5c](https://github.com/mastergo-design/plugin-typings/commit/8a59a5cc5991fe6b2e0a7b4626d355fc90070135))



# 1.6.1 (2022-11-09)


### Features

* viewport增加rulerVisible控制标识显示和layoutGridVisible控制布局网格展示
  增加resizeToFit()让容器图层缩放到和内容尺寸一致
  增加文字列表样式listStyle ([2d22357](https://github.com/mastergo-design/plugin-typings/commit/2d22357015b51c5f80efc33c8dcfbd32d1504cf2))



# [1.5.0] (2022-10-18)


### Features

* 添加command、run 

# [1.4.0] (2022-10-13)


### Features

* 调整changelog 
* 连接线增加bound 
* 限定master 
* 修复loadFontAsync的返回类型错误问题 
* 移除test 
* 增加锁定比例字段 
* 增加自动布局相关定义 
* 增加ignore 


# [1.3.0] (2022-09-30)


### Features

* 连接线增加bound 
* 修复loadFontAsync的返回类型错误问题 
* 增加锁定比例字段 
* 增加自动布局相关定义 

# [1.1.0] (2022-09-16)


### Bug Fixes

* 限制连接线的strokeAlign为center 
* 修复connector的strokeAlign可写的bug 


### Features

* 添加textcase类型 
* 完善连接点类型 
* 移除超链接,等待接入新版 
* 移除createText参数 
* 增加connector类型typings 



# [1.0.0] (2022-09-02)


### Bug Fixes

* 修复strokeStyle type错误问题 


### Features

* 补充lineNode strokeCap 
* 补充scaleMode 
* 更新package设置及readme 
* 整理npm包,移除工具函数 



# [1.0.0] (2022-09-02)


### Bug Fixes

* 修复strokeStyle type错误问题 


### Features

* 补充lineNode strokeCap 
* 补充scaleMode 
* 更新package设置及readme 
* 整理npm包,移除工具函数 



# [1.0.0] (2022-09-02)


### Bug Fixes

* 修复strokeStyle type错误问题 


### Features

* 补充lineNode strokeCap 
* 补充scaleMode 
* 更新package设置及readme 
* 整理npm包,移除工具函数 



# [1.1.0] (2022-09-02)


### Bug Fixes

* 修复strokeStyle type错误问题 


### Features

* 补充lineNode strokeCap 
* 补充scaleMode 
* 更新package设置及readme 
* 整理npm包,移除工具函数 



# [0.4.0] (2022-07-22)


### Bug Fixes

* 修复booleanoperation的type错误 


### Features

* 添加单边描边类型 
* 增加获取自定义样式列表接口 
* 增加document name 属性 



## [0.3.1] (2022-07-08)



# [0.3.0] (2022-07-08)



# [0.3.0] (2022-07-08)



# [0.2.0] (2022-07-01)



# [0.27.0] (2022-01-25)


### Features

* new mg api 



## [0.26.1] (2021-12-23)



# [0.26.0] (2021-12-23)


### Features

* 添加颜色转换函数 



## [0.25.1] (2021-12-23)



# [0.25.0] (2021-12-22)


### Features

* 添加 paint 工具函数 



# [0.24.0] (2021-12-21)


### Features

* add useAbsoluteBounds for ExportSettings 



## [0.23.1] (2021-12-21)


### Features

* add visible option for ShowUIOptions 
* update 



# [0.23.0] (2021-12-21)


### Features

* add relativeTransform 



## [0.22.1] (2021-12-20)



# [0.22.0] (2021-11-30)


### Bug Fixes

* change showUI interface 



# [0.21.0] (2021-11-17)


### Features

* add text superlink interfacee 



# [0.20.0] (2021-11-17)


### Bug Fixes

* fix notify 



# [0.19.0] (2021-11-17)


### Bug Fixes

* fix notify interface 



# [0.18.0] (2021-11-17)


### Bug Fixes

* remove useless imagePaint properties 



# [0.17.0] (2021-11-17)


### Features

* add image interface and createImage 



# [0.16.0] (2021-11-09)


### Bug Fixes

* setRangeTextDecoration 



# [0.15.0] (2021-11-09)


### Bug Fixes

* setRangeLineHeight 



# [0.14.0] (2021-11-09)


### Bug Fixes

* lineheight 



# [0.13.0] (2021-11-09)


### Bug Fixes

* range letterspacing 



# [0.12.0] (2021-11-09)


### Bug Fixes

* text setRangeFont 


### Features

* add removed 



# [0.22.0] (2021-11-30)

### Bug Fixes

- change showUI interface 

# [0.21.0] (2021-11-17)

### Features

- add text superlink interfacee 

# [0.20.0] (2021-11-17)

### Bug Fixes

- fix notify 

# [0.19.0] (2021-11-17)

### Bug Fixes

- fix notify interface 

# [0.18.0] (2021-11-17)

### Bug Fixes

- remove useless imagePaint properties 

# [0.17.0] (2021-11-17)

### Features

- add image interface and createImage 

# [0.16.0] (2021-11-09)

### Bug Fixes

- setRangeTextDecoration 

# [0.15.0] (2021-11-09)

### Bug Fixes

- setRangeLineHeight 

# [0.14.0] (2021-11-09)

### Bug Fixes

- lineheight 

# [0.13.0] (2021-11-09)

### Bug Fixes

- range letterspacing 

# [0.12.0] (2021-11-09)

### Bug Fixes

- text setRangeFont 

# [0.11.0] (2021-11-04)

### Features

- add removed 

# [0.10.0] (2021-11-02)

## [0.9.1] (2021-10-28)

### Features

- 补充组件与实例相关接口 

# [0.9.0] (2021-10-28)

### Features

- 文本节点相关接口类型 

## [0.8.1] (2021-10-27)

### Features

- 字体加载 api 

# [0.8.0] (2021-10-27)

### Features

- 添加 clone() 类型 

## [0.7.1] (2021-10-26)

### Bug Fixes

- BlurEffect 增加 blendMode 

# [0.7.0] (2021-10-26)

### Features

- 补充样式相关的 api 

## [0.6.1] (2021-10-18)

### Features

- 支持 flexGrow 和 alignSelf 

# [0.6.0] (2021-10-11)

### Features

- support ui.notify() & mastergo.saveVersionHistoryAsync 

# [0.5.0] (2021-10-09)

### Features

- auto layout 

## [0.4.9] (2021-09-28)

### Bug Fixes

- some tweak 

## [0.4.8] (2021-09-26)

### Bug Fixes

- export typings 

## [0.4.7] (2021-09-24)

### Bug Fixes

- rename bound to bounds 

## [0.4.6] (2021-09-24)

### Bug Fixes

- the type of ui.onmessage 

## [0.4.5] (2021-09-24)

### Bug Fixes

- tweak the type of ui.postMessage 

## [0.4.4] (2021-09-23)

### Bug Fixes

- the off type 
- types 

## [0.4.3] (2021-09-23)

### Bug Fixes

- PageNode's children should be SceneNode 

## [0.4.2] (2021-09-23)

### Bug Fixes

- tweak typings 

## [0.4.1] (2021-09-22)

### Bug Fixes

- upgrade layout mixin 

# [0.4.0] (2021-09-22)

### Features

- support children methods 

# [0.3.0] (2021-09-17)

### Features

- support some methods 

# [0.2.0] (2021-09-17)

### Bug Fixes

- concat dts 

# 0.1.0 (2021-09-17)

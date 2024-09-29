import type { Properties, PropertiesHyphen } from 'csstype';
import './mg-dsl'

declare global {
  namespace MGTMP {
    type RegExpString = string;
    type PseudoType = 'HOVER' | 'ACTIVE' | 'FOCUS' | 'DISABLED';
    /**
     * 工具类样式，如：.flex-1 { flex: 1 }
     * 通常为写死的样式，不会根据数据动态生成。当value与DSLToCode.StyleNode.value相同时，可以直接使用StyleRule.className作为DSLToCode.StyleNode.className
     */
    type UtilityStyle = {
      type: 'UTILITY';
      className: string;
      pseudo?: PseudoType;
      value: Properties & PropertiesHyphen;
    };
    /**
     * 配置类样式，如：.bg-color { background-color: var(--bg-color) },.bg-color:hover { background-color: var(--bg-color-hover) },
     * 根据token的值按配置规则动态生成的样式。
     */
    type ConfigStyle = {
      type: 'CONFIG';
      prefix: string;
      output: (token: string, tokenNameWithoutPrefix: string) => UtilityStyle[];
    };
    type StyleRule = UtilityStyle | ConfigStyle;
    type StyleTemplate = StyleRule[];
    /**
     * 组件属性类型
     */
    type ComponentPropType = {
      STRING: string;
      NUMBER: number;
      BOOLEAN: boolean;
      FUNCTION: string | MGDSL.MGLayerNode[];
      OBJECT: Record<string, MGDSL.ComponentPropValue<keyof ComponentPropType>>;
      ARRAY: MGDSL.ComponentPropValue<keyof ComponentPropType>[];
      SLOT: string | MGDSL.MGLayerNode[];
    };

    type GetValueType<T extends keyof ComponentPropType> = (
      nodeId: MGDSL.LayerId,
      nodeMap: Record<MGDSL.NodeId, MGDSL.MGNode>,
      componentId?: string,
    ) => {
      value: ComponentPropType[T] | undefined;
      nodeMap: Record<string, MGDSL.MGLayerNode>;
    };

    type ComponentPropItem<T extends keyof ComponentPropType> = {
      /**
       * 类型
       */
      type: T;
      /**
       * 默认值，也可作为初始值使用
       */
      defaultValue?: ComponentPropType[T];
      /**
       * 该方法内部需要bridge函数支持，不适合在配置模板中使用，请尽量少的使用该函数作判断
       */
      getValue?: GetValueType<T>;
      /**
       * 属性名，根据aliasName和originalName经过处理后的名称，用于最终的展示
       */
      name: string;
      /**
       * 属性别名
       */
      aliasName?: string;
      /**
       * 原始名称,区别于经过处理的name
       */
      originalName?: string;
      /**
       * 属性枚举值对应关系。一般和aliasName配合使用，根据画布图层的属性值，映射到代码中的属性值
       */
      aliasMap?: Record<string, ComponentPropType[T] | undefined>;
      /**
       * DSM属性枚举值对应关系
       */
      dsmAlias?: Record<string, string>;
      /**
       * 组件库解析时，是否将大写属性值转换为小写
       */
      lowerCase?: boolean;
      /**
       * 是否应用该属性
       * @param aliasName 对应画布图层属性名，当前当前仅支持属性名的判断
       * @param aliasMap 对应画布图层属性值
       */
      visible?: {
        aliasName: string;
        aliasMap?: Record<string, boolean>;
      };
    };
    /**
     * 组件属性类型
     * 泛型没有显式指定类型时，会被推断所有生命类型，起不到约束作用
     */
    type ComponentPropString = ComponentPropItem<'STRING'> & {
      /**
       * 如果是string，允许已某个图层的content作为值
       */
      nodePath?: SlotMatchType[];
    };
    type ComponentPropNumber = ComponentPropItem<'NUMBER'>;
    type ComponentPropBoolean = ComponentPropItem<'BOOLEAN'>;
    type ComponentPropFunction = ComponentPropItem<'FUNCTION'>;
    type ComponentPropObject = ComponentPropItem<'OBJECT'>;
    type ComponentPropArray = ComponentPropItem<'ARRAY'>;
    type ComponentPropInstance = ComponentPropItem<'SLOT'> & {
      /**
       * react的INSTANCE视为Vue的SLOT效果，故这里提供nodePath属性，继续遍历图层并以此图层为属性内容
       * 这里只能指向唯一图层才能向下遍历
       */
      nodePath?: SlotMatchType[];
      ignoreClass?: boolean;
    };
    /**
     * 组件的虚拟路径，如：'@/components/xxx.vue'
     * export default {} 为 DEFAULT
     * export const xxx = {} 为 xxx
     */
    type ComponentSource = {
      path: string;
      export: 'DEFAULT' | string;
    };
    /**
     * 组件属性
     * @param type 属性类型
     * @param name 属性名称
     * @param defaultValue 属性默认值
     * @param aliasName 对应设计系统的组件别名，如能匹配则根据别名生成代码
     */
    type ComponentProp =
      | ComponentPropString
      | ComponentPropNumber
      | ComponentPropBoolean
      | ComponentPropFunction
      | ComponentPropObject
      | ComponentPropArray
      | ComponentPropInstance;
    type ComponentData = {
      name: string;
      defaultValue: string | number | boolean;
      type: keyof ComponentPropType;
    };
    type ComponentProps = {
      name: string;
      originalName?: string;
      defaultValue?: string | number | boolean;
      type: keyof ComponentPropType;
    };
    type SlotMatchType = RegExpString | number;
    /**
     * 组件插槽
     * @param name 插槽名称
     * @param relateNodeNames 关联的节点名称
     */
    type ComponentSlot = {
      name: string;
      relateNodeNames: (SlotMatchType | SlotMatchType[])[];
      ignoreClass?: boolean;
    } & (
      | { type?: '' }
      | {
          type: 'TEXT';
        }
      | {
          type: 'CUSTOM';
          // 返回MGDSL数据，id可为空
          getValue: GetValueType<'SLOT'>;
        }
    );

    /**
     * 组件模板
     * @param name 组件名称
     * @param props 组件属性
     * @param source 组件的虚拟路径
     */
    type ComponentOrigin = {
      name: string;
      props: ComponentProp[];
      slots?: ComponentSlot[];
      source: ComponentSource;
      ignoreRect?: boolean;
    };
    type ComponentItem = ComponentOrigin & { id: string; matchName?: string };
    // 图标库
    type Icons = {
      /**
       * 组件名适配正则
       */
      reg: RegExpString;
      getValue: (node: MGDSL.MGLayerNode) => MGDSL.MGCustomNode;
    };

    type ComponentTemplate = {
      // 防止组件库解析，存储对应文件id
      documentId: string;
      // 暂时作为唯一标识
      name: string;
      /**
       * 组件导入类型
       * GLOBAL 全局引入
       * IMPORT esm引入
       */
      importType: 'GLOBAL' | 'IMPORT';
      importPath: {
        name: string;
        importName: string;
        path: string;
        type: 'script' | 'style';
      }[];
      framework: 'VUE2' | 'VUE3' | 'REACT';
      components: ComponentItem[];
      icons?: Icons;
    };
  }
}

export {};

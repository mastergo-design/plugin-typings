import './mg-dsl.d';
import './mg-comp-temp.d';

declare global {
  /**
   * @deprecated please use mg instead
   */
  const mastergo: PluginAPI

  const mg: PluginAPI
  const console: Console
  const __html__: string

  function setTimeout(callback: Function, timeout: number): number
  function clearTimeout(timeoutID: number): void
  function setInterval(callback: Function, timeout: number): number
  function clearInterval(timeoutID: number): void
  function requestAnimationFrame(cb: (ts: number) => void): number
  function cancelAnimationFrame(requestID: number): void

  interface Console {
    log(message?: any, ...optionalParams: any[]): void
    error(message?: any, ...optionalParams: any[]): void
    assert(condition?: boolean, message?: string, ...data: any[]): void
    info(message?: any, ...optionalParams: any[]): void
    warn(message?: any, ...optionalParams: any[]): void
    clear(): void
  }

  interface ConfirmAction {
    label: string
    type: 'confirm' | 'cancel'
    callback: () => void
  }

  interface PromptAction {
    label: string
    type: 'confirm' | 'cancel'
    callback: (value: string) => void
  }

  const confirm: (message: string, options: [ConfirmAction, ConfirmAction?]) => Promise<ConfirmAction['type']>
  const prompt: (message: string, defaultValue: string, options: [PromptAction, PromptAction?]) => Promise<[PromptAction['type'], string]>

  interface Image {
    readonly href: string
    getBytesAsync(): Promise<Uint8Array>
  }

  type GuardEventType = 'beforeReadyForDev'

  type PluginEventType =
    'selectionchange' | 'layoutchange' |
    'currentpagechange' | 'close' |
    'themechange' | 'drop' |
    'run' | 'readyForDev' | GuardEventType

  type ThemeColor = 'dark' | 'light'

  interface PluginAPI {
    readonly document: DocumentNode

    readonly ui: UIAPI

    readonly themeColor: ThemeColor

    readonly apiVersion: string

    readonly documentId: number

    readonly pluginId: number

    readonly command: string

    readonly mixed: string | symbol

    readonly clientStorage: ClientStorageAPI

    readonly currentUser: User | null

    readonly viewport: ViewportAPI

    /**
     * @note only available in devMode
     */
    readonly codegen?: CodegenAPI

    closePlugin(): void

    on(type: PluginEventType, callback: CallableFunction): void
    once(type: PluginEventType, callback: CallableFunction): void
    off(type?: PluginEventType, callback?: CallableFunction): void

    commitUndo(): void
    triggerUndo(): void

    showUI(html: string, options?: ShowUIOptions): void

    getNodeById(id: string): SceneNode | null
    getNodeByPosition(position: { x: number, y: number }): SceneNode | null
    createRectangle(): RectangleNode
    createLine(): LineNode
    createEllipse(): EllipseNode
    createPolygon(): PolygonNode
    createStar(): StarNode
    createPen(): PenNode
    createText(): TextNode
    createFrame(children?: SceneNode[]): FrameNode
    createComponent(children?: SceneNode[]): ComponentNode
    createSection(): SectionNode
    createPage(): PageNode
    createSlice(): SliceNode
    createConnector(): ConnectorNode
    createNodeFromSvgAsync(svg: string): Promise<FrameNode>

    combineAsVariants(nodes: ComponentNode[]): ComponentSetNode

    getHoverLayer(): PageNode | SceneNode

    /**
     * @deprecated
     * This function is deprecated, please use viewport.layoutGridVisible instead.
     */
    showGrid(show: boolean): void

    group(children: SceneNode[]): GroupNode
    union(children: SceneNode[]): BooleanOperationNode
    subtract(children: SceneNode[]): BooleanOperationNode
    intersect(children: SceneNode[]): BooleanOperationNode
    exclude(children: SceneNode[]): BooleanOperationNode
    flatten(nodes: SceneNode[]): PenNode | null

    saveVersionHistoryAsync(desc: string, title?: string): Promise<void>

    notify(message: string, options?: NotifyOptions): NotificationHandler

    getStyleById(id: string): Style | null
    getTitleByFontFamilyAndStyle(fontFamily: string, fontStyle: string): FontAlias | null
    createFillStyle(config: CreateStyleConfig): PaintStyle
    createStrokeStyle(config: CreateStyleConfig): PaintStyle
    createEffectStyle(config: CreateStyleConfig): EffectStyle
    createTextStyle(config: CreateStyleConfig): TextStyle
    createGridStyle(config: CreateStyleConfig): GridStyle

    createCornerRadiusStyle(config: CreateStyleConfig): CornerRadiusStyle
    createPaddingStyle(config: CreateStyleConfig): PaddingStyle
    createSpacingStyle(config: CreateStyleConfig): SpacingStyle
    createBorderStyle(config: CreateStyleConfig): BorderStyle

    createStyle<T extends StyleType>(name: string, type: T): StyleReturnType<T>
    createStyleCopy<T extends StyleType = StyleType>(sourceStyleId: string, name: string): StyleReturnType<T>
    createStyleRef<T extends StyleType = StyleType>(sourceStyleId: string, name: string): StyleReturnType<T>

    getLocalPaintStyles(): PaintStyle[]
    getLocalEffectStyles(): EffectStyle[]
    getLocalTextStyles(): TextStyle[]
    getLocalGridStyles(): GridStyle[]

    listAvailableFontsAsync(): Promise<Font[]>
    loadFontAsync(fontName: FontName): Promise<boolean>
    createImage(imageData: Uint8Array, isSync?: boolean): Promise<Image>
    getImageByHref(href: string): Image


    getTeamLibraryAsync(): Promise<TeamLibrary>,
    importComponentByKeyAsync(ukey: string): Promise<ComponentNode>,
    importComponentSetByKeyAsync(ukey: string): Promise<ComponentSetNode>,
    importStyleByKeyAsync(ukey: string): Promise<Style>,
    /**
     * @deprecated
     * 
     * This attribute is deprecated, please use getTeamLibraryAsync instead.
     */
    teamLibrary: TeamLibrary,

    hexToRGBA(hex: string): RGBA
    RGBAToHex(rgba: RGBA): string
  }

  interface User {
    id: string | null
    name: string | 'Anonymous'
    photoUrl: string | null
  }

  interface Rect extends Readonly<Bound> { }
  interface NotificationHandler {
    cancel: () => void
  }
  interface Layout {
    canvas: number
    leftbar: number
    rightbar: number
    window: number
  }

  interface PositionOnDom {
    width: number
    height: number
    x: number
    y: number
  }

  interface ViewportAPI {
    center: Vector
    zoom: number
    readonly bound: Rect
    /**
     * @deprecated
     */
    readonly layout: Layout
    readonly positionOnDom: PositionOnDom
    rulerVisible: boolean
    layoutGridVisible: boolean
    scrollAndZoomIntoView(nodes: SceneNode[]): void
  }

  interface ClientStorageAPI {
    getAsync(key: string): Promise<any | undefined>
    setAsync(key: string, value: any): Promise<void>
    deleteAsync(key: string): Promise<void>
    keysAsync(): Promise<string[]>
  }

  type ShowUIOptions = {
    width?: number
    height?: number
    visible?: boolean
    x?: number | string
    y?: number | string
  }

  interface ExportSettingsConstraints {
    type: 'SCALE' | 'WIDTH' | 'HEIGHT'
    value: number
  }

  interface ExportSettingsImage {
    readonly format: 'JPG' | 'PNG' | 'WEBP'
    readonly isSuffix?: boolean
    readonly fileName?: string
    readonly constraint?: ExportSettingsConstraints
    readonly useAbsoluteBounds?: boolean  // defaults to true
    readonly useRenderBounds?: boolean // default to true
  }
  interface ExportSettingsSVG {
    readonly format: 'SVG'
    readonly isSuffix?: boolean
    readonly fileName?: string
  }

  interface ExportSettingsPDF {
    readonly format: 'PDF'
    readonly isSuffix?: string
    readonly fileName?: string
    readonly useAbsoluteBounds?: boolean // defaults to true
    readonly useRenderBounds?: boolean // default to true
  }

  type ExportSettings = ExportSettingsImage | ExportSettingsSVG | ExportSettingsPDF


  interface ExportMixin {
    exportSettings: ReadonlyArray<ExportSettings>
    export(settings?: ExportSettings): Uint8Array | string // Defaults to PNG format
    exportAsync(settings?: ExportSettings): Promise<Uint8Array | string>
  }

  interface NotifyOptions {
    position?: 'top' | 'bottom'
    type?: 'normal' | 'highlight' | 'error' | 'warning' | 'success'
    timeout?: number
    isLoading?: boolean
  }

  interface UIViewport extends Bound {
    readonly headerHeight: number
    readonly visible: boolean
  }

  interface UIAPI {
    show(): void
    hide(): void
    close(): void
    resize(width: number, height: number): void
    moveTo(x: number, y: number): void
    viewport: UIViewport
    postMessage(pluginMessage: any, origin?: string): void
    onmessage: ((pluginMessage: any, origin: string) => void) | undefined
  }
  type PublishStatus = 'UNPUBLISHED' | 'CURRENT' | 'CHANGED'
  interface DocumentationLink {
    readonly uri: string
  }
  interface PublishableMixin {
    description: string
    documentationLinks: ReadonlyArray<DocumentationLink>
    /**
     * @description 组件或者组件集的别名
     */
    alias: string

    /**
     * @description 是否为团队库组件/样式
     */
    readonly isExternal: boolean
    readonly ukey: string
    readonly publishStatus: PublishStatus
  }

  // Styles

  type StyleType = 'PAINT' | 'TEXT' | 'EFFECT' | 'GRID' | 'STROKE' | 'CORNER_RADIUS' | 'PADDING' | 'SPACING'

  interface BaseStyle extends Omit<PublishableMixin, 'documentationLinks' | 'alias'> {
    readonly id: string
    readonly type: StyleType
    name: string
    remove(): void
  }

  interface PaintStyle extends BaseStyle {
    type: 'PAINT'
    paints: ReadonlyArray<Paint>
  }

  interface BorderStyle extends BaseStyle {
    type: 'STROKE'
    value: Stroke
  }

  interface CornerRadiusStyle extends BaseStyle {
    type: 'CORNER_RADIUS'
    value: CornerRadius
  }

  interface PaddingStyle extends BaseStyle {
    type: 'PADDING'
    value: Padding
  }

  interface SpacingStyle extends BaseStyle {
    type: 'SPACING'
    value: Spacing
  }

  interface NumValue {
    value: number
    unit: 'PIXELS' | 'PERCENT'
  }

  interface TextSegStyle {
    start: number
    end: number
    textStyleId: string
    textStyle: {
      fontName: FontName
      localizedFontName: FontName
      referrer: FontReferrer
      fontSize: number
      letterSpacing: LetterSpacing
      lineHeight: LineHeight
      lineHeightByPx: number
      textDecoration: TextDecoration
      textCase: TextCase
      fontWeight: number
    }
    fills: Paint[]
    fillStyleId: string
  }

  interface ListStyle {
    start: number
    end: number
    level: number
    type: 'ORDERED' | 'BULLETED' | 'NONE'
  }

  interface EffectStyle extends BaseStyle {
    type: 'EFFECT'
    effects: ReadonlyArray<Effect>
  }

  interface TextStyle extends BaseStyle {
    type: 'TEXT'
    decoration: TextDecoration
    fontSize: number
    letterSpacing: number
    letterSpacingUnit: NumValue['unit']
    textCase: TextCase
    lineHeight: LineHeight
    fontName: FontName
  }

  interface FontAlias {
    title: string
    subtitle: string
  }

  interface GridStyle extends BaseStyle {
    type: 'GRID'
    layoutGrids: ReadonlyArray<LayoutGrid>
  }

  type Style = PaintStyle | EffectStyle | TextStyle | GridStyle

  /// /////////////////////////////////////////////////////////////////////////////
  // Datatypes

  type Transform = [[number, number, number], [number, number, number]]

  interface Vector {
    readonly x: number
    readonly y: number
  }

  interface RGB {
    readonly r: number
    readonly g: number
    readonly b: number
  }

  interface RGBA {
    readonly r: number
    readonly g: number
    readonly b: number
    readonly a: number
  }

  interface FontName {
    readonly family: string
    readonly style: string
  }

  type TextCase = 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';

  type TextDecoration = 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH'

  interface ShadowEffect {
    readonly type: 'DROP_SHADOW' | 'INNER_SHADOW'
    readonly color: RGBA
    // Effect的 x, y;
    readonly offset: Vector
    readonly spread: number
    readonly radius: number
    readonly isVisible: boolean
    readonly blendMode: BlendMode
    readonly showShadowBehindNode: boolean
    readonly isEffectShow: boolean
  }

  interface BlurEffect {
    readonly type: 'LAYER_BLUR' | 'BACKGROUND_BLUR'
    readonly radius: number
    readonly isVisible: boolean
    readonly blendMode: BlendMode
  }

  type Effect = ShadowEffect | BlurEffect

  // 待确认
  type ConstraintType = 'START' | 'END' | 'STARTANDEND' | 'CENTER' | 'SCALE'

  interface Constraints {
    readonly horizontal: ConstraintType
    readonly vertical: ConstraintType
  }

  interface ColorStop {
    readonly position: number
    readonly color: RGBA
  }

  interface SolidPaint {
    readonly type: 'SOLID'
    readonly color: RGBA

    readonly isVisible?: boolean
    /**
     * It always be 1 when type is 'SOLID', please modify the alpha field in color instead.
     * 纯色模式下alpha始终为1, 请设置color中的alpha.
     */
    readonly alpha?: number
    readonly blendMode?: BlendMode
    readonly name?: string
  }

  interface GradientPaint {
    readonly type:
    | 'GRADIENT_LINEAR'
    | 'GRADIENT_RADIAL'
    | 'GRADIENT_ANGULAR'
    | 'GRADIENT_DIAMOND'
    readonly transform: Transform
    readonly gradientStops: ReadonlyArray<ColorStop>
    readonly gradientHandlePositions?: [{ x: number, y: number }, { x: number, y: number }];
    readonly isVisible?: boolean
    readonly alpha?: number
    readonly blendMode?: BlendMode
    readonly name?: string
  }

  interface ImageFilters {
    exposure?: number
    contrast?: number
    saturation?: number
    temperature?: number
    tint?: number
    highlights?: number
    shadows?: number
    hue?: number
  }

  interface ImagePaint {
    readonly type: 'IMAGE'
    readonly imageRef: string
    readonly scaleMode?: 'FILL' | 'TILE' | 'STRETCH' | 'FIT' | 'CROP'
    readonly filters?: ImageFilters

    readonly isVisible?: boolean
    readonly alpha?: number
    readonly blendMode?: BlendMode
    readonly name?: string
    readonly ratio?: number
    readonly rotation?: number
  }

  type Paint = SolidPaint | GradientPaint | ImagePaint

  type CSSWidthSetter = number | [number, number] | [number, number, number] | [number, number, number, number]

  interface Stroke {
    width: CSSWidthSetter,
  }

  interface Padding {
    padding: CSSWidthSetter,
  }

  interface Spacing {
    spacing: CSSWidthSetter,
  }

  interface CornerRadius {
    cornerRadius: CSSWidthSetter,
  }

  type WindingRule = 'Nonzero' | 'Evenodd'

  // 待确定
  interface VectorVertex {
    readonly x: number
    readonly y: number
    readonly strokeCap?: StrokeCap
    readonly cornerRadius?: number
  }

  // 待确定
  interface VectorRegion {
    readonly windingRule: WindingRule
    readonly loops: ReadonlyArray<VectorPaths>
  }

  interface VectorCtrl {
    x: number
    y: number
  }

  type LetterSpacing = {
    readonly value: number
    readonly unit: 'PIXELS' | 'PERCENT'
  }

  type LineHeight =
    | {
      readonly value: number
      readonly unit: 'PIXELS' | 'PERCENT'
    }
    | {
      readonly unit: 'AUTO'
    }

  type BlendMode =
    | 'NORMAL'
    | 'DARKEN'
    | 'MULTIPLY'
    | 'COLOR_BURN'
    | 'LIGHTEN'
    | 'SCREEN'
    | 'COLOR_DODGE'
    | 'OVERLAY'
    | 'SOFT_LIGHT'
    | 'HARD_LIGHT'
    | 'DIFFERENCE'
    | 'EXCLUSION'
    | 'HUE'
    | 'SATURATION'
    | 'COLOR'
    | 'LUMINOSITY'
    | 'PLUS_DARKER'
    | 'PLUS_LIGHTER'
    | 'PASS_THROUGH'

    type FontReferrer = 'team' | 'org' | 'local' | 'official'

  interface Font {
    fontName: FontName
    localizedFontName: FontName
    referrer: FontReferrer
  }

  /// /////////////////////////////////////////////////////////////////////////////
  // Mixins

  interface BaseNodeMixin {
    readonly id: string
    readonly parent: (BaseNode & ChildrenMixin) | null
    name: string
    removed: boolean
    remove(): void
    getPluginData(key: string): string
    setPluginData(key: string, value: string): void
    getPluginDataKeys(): string[]
    removePluginData(key: string): void
    clearPluginData(): void
    getSharedPluginData(namespace: string, key: string): string
    setSharedPluginData(namespace: string, key: string, value: string): void
    getSharedPluginDataKeys(namespace: string): string[]
    removeSharedPluginData(namespace: string, key: string): void
    clearSharedPluginData(namespace: string): void
  }

  interface SceneNodeMixin {
    isVisible: boolean
    isLocked: boolean
    readonly attachedConnectors: ConnectorNode[]
    componentPropertyReferences: {
      isVisible?: string,
      characters?: string,
      mainComponent?: string
    } | null
  }

  interface ChildrenMixin<ChildrenNode = SceneNode> {
    readonly children: ReadonlyArray<ChildrenNode>
    appendChild(child: SceneNode): void
    insertChild(index: number, child: SceneNode): void

    findChildren(
      callback?: (node: SceneNode) => boolean
    ): ReadonlyArray<SceneNode>
    findChild(callback: (node: SceneNode) => boolean): SceneNode | null

    findAll(callback?: (node: SceneNode) => boolean): ReadonlyArray<SceneNode>
    findOne(callback: (node: SceneNode) => boolean): SceneNode | null
    findAllWithCriteria<T extends NodeType[]>(criteria: { types: T }): Array<{ type: T[number] } & SceneNode>
  }

  interface ConstraintMixin {
    constraints: Constraints
  }

  interface Bound {
    x: number
    y: number
    width: number
    height: number
  }

  type ScaleCenter = 'TOPLEFT' | 'TOP' | 'TOPRIGHT' | 'LEFT' | 'CENTER' | 'RIGHT' | 'BOTTOMLEFT' | 'BOTTOM' | 'BOTTOMRIGHT'

  interface ScaleOption {
    scaleCenter?: ScaleCenter
  }

  interface LayoutMixin {
    absoluteTransform: Transform
    relativeTransform: Transform
    readonly absoluteRenderBounds: Bound | null
    readonly absoluteBoundingBox: Bound
    bound: Bound
    x: number
    y: number
    width: number
    height: number
    minWidth: number | null
    maxWidth: number | null
    minHeight: number | null
    maxHeight: number | null
    rotation: number // In degrees
    constrainProportions: boolean
    layoutPositioning: 'AUTO' | 'ABSOLUTE' // applicable only inside auto-layout frames
    alignSelf: 'STRETCH' | 'INHERIT' // applicable only inside auto-layout frames
    flexGrow: 0 | 1 // applicable only inside auto-layout frames
    rescale(scale: number, scaleOption?: ScaleOption): void
    scaleFactor: number // The default value is 1
    flip(direction: 'VERTICAL' | 'HORIZONTAL'): void
  }

  interface BlendMixin {
    opacity: number
    blendMode: BlendMode
    isMask: boolean
    isMaskOutline: boolean
    isMaskVisible: boolean
    effects: ReadonlyArray<Effect>
    effectStyleId: string
  }

  type StrokeCap = 'NONE' | 'ROUND' | 'SQUARE' | 'LINE_ARROW' | 'TRIANGLE_ARROW' | 'ROUND_ARROW' | 'RING' | 'DIAMOND' | 'LINE'
  type StrokeJoin = 'MITER' | 'BEVEL' | 'ROUND'
  type StrokeAlign = 'CENTER' | 'INSIDE' | 'OUTSIDE'
  type DashCap = 'NONE' | 'ROUND' | 'SQUARE'
  type StrokeStyle = 'SOLID' | 'DASH' | 'CUSTOM'
  type ConnectorStrokeCap = StrokeCap

  interface ConnectorEndpointPosition {
    readonly position: { x: number; y: number }
  }

  interface ConnectorEndpointConnected {
    readonly position: { x: number; y: number }
    readonly endpointNodeId: string
    readonly magnet: 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT'
  }


  type ConnectorEndpoint =
    | ConnectorEndpointPosition
    | ConnectorEndpointConnected

  interface GeometryMixin {
    fills: ReadonlyArray<Paint>
    strokes: ReadonlyArray<Paint>
    strokeWeight: number
    strokeAlign: StrokeAlign
    strokeCap: StrokeCap
    strokeJoin: StrokeJoin
    strokeStyle: StrokeStyle
    dashCap: DashCap
    strokeDashes: ReadonlyArray<number>
    fillStyleId: string
    strokeStyleId: string
    borderStyleId: string
    paddingStyleId: string
    spacingStyleId: string
    cornerRadiusStyleId: string

    /**
     * You have to ensure the layer has stroke before invoking this method.
     * 在调用接口之前需要确保layer有描边.
     */
    outlineStroke(): SceneNode | null
  }

  interface RectangleStrokeWeightMixin {
    strokeTopWeight: number
    strokeLeftWeight: number
    strokeBottomWeight: number
    strokeRightWeight: number
  }

  interface CornerMixin {
    // 待确认
    cornerSmooth: number
    cornerRadius: number | PluginAPI['mixed']
  }

  interface DefaultShapeMixin
    extends BaseNodeMixin,
    SceneNodeMixin,
    BlendMixin,
    GeometryMixin,
    LayoutMixin,
    ReactionMixin,
    ExportMixin { }

  interface DefaultContainerMixin
    extends BaseNodeMixin,
    ContainerMixin,
    ReactionMixin,
    SceneNodeMixin,
    ChildrenMixin,
    RectangleCornerMixin,
    BlendMixin,
    CornerMixin,
    ConstraintMixin,
    LayoutMixin,
    ExportMixin { }
  interface ContainerMixin {
    expanded: boolean
  }
  interface AutoLayout {
    flexMode: 'NONE' | 'HORIZONTAL' | 'VERTICAL'
    flexWrap: 'WRAP' | 'NO_WRAP'
    itemSpacing: number
    mainAxisAlignItems: 'FLEX_START' | 'FLEX_END' | 'CENTER' | 'SPACING_BETWEEN'
    crossAxisAlignItems: 'FLEX_START' | 'FLEX_END' | 'CENTER'
    mainAxisSizingMode: 'FIXED' | 'AUTO'
    crossAxisSizingMode: 'FIXED' | 'AUTO'
    crossAxisAlignContent: 'AUTO' | 'SPACE_BETWEEN'
    crossAxisSpacing: number | null
    strokesIncludedInLayout: boolean
    itemReverseZIndex: boolean
    paddingTop: number
    paddingRight: number
    paddingBottom: number
    paddingLeft: number
  }

  interface RowsColsLayoutGrid {
    readonly gridType: "ROWS" | "COLUMNS"

    readonly alignment: "LEFT" | "RIGHT" | "STRETCH" | "CENTER"
    readonly gutterSize: number
    readonly count: number
    readonly sectionSize?: number | null
    readonly offset?: number

    readonly isVisible?: boolean
    readonly color?: RGBA
    readonly id?: string
    readonly name?: string
  }

  interface GridLayoutGrid {
    readonly gridType: "GRID"

    readonly sectionSize: number

    readonly isVisible?: boolean
    readonly color?: RGBA
    readonly id?: string
    readonly name?: string
  }


  type LayoutGrid = RowsColsLayoutGrid | GridLayoutGrid

  interface FrameContainerMixin extends AutoLayout {
    clipsContent: boolean
    layoutGrids: ReadonlyArray<LayoutGrid>
    gridStyleId: string
    overflowDirection: OverflowDirection
  }

  type OverflowDirection = "NONE" | "HORIZONTAL" | "VERTICAL" | "BOTH"

  interface RectangleCornerMixin {
    topLeftRadius: number
    topRightRadius: number
    bottomLeftRadius: number
    bottomRightRadius: number
  }

  interface ReactionMixin {
    reactions: ReadonlyArray<Reaction>
  }

  interface OpaqueNodeMixin extends BaseNodeMixin, SceneNodeMixin, ExportMixin {
    readonly absoluteTransform: Transform
    readonly relativeTransform: Transform
    readonly absoluteRenderBounds: Bound | null
    readonly absoluteBoundingBox: Bound
    x: number
    y: number
    readonly width: number
    readonly height: number
    readonly bound: Bound
  }

  interface MinimalBlendMixin {
    opacity: number
    blendMode: BlendMode
  }

  interface MinimalStrokesMixin {
    strokes: ReadonlyArray<Paint>
    strokeStyleId: string
    strokeWeight: number
    strokeJoin: StrokeJoin
    strokeAlign: StrokeAlign
    strokeStyle: StrokeStyle
    strokeCap: StrokeCap
    strokeDashes: ReadonlyArray<number>
    dashCap: DashCap
  }

  interface MinimalFillsMixin {
    fills: ReadonlyArray<Paint>
    fillStyleId: string
  }

  /// /////////////////////////////////////////////////////////////////////////////
  // Nodes

  interface DocumentNode {
    readonly type: 'DOCUMENT'

    readonly id: string
    name: string

    currentPage: PageNode

    readonly children: ReadonlyArray<PageNode>

    findAll(callback?: (node: SceneNode) => boolean): ReadonlyArray<SceneNode>
    findOne(callback: (node: SceneNode) => boolean): SceneNode | null
    findAllWithCriteria<T extends NodeType[]>(criteria: { types: T }): Array<{ type: T[number] } & SceneNode>
  }

  interface PageNode
    extends
    ChildrenMixin<SceneNode> {
    readonly type: 'PAGE'

    readonly id: string
    readonly parent: DocumentNode
    name: string
    removed: boolean
    remove(): void

    selection: ReadonlyArray<SceneNode>
    clone(): PageNode
    /**
     * 选中所有图层
     */
    selectAll(): void
    /**
     * 背景颜色
     */
    bgColor: RGBA
    /**
     * 原型所有的flow
     */
    readonly flowStartingPoints: FlowStartingPoint[]
    /**
     * 标签,默认'NONE'
     */
    label: 'NONE' | 'BLUE' | 'GREEN' | 'RED' | 'YELLOW' | 'PURPLE' | 'GRAY'
  }

  interface SectionNode extends Omit<DefaultContainerMixin, 'opacity' | 'blendMode' | 'isMask' | 'isMaskOutline' | 'isMaskVisible' | 'effects' | 'effectStyleId'>, GeometryMixin, FrameContainerMixin, RectangleStrokeWeightMixin {
    readonly type: 'SECTION'
    clone(): SectionNode
  }

  interface FrameNode extends DefaultContainerMixin, GeometryMixin, FrameContainerMixin, RectangleStrokeWeightMixin {
    readonly type: 'FRAME'
    clone(): FrameNode
    resizeToFit(): void
  }

  interface RectangleNode
    extends DefaultShapeMixin,
    ConstraintMixin,
    CornerMixin,
    RectangleStrokeWeightMixin,
    RectangleCornerMixin {
    readonly type: 'RECTANGLE'
    clone(): RectangleNode
  }

  interface LineNode extends DefaultShapeMixin, ConstraintMixin {
    readonly type: 'LINE'
    clone(): LineNode
    readonly height: number
    leftStrokeCap: StrokeCap
    rightStrokeCap: StrokeCap
  }

  interface EllipseNode extends DefaultShapeMixin, ConstraintMixin {
    readonly type: 'ELLIPSE'
    clone(): EllipseNode
    arcData: ArcData
  }

  interface PolygonNode extends DefaultShapeMixin, ConstraintMixin, CornerMixin {
    readonly type: 'POLYGON'
    pointCount: number
    clone(): PolygonNode
  }

  interface StarNode extends DefaultShapeMixin, ConstraintMixin, CornerMixin {
    readonly type: 'STAR'
    pointCount: number
    innerRadius: number
    clone(): StarNode
  }

  type VectorPaths = ReadonlyArray<number>
  type VectorPath = [number, number, number, number]

  interface PenNetwork {
    paths: ReadonlyArray<VectorPath>
    nodes: ReadonlyArray<VectorVertex>
    regions: ReadonlyArray<VectorRegion>
    ctrlNodes: ReadonlyArray<VectorCtrl>
  }

  interface PenPaths {
    windingRule: WindingRule
    data: string
  }

  interface PenNode extends DefaultShapeMixin, ConstraintMixin, CornerMixin {
    readonly type: 'PEN'
    penNetwork: PenNetwork
    set penPaths(paths: Array<PenPaths>)
    //@ts-ignore
    get penPaths(): PenPaths
    clone(): PenNode
  }

  interface BooleanOperationNode
    extends DefaultShapeMixin,
    ContainerMixin,
    ChildrenMixin,
    CornerMixin {
    readonly type: 'BOOLEAN_OPERATION'
    booleanOperation: 'UNION' | 'INTERSECT' | 'SUBTRACT' | 'EXCLUDE'
    clone(): BooleanOperationNode
  }


  interface GroupNode
    extends DefaultShapeMixin,
    ContainerMixin,
    ChildrenMixin,
    CornerMixin {
    readonly type: 'GROUP'
    clone(): GroupNode
  }

  interface TextRangeStyle {
    fontName: FontName
    fontSize: number
    lineHeight: LineHeight
    textDecoration: TextDecoration
    letterSpacing: LetterSpacing
  }

  enum LinkFlagEnum {
    CURRPAGE = 'currPage',
    OTHERPAGE = 'otherPage',
    PROTOTYPE = 'prototype',
    OUTFILE = 'outFile',
    OWNWEBSITE = 'ownWebsite',
    OTHERLINK = 'otherLink',
  }

  interface Superlink {
    start: number
    end: number
    superlink: {
      layerId?: string
      link: string
      linkFlag: LinkFlagEnum
      pageId: string
    }
  }

  interface Hyperlink {
    type: 'PAGE' | 'NODE' | 'URL',
    value: string
  }
  interface HyperlinkWithRange {
    start: number
    end: number
    hyperlink: Hyperlink
  }

  interface TextNode extends DefaultShapeMixin, ConstraintMixin {
    readonly type: 'TEXT'
    characters: string
    readonly hasMissingFont: boolean
    /**
     * @deprecated
     * This attribute is deprecated, please use hyperlinks instead.
     */
    readonly superlinks: Array<Superlink>
    readonly hyperlinks: Array<HyperlinkWithRange>
    textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED'
    textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM'
    textAutoResize: 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT' | 'TRUNCATE'
    paragraphSpacing: number
    readonly textStyles: ReadonlyArray<TextSegStyle>
    readonly listStyles: ReadonlyArray<ListStyle>
    clone(): TextNode

    insertCharacters(start: number, characters: string): void
    deleteCharacters(start: number, end: number): void

    setRangeFontSize(start: number, end: number, fontSize: number): void
    setRangeTextDecoration(
      start: number,
      end: number,
      decoration: TextDecoration
    ): void
    setRangeFontName(start: number, end: number, fontName: FontName): void
    setRangeLetterSpacing(
      start: number,
      end: number,
      value: LetterSpacing
    ): void
    setRangeLineHeight(start: number, end: number, value: LineHeight): void
    setRangeFills(start: number, end: number, paints: Paint[]): void
    /**
     * @deprecated
     * This function is deprecated, please use setRangeHyperlink instead.
     */
    setRangeSuperLink(start: number, end: number, link: string | null): void
    setRangeHyperlink(start: number, end: number, hyperlink: Hyperlink | null): void
    setRangeTextCase(start: number, end: number, textCase: TextCase): void
    setRangeListStyle(start: number, end: number, type: 'ORDERED' | 'BULLETED' | 'NONE'): void

    setRangeFillStyleId(start: number, end: number, fillStyleId: string): void
    setRangeTextStyleId(start: number, end: number, textStyleId: string): void
  }

  type VariantMixin = {
    property: string
    type: 'variant'
    values: string[]
  }

  interface VariantProperty {
    property: string
    value: string
  }

  interface ComponentPropertiesMixin {
    readonly componentPropertyValues: ComponentPropertyValues
    addComponentProperty(
      propertyName: string,
      type: Exclude<ComponentPropertyType, 'VARIANT'>,
      defaultValue: string | boolean,
      options?: ComponentPropertyOptions,
    ): string
    editComponentProperty(
      propertyId: string,
      newValue: {
        name?: string
        defaultValue?: string | boolean
        preferredValues?: InstanceSwapPreferredValue[]
      },
    ): string
    deleteComponentProperty(propertyId: string): void
  }

  type ComponentPropertyValues = Array<ComponentPropertyValue>

  type ComponentPropertyValue = {
    name: string
    type: ComponentPropertyType
    defaultValue: string | boolean
    id?: string
    variantOptions?: string[]
    preferredValues?: InstanceSwapPreferredValue[]
    alias?: string
    variantOptionsAlias?: string[]
  }

  type ComponentPropertyType = 'BOOLEAN' | 'TEXT' | 'INSTANCE_SWAP' | 'VARIANT'
  type InstanceSwapPreferredValue = {
    type: 'COMPONENT' | 'COMPONENT_SET'
    key: string
  }
  type ComponentPropertyOptions = {
    preferredValues?: InstanceSwapPreferredValue[]
  }
  type ComponentProperties = {
    name: string
    id?: string
    type: ComponentPropertyType
    value: boolean | string
    preferredValues?: InstanceSwapPreferredValue[]
  }

  interface ComponentNode extends DefaultContainerMixin, GeometryMixin, FrameContainerMixin, RectangleStrokeWeightMixin, PublishableMixin, ComponentPropertiesMixin {
    readonly type: 'COMPONENT'
    readonly variantProperties: Array<VariantProperty> | undefined
    setVariantPropertyValues(property: Record<string, string>): void
    clone(): InstanceNode
    createInstance(): InstanceNode
    resizeToFit(): void
  }

  interface ComponentSetNode extends Omit<DefaultContainerMixin, 'appendChild' | 'insertChild'>, GeometryMixin, FrameContainerMixin, RectangleStrokeWeightMixin, PublishableMixin, ComponentPropertiesMixin {
    readonly type: 'COMPONENT_SET'
    clone(): ComponentSetNode
    createVariantComponent(): void
    createVariantProperties(properties: Array<string>): void
    editVariantProperties(properties: Record<string, string>): void
    editVariantPropertyValues(properties: Record<string, { oldValue: string, newValue: string }>): void
    editVariantPropertiesAlias(properties: Record<string, string>): void
    editVariantPropertyValuesAlias(properties: Record<string, { name: string, alias: string }>): void
    deleteVariantProperty(property: string): void
    resizeToFit(): void
  }

  interface InstanceNode extends Omit<DefaultContainerMixin, 'appendChild' | 'insertChild'>, GeometryMixin, FrameContainerMixin, RectangleStrokeWeightMixin {
    readonly type: 'INSTANCE'
    readonly variantProperties: Array<VariantProperty> | undefined

    setVariantPropertyValues(property: Record<string, string>): void

    readonly componentProperties: Array<ComponentProperties>
    setProperties(properties: { [propertyId: string]: string | boolean }): void
    readonly exposedInstances: InstanceNode[]
    isExposedInstance: boolean

    resetOverrides(): void

    clone(): InstanceNode
    /**
     * this is an async func
     */
    swapComponent(component: ComponentNode): void
    detachInstance(): FrameNode
    mainComponent: ComponentNode | null
  }

  interface SliceNode extends BaseNodeMixin, LayoutMixin, ConstraintMixin, SceneNodeMixin, ExportMixin {
    readonly type: 'SLICE'
    clone(): SliceNode
    isPreserveRatio: boolean
  }

  interface ConnectorNode extends OpaqueNodeMixin, Pick<MinimalBlendMixin, 'opacity'>, Omit<MinimalStrokesMixin, 'strokeAlign'> {
    readonly type: 'CONNECTOR'
    createText(): TextSublayerNode
    readonly text: TextSublayerNode | null
    cornerRadius?: number
    connectorStart: ConnectorEndpoint
    connectorEnd: ConnectorEndpoint
    connectorStartStrokeCap: ConnectorStrokeCap
    connectorEndStrokeCap: ConnectorStrokeCap
    readonly strokeAlign: 'CENTER'
    clone(): ConnectorNode
  }

  interface TextSublayerNode extends MinimalFillsMixin {
    readonly id: string
    readonly hasMissingFont: boolean
    readonly textAlignHorizontal: 'CENTER'
    readonly textAlignVertical: 'CENTER'
    readonly textAutoResize: 'WIDTH_AND_HEIGHT'
    readonly hyperlinks: Array<HyperlinkWithRange>

    readonly textStyles: ReadonlyArray<TextSegStyle>

    paragraphSpacing: number

    characters: string
    insertCharacters(start: number, characters: string): void
    deleteCharacters(start: number, end: number): void

    setRangeFontSize(start: number, end: number, fontSize: number): void
    setRangeTextDecoration(
      start: number,
      end: number,
      decoration: TextDecoration
    ): void
    setRangeFontName(start: number, end: number, fontName: FontName): void
    setRangeLetterSpacing(
      start: number,
      end: number,
      value: LetterSpacing
    ): void
    setRangeLineHeight(start: number, end: number, value: LineHeight): void
    setRangeFills(start: number, end: number, paints: Paint[]): void
    setRangeHyperlink(start: number, end: number, hyperlink: Hyperlink | null): void
    setRangeTextCase(start: number, end: number, textCase: TextCase): void

    setRangeListStyle(start: number, end: number, type: 'ORDERED' | 'BULLETED' | 'NONE'): void

    setRangeFillStyleId(start: number, end: number, fillStyleId: string): void
    setRangeTextStyleId(start: number, end: number, textStyleId: string): void
  }


  interface CreateStyleConfig {
    name: string;
    /**
     * layerId
     */
    id: string;
    description?: string;
  }

  interface FlowStartingPoint {
    name: string
    id: string
    flowId: string
    description: string
  }
  interface Reaction {
    readonly trigger: Trigger;
    readonly action?: Action;
  }
  interface Action {
    readonly type: ActionType;
    readonly destinationId: string;
    readonly navigation: Navigation;
    readonly transition: Transition;
    readonly url: string;
    readonly scrollToXOffset?: number;
    readonly scrollToYOffset?: number;
  }

  type ActionType = 'BACK' | 'NODE' | 'URL' | 'CLOSE' | 'NONE';

  type Navigation = 'NAVIGATE' | 'OVERLAY' | 'SWAP_OVERLAY' | 'SCROLL_TO';

  interface Transition {
    readonly type: TransitionType;
    readonly duration: number;
    readonly direction: TransitionDirection;
    readonly easing: Easing;
  }

  type TransitionType = 'TANS_NONE' | 'INSTANT' | 'DISSOLVE' | 'SMART_ANIMATE' | 'MOVE_IN' | 'MOVE_OUT' | 'PUSH' | 'SLIDE_IN' | 'SLIDE_OUT' | 'DISPLACE'

  type TransitionDirection = 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'
  interface Easing {
    readonly type: EasingType;
    readonly easingFunctionCubicBezier: {
      x1: number;
      x2: number;
      y1: number;
      y2: number;
    };
  }

  type EasingType = 'LINEAR' | 'EASE_IN' | 'EASE_OUT' | 'EASE_IN_AND_OUT' | 'EASE_IN_BACK' | 'EASE_OUT_BACK' | 'EASE_IN_AND_OUT_BACK' | 'CUSTOM_CUBIC_BEZIER'
  interface Trigger {
    readonly type: TriggerType;
    readonly delay: number;
  }
  type TriggerType = 'ON_CLICK' | 'ON_DRAG' | 'ON_HOVER' | 'ON_PRESS' | 'MOUSE_ENTER' | 'MOUSE_LEAVE' | 'MOUSE_DOWN' | 'MOUSE_UP' | 'AFTER_DELAY'

  interface ArcData {
    /**
     * 起点弧度
     */
    startingAngle: number
    /**
     * 终点弧度
     */
    endingAngle?: number
    /**
     * 内径
     */
    innerRadius: number
  }

  interface PluginDrop {
    clientX: number
    clientY: number
    dropMetadata?: any
  }

  interface DropEvent {
    x: number
    y: number
    absoluteX: number
    absoluteY: number
    dropMetadata?: any
  }

  interface TeamLibraryComponent {
    readonly id: string
    readonly name: string
    readonly ukey: string
    readonly description: string
    readonly type: "COMPONENT" | 'COMPONENT_SET'
    readonly cover: string
    readonly width: number
    readonly height: number
  }

  interface TeamLibraryStyle {
    readonly id: string;
    readonly name: string;
    readonly ukey: string;
    readonly description: string;
    readonly type: StyleType;
  }

  type TeamLibrary = ReadonlyArray<{
    readonly name: string;
    readonly id: string;
    readonly componentList: TeamLibraryComponent[]
    readonly style: {
      paints: ReadonlyArray<TeamLibraryStyle>
      effects: ReadonlyArray<TeamLibraryStyle>
      texts: ReadonlyArray<TeamLibraryStyle>
      grids: ReadonlyArray<TeamLibraryStyle>
    }
  }>

  type BaseNode = DocumentNode | PageNode | SceneNode

  /**
   * 画布节点
   */
  type SceneNode =
    | GroupNode
    | FrameNode
    | PenNode
    | StarNode
    | LineNode
    | EllipseNode
    | PolygonNode
    | RectangleNode
    | TextNode
    | ComponentNode
    | ComponentSetNode
    | InstanceNode
    | BooleanOperationNode
    | SliceNode
    | ConnectorNode
    | SectionNode

  type NodeType =
    | 'DOCUMENT'
    | 'PAGE'
    | 'GROUP'
    | 'FRAME'
    | 'RECTANGLE'
    | 'TEXT'
    | 'LINE'
    | 'ELLIPSE'
    | 'POLYGON'
    | 'STAR'
    | 'PEN'
    | 'COMPONENT'
    | 'COMPONENT_SET'
    | 'INSTANCE'
    | 'BOOLEAN_OPERATION'
    | 'SLICE'
    | 'CONNECTOR'
    | 'SECTION'
  
  
  
  // d2c
  type CodeFile = {
    /**
     * import third-party paths
     */
    importPath?: {
      name: string;
      path: string;
      type: 'script' | 'style';
    }[];
    importType?: 'GLOBAL' | 'IMPORT';
    // absolute path
    path: string;
    // relative to the relative path of the imported file
    relativePath: string;
    fileName: string;
    type: 'css' | 'js' | 'typescript' | 'ts-definition' | 'static' | 'vue' | 'react' | 'java' | 'kt' | 'xml';
    // code
    code: string;
    // parsed code
    parsedCode?: string;
    // import
    chunks?: CodeFile[];
  };
  interface CodegenAPI {
    /**
     * @param event a callback function that is triggered when the plugin generates the DSL, and the parameter of the callback function is the modified DSL data
     */
    on(type: 'generateDSL', event: (generateData: {data: MGDSL.MGDSLData, callback: (modifiedData: MGDSL.MGDSLData) => void}) => void) : void
    /**
     * @param event a callback function that is triggered when the plugin generates the DSL, and the parameter of the callback function is the custom code, and when the callback returns the custom code, the custom code will be used as the standard, and the code will not be generated according to the DSL
     */
    on(type: 'generate', event: (generateData: {data: MGDSL.MGDSLData, callback: (modifiedData: MGDSL.CustomCode) => void}) => void) : void
    /**
     * @param event a callback function that is triggered when the plugin generates the code, and the parameter of the callback function is the generated code
     */
    on(type: 'codeChange', event: (data: MGDSL.CustomCode['data']) => void) : void
    /**
     * Set the component template
     * @description used to set the component mapping relationship
     * @param template component template
     */
    setComponentTemplate(template: MGTMP.ComponentTemplate): void
    /**
     * Get code by id and framework
     * @param layerId layer id
     * @param type framework type
     * @returns code file
     */
    getCode(layerId: string, type: MGDSL.Framework): Promise<CodeFile | null>;
    /**
     * Get DSL by id and framework
     * @param layerId layer id
     * @param type framework type
     * @returns DSL data
     */
    getDSL(layerId: string, type: MGDSL.Framework): Promise<MGDSL.MGDSLData | null>;
    /**
     * Get code by DSL
     * @param data DSL data
     * @param type framework type
     * @returns code file
     */
    getCodeByDSL(data: MGDSL.MGDSLData, type: MGDSL.Framework): Promise<CodeFile | null>;
  }

  type StyleReturnType<T extends StyleType> = 
    T extends 'PAINT' ? PaintStyle : 
    T extends 'TEXT' ? TextStyle : 
    T extends 'EFFECT' ? EffectStyle : 
    T extends 'GRID' ? GridStyle : 
    T extends 'STROKE' ? StrokeStyle : 
    T extends 'CORNER_RADIUS' ? CornerRadiusStyle : 
    T extends 'PADDING' ? PaddingStyle : 
    T extends 'SPACING' ? SpacingStyle : never
}

export { }

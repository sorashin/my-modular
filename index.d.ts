/* tslint:disable */
/* eslint-disable */
/**
 * Interop struct for node property
 */
export interface NodePropertyInterop {
    /**
     * Property name
     */
    name: string;
    /**
     * Property value
     */
    value: NodePropertyValue;
    /**
     * Whether the node has input connection and the property change is disabled
     */
    connected?: boolean;
    /**
     * Whether the property is disabled in node\' inspector
     */
    disabled?: boolean;
}

/**
 * Interop struct for transform
 * Represents a 4x4 matrix as a 16-element array
 */
export type TransformInterop = number[];

export type NodeSectionInterop = { type: "section"; content: NodeFolderInterop } | { type: "item"; content: NodeItemInterop };

export interface NodeItemInterop {
    key: string;
    name: string;
}

export type NodeFolderInterop = IndexMap<string, NodeSectionInterop>;

export interface NodeMapInterop {
    folder: NodeFolderInterop;
}

export type GeometryInteropHandleProxy = { variant: "Mesh"; data: MeshInteropHandle } | { variant: "Curve"; data: CurveInteropHandle } | { variant: "Group"; data: GroupInteropHandle };

/**
 * Geometry identifier
 */
export interface GeometryIdentifier {
    /**
     * Parent node ID
     */
    nodeId?: NodeId;
    /**
     * Output ID that the geometry is belonged to
     */
    outputId: OutputId;
    /**
     * Geometry ID
     */
    geometryId: ID<GeometryProxy>;
    /**
     * Transform matrix in interop format
     */
    transform: TransformInterop;
}

/**
 * Interop struct for evaluation results
 */
export interface EvaluationInterop {
    /**
     * Processed nodes in the latest evaluation
     */
    processedNodes: NodeId[];
    /**
     * Geometry identifiers in the latest evaluation
     */
    geometryIdentifiers: GeometryIdentifier[];
}

export interface MeshInteropHandle {
    count: number;
    vertices: number;
    normals: number;
    indices: IndicesInteropHandle | undefined;
    transform: TransformInterop | undefined;
}

export interface NodeCreationSetting {
    id: string;
    variant: string;
    name?: string;
    label?: string;
    inputs?: number;
    outputs?: number;
    properties: NodePropertyInterop[];
    enabled?: boolean;
    visible?: boolean;
}

export interface DataTreeInterop {
    outputs: IndexMap<string, string>;
}

export interface IndicesInteropHandle {
    count: number;
    indices: number;
}

export interface GeometrySpreadsheet {
    points: Point3<number>[];
    curves: CurveProxy[];
    surfaces: SurfaceProxy[];
    meshes: MeshInterop[];
}

/**
 * Options for adaptive tessellation to create geometry interoperability
 */
export interface AdaptiveTessellationOptions {
    /**
     * Whether to enable adaptive tessellation
     */
    enabled: boolean;
    /**
     * Tolerance for the normal vector: if the L2 norm of the normal vectors is below this value, the edge is considered flat
     */
    normTolerance: number;
    /**
     * Minimum number of divisions in u direction
     */
    minDivsU: number;
    /**
     * Minimum number of divisions in v direction
     */
    minDivsV: number;
    /**
     * Minimum depth for division
     */
    minDepth: number;
    /**
     * Maximum depth for division
     */
    maxDepth: number;
}

export interface IOInterop {
    id: string;
    name: string;
    accessType: string;
    connections: string[];
}

export interface EdgeInterop {
    source: EdgeUnitInterop<OutputId>;
    destination: EdgeUnitInterop<InputId>;
    empty: boolean;
}

export interface EdgeUnitInterop<IO> {
    node: NodeId;
    io: IO;
}

export interface GroupInteropHandle {
    objects: GeometryInteropHandleProxy[];
}

export type GeometryInteropVec = GeometryInterop[];

export type NodeConnectionInteropVec = NodeConnectionInterop[];

export type NodePropertyInteropVec = NodePropertyInterop[];

export type NodeInteropVec = NodeInterop[];

export type EdgeInteropVec = EdgeInterop[];

/**
 * Interop struct for node
 */
export interface NodeInterop {
    /**
     * Node variant
     */
    variant: string;
    /**
     * Node identifier
     */
    id: string;
    name: string;
    label: string | undefined;
    /**
     * Input parameters
     */
    inputs: IOInterop[];
    /**
     * Output parameters
     */
    outputs: IOInterop[];
    /**
     * Node properties
     */
    properties: NodePropertyInterop[];
    enabled: boolean;
    visible: boolean;
    meta: NodeMetaInterop;
}

export interface NodeEntityInterop {
    variant: string;
    id: string;
    name: string;
    label: string | undefined;
    inputs: string[];
    inputVariables: IOVariables | undefined;
    outputs: string[];
    outputVariables: IOVariables | undefined;
    enabled: boolean;
    visible: boolean;
}

/**
 * Interop struct for node meta
 */
export interface NodeMetaInterop {
    /**
     * Error message
     */
    error: string | undefined;
    /**
     * Node\' output has geometry or not
     */
    hasGeometry: boolean;
}

export interface NodeConnectionInterop {
    outputNodeId: string;
    outputIndex: number;
    inputNodeId: string;
    inputIndex: number;
    inputConnectionIndex: number | undefined;
}

export interface CurveInteropHandle {
    count: number;
    vertices: number;
    transform: TransformInterop | undefined;
}


/// Manually added types due to limitations in the `wasm-bindgen` & `tsify` crates.
export type ID<T = any> = string;
export type NodeId = ID;
export type InputId = ID;
export type OutputId = ID;

export type IndexMap<K, V> = Map<K, V>;

export type U1 = 1;
export type U2 = 2;
export type U3 = 3;

/// Define vector & point types with FixedLengthArray
type BuildTuple<L extends number, T, R extends any[] = []> = R['length'] extends L ? R : BuildTuple<L, T, [T, ...R]>;
type FixedLengthArray<T, L extends number> = BuildTuple<L, T>;
export type OPoint<T, D extends number> = FixedLengthArray<T, D>;
export type OVector<T, D extends number> = FixedLengthArray<T, D>;
export type Point<T, D extends number> = OPoint<T, D>;
export type SVector<T, D extends number> = OVector<T, D>;
export type Point2<T = number> = Point<T, 2>;
export type Vector2<T = number> = SVector<T, 2>;
export type Point3<T = number> = Point<T, 3>;
export type Vector3<T = number> = SVector<T, 3>;
export type Point4<T = number> = Point<T, 4>;
export type Vector4<T = number> = SVector<T, 4>;
export type Transform3<T = number> = FixedLengthArray<T, 16>;


export type GraphMappingTypes = "None" | "Bezier" | "Linear" | "Sine";

export interface Prune<T, U> {
    connectedComponents: SubGraph<T, U>[];
    bypass: Connection[] | undefined;
}

export interface Connection {
    source: NodeParameter<OutputId>;
    destination: NodeParameter<InputId>;
}

export interface NodeParameter<T> {
    nodeId: NodeId;
    parameterId: T;
    parameterIndex: number;
}

/**
 * Defines the dynamics of an IO parameter.
 */
export interface IOVariables {
    minCount: number;
    maxCount: number;
    defaultCount: number;
    offset: number;
}

export interface NodePropertyCategoryValue {
    candidates: Map<string, number>;
    selected: number;
}

export interface NodePropertyRangeValue {
    value: number;
    min: number | undefined;
    max: number | undefined;
    step: number | undefined;
}

export type NodePropertyValue = { type: "Number"; content: number } | { type: "Range"; content: NodePropertyRangeValue } | { type: "Range2d"; content: [NodePropertyRangeValue, NodePropertyRangeValue] } | { type: "String"; content: string } | { type: "Bool"; content: boolean } | { type: "NumberVector"; content: number[] } | { type: "Category"; content: NodePropertyCategoryValue } | { type: "Vector2d"; content: [number, number] } | { type: "Vector3d"; content: [number, number, number] } | { type: "Point2d"; content: [number, number] } | { type: "Point3d"; content: [number, number, number] } | { type: "Points2d"; content: [number, number][] };

/**
 * Graph structure
 */
export interface Graph<T, U> {
    /**
     * Nodes in the graph
     */
    nodes: IndexMap<NodeId, Node<T, U>>;
}

export interface Node<T> {
    id: NodeId;
    name: string;
    label: string | undefined;
    input: InputIOManager;
    output: OutputIOManager;
    entity: T;
    enabled: boolean;
    visible: boolean;
}

export type OutputIOManager = IOManager<OutputId, InputId>;

export type InputIOManager = IOManager<InputId, OutputId>;

export interface SubGraphNode {
    sources: NodeId[];
    destinations: NodeId[];
}

export interface SubGraph<T, U> {
    nodes: IndexMap<NodeId, SubGraphNode<T, U>>;
}

export interface IOManager<T, U> {
    parameters: IOParameter<T, U>[];
}


export type LineCurve3D = {
    a: Point3;
    b: Point3;
};

/**
 * An oriented box in 3D space
 */
export interface OrientedBox {
    /**
     * The plane that the box is aligned to
     */
    plane: Plane;
    /**
     * The bounding box in the local coordinate system
     */
    bounds: BoundingBox3D;
}

/**
 * Mesh representation with vertices, normals, uv, and index
 */
export interface Mesh {
    /**
     * Vertices of the mesh
     */
    vertices: Point3<number>[];
    /**
     * Normals of the mesh
     */
    normals: Vector3<number>[] | undefined;
    /**
     * UV coordinates of the mesh
     */
    uv: Vector2<number>[] | undefined;
    /**
     * Index of the mesh
     */
    index: [number, number, number][];
}

/**
 * An arc curve in 3D space
 */
export interface ArcCurve {
    /**
     * The base plane of the arc
     */
    plane: Plane;
    /**
     * The start angle of the arc
     */
    startAngle: number;
    /**
     * The end angle of the arc
     */
    endAngle: number;
    /**
     * The radius of the arc
     */
    radius: number;
}


export type NurbsCurve3D<T = number> = {
    control_points: Point4<T>[];
    knots: T[];
    degree: T;
};

/**
 * Interop struct for point cloud data
 */
export interface PointCloudInterop {
    /**
     * Vertices of the point cloud
     */
    vertices: [number, number, number][];
    /**
     * Transform matrix of the point cloud
     */
    transform: Transform3<number>;
}

/**
 * Geometry proxy for various geometry types
 */
export type GeometryProxy = { variant: "Curve"; data: CurveProxy } | { variant: "Surface"; data: SurfaceProxy } | { variant: "Extrusion"; data: Extrusion<SurfaceProxy> } | { variant: "Brep"; data: Brep } | { variant: "Mesh"; data: Mesh } | { variant: "BBox"; data: OrientedBox } | { variant: "Group"; data: Group };

export type NurbsCurve = NurbsCurve3D<number>;

/**
 * Proxy for various surface types
 */
export type SurfaceProxy = { variant: "Circular"; data: CircularSurface } | { variant: "Hemisphere"; data: HemisphereSurface } | { variant: "Triangle"; data: TriangleSurface } | { variant: "Plane"; data: PlaneSurface } | { variant: "NURBS"; data: NurbsSurface } | { variant: "Trimmed"; data: TrimmedSurface<SurfaceProxy, CurveProxy> };

/**
 * A hemisphere surface
 */
export interface HemisphereSurface {
    /**
     * The base plane of the hemisphere
     */
    plane: Plane;
    /**
     * The radius of the hemisphere
     */
    radius: number;
}


export type BoundingBox3D = {
    min: Vector3;
    max: Vector3;
};

/**
 * Interop proxy for various geometry types
 */
export type GeometryInterop = { variant: "Mesh"; data: MeshInterop } | { variant: "Curve"; data: CurveInterop } | { variant: "Point"; data: PointCloudInterop } | { variant: "Plane"; data: Plane } | { variant: "Group"; data: GeometryInterop[] };

/**
 * Interop struct for curve data
 */
export interface CurveInterop {
    /**
     * Vertices of the curve
     */
    vertices: [number, number, number][];
    /**
     * Transform matrix of the curve
     */
    transform: Transform3<number> | undefined;
}

export interface Domain {
    min: number;
    max: number;
}

/**
 * Plane representation with origin, normal, x axis, and y axis
 */
export interface Plane {
    /**
     * Origin coordinate of the plane
     */
    origin: Point3<number>;
    /**
     * Normal vector of the plane
     */
    normal: Vector3<number>;
    /**
     * X axis of the plane
     */
    xAxis: Vector3<number>;
    /**
     * Y axis of the plane
     */
    yAxis: Vector3<number>;
}


export type PolylineCurve3D = {
    points: Point3[];
};


export type Triangle3D = {
    a: Point3;
    b: Point3;
    c: Point3;
};

/**
 * Interop struct for mesh data
 */
export interface MeshInterop {
    /**
     * Vertices of the mesh
     */
    vertices: [number, number, number][];
    /**
     * Normals of the mesh
     */
    normals: [number, number, number][];
    /**
     * UV coordinates of the mesh
     */
    uv?: [number, number][];
    /**
     * Faces of the mesh
     */
    faces?: [number, number, number][];
    /**
     * Transform matrix of the mesh
     */
    transform?: Transform3<number>;
}

/**
 * A surface defined by three points
 */
export type TriangleSurface = Triangle3D;

/**
 * A surface defined by a plane and two domains in x and y directions
 */
export interface PlaneSurface {
    /**
     * The base plane of the surface
     */
    plane: Plane;
    /**
     * The domain in x direction
     */
    x: Domain;
    /**
     * The domain in y direction
     */
    y: Domain;
}

/**
 * Proxy for various curve types
 */
export type CurveProxy = { variant: "Line"; data: LineCurve3D } | { variant: "Arc"; data: ArcCurve } | { variant: "Circle"; data: CircleCurve } | { variant: "Rectangle"; data: RectangleCurve } | { variant: "Polyline"; data: PolylineCurve3D } | { variant: "NURBS"; data: NurbsCurve };


export type NurbsSurface3D<T = number> = {
    control_points: Point4<T>[][];
    u_knots: T[];
    v_knots: T[];
    u_degree: T;
    v_degree: T;
};

/**
 * A NURBS surface
 */
export type NurbsSurface = NurbsSurface3D<number>;

/**
 * A circular surface
 */
export interface CircularSurface {
    /**
     * The base plane of the circle
     */
    plane: Plane;
    /**
     * The radius of the circle
     */
    radius: number;
}

/**
 * A rectangle curve in 3D space
 */
export interface RectangleCurve {
    /**
     * The base plane of the rectangle
     */
    plane: Plane;
    /**
     * The domain of the rectangle in the plane x axis
     */
    x: Domain;
    /**
     * The domain of the rectangle in the plane y axis
     */
    y: Domain;
}

/**
 * A circle curve in 3D space
 */
export interface CircleCurve {
    /**
     * The base plane of the circle
     */
    plane: Plane;
    /**
     * The radius of the circle
     */
    radius: number;
}

/**
 * Modular structure with a graph handle
 */
export class Modular {
  free(): void;
  /**
   * Create a new modular instance
   * @returns {Modular}
   */
  static new(): Modular;
  /**
   * Load a graph from a JSON string
   * @param {string} input
   */
  loadGraph(input: string): void;
  /**
   * Export the graph in JSON format
   * @returns {Graph}
   */
  exportGraph(): Graph;
  /**
   * Clear the graph
   */
  clearGraph(): void;
  /**
   * Evaluate the graph with latest state
   * @returns {Promise<EvaluationInterop>}
   */
  evaluate(): Promise<EvaluationInterop>;
  /**
   * Get all nodes in the graph
   * @returns {(NodeInterop)[]}
   */
  getNodes(): (NodeInterop)[];
  /**
   * Change a node property with node id and property
   * @param {string} node_id
   * @param {NodePropertyInterop} prop
   * @returns {boolean}
   */
  changeNodeProperty(node_id: string, prop: NodePropertyInterop): boolean;
  /**
   * Find a geometry by its identifier
   * @param {GeometryIdentifier} identifier
   * @returns {GeometryProxy | undefined}
   */
  findGeometryById(identifier: GeometryIdentifier): GeometryProxy | undefined;
  /**
   * Find a geometry interop by its identifier
   * @param {GeometryIdentifier} identifier
   * @returns {GeometryInterop | undefined}
   */
  findGeometryInteropById(identifier: GeometryIdentifier): GeometryInterop | undefined;
  /**
   * Update the tessellation options to modify the tessellation quality for geometry interoperability
   * @param {AdaptiveTessellationOptions | undefined} [options]
   */
  updateTessellationOptions(options?: AdaptiveTessellationOptions): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_modular_free: (a: number, b: number) => void;
  readonly modular_new: () => number;
  readonly modular_loadGraph: (a: number, b: number, c: number) => Array;
  readonly modular_exportGraph: (a: number) => number;
  readonly modular_clearGraph: (a: number) => void;
  readonly modular_evaluate: (a: number) => number;
  readonly modular_getNodes: (a: number) => Array;
  readonly modular_changeNodeProperty: (a: number, b: number, c: number, d: number) => number;
  readonly modular_findGeometryById: (a: number, b: number) => number;
  readonly modular_findGeometryInteropById: (a: number, b: number) => number;
  readonly modular_updateTessellationOptions: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly closure567_externref_shim: (a: number, b: number, c: number) => void;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly closure2465_externref_shim: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;

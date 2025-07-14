import {
    Cell,
    CellEditorHandler,
    CellState,
    CellStyle,
    ConnectionConstraint,
    ConnectionHandler,
    Geometry, Graph,
    GraphPluginConstructor,
    InternalMouseEvent, Point,
    RubberBandHandler,
    SelectionCellsHandler,
    SelectionHandler
} from "@maxgraph/core";

class CustomConnectionHandler extends ConnectionHandler {
    // 链接时预览连接线
    createEdgeState(_me: InternalMouseEvent) {
        const edge = this.graph.createEdge(null, null!, null, null, null);
        return new CellState(this.graph.view, edge, this.graph.getCellStyle(edge));
    }
}

// 定义插件
const plugins: GraphPluginConstructor[] = [
    // 图形的就地编辑
    CellEditorHandler,
    // 用于管理单元格处理程序并调用其鼠标事件处理函数
    SelectionCellsHandler,
    // 自定义连接线句柄
    CustomConnectionHandler,
    SelectionHandler,
    // 允许拖拽线
    RubberBandHandler,
];
// 自定义Graph
export class EoGraph extends Graph {
    constructor(container: HTMLElement) {
        super(container, undefined, plugins);
    }
    getAllConnectionConstraints = (terminal: CellState | null, _source: boolean) => {
        // Overridden to define per-geometry connection points
        return (terminal?.cell?.geometry as CustomGeometryClass)?.constraints ?? null;
    };
}
// 自定义cell
export class EoCell extends Cell {
    constructor(value?: any, geometry?: Geometry | null, style?: CellStyle) {
        super(value, geometry, style);
    }
    type?: string;
}

export class CustomGeometryClass extends Geometry {
    // 定义连接点
    constraints = [
        new ConnectionConstraint(new Point(0.25, 0), true),
        new ConnectionConstraint(new Point(0.5, 0), true),
        new ConnectionConstraint(new Point(0.75, 0), true),
        new ConnectionConstraint(new Point(0, 0.25), true),
        new ConnectionConstraint(new Point(0, 0.5), true),
        new ConnectionConstraint(new Point(0, 0.75), true),
        new ConnectionConstraint(new Point(1, 0.25), true),
        new ConnectionConstraint(new Point(1, 0.5), true),
        new ConnectionConstraint(new Point(1, 0.75), true),
        new ConnectionConstraint(new Point(0.25, 1), true),
        new ConnectionConstraint(new Point(0.5, 1), true),
        new ConnectionConstraint(new Point(0.75, 1), true),
    ];
}
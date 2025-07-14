import { CommonModule } from '@angular/common';
import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { type CellStyle, Graph, GraphDataModel, InternalEvent } from '@maxgraph/core';

@Component({
    standalone: true,
    selector: 'eui-graph-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
    imports: [
        CommonModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EuiGraphEditorComponent implements OnInit, AfterViewInit {
    @ViewChild('graphEditor', { static: true })
    private graphEditor!: ElementRef<any>;
    constructor(
        private changeRef: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        const container = this.graphEditor.nativeElement;
        InternalEvent.disableContextMenu(container);
        // const graph = new Graph(container);
        // // 允许鼠标右键拖动
        // graph.setPanning(true);
        // // 一般性使用
        // const parent = graph.getDefaultParent();
        // 默认样式，在insertVertex前定义
        // const vertexStyle = graph.getStylesheet().getDefaultVertexStyle();
        // vertexStyle.rounded = true;
        // vertexStyle.dashed = true;
        // vertexStyle.strokeWidth = 2;
        // vertexStyle.strokeColor = 'green';


        // 批量添加节点和边
        // graph.batchUpdate(() => {
        //     const vertex01 = graph.insertVertex({
        //         parent,
        //         position: [10, 10],
        //         size: [100, 100],
        //         value: 'rectangle',
        //     });
        //     const vertex02 = graph.insertVertex({
        //         parent,
        //         position: [350, 90],
        //         size: [50, 50],
        //         style: {
        //             fillColor: 'orange',
        //             shape: 'ellipse',
        //             verticalAlign: 'top',
        //             verticalLabelPosition: 'bottom',
        //         },
        //         value: 'ellipse',
        //     });
        //     graph.insertEdge({
        //         parent,
        //         source: vertex01,
        //         target: vertex02,
        //         value: 'edge',
        //         style: {
        //             edgeStyle: 'orthogonalEdgeStyle',
        //             rounded: true,
        //         },
        //     });
        // });

        // 单独添加节点和边
        // 分支1
        // const vertex01 = graph.insertVertex({
        //     parent,
        //     position: [10, 10], // 0,0 is the top-left corner. So this is 10 pixels from the top and 10 pixels from the left.
        //     size: [100, 100], // width and height of your vertex
        //     style: { // Style object
        //         rounded: true,
        //         dashed: true,
        //         strokeWidth: 2,
        //         strokeColor: 'green',
        //     },
        //     value: 'rectangle', // The text to display in the vertex
        // });
        // const vertex02 = graph.insertVertex({
        //     parent,
        //     position: [350, 90],
        //     size: [50, 50],
        //     style: {
        //         fillColor: 'orange',
        //         shape: 'ellipse',
        //         verticalAlign: 'top',
        //         verticalLabelPosition: 'bottom',
        //     },
        //     value: 'ellipse',
        // });
        // graph.insertEdge({
        //     parent,
        //     source: vertex01, // Source vertex
        //     target: vertex02, // Second vertex that edge should point to
        //     value: '连接',
        //     style: {
        //         edgeStyle: 'orthogonalEdgeStyle',
        //         rounded: true,
        //         dashed: true,
        //         strokeWidth: 2,
        //         strokeColor: 'green',
        //     },
        // });





        const model = new GraphDataModel();
        const graph = new Graph(container, model);
        // 允许鼠标右键拖动
        graph.setPanning(true);
        // 允许html
        graph.setHtmlLabels(true);
        const parent = graph.getDefaultParent();

        // 推荐这种使用方法
        // beginUpdate和的使用endUpdate不仅可以提高显示性能，还可以在使用撤消/重做时标记可撤消更改的边界。
        graph.model.beginUpdate();
        try {
            const v1 = graph.insertVertex(parent, null, '<div class="myCustomDiv">hello</div>', 20, 20, 80, 30);
            const v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
            graph.insertEdge(parent, null, '', v1, v2);
        }
        finally {
            // Updates the display
            graph.model.endUpdate();
        }

        // 分支2
        const vertex11 = graph.insertVertex({
            value: 'another rectangle',
            position: [20, 200],
            size: [100, 100],
            style: {
                fillColor: 'red',
                fillOpacity: 20,
            },
        });
        const vertex12 = graph.insertVertex({
            value: 'another ellipse',
            x: 150,
            y: 350,
            width: 70,
            height: 70,
            style: {
                baseStyleNames: ['myEllipse'],
                fillColor: 'orange',
            },
        });
        // 分组
        const group = graph.groupCells(null, 0, [vertex11, vertex12])
        // 折叠。展开
        // graph.foldCells(true, true, [group]);
        // 动态修改样式
        setTimeout(() => {
            graph.model.beginUpdate();
            try {
                graph.setCellStyle({ rounded: true, dashed: true, }, [vertex11]);

            }
            finally {
                // Updates the display
                graph.model.endUpdate();
            }
            // graph
        }, 2000);

        // 事件监听
        graph.addListener(InternalEvent.CLICK, (sender, evt) => {
            const cell = evt.getProperty('cell');
            if (cell) {
                // Handle cell click
                console.log('Clicked cell:', cell);
            }
        });
        graph.addListener(InternalEvent.CELLS_MOVED, (sender, evt) => {
            const cells = evt.getProperty('cells');
            console.log(`Number of cells moved is: ${cells.length}`);
        })
    }
    ngAfterViewInit(): void {
    }
}

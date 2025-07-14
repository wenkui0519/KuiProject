import { CommonModule } from '@angular/common';
import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,
    ElementRef,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import {
    Cell, Graph,
    InternalEvent,
    cellArrayUtils, gestureUtils,
    eventUtils, domUtils,
    Client, KeyHandler, SelectionHandler,
    Rectangle,
    mathUtils,
    ConnectionHandler,
    styleUtils,
    Geometry,
    UndoManager,
} from '@maxgraph/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { StyleSheetStyles } from './stylesheet';
import { SceneComponentFnMapFn, sceneType } from './vertext.config';
import { CustomGeometryClass, EoCell, EoGraph } from './base/base-graph';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'eui-graph-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        NzSelectModule,
        NzInputModule,
        NzColorPickerModule,
        NzButtonModule,
        NzDrawerModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EuiGraphEditorComponent implements OnInit, AfterViewInit {
    @Input() config;
    @ViewChild('graphEditor', { static: true }) graphEditor!: ElementRef<any>;

    @ViewChild('width', { static: true }) width: TemplateRef<any>;
    @ViewChild('height', { static: true }) height: TemplateRef<any>;
    @ViewChild('fontColor', { static: true }) fontColor: TemplateRef<any>;
    // 文本水平布局
    @ViewChild('align', { static: true }) align: TemplateRef<any>;
    // 文本垂直布局
    @ViewChild('verticalAlign', { static: true }) verticalAlign: TemplateRef<any>;

    constructor(
        private changeRef: ChangeDetectorRef,
    ) { }
    private graph!: Graph;
    // 撤销重做
    private undoManager: UndoManager;
    public get canUndo() {
        return !this.undoManager.canUndo();
    }
    public get canRedo() {
        return !this.undoManager.canRedo();
    }
    // 获取元素配置
    private get graphConfig() {
        return SceneComponentFnMapFn();
    }
    // 侧边栏列表
    public leftMenu: any = [];
    // 
    private parent;
    // 备份控件实例，避免每次都要new。二次使用直接copy就行
    private cellElement: {
        [key: string]: Cell,
    } = {}
    // 当前选中的cell
    public activeCell: Cell | null = null;
    // 属性列表
    public attributes: any[] = [];
    // 属性值
    public attributesValue = {};
    // 文本水平位置方向
    public labelHorizontalArr = [
        { label: '左', value: 'left' },
        { label: '中', value: 'center' },
        { label: '右', value: 'right' },
    ]
    // 文本垂直位置方向
    public labelVerticalArr = [
        { label: '上', value: 'top' },
        { label: '中', value: 'center' },
        { label: '下', value: 'bottom' },
    ];
    // id标识
    private idCount = 0;
    // 显示弹窗
    public visible = false;

    ngOnInit() {
        // 设置图片路径
        Client.setImageBasePath('/assets/images')

        const container = this.graphEditor.nativeElement;
        InternalEvent.disableContextMenu(container);
        // this.graph = new Graph(container);
        this.graph = new EoGraph(container);

        // 添加基础样式
        for (const key in StyleSheetStyles) {
            const value = StyleSheetStyles[key];
            switch (key) {
                case 'defaultVertex':
                    this.graph.getStylesheet().putDefaultVertexStyle(value);
                    break;
                case 'defaultEdge':
                    this.graph.getStylesheet().putDefaultEdgeStyle(value);
                    break;
                default:
                    this.graph.getStylesheet().putCellStyle(key, value);
                    break;
            }
        }
        this.parent = this.graph.getDefaultParent();
        // 允许鼠标右键拖动
        this.graph.setPanning(true);
        // 允许html
        this.graph.setHtmlLabels(true);
        // 不能通过拖拽进入组合
        this.graph.setDropEnabled(false);
        // 允许链接
        this.graph.setConnectable(true);
        // 连接线样式
        this.graph.getStylesheet().getDefaultEdgeStyle().edgeStyle = 'orthogonalEdgeStyle';


        // 添加默认元素
        const cell = new EoCell('another rectangle', new CustomGeometryClass(20, 200, 100, 100), {
            fillColor: 'red',
            fillOpacity: 20,
        });
        this.idCount++;
        cell.type = 'Rectangle';
        cell.setId('DATA_' + this.idCount);
        cell.setVertex(true);
        this.graph.addCell(cell, null);


        // 开启基准线
        const selectionHandler: SelectionHandler = this.graph.getPlugin('SelectionHandler');
        if (selectionHandler) {
            selectionHandler.guidesEnabled = true;
        }

        // 初始化撤销回退
        this.initUndoRedo();

        // 快捷键监听
        this.initListenerKeys();

        // 事件监听
        this.initListenerHandler();

        // 侧边栏
        this.initGraphMenu();

    }
    ngAfterViewInit(): void {
        // 初始化可拖拽元素实例
        const cells = document.querySelectorAll('.eo-graph-list-item');
        cells.forEach((ele: Element) => {
            let id = ele.getAttribute('id'), control;
            if (id) {
                id = id.replace('eo-graph-element-', '');
                control = SceneComponentFnMapFn()[id];
            }
            if (control) {
                // 初始化拖拽
                this.initDrag(ele, control);
            }

        });
    }
    // 初始化左侧列表
    private initGraphMenu() {
        this.leftMenu = [];
        const menuList = SceneComponentFnMapFn();
        for (const key in menuList) {
            this.leftMenu.push(menuList[key])
        }
    }
    /**
     * 初始化拖拽
     * @param element 可拖拽元素
     * @param control 元素配置
     * */
    private initDrag(element: Element, control: any) {
        const { width, height, style } = control.config;
        const dragElement = document.createElement('div');
        dragElement.style.width = width + 'px';
        dragElement.style.height = height + 'px';
        dragElement.style.border = 'dashed black 1px';

        // 判断当前拖拽到哪个画布上
        const graphF = (evt) => {
            const x = eventUtils.getClientX(evt);
            const y = eventUtils.getClientY(evt);
            const elt = document.elementFromPoint(x, y);

            if (domUtils.isAncestorNode(this.graph.container, elt)) {
                return this.graph;
            }
            return null;
        };

        // 拖拽结束回调:插入元素
        const dropHandler = (graph, evt, target, x, y) => {
            let value = null;
            if (control.type === sceneType.flow) {
                value = `<div class="flow-control">${control.name}</div>`;
            }
            const cell = new EoCell(value, new CustomGeometryClass(x, y, width, height), style);
            this.idCount++;
            cell.setId('DATA_' + this.idCount);
            cell.setVertex(true);
            const type = control.key;
            // 设置类型
            cell.type = type;
            // 添加到画布
            graph.addCell(cell, null);
            graph.setSelectionCell(cell);
            // 渲染属性
            this.initAttribute(cell);
            // console.log('undo', this.canUndo);
        };
        // 定义可拖拽元素
        gestureUtils.makeDraggable(
            element,
            graphF,
            dropHandler,
            dragElement,
            null,
            null,
            this.graph.autoScroll,
            true
        );
    }
    // 初始化快捷键
    private initListenerKeys() {
        // Handles keystroke events
        const keyHandler = new KeyHandler(this.graph);

        // delete key
        keyHandler.bindKey(8, () => {
            const cells = this.graph.getSelectionCells();
            this.graph.removeCells(cells);
        });
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
              e.preventDefault();  // 阻止默认滚动行为
              e.stopPropagation(); // 阻止事件冒泡
            }
          });
    }
    // 初始化监听
    private initListenerHandler() {

        this.graph.addMouseListener(this.addIconForCell(this.graph));

        // 事件监听
        // 点击
        this.graph.addListener(InternalEvent.CLICK, (sender, evt) => {
            const cell = evt.getProperty('cell');
            if (cell) {
                this.initAttribute(cell);
            }
        });

        // 连接线回调
        const connectionHandler: ConnectionHandler = this.graph.getPlugin('ConnectionHandler');
        if (connectionHandler) {
            connectionHandler.addListener(InternalEvent.CONNECT, (sender, evt) => {
                const edge = evt.getProperty('cell'),
                    source = edge.source,
                    target = edge.target;
                let result = true;
                if (this.config?.enableConnect) {
                    result = this.config?.enableConnect(source, target);
                }
                if (!result) {
                    this.graph.removeCells([edge]);
                    evt.consume();
                }
            });
        }

    }
    // 为cell添加操作按钮
    private addIconForCell(graph) {
        // Defines the tolerance before removing the icons
        const ICON_TOLERANCE = 30;
        let icons = [];
        // 创建连接线
        const createEdge = (state, evt, direction: 'north' | 'south' | 'east' | 'west') => {
            if (state) {
                // 开启基准线
                const connectionHandler: ConnectionHandler = this.graph.getPlugin('ConnectionHandler');
                if (connectionHandler) {
                    connectionHandler.start(state, state.x, state.y);
                }
                this.graph.isMouseTrigger = eventUtils.isMouseEvent(evt);
                this.graph.isMouseDown = true;

                // 设置连接线方向
                var es = connectionHandler.edgeState;
                if (evt != null && es != null) {
                    const style: any = es.cell.getStyle();
                    style['sourcePortConstraint'] = direction;
                    es.cell.setStyle(style);
                }
            }
        }
        const defaultIcon = {
            setting: {
                title: 'delete',
                url: 'assets/images/gear.gif',
                width: 16,
                height: 16,
                left: (state) => {
                    return `${state.x + state.width - 20}px`;
                },
                top: (state) => {
                    return `${state.y - 16}px`;
                },
                clickHandler: (state, evt) => {
                    const cell = state.cell;
                    this.open();
                    InternalEvent.consume(evt);
                },
                dragHandler: (state, evt) => {
                    InternalEvent.consume(evt);
                },
            },
            delete: {
                title: 'delete',
                url: 'assets/images/delete2.png',
                width: 16,
                height: 16,
                left: (state) => {
                    return `${state.x + state.width}px`;
                },
                top: (state) => {
                    return `${state.y - 16}px`;
                },
                clickHandler: (state, evt) => {
                    graph.removeCells([state.cell]);
                    InternalEvent.consume(evt);
                    if (icons != null) {
                        for (const icon of icons) {
                            icon.parentNode.removeChild(icon);
                        }
                    }
                    icons = [];
                },
                dragHandler: (state, evt) => {
                    InternalEvent.consume(evt);
                },
            },
            triangleUp: {
                svg: '<path d="m 6 26 L 12 26 L 12 12 L 18 12 L 9 1 L 1 12 L 6 12 z" stroke="#fff" fill="#29b6f2"/>',
                width: 18,
                height: 28,
                opacity: 0.15,
                left: (state) => {
                    return `${state.x + (state.width - 18) / 2}px`;
                },
                top: (state) => {
                    return `${state.y - 28 - 5}px`;
                },
                dragHandler: (state, evt) => {
                    createEdge(state, evt, 'north');
                    InternalEvent.consume(evt);
                },
                mouseenterHandler: (state, evt, element) => {
                    styleUtils.setOpacity(element, 100);
                },
                mouseleaveHandler: (state, evt, element) => {
                },
            },

            triangleRight: {
                svg: '<path d="m 1 6 L 14 6 L 14 1 L 26 9 L 14 18 L 14 12 L 1 12 z" stroke="#fff" fill="#29b6f2"/>',
                width: 28,
                height: 18,
                opacity: 0.15,
                left: (state) => {
                    return `${state.x + state.width + 5}px`;
                },
                top: (state) => {
                    return `${state.y + (state.height - 18) / 2}px`;
                },
                dragHandler: (state, evt) => {
                    createEdge(state, evt, 'east');
                    InternalEvent.consume(evt);
                },
                mouseenterHandler: (state, evt, element) => {
                    styleUtils.setOpacity(element, 100);
                },
                mouseleaveHandler: (state, evt, element) => {
                    styleUtils.setOpacity(element, 15);
                },
            },

            triangleDown: {
                svg: '<path d="m 6 1 L 6 14 L 1 14 L 9 26 L 18 14 L 12 14 L 12 1 z" stroke="#fff" fill="#29b6f2"/>',
                width: 18,
                height: 26,
                opacity: 0.15,
                left: (state) => {
                    return `${state.x + (state.width - 18) / 2}px`;
                },
                top: (state) => {
                    return `${state.y + state.height + 5}px`;
                },
                dragHandler: (state, evt) => {
                    createEdge(state, evt, 'south');
                    InternalEvent.consume(evt);
                },
                mouseenterHandler: (state, evt, element) => {
                    styleUtils.setOpacity(element, 100);
                },
                mouseleaveHandler: (state, evt, element) => {
                    styleUtils.setOpacity(element, 15);
                },
            },

            triangleLeft: {
                svg: '<path d="m 1 9 L 12 1 L 12 6 L 26 6 L 26 12 L 12 12 L 12 18 z" stroke="#fff" fill="#29b6f2"/>',
                width: 28,
                height: 18,
                opacity: 0.15,
                left: (state) => {
                    return `${state.x - 28 - 5}px`;
                },
                top: (state) => {
                    return `${state.y + (state.height - 18) / 2}px`;
                },
                dragHandler: (state, evt) => {
                    createEdge(state, evt, 'west');
                    InternalEvent.consume(evt);
                },
                mouseenterHandler: (state, evt, element) => {
                    styleUtils.setOpacity(element, 100);
                },
                mouseleaveHandler: (state, evt, element) => {
                    styleUtils.setOpacity(element, 15);
                },
            }
        }

        // Defines a new class for all icons
        class mxIconSet {
            constructor(state) {
                for (const key in defaultIcon) {
                    const item = defaultIcon[key];
                    let icon;
                    if (item.url) {
                        icon = domUtils.createImage(item.url);
                    } else if (item.svg) {
                        icon = this.createSvgImage(item.width, item.height, item.svg);
                    }
                    if (item.title) {
                        icon.setAttribute('title', item.title);
                    }

                    Object.assign(icon.style, {
                        cursor: 'pointer',
                        position: 'absolute',
                        width: item.width,
                        height: item.height,
                        opacity: item.opacity,
                        left: item.left(state),
                        top: item.top(state),
                    });
                    if (item.dragHandler) {
                        InternalEvent.addGestureListeners(icon, (evt) => {
                            item.dragHandler(state, evt);
                        });
                    }
                    // 将鼠标事件捕获为图形上的事件
                    InternalEvent.redirectMouseEvents(icon, graph, state);

                    if (item.clickHandler) {
                        InternalEvent.addListener(icon, 'click', (evt) => {
                            item.clickHandler(state, evt);
                        });
                    }
                    if (item.mouseenterHandler) {
                        InternalEvent.addListener(icon, 'mouseenter', (evt) => {
                            item.mouseenterHandler(state, evt, icon);
                        });
                    }
                    if (item.mouseleaveHandler) {
                        InternalEvent.addListener(icon, 'mouseleave', (evt) => {
                            item.mouseleaveHandler(state, evt, icon);
                        });
                    }
                    state.view.graph.container.appendChild(icon);
                    icons.push(icon);
                }
            }

            destroy() {
                if (icons != null) {
                    for (const icon of icons) {
                        icon.parentNode.removeChild(icon);
                    }
                }
                icons = [];
            }
            createSvgImage(w, h, data) {
                var tmp = unescape(encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + w + 'px" height="' + h + 'px" ' +
                    'version="1.1">' + data + '</svg>'));

                return new DOMParser().parseFromString(tmp, "image/svg+xml").documentElement;
            };
        }
        return {
            currentState: null,
            currentIconSet: null,

            mouseDown(sender, me) {
                // Hides icons on mouse down
                if (this.currentState != null) {
                    this.dragLeave(me.getEvent(), this.currentState);
                    this.currentState = null;
                }
            },

            mouseMove(sender, me) {
                if (
                    this.currentState != null &&
                    (me.getState() === this.currentState || me.getState() == null)
                ) {
                    const tol = ICON_TOLERANCE;
                    const tmp = new Rectangle(
                        me.getGraphX() - tol,
                        me.getGraphY() - tol,
                        2 * tol,
                        2 * tol
                    );
                    if (mathUtils.intersects(tmp, this.currentState)) {
                        return;
                    }
                }

                let tmp = graph.view.getState(me.getCell());

                // Ignore everything but vertices
                if (graph.isMouseDown || (tmp != null && !tmp.cell.isVertex())) {
                    tmp = null;
                }

                if (tmp !== this.currentState) {
                    if (this.currentState != null) {
                        this.dragLeave(me.getEvent(), this.currentState);
                    }

                    this.currentState = tmp;
                    if (this.currentState != null) {
                        this.dragEnter(me.getEvent(), this.currentState);
                    }
                }
            },

            mouseUp(sender, me) { },

            dragEnter(evt, state) {
                if (this.currentIconSet == null) {
                    this.currentIconSet = new mxIconSet(state);
                }
            },

            dragLeave(evt, state) {
                if (this.currentIconSet != null) {
                    this.currentIconSet.destroy();
                    this.currentIconSet = null;
                }
            },
        }
    }
    // 添加控件
    public addControl(control: any) {
        const key = control.key;
        const { width, height, style } = control.config;
        let cell;
        if (this.cellElement[key]) {
            cell = this.cellElement[key];
        } else {
            let value = null;
            if (control.type === sceneType.flow) {
                value = `<div class="flow-control">${control.name}</div>`;
            }
            cell = new EoCell(value, new CustomGeometryClass(0, 0, width, height), style);
            // 设置类型
            cell.type = control.key;
            cell.setVertex(true);
            this.cellElement[key] = cell;
        }
        // 添加到画布并选中
        const result = cellArrayUtils.cloneCell(cell);
        this.idCount++;
        result.setId('DATA_' + this.idCount);
        this.graph.addCell(result, null);
        this.graph.setSelectionCell(result);
        // 渲染属性
        this.initAttribute(result);
    }
    // 渲染属性
    private initAttribute(cell) {
        const type = cell.type;
        // 渲染属性
        this.activeCell = cell;
        this.attributes = this.graphConfig[type].attributes;
        // 获取属性值
        this.attributesValue = {};
        if (this.graphConfig[type].attributesConfig) {
            for (const key of this.graphConfig[type].attributesConfig) {
                this.attributesValue[key] = this.getAttribute(key);
            }
        }
        this.changeRef.markForCheck();
    }
    // 获取属性模板
    public getTemplate(type) {
        switch (type) {
            case 'width': // 宽度
                return this.width;
            case 'height': // 高度
                return this.height;
            case 'fontColor': // 文本颜色
                return this.fontColor;
            case 'align': // 文本水平布局
                return this.align;
            case 'verticalAlign': // 文本垂直布局
                return this.verticalAlign;
        }
    }
    // 获取属性
    private getAttribute(attributeName, type: 'style' | any = 'style') {
        let result;
        const cell: Cell = this.activeCell;
        if (cell) {
            if (type === 'style') {
                const style = cell.getStyle();
                if (style[attributeName]) {
                    result = style[attributeName];
                } else {
                    const geometry: Geometry = cell.getGeometry();
                    result = geometry[attributeName];
                }
            }
        }
        return result;
    }
    // 属性设置
    public setAttribute(value, attributeName, type: 'style' | any = 'style') {
        const cell: Cell = this.activeCell;
        if (!cell) {
            return;
        }
        const model = this.graph.getDataModel();
        if (type === 'style') {
            if (attributeName === 'width' || attributeName === 'height') {
                const geometry = cell.getGeometry().clone();
                model.batchUpdate(() => {
                    geometry[attributeName] = value;
                    model.setGeometry(cell, geometry);
                });
            } else {
                // 实时更新样式
                model.batchUpdate(() => {
                    styleUtils.setCellStyles(this.graph.model, [cell], attributeName, value);
                });
            }
        }
    }
    private initUndoRedo() {
        this.undoManager = new UndoManager();
        let listener = (sender, evt) => {
            this.undoManager.undoableEditHappened(evt.getProperty('edit'));
        };
        this.graph.getDataModel().addListener(InternalEvent.UNDO, listener);
        this.graph.getView().addListener(InternalEvent.UNDO, listener);
    }
    // 撤销
    public undo() {
        this.undoManager.undo();
        this.reInitAttributeValue();
    }
    // 重做
    public redo() {
        this.undoManager.redo();
        this.reInitAttributeValue();
    }
    // 判断当前选中的cell，是否在视图中，并且重新初始化属性
    private reInitAttributeValue(): void {
        // 如果有激活的cell，则更新其属性
        if (this.activeCell) {
            const activeCellInGraph = this.graph.model.getCell(this.activeCell.id);
            if (activeCellInGraph) {
                console.log('activeCellInGraph');
                this.initAttribute(activeCellInGraph);
            } else {
                this.activeCell = null;
                this.attributes = [];
                this.attributesValue = {};
                this.changeRef.markForCheck();
            }
        }
    }
    // 放大缩小
    public zoom(type: 'in' | 'out' | 'actual' | 'fit') {
        if (type === 'in') {
            this.graph.zoomIn();
        } else if (type === 'out') {
            this.graph.zoomOut();
        } else if (type === 'actual') {
            this.graph.zoomActual();
        } else if (type === 'fit') {
            this.graph.fit();
        }
    }

    open(): void {
        this.visible = true;
        this.changeRef.markForCheck();
    }

    close(): void {
        this.visible = false;
        this.changeRef.markForCheck();
    }


}

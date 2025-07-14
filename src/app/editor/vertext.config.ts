import { getIconPath } from "../utils/getIconPath";

export enum sceneType {
    'basic',
    'connect',
    'advanced',
    'flow',
}
export const SceneComponentFnMapFn: any = () => {
    return {
        Rectangle: {
            key: 'Rectangle',
            name: '矩形',
            type: sceneType.basic,
            icon: getIconPath('/assets/images/Rectangle.png'),
            config: {
                style: {
                    rounded: false,
                    whiteSpace: 'wrap',
                    html: '1',
                },
                width: 120,
                height: 60,
                value: '',
                title: 'Rectangle',
                showLabel: null,
                showTitle: null,
                tags: 'rect rectangle box',
                allowCellsInserted: false,
                isEdge: false,
            },
            attributes: [{
                'title': '图形样式',
                'list': ['height', 'width'],
            }, {
                'title': '文本样式',
                'list': ['fontColor', 'align', 'verticalAlign']
            }],
            attributesConfig: [
                'height', 'width', 'fontColor', 'align', 'verticalAlign'
            ],
        },
        Circle: {
            key: 'Circle',
            name: '圆形',
            type: sceneType.basic,
            icon: getIconPath('/assets/images/Circle.png'),
            config: {
                style: {
                    shape: 'ellipse',
                    whiteSpace: 'wrap',
                    html: '1',
                    aspect: 'fixed',
                },
                width: 80,
                height: 80,
                value: '',
                title: 'Circle',
                showLabel: null,
                showTitle: null,
                tags: 'circle',
                allowCellsInserted: undefined,
                isEdge: false,
            },
            attributes: [{
                'title': '图形样式',
                'list': ['height', 'width'],
            }, {
                'title': '文本样式',
                'list': ['fontColor', 'align', 'verticalAlign']
            }],
            attributesConfig: [
                'height', 'width', 'fontColor', 'align', 'verticalAlign'
            ],
        },
        RoundedRectangle: {
            key: 'RoundedRectangle',
            name: '按钮',
            type: sceneType.basic,
            icon: getIconPath('/assets/images/RoundedRectangle.png'),
            config: {
                style: {
                    rounded: true,
                    arcSize: 15,
                    whiteSpace: 'wrap',
                    html: '1',
                },
                width: 80,
                height: 40,
                value: 'Button',
                title: 'Rounded Rectangle',
                showLabel: null,
                showTitle: null,
                tags: 'rounded rect rectangle box',
                allowCellsInserted: undefined,
                isEdge: false,
            },
            attributes: [{
                'title': '图形样式',
                'list': ['height', 'width'],
            }, {
                'title': '文本样式',
                'list': ['fontColor', 'align', 'verticalAlign']
            }],
            attributesConfig: [
                'height', 'width', 'fontColor', 'align', 'verticalAlign'
            ],
        },
        Image: {
            key: 'Image',
            name: '图片',
            icon: getIconPath('/assets/images/Image.png'),
            type: sceneType.basic,
            config: {
                style: {
                    shape: 'image',
                    html: '1',
                    labelBackgroundColor: '#ffffff',
                    image: getIconPath(
                        '/assets/images/Image.png',
                    ),
                },
                width: 80,
                height: 80,
                value: '',
                title: 'Image',
                showLabel: null,
                showTitle: null,
                tags: 'diamond rhombus if condition decision conditional question test',
                allowCellsInserted: undefined,
                isEdge: false,
            },
            attributes: [{
                'title': '图形样式',
                'list': ['height', 'width'],
            }, {
                'title': '文本样式',
                'list': ['fontColor', 'align', 'verticalAlign']
            }],
            attributesConfig: [
                'height', 'width', 'fontColor', 'align', 'verticalAlign'
            ],
        },
        FlowStart: {
            key: 'FlowStart',
            name: '发起节点',
            type: sceneType.flow,
            icon: getIconPath('/assets/images/straight.gif'),
            config: {
                style: {
                    rounded: false,
                    whiteSpace: 'wrap',
                    html: '1',
                },
                width: 160,
                height: 80,
                value: '',
                title: '发起节点',
                showLabel: null,
                showTitle: null,
                tags: 'rect rectangle box',
                allowCellsInserted: false,
                isEdge: false,
            },
        },
        FlowNode: {
            key: 'FlowNode',
            name: '流转节点',
            type: sceneType.flow,
            icon: getIconPath('/assets/images/rounded.gif'),
            config: {
                style: {
                    rounded: false,
                    whiteSpace: 'wrap',
                    html: '1',
                },
                width: 160,
                height: 80,
                value: '',
                title: '流转节点',
                showLabel: null,
                showTitle: null,
                tags: 'rect rectangle box',
                allowCellsInserted: false,
                isEdge: false,
            },
        },
        FlowEnd: {
            key: 'FlowEnd',
            name: '结束节点',
            type: sceneType.flow,
            icon: getIconPath('/assets/images/rhombus.gif'),
            config: {
                style: {
                    rounded: false,
                    whiteSpace: 'wrap',
                    html: '1',
                },
                width: 160,
                height: 80,
                value: '',
                title: '结束节点',
                showLabel: null,
                showTitle: null,
                tags: 'rect rectangle box',
                allowCellsInserted: false,
                isEdge: false,
            },
        },
    }
};
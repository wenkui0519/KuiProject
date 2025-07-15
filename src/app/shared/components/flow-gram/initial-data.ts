// 模拟数据
export const InitialData = [
  {
    id: 'start_0',
    type: 'start',
    blocks: [],
    data: {
      title: 'Start',
      type: 'start',
    },
  },
  {
    id: 'default_0',
    type: 'default',
    blocks: [],
    data: {
      title: 'default',
      type: 'default',
    },
  },
  {
    id: 'switch_0',
    type: 'switch',
    data: {
      title: 'Switch',
      type: 'switch',
    },
    blocks: [
      {
        id: 'case_0',
        type: 'case',
        data: {
          title: 'Case_0',
          type: 'case',
        },
        blocks: [],
      },
      {
        id: 'case_1',
        type: 'case',
        data: {
          title: 'Case_1',
          type: 'case',
        },
      },
      {
        id: 'case_default_1',
        type: 'caseDefault',
        data: {
          title: 'Default',
          type: 'caseDefault',
        },
        blocks: [],
      },
    ],
  },
  {
    id: 'loop_0',
    type: 'loop',
    data: {
      title: 'Loop',
      type: 'loop',
    },
    blocks: [
      {
        id: 'if_0',
        type: 'if',
        data: {
          title: 'If',
          type: 'if'
        },
        blocks: [
          {
            id: 'if_true',
            type: 'ifBlock',
            data: {
              title: 'true',
              type: 'ifBlock',
            },
            blocks: [],
          },
          {
            id: 'if_false',
            type: 'ifBlock',
            data: {
              title: 'false',
              type: 'ifBlock',
            },
            blocks: [
              {
                id: 'break_0',
                type: 'breakLoop',
                data: {
                  title: 'BreakLoop',
                  type: 'breakLoop',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'tryCatch_0',
    type: 'tryCatch',
    data: {
      title: 'TryCatch',
      type: 'tryCatch',
    },
    blocks: [
      {
        id: 'tryBlock_0',
        type: 'tryBlock',
        data: {
          type: 'tryCatch',
        },
        blocks: [],
      },
      {
        id: 'catchBlock_0',
        type: 'catchBlock',
        data: {
          title: 'Catch Block 1',
          type: 'catchBlock',
        },
        blocks: [],
      },
      {
        id: 'catchBlock_1',
        type: 'catchBlock',
        data: {
          title: 'Catch Block 2',
          type: 'catchBlock',
        },
        blocks: [],
      },
    ],
  },
  {
    id: 'end_0',
    type: 'end',
    blocks: [],
    data: {
      title: 'End',
      type: 'end',
    },
  },
];

import { MenuItemType } from '../interface/menu';

export const MenuItem: MenuItemType[] = [
  {
    id: '64f',
    name: '好喝黑糖',
    children: [
      {
        id: '445',
        name: '黑糖鮮奶',
        children: [
          {
            id: '37a',
            name: '黑糖珍珠鮮奶',
          },
          {
            id: 'feb',
            name: '黑糖芋圓鮮奶',
          },
          {
            id: '59c',
            name: '黑糖蒟蒻鮮奶',
          },
        ],
      },
      {
        id: '29e',
        name: '黑糖冬瓜',
        children: [
          {
            id: 'ac3',
            name: '黑糖冬瓜牛奶',
          },
          {
            id: 'ca0',
            name: '黑糖冬瓜珍珠',
          },
        ],
      },
    ],
  },
  {
    id: '6c3',
    name: '茶',
    children: [
      {
        id: '5dc',
        name: '烏龍綠',
      },
      {
        id: 'b5f',
        name: '綠茶',
      },
      {
        id: 'b09',
        name: '紅茶',
      },
      {
        id: '887',
        name: '青茶',
      },
    ],
  },
  {
    id: 'c81',
    name: '咖啡',
    children: [
      {
        id: 'e02',
        name: '黑咖啡',
        children: [
          {
            id: 'd20',
            name: '濃縮咖啡',
          },
          {
            id: '1f8',
            name: '美式咖啡',
          },
        ],
      },
      {
        id: 'd7a',
        name: '牛奶咖啡',
        children: [
          {
            id: 'c09',
            name: '拿鐵',
            children: [
              {
                id: 'db2',
                name: '黑糖拿鐵',
              },
              {
                id: '9f6',
                name: '榛果拿鐵',
              },
              {
                id: 'b61',
                name: '香草拿鐵',
              },
            ],
          },
          {
            id: '9ac',
            name: '卡布奇諾',
          },
          {
            id: 'ce8',
            name: '摩卡',
          },
        ],
      },
    ],
  },
];

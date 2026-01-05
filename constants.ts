import { CategoryType, Dish } from './types';

export const MAX_TOTAL_ORDERS = 6;

export const MENU_ITEMS: Dish[] = [
  // Meat (荤菜)
  {
    id: 'm1',
    name: '苹果炖排骨',
    category: CategoryType.MEAT,
    description: 'Fresh apples stewed with tender pork ribs, sweet and savory.',
    imageSeed: 101,
  },
  {
    id: 'm2',
    name: '蒜香蜂蜜黄油烤鸡翅',
    category: CategoryType.MEAT,
    description: 'Oven-roasted wings glazed with honey butter and garlic.',
    imageSeed: 102,
  },
  {
    id: 'm3',
    name: '山楂排骨',
    category: CategoryType.MEAT,
    description: 'Sweet and sour ribs cooked with fresh hawthorn berry.',
    imageSeed: 103,
  },
  {
    id: 'm4',
    name: '三杯鸡',
    category: CategoryType.MEAT,
    description: 'Taiwanese classic chicken braised in soy sauce, rice wine, and sesame oil.',
    imageSeed: 104,
  },
  {
    id: 'm5',
    name: '冬笋炒腊肉',
    category: CategoryType.MEAT,
    description: 'Stir-fried winter bamboo shoots with cured pork belly.',
    imageSeed: 105,
  },
  {
    id: 'm6',
    name: '辣子鸡',
    category: CategoryType.MEAT,
    description: 'Crispy fried chicken cubes with dried chili peppers.',
    imageSeed: 106,
  },
  {
    id: 'm7',
    name: '小炒黄牛肉',
    category: CategoryType.MEAT,
    description: 'Spicy stir-fried beef with wild peppers and cilantro.',
    imageSeed: 107,
  },
  
  // Vegetables (素菜) - *Fish-flavored eggplant is often categorized here despite name*
  {
    id: 'v1',
    name: '鱼香茄子',
    category: CategoryType.VEGETABLE,
    description: 'Braised eggplant in a spicy, sweet, and sour garlic sauce.',
    imageSeed: 201,
  },
  {
    id: 'v2',
    name: '黄油烤芦笋',
    category: CategoryType.VEGETABLE,
    description: 'Tender asparagus spears roasted with butter and sea salt.',
    imageSeed: 202,
  },
  {
    id: 'v3',
    name: '清炒芦蒿',
    category: CategoryType.VEGETABLE,
    description: 'Stir-fried Artemisia selengensis, fresh and aromatic.',
    imageSeed: 203,
  },
  {
    id: 'v4',
    name: '白灼鸡毛菜',
    category: CategoryType.VEGETABLE,
    description: 'Blanched baby bok choy with a light soy dressing.',
    imageSeed: 204,
  },

  // Soup (汤)
  {
    id: 's1',
    name: '奶油南瓜汤',
    category: CategoryType.SOUP,
    description: 'Rich and creamy pumpkin soup with a touch of cream.',
    imageSeed: 301,
  },
  {
    id: 's2',
    name: '椰子鸡汤',
    category: CategoryType.SOUP,
    description: 'Chicken simmered in pure coconut water, sweet and refreshing.',
    imageSeed: 302,
  },
];
export enum CategoryType {
  MEAT = '荤菜',
  VEGETABLE = '素菜',
  SOUP = '汤',
}

export interface Dish {
  id: string;
  name: string;
  category: CategoryType;
  description: string;
  imageSeed: number; // For consistent placeholder images
}

export interface Order {
  dishId: string;
  userId: string; // WeChat ID
  timestamp: number;
}

export interface UserSession {
  wechatId: string;
  isLoggedIn: boolean;
}
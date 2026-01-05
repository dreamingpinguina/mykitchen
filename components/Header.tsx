import React from 'react';
import { Order, Dish, CategoryType } from '../types';
import { MENU_ITEMS, MAX_TOTAL_ORDERS } from '../constants';

interface HeaderProps {
  orders: Order[];
  currentUser: string;
  activeCategory: CategoryType | 'ALL';
  onCategoryChange: (cat: CategoryType | 'ALL') => void;
}

const Header: React.FC<HeaderProps> = ({ 
  orders, 
  currentUser, 
  activeCategory, 
  onCategoryChange 
}) => {
  const count = orders.length;
  const percentage = Math.min((count / MAX_TOTAL_ORDERS) * 100, 100);
  const isFull = count >= MAX_TOTAL_ORDERS;

  // Resolve ordered dishes names
  const orderedDishes = orders.map(o => {
    const dish = MENU_ITEMS.find(m => m.id === o.dishId);
    return {
      name: dish?.name || '未知菜品',
      user: o.userId
    };
  });

  const categories = ['ALL', CategoryType.MEAT, CategoryType.VEGETABLE, CategoryType.SOUP];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all duration-300">
      <div className="max-w-3xl mx-auto px-4 pt-4 pb-2">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h1 className="text-xl font-serif font-bold text-chef-dark">私家菜单</h1>
            <p className="text-xs text-stone-500 font-mono mt-1">当前用户: {currentUser}</p>
          </div>
          <div className="text-right">
            <span className={`text-2xl font-bold ${isFull ? 'text-red-500' : 'text-chef-gold'}`}>
              {count}
            </span>
            <span className="text-stone-400 text-sm"> / {MAX_TOTAL_ORDERS}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden mb-3">
          <div 
            className={`h-full transition-all duration-500 ease-out ${isFull ? 'bg-red-500' : 'bg-chef-gold'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Ordered List Ticker */}
        {orderedDishes.length > 0 && (
          <div className="mb-3 text-xs text-stone-600 overflow-x-auto whitespace-nowrap pb-1 no-scrollbar flex gap-2">
            <span className="font-semibold text-stone-400 uppercase tracking-wider shrink-0">已点:</span>
            {orderedDishes.map((item, idx) => (
              <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded bg-stone-100 border border-stone-200">
                 {item.name} <span className="ml-1 opacity-50 text-[10px]">({item.user})</span>
              </span>
            ))}
          </div>
        )}
        
        {isFull && (
          <div className="mb-3 text-center text-xs text-red-500 font-medium bg-red-50 py-1 rounded">
            本日菜单已满，停止接单。
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat as CategoryType | 'ALL')}
              className={`
                px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                ${activeCategory === cat 
                  ? 'bg-chef-dark text-white shadow-md' 
                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                }
              `}
            >
              {cat === 'ALL' ? '全部' : cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
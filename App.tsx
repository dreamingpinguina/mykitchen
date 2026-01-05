import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import DishCard from './components/DishCard';
import UserAuth from './components/UserAuth';
import { MENU_ITEMS, MAX_TOTAL_ORDERS } from './constants';
import { CategoryType, Order, UserSession } from './types';
import { getStoredOrders, saveOrder, removeOrder, clearOrders } from './services/storageService';

const App: React.FC = () => {
  const [session, setSession] = useState<UserSession>({ wechatId: '', isLoggedIn: false });
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'ALL'>('ALL');
  const [notification, setNotification] = useState<string | null>(null);

  // Load orders on mount
  useEffect(() => {
    const stored = getStoredOrders();
    setOrders(stored);
  }, []);

  const handleLogin = (wechatId: string) => {
    setSession({ wechatId, isLoggedIn: true });
  };

  const handleLogout = () => {
    setSession({ wechatId: '', isLoggedIn: false });
  };

  // Demo feature: Clear all data
  const handleReset = () => {
    if (window.confirm('确定要重置所有订单数据吗？')) {
      clearOrders();
      setOrders([]);
    }
  };

  const hasUserOrdered = useMemo(() => {
    return orders.some(o => o.userId === session.wechatId);
  }, [orders, session.wechatId]);

  const isMenuFull = orders.length >= MAX_TOTAL_ORDERS;

  const handleOrder = (dishId: string) => {
    if (!session.isLoggedIn) return;

    if (isMenuFull) {
      showNotification('菜单已满，无法下单。');
      return;
    }

    if (hasUserOrdered) {
      showNotification('您已点过菜品，每人限点一道。');
      return;
    }

    const dish = MENU_ITEMS.find(d => d.id === dishId);
    if (!dish) return;

    // Instant submit
    const newOrder: Order = {
      dishId,
      userId: session.wechatId,
      timestamp: Date.now(),
    };

    const updatedOrders = saveOrder(newOrder);
    setOrders(updatedOrders);
    showNotification(`已点 "${dish.name}"`);
  };

  const handleCancel = (dishId: string) => {
    if (!session.isLoggedIn) return;
    
    // Optional: Confirm before cancel
    // if (!window.confirm('确定要退掉这道菜吗？')) return;

    const updatedOrders = removeOrder(session.wechatId);
    setOrders(updatedOrders);
    showNotification('已退菜');
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL') return MENU_ITEMS;
    return MENU_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  if (!session.isLoggedIn) {
    return <UserAuth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen pb-20">
      <Header 
        orders={orders} 
        currentUser={session.wechatId}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {filteredItems.map(dish => (
            <DishCard 
              key={dish.id} 
              dish={dish} 
              isMenuFull={isMenuFull}
              hasUserOrderedAny={hasUserOrdered}
              isSelected={orders.some(o => o.dishId === dish.id && o.userId === session.wechatId)}
              onOrder={handleOrder}
              onCancel={handleCancel}
            />
          ))}
        </div>
      </main>

      {/* Footer / Controls for Demo */}
      <footer className="max-w-3xl mx-auto mt-12 px-4 py-8 border-t border-stone-200 text-center">
        <p className="text-stone-400 text-xs mb-4">私家点菜 Demo</p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={handleLogout}
            className="text-xs text-stone-500 underline hover:text-chef-dark"
          >
            切换用户
          </button>
          <button 
            onClick={handleReset}
            className="text-xs text-red-400 underline hover:text-red-600"
          >
            重置数据
          </button>
        </div>
      </footer>

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-chef-dark text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2">
            <span className="text-sm font-medium">{notification}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
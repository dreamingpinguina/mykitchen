import React, { useState } from 'react';

interface UserAuthProps {
  onLogin: (wechatId: string) => void;
}

const UserAuth: React.FC<UserAuthProps> = ({ onLogin }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().length > 0) {
      onLogin(input.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <h2 className="font-serif text-2xl font-bold text-chef-dark mb-2">欢迎光临</h2>
          <p className="text-stone-500 text-sm">请输入您的微信 ID 开始点餐</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="例如: User123"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-chef-gold focus:ring-2 focus:ring-chef-gold/20 outline-none transition-all mb-4 text-center text-lg"
            autoFocus
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-full bg-chef-dark text-white py-3 rounded-xl font-medium hover:bg-chef-gold disabled:opacity-50 disabled:hover:bg-chef-dark transition-colors"
          >
            进入菜单
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAuth;
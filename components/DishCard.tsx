import React from 'react';
import { Dish } from '../types';

interface DishCardProps {
  dish: Dish;
  isMenuFull: boolean;
  hasUserOrderedAny: boolean;
  isSelected: boolean;
  onOrder: (dishId: string) => void;
  onCancel: (dishId: string) => void;
}

const DishCard: React.FC<DishCardProps> = ({ 
  dish, 
  isMenuFull, 
  hasUserOrderedAny, 
  isSelected, 
  onOrder,
  onCancel
}) => {
  // Determine card state
  // If selected, we want to allow cancelling, so we don't disable based on menu full or ordered status
  const isDisabled = !isSelected && (hasUserOrderedAny || isMenuFull);
  
  let buttonText = '下单';
  let buttonStyle = 'bg-chef-dark text-white hover:bg-chef-gold shadow-sm active:scale-95';
  let onClickHandler = () => onOrder(dish.id);

  if (isSelected) {
    buttonText = '退菜';
    buttonStyle = 'bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300';
    onClickHandler = () => onCancel(dish.id);
  } else if (hasUserOrderedAny) {
    buttonText = '限点一道';
    buttonStyle = 'bg-stone-100 text-stone-400 cursor-not-allowed';
  } else if (isMenuFull) {
    buttonText = '已满';
    buttonStyle = 'bg-stone-100 text-stone-400 cursor-not-allowed';
  }

  return (
    <div className={`relative group flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 border border-stone-100 ${isDisabled ? 'opacity-60 grayscale-[0.3]' : 'hover:shadow-md'}`}>
      {/* Image Section */}
      <div className="md:w-32 h-32 md:h-auto shrink-0 bg-stone-200 relative overflow-hidden">
        <img 
          src={`https://picsum.photos/seed/${dish.imageSeed}/300/300`} 
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-serif text-lg font-bold text-chef-dark">{dish.name}</h3>
            {isSelected && (
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                已点
              </span>
            )}
          </div>
          <p className="text-sm text-stone-500 mt-1 line-clamp-2">{dish.description}</p>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClickHandler}
            disabled={isDisabled}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${buttonStyle}`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
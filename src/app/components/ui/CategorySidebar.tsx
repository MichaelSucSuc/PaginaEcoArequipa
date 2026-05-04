import React from 'react';

// Definimos qué "props" (datos) va a recibir este componente desde la página principal
interface CategorySidebarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({ activeCategory, onSelectCategory }) => {
  // Tus 3 categorías exactas + 1 para ver todo
  const categories = [
    { id: 'todos', name: 'Todos los productos', icon: '🍃' },
    { id: 'snacks', name: 'Snacks Saludables', icon: '🥜' },
    { id: 'cosmetica', name: 'Cosmética Natural', icon: '🌿' },
    { id: 'hogar', name: 'Hogar Reutilizable', icon: '♻️' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-green-700 text-white font-bold p-4 text-sm tracking-wider uppercase">
        Categorías
      </div>
      
      <ul className="flex flex-col">
        {categories.map((cat) => (
          <li 
            key={cat.id} 
            // Al hacer clic, enviamos el ID de esta categoría a la página principal
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-3 p-4 cursor-pointer text-sm transition-colors border-b border-gray-100 last:border-0
              ${activeCategory === cat.id 
                ? 'text-green-600 font-medium bg-green-50 border-l-4 border-l-green-600' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-green-700 border-l-4 border-transparent'}`}
          >
            <span className="text-xl w-6 text-center">{cat.icon}</span>
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
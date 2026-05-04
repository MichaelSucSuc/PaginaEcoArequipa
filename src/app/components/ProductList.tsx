import React, { useState, useEffect } from 'react'; 
import { useLocation } from "react-router";
import { CategorySidebar } from './ui/CategorySidebar';
import { ProductListItem } from './ui/ProductListItem';

export const ProductList = () => {
  // 1. Leemos si la página anterior (Home) nos envió algún dato
  const location = useLocation();
  const initialCategory = location.state?.categoryId || 'todos';

  // 2. Iniciamos el estado con esa categoría
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  // 3. Este efecto actualiza la categoría si el usuario usa los botones del Home repetidas veces
  useEffect(() => {
    if (location.state?.categoryId) {
      setActiveCategory(location.state.categoryId);
    }
  }, [location.state]);

  // 4. Base de datos simulada
  const products = [
    { id: 'SNK-001', title: 'Mix de Frutos Secos Andinos', code: 'SNK-001', price: '15.00', unitInfo: '250g', inStock: true, categoryId: 'snacks', imageUrl: 'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=200&h=200&fit=crop' },
    { id: 'SNK-002', title: 'Chips de Papas Nativas', code: 'SNK-002', price: '8.50', unitInfo: '150g', inStock: true, categoryId: 'snacks', imageUrl: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&h=600&fit=crop' },
    { id: 'COSM-AQ-042', title: 'Shampoo Sólido de Romero', code: 'COS-042', price: '25.00', unitInfo: 'Und', inStock: true, categoryId: 'cosmetica', imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&h=200&fit=crop' },
    { id: '4', title: 'Jabón Artesanal de Eucalipto', code: 'COS-015', price: '12.00', unitInfo: 'Und', inStock: false, categoryId: 'cosmetica', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI6YbRVPsP0DSkSRWIA2lPxG8JXGk_NqHzgg&s' },
    { id: '5', title: 'Bolsa de Tela Orgánica (Tote bag)', code: 'HOG-101', price: '20.00', unitInfo: 'Und', inStock: true, categoryId: 'hogar', imageUrl: 'https://images.unsplash.com/photo-1597348989645-46b190ce4918?w=200&h=200&fit=crop' },
    { id: '6', title: 'Detergente Biodegradable', code: 'HOG-201', price: '32.00', unitInfo: '1 Litro', inStock: true, categoryId: 'hogar', imageUrl: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=200&h=200&fit=crop' }
  ];

  // 5. Filtrado lógico
  const filteredProducts = activeCategory === 'todos' 
    ? products 
    : products.filter(product => product.categoryId === activeCategory);

  // 6. Títulos dinámicos según la selección
  const categoryTitles: Record<string, string> = {
    'todos': 'Explora nuestro catálogo',
    'snacks': 'Snacks Saludables',
    'cosmetica': 'Cosmética Natural',
    'hogar': 'Hogar Reutilizable'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="text-sm text-gray-500 mb-6">
        <span className="text-green-600 cursor-pointer hover:underline">Inicio</span> / Categorías
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Columna Izquierda: Menú Lateral */}
        <div className="w-full md:w-1/4">
          <CategorySidebar 
            activeCategory={activeCategory} 
            onSelectCategory={setActiveCategory} 
          />
        </div>

        {/* Columna Derecha: Lista de Productos */}
        <div className="w-full md:w-3/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
            <h1 className="text-2xl font-semibold text-green-700">{categoryTitles[activeCategory]}</h1>
            <p className="text-gray-600 mt-2">Productos 100% ecológicos de Arequipa para cuidar de ti y del planeta.</p>
          </div>

          <div className="flex flex-col gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductListItem 
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  code={product.code}
                  price={product.price}
                  unitInfo={product.unitInfo}
                  inStock={product.inStock}
                  imageUrl={product.imageUrl}
                />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 bg-white rounded border border-gray-200">
                No hay productos en esta categoría por el momento.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
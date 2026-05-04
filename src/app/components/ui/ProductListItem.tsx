import React from 'react';
import { Link } from "react-router";

interface ProductProps {
  id: string;
  title: string;
  code: string;
  price: string;
  unitInfo: string;
  inStock: boolean;
  imageUrl: string;
}

export const ProductListItem: React.FC<ProductProps> = ({ id,title, code, price, unitInfo, inStock, imageUrl }) => {
  return (
   <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <img src={imageUrl} alt={title} className="w-20 h-20 object-cover rounded" />
        <div>
          <h3 className="text-green-700 font-medium">{title}</h3>
          <p className="text-xs text-gray-500 uppercase">CODE: {code}</p>
          <p className={inStock ? "text-xs text-green-600" : "text-xs text-red-600"}>
            {inStock ? 'En Stock' : 'Agotado'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="text-right">
          <span className="text-sm text-gray-400 font-light">S/</span>
          <span className="text-xl font-bold"> {price}</span>
          <span className="text-xs text-gray-400"> /{unitInfo}</span>
        </div>

        {/* 👈 CAMBIO AQUÍ: El botón ahora es un Link que usa el ID */}
        <Link 
          to={`/producto/${id}`} 
          className="px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition-colors"
        >
          Explorar
        </Link>
      </div>
    </div>
  );
};
import React from "react";
import type { Product } from "../types/Product";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 max-w-xs mx-auto min-w-[300px]">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h2 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h2>
        </Link>
        <p className="text-gray-600">Кількість: {product.count}</p>
        <p className="text-gray-600">Вага: {product.weight}</p>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => onEdit(product)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Редагувати
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            onClick={() => onDelete(product.id)}
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

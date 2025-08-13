import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import type { RootState, AppDispatch } from "../redux/store";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div className="p-4 text-center">Завантаження...</div>;
  }

  if (status === "failed") {
    return <div className="p-4 text-center text-red-500">Помилка: {error}</div>;
  }

  if (!product) {
    return (
      <div className="p-4 text-center bg-white rounded-lg shadow-lg max-w-lg mx-auto mt-10">
        <h1 className="text-2xl text-gray-700 font-bold mb-4">
          Продукт не знайдено.
        </h1>
        <p className="text-gray-600 mb-4">
          Перевірте правильність URL-адреси або поверніться до списку.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Повернутися до списку
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto mt-10">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          />
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-gray-700 mb-2">
              Кількість: {product.count}
            </p>
            <p className="text-lg text-gray-700 mb-2">Вага: {product.weight}</p>
            <p className="text-lg text-gray-700 mb-4">
              Розмір: {product.size.width}x{product.size.height}
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Повернутися до списку
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

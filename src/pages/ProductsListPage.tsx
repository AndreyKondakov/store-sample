import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { deleteProduct, fetchProducts } from "../redux/productsSlice";
import ProductCard from "../components/ProductCard";
import DeleteConfirmationModal from "../components/Modals/DeleteConfirmationModal";
import ProductFormModal from "../components/Modals/ProductFormModal";
import type { Product } from "../types/Product";

const ProductsListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  const [sortBy, setSortBy] = useState<"name" | "count">("name");
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState<number | null>(
    null
  );
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleDeleteConfirm = () => {
    if (productToDeleteId !== null) {
      dispatch(deleteProduct(productToDeleteId));
      setProductToDeleteId(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setProductToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setIsFormModalOpen(true);
  };

  const handleAddClick = () => {
    setProductToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleFormModalClose = () => {
    setIsFormModalOpen(false);
    setProductToEdit(null);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const sortedProducts = useMemo(() => {
    const productsCopy = [...products];
    if (sortBy === "name") {
      productsCopy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "count") {
      productsCopy.sort((a, b) => b.count - a.count);
    }
    return productsCopy;
  }, [products, sortBy]);

  if (status === "loading") {
    return <div className="p-4 text-center">Завантаження...</div>;
  }

  if (status === "failed") {
    return <div className="p-4 text-center text-red-500">Помилка: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Список продуктів</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleAddClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Додати продукт
            </button>
            <div>
              <label htmlFor="sort" className="mr-2 text-gray-700">
                Сортувати за:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "count")}
                className="p-2 border rounded-md"
              >
                <option value="name">Назвою</option>
                <option value="count">Кількістю</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDeleteClick}
              onEdit={handleEditClick}
            />
          ))}
        </div>

        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />

        <ProductFormModal
          isOpen={isFormModalOpen}
          onClose={handleFormModalClose}
          productToEdit={productToEdit}
        />
      </div>
    </div>
  );
};

export default ProductsListPage;

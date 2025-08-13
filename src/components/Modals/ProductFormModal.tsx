import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../redux/productsSlice";
import Modal from "../Modal";
import type { AppDispatch } from "../../redux/store";
import type { NewProduct } from "../../redux/productsSlice";
import type { Product } from "../../types/Product";

type FormInputs = NewProduct;

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit: Product | null;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  productToEdit,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    if (productToEdit) {
      reset({
        imageUrl: productToEdit.imageUrl,
        name: productToEdit.name,
        count: productToEdit.count,
        size: {
          width: productToEdit.size.width,
          height: productToEdit.size.height,
        },
        weight: productToEdit.weight,
      });
    } else {
      reset({
        imageUrl: "",
        name: "",
        count: 0,
        size: { width: 0, height: 0 },
        weight: "",
      });
    }
  }, [productToEdit, reset]);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (productToEdit) {
      const updatedProduct = { ...productToEdit, ...data };
      dispatch(updateProduct(updatedProduct));
    } else {
      dispatch(addProduct(data));
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <h2 className="text-2xl font-bold mb-4">
        {productToEdit ? "Редагувати продукт" : "Додати новий продукт"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <label className="block">
            <span>URL зображення</span>
            <input
              type="text"
              placeholder="URL зображення"
              className="w-full p-2 border rounded"
              {...register("imageUrl", {
                required: "URL зображення обов'язкове",
              })}
            />
            {errors.imageUrl && (
              <span className="text-red-500 text-sm">
                {errors.imageUrl.message}
              </span>
            )}
          </label>

          <label className="block">
            <span>Назва продукту</span>
            <input
              type="text"
              placeholder="Назва продукту"
              className="w-full p-2 border rounded"
              {...register("name", { required: "Назва продукту обов'язкова" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </label>

          <label className="block">
            <span>Кількість</span>
            <input
              type="number"
              placeholder="Кількість"
              className="w-full p-2 border rounded"
              {...register("count", {
                required: "Кількість обов'язкова",
                valueAsNumber: true,
                min: { value: 0, message: "Кількість не може бути від'ємною" },
              })}
            />
            {errors.count && (
              <span className="text-red-500 text-sm">
                {errors.count.message}
              </span>
            )}
          </label>

          <label className="block">
            <span>Вага</span>
            <input
              type="text"
              placeholder="Вага (наприклад, 200g)"
              className="w-full p-2 border rounded"
              {...register("weight", { required: "Вага обов'язкова" })}
            />
            {errors.weight && (
              <span className="text-red-500 text-sm">
                {errors.weight.message}
              </span>
            )}
          </label>

          <span>Ширина і Висота:</span>
          <div className="flex space-x-2">
            <label className="block w-1/2">
              <input
                type="number"
                placeholder="Ширина"
                className="w-full p-2 border rounded"
                {...register("size.width", {
                  required: "Ширина обов'язкова",
                  valueAsNumber: true,
                  min: { value: 0, message: "Ширина не може бути від'ємною" },
                })}
              />
              {errors.size?.width && (
                <span className="text-red-500 text-sm">
                  {errors.size.width.message}
                </span>
              )}
            </label>
            <label className="block w-1/2">
              <input
                type="number"
                placeholder="Висота"
                className="w-full p-2 border rounded"
                {...register("size.height", {
                  required: "Висота обов'язкова",
                  valueAsNumber: true,
                  min: { value: 0, message: "Висота не може бути від'ємною" },
                })}
              />
              {errors.size?.height && (
                <span className="text-red-500 text-sm">
                  {errors.size.height.message}
                </span>
              )}
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              reset();
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Скасувати
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            {productToEdit ? "Зберегти" : "Додати"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductFormModal;

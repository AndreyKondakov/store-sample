import React from "react";
import Modal from "../Modal";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Підтвердження видалення</h2>
      <p>Ви впевнені, що хочете видалити цей продукт?</p>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Скасувати
        </button>
        <button
          onClick={onConfirm}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Видалити
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;

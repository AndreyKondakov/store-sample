import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addComment } from "../redux/commentsSlice";
import { formatCustomDate } from "../utils/dateFormat";
import type { AppDispatch } from "../redux/store";
import type { NewComment } from "../redux/commentsSlice";

type FormInputs = Pick<NewComment, "description">;

interface AddCommentFormProps {
  productId: number;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({ productId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, reset } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    const newComment: NewComment = {
      productId,
      description: data.description,
      date: formatCustomDate(new Date()),
    };
    dispatch(addComment(newComment));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <textarea
        {...register("description", { required: true })}
        className="w-full p-2 min-h-12 bg-white rounded-lg shadow-lg"
        rows={3}
        placeholder="Напишіть коментар..."
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Додати коментар
      </button>
    </form>
  );
};

export default AddCommentForm;

import { z } from "zod";

import status from "../status";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categories from "../categories";

const schema = z.object({
  taskName: z.string().min(2).max(50),
  status: z.enum(status),
  category: z.enum(categories),
});

type TaskFormData = z.infer<typeof schema>;

interface Props{
    onSubmit: (data: TaskFormData) => void
}

const TaskForm = ({onSubmit}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({ resolver: zodResolver(schema) });
  return (
    <form onSubmit={handleSubmit(data => {
        onSubmit(data)
        reset()
    })}>
      <div className="mb-3">
        <label htmlFor="taskName" className="form-label">
          task name
        </label>
        <input
          {...register("taskName")}
          id="taskName"
          type="text"
          className="form-control"
        />
        {errors.taskName && (
          <p className="text-danger">{errors.taskName.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          status
        </label>
        <select
          {...register("status")}
          name="status"
          id="status"
          className="form-select"
        >
          <option value=""></option>
          {status.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          category
        </label>
        <select
          {...register("category")}
          name="category"
          id="category"
          className="form-select"
        >
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary">submit</button>
    </form>
  );
};

export default TaskForm;

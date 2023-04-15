import React from "react";

interface Task {
  id: number;
  taskName: string;
  status: string;
  category: string;
}

interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
  onDone : (id:number) => void;
}
const TaskList = ({ tasks, onDelete, onDone }: Props) => {
  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>task name</th>
            <th>category</th>
            <th>status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.taskName}</td>
              <td>{task.category}</td>
              <td>{task.status}</td>
              <td>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => onDelete(task.id)}
                >
                  delete
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => onDone(task.id)}
                >
                  done
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

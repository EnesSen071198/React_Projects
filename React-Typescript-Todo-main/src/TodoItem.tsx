import React from "react";
import { todoType } from "./appTypes";

type PropsType = {
  task: todoType;
  deleteTask(nameTodoDelete: string): void;
};

// TodoItem bileşeni her bir görev öğesini temsil eder
const TodoItem: React.FC<PropsType> = ({ task, deleteTask }) => {
  return (
    <div className='todo-item'>
      <div>
        <p>{task.taskName}</p>
        <p>{task.workDay} gün</p>
        <button
          onClick={() => {
            deleteTask(task.taskName);
          }}>
          Görevi Sil
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

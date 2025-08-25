import React, { ChangeEvent, FC, useState } from "react";
import "./App.css";
import { todoType } from "./appTypes";
import TodoItem from "./TodoItem";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [workDay, setWorkDay] = useState<number>(0);
  const [todoList, settodoList] = useState<todoType[]>([]);

  // Input değişikliğini yönetmek için handleChange fonksiyonu
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "task") {
      setTask(value);
    } else {
      setWorkDay(Number(value));
    }
  };

  // Yeni görev eklemek için fonksiyon
  const addNewTask = (): void => {
    if (task === "" || workDay <= 0) return; // Boş görev veya geçersiz gün eklenmesini önler
    const newTask: todoType = { taskName: task, workDay: workDay };
    settodoList([...todoList, newTask]);
    setTask("");
    setWorkDay(0);
  };

  // Görev silmek için fonksiyon
  const deleteTask = (nameTodoDelete: string): void => {
    settodoList(todoList.filter((task) => task.taskName !== nameTodoDelete));
  };

  return (
    <div className='App'>
      <div>
        <input
          type='text'
          value={task}
          name='task'
          placeholder='Yapılacak Görevi Girin'
          onChange={handleChange}
        />
        <input
          type='number'
          value={workDay}
          name='workDay'
          placeholder='Bu Görevi Kaç Günde Tamamlayacaksınız'
          onChange={handleChange}
        />
        <button onClick={addNewTask}>Görev Ekle</button>
      </div>

      <div>
        {todoList.map((task: todoType, index: number) => (
          <TodoItem key={index} task={task} deleteTask={deleteTask} />
        ))}
      </div>
    </div>
  );
};

export default App;

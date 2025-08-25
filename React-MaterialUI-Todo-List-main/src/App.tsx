import Task from './components/Task';
import { useState } from 'react';
import './App.css';
import CreateTask from './CreateTask';
import Header from './components/Header';

// Define a type for your task
interface TaskType {
  title: string;
  content: string;
}

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const addTask = (newTask: TaskType) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, index) => index !== id));
  };

  return (
    <div className="App">
      <Header />
      <CreateTask onAdd={addTask} />
      <div className="container">
        <div className="row my-5">
          {tasks.map((taskItem, index) => (
            <Task
              key={index}
              id={index}
              title={taskItem.title}
              content={taskItem.content}
              delete={deleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

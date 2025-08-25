import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CreateTask = (props) => {

  const [task, setTask] = useState({
    title: '',
    content: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value, // name özelliği eklenmeli
      };
    });
  }

  function submitTask(event) {
    props.onAdd(task);
    setTask({
      title: '',
      content: ''
    });
    event.preventDefault();
  }

  return (
    <Box
      component="form"
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '50vh', 
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        fullWidth
        label="Add Task"
        id="taskInput"
        name="title" // name eklenmeli
        onChange={handleChange}
        value={task.title}
        sx={{ width: '50ch', mb: 2 }}
      />
      
      <TextField
        label="Task Description"
        multiline
        name="content" // name eklenmeli
        value={task.content}
        onChange={handleChange}
        rows={4}
        placeholder="Add Task Description"
        variant="outlined"
        fullWidth
        sx={{ width: '50ch', mb: 2 }}
      />
      
      <Button variant="contained" sx={{ width: '50ch' }} onClick={submitTask}>
        Create Task
      </Button>
    </Box>
  );
}

export default CreateTask;

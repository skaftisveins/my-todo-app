import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

import '../../App.css';

function Task({ task, tasks, index, completeTask, removeTask }) {
  return (
    <ListItem style={{ textDecoration: task.completed ? 'line-through' : '' }}>
      {task.title}
      <ListItemText primary={tasks} />
      <Button
        size='small'
        variant='contained'
        color='primary'
        onClick={() => completeTask(index)}
      >
        Complete
      </Button>
      <IconButton
        onClick={() => removeTask(index)}
        className='remove-task-button'
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

function CreateTask({ addTask }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue('');
  };
  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
      <TextField
        inputProps={{
          min: 0,
          style: { fontSize: '2rem', textAlign: 'center', color: '#fff' }
        }}
        type='text'
        className='input'
        value={value}
        placeholder='Add a new task'
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function Todo() {
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasks, setTasks] = useState([
    {
      title: 'Spend some time with my son',
      completed: true
    },
    {
      title: 'Practice coding in React',
      completed: true
    },
    {
      title: 'Play few games of Rocket League',
      completed: false
    },
    {
      title: 'Watch Dracula (2020) ep. 3 on Netflix tonight!',
      completed: false
    }
  ]);

  useEffect(() => {
    setTasksRemaining(tasks.filter(task => !task.completed).length);
  }, [tasks]);

  const addTask = title => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);
  };

  const completeTask = index => {
    const newTasks = [...tasks];
    newTasks[index].completed = true;
    setTasks(newTasks);
  };

  const removeTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div className='container'>
      <div className='todo-list'>
        <Typography
          className='text-title'
          style={{ textAlign: 'center' }}
          component='h1'
          variant='h2'
        >
          Todo's
        </Typography>
        <Typography style={{ textAlign: 'center' }} component='h4' variant='h5'>
          Pending tasks: {tasksRemaining}
        </Typography>
        <div className='task-list-box'>
          <CreateTask addTask={addTask} />
          <List className='task-list'>
            {tasks.map((task, index) => (
              <Task
                task={task}
                index={index}
                completeTask={completeTask}
                removeTask={removeTask}
                key={index}
              />
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}

export default Todo;

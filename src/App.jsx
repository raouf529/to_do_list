import { useState, useEffect } from 'react'
import Task from './compenets/Task'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [finished, setFinished] = useState(0)
  const [allItems, setAllItems] = useState([])

  function updateItems() {
    setAllItems(Object.keys(localStorage).map(key => {
      return {
        key: key,
        value: localStorage.getItem(key)
      };
    }));
  }

  function loadCounter() {
    const stored = localStorage.getItem("counter");
    if (stored !== null) {
      setCount(+stored);
    } else {
      localStorage.setItem("counter", 0);
    }
  }

  function loadFinished() {
    const stored = localStorage.getItem("completed");
    if (stored !== null) {
      setFinished(+stored);
    } else {
      localStorage.setItem("completed", 0);
    }
  }

  useEffect(
    () => {
      updateItems();
      loadCounter();
      loadFinished();
    },
    [])
  const tasksElement = allItems
    .filter(item =>(item.key !== "counter" &&  item.key !== "completed"))
    .map((item, index) => {
      try {
        const storedData = localStorage.getItem(item.key);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          return (
            <Task
              key={item.key}
              text={parsedData[0]}
              id={item.key}
              isCompleted={parsedData[1]}
              finished_function={finishTask}
            />
          );
        }
        return null;
      } catch (error) {
        console.error("Error parsing stored task:", error);
        return null;
      }
    })
  function addNewTask(event) {
    event.preventDefault()
    const form = event.currentTarget;
    const formData = new FormData(form);
    const newTask = formData.get('new_task');
    if (newTask) {
      const taskKey = `task${count}`;
      const item = [newTask, false]
      localStorage.setItem(taskKey, JSON.stringify(item));
      localStorage.setItem("counter", count + 1);
      setCount(prev => prev + 1);
      updateItems();
    }
  }

  function finishTask(id) {
    try {
      const storedData = localStorage.getItem(id);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        let item;
        if (parsedData[1]) {
          item = [parsedData[0], false]
          localStorage.setItem("completed", finished - 1);
          setFinished(prev => prev - 1)
        }
        else {
          item = [parsedData[0], true]
          localStorage.setItem("completed", finished + 1);
          setFinished(prev => prev + 1)
        }
        localStorage.setItem(id, JSON.stringify(item));
        updateItems();
      }
    } catch (error) {
      console.error("Error parsing stored task:", error);
      return null;
    }

  }

  const width = count?`${(finished / count * 100).toFixed(2)}%`:"0%";
  console.log(width)
  return (
    <main>
      <div className="header-container">
        <h1>To-Do App</h1>
      </div>
      <div className='develompent'>
        <div className='div-bar'>
          <h3>Keep it up!</h3>
          <div className='bar-container'>
            <div className='bar' style={{ width }}>
              </div></div>
        </div>
        <div className='num_tasks'>
          <h3>{finished}/{count}</h3>
        </div>
      </div>
      <div className='new-task'>
        <form onSubmit={addNewTask}>
          <input type='text' name="new_task" id="new_task" placeholder='Add a new task..' />
          <button type='submit'>+</button>
        </form>
      </div>
      <div className='task-container'>
        {tasksElement}
      </div>
    </main>
  )
}

export default App

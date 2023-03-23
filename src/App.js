import React from "react";
import { useEffect } from "react";
import "./App.css";
import ListItem from "./ListItem";

function App() {
  const [todos, setTodos] = React.useState([]);

  const fetchTodoItems = async () => {
    try {
      // await fetch("https://cyx9e2ptzg.execute-api.ap-south-1.amazonaws.com/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json; charset=utf-8",
      //   },
      //   body: JSON.stringify({
      //     email: "indroneelray@gmail.com",
      //     password: "test@12345",
      //   }),
      //   credentials: "include",
      // });
      const response = await fetch(
        "https://cyx9e2ptzg.execute-api.ap-south-1.amazonaws.com/todos",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const { data } = await response.json();
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  const populateInsaneAmountOfTodos = () => {
    let arr = [];
    for (let i = 0; i < 5000; i++) {
      arr.push({
        parent_id: i,
        title: `To do item number ${i + 1}`,
        isCompleted: true,
      });
    }
    setTodos(arr);
  };

  const onChange = (item) => {
    let newArray = [...todos];
    let bool = newArray[item.parent_id].isCompleted;
    newArray[item.parent_id].isCompleted = !bool;
    setTodos(newArray);
  };

  const onNotChange = React.useCallback(
    (item) => {
      let newArray = [...todos];
      let bool = newArray[item.parent_id].isCompleted;
      newArray[item.parent_id].isCompleted = !bool;
      setTodos(newArray);
    },
    [todos]
  );

  useEffect(() => {
    fetchTodoItems();
    // populateInsaneAmountOfTodos()
  }, []);

  return (
    <div data-testid="app-container">
      <fieldset className="">
        <legend
          className="text-base font-semibold leading-6 text-gray-900 p-2"
          data-testid="legend"
        >
          Todo List
        </legend>
        <div className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
          {todos.map((item) => (
            <ListItem
              title={item.title}
              isCompleted={item.isCompleted}
              key={item.parent_id}
              onChange={() => onChange(item)}
              onNotChange={() => onNotChange(item)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default App;

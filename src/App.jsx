import React from "react";
import { useEffect } from "react";
import { navigate, useNavigate } from "react-router";
import { BASE_URL } from "./api";
import "./App.css";
import ListItem from "./ListItem";

function App() {
  const [todos, setTodos] = React.useState([]);
  const navigate = useNavigate()

  const fetchTodoItems = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todos`, {
        method: "GET",
        credentials: "include",
      });
      const { data } = await response.json();
      setTodos(data ?? []);
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

  const logout = async () => {
    console.log("logging out");
    await fetch(`${BASE_URL}/logout`, {
      credentials:'include'
    });
    navigate("/login");
  };

  useEffect(() => {
    fetchTodoItems();
    // populateInsaneAmountOfTodos()
  }, []);

  return (
    <div data-testid="app-container">
      <button
        className="btn border text-lg text-black"
        onClick={() => logout()}
      >
        Logout
      </button>
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

import React, { useState, useEffect } from "react";
import axios from "axios";

function Todo({ todo, index, completeTodo }) {
  return (
    <div className="todo">
      {todo.name}
      {/* {todo.email}
      {todo.phone} */}
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    addTodo(name, email, phone);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div>
      <hr></hr>
      <div className="guesttext">
        Remember Guestbooks? Leave your name, let me know you were here!{" "}
        <br></br>
        <div className="smaller">
          *Phone and email will not be shown publicly
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <br></br>
        <input
          type="text"
          className="input"
          name="name"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          className="input"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          className="input"
          name="phone"
          value={phone}
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}

const TodoApp = () => {
  const [todos, setTodos] = useState([""]);
  let url = `https://oren-epstein.com/api/contacts`;

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(` ${url}`);
      console.log(result.data);
      setTodos(result.data);
      // setIsLoading(false)
    };

    fetchItems();
  }, []);

  const addTodo = async (name, email, phone) => {
    const NewTodos = [...todos, { name, email, phone }];
    // setTodos(NewTodos);
    let url = `https://oren-epstein.com/api/contact/reactstore`;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);

    try {
      //post the data
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      });
      console.log("👉 Returned data:", response);
      // fetchItems();
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }

    try {
      //reload the list
      url = `https://oren-epstein.com/api/contacts`;
      const response = await axios.get(url);
      setTodos(response.data);
      console.log("👉 Returned data:", response);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  };

  //not in use
  const saveTodo = (text) => {
    const NewTodos = [...todos, { text }];

    let url = `https://oren-epstein.com/api/contact/store`;

    const fetchItems = async () => {
      const result = await axios(` ${url}`);
    };
  };

  //not in use
  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };
  return (
    <div>
      <div className="todo-bg">
        <h3 style={{ color: "black" }}>Thanks for stopping by!</h3>
        <br></br>
        <div className="todo-list">
          {todos.map((todo, index) => (
            <Todo
              key={index}
              index={index}
              todo={todo}
              //   completeTodo={completeTodo}
            />
          ))}
          <TodoForm addTodo={addTodo} />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

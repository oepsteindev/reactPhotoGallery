import React, {useState, useEffect} from "react";
import axios from "axios";

function Todo({todo, index, editTodo}) {
    return (
        <div className="todo">
            {todo.name}
            <button onClick={() => editTodo(todo.id)} className="btn btn-primary btn-sm">Edit</button>
            {/* {todo.email}
      {todo.phone} */}
        </div>
    );
}
const TodoApp = () => {
    const [todos,
        setTodos] = useState([""]);
    const [name,
        setName] = useState("");
    const [email,
        setEmail] = useState("");
    const [phone,
        setPhone] = useState("");
    const [isUpdate,
        setIsUpdate] = useState("");
    const [rowid,
        setRowId] = useState("");

    let url = `https://oren-epstein.com/api/contacts`;

    useEffect(() => {
        const fetchItems = async() => {
            const result = await axios(` ${url}`);
            console.log(result.data);
            setTodos(result.data);
            // setIsLoading(false)
        };

        fetchItems();
    }, []);

    const TodoForm = ({addTodo}) => {

        const handleSubmit = (e) => {
            e.preventDefault();
            if (!name) 
                return;
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
                        onBlur={(e) => setName(e.target.value)}
                        
                        />
                    <br></br>
                    <input
                        type="text"
                        className="input"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onBlur={(e) => setEmail(e.target.value)}/>
                    <br></br>
                    <input
                        type="text"
                        className="input"
                        name="phone"
                        value={phone}
                        placeholder="Phone"
                        onBlur={(e) => setPhone(e.target.value)}/>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        );
    }

    const addTodo = async(name, email, phone, id = 0) => {
        const NewTodos = [
            ...todos, {
                name,
                email,
                phone
            }
        ];
        
        let url = ``;
        let method = '';
        //how do i get row here?
        

       
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append(
            "id", rowid
        )

        try {
            //post the data

            if (isUpdate) {
                url = `https://oren-epstein.com/api/contact/update`;
            } else {
                url = `https://oren-epstein.com/api/contact/reactstore`;
                method = 'post';
            }

            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
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
    const editTodo = async(id) => {

        try {
            let url = `https://oren-epstein.com/api/contact/${id}`;
            const response = await axios.get(url);
            setIsUpdate(true);
            setRowId(id);

            // setName(response.data);
            setName(response.data.name);
            setEmail(response.data.email);
            setPhone(response.data.phone);

            //   setTodos(response.data);
            console.log("👉 Returned data:", response);
        } catch (e) {
            console.log(`😱 Axios request failed: ${e}`);
        }
        // const NewTodos = [...todos, { text }];

        let url = `https://oren-epstein.com/api/contact/store`;

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
                <h3 style={{
                    color: "black"
                }}>Thanks for stopping by!</h3>
                <br></br>
                <div className="todo-list">
                    {todos.map((todo, index) => (<Todo key={index} index={index} todo={todo} editTodo={editTodo}/>))}
                    <TodoForm addTodo={addTodo}/>
                </div>
            </div>
        </div>
    );
};

export default TodoApp;

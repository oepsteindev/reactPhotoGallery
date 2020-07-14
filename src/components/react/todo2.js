import React, { useState, useEffect } from "react";
import axios from "axios";

class TodoAppTwo extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            fullname: '',
            email: '',
            phone: '',
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleGetData = this.handleGetData.bind(this);
    }
  
    handleChange(event) {

        this.setState({
            fullname: event.target.fullname,
            email: event.target.email,
            phone: event.target.phone,
        });
      
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }

    handleGetData(event) {
        let url = `https://oren-epstein.com/api/contacts`;
        
            const fetchItems = async() => {
                const result = await axios(` ${url}`);
                console.log(result.data);
                // this.state.name = result.data.name;
                this.setState({
                    fullname: result.data.name,
                    email: result.data.email,
                    phone: result.data.phone,
                });
                // setTodos(result.data);
                // setIsLoading(false)
            };
    
            fetchItems();
      
      }
  
    render() {
        return (
            <div className="todo-bg">
                
        <form onSubmit={this.handleSubmit}>
          <label>
                        Name:
            <input type="text" name="name" value={this.state.fullname} onChange={this.handleChange} placeholder="Name" />
                        Email:
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
                        Phone:
            <input type="text" name="phone"  value={this.state.phone} onChange={this.handleChange} placeholder="Phone"/>
          </label>
                    <input type="submit" value="Submit" className="btn btn-primary btn-sm" />
                    <input type="button" value="Get Data" className="btn btn-primary btn-sm" onClick={this.handleGetData}/>
                </form>
                </div>
      );
    }
}
  
export default TodoAppTwo;
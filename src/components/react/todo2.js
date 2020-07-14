import React, { useState, useEffect } from "react";
import axios from "axios";

class TodoAppTwo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      phone: "",
      data: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGetData = this.handleGetData.bind(this);
    this.handleEditData = this.handleEditData.bind(this);
  }

  componentDidMount () {
    this.handleGetData();
  }

  handleChange (event) {
    this.setState({
      fullname: event.target.fullname,
      email: event.target.email,
      phone: event.target.phone,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let url = ``;
    console.log(event.target.elements.name.value);
    // alert("A name was submitted: " + this.state.email);

    let fullname = event.target.elements.name.value;
    let email = event.target.elements.email.value;
    let phone = event.target.elements.phone.value;

    const formData = new FormData();
    formData.append("name", fullname);
    formData.append("email", email);
    formData.append("phone", phone);
    // formData.append("id", rowid);
    console.log(formData);
    url = `https://oren-epstein.com/api/contact/reactstore`; //insert url

    const fetchItems = async () => {
      try {
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
    };

    fetchItems();
    this.handleGetData();
  }

  handleGetData (event) {
    let url = `https://oren-epstein.com/api/contacts`;

    const fetchItems = async () => {
      const result = await axios
        .get(url)
        .then((response) => {
          // handle success
          console.log(response.data);
          let data = response.data;

          this.setState({
            data: response.data,
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    fetchItems();
  }

  handleEditData (event) {
    console.log(event.target.value);

    let url = `https://oren-epstein.com/api/contact/${event.target.value}`;

    const fetchItems = async () => {
      const result = await axios
        .get(url)
        .then((response) => {
          // handle success
          console.log(response.data);
          //   let data = response.data;

          this.setState({
            fullname: response.data.name,
            phone: response.data.phone,
            email: response.data.email,
          });
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };
    fetchItems();
  }

  render () {
    return (
      <div className="todo-bg">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={this.state.fullname}
              onChange={this.handleChange}
              placeholder="Name"
            />
            Email:
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
            Phone:
            <input
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
              placeholder="Phone"
            />
          </label>
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary btn-sm"
          />
          <input
            type="button"
            value="Get Data"
            className="btn btn-primary btn-sm"
            onClick={this.handleGetData}
          />
          <br></br>
        </form>
        <div>
          <br></br>
          {this.state.data.map((person, index) => (
            <div className="todo" key={index}>
              {person.name}
              <button
                className="btn btn-primary btn-sm"
                value={person.id}
                style={{
                  vAlign: "middle",
                }}
                onClick={this.handleEditData}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TodoAppTwo;

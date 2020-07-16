import React from "react";
import axios from "axios";

class TodoAppTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      phone: "",
      data: [],
      rowid: 0,
      isUpdate: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGetData = this.handleGetData.bind(this);
    this.handleEditData = this.handleEditData.bind(this);
  }

  componentDidMount() {
    this.handleGetData();
  }

  handleChange(event) {
    this.setState({
      fullname: event.target.fullname,
      email: event.target.email,
      phone: event.target.phone,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let url = ``;

    let fullname = event.target.elements.name.value;
    let email = event.target.elements.email.value;
    let phone = event.target.elements.phone.value;
    let rowid = this.state.rowid;

    const formData = new FormData();
    formData.append("name", fullname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("id", rowid);

    if (this.state.isUpdate) {
      url = `https://oren-epstein.com/api/contact/update/${rowid}`;
    } else {
      url = `https://oren-epstein.com/api/contact/reactstore`; //insert url
    }

    const fetchItems = async () => {
      try {
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        });
        this.handleGetData();
        this.setState({
          isUpdate: false,
          fullname: "",
          phone: "",
          email: "",
        });
        console.log("👉 Returned data:", response);
      } catch (e) {
        console.log(`😱 Axios request failed: ${e}`);
      }
    };

    fetchItems();
  }

  handleGetData(event) {
    let url = `https://oren-epstein.com/api/contacts`;

    const fetchItems = async () => {
      const result = await axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          let data = response.data;

          this.setState({
            data: response.data,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    fetchItems();
  }

  handleEditData(event) {
    let url = `https://oren-epstein.com/api/contact/${event.target.value}`;

    const fetchItems = async () => {
      const result = await axios
        .get(url)
        .then((response) => {
          this.setState({
            fullname: response.data.name,
            phone: response.data.phone,
            email: response.data.email,
            rowid: response.data.id,
            isUpdate: true,
            buttonColor: "btn-primary",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchItems();
  }

  render() {
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
            value={this.state.isUpdate ? "Update" : "Submit"}
            className={
              this.state.isUpdate ? "btn btn-sm" : "btn btn-primary btn-sm"
            }
          />

          <br></br>
        </form>
        <div>
          <br></br>
          <div className="pushright">
            {this.state.data.map((contact, index) => (
              <div className="todo" key={index}>
                {contact.name} &nbsp;
                <button
                  className="btn btn-primary btn-sm"
                  value={contact.id}
                  style={{
                    "vertical-align": "baseline",
                    display: "table-cell",
                  }}
                  onClick={this.handleEditData}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default TodoAppTwo;

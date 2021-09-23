import React from "react";
import styled from "styled-components";
import axios from "axios";
import Form from "./components/Form";

const url = `https://crudcrud.com/api/300f405b79e04653bcbcb7eb554dbef7/nutemploye`;

class App extends React.Component {
  state = {
    popup: "",
    userName: "",
    userBirth: "",
    userGender: "",
    userEmail: "",
    userCPF: "",
    userStartDate: "",
    userField: "mobile",
    users: [],
    userID: "",
  };

  componentDidMount() {
    this.readAll();
  }

  controlInputName = (event) => {
    this.setState({ userName: event.target.value });
  };

  controlInputBirth = (event) => {
    this.setState({ userBirth: event.target.value });
  };

  controlInputGender = (event) => {
    this.setState({ userGender: event.target.value });
  };

  controlInputEmail = (event) => {
    this.setState({ userEmail: event.target.value });
  };

  controlInputCPF = (event) => {
    this.setState({ userCPF: event.target.value });
  };

  controlInputStartDate = (event) => {
    this.setState({ userStartDate: event.target.value });
  };

  controlInputField = (event) => {
    this.setState({ userField: event.target.value });
  };

  openForm = () => {
    if (this.state.popup === "") {
      this.setState({ popup: "createForm" });
    } else {
      this.setState({ popup: "" });
    }
  };

  create = (e) => {
    e.preventDefault();
    this.setState({ popup: "" });
    const bory = {
      name: this.state.userName,
      birthDate: this.state.userBirth,
      gender: this.state.userGender,
      email: this.state.userEmail,
      cpf: this.state.userCPF,
      startDate: this.state.userStartDate,
      field: this.state.userField,
    };

    axios
      .post(url, bory)
      .then((res) => {
        console.log(res.data);
        this.setState({
          userName: "",
          userBirth: "",
          userGender: "",
          userEmail: "",
          userCPF: "",
          userStartDate: "",
          userField: "",
        });
        this.readAll();
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  readAll = () => {
    axios
      .get(url)
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  delete = (id) => {
    axios
      .delete(url + "/" + id)
      .then((res) => {
        alert("user deleted successfully");
        this.readAll();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  updateForm = (id) => {
    this.setState({ popup: "updateForm" });
    const userSelected = this.state.users.find((user) => {
      return id === user._id;
    });
    // mostrar os estados que haviam antes
    this.setState({ userName: userSelected.name });
    this.setState({ userID: userSelected._id });
    this.setState({userBirth: userSelected.birthDate})
    this.setState({userEmail: userSelected.email })
    this.setState({userCPF: userSelected.cpf})
    this.setState({userStartDate: userSelected.startDate})
    this.setState({userField: userSelected.field})

  };

  // função que verifica os estados e manda um id para a função update
  sendUpdate = () => {
    if (
      this.state.userID &&
      this.state.userBirth &&
      this.state.userGender &&
      this.state.userEmail &&
      this.state.userCPF &&
      this.state.userStartDate &&
      this.state.userStartDate
    ) {
      this.update(this.state.userID);
    } else {
      alert("check all fields to update")
    }
  }

  update = (id) => {
    const bory = {
      name: this.state.userName,
      birthDate: this.state.userBirth,
      gender: this.state.userGender,
      email: this.state.userEmail,
      cpf: this.state.userCPF,
      startDate: this.state.userStartDate,
      field: this.state.userField,
    };

    if (bory) {
      axios
        .put(url + "/" + id, bory)
        .then((res) => {
          alert("user updated successfully");
          this.readAll();
          this.setState({ popup: "" });
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      alert("Something go wrong");
      this.setState({ popup: "" });
    }
  };

  render() {
    const userList = this.state.users.map((user) => {
      return (
        <li key={user._id}>
          {user.name}
          <button
            onClick={() => {
              this.delete(user._id);
            }}
          >
            delete
          </button>
          <button
            onClick={() => {
              this.updateForm(user._id);
            }}
          >
            update
          </button>
        </li>
      );
    });
    return (
      <div>
        <button onClick={this.openForm}>Registration</button>
        {userList}
        {this.state.popup === "createForm" && (
          <Popup>
            <form method="post" action={url} onSubmit={this.create}>
              <Form
                userName={this.state.userName}
                userBirth={this.state.userBirth}
                userGender={this.state.userGender}
                userEmail={this.state.userEmail}
                userCPF={this.state.userCPF}
                userStartDate={this.state.userStartDate}
                userField={this.state.userField}
                controlInputName={this.controlInputName}
                controlInputBirth={this.controlInputBirth}
                controlInputGender={this.controlInputGender}
                controlInputEmail={this.controlInputEmail}
                controlInputCPF={this.controlInputCPF}
                controlInputStartDate={this.controlInputStartDate}
                controlInputField={this.controlInputField}
              />
              <input type="submit" value="Send" />
            </form>
          </Popup>
        )}

        {this.state.popup === "updateForm" && (
          <Popup>
            <Form
              userName={this.state.userName}
              userBirth={this.state.userBirth}
              userGender={this.state.userGender}
              userEmail={this.state.userEmail}
              userCPF={this.state.userCPF}
              userStartDate={this.state.userStartDate}
              userField={this.state.userField}
              controlInputName={this.controlInputName}
              controlInputBirth={this.controlInputBirth}
              controlInputGender={this.controlInputGender}
              controlInputEmail={this.controlInputEmail}
              controlInputCPF={this.controlInputCPF}
              controlInputStartDate={this.controlInputStartDate}
              controlInputField={this.controlInputField}
            />
            <input
              type="submit"
              value="Send"
              onClick={() => {
                this.sendUpdate();
              }}
            />
          </Popup>
        )}
      </div>
    );
  }
}

export default App;

const Popup = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 230px;
  height: 300px;
  padding: 15px;
  border: solid 1px black;
  background-color: lightgrey;
  display: block;
  text-align: start;
`;

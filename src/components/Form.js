import React from "react";
import styled from "styled-components";


class From extends React.Component {
    render() {
        return (
          <div>
            <InputContainer>
              <label htmlFor="name">Name: </label>
              <Input
                name="name"
                type="text"
                value={this.props.userName}
                onChange={this.props.controlInputName}
                required
              ></Input>
            </InputContainer>
            <InputContainer>
              <label htmlFor="birthDate">Birth Date: </label>
              <Input
                type="date"
                name="birthDate"
                value={this.props.userBirth}
                onChange={this.props.controlInputBirth}
                required
              ></Input>
            </InputContainer>
            <InputContainer>
              <label htmlFor="gender">Select your gender: </label>
              <select
                name="gender"
                value={this.props.userGender}
                onChange={this.props.controlInputGender}
                required
              >
                <option value="" disabled="" selected=""></option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </InputContainer>
            <InputContainer>
              <label htmlFor="email">Email: </label>
              <Input
                type="email"
                name="email"
                value={this.props.userEmail}
                onChange={this.props.controlInputEmail}
                required
              ></Input>
            </InputContainer>
            <InputContainer>
              <label htmlFor="cpf">CPF: </label>
              <Input
                type="text"
                name="cpf"
                value={this.props.userCPF}
                onChange={this.props.controlInputCPF}
                required
              ></Input>
            </InputContainer>
            <InputContainer>
              <label htmlFor="startDate">Start Date: </label>
              <Input
                type="date"
                name="startDate"
                value={this.props.userStartDate}
                onChange={this.props.controlInputStartDate}
                required
              ></Input>
            </InputContainer>
            <InputContainer>
              <label htmlFor="field">Select your field: </label>
              <select
                name="field"
                value={this.props.userField}
                onChange={this.props.controlInputField}
              >
                <option value=""></option>
                <option value="mobile" selected>
                  Data Mobile
                </option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
              </select>
            </InputContainer>
            
          </div>
        );
    }
}

export default From;


const InputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Input = styled.input`
  color: #273950;
  border: double 3px #273950;
  margin: 4px;
`;



import React, { Component } from 'react'
import Main from "./Main"

export default class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      header: "Welcome",
      color: {color:"red"}
    }
  }

  onChange (header, color) {
    this.setState({
      header,
      color
    });
  }
  
  
  render () {
    return <div>
              <h1 name={"helllllo"}>{this.props.name}</h1>  
              <Main onChange={this.onChange.bind(this)} color={this.state.color}  header={this.state.header}/>
          </div>
   }

}


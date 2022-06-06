import React, { Component } from 'react';
import Ninjas from './Ninjas';
import AddNinja from './AddNinja';


class  App extends Component {
  state = {
    ninjas : [
      {name: 'Femi', age: 30, belt: 'black', id: 1},
      {name: 'Eunice', age: 25, belt: 'brown', id: 2},
      {name: 'David', age: 15, belt: 'white', id: 3},
    ]
  }
  addNinja = (ninja) => {
    //console.log(ninja);
    ninja.id = Math.random();
    let ninjas = [...this.state.ninjas, ninja];
    this.setState({
      ninjas: ninjas
    })
  }
  deleteNinja = (id) => {
    //console.log(id)
    let ninjas = this.state.ninjas.filter(ninja => {
      return ninja.id !==id
    })
    this.setState({
      ninjas: ninjas
    })
  }
  render(){
    return(
      <div className = 'App'>
      <h1>My first React App</h1>
      <Ninjas deleteNinja ={this.deleteNinja} ninjas= {this.state.ninjas} />
      <AddNinja addNinja={this.addNinja} />
      </div>
    );
  }
}

export default App;

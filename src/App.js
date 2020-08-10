import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount() {
    this.setState({
      toys: data
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  createToy = (e) => {
    e.preventDefault()
    let newId = this.state.toys[this.state.toys.length -1].id + 1
    let newToy = {
      id: newId,
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    let addToy = [...this.state.toys, newToy]
    this.setState({
      toys: addToy
    })
    this.handleClick()
  }

  increaseLikes = (toy) => {
    let updateToy = this.state.toys.map(toys => {
      if(toys.id === toy.id) {
        toys.likes += 1
      } 
    })
    this.setState({updateToy})
  }

  donateGoodwill = (toy) => {
    let donateToy = this.state.toys.filter(toys => toys.id !== toy.id)
    this.setState({toys: donateToy})
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createToy={this.createToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} increaseLikes={this.increaseLikes} donateGoodwill={this.donateGoodwill}/>
      </>
    );
  }

}

export default App;

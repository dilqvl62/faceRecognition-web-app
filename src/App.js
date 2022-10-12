import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from './components/Particles/Particles';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'af06916430094097a28e457bf50abdbf'
});

class App extends Component {
  constructor() {
    super();
    this.state={
      input: '',
      imageUrl: '',
      box: {},
    }
  }
  
  calculateFaaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftDot: clarifaiFace.left_col * width,
      topDot:  clarifaiFace.top_row  * height,
      rightDot: width - (clarifaiFace.right_col * width),
      bottomDot: height - (clarifaiFace.bottom_row * height)
    }
  }
 faceBox =(box) => {
  this.setState({box: box});
 }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODELL,
      this.state.input)
    .then(response => this.faceBox(this.calculateFaaceLocation(response)))
    .catch(err => console.log(err))
    
  }

  render(){
    return (
      <div className="App">
        <Particles />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit} 
        />
        
       <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from './components/Particles/Particles';
import './App.css';

const MODEL_ID = 'FACE_DETECT_MODEL';
const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + "af06916430094097a28e457bf50abdbf");


class App extends Component {
  constructor() {
    super();
    this.state={
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id:'',
        name:'',
        email: '',   
        entries: 0,
        joined:''
      }
    }
  }
  loadUser = (data) => {
    this.setState({user: {
      id:data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined:data.joined
    }})
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

    fetch(MODEL_ID , this.state.input)
        .then(response => this.faceBox(this.calculateFaaceLocation(response)))
        .catch(err => console.log(err))
    
        // app.models
    // .predict(
    //   Clarifai.FACE_DETECT_MODEL,
    //   this.state.input)
    // .then(response => this.faceBox(this.calculateFaaceLocation(response)))
    // .catch(err => console.log(err))

  }
  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    }else if(route ==='home'){
      this.setState({isSignedIn: true})
    }
  this.setState({route: route});
 }

  render(){
    return (
    <div className="App">
       <Particles />
       <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
       {this.state.route === 'home'
       ? <div>
            <Logo/>
            <Rank/>
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit} 
            />        
            <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
         </div>
       : ( 
        this.state.route === 'signin'
        ?<Signin onRouteChange={this.onRouteChange}/>
        :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
       )
      }
   </div>
    );
  }
}

export default App;

import Particles from'react-tsparticles';
import {loadFull} from 'tsparticles';
import './Particles.css'
 function particles() {
    const particlesInit =async (engine) => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
      };
    
      const particlesLoaded = (container) => {
        console.log(container);
      };
      const options = {
        
        smooth: true,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
              parallax: {
                enable: false,
                force: 2,
                smooth: 10
              }
            }
          },
          
        },
        particles: {
          move: {
            direction: "none",
            distance: 5,
            enable: true,
            outModes: "none",
            speed: 1
          },
          number: {
            value: 60
          },
          shape: {
            type: ["circle", "square", "triangle"]
          },
          size: {
            value: {
              min: 3,
              max: 5
            }
          }
        },
        canvasMask: {
          enable: true,
          scale: 5,
          pixels: {
            filter: "pixelFilter"
          }
        }
       
      }
  return (
    <Particles className='particles'
    id="tsparticles"
    init={particlesInit} 
    loaded={particlesLoaded}
    params= {options}
   />
 )
}
export default particles;
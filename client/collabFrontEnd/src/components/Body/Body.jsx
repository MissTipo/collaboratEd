import React from 'react'
import './Body.css';
import Hero from '../../assets/Hero1.png'
import HeroImg2 from '../../assets/HeroImg2-rbg.png'
import HeroImg3 from '../../assets/HeroImg3.png'
import HeroImg4 from '../../assets/HeroImg4-rbg.png'
import Button from '../Button/Button';

const Body = () => {
  return (
    <React.Fragment>
      <div className='App-body'>
        <div className="App-body1">
          <p>A new and exciting way to engage,<br></br>
              collaborate and learn with your peers</p>
          <img src={Hero} className="Collab-logo" />
        </div>
        <div>
          <h2 className='HeroText1'>How it works</h2>
          <hr className='HeroLine1' />
        </div>
        
        <div className='Hero2'>
          <div>
            <h2 className='HeroText2'>Smart Minds <br></br><span>Collaborate!</span></h2>
            <h4 className='HeroText3'>CollaboratED 
            is a platform that allows students to collaborate <br></br>with each other on projects and assignments.</h4>
          </div>
          <img src={ HeroImg2 } alt="" />
        </div>
        <div>
          <h2 className='HeroText1'>Our Community</h2>
          <hr className='HeroLine1' />
        </div>
        <div className='Hero3'>
          <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2 className='HeroText2'>Find your collaborative <br></br><span>Haven!</span></h2>
            <h4 className='HeroText3'>Register a new peer learning group, 
            <br></br>or join an existing one.</h4>
            <Button text="Create group" onClick={() => alert('Create Group button clicked')} ></Button>
            <Button text="Join Existing" onClick={() => alert('Join Existing button clicked')}></Button>
          </div>
          <img src={ HeroImg3 } alt="" />
        </div>
        <br></br>
        <br></br>
        <div className="Hero3">
          <img src={ HeroImg4 } alt="" />
          <div>
            <br></br>
            <h2 >Your Best Decision Yet!</h2>
            <h4 >Enjoy the benefits of Peer learning</h4>
          </div>
        </div>
      </div>
      
    </React.Fragment>
  );
}

export default Body;
import React from 'react'
import './Body.css';
import Hero from '../../assets/HeroImg1.svg'
import HeroImg2 from '../../assets/HeroImg2.svg'

const Body = () => {
  return (
    <React.Fragment>
      <div className="App-body">
        <img src={Hero} alt="Collab-logo" />
      </div>
      <div>
        <h2 className='HeroText1'>How it works</h2>
        <hr className='HeroLine1' />
      </div>
      <div className='Hero2'>
        <div>
        <h2 className='HeroText2'>Smart Minds <br></br><span>Collaborate!</span></h2>
        <h4 className='HeroText3'>CollaboratED 
        is a platform that allows students to collaborate with each other on projects and assignments.</h4>
        </div>
        
        <img src={ HeroImg2 } alt="" />
      </div>
    </React.Fragment>
  );
}

export default Body;
import React from 'react'
import './Body.css';
import Hero from '../../assets/HeroImg1.svg'

const Body = () => {
  return (
    <React.Fragment>
      <div className="App-body">
        <img src={Hero} alt="Collab-logo" />
      </div>
    </React.Fragment>
  );
}

export default Body;
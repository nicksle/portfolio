import React from 'react';
import './Intro1.css';
import vector32 from './vector-32.svg';

const Intro1 = () => {
  return (
    <div className="intro1">
      <div className="overlap-group">
        <div className="section">
          <div className="element">
            <img className="vector" alt="Vector" src={vector32} />
          </div>
          <div className="div-wrapper">
            <div className="text-wrapper">nkle.design</div>
          </div>
        </div>

        <div className="div">
          <div className="element-2">
            <div className="text-wrapper">Hello world!</div>
          </div>
          <div className="element-3" />
          <div className="element-3" />
        </div>

        <div className="section-2">
          <div className="element-4">
            <div className="text-wrapper">Welcome to my website</div>
          </div>
          <div className="element-3" />
          <div className="element-5" />
        </div>

        <div className="section-3">
          <div className="element-6" />
          <div className="div-wrapper">
            <div className="text-wrapper">My names Nick</div>
          </div>
        </div>

        <div className="section-4" />
      </div>
    </div>
  );
};

export default Intro1; 
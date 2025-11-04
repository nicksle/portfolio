import React from 'react';
import './PhoneFrame.css';
import iPhoneFrame from '../../assets/devices/iphone-14-frame.svg';

const PhoneFrame = ({ children, model = 'iphone14', className = '' }) => {
  // Device dimensions (screen area only, not including bezel)
  const dimensions = {
    iphone14: {
      width: 390,
      height: 844,
      borderRadius: 47
    }
  };

  const deviceConfig = dimensions[model] || dimensions.iphone14;

  return (
    <div className={`phone-frame phone-frame-${model} ${className}`}>
      <div
        className="phone-screen"
        style={{
          width: `${deviceConfig.width}px`,
          height: `${deviceConfig.height}px`,
          borderRadius: `${deviceConfig.borderRadius}px`
        }}
      >
        {children}
      </div>
      <img
        src={iPhoneFrame}
        alt=""
        className="phone-overlay"
        aria-hidden="true"
      />
    </div>
  );
};

export default PhoneFrame;

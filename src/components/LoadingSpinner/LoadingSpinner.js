import React, { useEffect} from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = props => {

  useEffect(() => {
    // Enable body scrolling when component is unmounted
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, []);

  useEffect(() => {
    // Disable body scrolling when component is mounted and props.asOverlay is true
    if (props.asOverlay) {
      document.body.style.overflow = 'hidden';
    }
  }, [props.asOverlay]);
  
  return (
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
import React, { useEffect } from 'react';
import './SuccessCheckmark.css'; // Create this CSS file with the provided styles

const Success = () => {
  useEffect(() => {
    // Start the animation when the component is mounted
    const checkIcon = document.querySelector('.check-icon');
    checkIcon.style.display = 'none';
    setTimeout(() => {
      checkIcon.style.display = 'block';
    }, 10);

    // Redirect to home after 0.2 seconds (200ms)
    const timer = setTimeout(() => {
      window.location.href = '/';
    }, 2500);

    // Clean up the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
        <h1>Thank you for your Booking,Please visit again</h1>
        <div className='wides' >
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
      {/* <center>
        <button onClick={() => window.location.reload()}>Restart Animation</button>
      </center> */}
              </div>
    </div>
  );
};

export default Success;

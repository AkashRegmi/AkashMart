import React from 'react'
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage: 'url("https://atlassianblog.wpengine.com/wp-content/uploads/2017/12/44-incredible-404-error-pages@3x-1560x760.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
  };

  return (
    <div style={backgroundStyle}>
      <h1 style={{ fontSize: '48px', color:"black", padding:"10 px"}}>🚫 Error Fetching the page </h1>
      <p style={{ fontSize: '20px', padding:"280px"}}>Something went wrong while fetching the Page.</p>
      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          fontSize: '16px',
          cursor: 'pointer',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: 'blue',
          color: '#FFFFFF'
        }}
      >
        ⬅️ Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
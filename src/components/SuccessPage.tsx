import React, { CSSProperties } from 'react';

const styles: { [key: string]: CSSProperties } = {
  successPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100vh',
    background: 'var(--bg)', // Gradient background
    padding: '20px',
    textAlign: 'center',
  },
  modal: {
    backgroundColor: '#f9f9f9', // Lighter background color for the modal
    borderRadius: '12px',
    padding: '40px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
    border: '1px solid #d0d0d0', // Lighter border color
    animation: 'fadeIn 0.5s ease-in-out',
  },
  title: {
    fontSize: 'var(--heading-font)',
    fontWeight: 'var(--font-weight-heading)',
    color: '#ff6f7d', // Lighter pink color
    margin: '0 0 15px 0',
  },
  description: {
    fontSize: 'var(--sub-heading-font)',
    color: '#6aa1c2', // Lighter blue color
    margin: '0 0 30px 0',
    lineHeight: '1.5',
  },
  button: {
    padding: '14px 28px',
    fontSize: 'var(--regular-font)',
    color: '#ffffff',
    backgroundColor: '#fd4167', // Pink color for the button
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 'var(--font-weight-heading)',
    transition: 'var(--transition)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  buttonHover: {
    backgroundColor: '#e0365e', // Slightly darker pink for hover
  },
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  } as any, // TypeScript doesn't directly support @keyframes
};

export function SuccessPage() {
  return (
    <div style={styles.successPage}>
      <div style={styles.modal}>
        <h1 style={styles.title}>Congratulations!</h1>
        <p style={styles.description}>
          You've successfully completed the verification. 
          <br />
          Thank you for confirming you're not a robot!
        </p>
        <button 
          style={styles.button} 
          onMouseEnter={(e) => {
            // Ensure backgroundColor is a string
            e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor || '#e0365e';
          }}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fd4167'}
          onClick={() => window.location.href = '/' /* Example redirect */}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

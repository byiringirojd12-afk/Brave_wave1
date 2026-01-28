import React from "react";

const NotFound = () => {
  // Styles defined as objects for a clean single-file approach
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    modal: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      maxWidth: "450px",
      width: "90%",
      textAlign: "center",
    },
    errorCode: {
      fontSize: "72px",
      margin: 0,
      color: "#e74c3c",
      fontWeight: "bold",
    },
    title: {
      fontSize: "24px",
      color: "#333",
      marginBottom: "20px",
    },
    text: {
      color: "#666",
      lineHeight: "1.6",
      marginBottom: "30px",
    },
    button: {
      backgroundColor: "#007bff",
      color: "#fff",
      textDecoration: "none",
      padding: "12px 24px",
      borderRadius: "6px",
      fontWeight: "600",
      display: "inline-block",
      transition: "background-color 0.3s",
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h1 style={styles.errorCode}>404</h1>
        <h5 style={styles.title}>Page Not Found</h5>
        
        <p style={styles.text}>
          Our IT department is currently working to resolve this issue. 
          If you believe this is an error on our part, please reach out to us.
        </p>

        <a 
          href="mailto:oishteen@gmail.com" 
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Email Support
        </a>
        
        <div style={{ marginTop: "20px", fontSize: "12px", color: "#999" }}>
          Contact: oishteen@gmail.com
        </div>
      </div>
    </div>
  );
};

export default NotFound;
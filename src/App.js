// App.js
import React from 'react';
import AdminUsers from './components/AdminUsers'; // Import the AdminUsers component

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Admin Panel</h1>
      <AdminUsers /> {/* Display the AdminUsers component */}
    </div>
  );
}

export default App;

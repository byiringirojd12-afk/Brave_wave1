// server.js

const express = require('express');
const { createClient } = require('@supabase/supabase-js');

// Initialize the Supabase client with the secret key (server-side)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const app = express();
app.use(express.json());  // To parse JSON request body

// Endpoint to register a user (without triggering the email)
app.post('/api/register', async (req, res) => {
  const { email, username, name, gender, password } = req.body;

  try {
    // Insert user data into the "users" table
    const { data, error } = await supabase.from('users').insert([
      {
        email,
        username,
        name,
        gender,
        password // You should store hashed passwords in a real app!
      },
    ]);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // If everything is successful
    return res.status(201).json({ message: 'User registered successfully!', data });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
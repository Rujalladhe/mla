import query from "./db";

async function testConnection() {
  try {
    // Simple query to test the connection
    const result = await query('SELECT NOW()');
    console.log('Database connection successful!');
    console.log('Current database time:', result.rows[0].now);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
}

// Run the test
testConnection(); 
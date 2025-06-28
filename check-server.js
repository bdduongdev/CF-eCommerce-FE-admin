// Check server connectivity script
// Usage: node check-server.js

const axios = require('axios');

const BASE_URL = 'http://localhost:8888/api';

async function checkServer() {
  console.log('🔍 Checking server connectivity...\n');
  
  const tests = [
    {
      name: 'Server Base',
      url: `${BASE_URL}`,
      description: 'Check if server is running'
    },
    {
      name: 'Auth Check',
      url: `${BASE_URL}/auth/check`,
      description: 'Check authentication endpoint'
    },
    {
      name: 'Products',
      url: `${BASE_URL}/products?page=1&limit=5`,
      description: 'Check products API'
    },
    {
      name: 'Categories',
      url: `${BASE_URL}/categories`,
      description: 'Check categories API'
    },
    {
      name: 'Colors',
      url: `${BASE_URL}/product-colors`,
      description: 'Check colors API'
    },
    {
      name: 'Storages',
      url: `${BASE_URL}/product-storages`,
      description: 'Check storages API'
    }
  ];

  for (const test of tests) {
    try {
      console.log(`📡 Testing ${test.name}: ${test.url}`);
      console.log(`   Description: ${test.description}`);
      
      const response = await axios.get(test.url, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`   ✅ Status: ${response.status}`);
      console.log(`   📊 Data: ${JSON.stringify(response.data).substring(0, 100)}...`);
      
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        console.log(`   ❌ Error: Connection refused - Server not running`);
        console.log(`   💡 Solution: Start your server on port 8888`);
      } else if (error.code === 'ENOTFOUND') {
        console.log(`   ❌ Error: Host not found - Check URL`);
      } else if (error.response) {
        console.log(`   ⚠️  Status: ${error.response.status}`);
        console.log(`   📄 Response: ${JSON.stringify(error.response.data)}`);
      } else {
        console.log(`   ❌ Error: ${error.message}`);
      }
    }
    
    console.log(''); // Empty line for readability
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay
  }
  
  console.log('✨ Server check completed!');
  console.log('\n📋 Summary:');
  console.log('- If you see "Connection refused", your server is not running');
  console.log('- If you see "404", the endpoint does not exist');
  console.log('- If you see "401/403", authentication is required');
  console.log('- If you see "200", the endpoint is working');
}

// Run the check
checkServer().catch(console.error);
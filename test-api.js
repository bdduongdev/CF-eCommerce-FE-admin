// Test API endpoints script
// Usage: node test-api.js

const axios = require('axios');

const BASE_URL = 'http://localhost:8888/api';

// Test endpoints
const endpoints = [
  { name: 'Users', url: '/users?page=1&limit=5' },
  { name: 'Orders (old)', url: '/orders?page=1&limit=5' },
  { name: 'Orders (admin)', url: '/admin/orders?page=1&limit=5' },
  { name: 'Banners', url: '/banners?page=1&limit=5' },
  { name: 'Categories', url: '/categories' },
  { name: 'Products', url: '/products' },
];

async function testEndpoint(name, url, token = null) {
  try {
    const config = {
      method: 'GET',
      url: `${BASE_URL}${url}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`\n🔍 Testing ${name}: ${url}`);
    const response = await axios(config);
    
    console.log(`✅ ${name}: ${response.status} OK`);
    console.log(`   Data: ${JSON.stringify(response.data).substring(0, 100)}...`);
    
    return { success: true, status: response.status, data: response.data };
  } catch (error) {
    console.log(`❌ ${name}: ${error.response?.status || 'Network Error'}`);
    if (error.response?.data) {
      console.log(`   Error: ${JSON.stringify(error.response.data)}`);
    }
    return { success: false, status: error.response?.status, error: error.response?.data };
  }
}

async function runTests() {
  console.log('🚀 Starting API Tests...\n');
  
  // Test without token first
  console.log('📋 Testing without authentication:');
  for (const endpoint of endpoints) {
    await testEndpoint(endpoint.name, endpoint.url);
    await new Promise(resolve => setTimeout(resolve, 500)); // Delay
  }
  
  // Test with token if provided
  const token = process.argv[2];
  if (token) {
    console.log('\n🔐 Testing with authentication:');
    for (const endpoint of endpoints) {
      await testEndpoint(endpoint.name, endpoint.url, token);
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay
    }
  } else {
    console.log('\n💡 To test with authentication, provide a token:');
    console.log('   node test-api.js YOUR_JWT_TOKEN');
  }
  
  console.log('\n✨ API Tests completed!');
}

// Run tests
runTests().catch(console.error); 
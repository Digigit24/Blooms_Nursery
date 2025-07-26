import axios from 'axios';

import { endpoints } from 'src/utils/axios';

export async function getFeaturedProducts() {
  try {
    const url = endpoints.featured.list;
    const response = await axios.get(`https://blooms-backend.onrender.com/api/featured/active`);

    // ✅ Add detailed logging for debugging
    console.log('Full API response:', response.data);
    console.log('Response data type:', typeof response.data);
    console.log('Response data structure:', response.data);

    // ✅ Validate response structure
    if (!response.data) {
      throw new Error('No data received from server');
    }

    if (!response.data.success) {
      throw new Error(response.data.message || 'API returned unsuccessful response');
    }

    if (!response.data.data) {
      throw new Error('No data array found in response');
    }

    if (!Array.isArray(response.data.data)) {
      throw new Error(`Expected data to be an array, got: ${typeof response.data.data}`);
    }

    // ✅ Return the data array
    return response.data.data;
  } catch (error) {
    console.error('Error fetching featured products:', error);

    // ✅ Return a consistent error object structure
    return {
      error: true,
      message: error.message || 'Failed to fetch featured products',
    };
  }
}

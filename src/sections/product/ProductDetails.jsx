import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getFeaturedProducts } from 'src/actions/featured';

export default function ProductDetails() {
  const [plantData, setPlantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoading(true);
        const products = await getFeaturedProducts();

        // ✅ Check if the response is an error object
        if (products.error) {
          setError(products.message);
          setPlantData([]);
        } else if (Array.isArray(products)) {
          // ✅ Ensure products is an array before setting
          setPlantData(products);
          setError(null);
        } else {
          // ✅ Handle unexpected response format
          console.warn('Unexpected response format:', products);
          setPlantData([]);
          setError('Unexpected data format received');
        }
      } catch (err) {
        console.error('Error in fetchFeatured:', err);
        setError('Failed to fetch featured products');
        setPlantData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  // ✅ Debug logging after state updates
  useEffect(() => {
    console.log('Plant data updated:', plantData);
    console.log('Is array:', Array.isArray(plantData));
    console.log('Length:', plantData.length);
  }, [plantData]);

  if (loading) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h6" textAlign="center">
          Loading featured products...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h6" textAlign="center" color="error">
          Error: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      {/* Heading + Button Row */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 2,
        }}
      >
        <Typography variant="h3" sx={{ flexGrow: 1, ml: 2 }}>
          Contact us for bulk ordering
        </Typography>

        <Box
          component="button"
          sx={{
            bgcolor: '#388e3c',
            color: 'common.white',
            border: 'none',
            borderRadius: 1.2,
            px: 4,
            py: 1.8,
            fontWeight: 'bold',
            fontSize: '1.15rem',
            width: { xs: '100%', sm: 'auto' },
            cursor: 'pointer',
            '&:hover': { bgcolor: '#2e7d32' },
            transition: 'all 0.3s ease',
          }}
        >
          Order Now
        </Box>
      </Box>

      {/* Plant Cards */}
      <Grid container spacing={4}>
        {plantData.length > 0 ? (
          plantData.map((plant) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={plant.id}>
              <Card sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                <Box
                  sx={{
                    width: '100%',
                    paddingTop: '75%', // maintains aspect ratio
                    position: 'relative',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <CardMedia
                    component="img"
                    image="https://imgs.search.brave.com/Tr5g8-lmJvP7_BAMhvCH1YM65rGfho0qsWJWP7An6XU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGQVJR/YzhyeFkvMS8wLzE2/MDB3L2NhbnZhLXRl/YWwtYmx1ZS1ncmVl/bi1mbG9yYWwtd3Jl/YXRoLXBsYW50LWxv/Z28tV0dhS0RpaUZG/VVEuanBn"
                    alt={plant.category}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>

                <Typography variant="h6" sx={{ mt: 2 }}>
                  {plant.category}
                </Typography>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center" color="text.secondary">
              No featured products available
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

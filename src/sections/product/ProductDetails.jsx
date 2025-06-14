import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { PLANT_DATA } from './plant';

export default function ProductDetails() {
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
        <Typography variant="h3" sx={{ flexGrow: 1, ml:2 }}>
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
        {PLANT_DATA.map((plant) => (
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
                  image={plant.image}
                  alt={plant.name}
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
                {plant.name}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

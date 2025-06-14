import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'src/theme/styles';

import { varFade, MotionViewport } from 'src/components/animate';

import { FloatLine } from './components/svg-elements';
import { SectionTitle } from './components/section-title';

// ----------------------------------------------------------------------

export function HomePricing({ sx, ...other }) {
  const theme = useTheme();

  const FEATURES = [
    {
      title: 'Best Quality',
      description: 'We offer only healthy, top-quality plants grown with care.',
    },
    {
      title: 'Affordable',
      description: 'Get premium greens without digging deep into your pocket.',
    },
    {
      title: 'Fast Delivery',
      description: 'Fresh plants delivered quickly and safely to your doorstep.',
    },
    {
      title: 'Satisfaction',
      description: 'Customer happiness is our top priority – guaranteed!',
    },
  ];

  return (
    <Stack component="section" sx={{ py: 6, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        <FloatLine vertical sx={{ top: 0, left: 80 }} />

        <Container sx={{ mt: 2 }}>
          <SectionTitle
            caption="why us"
            title="Why choose"
            txtGradient="Blooms Nursery"
            description="Discover why plant lovers trust us for their green companions."
            sx={{ mb: 8, textAlign: 'center' }}
          />
        </Container>

        <Container>
          <Box
            sx={{
              display: 'grid',
              gap: 4,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
            }}
          >
            {FEATURES.map((item) => (
              <Stack
                key={item.title}
                component={m.div}
                variants={varFade().inUp}
                spacing={2}
                alignItems="center"
                textAlign="center"
                sx={{
                  px: 3,
                  py: 5,
                  borderRadius: 2,
                  border: `1px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
                  bgcolor: 'background.paper',
                  boxShadow: 3,
                  height: '100%',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.description}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Container>
      </MotionViewport>
    </Stack>
  );
}

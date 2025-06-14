import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'src/theme/styles';

import { varFade, MotionViewport } from 'src/components/animate';

import { FloatLine } from '../home/components/svg-elements';

// ----------------------------------------------------------------------

export function WhyChooseBlooms({ sx, ...other }) {
  const theme = useTheme();

  return (
    <Stack
      component="section"
      sx={{
        py: 12,
        minHeight: 580,
        position: 'relative',
        overflow: 'hidden',
        ...sx,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(src/assets/gardener.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          transform: 'scale(1.05)',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0,0,0,0.35)',
          zIndex: 0,
        },
      }}
      {...other}
    >
      <MotionViewport>
        <FloatLine vertical sx={{ top: 0, left: 80, position: 'relative', zIndex: 1 }} />

        <Container sx={{ mt: 2, position: 'relative', zIndex: 1 }}>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography
              variant="overline"
              sx={{
                color: '#ffffff',
                fontWeight: 'bold',
                mb: 3, // Increased spacing
                fontSize: '1.5rem', // Larger "why us"
              }}
            >
              why us
            </Typography>

            <Typography
              variant="h4"
              sx={{
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: '4.5rem', // Larger heading
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              Why choose{' '}
              <Box component="span" sx={{ color: '#4caf50', fontSize: '2rem',mt:'2' }}>
                Blooms Nursery
              </Box>
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ mt: 2, color: '#ffffff', fontSize:'1.5rem', fontWeight: '500' }}
            >
              Cultivating Green Spaces, One Plant at a Time
            </Typography>
          </Box>
        </Container>

        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'grid',
              gap: 4,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              },
              textAlign: 'center',
              color: '#ffffff',
            }}
          >
            <StatCard label="Happy Clients" value="12K+" />
            <StatCard label="Plant Varieties" value="1,200+" />
            <StatCard label="Ratings" value="4.9" />
          </Box>
        </Container>
      </MotionViewport>
    </Stack>
  );
}

function StatCard({ label, value }) {
  const theme = useTheme();

  return (
    <Stack
      component={m.div}
      variants={varFade().inUp}
      spacing={1}
      alignItems="center"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        border: `1px dashed ${varAlpha(theme.vars.palette.grey['500Channel'], 0.3)}`,
        bgcolor: 'rgba(0, 0, 0, 0.25)',
        boxShadow: 3,
        color: '#ffffff',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#4caf50', fontSize: '3rem' }}>
        {value}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: '#ffffff', fontSize: '1.25rem' }}>
        {label}
      </Typography>
    </Stack>
  );
}

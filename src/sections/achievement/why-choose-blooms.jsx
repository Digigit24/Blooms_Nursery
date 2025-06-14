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
        pt: 4,
        pb:18, // Reduced from 12
        minHeight: 580,
        position: 'relative',
        background: 'none',
        ...sx,
      }}
      {...other}
    >
      <MotionViewport>
        <FloatLine vertical sx={{ top: 0, left: 80, position: 'relative' }} />

        <Container sx={{ mt: 0 }}> 
          <Box sx={{ mb: 6, textAlign: 'center' }}> 
            <Typography
              variant="overline"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                fontSize: '1.025rem', 
                color: theme.palette.text.primary,
              }}
            >
              why us
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '3rem' }, 
                lineHeight: 1.2,
                mb: 1.5,
                color: theme.palette.text.primary,
              }}
            >
              Why choose{' '}
              <Box component="span" sx={{ color: '#4caf50', fontSize: '1.9rem' }}>
                Blooms Nursery
              </Box>
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                mt: 1,
                fontSize: '1.25rem', // Slightly smaller
                fontWeight: 500,
                color: theme.palette.text.secondary,
              }}
            >
              Cultivating Green Spaces, One Plant at a Time
            </Typography>
          </Box>
        </Container>

      <Container>
  <Box
    sx={{
      display: 'grid',
      gap: 4,
      gridTemplateColumns: {
        xs: 'repeat(1, 1fr)',    // Mobile
        sm: 'repeat(2, 1fr)',    // Tablets
        md: 'repeat(4, 1fr)',    // Desktop
      },
      textAlign: 'center',
    }}
  >
    <StatCard label="Happy Clients" value="12K+" />
    <StatCard label="Satisfaction" value="100%" />
    <StatCard label="Plant Varieties" value="120+" />
    <StatCard label="Years of Experience" value="15+" />
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
        bgcolor: theme.palette.background.paper,
        boxShadow: 3,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#4caf50', fontSize: '2.5rem' }}>
        {value}
      </Typography>
      <Typography variant="subtitle2" sx={{ fontSize: '1.125rem', color: theme.palette.text.primary }}>
        {label}
      </Typography>
    </Stack>
  );
}

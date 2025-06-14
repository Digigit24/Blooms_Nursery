import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { varAlpha, stylesMode } from 'src/theme/styles';

import { varFade, MotionViewport } from 'src/components/animate';

import miniJadePlantImg from '../../assets/plant.png';
import { CircleSvg, FloatLine, FloatPlusIcon } from './components/svg-elements';


// ----------------------------------------------------------------------

export function HomeMinimal({ sx, ...other }) {
  const renderLines = (
    <>
      <FloatPlusIcon sx={{ top: 72, left: 72 }} />
      <FloatPlusIcon sx={{ bottom: 72, left: 72 }} />
      <FloatLine sx={{ top: 80, left: 0 }} />
      <FloatLine sx={{ bottom: 80, left: 0 }} />
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );

  const checklistItem = (text) => (
    <Stack direction="row" spacing={1.5} alignItems="flex-start" key={text}>
      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: '#388e3c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: '3px',
        }}
      >
        <Box
          component="svg"
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </Box>
      </Box>
      <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
        {text}
      </Typography>
    </Stack>
  );

  const textContent = (
    <Stack spacing={3} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: 'common.black',
          mt: 0,
          mb: 2,
          fontSize: { xs: '2.25rem', md: '2.5rem' },
        }}
      >
        Add Charm & Good Luck with the{' '}
        <Box component="span" sx={{ color: '#388e3c' }}>
          Mini Jade Plant
        </Box>
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.15rem' }}>
        The Mini Jade Plant is a favorite among plant enthusiasts for its compact size, stunning
        glossy leaves, and easy care. Known as a symbol of good fortune and prosperity, this
        charming succulent makes the perfect addition to any home or office.
      </Typography>

      <Box
        component="button"
        sx={{
          bgcolor: '#388e3c',
          color: 'common.white',
          border: 'none',
          borderRadius:1.2,
          px: 3,
          py: 1.5,
          fontWeight: 'bold',
          fontSize: '1.15rem',
          width: { xs: '100%', md: 'fit-content' },
          cursor: 'pointer',
          '&:hover': {
            bgcolor: '#2e7d32',
          },
        }}
      >
        Order Now
      </Box>

      <Stack spacing={2} mt={2}>
        {[
          'Special 10% off on Bulk Order',
          'Ideal for beginners with minimal care required.',
          'Helps improve indoor air quality.',
          'Brings good luck and positive energy.',
          'Perfect for small spaces and tabletops.',
        ].map((item) => checklistItem(item))}
      </Stack>
    </Stack>
  );

  const imageContent = (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        borderRadius: 2,
        bgcolor: 'background.default',
        boxShadow: (theme) =>
          `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
        [stylesMode.dark]: {
          boxShadow: (theme) =>
            `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.common.blackChannel, 0.16)}`,
        },
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        alt="Mini Jade Plant"
        src={miniJadePlantImg}
        sx={{ width: '100%', borderRadius: 2, display: 'block' }}
      />
    </Box>
  );

  return (
    <Stack
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        py: { xs: 10, md: 20 },
        px: { xs: 2, md: 4 },
        mx: { xs: 2, md: 8 }, // Added horizontal margins
        ...sx,
      }}
      {...other}
    >
      <MotionViewport>
        {renderLines}

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 6, md: 10 },
          }}
        >
          {/* Left Text Content */}
          <Container maxWidth="md" sx={{ flex: 1 }}>
            {textContent}
          </Container>

          {/* Right Image Content */}
          <Container
            maxWidth="md"
            sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {imageContent}
          </Container>
        </Box>

        <CircleSvg variants={varFade().in} sx={{ display: { xs: 'none', md: 'block' } }} />
      </MotionViewport>
    </Stack>
  );
}
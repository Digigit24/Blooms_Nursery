import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';

import {
  varFade,
  AnimateText,
  MotionContainer,
  animateTextClasses,
} from 'src/components/animate';

// ----------------------------------------------------------------------

export function AchievementHero() {
  return (
    <Box
      sx={{
        height: { 
          xs: '70vh',    // 70% of viewport height on mobile
          sm: '75vh',    // 75% of viewport height on small tablets
          md: '80vh',    // 80% of viewport height on tablets
          lg: '85vh',    // 85% of viewport height on desktop
          xl: '90vh'     // 90% of viewport height on large screens
        },
        minHeight: { 
          xs: 450,       // Minimum 450px on mobile
          sm: 500,       // Minimum 500px on small tablets
          md: 600,       // Minimum 600px on tablets
          lg: 650        // Minimum 650px on desktop and above
        },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${CONFIG.site.basePath}/assets/background/overlay.svg), url(${CONFIG.site.basePath}src/assets/gardener.jpg)`,
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <AnimateText
            component="h1"
            variant="h1"
            text={['Our', 'Achievements']}
            variants={varFade({ distance: 24 }).inRight}
            sx={{
              color: 'common.white',
              [`& .${animateTextClasses.line}[data-index="0"]`]: {
                [`& .${animateTextClasses.word}[data-index="0"]`]: { color: 'primary.main' },
              },
            }}
          />

          <m.div variants={varFade({ distance: 24 }).inUp}>
            <Typography
              variant="h4"
              sx={{ mt: 3, color: 'common.white', fontWeight: 'fontWeightSemiBold' }}
            >
              Celebrating milestones, growth, and the green impact
              <br /> we&apos;ve nurtured across Pune and beyond.
            </Typography>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}
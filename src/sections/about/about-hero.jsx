import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';

import { varFade, AnimateText, MotionContainer, animateTextClasses } from 'src/components/animate';

// ----------------------------------------------------------------------

export function AboutHero() {
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
          xs: 450,       // Minimum 500px on mobile
          sm: 500,       // Minimum 600px on small tablets
          md: 600,       // Minimum 700px on tablets
          lg: 650        // Minimum 800px on desktop and above
        },
        py: { xs: 8, sm: 10, md: 12, lg: 15 },
        px: { xs: 2, sm: 3, md: 4 },
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${CONFIG.site.basePath}/assets/background/overlay.svg), url(${CONFIG.site.basePath}src/assets/gardener.jpg)`,
      }}
    >
      <Container 
        component={MotionContainer}
        maxWidth="lg"
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: { xs: 'center', md: 'flex-end' },
          justifyContent: { xs: 'center', md: 'flex-start' },
        }}
      >
        <Box
          sx={{
            pb: { xs: 0, md: 8, lg: 10, xl: 12 },
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: { xs: '100%', md: '80%', lg: '70%' },
          }}
        >
          <AnimateText
            component="h1"
            variant="h1"
            text={['Who', 'we are?']}
            variants={varFade({ distance: 24 }).inRight}
            sx={{
              color: 'common.white',
              fontSize: { 
                xs: '2.5rem', 
                sm: '3rem', 
                md: '3.5rem', 
                lg: '4rem',
                xl: '4.5rem'
              },
              lineHeight: { xs: 1.2, md: 1.1 },
              [`& .${animateTextClasses.line}[data-index="0"]`]: {
                [`& .${animateTextClasses.word}[data-index="0"]`]: { color: 'primary.main' },
              },
            }}
          />

          <m.div variants={varFade({ distance: 24 }).inUp}>
            <Typography
              variant="h4"
              sx={{ 
                mt: { xs: 2, sm: 3, md: 4 }, 
                color: 'common.white', 
                fontWeight: 'fontWeightSemiBold',
                fontSize: { 
                  xs: '1.25rem', 
                  sm: '1.5rem', 
                  md: '1.75rem', 
                  lg: '2rem',
                  xl: '2.25rem'
                },
                lineHeight: { xs: 1.4, md: 1.3 },
                maxWidth: { xs: '100%', md: '90%' },
              }}
            >
              Let&apos;s nurture growth together and cultivate a
              <Box component="br" sx={{ display: { xs: 'none', sm: 'block' } }} />
              beautiful green space with ease.
            </Typography>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}
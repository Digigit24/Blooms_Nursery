import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';

import {
  varFade,
  AnimateText,
  MotionContainer,
  animateTextClasses,
} from 'src/components/animate';

// ----------------------------------------------------------------------

const CONTACT = {
  address:
    'Bloom Nursery, Behind Vanalika Housing Society, Pirangut Ghat, Pune, Maharashtra 412115',
  email: 'contact@bloomsnursery.in',
  phone: '+91 9325 910 057 | +91 8484 899 055',
};

// ----------------------------------------------------------------------

export function ContactHero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: `0deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)}, ${varAlpha(
            theme.vars.palette.grey['900Channel'],
            0.8
          )}`,
          imgUrl: `${CONFIG.site.basePath}src/assets/gardener.jpg`,
        }),
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
            text={['Where', 'to find us?']}
            variants={varFade({ distance: 24 }).inUp}
            sx={{
              color: 'common.white',
              [`& .${animateTextClasses.line}[data-index="0"]`]: {
                [`& .${animateTextClasses.word}[data-index="0"]`]: {
                  color: 'primary.main',
                },
              },
            }}
          />

          {/* Contact Info Row */}
          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems={{ xs: 'center', md: 'flex-start' }}
            sx={{
              mt: 5,
              gap: 4,
              color: 'common.white',
              textAlign: { xs: 'center', md: 'left' },
              flexWrap: 'wrap',
            }}
          >
            <m.div variants={varFade({ distance: 24 }).inUp}>
              <Typography variant="body1">{CONTACT.address}</Typography>
            </m.div>

            <m.div variants={varFade({ distance: 24 }).inUp}>
              <Typography variant="body1">{CONTACT.email}</Typography>
            </m.div>

            <m.div variants={varFade({ distance: 24 }).inUp}>
              <Typography variant="body1">{CONTACT.phone}</Typography>
            </m.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
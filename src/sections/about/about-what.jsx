import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';
import { varAlpha, stylesMode } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export function AboutWhat() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{ py: { xs: 6, md: 10 }, textAlign: { xs: 'center', md: 'left' } }}
    >
      <Grid container columnSpacing={{ md: 3 }} alignItems="center">
        {/* Left side image */}
        <Grid
          xs={12}
          md={6}
          lg={7}
          sx={{
            pr: { md: 7 },
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <m.div variants={varFade().inUp}>
            <Image
              alt="About us"
              src={`${CONFIG.site.basePath}/src/assets/about/about-us.jpg`}
              sx={{
                borderRadius: 3,
                width: '100%',
                maxHeight: 500,
                height: 'auto',
                boxShadow: `-40px 40px 80px ${varAlpha(
                  theme.vars.palette.grey['500Channel'],
                  0.24
                )}`,
                [stylesMode.dark]: {
                  boxShadow: `-40px 40px 80px ${varAlpha(
                    theme.vars.palette.common.blackChannel,
                    0.24
                  )}`,
                },
              }}
            />
          </m.div>
        </Grid>

        {/* Right side new content */}
        <Grid
          xs={12}
          md={6}
          lg={5}
          sx={{
            pt: { xs: 4, md: 0 },
            px: { xs: 2, md: 0 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <m.div variants={varFade().inRight}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                fontSize: { xs: '2rem', md: '2.75rem' },
                display: 'inline-block',
              }}
            >
              Blooming Into a{' '}
              <Box component="span" sx={{ color: 'success.main' }}>
                Masterpiece
              </Box>
            </Typography>
          </m.div>

          <m.div variants={varFade().inRight}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6,
                [stylesMode.dark]: { color: 'common.white' },
              }}
            >
              At Blooms Nursery, we believe in the transformative power of nature.
              Nestled in the heart of tranquility, our nursery is more than just a place for plants—it’s a haven where life flourishes, and dreams take root.
            </Typography>
          </m.div>

       <m.div
  variants={varFade().inRight}
  initial="visible"
  animate="visible"
>
  <Typography
    variant="subtitle1"
    sx={{
      fontWeight: 'medium',
      color: theme.palette.mode === 'dark' ? '#ccc' : '#333',
      fontStyle: 'italic',
      fontSize: { xs: '1rem', md: '1.125rem' },
    }}
  >
    Blooms Nursery | Director
  </Typography>
</m.div>

        </Grid>
      </Grid>
    </Container>
  );
}

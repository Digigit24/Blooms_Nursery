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

const visionPoints = [
  'A world where everyone embraces greenery in their daily lives.',
  'Sustainable urban spaces filled with thriving plants.',
  'A community that values and nurtures nature.',
  'Increased awareness of eco-friendly gardening practices.',
  'A greener future for generations to come.',
];

// ----------------------------------------------------------------------

export function VisionContext() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 8, md: 12 },
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          flexDirection: {
            xs: 'column-reverse',
            md: 'row',
          },
        }}
      >
        {/* Left: Text Content */}
        <Grid xs={12} md={6} lg={6}>
          <Box sx={{ px: { xs: 1, sm: 2, md: 0 } }}>
            <m.div variants={varFade().inLeft}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                  color: theme.palette.text.primary,
                  mb: 2,
                }}
              >
                We inspire you to connect with nature
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: '1.125rem',
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                We are dedicated to enriching lives by providing high-quality plants, expert guidance, and sustainable solutions for urban gardeners, landscapers, and plant enthusiasts. Our goal is to cultivate a greener, more vibrant world while fostering a deep appreciation for nature.
              </Typography>
            </m.div>

            <m.div variants={varFade().inLeft}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mb: 1 }}
              >
                What We Envision
              </Typography>

              <Box component="ul" sx={{ pl: 0, listStyle: 'none', m: 0 }}>
                {visionPoints.map((text, index) => (
                  <Box
                    key={index}
                    component="li"
                    sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: '#388e3c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: '4px',
                        mr: 1.5,
                        flexShrink: 0,
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
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: '1rem', md: '1.125rem' },
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        [stylesMode.dark]: { color: 'common.white' },
                      }}
                    >
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </m.div>
          </Box>
        </Grid>

        {/* Right: Image */}
        <Grid xs={12} md={6} lg={6}>
          <m.div variants={varFade().inUp}>
            <Image
              alt="Vision"
              src={`${CONFIG.site.basePath}/src/assets/plant-Blooms-Nursery.webp`}
              sx={{
                borderRadius: 3,
                width: '100%',
                maxHeight: { xs: 280, sm: 400, md: 600 },
                objectFit: 'cover',
                boxShadow: `0px 20px 80px ${varAlpha(
                  theme.vars.palette.grey['500Channel'],
                  0.2
                )}`,
                [stylesMode.dark]: {
                  boxShadow: `0px 20px 80px ${varAlpha(
                    theme.vars.palette.common.blackChannel,
                    0.24
                  )}`,
                },
              }}
            />
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );
}

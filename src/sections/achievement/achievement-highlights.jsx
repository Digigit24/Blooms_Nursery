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

const achievements = [
  'Flower show December 2018 - Statue of Unity, Kevadia, Gujarat.',
  'Vishwavan project - Kevadia, Gujarat.',
  'October 2020 Flower show - Statue of Unity, Kevadia, Gujarat.',
  'Daman Flower Show - January 2021.',
  'Meeting with Maharashtra Governor.',
  'Empress Garden flower show - January 2019, Pune.',
  'Ahmedabad Municipal Corporation flower show - 2019. Supplying material since 7 years.',
  'Supplying quality seedlings to All India Reliance Industries Ltd units.',
  'Supplying quality seedlings to Hyderabad airport and Delhi airport vendors.',
];

// ----------------------------------------------------------------------

export function AchievementHighlight() {
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
            {/* Subheading */}
            <m.div variants={varFade().inLeft}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 'medium',
                  fontSize: { xs: '1.3rem', md: '1.5rem' },
                  color: theme.palette.mode === 'dark' ? '#ccc' : '#333',
                  mb: 3,
                }}
              >
                Meeting with Maharashtra Governor Mr. Bhagatsingh Koshiyari ji regarding Biodiversity
                in Rajbhavan Mumbai project.
              </Typography>
            </m.div>

            {/* Achievement List */}
            <m.div variants={varFade().inLeft}>
              <Box component="ul" sx={{ pl: 0, listStyle: 'none', m: 0 }}>
                {achievements.map((text, index) => (
                  <Box
                    key={index}
                    component="li"
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Box
                      component="img"
                      src={`${CONFIG.site.basePath}/src/assets/band.png`}
                      alt="band icon"
                      sx={{
                        width: 20,
                        height: 20,
                        mt: '4px',
                        mr: 1.5,
                        flexShrink: 0,
                      }}
                    />
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
              alt="Achievement"
              src={`${CONFIG.site.basePath}/src/assets/achievement.jpeg`}
              sx={{
                borderRadius: 3,
                width: '100%',
                maxHeight: { xs: 280, sm: 400, md: 500 },
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

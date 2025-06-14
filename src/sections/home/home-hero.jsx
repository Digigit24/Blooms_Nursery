import { useRef, useState, useEffect } from 'react';
import {
  m,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Img1 from '../../assets/slider-img-4.png';  // small screen images
import Img2 from '../../assets/slider-img-5.png';
import SliderImg1 from '../../assets/slider-img-1.png';
import SliderImg2 from '../../assets/slider-img-2.png';
import SliderImg3 from '../../assets/slider-img-3.png';
import { HeroBackground } from './components/hero-background';

// ----------------------------------------------------------------------

const desktopImages = [SliderImg1, SliderImg2, SliderImg3];
const mobileImages = [Img1, Img2];
const mdKey = 'md';

export function HomeHero({ sx, ...other }) {
  const theme = useTheme();
  const scroll = useScrollPercent();
  const opacity = useTransform(scroll.scrollY, [0, 1], [1, 1]);

  const isMobile = useMediaQuery(theme.breakpoints.down(mdKey));
  const images = isMobile ? mobileImages : desktopImages;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const direction = useRef(1); // 1 = forward

  // Reset indices when switching between mobile/desktop images
  useEffect(() => {
    setCurrentIndex(0);
    setPrevIndex(0);
  }, [isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => {
        direction.current = 1;
        return (prev + 1) % images.length;
      });
    }, 5000); // 5seconds
    return () => clearInterval(interval);
  }, [currentIndex, images]);

  return (
    <Stack
      ref={scroll.elementRef}
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        [theme.breakpoints.up(mdKey)]: {
          minHeight: 760,
          height: '100vh',
          maxHeight: 1440,
          display: 'block',
          willChange: 'opacity',
          mt: '10px',
        },
        ...sx,
      }}
      {...other}
    >
      <Box
        component={m.div}
        style={{ opacity }}
        sx={{
          width: 1,
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          transition: theme.transitions.create(['opacity']),
          [theme.breakpoints.up(mdKey)]: {
            height: 'auto',
            position: 'relative',
            maxHeight: 'none',
          },
        }}
      >
        <Container
          component={Box}
          sx={{
            py: 3,
            gap: 5,
            zIndex: 9,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            [theme.breakpoints.up(mdKey)]: {
              flex: '1 1 auto',
              justifyContent: 'center',
              py: 0,
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 1200,
              position: 'relative',
              height: 520,
              overflow: 'hidden',
              borderRadius: 2,
            }}
          >
            <AnimatePresence>
              {images.map((img, index) => {
                const isCurrent = index === currentIndex;
                const isPrev = index === prevIndex;

                if (!isCurrent && !isPrev) return null;

                return (
                  <Box
                    key={index}
                    component={m.img}
                    src={img}
                    alt={`Slide ${index + 1}`}
                    initial={{ x: isCurrent ? '100%' : 0, opacity: 0 }}
                    animate={{ x: isCurrent ? '0%' : '-100%', opacity: 1 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 2,
                      zIndex: isCurrent ? 2 : 1,
                    }}
                  />
                );
              })}
            </AnimatePresence>
          </Box>
        </Container>

        <HeroBackground />
      </Box>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function useScrollPercent() {
  const elementRef = useRef(null);
  const { scrollY } = useScroll();
  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollY, 'change', (scrollHeight) => {
    let heroHeight = 0;
    if (elementRef.current) {
      heroHeight = elementRef.current.offsetHeight;
    }
    const scrollPercent = Math.floor((scrollHeight / heroHeight) * 100);
    setPercent(scrollPercent >= 100 ? 100 : scrollPercent);
  });

  return { elementRef, percent, scrollY };
}

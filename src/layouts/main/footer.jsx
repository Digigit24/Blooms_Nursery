import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { _socials } from 'src/_mock';

import { Logo } from 'src/components/logo';
import { SocialIcon } from 'src/components/iconify';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Quick Links',
    children: [
      { name: 'Home', href: '/' },
      { name: 'Contact Us', href: '/contact-us' },
      { name: 'Shop', href: '/product' },
      { name: 'Blogs', href: '/post' },
    ],
  },
  {
    headline: 'Company',
    children: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Achievement', href: '/achievement' },
      { name: 'Vision', href: '/vision' },
      { name: 'Mission', href: '/mission' },
    ],
  },
  {
    headline: 'Contact Us',
    children: [
      { name: 'contact@bloomsnursery.in', href: 'mailto:contact@bloomsnursery.in' },
      { name: '+91 9325 910 057', href: 'tel:+919325910057' },
      { name: '+91 8484 899 055', href: 'tel:+918484899055' },
      {
        name: 'Bloom Nursery, Behind Vanalika Housing Society, Pirangut Ghat, Pune, Maharashtra 412115',
        href: 'https://maps.google.com?q=Bloom+Nursery+Pirangut+Ghat+Pune',
      },
    ],
  },
];

// ----------------------------------------------------------------------

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#1a1a1a', color: '#ffffff', pt: 14, pb: 12 }}>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={4}>
          {/* Logo + Description */}
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={3}>
              <Logo />

              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Cultivating Green Spaces for Every Home. Blooms Nursery brings you nature&apos;s best with love and care.
              </Typography>

              <Stack direction="row" spacing={1}>
                {_socials.map((social) => (
                  <IconButton key={social.name} aria-label={social.name} sx={{ color: '#ffffff' }}>
                    <SocialIcon icon={social.name} />
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* The rest 3 sections: Quick Links, Company, Contact Us */}
          {LINKS.map((section) => (
            <Grid key={section.headline} item xs={12} sm={6} md={3}>
              <Stack spacing={1.5}>
                <Typography variant="overline" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                  {section.headline}
                </Typography>

                {section.children.map((link) => (
                  <Link
                    key={link.name}
                    component={
                      link.href.startsWith('http') ||
                      link.href.startsWith('mailto') ||
                      link.href.startsWith('tel')
                        ? 'a'
                        : RouterLink
                    }
                    href={link.href}
                    color="inherit"
                    underline="hover"
                    variant="body2"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener' : undefined}
                    sx={{
                      transition: 'color 0.2s',
                      '&:hover': { color: '#4caf50' },
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { Walktour, useWalktour } from 'src/components/walktour';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ComponentHero } from '../../component-hero';

// ----------------------------------------------------------------------

export function WalktourView() {
  const theme = useTheme();

  const router = useRouter();

  const walktour = useWalktour({
    defaultRun: true,
    steps: [
      {
        target: 'body',
        title: `Let's begin our journey!`,
        placement: 'center',
        hideCloseButton: true,
        content: (
          <Typography sx={{ color: 'text.secondary' }}>
            Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna
            dolor sagittis lacus.
          </Typography>
        ),
      },
      {
        target: '#demo__2',
        title: 'Step 2',
        placement: 'left-start',
        content: (
          <Typography sx={{ mb: 2, color: 'text.secondary' }}>
            Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna
            dolor sagittis lacus.
          </Typography>
        ),
      },
      {
        target: '#demo__3',
        title: 'Step 3',
        placement: 'bottom',
        content: (
          <>
            <Typography sx={{ mb: 2, color: 'text.secondary' }}>
              Weekly magic on your inbox
            </Typography>
            <TextField
              variant="filled"
              fullWidth
              label="Email"
              placeholder="example@gmail.com"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <Button color="inherit" variant="soft" sx={{ mr: -0.5 }}>
                    Send
                  </Button>
                ),
              }}
            />
          </>
        ),
      },
      {
        target: '#demo__4',
        title: 'Step 4',
        placement: 'left',
        content: (
          <Stack spacing={3}>
            <Typography sx={{ color: 'text.secondary' }}>
              Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin
              urna dolor sagittis lacus.
            </Typography>
            <Paper component="ul" variant="outlined">
              {[
                { label: 'Wi-Fi', icon: 'solar:home-wifi-bold-duotone', defaultChecked: true },
                {
                  label: 'Bluetooth',
                  icon: 'solar:bluetooth-square-bold-duotone',
                  defaultChecked: true,
                },
                { label: 'Airbuds', icon: 'solar:airbuds-bold-duotone', defaultChecked: false },
                { label: 'Alarm', icon: 'solar:alarm-bold-duotone', defaultChecked: false },
              ].map((option) => (
                <Box
                  component="li"
                  key={option.label}
                  sx={{ py: 1, px: 2, display: 'flex', alignItems: 'center' }}
                >
                  <Iconify width={26} icon={option.icon} sx={{ color: 'text.secondary', mr: 2 }} />
                  <Box
                    component="span"
                    id={`switch-list-label-${option.label}`}
                    sx={{ typography: 'subtitle2', flexGrow: 1 }}
                  >
                    {option.label}
                  </Box>
                  <Switch
                    color="default"
                    defaultChecked={option.defaultChecked}
                    edge="end"
                    inputProps={{
                      name: option.label,
                      'aria-labelledby': `switch-list-label-${option.label}`,
                    }}
                  />
                </Box>
              ))}
            </Paper>
          </Stack>
        ),
      },
      {
        target: '#demo__5',
        title: 'Step 5',
        placement: 'left',
        styles: { options: { arrowColor: theme.vars.palette.grey[800] } },
        slotProps: {
          root: {
            width: 480,
            bgcolor: theme.vars.palette.grey[800],
            color: theme.vars.palette.common.white,
          },
        },
        content: (
          <Stack spacing={3}>
            <Typography sx={{ color: 'text.disabled' }}>
              Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin
              urna dolor sagittis lacus.
            </Typography>
          </Stack>
        ),
      },
    ],
  });

  return (
    <>
      <Walktour
        run={walktour.run}
        steps={walktour.steps}
        callback={walktour.onCallback}
        getHelpers={walktour.setHelpers}
      />

      <ComponentHero>
        <CustomBreadcrumbs
          heading="Walktour"
          links={[{ name: 'Components', href: paths.components }, { name: 'Walktour' }]}
          moreLink={['https://docs.react-joyride.com/']}
        />
      </ComponentHero>

      <Container sx={{ my: 10 }}>
        <Stack alignItems="flex-end" sx={{ mb: 5 }}>
          <Button
            size="large"
            variant="outlined"
            onClick={() => router.refresh()}
            startIcon={<Iconify icon="solar:restart-bold" />}
          >
            Reload
          </Button>
        </Stack>
      </Container>
    </>
  );
}

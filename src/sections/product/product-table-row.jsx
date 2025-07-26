import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function RenderCellPrice({ params }) {
  return <Box sx={{ typography: 'body2' }}>{fCurrency(params.row.price)}</Box>;
}

// ----------------------------------------------------------------------

export function RenderCellPublish({ params }) {
  const labelMap = {
    published: 'Available',
    draft: 'Out of Stock',
  };

  const label = labelMap[params.row.publish] || 'Unknown';

  return (
    <Label
      variant="soft"
      color={(params.row.publish === 'published' && 'info') || 'default'}
    >
      {label}
    </Label>
  );
}


// ----------------------------------------------------------------------

export function RenderCellCreatedAt({ params }) {
  return (
    <Stack spacing={0.5}>
      <Box component="span" sx={{ typography: 'body2' }}>
        {fDate(params.row.createdAt)}
      </Box>
      {/* <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
        {fTime(params.row.createdAt)}
      </Box> */}
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function RenderCellStock({ params }) {
  const { row } = params;
  
  // Determine stock status based on inventoryType
  const getStockProgress = () => {
    switch (row.inventoryType) {
      case 'out of stock':
        return 0;
      case 'low stock':
        return 30;
      case 'in stock':
        return 100;
      default:
        return 50;
    }
  };

  const getStockColor = () => {
    switch (row.inventoryType) {
      case 'out of stock':
        return 'error';
      case 'low stock':
        return 'warning';
      case 'in stock':
        return 'success';
      default:
        return 'primary';
    }
  };

  return (
    <Stack spacing={1} sx={{ minWidth: 120 }}>
      <LinearProgress
        value={getStockProgress()}
        variant="determinate"
        color={getStockColor()}
        sx={{ width: 1, height: 6 }}
      />
      <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
        {row.inventoryType}
      </Typography>
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function RenderCellProduct({ params, onViewRow }) {
  const { row } = params;
  
  const handleClick = (event) => {
    event.preventDefault();
    onViewRow?.();
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 1 }}>
      <Avatar
        variant="rounded"
        src={row.image}
        alt={row.name}
        sx={{ 
          width: 48, 
          height: 48,
          bgcolor: 'background.neutral',
          '& img': {
            objectFit: 'cover',
          }
        }}
      >
        {!row.image && row.name?.charAt(0)?.toUpperCase()}
      </Avatar>
      
      <ListItemText
        primary={
          <Link
            component="button"
            variant="subtitle2"
            onClick={handleClick}
            sx={{
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {row.name}
          </Link>
        }
        secondary={
          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Category: {row.category || 'N/A'}
            </Typography>
            {row.rating && (
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                • Rating: {row.rating}
              </Typography>
            )}
          </Stack>
        }
        primaryTypographyProps={{
          component: 'div',
        }}
        secondaryTypographyProps={{
          component: 'div',
        }}
      />
    </Stack>
  );
}
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// import { Label } from 'src/components/label';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';

import { useCheckoutContext } from '../checkout/context';

// ----------------------------------------------------------------------

export function ProductItem({ product }) {
  const checkout = useCheckoutContext();

  const {
    id,
    product_name: name, // ✅ Destructure product_name as name
    image: coverUrl, // ✅ Destructure image as coverUrl
    price,
    available,
    stock, // ✅ Stock from JSON
    rating: totalRatings, // ✅ Destructure rating as totalRatings
    reviews: totalReviews, // ✅ Destructure reviews as totalReviews
    category, // ✅ Category from JSON
  } = product;


  const linkTo = paths.product.details(id);

  // ✅ Check if product is unavailable or out of stock
  const isUnavailable = !available || stock === 0;

  const handleAddCart = async () => {
    // ✅ Prevent adding to cart if unavailable or out of stock
    if (isUnavailable) return;

    const newProduct = {
      id,
      name,
      coverUrl,
      available,
      price: parseFloat(price),
      quantity: 1,
    };
    try {
      checkout.onAddToCart(newProduct);
    } catch (error) {
      console.error(error);
    }
  };

  const renderImg = (
    <Box sx={{ position: 'relative', p: 1 }}>
      {/* ✅ Stock indicator in top right corner - show actual stock number */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 10,
          backgroundColor: stock > 0 ? 'success.main' : 'error.main',
          color: 'white',
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          minWidth: '24px',
          textAlign: 'center',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          lineHeight: 1.2,
        }}
      >
        {stock}
      </Box>

      {/* ✅ Only show add to cart button if available and in stock */}
      {available && (
        <Fab
          color="warning"
          size="medium"
          className="add-cart-btn"
          onClick={handleAddCart}
          sx={{
            right: 16,
            bottom: 16,
            zIndex: 9,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('all', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <Iconify icon="solar:cart-plus-bold" width={24} />
        </Fab>
      )}

      <Tooltip
        title={isUnavailable ? (stock === 0 ? 'Out of stock' : 'Unavailable') : ''}
        placement="bottom-end"
      >
        <Image
          alt={name}
          src="https://imgs.search.brave.com/mooBilSpkjFv8HeAw6r4bbTSOcJ3udpugZ8_F5OD7Pk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS12/ZWN0b3IvbG9nby1w/bGFudHMtcG90cy1y/b29tLWRlY29yYXRp/b24tMjYwbnctMTUy/NDg0ODU5NC5qcGc"
          ratio="1/1"
          sx={{
            borderRadius: 1.5,
          }}
        />
      </Tooltip>
    </Box>
  );

  const renderContent = (
    <Stack spacing={1.5} sx={{ p: 3, pt: 2 }}>
      {/* ✅ Plant Name */}
      <Link
        component={isUnavailable ? 'span' : RouterLink}
        href={isUnavailable ? undefined : linkTo}
        color="inherit"
        variant="subtitle2"
        noWrap
        sx={{
          fontWeight: 600,
          fontSize: '1rem',
          ...(isUnavailable && {
            cursor: 'not-allowed',
            pointerEvents: 'none',
            '&:hover': { textDecoration: 'none' },
          }),
        }}
      >
        {name}
      </Link>

      {/* ✅ Category Display */}
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontStyle: 'italic',
          fontSize: '0.875rem',
          mb: 1,
        }}
      >
        {category}
      </Typography>

      {/* ✅ Rating and Reviews Section */}
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ typography: 'body2' }}>
        <Rating
          size="small"
          value={parseFloat(totalRatings)}
          precision={0.1}
          readOnly
          sx={{
            '& .MuiRating-iconEmpty': {
              color: 'action.disabled',
            },
            '& .MuiRating-iconFilled': {
              color: isUnavailable ? 'action.disabled' : 'warning.main',
            },
            pointerEvents: 'none',
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontSize: '0.75rem',
          }}
        >
          ({totalReviews} reviews)
        </Typography>
      </Stack>

      {/* ✅ Stock Status Messages */}
      {stock === 0 && (
        <Typography
          variant="caption"
          sx={{
            color: 'error.main',
            fontWeight: 'bold',
            mt: 0.5,
          }}
        >
          Out of Stock
        </Typography>
      )}
      {!available && stock > 0 && (
        <Typography
          variant="caption"
          sx={{
            color: 'warning.main',
            fontWeight: 'bold',
            mt: 0.5,
          }}
        >
          Unavailable
        </Typography>
      )}
    </Stack>
  );

  return (
    <Card
      sx={{
        cursor: isUnavailable ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        // ✅ Hover effects for available items
        ...(!isUnavailable && {
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 3,
          },
          '&:hover .add-cart-btn': {
            opacity: 1,
          },
        }),
        // ✅ Disabled styling for unavailable items
        ...(isUnavailable && {
          filter: 'grayscale(1)',
          opacity: 0.6,
          pointerEvents: 'none',
          cursor: 'not-allowed',
        }),
      }}
    >
      {renderImg}
      {renderContent}
    </Card>
  );
}

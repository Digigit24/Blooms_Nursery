import axios from 'axios';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const NewProductSchema = zod.object({
  category: zod.string().min(1, { message: 'Category is required!' }),
  product_name: zod.string().min(1, { message: 'Product name is required!' }),
  stock: zod.number().int().min(0, { message: 'Stock must be 0 or greater!' }),
  price: zod.number().min(0.01, { message: 'Price must be greater than 0!' }),
  available: zod.boolean(),
  image: zod.string().url({ message: 'Valid image URL is required!' }),
  rating: zod.number().min(0).max(5).optional(),
  reviews: zod.number().int().min(0).optional(),
});

// Category options for nursery
const NURSERY_CATEGORIES = [
  'Indoor Plants',
  'Outdoor Plants',
  'Flowering Plants',
  'Succulents',
  'Herbs',
  'Trees',
  'Seeds',
  'Fertilizers',
  'Pots & Planters',
  'Garden Tools',
];

// ----------------------------------------------------------------------

export function ProductNewEditForm({ currentProduct }) {
  const router = useRouter();

  const [imageUploading, setImageUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(currentProduct?.image || '');
  const [selectedFile, setSelectedFile] = useState(null);

  const defaultValues = useMemo(
    () => ({
      category: currentProduct?.category || '',
      product_name: currentProduct?.product_name || '',
      stock: currentProduct?.stock || 0,
      price: currentProduct?.price || 0,
      available: currentProduct?.available ?? true,
      image: currentProduct?.image || '',
      rating: currentProduct?.rating || 0,
      reviews: currentProduct?.reviews || 0,
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  // Get token from localStorage
  const getAuthToken = useCallback(() => {
    const token = localStorage.getItem('adminToken');
    return token;
  }, []);

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
      setImageUrl(currentProduct.image || '');
    }

    // Update the form field when imageUrl changes
    if (imageUrl) {
      setValue('image', imageUrl, { shouldValidate: true });
    }
  }, [currentProduct, defaultValues, reset, imageUrl, setValue]);

  // Upload image to Cloudinary
  const uploadImageToCloudinary = useCallback(
    async (file) => {
      console.log('🚀 Starting upload to Cloudinary...');
      console.log('📄 File details:', {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      try {
        setImageUploading(true);
        console.log('⏳ Set imageUploading to true');

        const formData = new FormData();
        formData.append('image', file);
        console.log('📦 FormData created with image key');

        const token = getAuthToken();
        console.log(
          '🔑 Token retrieved:',
          token ? `Token exists (${token.length} chars)` : 'No token found'
        );
        console.log('🔑 Token preview:', token ? `${token.substring(0, 50)}...` : 'N/A');

        if (!token) {
          console.log('💡 Suggestion: Please log in first to get an authentication token');
          toast.error('Authentication required. Please log in first.');
          throw new Error('Authentication token not found');
        }

        console.log(
          '📡 Making API call to:',
          'https://blooms-backend.onrender.com/api/upload/image'
        );
        console.log('📋 Request headers will include:');
        console.log('   - Content-Type: multipart/form-data');
        console.log('   - Authorization: Bearer [token]');
        console.log('📦 FormData contains key "image" with file:', file.name);

        const response = await axios.post(
          'https://blooms-backend.onrender.com/api/upload/image',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('📥 API Response:', response);
        console.log('📊 Response data:', response.data);

        // Handle your backend response structure
        if (
          response.data &&
          response.data.success &&
          response.data.data &&
          response.data.data.imageUrls
        ) {
          const cloudinaryUrl = response.data.data.imageUrls.original;
          console.log('🌟 Cloudinary URL received:', cloudinaryUrl);

          setImageUrl(cloudinaryUrl);
          setValue('image', cloudinaryUrl, { shouldValidate: true });
          console.log('✅ Image URL set in state and form');

          toast.success('Image uploaded successfully!');
          return cloudinaryUrl;
        }

        // Fallback: check if response has direct url property
        if (response.data && response.data.url) {
          const cloudinaryUrl = response.data.url;
          console.log('🌟 Cloudinary URL received (fallback):', cloudinaryUrl);

          setImageUrl(cloudinaryUrl);
          setValue('image', cloudinaryUrl, { shouldValidate: true });
          console.log('✅ Image URL set in state and form');

          toast.success('Image uploaded successfully!');
          return cloudinaryUrl;
        }

        console.log('❌ Invalid response - no URL found');
        throw new Error('Invalid response from image upload');
      } catch (error) {
        console.error('💥 Image upload error:', error);
        console.error('📋 Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          statusText: error.response?.statusText,
        });

        // Log the full response for debugging
        if (error.response) {
          console.error('🔍 Full error response:', error.response);
          console.error('🔍 Error response data:', JSON.stringify(error.response.data, null, 2));
        }

        // Handle specific backend errors
        let errorMessage = 'Failed to upload image';

        if (error.response?.data?.error === 'Must supply api_key') {
          errorMessage =
            '⚠️ Backend Configuration Error: Cloudinary API key is missing. Please check your backend environment variables.';
          console.error('🚨 BACKEND CONFIG ISSUE: Cloudinary API key not configured on server');
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.message) {
          errorMessage = error.message;
        }

        toast.error(errorMessage);
        throw error;
      } finally {
        setImageUploading(false);
        console.log('⏹️ Set imageUploading to false');
      }
    },
    [setValue, getAuthToken]
  );

  // Handle manual file selection
  const handleManualFileSelect = useCallback(
    (event) => {
      const file = event.target.files?.[0];

      if (file) {
        // Validate file size (5MB)
        if (file.size > 5242880) {
          toast.error('File size must be less than 5MB');
          return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error('Please select a valid image file');
          return;
        }

        setSelectedFile(file);
        uploadImageToCloudinary(file);
      }
    },
    [uploadImageToCloudinary]
  );

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!imageUrl) {
        toast.error('Please upload an image before submitting');
        return;
      }

      const token = getAuthToken();
      if (!token) {
        toast.error('Authentication required. Please log in first.');
        return;
      }

      const productData = {
        category: data.category,
        product_name: data.product_name,
        stock: Number(data.stock),
        price: String(data.price),
        available: data.available,
        image: imageUrl,
        rating: String(data.rating || 0),
        reviews: Number(data.reviews || 0),
      };

      const response = await axios({
        method: 'POST',
        url: 'https://blooms-backend.onrender.com/api/products',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: productData,
      });

      if (response.status === 200 || response.status === 201) {
        reset();
        setImageUrl('');
        setSelectedFile(null);
        toast.success('Product created successfully!');
        router.push(paths.dashboard.product.root);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create product');
    }
  });

  const handleRemoveFile = useCallback(() => {
    setImageUrl('');
    setSelectedFile(null);
    setValue('image', '', { shouldValidate: true });
    // Clear the file input
    const fileInput = document.getElementById('image-upload-input');
    if (fileInput) {
      fileInput.value = '';
    }
  }, [setValue]);

  // Check if form can be submitted (image must be uploaded)
  const canSubmit = isValid && imageUrl && !imageUploading;

  const renderDetails = (
    <Card>
      <CardHeader title="Product Details" subheader="Basic product information..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography variant="subtitle2" color="success.main" sx={{ mb: 2 }}>
          ✅ Authentication: Using adminToken from localStorage
        </Typography>

        <Field.Select name="category" label="Category" native InputLabelProps={{ shrink: true }}>
          <option value="">Select Category</option>
          {NURSERY_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Field.Select>

        <Field.Text name="product_name" label="Product Name" placeholder="Enter product name" />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Field.Text
            name="price"
            label="Price (₹)"
            type="number"
            inputProps={{ step: '0.01', min: '0' }}
            placeholder="0.00"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    ₹
                  </Box>
                </InputAdornment>
              ),
            }}
          />

          <Field.Text
            name="stock"
            label="Stock Quantity"
            type="number"
            inputProps={{ min: '0' }}
            placeholder="0"
            fullWidth
          />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">
            Product Image *
            {imageUploading && (
              <Box component="span" sx={{ ml: 1 }}>
                <CircularProgress size={16} />
              </Box>
            )}
          </Typography>

          {/* Hidden field to store the image URL for form validation */}
          <input type="hidden" name="image" value={imageUrl} {...methods.register('image')} />

          {/* Manual File Input */}
          <Box
            sx={{
              border: '2px dashed #e0e0e0',
              borderRadius: 2,
              p: 3,
              textAlign: 'center',
              backgroundColor: imageUploading ? '#f5f5f5' : 'transparent',
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleManualFileSelect}
              disabled={imageUploading}
              style={{ display: 'none' }}
              id="image-upload-input"
            />
            <label htmlFor="image-upload-input">
              <Button
                variant="outlined"
                component="span"
                disabled={imageUploading}
                size="large"
                sx={{ mb: 1 }}
              >
                {imageUploading ? 'Uploading...' : 'Choose Image'}
              </Button>
            </label>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Maximum file size: 5MB. Supported formats: JPG, PNG, WEBP
            </Typography>

            {selectedFile && (
              <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
                Selected: {selectedFile.name}
              </Typography>
            )}

            {imageUrl && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="success.main" sx={{ display: 'block', mb: 1 }}>
                  ✓ Image uploaded successfully
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mb: 1 }}
                >
                  Image URL: {imageUrl.substring(0, 50)}...
                </Typography>
                <Box
                  sx={{ display: 'flex', justifyContent: 'center', gap: 2, alignItems: 'center' }}
                >
                  <img
                    src={imageUrl}
                    alt="Product preview"
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={handleRemoveFile}
                    disabled={imageUploading}
                  >
                    Remove Image
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Stack>
      </Stack>
    </Card>
  );

  const renderAdditionalInfo = (
    <Card>
      <CardHeader
        title="Additional Information"
        subheader="Optional product details..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Field.Text
            name="rating"
            label="Initial Rating (0-5)"
            type="number"
            inputProps={{ step: '0.1', min: '0', max: '5' }}
            placeholder="0.0"
            fullWidth
            helperText="Optional: Set initial product rating"
          />

          <Field.Text
            name="reviews"
            label="Number of Reviews"
            type="number"
            inputProps={{ min: '0' }}
            placeholder="0"
            fullWidth
            helperText="Optional: Initial review count"
          />
        </Stack>

        <FormControlLabel
          control={
            <Switch
              checked={values.available}
              onChange={(e) => setValue('available', e.target.checked)}
              inputProps={{ id: 'available-switch' }}
            />
          }
          label={
            <Box>
              <Typography variant="body2">Product Available for Sale</Typography>
              <Typography variant="caption" color="text.secondary">
                Toggle to enable/disable product visibility in store
              </Typography>
            </Box>
          }
        />
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack spacing={3} direction="row" alignItems="center" flexWrap="wrap">
      <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        label="Publish"
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting || imageUploading}
        disabled={!canSubmit}
      >
        {imageUploading ? 'Uploading Image...' : 'Create Product'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}

        {renderAdditionalInfo}

        {renderActions}
      </Stack>
    </Form>
  );
}

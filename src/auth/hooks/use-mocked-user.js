import { _mock } from 'src/_mock';

// To get the user from the <AuthContext/>, you can use

// Change:
// import { useMockedUser } from 'src/auth/hooks';
// const { user } = useMockedUser();

// To:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Blooms Nursery',
    email: 'bloomsnursery@gmail.com',
    photoURL: _mock.image.avatar(24),
    phoneNumber: _mock.phoneNumber(1),
    country: _mock.countryNames(1),
    address: 'behind Vanalika Housing Society, Pirangut, Mulshi, Maharashtra 412115',
    state: 'Maharashtra',
    city: 'Pune',
    zipCode: '94116',
    about: 'Blooms Nursery is a leading provider of high-quality plants and gardening supplies. We are dedicated to helping you create your dream garden with our wide selection of plants, tools, and accessories.',
    role: 'admin',
    isPublic: true,
  };

  return { user };
}

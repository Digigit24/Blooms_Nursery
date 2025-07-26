import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname, useSearchParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

export function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { authenticated, loading } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);
  const [hasChecked, setHasChecked] = useState(false);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    console.log('🔍 AuthGuard state change:', { authenticated, loading, hasChecked });

    // If still loading, don't do anything
    if (loading) {
      console.log('⏳ Still loading...');
      return () => {};
    }

    // Add a small delay to ensure auth state has settled
    const timer = setTimeout(() => {
      if (!authenticated) {
        console.log('❌ Not authenticated after settling, redirecting to login');

        const { method } = CONFIG.auth;
        const signInPath = {
          jwt: paths.auth.jwt.signIn,
          auth0: paths.auth.auth0.signIn,
          amplify: paths.auth.amplify.signIn,
          firebase: paths.auth.firebase.signIn,
          supabase: paths.auth.supabase.signIn,
        }[method];

        const href = `${signInPath}?${createQueryString('returnTo', pathname)}`;
        router.replace(href);
      } else {
        console.log('✅ Authenticated, allowing access');
        setIsChecking(false);
        setHasChecked(true);
      }
    }, 100); // Small delay to let state settle

    return () => {
      clearTimeout(timer);
    };
  }, [authenticated, loading, pathname, router, createQueryString, hasChecked]);

  if (loading || isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}

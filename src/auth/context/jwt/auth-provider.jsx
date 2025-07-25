import { useMemo, useEffect, useCallback } from 'react';

import { useSetState } from 'src/hooks/use-set-state';

// import axios, { endpoints } from 'src/utils/axios';

// import { STORAGE_KEY } from './constant';
import { AuthContext } from '../auth-context';
import { setSession, isValidToken } from './utils';

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({
    user: null,
    loading: true,
  });

  // In AuthProvider
  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('adminToken');
      
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const adminData = JSON.parse(localStorage.getItem('adminData'));
        
        if (adminData) {
          setState({
            user: { ...adminData, accessToken },
            loading: false,
          });
          return true; // ← Return success
        } else {
          setState({ user: null, loading: false });
          return false;
        }
      } else {
        setState({ user: null, loading: false });
        return false;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setState({ user: null, loading: false });
      return false;
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user
        ? {
            ...state.user,
            role: state.user?.role ?? 'admin', // default role fallback
          }
        : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

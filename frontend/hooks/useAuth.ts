import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setCredentials, logout } from '@/store/slices/authSlice';
import { User } from '@/types';

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    loginUser: (user: User, token: string) => dispatch(setCredentials({ user, token })),
    logoutUser: () => dispatch(logout()),
  };
}

import { useContext } from 'react';
//import { AuthContext } from 'src/contexts/JWTAuthContext';
import { AuthContext } from '../context/FirebaseAuthContext'

export const useAuth = () => useContext(AuthContext);

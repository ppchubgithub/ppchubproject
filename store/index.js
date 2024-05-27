import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector
  } from 'react-redux';
  import { configureStore } from '@reduxjs/toolkit';
  //import { rootReducer } from './rootReducer';
  import counterReducer from '../reducers/counter';

  import api from '../services/hasuraquerydata';
  import {actionTypes, firebaseReducer} from "react-redux-firebase";
  export const store = configureStore({
    reducer: {
      //rootReducer,
      firebase:firebaseReducer,
      counter: counterReducer,
      [api.reducerPath]: api.reducer
    },
    //devTools: process.env.REACT_APP_ENABLE_REDUX_DEV_TOOLS === 'true',
    devTools: true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
         ignoredActions: [actionTypes.LOGIN, actionTypes.AUTH_LINK_ERROR]
      }
    }).concat(api.middleware)
  });
  
  export const useSelector = useReduxSelector;
  
  export const useDispatch = () => useReduxDispatch();
  
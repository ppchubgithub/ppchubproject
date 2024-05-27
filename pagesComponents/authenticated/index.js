import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from "../../hooks/useAuth";
import { useSnackbar } from 'notistack';
import { Slide } from '@mui/material';
import firebase from 'firebase/compat/app';


export const Authenticated = (props) => {
  const { children } = props;
  const auth = useAuth();
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  //console.log(`auth to check wether user is authenticated $$$$$$$$$$$$$ ${JSON.stringify(firebase.auth().currentUser)}`)

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!auth.isAuthenticated) {
      router.push({
        pathname: '/get-started',
       // query: { backTo: router.asPath }
      });
    } else {
      setVerified(true);

      enqueueSnackbar('You are successfully authenticated!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 5000,
        TransitionComponent: Slide
      });
    }
  }, [router.isReady]);

  if (!verified) {
    return null;
  }

  return <>{children}</>;
};

Authenticated.propTypes = {
  children: PropTypes.node
};

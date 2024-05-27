//import React, { useEffect,useState } from "react";
import React, { useState,  useEffect,forwardRef, Ref } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Card,
  TextField,
  Typography,
  Container,
  Alert,
  Slide,
  Dialog,
  Collapse,
  Button,
  Avatar,
  IconButton,
  styled,
  Divider
} from '@mui/material';
import Head from 'next/head';
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";
import MDBox from "/components/MDBox";
import { useFormik } from 'formik';
import FormHelperText from '@mui/material/FormHelperText';

import BasicLayout from "/pagesComponents/authentication/components/BasicLayout";
import CircularProgress from '@mui/material/CircularProgress';

import { useRefMounted } from '../../hooks/useRefMounted.js';
import CloseIcon from '@mui/icons-material/Close';

import Link from "next/link";
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { getAuth, sendPasswordResetEmail,updatePassword,reauthenticateWithCredential } from "firebase/auth";
import { useAuth } from '../../hooks/useAuth.js';
import bgImage from "/assets/images/bg-sign-up-cover.jpeg";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: "#17845D";
      color: "#17845D";
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};
      box-shadow: "#17845D";
      top: -${theme.spacing(6)};
      position: absolute;
      left: 50%;
      margin-left: -${theme.spacing(6)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

function RecoverPasswordBasic() {
  const { t } = useTranslation();
  const isMountedRef = useRefMounted();
  const router = useRouter();
  const { demo } = router.query;

  const [openAlert, setOpenAlert] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const auth = getAuth();
  const { user } = useAuth();

  const [accountnotexists,setaccountnotexists] = useState(false);
  const [invalidemail,setinvalidemail] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  

  const formik = useFormik({
    initialValues: {
      
      password: ''
     
    },
    validationSchema: Yup.object({
      
      password: Yup.string()
      .min(6)
        .max(255)
        .required(t('The password field is required')),
      
    }),
    onFocus:async()=>{
     
      
    },
    onSubmit: async (values, helpers) => {

      console.log(`logged user in password reset is ${JSON.stringify(user)}`)

     await reauthenticateWithCredential(user, values.password).then(() => {
        // User re-authenticated.
      }).catch((error) => {
        // An error ocurred
        // ...
      });
    
     await updatePassword(user,values.password).then(() => {
        // Update successful.
      }).catch((error) => {
        // An error ocurred
        // ...
      });
      /* try {
        let newPassword = values.password;
      
       await updatePassword(user, newPassword);
       console.log(`user object after pressing sign in is}`);
        
       } 
      catch (err) {
        console.error(`sign in error occured ${JSON.stringify(err)}`);
        
         
      } */
    }
  });

  return (
    <>
      <Head>
        <title>Change Password</title>
      </Head>
      <BasicLayout image={bgImage}>
      
          <Card
            sx={{
              mt: 3,
              p: 4
            }}
          >
            <MDBox>
              <MDTypography
                variant="h4"
                color="text.success"
                sx={{
                  mb: 1
                }}
                
              >
                {t('Change Password')}
              </MDTypography>
              
            </MDBox>
            <form noValidate onSubmit={formik.handleSubmit}>
        
        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label={t('New Password')}
          placeholder={t('Your password here...')}
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
        
          onChange={formik.handleChange}
          type="text"
          value={formik.values.password}
          variant="outlined"
        />
         
        {Boolean(formik.touched.terms && formik.errors.terms) && (
          <FormHelperText error>{formik.errors.terms}</FormHelperText>
        )}
        <Divider/>
        <MDButton

//onClick={settimeline(2)}
size="large"
variant="contained"
color="success"
fullWidth
startIcon={
  formik.isSubmitting ? <CircularProgress size="1rem" /> : null
}
//disabled={formik.isSubmitting}
type="submit"

>

Submit

</MDButton>
      </form>
            <MDBox mt={3} textAlign="right">
            <MDTypography
              component="span"
              variant="subtitle2"
              color="text.primary"
              //fontWeight="bold"
            >
              Want to try to sign in again?
            </MDTypography>{' '}
            <Link
              href="/get-started"
             
            >
               
                    <MDTypography
                      variant="button"
                      color="success"
                      fontWeight="medium"
                      textGradient
                    >
                      Click here
                    </MDTypography>
                  
              
            </Link>
          </MDBox>

          </Card>
          
      </BasicLayout>
    </>
  );
}


export default RecoverPasswordBasic;

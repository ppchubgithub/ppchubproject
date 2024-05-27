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
  styled
} from '@mui/material';
import Head from 'next/head';
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";
import BasicLayout from "/pagesComponents/authentication/components/BasicLayout";

import { useRefMounted } from "../../../hooks/useRefMounted.js"
import CloseIcon from '@mui/icons-material/Close';

import Link from "next/link";
import { useRouter } from 'next/router';

import { useTranslation } from 'react-i18next';

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useAuth } from '../../../hooks/useAuth.js';
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
  const [accountnotexists,setaccountnotexists] = useState(false);
  const [invalidemail,setinvalidemail] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Head>
        <title>Recover Password</title>
      </Head>
      <BasicLayout image={bgImage}>
      
          <Card
            sx={{
              mt: 3,
              p: 4
            }}
          >
            <Box>
              <Typography
                variant="h2"
                color="text.success"
                sx={{
                  mb: 1
                }}
                
              >
                {t('Recover Password')}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                fontWeight="normal"
                sx={{
                  mb: 3
                }}
              >
                {t(
                  'Enter the email used for registration to reset your password.'
                )}
              </Typography>
            </Box>

            <Formik
              initialValues={{
                email: '',
                submit: null
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email(
                    t('The email provided should be a valid email address')
                  )
                  .max(255)
                  .required(t('The email field is required'))
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  setinvalidemail(false);
                  setaccountnotexists(false);
                  await sendPasswordResetEmail(auth,values.email);
                  if (isMountedRef()) {
                    setStatus({ success: true });
                    setSubmitting(false);
                  }
                } catch (err) {
                  console.error(`sign up error occured ${JSON.stringify(err)}`);
                  if(err.code === "auth/user-not-found"){
                    setaccountnotexists(true);
                  }
            if(err.code === "auth/invalid-email"){
              setinvalidemail(true);
            }
                  if (isMountedRef()) {
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                  }
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label={t('Email address')}
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                {accountnotexists?<div style={{color:"#f44336",fontWeight:600}}>No Account is registered with this Email</div>:null}
                {invalidemail?<div style={{color:"#f44336",fontWeight:600}}>Email is not valid</div>:null}
                  <MDButton
                    sx={{
                      mt: 3
                    }}
                    color="success"
                    disabled={Boolean(touched.email && errors.email)}
                    onClick={handleOpenDialog}
                    type="submit"
                    fullWidth
                    size="small"
                    variant="contained"
                  >
                    {t('Send me a new password')}
                  </MDButton>
                </form>
              )}
            </Formik>
            <Box mt={3} textAlign="right">
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
          </Box>

          </Card>
          
      <DialogWrapper
        open={openDialog}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
        <Box
          sx={{
            px: 4,
            pb: 4,
            pt: 10
          }}
        >
          <AvatarSuccess>
            <CheckTwoToneIcon />
          </AvatarSuccess>

          <Collapse in={openAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="info"
            >
              {t(
                'The password reset instructions have been sent to your email'
              )}
            </Alert>
          </Collapse>

          <Typography
            align="center"
            sx={{
              py: 4,
              px: 10
            }}
            variant="h3"
          >
            {t('Check your email for further instructions')}
          </Typography>
{/* 
          <Button
            fullWidth
            component={Link}
            size="large"
            variant="contained"
            onClick={handleCloseDialog}
            href="/get-started"
          >
            {t('Continue to login')}
          </Button> */}
          <Link href="/get-started">
                
                    <MDTypography
                      variant="button"
                      color="success"
                      fontWeight="medium"
                      textGradient
                    >
                      Continue to login
                    </MDTypography>
                  
                </Link>
        </Box>
      </DialogWrapper>
      </BasicLayout>
    </>
  );
}


export default RecoverPasswordBasic;

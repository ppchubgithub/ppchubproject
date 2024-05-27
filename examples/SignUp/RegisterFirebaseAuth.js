import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import React, { useEffect,useState,forwardRef } from "react";
import Link from "next/link";

import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Box,
  Typography,
  CircularProgress,
  styled,
  Alert,
  Slide,
  Dialog,
  Collapse,
  Avatar,
  IconButton
} from '@mui/material';
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import { useAuth } from '../../hooks/useAuth.js'
import { useRefMounted } from '../../hooks/useRefMounted';
import { useTranslation } from 'react-i18next';
//import ReCAPTCHA from "react-google-recaptcha-enterprise";
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import CloseIcon from '@mui/icons-material/Close';
const { initializeAppCheck, getToken,ReCaptchaEnterpriseProvider } = require('firebase/app-check');
import { useSnackbar } from 'notistack';
import logoGoogle from "../../assets/images/logo/google.svg";
import Image from "next/image";
import firebase,{app} from '../../utils/firebase';
import {useSetUserRegistrationMutation} from '../../services/hasuraquerydata';
//import firebase from 'firebase/compat/app';


const ImgWrapper = styled('img')(
  ({ theme }) => `
    margin-right: ${theme.spacing(1)};
`
);
const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

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

export const RegisterFirebaseAuth = (props) => {
  const { createUserWithEmailAndPassword, signInWithGoogle ,user} = useAuth();
  const isMountedRef = useRefMounted();
  const { t } = useTranslation();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [accountinuse,setaccountinuse] = useState(false);
  const [weakpassword,setweakpassword] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const [showrecaptcha,setshowrecaptcha] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [operationnotallowed,setoperationnotallowed] = useState(false);
  const [invalidemail,setinvalidemail] = useState(false);
 // const auth = firebase.auth();

// console.log(`auth in signup is ****************************${JSON.stringify(user)}`)
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const [userregistration,{ data:userregresult,error,isSuccess, isFetching, isLoading }] = useSetUserRegistrationMutation()
  //console.log(`user registration result${JSON.stringify(userregresult)}`);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    //const backTo = router.query.backTo || '/auth/login/cover';
    router.push({
      pathname: '/get-started',
      query: { signup: true },
  });
  };
  const recaptchaRef = React.createRef();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
     
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('The email provided should be a valid email address'))
        .max(255)
        .required(t('The email field is required')),
      password: Yup.string()
        .min(8)
        .max(255)
        .required(t('The password field is required'))
      
    }),
    onSubmit: async (values, helpers) => {
      try {
       
        setaccountinuse(false);
        setinvalidemail(false);
        setoperationnotallowed(false);
        setweakpassword(false)
        await createUserWithEmailAndPassword(values.email, values.password);
        router.push({
          pathname: '/account-setup',
          query: { signup: true },
      });
        if (isMountedRef()) {
          //handleOpenDialog();
          setOpenDialog(true)
         
        }
       
      } catch (err) {
        console.error(`sign up error occured ${JSON.stringify(err)}`);
            if(err.code === "auth/email-already-in-use"){
              setaccountinuse(true);
            }
            if(err.code === "auth/weak-password"){
              setweakpassword(true);
            }
            if(err.code === "auth/operation-not-allowed"){
              setoperationnotallowed(true);
            }
            if(err.code === " auth/invalid-email"){
              setinvalidemail(true);
            }

        if (isMountedRef()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });
  function onChange(value) {
    console.log("Captcha value:", value);
  }

/*   const app = firebase.initializeApp(firebaseConfig);
 const  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(),
    isTokenAutoRefreshEnabled: true 
  }); */

/*   const appCheck = initializeAppCheck(
    app,
    { provider: new ReCaptchaEnterpriseProvider('6LcnLmgiAAAAAPqClyNWiHlDJ--mxuCK-ydVT4Vj') } // ReCaptchaV3Provider or CustomProvider
); 
 */
  const handleGoogleClick = async () => {
    try {
      await signInWithGoogle();
      setshowrecaptcha(true);

     // const recaptchaValue = recaptchaRef.current.getValue();
     // console.log(`recaptchaValue is ${JSON.stringify(recaptchaValue)}`);
      enqueueSnackbar('You are successfully Registered!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        autoHideDuration: 6000,
        TransitionComponent: Slide
      });
      let accesstoken = await firebase.auth().currentUser.getIdToken()
          
      console.log(`access token for userreg is ${accesstoken}`);
   
      console.log(`got accesstoken google signing in now`)
      userregistration({
        accesstoken:accesstoken
        
      });
      const backTo = router.query.backTo || '/get-started';
      router.push(backTo);

    } catch (err) {
      console.error(err);
      console.log(`recaptcha error response ${err.message}`)
    }
  };

  return (
    <Box {...props}>
      {/* <MDButton
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        variant="outlined"
        color="success"
      >
         <ImgWrapper alt="Google" src="/assets/images/logo/google.svg" />  
        <Image alt="Google" src={logoGoogle} /> 
        <b style={{marginLeft:10}}>Register with Google</b>
         
      </MDButton>
    
       <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LfTImsiAAAAAMYi2hgiYtMDj7grZKBqZ3h5UNre"
        onChange={onChange}
      /> 
      <Divider
        sx={{
          mt: 4,
          mb: 2
        }}
      >
        {t('or')}
      </Divider> */}
      <form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label={t('Email address')}
          placeholder={t('Your email address here...')}
          margin="normal"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
          variant="outlined"
        />
        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label={t('Password')}
          placeholder={t('Your password here...')}
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
          variant="outlined"
        />
            {accountinuse?<div style={{color:"#f44336",fontSize:14,fontWeight:400}}>Account Already Exists</div>:null}
         {weakpassword?<div style={{color:"#f44336",fontSize:14,fontWeight:400}}>Password is weak try another</div>:null}
         {operationnotallowed?<div style={{color:"#f44336",fontSize:14,fontWeight:400}}>Operation Not Allowed</div>:null}
         {invalidemail?<div style={{color:"#f44336",fontSize:14,fontWeight:400}}>Email is not valid</div>:null}
         {/* {openDialog?
         <div>
          <div style={{color:"#f44336",fontSize:14,fontWeight:400}}>Email verification sent to your mail, verify before login</div>
          <MDButton style={{marginTop:10,marginBottom:10}} onClick={()=>{
            router.push({
              pathname: '/account-setup',
              query: { signup: true },
          });
          }}
          variant="outlined"
          color="success"
          >
          Go to Login
          </MDButton>
          </div>:null} */}
{/*          <DialogWrapper
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
                'Your mail verification instructions have been sent to your email'
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

          <MDButton
            fullWidth
            //component={Link}
            size="large"
            color="success"
            variant="contained"
            onClick={handleCloseDialog}
            //href='/auth/login/cover'
          >
            {t('Continue to login')}
          </MDButton>
        </Box>
      </DialogWrapper>
 */}
      <MDBox
          alignItems="center"
          display={{ xs: 'block', md: 'flex' }}
          justifyContent="space-between"
        >
          <MDBox display={{ xs: 'block', md: 'flex' }}>
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.terms}
                  name="terms"
                  color="primary"
                  onChange={formik.handleChange}
                />
              }
              label={
                <>
                  <MDTypography variant="body2">
                    I accept the {' '}
                    <Link href="#">
                    
                    <MDTypography
                      variant="button"
                      color="success"
                     fontWeight="medium"
                      textGradient
                    >
                      terms and conditions
                    </MDTypography>
                  
                        </Link>.
                  </MDTypography>
                </>
              }
            /> */}
            <MDTypography variant="body2">
            I&apos;ve read and accept ServerTag&apos;s {' '}
                    <Link href="#">
                    
                    <MDTypography
                      variant="button"
                      color="success"
                     fontWeight="medium"
                      textGradient
                    >
                      Terms of Use
                    </MDTypography>&nbsp;
                  
                        </Link>
                        and {' '}
                        <Link href="#">
                    
                    <MDTypography
                      variant="button"
                      color="success"
                     fontWeight="medium"
                      textGradient
                    >
                      Privacy Policy.
                    </MDTypography>
                  
                        </Link>
                        
                  </MDTypography>
          </MDBox>
          
        </MDBox>
       
        <MDButton
          sx={{
            mt: 3
          }}
          color="success"
          startIcon={
            formik.isSubmitting ? <CircularProgress size="1rem" /> : null
          }
          disabled={formik.isSubmitting}
          size="large"
          fullWidth
          type="submit"
          variant="contained"
        >
          {t('Create account')}
        </MDButton>
        <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <Link href="/get-started">
                  
                    <MDTypography
                      variant="button"
                      color="success"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign In
                    </MDTypography>
                  
                </Link>
              </MDTypography>
            </MDBox>
      </form>
    </Box>
  );
};

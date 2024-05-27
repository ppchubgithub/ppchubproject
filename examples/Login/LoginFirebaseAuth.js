import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import React, { useEffect,useState } from "react";
import Link from "next/link";

import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';

import Slide from '@mui/material/Slide';
import GoogleIcon from "@mui/icons-material/Google";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import { useSnackbar } from 'notistack';
import { useAuth } from '../../hooks/useAuth.js'
import { useRefMounted } from '../../hooks/useRefMounted';
import { useTranslation } from 'react-i18next';
import {useSetUserRegistrationMutation} from '../../services/hasuraquerydata';
import firebase from '../../utils/firebase';
import Image from "next/image";
import { getAuth ,getMultiFactorResolver,multiFactor,TotpSecret,
  TotpMultiFactorGenerator} from "firebase/auth";
  import logoGoogle from "../../assets/images/logo/google.svg";

const ImgWrapper = styled('img')(
  ({ theme }) => `
    margin-right: ${theme.spacing(1)};
`
);


export const LoginFirebaseAuth = (props) => {
  const { t } = useTranslation();
  const { signInWithEmailAndPassword, signInWithGoogle } = useAuth();
  const isMountedRef = useRefMounted();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [accountnotexists,setaccountnotexists] = useState(false);
  const [incorrectpassword,setincorrectpassword] = useState(false);
  const [invalidcredentials,setinvalidcredentials] = useState(false);
  
  const [userdisabled,setuserdisabled] = useState(false);
  const [invalidemail,setinvalidemail] = useState(false);
  const [emailnotverified,setemailnotverified] = useState(false);
  const [totpauth,settotpauth] = useState(false);
  const [userobj,setuserobj]=useState();

  
  const {signup} = router.query;
  //console.log(`query params to signin are ${signup}`);

  const [userregistration,{ data:userregresult,error,isSuccess, isFetching, isLoading }] = useSetUserRegistrationMutation()
  //console.log(`user registration result${JSON.stringify(userregresult)}`);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      terms: true,
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('The email provided should be a valid email address'))
        .max(255)
        .required(t('The email field is required')),
      password: Yup.string()
        .max(255)
        .required(t('The password field is required')),
      terms: Yup.boolean().oneOf(
        [true],
        t('You must agree to our terms and conditions')
      )
    }),
    onFocus:async()=>{
     
        setaccountnotexists(false);
        setincorrectpassword(false);
      
    },
    onSubmit: async (values, helpers) => {
      try {
        setaccountnotexists(false);
        setincorrectpassword(false);
        setemailnotverified(false);
        setinvalidemail(false);
        setuserdisabled(false);
        settotpauth(false);
        let user = await signInWithEmailAndPassword(values.email, values.password);
        console.log(`user object after pressing sign in is}`);
        
        setuserobj(user);
        await firebase.auth().currentUser.reload();
        if (isMountedRef()) {
          if(user.user.emailVerified===true){
      
              console.log(`from signup`)
            let accesstoken = await firebase.auth().currentUser.getIdToken()
          
              console.log(`access token for userreg is ${accesstoken}`);
           
              console.log(`got accesstoken calling user registration now`)
              userregistration({accesstoken});
      
          //const backTo = router.query.backTo || '/workspaces/workspacehome';
          const backTo = router.query.backTo || '/workspaces';
          
          router.push(backTo);
          console.log(`sign in clicked moving to ${backTo}`)
          }
          else{
            console.log(`email not verified`);
            setemailnotverified(true);
            await logout();
     
            router.push({
              pathname: '/get-started',
              query: { backTo: router.asPath }
           
          })
        }
        
      }} 
      catch (err) {
        console.error(`sign in error occured ${JSON.stringify(err)}`);
        
            if(err.code === "auth/invalid-credential"){
              setinvalidcredentials(true);
            }
            if(err.code === "auth/user-not-found"){
              setaccountnotexists(true);
            }
            if(err.code === "auth/wrong-password"){
              setincorrectpassword(true);
            }
            if(err.code === "auth/user-disabled"){
              setuserdisabled(true);
            }
            if(err.code === " auth/invalid-email"){
              setinvalidemail(true);
            }
            if(err.code === "auth/multi-factor-auth-required"){
              settotpauth(true);
              const mfaResolver = getMultiFactorResolver(getAuth(), error);
              const enrolledFactors = mfaResolver.hints.map(info => info.displayName);
              switch (mfaResolver.hints[selectedIndex].factorId) {
                case TotpMultiFactorGenerator.FACTOR_ID:
                    const otpFromAuthenticator = "1234";
                    const multiFactorAssertion =
                        TotpMultiFactorGenerator.assertionForSignIn(
                            mfaResolver.hints[selectedIndex].uid,
                            otpFromAuthenticator
                        );
                    try {
                         user = await mfaResolver.resolveSignIn(
                            multiFactorAssertion
                        );
                        // Successfully signed in!
                    } catch (error) {
                        // Invalid or expired OTP.
                    }
                    break;
                
                default:
                    // Unsupported second factor?
                    break;
            }
            }
            
           
            
        if (isMountedRef()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
        else{
          setaccountnotexists(true)
        }
      }
    }
  });


  const handleGoogleClick = async () => {
    //console.log(`google login`)
    try {
    await signInWithGoogle();
    
    let accesstoken = await firebase.auth().currentUser.getIdToken()
          
    console.log(` after google signin access token is ${accesstoken}`);
      
        //const backTo = router.query.backTo || '/workspaces/workspacehome';
        const backTo = router.query.backTo || '/workspaces';
        router.push(backTo);
      
    } catch (err) {
      if(err.code === "auth/multi-factor-auth-required"){
        console.log(`multifactor authentication startef`)
        const mfaResolver = getMultiFactorResolver(getAuth(), error);
        const enrolledFactors = mfaResolver.hints.map(info => info.displayName);
        switch (mfaResolver.hints[selectedIndex].factorId) {
          case TotpMultiFactorGenerator.FACTOR_ID:
              const otpFromAuthenticator = "1234";
              const multiFactorAssertion =
                  TotpMultiFactorGenerator.assertionForSignIn(
                      mfaResolver.hints[selectedIndex].uid,
                      otpFromAuthenticator
                  );
              try {
                  let usercredentials = await mfaResolver.resolveSignIn(
                      multiFactorAssertion
                  );
                  console.log(`totp user credentials are ${JSON.stringify(usercredentials)}`)
                  // Successfully signed in!
              } catch (error) {
                  // Invalid or expired OTP.
              }
              break;
          
          default:
              // Unsupported second factor?
              break;
      }
      }
      console.error(err);
    }
  };

 
  return (
    <MDBox {...props}>
      {/* <MDButton
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        variant="outlined"
        color="success"
      >
        
         <Image alt="Google" src={logoGoogle} /> 
        <b style={{marginLeft:10}}>Sign in with Google</b>
      </MDButton>
      <Divider
        sx={{
          mt: 4,
          mb: 2
        }}
        //style={{marginBottom:30}}
      >
        (or)
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
         {accountnotexists?<div style={{color:"#f44336",fontSize:14,fontWeight:400}}>Specified  email is not registered</div>:null}
         {incorrectpassword?<div style={{color:"#f44336",fontSize:14,fontWeight:400}}>Password is incorrect</div>:null}
         {invalidcredentials?<div style={{color:"#f44336",fontSize:14,fontWeight:400}}>Invalid Credentials</div>:null}
         
         {userdisabled?<div style={{color:"#f44336",fontSize:14,fontWeight:400}}>Sorry Account Disabled</div>:null}
         {invalidemail?<div style={{color:"#f44336",fontSize:14,fontWeight:400}}>Email is not valid</div>:null}
         {emailnotverified?
         <div>
          <div style={{color:"#f44336",fontSize:14,fontWeight:400}}>Email not verified, Please check your mail and verify</div>
          <MDButton style={{marginTop:10,marginBottom:10}} onClick={()=>{
            if(userobj.user){
               console.log(`user is not verified`)
            
                userobj.user.sendEmailVerification()
                console.log("email verification sent to user");
                enqueueSnackbar('Email verification set to you', {
                  variant: 'success',
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right'
                  },
                  autoHideDuration: 6000,
                  TransitionComponent: Slide
                });
                setemailnotverified(false);
              }
          }}
          variant="outlined"
          color="success"
          >
          Click to Resend Email'
          </MDButton>
          </div>:null}
         
         
        <MDBox
          alignItems="center"
          display={{ xs: 'block', md: 'flex' }}
          justifyContent="space-between">
            
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
            <Link href="/forgot-password">
                  
                  <MDTypography
                    variant="button"
                    color="success"
                   fontWeight="medium"
                    textGradient
                  >
                    Lost password?
                  </MDTypography>
                
              </Link>
        
          </MDBox>
          
        </MDBox>
        {Boolean(formik.touched.terms && formik.errors.terms) && (
          <FormHelperText error>{formik.errors.terms}</FormHelperText>
        )}
        <MDButton
          sx={{
            mt: 3
          }}
          
          startIcon={
            formik.isSubmitting ? <CircularProgress size="1rem" /> : null
          }
          disabled={formik.isSubmitting}
          size="large"
          fullWidth
          type="submit"
          variant="contained"
          color="success"
        >
          Sign in
        </MDButton>
      </form>
    </MDBox>
  );
};

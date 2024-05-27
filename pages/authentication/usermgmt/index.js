import React,{ useMemo, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from '../../../config';
import {auth} from '../../../utils/firebase';
import { checkActionCode, applyActionCode, sendPasswordResetEmail } from "firebase/auth";
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";
import MDAlert from "/components/MDAlert";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import BasicLayout from "/pagesComponents/authentication/components/BasicLayout";
import bgImage from "/assets/images/bg-sign-up-cover.jpeg";


export default function Usermgmt(){
const router = useRouter();
/*   // Get the action to complete.
  const mode = getParameterByName('mode');
  // Get the one-time code from the query parameter.
  const actionCode = getParameterByName('oobCode');
  // (Optional) Get the continue URL from the query parameter if available.
  const continueUrl = getParameterByName('continueUrl');
  // (Optional) Get the language code if available.
  const lang = getParameterByName('lang') || 'en';
 */
  const mode = router.query.mode;
  const actionCode = router.query.oobCode;
  const continueUrl = router.query.continueUrl;
  const lang = router.query.lang;
  const [verified,setverified] = useState(false)
  //console.log(`auth is ${JSON.stringify(auth)}`)
  console.log(`all the route params are ${mode} ${actionCode}`)
  //const app = initializeApp(firebaseConfig);
  //const auth = getAuth(app);
 // const auth = firebase.auth();
 const [invalid,setinvalid]=useState(false);
  async function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    // Try to apply the email verification code.
    console.log(`handling verification email ${JSON.stringify(auth)} actionCode ${actionCode}`)
    await applyActionCode(auth, actionCode).then((resp) => {
      console.log(`entered to try block for apply action code`)
      setverified(true);
      console.log(`response fron handle email verification is ***************************************************************** ${JSON.stringify(resp)}`)
      // Email address has been verified.
  
      // TODO: Display a confirmation message to the user.
      // You could also provide the user with a link back to the app.
  
      // TODO: If a continue URL is available, display a button which on
      // click redirects the user back to the app via continueUrl with
      // additional state determined from that URL's parameters.
    }).catch((error) => {
      console.log(`error fron handle email verification is ${JSON.stringify(error)}`)
      switch(error.code){
        case "auth/invalid-action-code":
          console.log(`verification code is invalid`)
          setinvalid(true)
          break;
        default:
      }

      // Code is invalid or expired. Ask the user to verify their email address
      // again.
    });
    /* try{
      console.log(`entered to try block for apply action code`)
      const resp = await applyActionCode(auth, actionCode)
      console.log(`response fron handle email verification is ${JSON.stringify(resp)}`)
    }
    catch(error){
      console.log(`error fron handle email verification is ${JSON.stringify(error)}`)
    } */
    }
    useEffect(()=>{
  switch (mode) {
    case 'resetPassword':
      // Display reset password handler and UI.
      handleResetPassword(auth, actionCode, continueUrl, lang);
      break;
    case 'recoverEmail':
      // Display email recovery handler and UI.
      handleRecoverEmail(auth, actionCode, lang);
      break;
    case 'verifyEmail':
      // Display email verification handler and UI.
     handleVerifyEmail(auth, actionCode, continueUrl, lang);
     
      break;
    default:
      // Error: invalid mode.
  }
 
},[])
return(
  <BasicLayout>
    <>
    {verified?
    <MDBox mb={3}>
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} lg={8}>
        <Card>

        <MDBox p={2} mt={5} display="flex" justifyContent="center">
          <CheckCircleIcon
              sx={{
                color: `#17845D`
              }}
              fontSize="large"
            />
            
          </MDBox>
        
          <MDBox p={2}  justifyContent="center">
          
            <MDTypography variant="h5" style={{textAlign:'center'}}>Email Verified Successfully</MDTypography>
          </MDBox>
          <MDBox pt={2} px={2} mb={8} display="flex" justifyContent="center" >
                  <MDButton color="success" size="large" variant="gradient" onClick={()=>router.push('/account-setup')} style={{marginBottm:20}}>
                   click here to  Continue
                  </MDButton>
            </MDBox>
            </Card>
            </Grid>
            </Grid>
            </MDBox>
  
    
    : <MDBox mb={3}>
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} lg={8}>
      <Card>

<MDBox p={2} mt={5} display="flex" justifyContent="center">
  <DangerousIcon
      sx={{
        color: `#fb8c00`
      }}
      fontSize="large"
    />
    
  </MDBox>

  <MDBox p={2}  justifyContent="center">
  {invalid?<MDTypography variant="h5" style={{textAlign:'center'}}>Invalid Verification</MDTypography>:
    <MDTypography variant="h5" style={{textAlign:'center'}}>Verification Not Successfull</MDTypography>}
  </MDBox>
  <MDBox pt={2} px={2} mb={8} display="flex" justifyContent="center" >
          <MDButton color="warning" size="large" variant="gradient" onClick={()=>router.push('/get-started')} style={{marginBottm:20}}>
            Go to login page and try again
          </MDButton>
    </MDBox>
    </Card>
            </Grid>
            </Grid>
            </MDBox>
  
   }
    
    </>
    </BasicLayout>
)
}
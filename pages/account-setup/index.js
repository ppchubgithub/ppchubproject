/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import React,{ useMemo, useEffect, useState,forwardRef,Fragment } from "react";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import { useRouter } from 'next/router';
import MDSnackbar from "/components/MDSnackbar";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
//import styled from "styled-components";
import {
  CircularProgress,
  Button,
  styled,
  Slide,
  Dialog,
  IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth,onAuthStateChanged } from "firebase/auth";

import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

//import firebase,{app,auth} from '../../../utils/firebase';
import firebase from 'firebase/compat/app';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MDAlert from "/components/MDAlert";
import { useSnackbar } from 'notistack';

import Switch from "@mui/material/Switch";
import MDButton from "/components/MDButton";
import {useSetUserGuestRegistrationMutation,useSetUserRegistrationMutation,useGetGuestUsersQuery} from '../../services/hasuraquerydata';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import countryList from 'react-select-country-list'


export const selecttheme = createTheme({
  components: {
      // Name of the component
      MuiSelect: {
          defaultProps: {
              IconComponent: KeyboardArrowDownIcon,
              //there are tons of props that you can override
          },
          styleOverrides: {
              root: {
                  '.MuiSvgIcon-root': {
                      // color: 'your color',
                  }
              },
          },
      },
  },
});

function Guestuser() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const signup = router.query.signup;
  const auth = firebase.auth();

  const [userstate,setuserstate] = useState(auth);
  //const [idtoken,setidtoken] = useState();
  const options = useMemo(() => countryList().getData(), [])
console.log(`countries data list ${JSON.stringify(options)}`)
   useEffect(()=>{
    if(!firebase.auth().currentUser){
      console.log(`NO USER EXIXTS..............................`)
      router.push('/get-started');
    }
  
  
  },[]) 

 
  console.log(`firebase auth is ${JSON.stringify(userstate)}`)
  const {data:guestusersdata,isLoading:guestusersdataloading,isSuccess:guestusersdatasuccess}= useGetGuestUsersQuery({},{
    
    //skip:isEmpty(user),
    refetchOnMountOrArgChange: true,
    skip: false,
   });
  const [userregistration,{ data:userregresult,error,isSuccess, isFetching, isLoading }] = useSetUserRegistrationMutation()
  const [setuserguestprofile,{ data:setuserprofiledata, isLoading:setuserprofiledataloading }] = useSetUserGuestRegistrationMutation();
 const [resentemail,setresentemail]=useState(false)
  const [successContainer, setSuccessContainer] = useState(false);
  const openSuccessContainer = () => setSuccessContainer(true);
  const closeSuccessContainer = () => setSuccessContainer(false);

  const [selectedaccount,setselectedaccount] = useState('');
  
  const userformik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname:guestusersdata && guestusersdata.unverifiedusers.length>0 ? guestusersdata.unverifiedusers[0].firstname:'',
      lastname:guestusersdata && guestusersdata.unverifiedusers.length>0 ? guestusersdata.unverifiedusers[0].lastname:'',
      mobno:guestusersdata && guestusersdata.unverifiedusers.length>0 ? guestusersdata.unverifiedusers[0].mobno:'',
      location:guestusersdata && guestusersdata.unverifiedusers.length>0 ? guestusersdata.unverifiedusers[0].location:'',
      accounttype:guestusersdata && guestusersdata.unverifiedusers.length>0 ? guestusersdata.unverifiedusers[0].accounttype:'',
      agencyname:guestusersdata && guestusersdata.unverifiedusers.length>0 ? guestusersdata.unverifiedusers[0].accountname:'',
      workspacename:guestusersdata && guestusersdata.unverifiedusers.length>0 ? guestusersdata.unverifiedusers[0].workspacename:''
      
     
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        
        .max(255)
        .required('First name field is required'),
        lastname: Yup.string()
        
        .max(255)
        .required('Last name field is required'),


        mobno:Yup.string()
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ , 'Phone number is not valid'),
         
        accounttype: Yup.string()
         
        .required('Account Type field is required'),
        agencyname: Yup.string()
        .min(5)
        .max(30),
        
        workspacename: Yup.string()
        .min(5)
        .max(30)
        .required('Workspace name field is required'), 
        
     
    }),
    onSubmit: async (values, helpers) => {

      console.log(`form values are ${JSON.stringify(values)}`)
     await firebase.auth().currentUser.reload();
     

     let idtoken = await firebase.auth().currentUser.getIdToken( true)
     if(!firebase.auth().currentUser){
      console.log(`moving to signin page`)
        router.push('/get-started');
     }
else{
      if(firebase.auth().currentUser.emailVerified){
        userregistration({
          accesstoken:idtoken,
          firstname:values.firstname,
          lastname:values.lastname,
          location:values.location,
          mobno:values.mobno,
          
          accounttype:values.accounttype,
          accountname:selectedaccount==="agency"?values.agencyname:values.businessname,
          workspacename:values.workspacename
        });
        router.push('/workspaces')
      }
      else{

      
      setuserguestprofile({
        firstname:values.firstname,
        lastname:values.lastname,
        location:values.location,
        mobno:values.mobno,
        email:auth.currentUser.email,
        firebaseid:auth.currentUser.uid,
        accounttype:values.accounttype,
        accountname:selectedaccount==="agency"?values.agencyname:values.businessname,
        workspacename:values.workspacename
      })
      //openSuccessContainer()
      setresentemail(true)
    }
  }
      /* if(setcreatecontainerdata.data.createcontainer.status){
        
      } */

    }
  });
  return (

<MDBox mt={10} mb={3}>
    <Grid container>
    <Grid item lg={4}>
        </Grid>
        <Grid item lg={4}>
        {signup && auth.currentUser && !auth.currentUser.emailVerified? <MDAlert color="dark" dismissible>
   <MDTypography variant="body2" color="white">
     A verification email has been sent to your mail, please verify now
      
    </MDTypography>
 </MDAlert>:null}
 <MDSnackbar
      color="success"
      icon="check"
      title="Verification Email sent, please verify"
      //content="Container Created Successfully"
     // dateTime="11 mins ago"
      open={successContainer}
      onClose={closeSuccessContainer}
      close={closeSuccessContainer}
      bgSuccess
    />
        </Grid>
    </Grid>

    <Grid container spacing={3} justifyContent="center">
   
   
      <Grid item xs={12} lg={4}>
      <Card style={{marginTop:40,marginBottom:30}}>

<MDBox pt={1} px={1} display="flex" justifyContent="center" alignItems="center" style={{marginTop:10}}>
                          
                  
                          <MDTypography variant="h5" fontWeight="medium" style={{marginBottom:10}}>
                          Help us understand you better
                          </MDTypography>
                          
                          </MDBox>
                          
<MDBox pt={1} pb={3} px={2}>
          
          <MDBox mt={3}>
            <Grid container spacing={3}>
              <Grid item lg={1}>

              </Grid>
            <Grid lg={10}>
        <MDBox mt={3}>
        <form noValidate onSubmit={userformik.handleSubmit}>
       
                              <TextField

              fullWidth
              style={{marginTop:-5,marginBottom:20}}
              label={"First Name"}
              //placeholder={t('Your email address here...')}
              {...userformik.getFieldProps('firstname')}
              helperText={userformik.errors.firstname && userformik.touched.firstname && `${userformik.errors.firstname}`}
              error={userformik.touched.firstname && userformik.errors.firstname}

              margin="normal"
              name="firstname"
              onBlur={userformik.handleBlur}
              onChange={userformik.handleChange}
              type="text"
              value={userformik.values.firstname}
              variant="outlined"
              />
          
          <TextField
  style={{marginTop:-5,marginBottom:20}}
  fullWidth

  label={'Last Name'}
  //placeholder={t('Your email address here...')}
  {...userformik.getFieldProps('lastname')}
  helperText={userformik.errors.lastname && userformik.touched.lastname && `${userformik.errors.lastname}`}
  error={userformik.touched.lastname && userformik.errors.lastname}


  margin="normal"
  name="lastname"
  onBlur={userformik.handleBlur}
  onChange={userformik.handleChange}
  type="text"
  value={userformik.values.lastname}
  variant="outlined"
  />
                  <TextField
  style={{marginTop:-5,marginBottom:20}}
  fullWidth

  label={'Phone Number (optional)'}
  //placeholder={t('Your email address here...')}
  {...userformik.getFieldProps('mobno')}
  helperText={userformik.errors.mobno && userformik.touched.mobno && `${userformik.errors.mobno}`}
  error={userformik.touched.mobno && userformik.errors.mobno}
  margin="normal"
  name="mobno"
  onBlur={userformik.handleBlur}
  onChange={userformik.handleChange}
  type="text"
  value={userformik.values.mobno}
  variant="outlined"
  />
    
<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Country</InputLabel>
<ThemeProvider theme={selecttheme}>
<Select
labelId="demo-simple-select-label"
id="demo-simple-select"


label="Country"
{...userformik.getFieldProps('location')}
  helperText={userformik.errors.location && userformik.touched.location && `${userformik.errors.location}`}
  error={userformik.touched.location && userformik.errors.location}
style={{height:45,marginBottom:20}}
value={userformik.values.location}
onChange={userformik.handleChange}
name="location"
onBlur={userformik.handleBlur}

>
  {options.map(country=>{
    return(

<MenuItem  value={country.label} key={country.value}>
{country.label}
</MenuItem>
    )
  })}

</Select>
</ThemeProvider>
</FormControl>


          
  
  
                           
<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Account Type</InputLabel>
<ThemeProvider theme={selecttheme}>
<Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Account Type"}
                fullWidth

        {...userformik.getFieldProps('accounttype')}
        helperText={userformik.errors.accounttype && userformik.touched.accounttype && `${userformik.errors.accounttype}`}
        error={userformik.touched.accounttype && userformik.errors.accounttype}
//label={"Account Type"}
        name="accounttype"
        style={{height:45,marginBottom:20}}
        value={userformik.values.accounttype}
        onChange={(e)=>{
          userformik.setFieldValue(e.target.name, e.target.value);
          setselectedaccount(e.target.value)
        }}
        
        onBlur={userformik.handleBlur}


        >

        <MenuItem  value={"business"}>
        Business
        </MenuItem>

        <MenuItem  value={"agency"}>
        Agency
        </MenuItem>

        </Select>
</ThemeProvider>
</FormControl>
 
{selectedaccount==="agency"?
                                  <TextField

                  fullWidth
                  style={{marginTop:-5,marginBottom:20}}
                  label={'Agency Name'}
                  //placeholder={t('Your email address here...')}

                  {...userformik.getFieldProps('agencyname')}
                  helperText={userformik.errors.agencyname && userformik.touched.agencyname && `${userformik.errors.agencyname}`}
                  error={userformik.touched.agencyname && userformik.errors.agencyname}

                  margin="normal"
                  name="agencyname"
                  onBlur={userformik.handleBlur}
                  onChange={userformik.handleChange}
                  type="text"
                  value={userformik.values.agencyname}
                  variant="outlined"
                  />:
                  <TextField

                  fullWidth
                  style={{marginTop:-5,marginBottom:20}}
                  label={'Business Name'}
                  //placeholder={t('Your email address here...')}

                  {...userformik.getFieldProps('businessname')}
                  helperText={userformik.errors.businessname && userformik.touched.businessname && `${userformik.errors.businessname}`}
                  error={userformik.touched.businessname && userformik.errors.businessname}

                  margin="normal"
                  name="businessname"
                  onBlur={userformik.handleBlur}
                  onChange={userformik.handleChange}
                  type="text"
                  value={userformik.values.businessname}
                  variant="outlined"
                  />}
  
<TextField

fullWidth
style={{marginTop:-5,marginBottom:20}}
label={'Workspace Name'}
//placeholder={t('Your email address here...')}

{...userformik.getFieldProps('workspacename')}
helperText={userformik.errors.workspacename && userformik.touched.workspacename && `${userformik.errors.workspacename}`}
error={userformik.touched.workspacename && userformik.errors.workspacename}

margin="normal"
name="workspacename"
onBlur={userformik.handleBlur}
onChange={userformik.handleChange}
type="text"
value={userformik.values.workspacename}
variant="outlined"
/>
 
  <MDBox display="flex" justifyContent="center" alignItems="center" >

  <MDButton

  //onClick={settimeline(2)}
  size="small"
  variant="gradient"
  color="success"

  startIcon={
    userformik.isSubmitting ? <CircularProgress size="1rem" /> : null
  }
  disabled={userformik.isSubmitting}
  type="submit"

  >

  Submit
  
  </MDButton>
  </MDBox>

  </form>
  
  {resentemail?
  <MDBox mt={2} mb={1} textAlign="center">
    <MDTypography style={{fontSize:16,fontWeight:400,color:"#F44335"}}>You are registered as Guest, Please verify your email to continue</MDTypography>
  <MDTypography variant="button" color="text" style={{fontSize:16,fontWeight:500}}>
    Didn&apos;t receive mail? 
    <MDButton onClick={()=>{
            firebase.auth().currentUser.sendEmailVerification()
              openSuccessContainer()
          }}>
      
        <MDTypography
          variant="button"
          style={{fontSize:16,fontWeight:500}}
          color="success"
          fontWeight="medium"
          textGradient
        >
          Click to resend 
        </MDTypography>
      
    </MDButton>
  </MDTypography>
</MDBox>:null}

        </MDBox>
        </Grid>
        </Grid>
        </MDBox>
        </MDBox>
        </Card>
        </Grid>
        </Grid>
        </MDBox>
   
  );
}

export default Guestuser;

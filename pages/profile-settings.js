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
import React,{useState,useMemo,forwardRef} from 'react';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "/pagesComponents/pages/account/settings/components/TableCell";
import { getAuth, sendPasswordResetEmail,updatePassword,reauthenticateWithCredential,EmailAuthProvider } from "firebase/auth";

import logoSlack from "/assets/images/small-logos/logo-slack.svg";
import Icon from "@mui/material/Icon";
import MDAvatar from "/components/MDAvatar";
import MDInput from "/components/MDInput";
import { useRefMounted } from '../hooks/useRefMounted.js';
import Radio from '@mui/material/Radio';

import IconButton from "@mui/material/IconButton";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import team1 from "/assets/images/download.png";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";
import ProfileInfoCard from "/examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "/examples/Lists/ProfilesList";
import DefaultProjectCard from "/examples/Cards/ProjectCards/DefaultProjectCard";
import { isLoaded,isEmpty,useFirebase } from 'react-redux-firebase';
import MDButton from "/components/MDButton";
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// Overview page components
import Header from "/pagesComponents/pages/profile/components/Header";
import PlatformSettings from "/pagesComponents/pages/profile/profile-overview/components/PlatformSettings";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import firebase from 'firebase/compat/app';

// Data
import profilesListData from "/pagesComponents/pages/profile/profile-overview/data/profilesListData";
import {useGetUsersQuery,useSetUserProfileMutation} from '../services/hasuraquerydata';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
  CircularProgress,Dialog,styled,Slide,Collapse,Alert,
  Typography
} from '@mui/material';
// Images

import {useAuth} from '../hooks/useAuth';
import _ from 'lodash';
import MDSnackbar from "/components/MDSnackbar";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import countryList from 'react-select-country-list'
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { Authenticated } from "../pagesComponents/authenticated"
import MDBadge from "/components/MDBadge";
import RadioGroup from '@mui/material/RadioGroup';
import { Delete } from '@mui/icons-material';


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



function Overview() {
    const { user } = useAuth();
    const options = useMemo(() => countryList().getData(), [])

    const isMountedRef = useRefMounted();
    
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    
    const [changepassword,setchangepassword] = useState(false);
    const {data:usersdata,isLoading:usersdataloading,isSuccess:usersdatasuccess}= useGetUsersQuery({},{
        pollingInterval: 5000,
        skip:isEmpty(user),
        refetchOnMountOrArgChange: true,
        skip: false,
       });

       const [editopen,seteditopen] = useState(false);
      
       const [usersdatastate,setusersdatastate] = useState();
       
       React.useEffect(()=>{
        if(usersdata){
          const tempdata = _.cloneDeep(usersdata)
          setusersdatastate(tempdata)
        }
       },[usersdata]);
       const [setuserprofile,{ data:setuserprofiledata, isLoading:setuserprofiledataloading }] = useSetUserProfileMutation();

     const [successContainer, setSuccessContainer] = useState(false);
     const openSuccessContainer = () => setSuccessContainer(true);
     const closeSuccessContainer = () => setSuccessContainer(false);


     const passwordformik = useFormik({
      enableReinitialize: true,
      initialValues: {
        oldpassword:'',
        password: ''
        
      },
      validationSchema: Yup.object({
        oldpassword: Yup.string()
          .min(5)
          .max(25)
          .required('This field is required'),
          password: Yup.string()
          .min(5)
          .max(25)
          .required('This field is required')
          
          
      }),
      
      

      onFocus:()=>{
          setchangepassword(false);
      },
      
      onSubmit: async (values, helpers) => {

        let currentuser = firebase.auth().currentUser;
  
        //console.log(`password form values are ${JSON.stringify(values)}`)

        //console.log(`user is ${JSON.stringify(currentuser)}`)
        
        try {
          let newPassword = values.password;
          try{

            let useremail = currentuser.email
            const credential =  EmailAuthProvider.credential(
              useremail,
              values.oldpassword
             );
            

          await reauthenticateWithCredential(currentuser, credential);
          }
          catch(error){
            console.error(`reauthenticate user ${JSON.stringify(error.message)}`);
          }
        
          await updatePassword(currentuser, newPassword);
          
          console.log(`password updated`)
          setchangepassword(true);
          
         } 
        catch (err) {
          console.error(`change password error occured ${JSON.stringify(err.message)}`);
          
           
        }

         
        
        /* if(setcreatecontainerdata.data.createcontainer.status){
          
        } */
  
      }
    });

       const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          firstname:usersdata ? usersdata.users[0].firstname : '',
          lastname:usersdata ? usersdata.users[0].lastname : '',
          accounttype:usersdata ? usersdata.users[0].user_accounts.account.accounttype : '',
          agencyname:usersdata ? usersdata.users[0].user_accounts.account.accountname : '',
          businessname:usersdata ? usersdata.users[0].user_accounts.account.accountname : '',
          location:usersdata ? usersdata.users[0].location : '',
          mobno:usersdata ? usersdata.users[0].mobno : '',
        },
        validationSchema: Yup.object({
          firstname: Yup.string()
            .min(5)
            .max(25)
            .required('First name field is required'),
            lastname: Yup.string()
            
            .min(5)
            .max(25)
            .required('Last name field is required'),


        mobno:Yup.string()
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/ , 'Phone number is not valid'),
         
            accounttype: Yup.string()
            
            
            .required('Account Type field is required')
            
           
            
         
        }),
        onSubmit: async (values, helpers) => {
    
          console.log(`form values are ${JSON.stringify(values)}`)
          setuserprofile({
            firstname:values.firstname,
            lastname:values.lastname,
            accounttype:values.accounttype,
            agencyname:values.agencyname?values.agencyname:values.business,
            
            accountid:usersdatastate.users[0].user_accounts.accountid
          })

          openSuccessContainer();
          
          /* if(setcreatecontainerdata.data.createcontainer.status){
            
          } */
    
        }
      });

      const [selectedaccount,setselectedaccount] = useState('');
      
        const passwordRequirements = [
          "One special characters",
          "Min 6 characters",
          "One number (2 are recommended)",
          "Change it often",
        ];
      
        const renderPasswordRequirements = passwordRequirements.map((item, key) => {
          const itemKey = `element-${key}`;
      
          return (
            <MDBox
              key={itemKey}
              component="li"
              color="text"
              fontSize="1.25rem"
              lineHeight={1}
            >
              <MDTypography
                variant="button"
                color="text"
                fontWeight="regular"
                verticalAlign="middle"
              >
                {item}
              </MDTypography>
            </MDBox>
          );
        });
      


  const sidenavItems = [
    { icon: "person", label: "profile", href: "profile" },
    { icon: "receipt_long", label: "basic info", href: "basic-info" },
    { icon: "lock", label: "change password", href: "change-password" },
    { icon: "security", label: "2FA", href: "2fa" },
    /* { icon: "badge", label: "accounts", href: "accounts" }, */
    { icon: "campaign", label: "notifications", href: "notifications" },
   
    { icon: "delete", label: "delete account", href: "delete-account" },
  ];

      const renderSidenavItems = sidenavItems.map(({ icon, label, href }, key) => {
        const itemKey = `item-${key}`;
    
        return (
          <MDBox key={itemKey} component="li" pt={key === 0 ? 0 : 1}>
            <MDTypography
              component="a"
              href={`#${href}`}
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              sx={({
                borders: { borderRadius },
                functions: { pxToRem },
                palette: { light },
                transitions,
              }) => ({
                display: "flex",
                alignItems: "center",
                borderRadius: borderRadius.md,
                padding: `${pxToRem(10)} ${pxToRem(16)}`,
                transition: transitions.create("background-color", {
                  easing: transitions.easing.easeInOut,
                  duration: transitions.duration.shorter,
                }),
    
                "&:hover": {
                  backgroundColor: light.main,
                },
              })}
            >
              <MDBox mr={1.5} lineHeight={1} color={ "dark"}>
                <Icon fontSize="small">{icon}</Icon>
              </MDBox>
              {label}
            </MDTypography>
          </MDBox>
        );
      });
 
      const [DeleteForm,setDeleteForm] = useState(false);
      const handleCloseDeleteDialog = ()=>{
        setDeleteForm(false);
      }

    const [FeedbackForm,setFeedbackForm] = useState(false);
    const handleCloseDialog = ()=>{
      setFeedbackForm(false);
    }
    const [formValue, setFormValue] = useState("");

    const handeSetFormValue = ({ currentTarget }) =>
    setFormValue(currentTarget.value);

  return (
    <Authenticated>
    <DashboardLayout>
      <DashboardNavbar />
      <MDSnackbar
      color="success"
      icon="check"
      title="Profile Updated Successfully"
      //content="Container Created Successfully"
     // dateTime="11 mins ago"
      open={successContainer}
      onClose={closeSuccessContainer}
      close={closeSuccessContainer}
      bgSuccess
    />
      <MDBox mb={2} />
    
     
      <DialogWrapper
        open={FeedbackForm}
        maxWidth="lg"
        //width="800"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
          <MDBox my={2}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} lg={12}>
            
              <MDBox pt={2} px={2}>
             
     
        <MDBox mb={1}>
          <MDTypography variant="h6" fontWeight="medium" style={{marginLeft:80}}>
            Tell us why you are closing your account : 
          </MDTypography>
        </MDBox>
        
      
    
              </MDBox>
             
              <Grid item xs={12} lg={12}>
              <FormControl>
      {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        style={{marginLeft:100}}
      >
        <FormControlLabel value="duplicate-account" control={<Radio />} label="I have duplicate account" />
        <FormControlLabel value="too-many-emails" control={<Radio />} label="I am getting too many emails" />
        <FormControlLabel value="no-value" control={<Radio />} label="I am not getting any value from my membership" />
        <FormControlLabel value="privacy-concern" control={<Radio />} label="I have a privacy concern" />
        <FormControlLabel value="unwanted" control={<Radio />} label="I am receiving unwanted contact" />
        <FormControlLabel value="others" control={<Radio />} label="Others" />
      </RadioGroup>
    </FormControl>
    <FormControl>
    <FormLabel id="demo-controlled-radio-buttons-group" style={{marginTop:20,marginLeft:100}}>Your feedback matters, Is thereanything else you would like us to know.</FormLabel>
    <MDInput
                      value={formValue}
                      rows="4"
                      onChange={handeSetFormValue}
                      multiline
                      fullWidth
                      style={{marginLeft:100,marginTop:20}}
                    />
                    </FormControl>


                      <MDBox style={{marginTop:30,display:'flex',justifyContent:'flex-start',marginLeft:100}}>

                      <MDButton
        
        onClick={()=>{
          
          handleCloseDialog()
        }}
         size="medium"
         variant="outlined"
         color="success"
       >
        
         Discard
       </MDButton>&nbsp;&nbsp;&nbsp;&nbsp;
       
       <MDButton
         
         onClick={()=>{
          setFeedbackForm(false);
          setDeleteForm(true);
         }}
          size="medium"
          variant="contained"
          color="success"
        >
         
          Continue
         
        </MDButton>
                      </MDBox>
                  
                    </Grid>
                    
          </Grid>
        </Grid>
      </MDBox>
         
      </DialogWrapper>



       <DialogWrapper
        open={DeleteForm}
        maxWidth="lg"
        //width="800"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDeleteDialog}
      >
          <MDBox my={2}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} lg={12}>
            
              <MDBox pt={2} px={2}>
             
     
        <MDBox mb={1}>
        <MDBox display="flex" justifyContent="space-between">
                
                <MDTypography variant="h4"> Confirmation Required</MDTypography>
                 
                 <IconButton
                   aria-label="close"
                   color="inherit"
                   size="small"
                   onClick={() => {
                     setDeleteForm(false);
                   }}
                 >
                   <CloseIcon fontSize="inherit" />
                 </IconButton>
                 </MDBox>
                 <Divider/>
        </MDBox>
        
      
    
              </MDBox>
             
              <Grid item xs={12} lg={12}>
              
              
               <MDBox display="flex" justifyContent="center" style={{backgroundColor:"#f7c6ad",marginLeft:100,marginRight:20,borderRadius:10}}>
                 <Grid container>
                   <Grid item lg={1}>
                   <ErrorOutlineIcon fontSize="large" style={{marginLeft:10,marginTop:15}}/>
                   </Grid>
                   <Grid item lg={11}>
                     <MDTypography variant="h5" fontWeight="medium" style={{marginTop:10}}>Are you sure ?</MDTypography>
                     <MDTypography style={{fontSize:14,fontWeight:400,marginBottom:10}}>Once you confirm all your account data will be deleted permanently.</MDTypography>
                   </Grid>
                 </Grid>
               </MDBox>
               <Divider/>
               <FormControl>
       <FormLabel id="demo-controlled-input" style={{marginLeft:100}}>Type delete to confirm</FormLabel> 
       <MDInput
                       value={formValue}
                       
                       onChange={handeSetFormValue}
                       
                       fullWidth
                       style={{marginLeft:100,marginTop:20}}
                     />
       
       </FormControl>
       <MDBox style={{marginTop:30,display:'flex',justifyContent:'flex-start',marginLeft:100}}>
 
 <MDButton
 
 onClick={()=>{
 
 handleCloseDeleteDialog()
 }}
 size="medium"
 variant="outlined"
 color="success"
 >
 
 Discard
 </MDButton>&nbsp;&nbsp;&nbsp;&nbsp;
 
 <MDButton
 
 onClick={()=>{
 setFeedbackForm(false);
 setDeleteForm(false);
 }}
 size="medium"
 variant="contained"
 color="success"
 >
 
 Delete Your Account
 
 </MDButton>
 </MDBox>
 
                    </Grid>
                    
          </Grid>
        </Grid>
      </MDBox>
         
      </DialogWrapper>
      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
          <Card
      sx={{
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
        position: "sticky",
        top: "1%",
      }}
    >
      <MDBox
        component="ul"
        display="flex"
        flexDirection="column"
        p={2}
        m={0}
        sx={{ listStyle: "none" }}
      >
        {renderSidenavItems}
      </MDBox>
    </Card>
          </Grid>
          {usersdata?
          <Grid item xs={12} lg={9}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                <Card id="profile">
      <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar
              src={team1.src}
              alt="profile-image"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
           
            {usersdata?
              <MDTypography variant="h5" fontWeight="medium">
               {usersdata.users[0].firstname?usersdata.users[0].firstname:''} {usersdata.users[0].lastname?usersdata.users[0].lastname:''}
              </MDTypography>
              :
              <MDBox
       
       display="flex"
       justifyContent="center"
       alignItems="center"
       
       style={{marginTop:100,marginBottom:100}}
     >
       <CircularProgress style={{color:"#17845D"}}/> 
       </MDBox>

}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            
          </Grid>
        </Grid>
      </MDBox>
    </Card>
                </Grid>
                <Grid item xs={12}>
                <Card id="basic-info" >
      <MDBox p={3}>
        <MDTypography variant="h5">Edit Profile Info</MDTypography>
      </MDBox>
      <MDBox pb={3} px={3}>
      <form noValidate onSubmit={formik.handleSubmit} style={{marginTop:20}}>
              <Grid container>
                <Grid item lg={6}>
                                    <TextField

                    fullWidth
                    style={{marginTop:-5,marginBottom:20}}
                    label={"First Name"}
                    //placeholder={t('Your email address here...')}
                    {...formik.getFieldProps('firstname')}
                    helperText={formik.errors.firstname && formik.touched.firstname && `${formik.errors.firstname}`}
                    error={formik.touched.firstname && formik.errors.firstname}

                    margin="normal"
                    name="firstname"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.firstname}
                    variant="outlined"
                    />
                </Grid>
                <Grid item lg={6}>
                <TextField
        style={{marginTop:-5,marginBottom:20,marginLeft:5}}
        fullWidth

        label={'Last Name'}
        //placeholder={t('Your email address here...')}
        {...formik.getFieldProps('lastname')}
        helperText={formik.errors.lastname && formik.touched.lastname && `${formik.errors.lastname}`}
        error={formik.touched.lastname && formik.errors.lastname}


        margin="normal"
        name="lastname"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="text"
        value={formik.values.lastname}
        variant="outlined"
        />

                  </Grid>
              </Grid>
       
              <TextField
  style={{marginTop:-5,marginBottom:20}}
  fullWidth

  label={'Mobile Number'}
  //placeholder={t('Your email address here...')}
  {...formik.getFieldProps('mobno')}
  helperText={formik.errors.mobno && formik.touched.mobno && `${formik.errors.mobno}`}
  error={formik.touched.mobno && formik.errors.mobno}
  margin="normal"
  name="mobno"
  onBlur={formik.handleBlur}
  onChange={formik.handleChange}
  type="text"
  value={formik.values.mobno}
  variant="outlined"
  />
<FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Location</InputLabel>
<ThemeProvider theme={selecttheme}>
<Select
labelId="demo-simple-select-label"
id="demo-simple-select"


label="Location"
{...formik.getFieldProps('location')}
  helperText={formik.errors.location && formik.touched.location && `${formik.errors.location}`}
  error={formik.touched.location && formik.errors.location}
style={{height:45,marginBottom:20}}
value={formik.values.location}
onChange={formik.handleChange}
name="location"
onBlur={formik.handleBlur}

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

        
        <MDBox display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <FormControl fullWidth>
<InputLabel id="demo-simple-select-label">Account Type</InputLabel>
<ThemeProvider theme={selecttheme}>

                
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Account Type"}
                fullWidth

        {...formik.getFieldProps('accounttype')}
        helperText={formik.errors.accounttype && formik.touched.accounttype && `${formik.errors.accounttype}`}
        error={formik.touched.accounttype && formik.errors.accounttype}
//label={"Account Type"}
        name="accounttype"
        style={{height:45,marginBottom:20}}
        value={formik.values.accounttype}
        onChange={(e)=>{
          formik.setFieldValue(e.target.name, e.target.value);
          setselectedaccount(e.target.value)
        }}
        
        onBlur={formik.handleBlur}


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
        </MDBox>
        <Grid container>
                <Grid item lg={12}>
                  {selectedaccount==="agency"?
                                  <TextField

                  fullWidth
                  style={{marginTop:-5,marginBottom:20}}
                  label={'Agency Name'}
                  //placeholder={t('Your email address here...')}

                  {...formik.getFieldProps('agencyname')}
                  helperText={formik.errors.agencyname && formik.touched.agencyname && `${formik.errors.agencyname}`}
                  error={formik.touched.agencyname && formik.errors.agencyname}

                  margin="normal"
                  name="agencyname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.agencyname}
                  variant="outlined"
                  />:
                  <TextField

                  fullWidth
                  style={{marginTop:-5,marginBottom:20}}
                  label={'Business Name'}
                  //placeholder={t('Your email address here...')}

                  {...formik.getFieldProps('businessname')}
                  helperText={formik.errors.businessname && formik.touched.businessname && `${formik.errors.businessname}`}
                  error={formik.touched.businessname && formik.errors.businessname}

                  margin="normal"
                  name="businessname"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.businessname}
                  variant="outlined"
                  />}
                </Grid>
               
              </Grid>
       
        
        
        <MDButton

//onClick={settimeline(2)}
size="small"
variant="contained"
color="success"

startIcon={
  formik.isSubmitting ? <CircularProgress size="1rem" /> : null
}
disabled={formik.isSubmitting}
type="submit"

>

Submit

</MDButton>

        </form>
      </MDBox>
    </Card>
                </Grid>
                <Grid item xs={12}>
                <Card id="change-password" >
      <MDBox p={3}>
        <MDTypography variant="h5">Change Password</MDTypography>
      </MDBox>
      <MDBox pb={3} px={3}>
      <form noValidate onSubmit={passwordformik.handleSubmit} >


      <TextField

fullWidth

label={"Current Password"}
//placeholder={t('Your email address here...')}
{...passwordformik.getFieldProps('oldpassword')}
helperText={passwordformik.errors.oldpassword && passwordformik.touched.oldpassword && `${passwordformik.errors.oldpassword}`}
error={passwordformik.touched.oldpassword && passwordformik.errors.oldpassword}

margin="normal"
name="oldpassword"
onBlur={passwordformik.handleBlur}
onChange={passwordformik.handleChange}
type="text"
value={passwordformik.values.oldpassword}
variant="outlined"
/>
             
                                    <TextField

                    fullWidth
                    
                    label={"New Password"}
                    //placeholder={t('Your email address here...')}
                    {...passwordformik.getFieldProps('password')}
                    helperText={passwordformik.errors.password && passwordformik.touched.password && `${passwordformik.errors.password}`}
                    error={passwordformik.touched.password && passwordformik.errors.password}
                    style={{marginBottom:20}}
                    margin="normal"
                    name="password"
                    onBlur={passwordformik.handleBlur}
                    onChange={passwordformik.handleChange}
                    type="text"
                    value={passwordformik.values.password}
                    variant="outlined"
                    />
       {changepassword ? <MDTypography style={{fontSize:14,fontWeight:500,color:"#17845D"}}>Password changed Successfully.</MDTypography>:null}
        
        
        <MDButton

//onClick={settimeline(2)}
size="small"
variant="contained"
color="success"

startIcon={
  passwordformik.isSubmitting ? <CircularProgress size="1rem" /> : null
}
disabled={passwordformik.isSubmitting}
type="submit"

>

Update Password

</MDButton>

        </form>
      </MDBox>
    </Card>
           
                </Grid>
                
                <Grid item xs={12}>
                <Card id="2fa" sx={{ overflow: "visible" }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <MDTypography variant="h5">Two-factor authentication</MDTypography>
        <MDBadge
          variant="contained"
          color="warning"
          badgeContent="Coming Soon..."
          size='lg'
        />
      </MDBox>
      {/* <MDBox p={3}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDTypography variant="body2" color="text">
            Security keys
          </MDTypography>
          <MDBox
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <MDBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <MDTypography variant="button" color="text" fontWeight="regular">
                No Security keys
              </MDTypography>
            </MDBox>
            <MDButton variant="outlined" color="dark" size="small">
              add
            </MDButton>
          </MDBox>
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDTypography variant="body2" color="text">
            SMS number
          </MDTypography>
          <MDBox
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <MDBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <MDTypography variant="button" color="text" fontWeight="regular">
                +3012374423
              </MDTypography>
            </MDBox>
            <MDButton variant="outlined" color="dark" size="small">
              edit
            </MDButton>
          </MDBox>
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDTypography variant="body2" color="text">
            Authenticator app
          </MDTypography>
          <MDBox
            display="flex"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <MDBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
              <MDTypography variant="button" color="text" fontWeight="regular">
                Not Configured
              </MDTypography>
            </MDBox>
            <MDButton variant="outlined" color="dark" size="small">
              set up
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox> */}
    </Card>
                </Grid>
                <Grid item xs={12}>
                <Card id="notifications">
      <MDBox p={3} lineHeight={1}>
        <MDBox mb={1}>
          <MDTypography variant="h5">Notifications</MDTypography>
        </MDBox>
        <MDTypography variant="button" color="text">
          Choose how you receive notifications. These notification settings
          apply to the things you’re watching.
        </MDTypography>
      </MDBox>
      <MDBox pb={3} px={3}>
        <MDBox minWidth="auto" sx={{ overflow: "scroll" }}>
        <Table sx={{ minWidth: "36rem" }}>
            <MDBox component="thead">
              <TableRow>
                <TableCell width="100%" padding={[1.5, 3, 1.5, 0.5]}>
                  Activity
                </TableCell>
                <TableCell align="center" padding={[1.5, 6, 1.5, 6]}>
                  Email
                </TableCell>
                <TableCell align="center" padding={[1.5, 6, 1.5, 6]}>
                  Push
                </TableCell>
                <TableCell align="center" padding={[1.5, 6, 1.5, 6]}>
                  SMS
                </TableCell>
              </TableRow>
            </MDBox>
            <TableBody>
              <TableRow>
                <TableCell padding={[1, 1, 1, 0.5]}>
                  <MDBox lineHeight={1.4}>
                    <MDTypography
                      display="block"
                      variant="button"
                      fontWeight="regular"
                    >
                      Mentions
                    </MDTypography>
                    <MDTypography
                      variant="caption"
                      color="text"
                      fontWeight="regular"
                    >
                      Notify when another user mentions you in a comment
                    </MDTypography>
                  </MDBox>
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding={[1, 1, 1, 0.5]}>
                  <MDBox lineHeight={1.4}>
                    <MDTypography
                      display="block"
                      variant="button"
                      fontWeight="regular"
                    >
                      Comments
                    </MDTypography>
                    <MDTypography
                      variant="caption"
                      color="text"
                      fontWeight="regular"
                    >
                      Notify when another user comments your item.
                    </MDTypography>
                  </MDBox>
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding={[1, 1, 1, 0.5]}>
                  <MDBox lineHeight={1.4}>
                    <MDTypography
                      display="block"
                      variant="button"
                      fontWeight="regular"
                    >
                      Follows
                    </MDTypography>
                    <MDTypography
                      variant="caption"
                      color="text"
                      fontWeight="regular"
                    >
                      Notify when another user follows you.
                    </MDTypography>
                  </MDBox>
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                  <Switch />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell padding={[1, 1, 1, 0.5]} noBorder>
                  <MDTypography display="block" variant="button" color="text">
                    Log in from a new device
                  </MDTypography>
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]} noBorder>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]} noBorder>
                  <Switch defaultChecked />
                </TableCell>
                <TableCell align="center" padding={[1, 1, 1, 0.5]} noBorder>
                  <Switch defaultChecked />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </MDBox>
      </MDBox>
    </Card>
                </Grid>
                
                <Grid item xs={12}>
                <Card id="delete-account">
      <MDBox
        pr={3}
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
      >
        <MDBox p={3} lineHeight={1}>
          <MDBox mb={1}>
            <MDTypography variant="h5">Delete Account</MDTypography>
          </MDBox>
          <MDTypography variant="button" color="text">
            Once you delete your account, there is no going back. Please be
            certain.
          </MDTypography>
        </MDBox>
        <MDBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
          {/* <MDButton variant="outlined" color="secondary">
            deactivate
          </MDButton> */}
          <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
            <MDButton variant="gradient" color="error" sx={{ height: "100%" }} onClick={()=>setFeedbackForm(true)}>
              delete account
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
          :
          <Grid item xs={12} lg={9}>
          <Card>
          <MDBox
       
       display="flex"
       justifyContent="center"
       alignItems="center"
       
       style={{marginTop:100,marginBottom:100}}
     >
       <CircularProgress style={{color:"#17845D"}}/> 
       </MDBox>
       </Card>
       </Grid>
}
        </Grid>
      </MDBox>
     
    </DashboardLayout>
    
    </Authenticated>
     
    
  );
}

export default Overview;

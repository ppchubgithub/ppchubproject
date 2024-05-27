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
import React,{useState,useMemo} from 'react';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";
import ProfileInfoCard from "/examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "/examples/Lists/ProfilesList";
import DefaultProjectCard from "/examples/Cards/ProjectCards/DefaultProjectCard";
import { isLoaded,isEmpty,useFirebase } from 'react-redux-firebase';
import MDButton from "/components/MDButton";

// Overview page components
import Header from "/pagesComponents/pages/profile/components/Header";
import PlatformSettings from "/pagesComponents/pages/profile/profile-overview/components/PlatformSettings";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Data
import profilesListData from "/pagesComponents/pages/profile/profile-overview/data/profilesListData";
import {useGetUsersQuery,useSetUserProfileMutation} from '../services/hasuraquerydata';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
  CircularProgress
} from '@mui/material';
// Images
import homeDecor1 from "/assets/images/home-decor-1.jpg";
import homeDecor2 from "/assets/images/home-decor-2.jpg";
import homeDecor3 from "/assets/images/home-decor-3.jpg";
import homeDecor4 from "/assets/images/home-decor-4.jpeg";
import team1 from "/assets/images/team-1.jpg";
import team2 from "/assets/images/team-2.jpg";
import team3 from "/assets/images/team-3.jpg";
import team4 from "/assets/images/team-4.jpg";
import {useAuth} from '../hooks/useAuth';
import _ from 'lodash';
import MDSnackbar from "/components/MDSnackbar";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import countryList from 'react-select-country-list'

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme,ThemeProvider } from '@mui/material/styles';

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

       const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          firstname:usersdata ? usersdata.users[0].firstname : '',
          lastname:usersdata ? usersdata.users[0].lastname : '',
          accounttype:usersdata ? usersdata.users[0].user_accounts.account.accounttype : '',
          agencyname:usersdata ? usersdata.users[0].user_accounts.account.accountname : '',
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
            accounttype: Yup.string()
            
            
            .required('Account Type field is required'),
            agencyname: Yup.string()
            
            .min(5)
            .max(25)
            .required('Agency name field is required')
            
         
        }),
        onSubmit: async (values, helpers) => {
    
          console.log(`form values are ${JSON.stringify(values)}`)
          setuserprofile({
            firstname:values.firstname,
            lastname:values.lastname,
            accounttype:values.accounttype,
            agencyname:values.agencyname,
            //workspacename:values.workspacename,
            //workspaceid:workspacesdatastate.workspaces[0].workspaceid,
            accountid:usersdatastate.users[0].user_accounts.accountid
          })

          openSuccessContainer();
          
          /* if(setcreatecontainerdata.data.createcontainer.status){
            
          } */
    
        }
      });

  return (
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
      <Header>
        <MDBox mt={5} mb={3}>
            
          <Grid container >
            <Grid item lg={2}></Grid>
            {/* <Grid item xs={12} md={6} lg={3} sx={{ display: "flex" }}>
              
              {usersdatastate?
              <ProfileInfoCard
                title="profile information"
                //description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                info={{
                  fullName: `${usersdatastate.users[0].firstname} ${usersdatastate.users[0].lastname}`,
                  //mobile: "(44) 123 1234 123",
                  email: `${usersdatastate.users[0].email}`,
                 // location: "INDIA",
                }}
                social={[]}
                action={{
                  route: "/pages/profile/profile-overview",
                  tooltip: "Edit Profile",
                }}
                shadow={false}
              />:null}
             
            </Grid> */}
<Grid item lg={8}>
            <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Edit Profile Info</MDTypography>
      </MDBox>
      <MDBox component="form" pb={3} px={3}>
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
                fullWidth

        {...formik.getFieldProps('accounttype')}
        helperText={formik.errors.accounttype && formik.touched.accounttype && `${formik.errors.accounttype}`}
        error={formik.touched.accounttype && formik.errors.accounttype}
//label={"Account Type"}
                
        style={{height:45,marginBottom:20}}
        value={formik.values.accounttype}
        onChange={formik.handleChange}
        name="accounttype"
        onBlur={formik.handleBlur}


        >

        <MenuItem  value={"personal"}>
        Personal
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
                  />
                </Grid>
               
              </Grid>
       
        
        <Divider variant="fullWidth"/>
        <MDBox display="flex" justifyContent="center" alignItems="center">

        <MDButton

        //onClick={settimeline(2)}
        size="large"
        variant="gradient"
        color="success"

        startIcon={
          formik.isSubmitting ? <CircularProgress size="1rem" /> : null
        }
        //disabled={formik.isSubmitting}
        type="submit"

        >

        Submit
        
        </MDButton>
        </MDBox>

        </form>
      </MDBox>
    </Card>
    </Grid>
{/* 
            <Grid item xs={12} md={6} lg={3} sx={{ display: "flex" }}>
             
              {usersdatastate?
              <ProfileInfoCard
                title="account information"
                //description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                info={{
                  accountname: `${usersdatastate.users[0].user_accounts.account.accountname}`,
                  workspaces: `${usersdatastate.users[0].user_workspaces.length}`,
                  //mobile: "(44) 123 1234 123",
                  email: `${usersdatastate.users[0].email}`,
                  //location: "INDIA",
                }}
                social={[]}
                action={{
                  route: "/pages/profile/profile-overview",
                  tooltip: "Edit Profile",
                }}
                shadow={false}
              />:null}
             
            </Grid>
            <Grid item lg={4.5}>
           
        <MDTypography
          variant="h6"
          fontWeight="medium"
          textTransform="capitalize"
          style={{marginBottom:10}}
        >
          edit your user and account info here
        </MDTypography>
            <MDButton variant="contained" color="success" onClick={()=>{
                if(!editopen){
                    seteditopen(true)
                }
                else{
                    seteditopen(false)
                }
               
             }}>
                {editopen?"Close": "Edit"}
             </MDButton>
             {editopen?
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
                fullWidth

        {...formik.getFieldProps('accounttype')}
        helperText={formik.errors.accounttype && formik.touched.accounttype && `${formik.errors.accounttype}`}
        error={formik.touched.accounttype && formik.errors.accounttype}
//label={"Account Type"}
                
        style={{height:45,marginBottom:20}}
        value={formik.values.accounttype}
        onChange={formik.handleChange}
        name="accounttype"
        onBlur={formik.handleBlur}


        >

        <MenuItem  value={"personal"}>
        Personal
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
                  />
                </Grid>
               
              </Grid>
       
        
        <Divider variant="fullWidth"/>
        <MDBox display="flex" justifyContent="center" alignItems="center">

        <MDButton

        //onClick={settimeline(2)}
        size="large"
        variant="gradient"
        color="success"

        startIcon={
          formik.isSubmitting ? <CircularProgress size="1rem" /> : null
        }
        //disabled={formik.isSubmitting}
        type="submit"

        >

        Submit
        
        </MDButton>
        </MDBox>

        </form>:null}
            </Grid> */}
            {/* <Grid item xs={12} xl={4}>
              <ProfilesList
                title="workspaces"
                profiles={profilesListData}
                shadow={false}
              />
            </Grid> */}
          </Grid>
          
        </MDBox>
       
      </Header>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;

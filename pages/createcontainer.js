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
import * as React from 'react';

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDButton from "/components/MDButton";

import Icon from "@mui/material/Icon";
import Checkbox from '@mui/material/Checkbox';

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SellIcon from '@mui/icons-material/Sell';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StyleIcon from '@mui/icons-material/Style';
// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";
import TimelineItem from "/examples/Timeline/TimelineItem";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from "@mui/material/Switch";

import { styled } from "@mui/material/styles";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
// OrderDetails page components
import PaymentDetails from "/pagesComponents/ecommerce/orders/order-details/components/PaymentDetails";
import BillingInformation from "/pagesComponents/ecommerce/orders/order-details/components/BillingInformation";
import OrderSummary from "/pagesComponents/ecommerce/orders/order-details/components/OrderSummary";
const StyledSelect = styled(Select)(() => ({
  '& .MuiOutlinedInput-root': {
    
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#17845D', // Color on focus
    },
  },
  height:50,
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#17845D', // Color on focus
  },
}));
const CustomCheckbox = styled(Checkbox)(() => ({
  "& .MuiCheckbox-root": {
    color: "#e91e63", // Use theme colors
  },
  "&.Mui-checked": {
    color: "#17845D", // Change color on check
    backgroundColor:"#17845D"
  },
  "&.Mui-focused": {
    color: "#17845D", // Change color on check
    backgroundColor:"#17845D"
  },
}));
const CustomSwitch = styled(Switch)(() => ({

  "&.Mui-checked": {
    "& .MuiSwitch-switchBase": {
      backgroundColor: "#17845D",
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#17845D", // Success color for contrast
    },
  },
}));

function OrderDetails() {
  const [period, setPeriod] = React.useState('');

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={6}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox pt={2} px={2}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
      <MDBox>
        <MDBox mb={1}>
          <MDTypography variant="h6" fontWeight="medium">
            Create Container
          </MDTypography>
        </MDBox>
        
      </MDBox>
    </MDBox>
              </MDBox>
              <Divider />
              <MDBox pt={1} pb={3} px={2}>
                
                <MDBox mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                    <MDBox mt={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="Plan"
          dateTime="choose your plan"
        />
        <TimelineItem
          color="secondary"
          icon="inventory_2"
          title="Container Details"
          dateTime="Fill in your GTM details"
        />
        <TimelineItem
          color="secondary"
          icon="shopping_cart"
          title="Custom Subdomain"
          dateTime="Use a custom subdomain for your server"
        />
        <TimelineItem
          color="secondary"
          icon="done"
          title="Ready"
          dateTime="Implement it on your site"
          lastItem
        />
      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={8}>
                      
                      <MDBox mt={3}>
                      <Grid container spacing={3}>
                      <Grid item xs={12} md={6} lg={1}>
                        <CurrencyExchangeIcon color="success"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={8}>
                      <MDTypography variant="button" fontWeight="medium">
                        Free
                        </MDTypography>
        <MDTypography variant="body2" color="text">
        Total 10.000 requests | 1 cloud server 
        </MDTypography>
        </Grid>
        <Grid item xs={12} md={6} lg={1}>
        <MDTypography variant="button" fontWeight="medium">
                        Free
                        </MDTypography>
                        </Grid>
                      
        <Grid item xs={12} md={6} lg={2}><CustomCheckbox defaultChecked color="white" /></Grid>
        </Grid>
        <Divider />
        
        <Grid container spacing={3}>
                      <Grid item xs={12} md={6} lg={1}>
                        <SellIcon color="success"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={8}>
                     
        <MDTypography variant="button" fontWeight="medium">
        Basis
                        </MDTypography>
                    
        <MDTypography variant="body2" color="text">
        Total 750.000 requests | 3 cloud servers
        </MDTypography>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
        <MDTypography variant="button" fontWeight="medium">
                        25
                        </MDTypography>
                        </Grid>

        <Grid item xs={12} md={6} lg={2}><CustomCheckbox  color="success" /></Grid>
        </Grid>
        <Divider />

        <Grid container spacing={3}>
                      <Grid item xs={12} md={6} lg={1}>
                        <StyleIcon color="success"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={8}>
        <MDTypography variant="button" fontWeight="medium">
        Pro+
                        </MDTypography>
        <MDTypography variant="body2" color="text">
        Total 3.000.000 requests | 5 cloud servers
        </MDTypography>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
        <MDTypography variant="button" fontWeight="medium">
                        65
                        </MDTypography>
                        </Grid>
        <Grid item xs={12} md={6} lg={2}>
        <CustomCheckbox  color="white" />
        </Grid>
        </Grid>
        <Divider />

        <Grid container spacing={3}>
                      <Grid item xs={12} md={6} lg={1}>
                        <AdminPanelSettingsIcon color="success"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={8}>
        <MDTypography variant="button" fontWeight="medium">
        Ultimate

                        </MDTypography>
        <MDTypography variant="body2" color="text">
        Total 10.000.000 requests | 7 cloud servers
        </MDTypography>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
        <MDTypography variant="button" fontWeight="medium">
                        145
                        </MDTypography>
                        </Grid>
        <Grid item xs={12} md={6} lg={2}><CustomCheckbox  color="white" /></Grid>
        </Grid>
        <Divider />
                      </MDBox>
                      <MDBox>
                      <MDTypography variant="title" fontWeight="medium">
                        Period
                        </MDTypography>
                        <FormControl fullWidth>
       
        <StyledSelect
          
          value={period}
          //label="Period"
         onChange={handleChange}
         //style={{height:50}}
        >
          <MenuItem value={"monthly"}>Monthly</MenuItem>
          <MenuItem value={"yearly"}>Yearly</MenuItem>
         
        </StyledSelect>
      </FormControl>
      <MDTypography variant="body2" style={{fontSize:"14px",fontWeight:"400",marginTop:10}}>
                        Save upto 13% with a yearly subscription
                        </MDTypography>
                      </MDBox>
                      <MDBox>
                      <Grid container spacing={3}>
                      <Grid item xs={12} md={6} lg={10}>

                      <MDTypography variant="title" fontWeight="medium">
                      Automatic upgrade?
                        </MDTypography>
                       </Grid>
                       <Grid item xs={12} md={6} lg={2}>
                       <Switch   defaultChecked/>
                        </Grid>
                        </Grid>
                        </MDBox>
                      <MDTypography variant="title" style={{fontSize:"14px",fontWeight:"200",marginTop:10}}>
                      Your package will automatically be upgraded based on your requests.
                        </MDTypography>
                        <Divider/>
                  <MDButton
        
       // onClick={handleLogout}
        size="small"
        variant="gradient"
        color="success"
      >
        <ArrowRightIcon style={{fontSize:20}}/>&nbsp;
        <b style={{marginLeft:10}}>Continue</b>
      </MDButton>
                    </Grid>
                    
                 
                  </Grid>
                 
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default OrderDetails;

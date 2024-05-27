import React,{useState,useMemo,forwardRef} from 'react';
import MDBox from "/components/MDBox";
import Card from "@mui/material/Card";
import {
    CircularProgress,Dialog,styled,Slide,Collapse,Alert,
    Typography
  } from '@mui/material';
  import { Authenticated } from "../../pagesComponents/authenticated";
  import MDBadge from "/components/MDBadge";
  import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
  import DashboardNavbar from "/examples/Navbars/DashboardNavbar";


function WebGTMVariables(){
    return(
        <Authenticated>
    <DashboardLayout>
      <DashboardNavbar />
     
      <MDBox
       
       display="flex"
       justifyContent="center"
       alignItems="center"
       
       style={{marginTop:100,marginBottom:100}}
     >
        <MDBadge
          variant="contained"
          color="warning"
          badgeContent="Coming Soon..."
          container
        />
      
       </MDBox>
     
      </DashboardLayout>
      </Authenticated>
    
    )
}

export default WebGTMVariables;

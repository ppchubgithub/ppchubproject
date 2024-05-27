/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import Link from "next/link";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import { RegisterFirebaseAuth } from "../../examples/SignUp/RegisterFirebaseAuth";
// Authentication layout components
import BasicLayout from "/pagesComponents/authentication/components/BasicLayout";

// Images
import bgImage from "/assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  return (
    <BasicLayout image={bgImage}>
      <Card>
        
      <MDBox textAlign="center">
                <MDTypography
                  variant="h2"
                  style={{marginTop:20}}
                >
                  Create Account
                </MDTypography>
                <MDTypography
                  variant="h6"
                  color="text"
                
                  sx={{
                    mb: 3
                  }}
                >
                  Fill in the fields below to create your account.
                </MDTypography>
              </MDBox>

        <MDBox pt={4} pb={3} px={3}>
         <RegisterFirebaseAuth /> 
        </MDBox>
        
      </Card>
    </BasicLayout>
  );
}

export default Cover;

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

import { useState } from "react";

import Link from "next/link";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { LoginFirebaseAuth } from '../../../../examples/Login/LoginFirebaseAuth'
// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";

// Authentication layout components
import BasicLayout from "/pagesComponents/authentication/components/BasicLayout";

// Images
import bgImage from "/assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>

        <MDBox textAlign="center">
                <MDTypography
                  variant="h2"
                  style={{marginTop:20}}
                >
                  Sign in
                </MDTypography>
                <MDTypography
                  variant="h6"
                  color="text"
                
                  sx={{
                    mb: 3
                  }}
                >
                  Fill in the fields below to sign into your account.
                </MDTypography>
              </MDBox>

        <MDBox pt={4} pb={3} px={3}>
        <LoginFirebaseAuth />
        </MDBox>
        <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <Link href="/signup">
                  <MDTypography
                    variant="button"
                    color="success"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign up
                  </MDTypography>
                </Link>
                
              </MDTypography>
            </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;

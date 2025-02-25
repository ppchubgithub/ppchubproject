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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";

// NextJS Material Dashboard 2 PRO examples
import DefaultNavbar from "/examples/Navbars/DefaultNavbar";
import PageLayout from "/examples/LayoutContainers/PageLayout";

// NextJS Material Dashboard 2 PRO page layout routes
import pageRoutes from "/routes/page.routes";

// Authentication pages components
import Footer from "/pagesComponents/authentication/components/Footer";

function BasicLayout({ image, children }) {
  return (
    <PageLayout>
      {/* <DefaultNavbar
        routes={pageRoutes}
        action={{
          type: "external",
          route:
            "https://creative-tim.com/product/nextjs-material-dashboard-pro",
          label: "buy now",
        }}
        transparent
        light
      /> */}
      <MDBox
        position="absolute"
        width="50%"
        minHeight="100vh"
        sx={{
          backgroundColor:"#17845D",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></MDBox>
      <MDBox px={1} width="100%" height="100vh" mx="auto">
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >

<Grid item xs={11} sm={9} md={5} lg={6}>
            
          </Grid>
          <Grid item xs={11} sm={9} md={5} lg={3.5}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
      <Footer light />
    </PageLayout>
  );
}

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;

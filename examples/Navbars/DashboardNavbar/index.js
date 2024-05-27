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

import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import MDButton from "/components/MDButton";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import MDAvatar from "/components/MDAvatar";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDInput from "/components/MDInput";
import MDBadge from "/components/MDBadge";
import team1 from "/assets/images/download.png";

// NextJS Material Dashboard 2 PRO examples
import Breadcrumbs from "/examples/Breadcrumbs";
//import Breadcrumbs from "@marketsystems/nextjs13-appdir-breadcrumbs";

import NotificationItem from "/examples/Items/NotificationItem";
import {useAuth} from '../../../hooks/useAuth';
import MDTypography from "/components/MDTypography";
import Tooltip from "@mui/material/Tooltip";


// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "/examples/Navbars/DashboardNavbar/styles";

// NextJS Material Dashboard 2 PRO context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "/context";
import {useTheme} from '@mui/material';
import Card from "@mui/material/Card";



function DashboardNavbar({ absolute, light, isMini }) {
  const theme = useTheme();
  const { user, logout, signInWithEmailAndPassword } = useAuth();
  const { functions } = theme;
  const { linearGradient } = functions;

  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const router = useRouter();

  const {
    miniSidenav,
    transparentNavbar,
    fixedNavbar,
    openConfigurator,
    darkMode,
  } = controller;

  const handleLogout = async () => {
    try {
      //handleClose();
      await logout();
     router.push('/get-started')
    } catch (error) {
      console.error(error);
    }
  };
  const [openMenu, setOpenMenu] = useState(false);
  const route = useRouter().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      //setNavbarType("sticky");
      setNavbarType("static");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(
        dispatch,
        (fixedNavbar && window.scrollY === 0) || !fixedNavbar
      );
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem
        icon={<Icon>podcasts</Icon>}
        title="Manage Podcast sessions"
      />
      <NotificationItem
        icon={<Icon>shopping_cart</Icon>}
        title="Payment successfully completed"
      />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({
    palette: { dark, white, text },
    functions: { rgba },
  }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : white.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
  
      <MDBox
        display="flex"
        alignItems="center"
        //flexDirection="column"
        
        position={absolute ? "absolute" : navbarType}
        minHeight="13.75rem"
        borderRadius="xl"
        sx={(theme) =>
          navbar(theme, { transparentNavbar, absolute, light, darkMode })
        }
        
      >
      <Toolbar sx={(theme) => navbarContainer(theme)} style={{marginTop:-20}}>
        <MDBox
          color="inherit"
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}

        >
      {/*  <Breadcrumbs
      useDefaultStyle={true}
      replaceCharacterList={[{ from: ".", to: " " }]}
    /> */}
           <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={light}
          /> {/* 
          <IconButton
            sx={navbarDesktopMenu}
            onClick={handleMiniSidenav}
            size="small"
            disableRipple
          >
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton> */}
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/*  <MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox>  */}
{user && 
<>
<MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }} style={{textAlign:'left',marginRight:20 ,color:"#FFFFFF"}}>
 {user.name}
</MDTypography>{/* 
         <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }} style={{textAlign:'left',marginRight:20}}>
          {user.email}
        </MDTypography> */}
        </>
        }
{user && user.avatar ? 
  <Tooltip title={"User Profile"} placement="top">
  <IconButton
  size="small"
  disableRipple
  color="inherit"
  
  onClick={()=>{router.push('/profile-settings')}}
>
        <MDBox mr={2}>
          <MDAvatar alt={user.name} src={user.avatar} shadow="md" />
        </MDBox>
        </IconButton>
        </Tooltip>:
        <Tooltip title={"User Profile"} placement="top">
        <IconButton
        size="small"
        disableRipple
        color="inherit"
        
        onClick={()=>{router.push('/profile-settings')}}
      >
        <MDBox mr={2}>
          <MDAvatar  src={team1.src} shadow="md" />
        </MDBox>
        </IconButton>
        </Tooltip>
        }
            <MDBox color={light ? "inherit" : "inherit"}>
              {/* 
           
<MDBadge badgeContent={9} color="error" size="xs" circular style={{marginRight:20}}>
<MDButton variant="gradient" color="white"  sx={navbarIconButton} iconOnly  onClick={()=>{
            handleOpenMenu()
           }}>
  <Icon>notifications</Icon>
</MDButton>
</MDBadge>&nbsp;&nbsp; */}
<Tooltip title={"Signout"} placement="top">
<MDButton variant="gradient" color="error"  sx={navbarIconButton} iconOnly onClick={()=>{
            handleLogout()
           }}>
  <Icon>logout</Icon>
</MDButton>
</Tooltip>
          
              {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
               */}
               {/* 
               <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton> */}
              {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <MDBadge badgeContent={9} color="error" size="xs" circular>
                  <Icon sx={iconsStyle}>notifications</Icon>
                </MDBadge>
              </IconButton> */}
              {/* {renderMenu()} */}

            </MDBox>
          </MDBox>
        )}
      </Toolbar>
      <Card style={{backgroundColor:"#f7c6ad",marginLeft:50,marginRight:50,marginTop:-30,borderColor:"#fd7e14"}}>
<MDBox display="flex" justifyContent="space-between" >
<Icon sx={{ mt: 2, mb: 1, ml: 2 }}>notifications</Icon>

<MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }} style={{textAlign:'center',fontWeight:400}}>
          Oops, we are missing some of your information, please fill them now.
        </MDTypography> 
        <Icon sx={{ mt: 2, mb: 1, ml: 2, mr:2 }}>close</Icon>

</MDBox>
      </Card>
      </MDBox>
    
    
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;


  {/* <AppBar
      position={absolute ? "absolute" : navbarType}
      style={{ backgroundColor: "#ced4da", height:180}}
      
       sx={(theme) =>
        navbar(theme, { transparentNavbar, absolute, light, darkMode })
      } 
    > */}
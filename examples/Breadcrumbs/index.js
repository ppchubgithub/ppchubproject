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
import { useEffect } from "react";
import Link from "next/link";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { useRouter } from 'next/router';

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from "@mui/material";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import {useWorkspaceStore} from "../../pages/workspaces";
import { useContainerStore } from "../../pages/workspace/settings";
import {create} from 'zustand';

const usePreviousRoute = create((set) => ({
  prevPathname: "/workspaces",
  setCurrentRouteName: (name) => set((state) => ({ prevPathname: state.currentRouteName, currentRouteName: name })),
}));

function Breadcrumbs({ icon, title, route, light }) {
  const routes = route.slice(0, -1);
  const router = useRouter();
  let workspacename = useWorkspaceStore(state => state.workspacename);
  let containername = useContainerStore(state => state.containername);


  console.log(`workspacename for breadcrump is ....................................${workspacename}`)

  const { prevPathname, setCurrentRouteName } = usePreviousRoute();

useEffect(() => {
  setCurrentRouteName(router.asPath);
  router.events.on('routeChangeComplete', () => {
    setCurrentRouteName(router.asPath);
  }); 
}, [router.asPath]);

  //const { setPrevPathname,prevPathname } = usePreviousRouteStore();
 /*  useEffect(() => {
    
     
    const handleRouteChange = () => {
      setPrevPathname(prevPathname ? prevPathname : router.asPath);
    };
    //handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange); 
  }, [router.asPath]);
  */
 
  let backpath = ''
  function getStringAfterEqualBeforeAmpersand(str) {
    const equalIndex = str.indexOf('/');
    const ampersandIndex = str.indexOf('?');
  
    // Check if both delimiters exist
    if (equalIndex !== -1 && ampersandIndex !== -1 && equalIndex < ampersandIndex) {
      // Extract the substring starting after the equal sign (index + 1)
      // and ending before the ampersand (index)
      return str.substring(equalIndex + 1, ampersandIndex);
    } else {
      // Handle cases where delimiters are not found or in the wrong order
      return ''; // Or return a default value as needed
    }
  }
  if(prevPathname!==null){
    backpath = getStringAfterEqualBeforeAmpersand(router.pathname)
  }
//console.log(`route in breadcrump is ............${JSON.stringify(route)} prevPathname ${prevPathname} title is ${title}`) 
  return (
    <MDBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: "#FFFFFF"
          },
        }}
      >
        <Link href="/workspaces">
          <MDTypography
            component="span"
            variant="title"
            color={"white"}
            fontSize={30}
            //style={{color:"#17845D"}}
            opacity={light ? 1.8 : 1.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </MDTypography>
        </Link>
        
 {
 prevPathname!==undefined && route!==backpath && 
 prevPathname.includes("/sgtm-templates/sgtm-tags") ?null:

 prevPathname!==undefined && route!==backpath && 
 prevPathname.includes("/sgtm-templates/sgtm-variables") ?null:

 prevPathname!==undefined && route!==backpath && 
 prevPathname.includes("/sgtm-templates/sgtm-clients") ?null:

 prevPathname!==undefined && route!==backpath && 
 prevPathname.includes("/sgtm-templates/web-gtm-tags") ?null:

 prevPathname!==undefined && route!==backpath && 
 prevPathname.includes("/sgtm-templates/web-gtm-variables") ?null:

 prevPathname!==undefined && route!==backpath && 
 prevPathname.includes("/jsontemplate-gallery/saas") ?null:

 prevPathname!==undefined && route!==backpath && 
 prevPathname.includes("/jsontemplate-gallery/ecommerce") ?null:
 prevPathname!==undefined && route!==backpath && 
 prevPathname.includes("/workspace/container/serverboosts") ?null:
 prevPathname!==undefined && route!==backpath && 
 prevPathname.includes("/workspaces") && router.pathname==="/workspace/subscription"?null:
 prevPathname!==undefined && route!==backpath && 
 prevPathname.includes("/workspaces") && router.pathname==="/profile-settings"?null:
 prevPathname!==undefined && route!==backpath &&
 router.pathname!=="/workspaces" && router.pathname!=="/workspace/settings" && prevPathname!==router.asPath && 
        <Link href={prevPathname}>
          <MDTypography
            component="span"
            variant="title"
            color={"white"}
            fontSize={18}
            fontWeight="bold"
            //style={{color:"#17845D"}}
            opacity={light ? 1.8 : 1.5}
            sx={{ lineHeight: 0 }}
          >
           {prevPathname.includes("/workspace/settings")?workspacename!==""?workspacename:"Workspace Details":prevPathname.includes("/workspace/container")?containername!==""?containername:"Container Details":prevPathname.includes("/workspace/subscription") ?workspacename!==""?workspacename:"Subscription Details":prevPathname.includes("/profile")?"Profile":null}
            
            
          </MDTypography>
        </Link>} 
        {/* {routes.map((el) => (
          <Link href={`/${el}`} key={el}>
            <MDTypography
              component="span"
              variant="button"
              fontWeight="bold"
              fontSize={14}
              textTransform="capitalize"
              color={"white"}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {el}
            </MDTypography>
          </Link>
        ))}
         */}
        <MDTypography
          variant="button"
          fontWeight="bold"
              fontSize={18}

          textTransform="capitalize"
          style={{color:"#FFFFFF"}}
          //color="#17845D"
          //</MuiBreadcrumbs>color={light ? "white" : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {title==="settings"?workspacename!==""?workspacename:"Workspace Details":title==="container"?containername!==""?containername:"Container Details":title==="subscription"?workspacename!==""?`${workspacename} Subscription`:"Subscription Details":title==="profile-settings"?"Profile Settings":title.replace("-", " ")}
        </MDTypography>
      </MuiBreadcrumbs>
     {/*  <MDTypography
      style={{marginTop:20,marginBottom:20}}
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        color={light ? "white" : "dark"}
        noWrap
      >
        {title.replace("-", " ")}
      </MDTypography> */}
    </MDBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;

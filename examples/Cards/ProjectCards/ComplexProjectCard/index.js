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

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import MDAvatar from "/components/MDAvatar";

// Custom styles for ComplexProjectCard
function ComplexProjectCard({
  color,
  image,
  title,
  dateTime,
  description,
  members,
  dropdown,
  
}) {
  const renderMembers = members.map((member, key) => {
    const memberKey = `member-${key}`;

    return (
      <MDAvatar
        key={memberKey}
        src={member.src || member}
        alt="member profile"
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    );
  });

  

  return (
    
    <Card style={{width:"100%"}}>
      <MDBox p={2}>
        <MDBox display="flex" alignItems="center">
          <MDAvatar
            src={image.src || image}
            alt={<a href="https://www.flaticon.com/free-icons/seo-and-web" title="seo and web icons">Seo and web icons created by Pixel perfect - Flaticon</a>}
            size="xl"
            variant="rounded"
            bgColor={color}
            sx={{
              p: 1,
              mt: -6,
              borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
            }}
          />
          <MDBox ml={3} mt={-1} lineHeight={0}>
          
            <MDTypography
              variant="h6"
              textTransform="capitalize"
              fontWeight="medium"

            >
              {title}
            </MDTypography>
            {members.length > -1 ? (
              <MDBox display="flex">{renderMembers}</MDBox>
            ) : null}
          </MDBox>
          {dropdown && (
            <MDTypography
              color="secondary"
              onClick={dropdown.action}
              sx={{
                ml: "auto",
                mt: -1,
                alignSelf: "flex-start",
                py: 1.25,
              }}
            >
              <Icon
                fontSize="default"
                sx={{ cursor: "pointer", fontWeight: "bold" }}
              >
                more_vert
              </Icon>
            </MDTypography>
          )}
          {dropdown.menu}
        </MDBox>
        <MDBox my={2} lineHeight={1}>
          <MDTypography variant="button"z fontWeight="light" color="dark" style={{fontWeight:400}}>
            {description}
          </MDTypography>
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {members ? (
            <MDBox display="flex" flexDirection="column" lineHeight={0}>
              <MDTypography variant="button" fontWeight="medium">
                {members[0]} of {members[1]}
              </MDTypography>
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="secondary"
              >
                Containers Used
              </MDTypography>
            </MDBox>
          ) : null}
          {dateTime ? (
            <MDBox display="flex" flexDirection="column" lineHeight={0}>
              <MDTypography variant="button" fontWeight="medium">
                {dateTime}
              </MDTypography>
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="secondary"
              >
                Valid Till
              </MDTypography>
            </MDBox>
          ) : null}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexProjectCard
ComplexProjectCard.defaultProps = {
  color: "dark",
  dateTime: "",
  members: [],
  dropdown: false,
};

// Typechecking props for the ComplexProjectCard
ComplexProjectCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string,
  description: PropTypes.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
    }),
  ]),
};

export default ComplexProjectCard;

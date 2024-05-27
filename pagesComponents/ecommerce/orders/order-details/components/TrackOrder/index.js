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

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO examples
import TimelineItem from "/examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <>
      <MDTypography variant="h6" fontWeight="medium">
        Track order
      </MDTypography>
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
    </>
  );
}

export default OrdersOverview;

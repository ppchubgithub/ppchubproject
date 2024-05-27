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
import React,{ useMemo, useEffect, useState,forwardRef,Fragment } from "react";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import { useRouter } from 'next/router';
import Checkbox from '@mui/material/Checkbox';
import MDAlert from "/components/MDAlert";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import dayjs from 'dayjs';
import Link from "next/link";
import { Authenticated  } from "../../../pagesComponents/authenticated";
//import styled from "styled-components";
import {
  CircularProgress,
  Button,
  styled,
  Slide,
  Dialog,
  IconButton,
  CardActionArea,
  alpha
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import visaCardLogo from "/assets/images/logos/visa.png";
import Image from "next/image";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";
import Divider from "@mui/material/Divider";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SellIcon from '@mui/icons-material/Sell';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StyleIcon from '@mui/icons-material/Style';
import Radio from '@mui/material/Radio';
import {useTheme} from '@mui/material';
import TimelineItem from "/examples/Timeline/TimelineItem";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MDSnackbar from "/components/MDSnackbar";
import MDBadge from "/components/MDBadge";
import Loadingimg from "/assets/images/icons/loading.gif";
import { encode, decode } from 'js-base64';
import { Base64 } from 'js-base64';
import DangerousIcon from '@mui/icons-material/Dangerous';

import MDProgress from "/components/MDProgress";

import {
  PaymentElement,
  
  LinkAuthenticationElement,
  useStripe,
  useElements,
  
} from "@stripe/react-stripe-js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from "@mui/material/Switch";
// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";
import Menu from "@mui/material/Menu";

import ReportsBarChart from "/examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "/examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "/examples/Cards/StatisticsCards/ComplexStatisticsCard";
import BookingCard from "/examples/Cards/BookingCard";
import MDButton from "/components/MDButton";
import {useAuth} from '../../../hooks/useAuth';
import { isLoaded,isEmpty,useFirebase } from 'react-redux-firebase';
import _ from 'lodash';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {
  Column,
  ExpandedState,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  createColumnHelper,
  getSortedRowModel,
  SortingState,
  flexRender
} from '@tanstack/react-table';
// Anaytics dashboard components
import SalesByCountry from "/pagesComponents/dashboards/analytics/components/SalesByCountry";
import Autocomplete from "@mui/material/Autocomplete";
import MDInput from "/components/MDInput";

// Data
import reportsBarChartData from "/pagesComponents/dashboards/analytics/data/reportsBarChartData";
import reportsLineChartData from "/pagesComponents/dashboards/analytics/data/reportsLineChartData";

import {useGetPricesDataQuery,useGetWorspacesDataQuery,useSetupdateworkspaceMutation,useSetcreatecontainerMutation,useSetCancelSubscriptionAtEndMutation,useGetContainerDataQuery,useSetSubscriptionMutation,useSetUpdateSubscriptionMutation,useSetCancelSubscriptionMutation,useGetPaymentintentDataQuery} from '../../../services/hasuraquerydata';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import ConfettiExplosion from 'react-confetti-explosion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InputLabel from '@mui/material/InputLabel';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';

// NextJS Material Dashboard 2 PRO components
import MasterCard from "/examples/Cards/MasterCard";
import DefaultInfoCard from "/examples/Cards/InfoCards/DefaultInfoCard";

import masterCardLogo from "/assets/images/logos/mastercard.png";
import visaLogo from "/assets/images/logos/visa.png";
// Billing page components
import BaseLayout from "/pagesComponents/pages/account/components/BaseLayout";
import PaymentMethod from "/pagesComponents/pages/account/billing/components/PaymentMethod";
import BillingInformation from "/pagesComponents/pages/account/billing/components/BillingInformation";
import Transactions from "/pagesComponents/pages/account/billing/components/Transactions";

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


const Styles = styled(MDBox)(()=>(
  `
padding: 1rem;



table {
  border-spacing: 0;
  border: 1px solid #a6a6a6;

  display:block;


  overflow-y: hidden;
  overflow-x: auto;
  flex-direction: row;
  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th{
    {
      top: 10;
      position: sticky;
      color:#44a574;
      background-color:#FFFFFF;
      margin: 0;
      color:"#17845D";
      padding: 0.5rem;
      border-bottom: 1px solid #a6a6a6;
      border-top: 1px solid #a6a6a6;
      border-right: 1px solid #a6a6a6;
      
      white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
      :last-child {
        border-right: 1px solid #a6a6a6;
      }
      
    }
  }
  td {
    margin: 0;
    padding-top: 0.2rem;
    padding-bottom:0.2rem;
    padding-left:0.5rem;
    padding-right:0.5rem;
    border-bottom: 1px solid #a6a6a6;
    border-top: 1px solid #a6a6a6;
    border-right: 1px solid #a6a6a6;
    text-align:center;
    width: 300px; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    :hover{
      overflow: visible;
    }
    line-height:0.8px;
    :last-child {
      border-right: 0;
      text-align:center;
    }
    
  }
}

`));

function WorkspaceTable({ columns, data,sorting,setSorting,loading
  
}) {

 /* const [selected, setSelected] = React.useState(
   initialState?.rowSelection || {}
 ); */

 //const [expanded, setExpanded] = React.useState({})
 const theme = useTheme();

 //const [sorting, setSorting] = React.useState([])


 const ref = React.useRef(null);

 
const table = useReactTable({
 data,
 columns,
 
 state: {
   sorting
 },
 getSubRows: row => row.subRows,
 getCoreRowModel: getCoreRowModel(),
 enableSorting:true,
 //manualSorting: true,
 onSortingChange: getSortedRowModel(),
 enableMultiSort:false,
 enableSortingRemoval:true,
 //getPaginationRowModel: getPaginationRowModel(),
// getFilteredRowModel: getFilteredRowModel(),
 getExpandedRowModel: getExpandedRowModel(),
 onPaginationChange: getPaginationRowModel(),
 //manualPagination: true,

 autoResetExpanded:true,
 debugTable: true,
 paginateExpandedRows:true,
 autoResetPageIndex:false
//paginateExpandedRows:false
 //manualExpanding:true
})

const tableContainerRef = React.useRef(null)
const handleRowClick = (row,event ) => {
 if (rowSelecting) {
   logger.debug(`selected row is ${JSON.stringify(row)}`)
   row.toggleSelected();
 }

 return { row, event };
}; 
const [selectcolumns,setselectcolumns]=React.useState(false);
const { rows } = table.getRowModel()

return (
 <>
 
  <div className="p-2" >
  
   <div className="h-2" />
   {loading?<CircularProgress/>:null}
   <table width="100%">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan} style={{color:"#17845D",fontSize:16,width:header.width}}>
                    {header.isPlaceholder ? null : (
                      <div style={{marginTop:10,marginBottom:10}}
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (<ArrowDropUpIcon style={{color: theme.palette.primary.main,marginBottom:-10}} fontSize="large"/>),
                          desc: (<ArrowDropDownIcon style={{color: theme.palette.primary.main,marginBottom:-10}} fontSize="large"/>),
                        }[header.column.getIsSorted()] ?? null}
                        {/* {header.column.getCanFilter() ? (
                          <div>
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null} */}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
    
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <Fragment key={row.id}>
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id} style={{fontSize:16,fontWeight:500}}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      
                    </td>
                  )
                })}
              </tr>
               {row.depth===0 && row.getIsExpanded() && (
                <tr>
                  
                  <td colSpan={row.getVisibleCells().length}>
                    {renderSubComponent({ row })}
                  </td>
                </tr>
              )} 
              </Fragment>
            )
          })}
        </tbody>
      </table>



 </div>
 
  </>
  )
}

const CardBorderTop = styled(Card)(
  () => `
        border-top: transparent 5px solid;
  `
);

const CardActionAreaWrapper = styled(CardActionArea)(
  ({ theme }) => `
        text-align: center;
        background: ${alpha("#f0f2f5", 0.03)};

        .MuiTouchRipple-root {
          opacity: .2;
        }
  
        .MuiCardActionArea-focusHighlight {
          background: #f0f2f5;
        }
  
        &:hover {
          .MuiCardActionArea-focusHighlight {
            opacity: .05;
          }
        }
  `
);
  
const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);
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
const CustomCheckbox = styled(Radio)(() => ({
  "& .MuiCheckbox-root": {
    color: "#e91e63", // Use theme colors
  },
  "&.Mui-checked": {
    color: "#007d00", // Change color on check
    backgroundColor:"#007d00"
  },
  "&.Mui-focused": {
    color: "#007d00", // Change color on check
    backgroundColor:"#007d00"
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});



function SubscriptionDetails() {
  const router = useRouter();
  const stripe = useStripe();
  const workspaceid = router.query.workspaceid;
  const paymentstatus = router.query.paymentstatus;
  const subupdateplan = router.query.subupdateplan;
  const subplanchange = router.query.subplanchange;
  const redirect_status = router.query.redirect_status;
  const payment_intent = router.query.payment_intent;
  const { user, logout, signInWithEmailAndPassword } = useAuth();
  const { width, height } = useWindowSize()
const [gtm,setgtm] = useState('');
  const [datastate,setdatastate] = useState();
  const [polling,setpolling]=useState(true);
  const [paymentloading,setpaymentloading] = useState(false);

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const {data:pricesdata,isLoading:pricesdataloading,isSuccess:pricesdatasuccess}= useGetPricesDataQuery({},{
    
    skip:isEmpty(user),
    refetchOnMountOrArgChange: true,
    skip: false,
   });
   console.log(`pricesdata is ${JSON.stringify(pricesdata)}`)
   const [workspacesdatastate,setworkspacesdatastate] = useState();
  const { data: workspacesdata, isLoading:workspacesloading,isSuccess:workspacedatasuccess} = useGetWorspacesDataQuery({
    workspaceid:workspaceid
  },{
    skip:isEmpty(user),
    refetchOnMountOrArgChange: true,
    //pollingInterval: polling?5000:0,
    pollingInterval: 3000,
    skipPollingIfUnfocused: true,
    skip: false,
  })
  
  console.log(`workspacedata is ${JSON.stringify(workspacesdata)}`)
  React.useEffect(()=>{
if (workspacesdata) {
  
  const tempdata = _.cloneDeep(workspacesdata)
  setworkspacesdatastate(tempdata);
  if(workspacesdata.workspaces[0].workspace_subscriptions){
    if(workspacesdata.workspaces[0].workspace_subscriptions.stripe_subscription_status==="active"){
      setpaymentloading(false)
    }
    if(!amountselected){

    
  setSelectedValue(workspacesdata.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.productname)
    }
  if(workspacesdata.workspaces[0].workspace_subscriptions.subscription_request && workspacesdata.workspaces[0].workspace_subscriptions.subscription_request.status==="completed" ){
    setpaymentloading(false)
  }
  }
  else{
    setSelectedValue('free')
  }
  let tempworkspace_array =[];
  let tempworkspace = {};
  tempdata.workspaces.map(workspace=>{
    
tempworkspace={
  id:workspace.workspaceid,
  name:workspace.workspacename
}
tempworkspace_array.push(tempworkspace)
  })

console.log(`tempworkspace_array is ...................${JSON.stringify(tempworkspace_array)}`)
       setdatastate(tempworkspace_array);
    
    } 
    
  
   },[workspacesdata]);

   const [seteditworkspace,{ data:seteditworkspacedata, isLoading:seteditworkspaceloading }] = useSetupdateworkspaceMutation();
  React.useEffect(()=>{

   if (seteditworkspacedata) {
     
     console.log(`seteditworkspacedata data is ..............................${JSON.stringify(seteditworkspacedata)}`)
     if(seteditworkspacedata.update_workspaces.affected_rows>0){
      router.push({pathname:'/workspace/settings',query:{workspaceid:workspaceid}})
     }
     
     
   }},[seteditworkspacedata]);
 

   const [subscriptionrunning,setsubscriptionrunning]=useState(false)
   const [couponname,setcouponname] = useState('ytehf');

 const [canceltype,setcanceltype] = useState()
   const [cancelsubscriptions, setcancelsubscription] = useState(false);
   const openCancelSubscription = () => setcancelsubscription(true);
   const closeCancelSubscription = () => setcancelsubscription(false);


   const [updatesubscriptions, setupdatesubscription] = useState(false);
   const openUpdateSubscription = () => setupdatesubscription(true);
   const closeUpdateSubscription = () => setupdatesubscription(false);

   const [setsubscriptions,{ data:setsubscriptionsdata, isLoading:setsubscriptionsdataloading }] = useSetSubscriptionMutation();


React.useEffect(()=>{
  if(setsubscriptionsdataloading){
    setsubscriptionrunning(true)
  }

  if (setsubscriptionsdata) {
    setsubscriptionrunning(false)
    console.log(`subscription data is ..............................${JSON.stringify(setsubscriptionsdata)}`)
    if(setsubscriptionsdata.subscriptions.status===true){
      setpaymentloading(true)
    console.log(`moving to stripeindex`)
    if(setsubscriptionsdata.subscriptions.default_payment_method===true ){

      stripe
    .confirmCardPayment(setsubscriptionsdata.subscriptions.str_clientsecret)
    .then(function(result) {
      
    setTimeout(()=>{
      setpaymentloading(false)
    },10000)
      console.log(`create subscription confirm payment ${JSON.stringify(result)}`)
      if(result.paymentIntent.status==="succeeded"){
        router.push({pathname:'/workspace/settings',query:{workspaceid:workspaceid,paymentstatus:"success"}})
        //setpaymentloading(false)
      }
     
     
    });
    setTimeout(()=>{
      setpaymentloading(false)
    },30000)
    }
    else{
    router.push({ pathname: '/workspace/purchase-subscription', query: { from: 'create',subscriptionid: workspacesdata.workspaces[0].stripe_subscription_id,workspaceid:workspaceid} })
    }
  }
    setpolling(true)
    //router.push({ pathname: '/stripeindex', query: { clientSecret: "pi_3Nxm6tLWdnOC3Wy81BfyUX6H_secret_GAnj498pro8NVjvVpro92l89y" } })

    //setcustomerid(customersdata.googlecustomerclients[0].gcustomerclientid);
   // settimezone(customersdata.googlecustomerclients[0].timezone);
   // setcurrency(customersdata.googlecustomerclients[0].currencycode);
   
  }},[setsubscriptionsdata]);

  const [updatesubscription,{ data:updatesubscriptiondata,error:errorupdatesubscription,isSuccess:successupdatesubscription, isLoading:updatesubscriptionloading }] = useSetUpdateSubscriptionMutation();

  const [cancelsubscription,{ data:cancelsubscriptiondata,error:errorcancelsubscription,isSuccess:successcancelsubscription, isLoading:cancelsubscriptionloading }] = useSetCancelSubscriptionMutation();
  
React.useEffect(()=>{
  if(cancelsubscriptiondata){
    setsubscriptions({
      planid:priceid,
      accountid:workspacesdatastate.workspaces[0].accountid,
      workspaceid:workspaceid,
      couponcode: couponname
  })
  }

},[cancelsubscriptiondata])

const [updateplan,setupdateplan] = useState(subupdateplan);
React.useEffect(()=>{
    if(subupdateplan){
        setupdateplan(true);
    }
},[subupdateplan])
console.log(`update state is subupdateplan ${subupdateplan} updateplan ${updateplan}`)
const [confirmupdate,setreconfirmupdate] = useState(false);
const [updatestatus,setupdatestatus] = useState();
console.log(`updatestatus is $$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ${updatestatus}`)
const [reconfirm,setreconfirm] = useState(false);
const [payment,setpayment] = useState("")

React.useEffect(()=>{

  if (updatesubscriptiondata) {

    /* if(true){
      router.push({ pathname: '/workspace/purchase-subscription', query: { from: 'update',subscriptionid: workspacesdata.workspaces[0].stripe_subscription_id} })
    }
     */
   // openUpdateSubscription()
   if(workspacesdata && payment==="incomplete" || canceltype==="changeplan"){
    //router.push({ from:"update" ,pathname: '/workspace/purchase-subscription', query: {subscriptionid: workspacesdata.workspaces[0].stripe_subscription_id,workspaceid:workspaceid} })
   }
   else{
   if(workspacesdata && workspacesdata.workspaces[0].workspace_subscriptions && workspacesdata.workspaces[0].workspace_subscriptions.subscription_request){
    
    if(workspacesdata.workspaces[0].workspace_subscriptions.subscription_request.status==="waiting"){
      console.log(`update payment request in waiting`)
      
      setupdatestatus(workspacesdata.workspaces[0].workspace_subscriptions.subscription_request.status);
      setreconfirmupdate(true)
      
    console.log(`moving to stripeindex`)
    
    //openUpdateSubscription()
    }
    else if(workspacesdata.workspaces[0].workspace_subscriptions.subscription_request.status==="paymentfailed" && workspacesdata.workspaces[0].workspace_subscriptions.subscription_request.payment_intent_status==="requires_action"){
      console.log(`update payment request failed `)
      setupdatestatus(workspacesdata.workspaces[0].workspace_subscriptions.subscription_request.status)
      setreconfirmupdate(false)
    }
    else if(workspacesdata.workspaces[0].workspace_subscriptions.subscription_request.status==="completed"){
      setupdatestatus('')
      //setreconfirmupdate(true)
      router.push({pathname:'/workspace/settings',query:{workspaceid:workspaceid,paymentstatus:"success"}})
    }
  }
}
        setupdateplan(false);

   
      /* if(workspacesdata.workspaces[0].workspace_subscriptions.stripe_paymentintents.stripe_receipt_url===null){
        stripe
        .confirmCardPayment(workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_paymentintents.stripe_clientsecret)
        .then(function(result) {
          console.log(`update subscription confirm payment ${JSON.stringify(result)}`)
        }); 
          
      } */
  }},[updatesubscriptiondata,workspacesdata,workspacesdatastate]);
  
React.useEffect(()=>{

  if (cancelsubscriptiondata) {

    
    
    openCancelSubscription()
setPlanchange(false);
setsubscriptions({
  planid:priceid,
  accountid:workspacesdatastate.workspaces[0].accountid,
  workspaceid:workspaceid,
  couponcode:couponname
})

  }},[cancelsubscriptiondata]);

  const [cancelsubscriptionatend,{ data:cancelsubscriptionatenddata}] = useSetCancelSubscriptionAtEndMutation();

  const [cancelatend,setcancelatend] = useState(false)
React.useEffect(()=>{

  if (cancelsubscriptionatenddata && cancelsubscriptionatenddata.cancelsubscriptionatend.status===true) {

 console.log(`cancelsubscriptionatenddata is ${JSON.stringify(cancelsubscriptionatenddata)}`)
   setcancelatend(true)
   //handleclosecancelconfirm()
   setopencanceldialog(false)
   
  }},[cancelsubscriptionatenddata]);

  const [rowid,setrowid] = useState('')

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    
  };
  const [openDialog2, setOpenDialog2] = useState(false);
  const handleOpenDialog2 = () => {
    setOpenDialog2(true);
  };
  const handleCloseDialog2 = () => {
    setOpenDialog2(false);
    
  };
 
  const [timeline, settimeline] = useState(1);
  const [autoupgrade, setautoupgrade] = useState(false);
  const [period, setPeriod] = useState('');
  //const [selectedValue, setSelectedValue] = useState(workspacesdatastate?workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.productname:'free');
  const [selectedValue, setSelectedValue] = useState('free');
  const [amountselected,setamountselected] = useState(false);
  console.log(`selected value is ${selectedValue}` )
  const [priceid, setpriceid] = useState('');
  
  const handleUpgradeChange = (event) => {
    setautoupgrade(event.target.checked);
  };
  const handleCheckChange = (event) => {
    setSelectedValue(event.target.value);
    
  };

  const [planchange,setPlanchange] = useState(subplanchange);
  React.useEffect(()=>{
    if(subplanchange){
        setPlanchange(true)
    }


  })

  const [moredetails,setmoredetails] = useState(false)

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };


  const [opencanceldialog, setopencanceldialog] = useState(false);
  const handleopencancelconfirm = () => {
    setopencanceldialog(true);
  };
  const handleclosecancelconfirm = () => {
    setopencanceldialog(false);
    
  };

  
  const [placevalue, setPlaceValue] = useState(null);

  const [showcarddetails,setshowcarddetails] = useState(false)
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
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
      <MDButton
       // onClick={()=>router.push({ pathname: '/workspace/subscription', query: { workspaceid: workspaceid } })}
        onClick={()=>{
          //setupdateplan(true)
          setcanceltype('cancel')
          handleopencancelconfirm();
          handleCloseMenu()
          
        }} 
        size="small"
        variant="contained"
        color="error"
      >
        
       Cancel Subscription
      </MDButton> 
    </Menu>
  );
  return (
    <Authenticated>
       
    <DashboardLayout>
     
    <DashboardNavbar />
    <MDSnackbar
      color="success"
      icon="check"
      title="You Subscription Plan Changed"
      //content="Container Created Successfully"
     // dateTime="11 mins ago"
      open={cancelsubscriptions}
      onClose={closeCancelSubscription}
      close={closeCancelSubscription}
      bgSuccess
    />
    <MDSnackbar
      color="success"
      icon="check"
      title="Subscription Updated"
      //content="No of container limit exceeded"
      //dateTime="11 mins ago"
      open={updatesubscriptions}
      onClose={closeUpdateSubscription}
      close={closeUpdateSubscription}
      bgError
    />
          <DialogWrapper
        open={opencanceldialog}
        maxWidth="lg"
        //width="800"
        
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>{
          handleclosecancelconfirm()
        }}
      >

<MDBox my={2} style={{height:"200px",width:"500px"}}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} lg={12}>
            <MDBox display="flex" justifyContent="center" alignItems="center">
<MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
Are you sure you want to cancel subscription        </MDTypography>
            </MDBox>
            <Divider variant="fullWidth"/>
            <MDBox display="flex" justifyContent="center" alignItems="center" style={{marginTop:30}}>
            
         <MDBox>

<MDButton

onClick={()=>{
handleclosecancelconfirm();

}}
size="small"
variant="outlined"
color="error"
>

No
</MDButton>&nbsp;&nbsp;&nbsp;&nbsp;

<MDButton

onClick={()=>{
  cancelsubscriptionatend({
            
  workspaceid:workspaceid,
  canceltype:'cancel'
})
setopencanceldialog(false)
//handleclosecancelconfirm()
}}
size="small"
variant="gradient"
color="error"

type="submit"

>

Yes

</MDButton>
</MDBox>

                        </MDBox>
                  
            
            </Grid>
            </Grid>
            </MDBox>
        </DialogWrapper>

      <DialogWrapper
        open={confirmupdate}
        maxWidth="lg"
        //width="800"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>{
          setreconfirmupdate(false)
        }}
      >

<MDBox my={2} style={{height:"200px"}}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} lg={12}>
            {updatestatus==="waiting" ? 
            <MDBox>
            <MDBox display="flex" justifyContent="center" alignItems="center">
<MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
          We are processing your update request, Please waite
        </MDTypography>
            </MDBox>
            <MDBox display="flex" justifyContent="center" alignItems="center" style={{marginTop:10}}>
            <CircularProgress style={{color:"#17845D"}}/> 
                        </MDBox>
                        </MDBox>
            :null}
            
            </Grid>
            </Grid>
            </MDBox>
        </DialogWrapper>

    {/* 
    <Confetti
  width={width}
  height={height}
  tweenDuration={1000}
/> */}
 {paymentstatus==="success" &&  
<ConfettiExplosion 
width={5000}
height={height}
particleSize={10}
particleCount={500}
duration={3000}
/>}
    {cancelatend?<MDAlert color="success" dismissible>
    <Icon fontSize="small">thumb_up</Icon>&nbsp;
  <MDTypography variant="body2" color="white">
Your Subscription is canceled, it will be valid till {""}
<MDTypography
component="a"
href="#"
variant="body2"
fontWeight="medium"
color="white"
>

{dayjs(workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_enddate).format('MMMM, DD, YYYY')}
</MDTypography>

</MDTypography>
</MDAlert>:null}




      { workspacesloading || paymentloading? 
      <Card width="100%" style={{marginTop:50,marginBottom:30}}>
        <MDBox
       
        display="flex"
        justifyContent="center"
        alignItems="center"
        
        style={{marginTop:100,marginBottom:100}}
      >
        
        <CircularProgress style={{color:"#17845D"}}/> 
       
        </MDBox>
        </Card>:workspacesdatastate && 
      <>
       <MDBox mt={4}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={12}>
                <Card>
                {workspacesdatastate && workspacesdatastate.workspaces[0].stripe_subscription_id===null && workspacesdatastate.workspaces[0].plantype==="free"?
                <>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center">
                    <MDBox p={3} lineHeight={1} style={{marginLeft:10}}>
              <MDTypography variant="h5" fontWeight="medium" style={{marginLeft:10}}>
              {workspacesdatastate.workspaces[0].workspacename}
              </MDTypography>
              
            </MDBox>
        
          <MDBox display  ="flex" justifyContent="flex-end" alignItems="center" style={{marginTop:5}}>
            
          <MDButton color="success" variant="contained" style={{marginLeft:20}} href="#subscription" size="small"
                  onClick={()=>{
                    setupdateplan(true)
                    
                  }}>Upgrade Subscription</MDButton>
          <IconButton
                          size="large"
                          disableRipple
                          color="inherit"
                          //sx={navbarIconButton}
                          aria-controls="notification-menu"
                          aria-haspopup="true"
                          variant="gradient"
                          onClick={handleOpenMenu}
                          
                        >
                          <MoreVertIcon/>
                            
                        
                        </IconButton> 
                         {renderMenu()}&nbsp;&nbsp;&nbsp;
            </MDBox>
            
          </MDBox>
                  
<MDBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={0.1}>
            
          </Grid>
          <Grid item xs={12} md={10}>
            <MDBox display="flex" justifyContent="flex-start" alignItems="center" flexDirection="row">
<MDTypography style={{fontSize:16,fontWeight:500}}>
     Current plan :  
</MDTypography> &nbsp;
<MDTypography style={{fontSize:16,fontWeight:400}}>
     Free 
</MDTypography>
</MDBox>
<MDBox display="flex" justifyContent="space-between" alignItems="center" style={{marginTop:20}}>

<MDTypography style={{fontSize:16,fontWeight:400}}>
Price : 0 $
</MDTypography>

<MDTypography style={{fontSize:14,fontWeight:400}}>
Valit till : {workspacesdatastate.workspaces[0].workspace_freeplan && dayjs(workspacesdatastate.workspaces[0].workspace_freeplan.to).format('MMMM DD YYYY')}
</MDTypography>



<MDTypography style={{fontSize:16,fontWeight:400}}>
Requests : 10000
</MDTypography>


<MDTypography style={{fontSize:14,fontWeight:400}}>
Containers : 1
</MDTypography>

</MDBox>
</Grid>
</Grid>
</MDBox>
          </>
              :  
                
                
              workspacesdatastate && workspacesdatastate.workspaces[0].stripe_subscription_id!==null && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_status==="incomplete" &&
                             <>
                             <MDBadge
                variant="contained"
                color="error"
                size="xs"
                badgeContent={<MDTypography color="error" style={{fontSize:14,fontWeight:600}}><Icon color="error">circle</Icon>{" "}Failed</MDTypography>}
                container
                sx={{ mt: 2, mb: 1, ml: 5 }}
              />
                <MDTypography variant="body" sx={{ mt: 1, mb: 1, ml: 6 }} style={{marginTop:10,marginLeft:40,fontSize:16,fontWeight:500,color:"#F44335"}} >
   Your payment failed, please complete your payment again

</MDTypography></>}
        {workspacesdatastate && workspacesdatastate.workspaces[0].stripe_subscription_id!==null && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_status==="active" &&
                    <>
                             {workspacesdatastate.workspaces[0].workspace_subscriptions.cancel_at_period_end &&
                             <>
                             <MDBadge
                variant="contained"
                color="error"
                size="xs"
                badgeContent={<MDTypography color="error" style={{fontSize:14,fontWeight:600}}><Icon color="error">circle</Icon>{" "}Cancelled</MDTypography>}
                container
                sx={{ mt: 2, mb: 1, ml: 5 }}
              />
                <MDTypography variant="body" sx={{ mt: 1, mb: 1, ml: 6 }} style={{marginTop:10,marginLeft:40,fontSize:16,fontWeight:500,color:"#F44335"}} >
   Your subscription was canceled, it will be ended by {dayjs(workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_enddate).format('MMMM, DD, YYYY')}

</MDTypography></>}

                  <MDBox display="flex" justifyContent="space-between" alignItems="center">
                  <MDBox p={3} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium" style={{marginLeft:15}}>
              {workspacesdatastate.workspaces[0].workspacename}
              </MDTypography>
              
            </MDBox>
        <MDBox display  ="flex" justifyContent="flex-end" alignItems="center" style={{marginTop:5}}>
          
        <MDButton color="success" variant="contained" style={{marginLeft:20}} href="#subscription"
                onClick={()=>{
                  setupdateplan(true)
                  
                }}>Upgrade Subscription</MDButton>
        <IconButton
                        size="large"
                        disableRipple
                        color="inherit"
                        //sx={navbarIconButton}
                        aria-controls="notification-menu"
                        aria-haspopup="true"
                        variant="gradient"
                        onClick={handleOpenMenu}
                        
                      >
                        <MoreVertIcon/>
                          
                      
                      </IconButton> 
                       {renderMenu()}&nbsp;&nbsp;&nbsp;
          </MDBox>
          
        </MDBox>
              
     
                
<MDBox p={2} mt={-2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={0.1}>
            
          </Grid>
          <Grid item xs={12} md={10}>
            <MDBox display="flex" justifyContent="flex-start" alignItems="center" flexDirection="row">
<MDTypography style={{fontSize:16,fontWeight:500}}>
     Current plan :  
</MDTypography> &nbsp;
<MDTypography style={{fontSize:16,fontWeight:400}}>
     {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.productname}
</MDTypography>
</MDBox>
<MDBox display="flex" justifyContent="space-between" alignItems="center" style={{marginTop:20}}>

<MDTypography style={{fontSize:15,fontWeight:500}}>
Price : {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_price_unitamount/100} $
</MDTypography>


<MDTypography style={{fontSize:15,fontWeight:500}}>
Valid till : {dayjs(workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_enddate).format('MMMM DD YYYY')}
</MDTypography>

<MDTypography style={{fontSize:15,fontWeight:500}}>
Requests : {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests<1000000?
            `${workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests/1000}K`:
          `${workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests/1000000}M`  
            }
</MDTypography>


<MDTypography style={{fontSize:15,fontWeight:500}}>
Containers : {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofservers}
</MDTypography>

</MDBox>
</Grid>
</Grid>
</MDBox>

</>}
{workspacesdatastate && workspacesdatastate.workspaces[0].stripe_subscription_id!==null && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_status==="active" && 
<MDBox display="flex" justifyContent="flex-end" alignItems="right">
<IconButton
                        size="large"
                        disableRipple
                        color="info"
                        //sx={navbarIconButton}
                        aria-controls="notification-menu"
                        aria-haspopup="true"
                        variant="gradient"
                        style={{fontSize:16,fontWeight:600}}
                        onClick={()=>setmoredetails(!moredetails)}
                        
                      >
                        more
                        {!moredetails?
                        <ArrowDropDownIcon/>:<ArrowDropUpIcon/>
                          
                        }
                      </IconButton> 
        
</MDBox>}
        {moredetails?
<MDBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={0.1}>
            
          </Grid>
          <Grid item xs={12} md={11}>
        
<Grid container>
  <Grid item lg={3}>
  <MDTypography style={{fontSize:14,fontWeight:400,marginTop:10}}>
<Icon color="info" fontWeight="bold">check</Icon> Large no of words
</MDTypography>

  </Grid>

  <Grid item lg={3}>

<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10}}>
<Icon color="info" fontWeight="bold">check</Icon> Unlimited brand voices
</MDTypography>
</Grid>
<Grid item lg={3}>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10}}>
<Icon color="info" fontWeight="bold">check</Icon>Priority support
</MDTypography>
</Grid>
<Grid item lg={3}>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10}}>
<Icon color="info" fontWeight="bold">check</Icon> Higher quality image
</MDTypography>
</Grid>
<Grid item lg={3}>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10}}>
<Icon color="info" fontWeight="bold">check</Icon> API access
</MDTypography>
</Grid>

<Grid item lg={3}>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10}}>
<Icon color="info" fontWeight="bold">check</Icon> Bulk Processing
</MDTypography>
</Grid>
</Grid>
</Grid>
</Grid>
</MDBox>:null}

      </Card>
                </Grid>
                <Grid item xs={12}>
                {workspacesdatastate && workspacesdatastate.workspaces[0].plantype!=="free" && workspacesdatastate.workspaces[0].workspace_subscriptions && 
                workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_customer!==null && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_customer.card4digits!==null ? 
                <Card id="delete-account">
      <MDBox
        pt={2}
        px={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{marginLeft:25}}
      >
        <MDTypography variant="h6" fontWeight="medium">
          Payment Method Details
        </MDTypography>
        
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={0.1}>
            
          </Grid>
          <Grid item xs={12} md={8}>

{workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_customer!==null && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_customer.card4digits!==null ? 
<>


                      
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox width="10%" mr={1}>

                {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_customer.cardbrand==="visa" || workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_customer.cardbrand==="master"?
                <Image
                src={workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_customer.cardbrand==="visa"?visaLogo:masterCardLogo}
                alt={workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_customer.cardbrand==="visa"?"visa card":"master card"}
                  
                  style={{ width: "100%", height: "100%", display: "block" }}
                />:
                <MDTypography variant="h6" fontWeight="medium">
               {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_customer.cardbrand}
                          </MDTypography>
            }
              </MDBox>
              <MDTypography variant="h6" fontWeight="medium">
                ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;{workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_customer.card4digits}
              </MDTypography>


              <MDTypography variant="h6" fontWeight="medium">
              Expires {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_customer.exp_month}/{workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_customer.exp_year}
              </MDTypography>
              
            </MDBox>
            </>:<MDTypography style={{fontSize:20,fontWeight:600}}>No Payment Found</MDTypography>}
          </Grid>
        </Grid>
      </MDBox>
    </Card>:null}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
            {workspacesdatastate && workspacesdatastate.workspaces[0].plantype!=="free" && workspacesdatastate.workspaces[0].workspace_subscriptions && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_invoices.length>0 && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_invoices[0].stripe_invoice_amountpaid>0&& workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_invoices[0].stripe_invoice_period_start!==null ?
            <Card sx={{ height: "100%" }}>
      <MDBox
        pt={2}
        px={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography variant="h6" fontWeight="medium">
          Invoices
        </MDTypography>
        {/* <MDButton variant="outlined" color="dark" size="small">
          view all
        </MDButton> */}
      </MDBox>
      <MDBox p={2}>
      {workspacesdatastate && workspacesdatastate.workspaces[0].workspace_subscriptions && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_invoices.length>0 && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_invoices[0].stripe_invoice_amountpaid>0&& workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_invoices[0].stripe_invoice_period_start!==null ?
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_invoices.map(invoice=>{
            return(
        <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      key={invoice.stripe_invoice_id}
     // mb={noGutter ? 0 : 1}
    >
      {invoice.stripe_invoice_amountpaid>0 && invoice.stripe_invoice_period_start!==null?
      <>
      <MDBox lineHeight={1.125}>
        <MDTypography display="block" variant="button" fontWeight="medium">
        {dayjs(invoice.stripe_invoice_period_start).format('MMMM, DD, YYYY')}
        </MDTypography>
        
      </MDBox>
      <MDBox display="flex" alignItems="center">
        <MDTypography variant="button" fontWeight="regular" color="text" >
        $ {invoice.stripe_invoice_amountpaid/100}
        </MDTypography>
        <MDBox
          display="flex"
          alignItems="center"
          lineHeight={1}
          ml={3}
          sx={{ cursor: "pointer" }}
        >
            <Link style={{color:"#344767"}} href={workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_paymentintents.stripe_receipt_url?workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_paymentintents.stripe_receipt_url:"#"} target="_blank">
            
          <Icon fontSize="small" color="dark" >picture_as_pdf</Icon>
          <MDTypography variant="button" fontWeight="bold">
            &nbsp;PDF
          </MDTypography>
        </Link>

        </MDBox>
      </MDBox>
      </>:null}
    </MDBox>
    
    )})}
          {/* <Invoice date="March, 01, 2020" id="#MS-415646" price="$180" />
          <Invoice date="February, 10, 2021" id="#RV-126749" price="$250" />
          <Invoice date="April, 05, 2020" id="#QW-103578" price="$120" />
          <Invoice date="June, 25, 2019" id="#MS-415646" price="$180" />
          <Invoice
            date="March, 01, 2019"
            id="#AR-803481"
            price="$300"
            noGutter
          /> */}
        </MDBox>:
        <MDTypography style={{fontSize:20,fontWeight:600}}>No Invoices Found</MDTypography>}
      </MDBox>
    </Card>:null}
            </Grid>
          </Grid>
        </MDBox>
        
      </MDBox>
      <Card width="100%" style={{marginTop:50,marginBottom:30}} id="subscription">


{
        setsubscriptionsdataloading 
        || workspacesloading || paymentloading? 
        <MDBox
       
        display="flex"
        justifyContent="center"
        alignItems="center"
        
        style={{marginTop:100,marginBottom:100}}
      >
        <CircularProgress style={{color:"#17845D"}}/> 
        </MDBox>: 
        workspacesdatastate && 
        workspacesdatastate.workspaces[0].workspace_subscriptions &&
        workspacesdatastate.workspaces[0].workspace_subscriptions.subscription_request &&
        workspacesdatastate.workspaces[0].workspace_subscriptions.subscription_request.status==="paymentfailed"?

        <MDBox>

        <MDBox display="flex" justifyContent="center" alignItems="center" style={{marginTop:30}}>

            <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
          Sorry, your payment failed, please click here to re confirm your payment
        </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="center" alignItems="center" style={{marginBottom:30,marginTop:10}}>
                    <MDButton

            onClick={()=>{
              
              stripe
        .confirmCardPayment(workspacesdata.workspaces[0].workspace_subscriptions.subscription_request.client_secret)
        .then(function(result) {
          console.log(`update subscription confirm payment ${JSON.stringify(result)}`)
          setpaymentloading(true)
        });
            setreconfirmupdate(false);
            setupdatestatus('')
            }}
            size="small"
            variant="gradient"
            color="success"
            >
            {/* <ArrowCircleLeftIcon style={{fontSize:18}}/>&nbsp; */}
            <b style={{marginLeft:10}}>Re Confirm Payment</b>
            </MDButton>

        </MDBox> 
        </MDBox>
        :
<>

{updateplan && workspacesdatastate.workspaces[0].plantype!=="free"?
  <MDTypography variant="body" sx={{ mt: 2, mb: 1, ml: 2 }} style={{marginTop:20,marginLeft:20,fontSize:16,fontWeight:500}} >
Now you are subscribed to {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.productname} {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_price_unitamount/100}$ plan     </MDTypography>
:workspacesdatastate&&workspacesdatastate.workspaces[0].stripe_subscription_id===null ?
<MDTypography variant="body" sx={{ mt: 1, mb: 1, ml: 2 }} style={{marginTop:20,marginLeft:20,fontSize:16,fontWeight:500}} >
No subscription plan has been enabled for this workspace. To enable Server-side tracking for your Server GTM,  please choose a plan that suits your tracking needs.       </MDTypography>
:workspacesdatastate && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_status==="incomplete" || planchange? 
<>
<MDBox display="flex" justifyContent="left" alignItems="left">
<MDTypography variant="body" sx={{ mt: 2, mb: 1, ml: 2 }} style={{marginTop:20,marginLeft:20,fontSize:16,fontWeight:400,color:"#f65f53",fontWeight:500}} >
Payment not complete.
</MDTypography>&nbsp;&nbsp;
<MDBadge style={{marginTop:20,marginLeft:20}}
        variant="contained"
        color="error"
        size="sm"
        badgeContent="Inactive"
        container
      />
</MDBox>

<MDTypography variant="body" sx={{ mt: 2, mb: 1, ml: 2 }} style={{marginTop:20,marginLeft:20,fontSize:16,fontWeight:500}} >
Your selected plan details are.
</MDTypography>
</>
:workspacesdatastate && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_status==="active" &&
null
}
              {
               paymentloading? 
                <MDBox
               
                display="flex"
                justifyContent="center"
                alignItems="center"
                
                style={{marginTop:100,marginBottom:100}}
              >
                <CircularProgress style={{color:"#17845D"}}/> 
                </MDBox>:
                
              workspacesdatastate&&workspacesdatastate.workspaces[0].stripe_subscription_id===null || planchange || updateplan || 
              
              workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_status==="incomplete"?
<>


<Grid container>
<Grid item md={0.2}></Grid>
  <Grid item md={6} style={{marginBottom:20}}>
    <Card mb={5}>
      
  <MDBox mt={3}>
  <Card style={{
    backgroundColor: selectedValue=== "free" ? '#ECECEC' : null,marginTop:10,marginBottom:10
  }} onClick={()=>setSelectedValue('free')}>
    <MDBox style={{marginTop:10,marginBottom:10
}}>
                      <Grid container spacing={1}>
                       <Grid item xs={12} md={6} lg={1}>
                       {/*  <CurrencyExchangeIcon color="success" style={{marginTop:10}}/> */}
                        </Grid> 
                        <Grid item xs={12} md={6} lg={6}>
                      <MDTypography variant="button" style={{fontSize:18,fontWeight:500}}>
                        Free
                        </MDTypography>
         <MDTypography variant="body2" color="text" style={{fontSize:14,fontWeight:400}}>
         10000 requests | 1 containers
        </MDTypography> 
        </Grid>
        <Grid item xs={12} md={6} lg={3} style={{marginTop:10}}>
        <MDTypography variant="button" style={{color:"#000000",fontSize:24,fontWeight:600,marginLeft:10,marginTop:10}}>
                        Free
                        </MDTypography>
                        </Grid>
                      
        <Grid item xs={12} md={6} lg={2} style={{marginTop:10}}><CustomCheckbox defaultChecked style={{marginLeft:12}} onChange={()=>{
          setSelectedValue('free')
        }} color="white" checked={selectedValue==='free'} name="radio-buttons" value="free"/></Grid>
        </Grid>
        </MDBox>
        </Card>


        
{pricesdata && <>{pricesdata.stripe_prices.map((priceitem)=>{
return(
  <Card style={{
    backgroundColor: selectedValue=== priceitem.stripe_product.stripe_prod_limit.productname ? '#b2ebb4' : null,marginTop:10,marginBottom:10,cursor:"pointer"
  }} key={priceitem.stripe_price_id} onClick={()=>{
    setSelectedValue(priceitem.stripe_product.stripe_prod_limit.productname)
    setamountselected(true);
    setpriceid(priceitem.stripe_price_id)
   }}>
<MDBox   style={{marginTop:10,marginBottom:10
}}>

<Grid container spacing={3} key={priceitem.stripe_price_id} >
                      <Grid item xs={12} md={6} lg={1} >
                        {/* <CurrencyExchangeIcon color="success"/> */}
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} >
                     
        <MDTypography variant="button" style={{fontWeight:600,fontSize:18}} >
        {priceitem.stripe_product.stripe_prod_limit.productname} 
                        </MDTypography>
                    
         <MDTypography variant="body2" color="text" style={{fontWeight:400,fontSize:14}}>
         {priceitem.stripe_product.stripe_prod_limit.noofrequests} requests | {priceitem.stripe_product.stripe_prod_limit.noofservers} Containers
        </MDTypography>
        </Grid>

        <Grid item xs={12} md={6} lg={3} style={{marginTop:10}}>
        <MDTypography variant="button" style={{color:"#000000",fontSize:26,fontWeight:600,marginTop:10}} >
                        {priceitem.stripe_price_unitamount/100}
                        </MDTypography>
                        <MDTypography variant="button" style={{color:"#000000",fontSize:12,fontWeight:500,marginTop:10}} >
                        $
                        </MDTypography>
                        <MDTypography variant="button" style={{color:"#000000",fontSize:12,fontWeight:500,marginTop:10}} >
                        /month
                        </MDTypography>
                        </Grid>

        <Grid item xs={12} md={6} lg={2} style={{marginTop:10}}><CustomCheckbox onChange={()=>{
          setSelectedValue(priceitem.stripe_product.stripe_prod_limit.productname)
          setamountselected(true);
          setpriceid(priceitem.stripe_price_id)
        }} checked={ selectedValue ===  priceitem.stripe_product.stripe_prod_limit.productname } name="radio-buttons" value={priceitem.stripe_product.stripe_prod_limit.productname} color="success" /></Grid>
        </Grid>
        
       
</MDBox>
</Card> 
)
})
}</>
}
{/* 
<MDTypography variant="title" fontWeight="medium" style={{fontSize:16,fontWeight:500}}>
                       Coupon Code : 
                        </MDTypography>
                                           
        <TextField
          
          fullWidth
          
          //label={t('Company Name')}
          //placeholder={t('Your email address here...')}
          margin="normal"
          name="couponname"
          //onBlur={formik.handleBlur}
          onChange={(event)=>{
            setcouponname(event.target.value)
          }}
          type="text"
          value={couponname}
          variant="outlined"
        />
 */}        <Divider variant="fullWidth"/>
<MDBox
              display="flex"
              justifyContent={{ md: "flex-start" }}
              alignItems="center"
              lineHeight={1}
              style={{marginTop:20,marginLeft:40,marginBottom:20}}
            >
             <MDButton
       
        onClick={()=>{
          //handleOpenDialog();
          //router.push("/stripeindex")
          if(selectedValue==='free'){
            seteditworkspace({
              workspaceid:workspaceid,
              plantype:"free",
              from:dayjs().format(),
              to:dayjs().add(14, 'day').format()

            })
          }
          else{
            
            if(!planchange && !updateplan){
            setsubscriptions({
              planid:priceid,
              accountid:workspacesdatastate.workspaces[0].accountid,
              workspaceid:workspaceid,
              couponcode: couponname
          })
        }
        else{
          if(planchange){
            setcanceltype('changeplan')
            cancelsubscription({
              workspaceid:workspaceid,
              canceltype:"changeplan"
            })
            
      }
      if(updateplan){
        updatesubscription({
          planid:priceid,
          workspaceid:workspaceid,
          couponcode:couponname
      })
      }
        }
        setpolling(false)
          }
        }}
        size="small"
        variant="gradient"
        color="success"
      >
        
        <b style={{marginLeft:10}}>Submit</b>
      </MDButton> &nbsp;&nbsp;&nbsp;
      <MDButton
       
        onClick={()=>{
          if(updateplan){
            setupdateplan(false)
          }
          else{
            router.push('/workspaces')
          }
         
        }}
        size="small"
        variant="gradient"
        color="warning"
      >
        
        <b style={{marginLeft:10}}>Cancel</b>
      </MDButton> 
            </MDBox>
{/* 
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

        <Grid item xs={12} md={6} lg={2}><CustomCheckbox onChange={handleCheckChange} checked={selectedValue === 'basis'} name="radio-buttons" value="basis" color="success" /></Grid>
        </Grid>
        <Divider />

        <Grid container spacing={3}>
                      <Grid item xs={12} md={6} lg={1}>
                        <StyleIcon color="success"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={8}>
        <MDTypography variant="button" fontWeight="medium">
        proplus
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
        <CustomCheckbox  color="white" onChange={handleCheckChange} checked={selectedValue === 'proplus'} name="radio-buttons" value="proplus"/>
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
        <Grid item xs={12} md={6} lg={2}><CustomCheckbox  color="white" onChange={handleCheckChange} checked={selectedValue === 'ultimate'} name="radio-buttons" value="ultimate" /></Grid>
        </Grid>
        <Divider /> */}
                      </MDBox>
                      </Card>
  </Grid>
<Grid item md={0.5}></Grid>
  <Grid item md={5} style={{marginBottom:20}}>
    <Card style={{height:"100%",backgroundColor:"#ECECEC",color:"#FFFFFF"}} >
      {selectedValue==="free"?
  <MDBox mt={5}>

<MDTypography style={{fontSize:18,fontWeight:500,marginLeft:15}}>
Free Package
</MDTypography>


<MDTypography style={{fontSize:16,fontWeight:400,marginLeft:15,marginTop:10}}>
Suitable for starting websites

</MDTypography>
<MDBox display="flex" justifyContent="space-between" alignItems="center">
   <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
   Total 10,000 requests

       </MDTypography>
<MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
<CheckCircleIcon
              sx={{
                color: `#17845D`
              }}
              fontSize="small"
            /> &nbsp;&nbsp;&nbsp;
     </MDBox>
     </MDBox>

     <MDBox display="flex" justifyContent="space-between" alignItems="center">
   <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
   1 Container

       </MDTypography>
<MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
<CheckCircleIcon
              sx={{
                color: `#17845D`
              }}
              fontSize="small"
            /> &nbsp;&nbsp;&nbsp;
     </MDBox>
     </MDBox>



     <MDBox display="flex" justifyContent="space-between" alignItems="center">
   <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
   Email Support

       </MDTypography>
<MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
<DangerousIcon
              fontSize="small"
            /> &nbsp;&nbsp;&nbsp;
     </MDBox>
     </MDBox>


     <MDBox display="flex" justifyContent="space-between" alignItems="center">
   <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
   Phone Support

       </MDTypography>
<MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
<DangerousIcon
              fontSize="small"
            /> &nbsp;&nbsp;&nbsp;
     </MDBox>
     </MDBox>



                      </MDBox>:
                      selectedValue==="Essential"?
                      <MDBox mt={5}>

                      <MDTypography style={{fontSize:18,fontWeight:500,marginLeft:15}}>
                      Essential
                      </MDTypography>
                      
                      
                      <MDTypography style={{fontSize:16,fontWeight:400,marginLeft:15,marginTop:10}}>
                      Optimized for small websites

                      
                      </MDTypography>
                      <MDBox display="flex" justifyContent="space-between" alignItems="center">
                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                         Total 300000 requests
                      
                             </MDTypography>
                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                      <CheckCircleIcon
                                    sx={{
                                      color: `#17845D`
                                    }}
                                    fontSize="small"
                                  /> &nbsp;&nbsp;&nbsp;
                           </MDBox>
                           </MDBox>
                      
                           <MDBox display="flex" justifyContent="space-between" alignItems="center">
                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                         1 Container
                      
                             </MDTypography>
                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                      <CheckCircleIcon
                                    sx={{
                                      color: `#17845D`
                                    }}
                                    fontSize="small"
                                  /> &nbsp;&nbsp;&nbsp;
                           </MDBox>
                           </MDBox>
                      
                      
                      
                           <MDBox display="flex" justifyContent="space-between" alignItems="center">
                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                         Email Support
                      
                             </MDTypography>
                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                      <DangerousIcon
                                    fontSize="small"
                                  /> &nbsp;&nbsp;&nbsp;
                           </MDBox>
                           </MDBox>
                      
                      
                           <MDBox display="flex" justifyContent="space-between" alignItems="center">
                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                         Phone Support
                      
                             </MDTypography>
                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                      <DangerousIcon
                                    fontSize="small"
                                  /> &nbsp;&nbsp;&nbsp;
                           </MDBox>
                           </MDBox>
                      
                      
                      
                                            </MDBox>:
                                            selectedValue==="Professional"?

                                            <MDBox mt={5}>

                                            <MDTypography style={{fontSize:18,fontWeight:500,marginLeft:15}}>
                                            Professional Package
                                            </MDTypography>
                                            
                                            
                                            <MDTypography style={{fontSize:16,fontWeight:400,marginLeft:15,marginTop:10}}>
                                            Suitable for starting websites
                                            
                                            </MDTypography>
                                            <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                               <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                               Total 1000000 requests
                                            
                                                   </MDTypography>
                                            <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                            <CheckCircleIcon
                                                          sx={{
                                                            color: `#17845D`
                                                          }}
                                                          fontSize="small"
                                                        /> &nbsp;&nbsp;&nbsp;
                                                 </MDBox>
                                                 </MDBox>
                                            
                                                 <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                               <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                               3 Container
                                            
                                                   </MDTypography>
                                            <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                            <CheckCircleIcon
                                                          sx={{
                                                            color: `#17845D`
                                                          }}
                                                          fontSize="small"
                                                        /> &nbsp;&nbsp;&nbsp;
                                                 </MDBox>
                                                 </MDBox>
                                            
                                            
                                            
                                                 <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                               <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                               Email Support
                                            
                                                   </MDTypography>
                                            <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                            <DangerousIcon
                                                          fontSize="small"
                                                        /> &nbsp;&nbsp;&nbsp;
                                                 </MDBox>
                                                 </MDBox>
                                            
                                            
                                                 <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                               <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                               Phone Support
                                            
                                                   </MDTypography>
                                            <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                            <DangerousIcon
                                                          fontSize="small"
                                                        /> &nbsp;&nbsp;&nbsp;
                                                 </MDBox>
                                                 </MDBox>
                                            
                                            
                                            
                                                                  </MDBox>:
                                      selectedValue==="Professional+"?

                                      <MDBox mt={5}>

                                      <MDTypography style={{fontSize:18,fontWeight:500,marginLeft:15}}>
                                      Professional+ Package
                                      </MDTypography>
                                      
                                      
                                      <MDTypography style={{fontSize:16,fontWeight:400,marginLeft:15,marginTop:10}}>
                                      Suitable for starting websites
                                      
                                      </MDTypography>
                                      <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                         Total 3000000 requests
                                      
                                             </MDTypography>
                                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                      <CheckCircleIcon
                                                    sx={{
                                                      color: `#17845D`
                                                    }}
                                                    fontSize="small"
                                                  /> &nbsp;&nbsp;&nbsp;
                                           </MDBox>
                                           </MDBox>
                                      
                                           <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                         3 Containers
                                      
                                             </MDTypography>
                                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                      <CheckCircleIcon
                                                    sx={{
                                                      color: `#17845D`
                                                    }}
                                                    fontSize="small"
                                                  /> &nbsp;&nbsp;&nbsp;
                                           </MDBox>
                                           </MDBox>
                                      
                                      
                                      
                                           <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                         Email Support
                                      
                                             </MDTypography>
                                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                      <DangerousIcon
                                                    fontSize="small"
                                                  /> &nbsp;&nbsp;&nbsp;
                                           </MDBox>
                                           </MDBox>
                                      
                                      
                                           <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                         Phone Support
                                      
                                             </MDTypography>
                                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                      <DangerousIcon
                                                    fontSize="small"
                                                  /> &nbsp;&nbsp;&nbsp;
                                           </MDBox>
                                           </MDBox>
                                      
                                      
                                      
                                                            </MDBox>:
                                                            selectedValue==="Business"?
                                                            
                                                            <MDBox mt={5}>

                                      <MDTypography style={{fontSize:18,fontWeight:500,marginLeft:15}}>
                                      Business Package
                                      </MDTypography>
                                      
                                      
                                      <MDTypography style={{fontSize:16,fontWeight:400,marginLeft:15,marginTop:10}}>
                                      Suitable for starting websites
                                      
                                      </MDTypography>
                                      <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                         Total 6000000 requests
                                      
                                             </MDTypography>
                                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                      <CheckCircleIcon
                                                    sx={{
                                                      color: `#17845D`
                                                    }}
                                                    fontSize="small"
                                                  /> &nbsp;&nbsp;&nbsp;
                                           </MDBox>
                                           </MDBox>
                                      
                                           <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                         6 Containers
                                      
                                             </MDTypography>
                                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                      <CheckCircleIcon
                                                    sx={{
                                                      color: `#17845D`
                                                    }}
                                                    fontSize="small"
                                                  /> &nbsp;&nbsp;&nbsp;
                                           </MDBox>
                                           </MDBox>
                                      
                                      
                                      
                                           <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                         Email Support
                                      
                                             </MDTypography>
                                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                      <DangerousIcon
                                                    fontSize="small"
                                                  /> &nbsp;&nbsp;&nbsp;
                                           </MDBox>
                                           </MDBox>
                                      
                                      
                                           <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                         Phone Support
                                      
                                             </MDTypography>
                                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                      <DangerousIcon
                                                    fontSize="small"
                                                  /> &nbsp;&nbsp;&nbsp;
                                           </MDBox>
                                           </MDBox>
                                      
                                      
                                      
                                                            </MDBox>:

                                                            selectedValue==="Business+"?
                                                            <MDBox mt={5}>

                                                            <MDTypography style={{fontSize:18,fontWeight:500,marginLeft:15}}>
                                                            Business+ Package
                                                            </MDTypography>
                                                            
                                                            
                                                            <MDTypography style={{fontSize:16,fontWeight:400,marginLeft:15,marginTop:10}}>
                                                            Suitable for starting websites
                                                            
                                                            </MDTypography>
                                                            <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                                               <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                                               Total 12000000 requests
                                                            
                                                                   </MDTypography>
                                                            <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                                            <CheckCircleIcon
                                                                          sx={{
                                                                            color: `#17845D`
                                                                          }}
                                                                          fontSize="small"
                                                                        /> &nbsp;&nbsp;&nbsp;
                                                                 </MDBox>
                                                                 </MDBox>
                                                            
                                                                 <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                                               <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                                               6 Containers
                                                            
                                                                   </MDTypography>
                                                            <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                                            <CheckCircleIcon
                                                                          sx={{
                                                                            color: `#17845D`
                                                                          }}
                                                                          fontSize="small"
                                                                        /> &nbsp;&nbsp;&nbsp;
                                                                 </MDBox>
                                                                 </MDBox>
                                                            
                                                            
                                                            
                                                                 <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                                               <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                                               Email Support
                                                            
                                                                   </MDTypography>
                                                            <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                                            <DangerousIcon
                                                                          fontSize="small"
                                                                        /> &nbsp;&nbsp;&nbsp;
                                                                 </MDBox>
                                                                 </MDBox>
                                                            
                                                            
                                                                 <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                                               <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                                               Phone Support
                                                            
                                                                   </MDTypography>
                                                            <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                                            <DangerousIcon
                                                                          fontSize="small"
                                                                        /> &nbsp;&nbsp;&nbsp;
                                                                 </MDBox>
                                                                 </MDBox>
                                                            
                                                            
                                                            
                                                                                  </MDBox>:

                                                                                  selectedValue==="Enterprise"?
                                                                                  <MDBox mt={5}>

                                      <MDTypography style={{fontSize:18,fontWeight:500,marginLeft:15}}>
                                      Enterprise Package
                                      </MDTypography>
                                      
                                      
                                      <MDTypography style={{fontSize:16,fontWeight:400,marginLeft:15,marginTop:10}}>
                                      Suitable for starting websites
                                      
                                      </MDTypography>
                                      <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                         Total 25000000 requests
                                      
                                             </MDTypography>
                                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                      <CheckCircleIcon
                                                    sx={{
                                                      color: `#17845D`
                                                    }}
                                                    fontSize="small"
                                                  /> &nbsp;&nbsp;&nbsp;
                                           </MDBox>
                                           </MDBox>
                                      
                                           <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                         10 Containers
                                      
                                             </MDTypography>
                                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                      <CheckCircleIcon
                                                    sx={{
                                                      color: `#17845D`
                                                    }}
                                                    fontSize="small"
                                                  /> &nbsp;&nbsp;&nbsp;
                                           </MDBox>
                                           </MDBox>
                                      
                                      
                                      
                                           <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                         Email Support
                                      
                                             </MDTypography>
                                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                      <DangerousIcon
                                                    fontSize="small"
                                                  /> &nbsp;&nbsp;&nbsp;
                                           </MDBox>
                                           </MDBox>
                                      
                                      
                                           <MDBox display="flex" justifyContent="space-between" alignItems="center">
                                         <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
                                         Phone Support
                                      
                                             </MDTypography>
                                      <MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
                                      <DangerousIcon
                                                    fontSize="small"
                                                  /> &nbsp;&nbsp;&nbsp;
                                           </MDBox>
                                           </MDBox>
                                      
                                      
                                      
                                                            </MDBox>:<MDBox mt={5}>

<MDTypography style={{fontSize:18,fontWeight:500,marginLeft:15}}>
Enterprise+ Package
</MDTypography>


<MDTypography style={{fontSize:16,fontWeight:400,marginLeft:15,marginTop:10}}>
Suitable for starting websites

</MDTypography>
<MDBox display="flex" justifyContent="space-between" alignItems="center">
   <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
   Total 50000000 requests

       </MDTypography>
<MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
<CheckCircleIcon
              sx={{
                color: `#17845D`
              }}
              fontSize="small"
            /> &nbsp;&nbsp;&nbsp;
     </MDBox>
     </MDBox>

     <MDBox display="flex" justifyContent="space-between" alignItems="center">
   <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
   10 Containers

       </MDTypography>
<MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
<CheckCircleIcon
              sx={{
                color: `#17845D`
              }}
              fontSize="small"
            /> &nbsp;&nbsp;&nbsp;
     </MDBox>
     </MDBox>



     <MDBox display="flex" justifyContent="space-between" alignItems="center">
   <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
   Email Support

       </MDTypography>
<MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
<DangerousIcon
              fontSize="small"
            /> &nbsp;&nbsp;&nbsp;
     </MDBox>
     </MDBox>


     <MDBox display="flex" justifyContent="space-between" alignItems="center">
   <MDTypography variant="h5" sx={{ mt: 2, mb: 1, ml: 2 }} style={{fontWeight:400,fontSize:16}}>
   Phone Support

       </MDTypography>
<MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
<DangerousIcon
              fontSize="small"
            /> &nbsp;&nbsp;&nbsp;
     </MDBox>
     </MDBox>



                      </MDBox>
                                                            
                                                            }
                      </Card>
  </Grid>
  <Grid item md={0.3}></Grid>
</Grid>

     
                      </>: null}</>
        }
        </Card>
      
        </>
}

     {/*  <Footer /> */}
    </DashboardLayout>
    </Authenticated>
  );
}

export default SubscriptionDetails;

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
import { keyframes } from '@mui/system';

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
import DataTableHeadCell from "/examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "/examples/Tables/DataTable/DataTableBodyCell";

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
import {useAuth} from '../../../hooks/useAuth'
import { isLoaded,isEmpty,useFirebase } from 'react-redux-firebase';
import _ from 'lodash';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
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
import logoGlobe from "/assets/images/small-logos/globe.png";
import MDAvatar from "/components/MDAvatar";

// Data
import reportsBarChartData from "/pagesComponents/dashboards/analytics/data/reportsBarChartData";
import reportsLineChartData from "/pagesComponents/dashboards/analytics/data/reportsLineChartData";
import logoSlack from "/assets/images/small-logos/labeled.png";

import {useGetPricesDataQuery,useGetWorspacesDataQuery,useSetcreatecontainerMutation,useSetCancelSubscriptionAtEndMutation,useGetContainerDataQuery,useSetSubscriptionMutation,useSetUpdateSubscriptionMutation,useSetCancelSubscriptionMutation,useGetPaymentintentDataQuery} from '../../../services/hasuraquerydata';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import ConfettiExplosion from 'react-confetti-explosion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InputLabel from '@mui/material/InputLabel';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import {useWorkspaceStore} from "../../workspaces";
import { useShallow } from 'zustand/react/shallow';
import {create} from 'zustand';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const useContainerStore = create((set) => ({
  containername: "",
  setContainerName: (name) => set({ containername: name }),
}));

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

const blink = keyframes`
from { opacity: 0; }
to { opacity: 2; }
`;

const BlinkedBox = styled('div')({
backgroundColor: '#17845D',
width: 20,
height: 20,
borderRadius:12,
opacity: '0.4',
            backgroundColor: 'green',
            animationName: 'blinker',
            animationDuration: '1s',
            animationTimingFunction: 'linear',
            animationIterationCount:'infinite',
            
animation: `${blink} 1s linear infinite`,
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

function WorkspaceTable({ columns, data,sorting,setSorting,loading,noEndBorder,isSorted
  
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
 noEndBorder,
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
   <Table width="100%">
   <MDBox component="thead">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <DataTableHeadCell key={header.id} colSpan={header.colSpan} 
                  color="white" 
                  
                    
                
                  //width={header.column.width ? header.column.width : "auto"}
                  align={header.column.align ? header.column.align : "left"}
                  /* style={{color:"#17845D",fontSize:14,width:header.width}} */>
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
                  </DataTableHeadCell>
                )
              })}
            </TableRow>
          ))}
        </MDBox>
    
        <TableBody>
          {table.getRowModel().rows.map(row => {
            return (
              <Fragment key={row.id}>
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <DataTableBodyCell key={cell.id} 
                    noBorder={noEndBorder && rows.length - 1 === cell.id}
                    align={cell.column.align ? cell.column.align : "left"}
                  >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      
                    </DataTableBodyCell>
                  )
                })}
              </TableRow>
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
        </TableBody>
      </Table>



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
    color: "#17845D", // Change color on check
    backgroundColor:"#17845D"
  },
  "&.Mui-focused": {
    color: "#17845D", // Change color on check
    backgroundColor:"#17845D"
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


function Workspaces() {
  const pulse = {
    ".pulse": {
      width: "10px",
      height: "10px",
      border: "5px solid #f7f14c",
      WebkitBorderRadius: "30px",
      MozBorderRadius: "30px",
      borderRadius: "30px",
      backgroundColor: "#716f42",
      zIndex: 10,
      position: "absolute"
    }
  }
  const router = useRouter();
  const stripe = useStripe();
  const workspaceid = router.query.workspaceid;
  const paymentstatus = router.query.paymentstatus;
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

  let workspacename = useWorkspaceStore(state => state.workspacename);

  console.log(`workspace name is ${workspacename}`)

  let setContainerName = useContainerStore(state => state.setContainerName);


  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const {data:pricesdata,isLoading:pricesdataloading,isSuccess:pricesdatasuccess}= useGetPricesDataQuery({},{
    
    skip:isEmpty(user),
    refetchOnMountOrArgChange: true,
    skip: false,
   });
   //console.log(`pricesdata is ${JSON.stringify(pricesdata)}`)
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

  React.useEffect(()=>{
    if(paymentstatus==="success"){
      setpaymentloading(true);
      if(workspacesdata && workspacesdata.workspaces[0].workspace_subscriptions && workspacesdata.workspaces[0].workspace_subscriptions.stripe_subscription_status==="active"){
        setpaymentloading(false);
      }
    }

  },[workspacesdata])
  
  //console.log(`workspacedata is ${JSON.stringify(workspacesdata)}`)
  React.useEffect(()=>{
if (workspacesdata) {
  
  const tempdata = _.cloneDeep(workspacesdata)
  setworkspacesdatastate(tempdata);
  //setWorkspaceName(workspacesdata.workspaces[0].workspacename);
  if(workspacesdata.workspaces[0].workspace_subscriptions){
    if(!amountselected){

    
  setSelectedValue(workspacesdata.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.productname)
    }
  if(workspacesdata.workspaces[0].workspace_subscriptions.subscription_request && workspacesdata.workspaces[0].workspace_subscriptions.subscription_request.status==="completed"){
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

//console.log(`tempworkspace_array is ...................${JSON.stringify(tempworkspace_array)}`)
       setdatastate(tempworkspace_array);
    
    } 
    
  
   },[workspacesdata])
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
    //console.log(`subscription data is ..............................${JSON.stringify(setsubscriptionsdata)}`)
    if(setsubscriptionsdata.subscriptions.status===true){
    //console.log(`moving to stripeindex`)
    //router.push('/workspace/purchase-subscription')
    router.push({ pathname: '/workspace/purchase-subscription', query: { from: 'create',subscriptionid: workspacesdata.workspaces[0].stripe_subscription_id,workspaceid:workspaceid} })
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

const [updateplan,setupdateplan] = useState(false);
const [confirmupdate,setreconfirmupdate] = useState(false);
const [updatestatus,setupdatestatus] = useState();
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
    router.push({ from:"update" ,pathname: '/workspace/purchase-subscription', query: {subscriptionid: workspacesdata.workspaces[0].stripe_subscription_id,workspaceid:workspaceid} })
   }
   else{
   if(workspacesdata && workspacesdata.workspaces[0].workspace_subscriptions && workspacesdata.workspaces[0].workspace_subscriptions.subscription_request){
    
    if(workspacesdata.workspaces[0].workspace_subscriptions.subscription_request.status==="waiting"){
      //console.log(`update payment request in waiting`)
      setupdatestatus(workspacesdata.workspaces[0].workspace_subscriptions.subscription_request.status);

      setreconfirmupdate(true)
    //console.log(`moving to stripeindex`)
    
    //openUpdateSubscription()
    }
    else if(workspacesdata.workspaces[0].workspace_subscriptions.subscription_request.status==="paymentfailed" && workspacesdata.workspaces[0].workspace_subscriptions.subscription_request.payment_intent_status==="requires_action"){
      //console.log(`update payment request failed `)
      setupdatestatus(workspacesdata.workspaces[0].workspace_subscriptions.subscription_request.status)
      setreconfirmupdate(false)
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

 //console.log(`cancelsubscriptionatenddata is ${JSON.stringify(cancelsubscriptionatenddata)}`)
   setcancelatend(true)
   //handleclosecancelconfirm()
   setopencanceldialog(false)
   
  }},[cancelsubscriptionatenddata]);

  const [rowid,setrowid] = useState('')

/*   const [getcontainerdata, {data:containerdata,isUninitialized,isLoading:containerdataloading,isSuccess:containerdataSuccess}, lastPromiseInfo] = useLazyGetContainerDataQuery();
 */

const { data: containerdata, isLoading:containerdataloading,isSuccess:containerdataSuccess} = useGetContainerDataQuery({
  workspaceid:workspaceid
},{
  skip:isEmpty(workspaceid===''),
  refetchOnMountOrArgChange: true,
  //pollingInterval: polling?5000:0,
  pollingInterval: 5000,
  skipPollingIfUnfocused: true,
  skip: false,
})
  const handleToggle=(row)=>{


    /* 
      if(rowentityid!==null && row.original.entityid===rowentityid){
        console.log(`row entity and tableenti tyid are equal ${row.original.entityid} ${rowentityid}`)
        !row.getIsExpanded()
        //tablestate.reset();
      } */
      
      row.toggleExpanded();
      
      
      //logger.debug(`row.toggleExpanded is ${row.toggleExpanded.toString()}`)
     // console.log(`table expanded options are ${JSON.stringify(tablestate.getExpandedRowModel())} ${tablestate.getExpandedDepth}`)
      if(row.depth===0){
       
    
        //console.log(`row depth ${row.depth} row id ${row.id} row index ${row.index}`)
      setrowid(row.original.id);
      // logger.debug(`fromdate ${fromdate} todate ${todate} row data is ${JSON.stringify(row.original)}`)
      if(!row.getIsExpanded()){
        
        getcontainerdata({
         workspaceid:row.original.id,
                  })
        
    
      }
    }
     }

     const [successContainer, setSuccessContainer] = useState(false);
     const openSuccessContainer = () => setSuccessContainer(true);
     const closeSuccessContainer = () => setSuccessContainer(false);
  React.useEffect(()=>{
if(containerdata) {
    
       const tempdata = _.cloneDeep(containerdata)
       let tempworkcontainer_array =[];
  let tempcontainer = {};
  tempdata.container.map(container=>{
    
    tempcontainer={
  id:container.containerid,
  name:container.containername
}
tempworkcontainer_array.push(tempcontainer)
  })

  const tempworkspace = _.cloneDeep(datastate)

       const index = _.findIndex(tempworkspace,{'id':rowid});
    
     const containerarray = _.set(tempworkspace,`[${index}].subRows`,tempworkcontainer_array);

     
//console.log(`tempworkspace with containers is ...................${JSON.stringify(tempworkspace)}`)
  
    
       setdatastate(tempworkspace);
    
    } 
    
  
   },[containerdata,workspaceid])

  //console.log(`datastate is ...................${JSON.stringify(datastate)}`)

  const [errorContainer, setErrorContainer] = useState(false);


  const openErrorContainer = () => setErrorContainer(true);
  const closeErrorContainer = () => setErrorContainer(false);

   const [setcreatecontainer,{ data:setcreatecontainerdata,error,isSuccess, isLoading:setcreatecontainerdataloading }] = useSetcreatecontainerMutation();
   React.useEffect(()=>{

    if (setcreatecontainerdata) {
      
      //console.log(`setcreatecontainerdata data is ..............................${JSON.stringify(setcreatecontainerdata)}`)
      if(setcreatecontainerdata.createcontainer.status===true){
        openSuccessContainer()
        setContainerName(setcreatecontainerdata.createcontainer.containername)
        router.push({pathname:'/workspace/container',query:{containerid:setcreatecontainerdata.createcontainer.containerid,workspaceid:workspaceid}})
      }
      else{
        openErrorContainer()
      }
    }},[setcreatecontainerdata]);
  
  
   const handleLogout = async () => {
    try {
      //handleClose();
      await logout();
      await signInWithEmailAndPassword('viswanadh@qualicel.com', '#busloc123');
    } catch (error) {
      console.error(error);
    }
  };
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
  //console.log(`selected value is ${selectedValue}` )
  const [priceid, setpriceid] = useState('');
  
  const handleUpgradeChange = (event) => {
    setautoupgrade(event.target.checked);
  };
  const handleCheckChange = (event) => {
    setSelectedValue(event.target.value);
    
  };

  const [planchange,setPlanchange] = useState();

  const handleChange = (event) => {
    setPeriod(event.target.value);
  };

  const columns = React.useMemo(
    () => [
      /* {
        accessorKey: 'id',
        enableSorting:false,
        header:({table})=> <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />,
        cell:({row})=>
        <div style={{marginLeft:15}}>
          <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
        </div>
      }, */
      {
        accessorKey: 'containername',
        header: () => <span>Container Name</span>,
        enableHiding:false,
         cell: ({ row, getValue }) => {
          return (
            <MDBox display="flex" alignItems="center">
              {row.original.container_requests && row.original.container_requests[0].request_status ==="initiated" || row.original.container_requests.request_status ==="inprocess"? 
                <MDBox display="flex" flexDirection="row">{"creating container "} &nbsp;<Image 
                src={Loadingimg}
                alt={"loading"}
                quality={50}
                //sizes="100%"
                style={{ width: "20%", height: "20%", display: "block",marginTop:-10 }}
              /></MDBox>  :
              row.original.container_requests && row.original.container_requests[0].request_status ==="finished"?
              <BlinkedBox/>:
              <Icon color="error">circle</Icon>
      
      }
            
             
              
<MDAvatar
            src={logoGlobe.src || logoGlobe}
            alt={<a href="https://www.flaticon.com/free-icons/world" title="world icons">World icons created by Freepik - Flaticon</a>}
            size="md"
            style={{cursor:"pointer",marginLeft:5}}
            onClick={()=>{
              //router.push("/containersettings")
              setContainerName(row.original.containername)
              router.push({ pathname: '/workspace/container', query: { containerid: row.original.containerid,workspaceid:workspaceid} })
             }}
            //variant="rounded"
           // bgColor={color}
            sx={{
              p: 1,
              
              borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
            }}
          />
                <MDTypography title={getValue()} 
                onClick={()=>{
            //router.push("/containersettings")
            setContainerName(row.original.containername)
            router.push({ pathname: '/workspace/container', query: { containerid: row.original.containerid,workspaceid:workspaceid} })
           }}
                 style={{textAlign:"left",fontWeight:500,fontSize:14,cursor:"pointer"}}>{getValue()}</MDTypography>
                 </MDBox>
          
          );
        },
        footer: props => props.column.id,
      },
      {
        accessorKey: 'containerusedreq_obj.usedrequests',
        header: () => <span>Used requests</span>,
        enableHiding:false,
         cell: ({ row, getValue }) => {
          let usedreqpercent;
         
          let usedreq = row.original.containerusedreq_obj.usedrequests / row.original.workspace_obj.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests;
          usedreqpercent = Math.round(usedreq*100);

          console.log( ` table calculation usedreqpercent ${usedreqpercent} usedreq ${usedreq}`)
          
          return (
            <MDBox width="15rem">
              {usedreqpercent<50 ? <MDProgress variant="gradient" value={usedreqpercent} label color="success" />:usedreqpercent<70?<MDProgress  variant="gradient" value={usedreqpercent} label color="warning" />:
              <MDProgress variant="gradient" value={usedreqpercent} label color="error" />}
          <span title={getValue()} >{getValue()}</span>
        </MDBox>
          );
        },
        footer: props => props.column.id,
      },
      {
        accessorKey: 'container_requests.request_status',
        header: () => <span>Status</span>,
        enableHiding:false,
         cell: ({ row, getValue }) => {
          return (
            <div
                
              >

                <span >{row.original.container_requests && row.original.container_requests[0].request_status ==="initiated" || row.original.container_requests.request_status ==="inprocess"? 
                <MDBox display="flex" flexDirection="row">{"creating container "} &nbsp;<Image 
                src={Loadingimg}
                alt={"loading"}
                quality={50}
                //sizes="100%"
                style={{ width: "20%", height: "20%", display: "block",marginTop:-10 }}
              /></MDBox>  :
              row.original.container_requests && row.original.container_requests[0].request_status ==="finished"?
                <MDBadge
        variant="contained"
        color="success"
        badgeContent="Active"
        size='lg'
      />:
      <MDBadge
        variant="contained"
        color="error"
        badgeContent="Inactive"
        size='lg'
      />
      
      }</span>
            </div>
          );
        },
        footer: props => props.column.id,
      },
      {
        accessorKey: 'website',
        header: () => <span>Website</span>,
        enableHiding:false,
         cell: ({ row, getValue }) => {
          return (
            <div
                
              >

                <span title={getValue()} >{getValue()}</span>
            </div>
          );
        },
        footer: props => props.column.id,
      },
      {
        accessorKey: 'workspace_obj.plantype',
        header: () => <span>Plan</span>,
        enableHiding:false,
         cell: ({ row, getValue }) => {
          return (
            <div
                
              >

                <span title={getValue()} >{row.original.plantype==="free"?"FREE":row.original.workspace_obj.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.productname}</span>
            </div>
          );
        },
        footer: props => props.column.id,
      },
      {
        accessorKey: 'gtm_containerid',
        header: () => <span>GTM Id</span>,
        enableHiding:false,
         cell: ({ row, getValue }) => {
          return (
            <div
                
              >

                <span title={getValue()} >{getValue()}</span>
            </div>
          );
        },
        footer: props => props.column.id,
      },
      
     
      
      {
        id: "settings",
      
        header: () => <span> Settings</span>,
        enableHiding:false,
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        cell: ({ row,getValue }) => {
          //console.log("row is " + JSON.stringify(row.original));
          return (
            <div>

<ArrowForwardIcon fontSize="medium" style={{cursor:"pointer"}} onClick={()=>{
            //router.push("/containersettings")
            setContainerName(row.original.containername)
            router.push({ pathname: '/workspace/container', query: { containerid: row.original.containerid,workspaceid:workspaceid} })
           }}/>
              
          
            </div>
          );
        }
      },
        
      /* {
        accessorFn: (row) => row.ws_displayid,
        id: "ws_displayid",
        size:20,
        cell: (info) => {
         // logger.debug(`info value in column is ${JSON.stringify(info)}`)
          return(
            <p>{info.getValue()?info.getValue():`-`}</p>
          )
        },
        header: () => <span>DisplayID</span>,
        footer: (props) => props.column.id
      },
       */
      
    ],
    []
  )

  const [opencanceldialog, setopencanceldialog] = useState(false);
  const handleopencancelconfirm = () => {
    setopencanceldialog(true);
  };
  const handleclosecancelconfirm = () => {
    setopencanceldialog(false);
    
  };

  const formik = useFormik({
    initialValues: {
      containername: '',
      website: '',
      configuration: '',
      regioncode:'eastus',
      customdomain:''
     
    },
    validationSchema: Yup.object({
      containername: Yup.string()
        .min(5)
        .max(15)
        .required('This field is required'),
        
        configuration: Yup.string()
        
        .max(255)
        .required('This field is required'),
        regioncode: Yup.string()
        
        .required('This field is required'),


        customdomain: Yup.string()
        
        .max(40)
        .matches(
          /((http|https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          'Not a valid domain!'
      ),
        
        website:Yup.string()
             .max(40)
             .matches(
              /((http|https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              'Not a valid website!'
          )

    }),
    onSubmit: async (values, helpers) => {

      //console.log(`form values are ${JSON.stringify(values)}`)
      //console.log(`decodedconfiguration is ${Base64.decode(values.configuration)}`)
      //console.log(`validation check for configuration is ${Base64.isValid(values.configuration)}`)
 
      setcreatecontainer({
        
        accountid:workspacesdatastate.workspaces[0].accountid,
          
          workspaceid:workspacesdatastate.workspaces[0].workspaceid,
          website:values.website,
         workspacename:workspacesdatastate.workspaces[0].workspacename,
         accountname:workspacesdatastate.workspaces[0].account.accountname,
          containername:values.containername,
          configuration:values.configuration,
          regioncode:values.regioncode,
          customdomain:values.customdomain,
          //period:period,
          //autoupgrade:autoupgrade,
          plantype:workspacesdatastate && workspacesdatastate.workspaces[0].workspace_subscriptions?"paid":"free",
          gtm_containerid:gtm

      }) 
      handleCloseDialog();
      /* if(setcreatecontainerdata.data.createcontainer.status){
        
      } */

    }
  });


  
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
        onClick={()=>router.push({ pathname: '/workspace/subscription', query: { workspaceid: workspaceid } })}
        /* onClick={()=>{
          //setupdateplan(true)
          setcanceltype('cancel')
          handleopencancelconfirm();
          handleCloseMenu()
          
        }} */
        size="small"
        variant="contained"
        color="success"
      >
        
       Subscription Details
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
      title="Container Created Successfully"
      //content="Container Created Successfully"
     // dateTime="11 mins ago"
      open={successContainer}
      onClose={closeSuccessContainer}
      close={closeSuccessContainer}
      bgSuccess
    />
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
      color="error"
      icon="warning"
      title="No of container limit exceeded"
      //content="No of container limit exceeded"
      //dateTime="11 mins ago"
      open={errorContainer}
      onClose={closeErrorContainer}
      close={closeErrorContainer}
      bgError
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
        
        //TransitionComponent={Transition}
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
variant="contained"
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
        //TransitionComponent={Transition}
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
          We are processing your update request, Please wait
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

      <DialogWrapper
        open={openDialog}
        maxWidth="lg"
        //width="800"
        fullWidth
        //TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
          <MDBox my={2}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} lg={12}>
            
              <MDBox pt={2} px={2}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
      
        <MDBox mb={1}>
          <MDTypography variant="h4" fontWeight="medium">
            Create Container
          </MDTypography>
        </MDBox>
        
      
    </MDBox>
              </MDBox>
              
              <MDBox pt={1} pb={3} px={2}>
                
                <MDBox mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                    <MDBox mt={2}>
        
        <TimelineItem
          color="success"
          icon="inventory_2"
          title="Container Details"
          dateTime="Fill in your GTM details"
        />
        {/* <TimelineItem
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
        /> */}
      </MDBox>
                    </Grid>
                    <Grid item xs={12} md={6} lg={8}>
                    <MDBox mt={3}>
                      <form noValidate onSubmit={formik.handleSubmit}>
                      <MDTypography variant="title" fontWeight="medium" style={{fontSize:16,marginBottom:-20}}>
                       Name
                        </MDTypography>
        <TextField
          
          fullWidth
          style={{marginTop:-5,marginBottom:20}}
          //label={t('Company Name')}
          //placeholder={t('Your email address here...')}
          {...formik.getFieldProps('containername')}
          helperText={formik.errors.containername && formik.touched.containername && `${formik.errors.containername}`}
          error={formik.touched.containername && formik.errors.containername}
          
          margin="normal"
          name="containername"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.containername}
          variant="outlined"
        />
        <MDTypography variant="title" fontWeight="medium" style={{fontSize:16}}>
        Website
                        </MDTypography>&nbsp;

        <MDTypography variant="body" style={{fontSize:14}}>
        (optional)
                        </MDTypography>
                      
        <TextField
          style={{marginTop:-5,marginBottom:20}}
          fullWidth
          
          //label={t('Website')}
          //placeholder={t('Your email address here...')}
          {...formik.getFieldProps('website')}
          helperText={formik.errors.website && formik.touched.website && `${formik.errors.website}`}
          error={formik.touched.website && formik.errors.website}
          
         
          margin="normal"
          name="website"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.website}
          variant="outlined"
        />
      
        <MDTypography variant="title" fontWeight="medium" style={{fontSize:16}}>
        Container Configuration
                        </MDTypography> &nbsp;
                      
                                            <MDTypography variant="title" style={{fontSize:"14px",fontWeight:"200",marginTop:10}}>
                                          (code when creating a container in Google Tag Manager.)
                        </MDTypography> 
        <TextField
          
          fullWidth
          style={{marginTop:-5,marginBottom:20}}
          //label={t('Container Configuration')}
          //placeholder={t('Your email address here...')}
          
          {...formik.getFieldProps('configuration')}
          helperText={formik.errors.configuration && formik.touched.configuration && `${formik.errors.configuration}`}
          error={formik.touched.configuration && formik.errors.configuration}
          
          margin="normal"
          name="configuration"
          onBlur={formik.handleBlur}
          onChange={(e)=>{
            formik.setFieldValue(e.target.name, e.target.value);
            let decode = Base64.decode(e.target.value)
            function getStringAfterEqualBeforeAmpersand(str) {
              const equalIndex = str.indexOf('=');
              const ampersandIndex = str.indexOf('&');
            
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
            let gtmid = getStringAfterEqualBeforeAmpersand(decode);
            setgtm(gtmid);
          }}
          
          type="text"
          value={formik.values.configuration}
          variant="outlined"
        />
        <TextField
          
          fullWidth
          style={{marginTop:-5,marginBottom:2}}
          label={'make sure this is your GTM id '}
          //placeholder={t('Your email address here...')}
                    margin="normal"
          type="text"
          
          value={gtm}
          variant="outlined"
        />{/* 
{gtm?
        <MDTypography variant="title" style={{fontSize:14,marginBottom:20}}>
make sure this is your GTM id                      </MDTypography>:null} */}
        
        <MDBox>

        <MDTypography variant="title" fontWeight="medium" style={{fontSize:16}}>
Server Location                        </MDTypography>
                        </MDBox>
<ThemeProvider theme={selecttheme}>

                        <Select
                        fullWidth

          {...formik.getFieldProps('regioncode')}
          helperText={formik.errors.regioncode && formik.touched.regioncode && `${formik.errors.regioncode}`}
          error={formik.touched.regioncode && formik.errors.regioncode}
          
                        
      style={{height:45,marginBottom:20}}
      value={formik.values.regioncode}
      onChange={formik.handleChange}
      name="regioncode"
          onBlur={formik.handleBlur}
          
         
     >
       
         <MenuItem  value={"eastus"}>
         (US) East US
         </MenuItem>

         <MenuItem  value={"westus"}>
         (US) West US
         </MenuItem>
         <MenuItem  value={"ind"}>
          India
         </MenuItem>
      
     </Select>
</ThemeProvider>

{workspacesdatastate && workspacesdatastate.workspaces[0].plantype!=="free"?
    <> <MDTypography variant="title" fontWeight="medium" style={{fontSize:16,marginTop:20}}>
        Custom Domain
                        </MDTypography>
                      
        <TextField
          style={{marginTop:-5,marginBottom:20}}
          fullWidth
          
          //label={t('Website')}
          //placeholder={t('Your email address here...')}
          {...formik.getFieldProps('customdomain')}
          helperText={formik.errors.customdomain && formik.touched.customdomain && `${formik.errors.customdomain}`}
          error={formik.touched.customdomain && formik.errors.customdomain}
          
         
          margin="normal"
          name="customdomain"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.customdomain}
          variant="outlined"
        />
        </>:null}
{/* 
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
                       <Switch    checked={autoupgrade} onChange={handleUpgradeChange}/>
                        </Grid>
                        </Grid>
                        </MDBox>
                      <MDTypography variant="title" style={{fontSize:"14px",fontWeight:"200",marginTop:10}}>
                      Your package will automatically be upgraded based on your requests.
                        </MDTypography>
                         */}
         <Divider variant="fullWidth"/>
         <MDBox>

<MDButton

onClick={()=>{
handleCloseDialog();

}}
size="small"
variant="outlined"
color="success"
>
<ArrowCircleLeftIcon style={{fontSize:18}}/>&nbsp;
<b style={{marginLeft:10}}>Back</b>
</MDButton>&nbsp;&nbsp;&nbsp;

<MDButton

//onClick={settimeline(2)}
size="small"
variant="contained"
color="success"

startIcon={
formik.isSubmitting ? <CircularProgress size="1rem" /> : null
}
disabled={formik.isSubmitting}
type="submit"

>

Submit
<ArrowCircleRightIcon style={{fontSize:18}}/>
</MDButton>
</MDBox>

      </form>
               
        
                      </MDBox>
                     
                  
                    </Grid>
                    
                 
                  </Grid>
                 
                </MDBox>
              </MDBox>
            
          </Grid>
        </Grid>
      </MDBox>
         
      </DialogWrapper>

      <DialogWrapper
        open={openDialog2}
        maxWidth="lg"
        //width="800"
        fullWidth
        //TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog2}
      >
          <MDBox my={2}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} lg={12}>
            
              <MDBox pt={2} px={2}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
      <MDBox>
        <MDBox mb={1}>
          <MDTypography variant="h4" fontWeight="medium">
            Create Container
          </MDTypography>
        </MDBox>
        
      </MDBox>
    </MDBox>
              </MDBox>
              <Divider variant="fullWidth"/>
              <MDBox pt={1} pb={3} px={2}>
                
                <MDBox mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                    <MDBox mt={2}>
        <TimelineItem
          color="secondary"
          icon="notifications"
          title="Plan"
          dateTime="choose your plan"
        />
        <TimelineItem
          color="success"
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
                      <form noValidate onSubmit={formik.handleSubmit}>
                      <MDTypography variant="title" fontWeight="medium" style={{fontSize:16}}>
                       Name
                        </MDTypography>
                                            {/* <MDTypography variant="title" style={{fontSize:"14px",fontWeight:"200",marginTop:10}}>
                      Your package will automatically be upgraded based on your requests.
                        </MDTypography> */}
        <TextField
          
          fullWidth
          
          //label={t('Company Name')}
          //placeholder={t('Your email address here...')}
          margin="normal"
          name="containername"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.containername}
          variant="outlined"
        />
        <MDTypography variant="title" fontWeight="medium" style={{fontSize:16}}>
        Website
                        </MDTypography>
                      
        <TextField
          
          fullWidth
          
          //label={t('Website')}
          //placeholder={t('Your email address here...')}
          margin="normal"
          name="website"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.website}
          variant="outlined"
        />
        <MDBox>
        <MDTypography variant="title" fontWeight="medium" style={{fontSize:16}}>
        Container Configuration
                        </MDTypography>
                        </MDBox>
                                            <MDTypography variant="title" style={{fontSize:"14px",fontWeight:"200",marginTop:10}}>
                                            You will receive the container configuration code when creating a server container in Google Tag Manager. 
                        </MDTypography> 
        <TextField
          
          fullWidth
          
          //label={t('Container Configuration')}
          //placeholder={t('Your email address here...')}
          margin="normal"
          name="configuration"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.configuration}
          variant="outlined"
        />
        <MDBox>
         </MDBox>
         <Divider variant="fullWidth"/>
         <MDBox>

<MDButton

onClick={()=>{
handleCloseDialog2();
handleOpenDialog()
}}
size="small"
variant="outlined"
color="success"
>
<ArrowCircleLeftIcon style={{fontSize:18}}/>&nbsp;
<b style={{marginLeft:10}}>Back</b>
</MDButton>&nbsp;

<MDButton

//onClick={settimeline(2)}
size="small"
variant="contained"
color="success"

startIcon={
formik.isSubmitting ? <CircularProgress size="1rem" /> : null
}
disabled={formik.isSubmitting}
type="submit"

>

<b style={{marginLeft:10}}>Continue</b>&nbsp;
<ArrowCircleRightIcon style={{fontSize:18}}/>
</MDButton>
</MDBox>

      </form>
               
        
                      </MDBox>
                     
                    </Grid>
                    
                 
                  </Grid>
                 
                </MDBox>
              </MDBox>
            
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
 {paymentstatus==="success" && workspacesdatastate && workspacesdatastate.workspaces[0].workspace_subscriptions && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_status==="active"?
<ConfettiExplosion 
width={5000}
height={height}
particleSize={10}
particleCount={500}
duration={3000}
/>:null}
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

{dayjs(workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_enddate).format('YYYY-MM-DD')}
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
        
        </MDBox></Card>: 
         workspacesdatastate && workspacesdatastate.workspaces[0].stripe_subscription_id===null &&  workspacesdatastate.workspaces[0].plantype==="free"?
         <Card width="100%" style={{marginTop:50,marginBottom:30}}>
<MDBox display="flex" alignItems="center">
          <MDAvatar
            src={logoSlack.src || logoSlack}
            alt={<a href="https://www.flaticon.com/free-icons/seo-and-web" title="seo and web icons">Seo and web icons created by Pixel perfect - Flaticon</a>}
            size="xl"
            variant="rounded"
            bgColor={"dark"}
            sx={{
              p: 1,
              mt: -6,
              borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
            }}
            style={{marginLeft:10}}
          />
          {workspacesdatastate&&workspacesdatastate.workspaces.length>0?
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
       <MDBox ml={3} mt={-1} lineHeight={0}>
              <MDTypography variant="h5" fontWeight="medium">
              {workspacesdatastate.workspaces[0].workspacename}
              </MDTypography>
              
            </MDBox>
            </MDBox>:null}
            <MDTypography
              color="secondary"
              //onClick={dropdown.action}
              sx={{
                ml: "auto",
                mt: -1,
                alignSelf: "flex-start",
                py: 1.25,
              }}
            >
            </MDTypography>
        
        <MDBox display  ="flex" justifyContent="flex-end" alignItems="center" style={{marginTop:5}}>
           {workspacesdatastate && workspacesdatastate.workspaces[0].stripe_subscription_id!==null && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_status==="active" && 
        <MDButton color="success" variant="contained" style={{marginLeft:20}} size="small"
                onClick={()=>{
                  setupdateplan(true)
                  router.push({ pathname: '/workspace/subscription', query: { workspaceid: workspaceid,subupdateplan:true } })
                }}>Upgrade Subscription</MDButton>} 
        <IconButton
                        size="large"
                        disableRipple
                        color="inherit"
                        //sx={navbarIconButton}
                        aria-controls="notification-menu"
                        aria-haspopup="true"
                        variant="contained"
                        onClick={handleOpenMenu}
                        
                      >
                        <MoreVertIcon/>
                          
                      
                      </IconButton> 
                       {renderMenu()}&nbsp;&nbsp;&nbsp;
          </MDBox>
          
      
      
        </MDBox>
        
        <MDBox>
          
          <MDBox display="flex" justifyContent="space-between" alignItems="center" style={{marginTop:20,marginBottom:30}}> 
            <Grid container>
              <Grid item lg={0.1}></Grid>
              <Grid item lg={10} style={{marginLeft:10}}>
                <Grid container>
                  <Grid item lg={2}>
                    <Card >
                      <MDTypography style={{fontSize:15,fontWeight:600,color:"#36454F",marginLeft:20,marginTop:10}}>
                      Free Plan
                      
                      </MDTypography>
                      <MDTypography style={{fontSize:13,fontWeight:400,marginLeft:20,marginBottom:10}}>
                        Monthly Plan
                      </MDTypography>
                    </Card>
                  </Grid>
                 
                  <Grid item lg={0.5}></Grid>
                  <Grid item lg={2}>
                    <Card >
                      <MDTypography style={{fontSize:17,fontWeight:600,color:"#36454F",marginLeft:20,marginTop:10}}>
                      
                      {workspacesdatastate.workspaces[0].workspace_freeplan && dayjs(workspacesdatastate.workspaces[0].workspace_freeplan.to).format('MMMM DD YYYY')}
                      </MDTypography>
                      <MDTypography style={{fontSize:14,fontWeight:400,marginLeft:20,marginBottom:10}}>
                        Valid till
                      </MDTypography>
                    </Card>
                  </Grid>
                 
                  <Grid item lg={0.5}></Grid>
                  
                  <Grid item lg={2}>
                  <Card style={{borderColor:"#ECECEC"}}>
                      <MDTypography style={{fontSize:18,fontWeight:600,color:"#36454F",marginLeft:20,marginTop:10}}>
             10000
                      </MDTypography>
                      <MDTypography style={{fontSize:14,fontWeight:400,marginLeft:20,marginBottom:10}}>
                          Total Requests
                      </MDTypography>
                    </Card>
                  </Grid>
                  <Grid item lg={0.5}></Grid>
                  <Grid item lg={2}>
                  <Card style={{borderColor:"#ECECEC"}}>
                      <MDTypography style={{fontSize:18,fontWeight:600,color:"#36454F",marginLeft:20,marginTop:10}}>
                      {workspacesdatastate.workspaces[0].containers.length} of 1
                      </MDTypography>
                      <MDTypography style={{fontSize:14,fontWeight:400,marginLeft:20,marginBottom:10}}>
                          Containers used
                      </MDTypography>
                    </Card>
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>
            </MDBox>
        
                </MDBox>
        
        
        </Card>:
<Card width="100%" style={{marginTop:50,marginBottom:30}}>
<MDBox display="flex" alignItems="center">
          <MDAvatar
            src={logoSlack.src || logoSlack}
            alt={<a href="https://www.flaticon.com/free-icons/seo-and-web" title="seo and web icons">Seo and web icons created by Pixel perfect - Flaticon</a>}
            size="xl"
            variant="rounded"
            bgColor={"dark"}
            sx={{
              p: 1,
              mt: -6,
              borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
            }}
            style={{marginLeft:10}}
          />
          {workspacesdatastate&&workspacesdatastate.workspaces.length>0?
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
       <MDBox ml={3} mt={-1} lineHeight={0}>
              <MDTypography variant="h5" fontWeight="medium">
              {workspacesdatastate.workspaces[0].workspacename}
              </MDTypography>
              
            </MDBox>
            </MDBox>:null}
            <MDTypography
              color="secondary"
              //onClick={dropdown.action}
              sx={{
                ml: "auto",
                mt: -1,
                alignSelf: "flex-start",
                py: 1.25,
              }}
            >
            </MDTypography>
        
        <MDBox display  ="flex" justifyContent="flex-end" alignItems="center" style={{marginTop:5}}>
           {workspacesdatastate && workspacesdatastate.workspaces[0].stripe_subscription_id!==null && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_status==="active" && 
        <MDButton color="success" variant="contained" style={{marginLeft:20}} size="small"
                onClick={()=>{
                  setupdateplan(true)
                  router.push({ pathname: '/workspace/subscription', query: { workspaceid: workspaceid,subupdateplan:true } })
                }}>Upgrade Subscription</MDButton>} 
        <IconButton
                        size="large"
                        disableRipple
                        color="inherit"
                        //sx={navbarIconButton}
                        aria-controls="notification-menu"
                        aria-haspopup="true"
                        variant="contained"
                        onClick={handleOpenMenu}
                        
                      >
                        <MoreVertIcon/>
                          
                      
                      </IconButton> 
                       {renderMenu()}&nbsp;&nbsp;&nbsp;
          </MDBox>
          
      
      
        </MDBox>
        
        


              { workspacesdatastate && workspacesdatastate.workspaces[0].stripe_subscription_id!==null && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_status==="incomplete"? 
                    <>

<MDBox>
          
          <MDBox display="flex" justifyContent="space-between" alignItems="center" style={{marginTop:20,marginBottom:30}}> 
          <Grid container>
      <Grid item lg={0.1}></Grid>
      <Grid item lg={10} style={{marginLeft:10}}>
        <Grid container>
          <Grid item lg={2}>
          <Card style={{backgroundColor:"#f2b0b0"}}>
              <MDTypography style={{fontSize:15,fontWeight:600,color:"#F65F53",marginLeft:20,marginTop:10}}>
              {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.productname}
              
              </MDTypography>
              <MDTypography style={{fontSize:14,fontWeight:400,marginLeft:20,marginBottom:10}}>
                Monthly Plan
              </MDTypography>
            </Card>
          </Grid>
          
          <Grid item lg={0.5}></Grid>
          <Grid item lg={2}>
          <Card style={{backgroundColor:"#f2b0b0"}}>
              <MDTypography style={{fontSize:15,fontWeight:600,color:"#F65F53",marginLeft:20,marginTop:10}}>
              {dayjs(workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_enddate).format('YYYY MMM DD')}
              </MDTypography>
              <MDTypography style={{fontSize:13,fontWeight:400,marginLeft:20,marginBottom:10}}>
                  Valid Till
              </MDTypography>
            </Card>
          </Grid>
          <Grid item lg={0.5}></Grid>
          <Grid item lg={2}>
          <Card style={{backgroundColor:"#f2b0b0"}}>
              <MDTypography style={{fontSize:15,fontWeight:600,color:"#F65F53",marginLeft:20,marginTop:10}}>
              {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests<1000000?
    `${workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests/1000}K`:
  `${workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests/1000000}M`  
    }
              </MDTypography>
              <MDTypography style={{fontSize:13,fontWeight:400,marginLeft:20,marginBottom:10}}>
                  Total Requests
              </MDTypography>
            </Card>
          </Grid>
          <Grid item lg={0.5}></Grid>
          <Grid item lg={2}>
          <Card style={{backgroundColor:"#f2b0b0"}}>
              <MDTypography style={{fontSize:15,fontWeight:600,color:"#F65F53",marginLeft:20,marginTop:10}}>
              {workspacesdatastate.workspaces[0].containers.length} of {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofservers}
              </MDTypography>
              <MDTypography style={{fontSize:13,fontWeight:400,marginLeft:20,marginBottom:10}}>
                  Used Container
              </MDTypography>
            </Card>
          </Grid>
          
        </Grid>
      </Grid>
    </Grid>
            </MDBox>
            <MDBox display="flex" justifyContent="space-between" alignItems="left" flexDirection="column" style={{marginTop:20,marginBottom:30}}> 
            <Grid container>
              <Grid item lg={2}></Grid>
              <Grid item lg={8}>
            
              <MDBox display="flex" justifyContent="flex-start" alignItems="left" style={{marginTop:20}}>
              <MDTypography style={{fontSize:14,fontWeight:600}}>{workspacesdatastate.workspaces[0].workspaceusedreq.usedrequests} of  {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests<1000000?
            `${workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests/1000}K`:
          `${workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests/1000000}M`  
            }</MDTypography>&nbsp;
            <MDTypography style={{fontSize:14}}>requests used</MDTypography>
              </MDBox>
           
              
            <MDBox width="40rem">
                  <MDProgress variant="contained" value={80} color="success" />
               
                </MDBox>
                </Grid>
                </Grid>
                </MDBox>
                </MDBox>
        
<MDBox
              display="flex"
              justifyContent={{ md: "flex-start" }}
              alignItems="left"
              lineHeight={1}
              style={{marginTop:20,marginLeft:20,marginBottom:20}}
            >
                          <MDButton
        
        onClick={()=>{
          //handleOpenDialog();
          //router.push("/stripeindex")
          setPlanchange(true);
          router.push({ pathname: '/workspace/subscription', query: { workspaceid: workspaceid,subplanchange:true } })
          
        }}
        size="medium"
        variant="outlined"
        color="success"
      >
        
        <b style={{marginLeft:10}}>Change Plan</b>
      </MDButton>&nbsp;&nbsp;&nbsp;
             <MDButton
        
        onClick={()=>{
          //handleOpenDialog();
          //router.push("/workspace/purchase-subscription")
          setpayment("incomplete")
          updatesubscription({
            planid:priceid,
            workspaceid:workspaceid,
            couponcode:couponname
        })
        //router.push({ pathname: '/workspace/subscription', query: { workspaceid: workspaceid,subupdateplan:true } })
          //router.push({ pathname: '/workspace/purchase-subscription', query: {subscriptionid: workspacesdata.workspaces[0].stripe_subscription_id,workspaceid:workspaceid} })
          
        }}
        size="medium"
        variant="contained"
        color="success"
      >
        
        <b style={{marginLeft:10}}>Complete Payment</b>
      </MDButton> 
            </MDBox>
                    </>  : workspacesdatastate && workspacesdatastate.workspaces[0].workspace_subscriptions && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_status==="active" &&
                    <>
                         

                         {workspacesdatastate.workspaces[0].workspace_subscriptions.cancel_at_period_end &&
                <MDTypography variant="body" sx={{ mt: 2, mb: 1, ml: 2 }} style={{marginTop:20,marginLeft:20,fontSize:16,fontWeight:500}} >
   Your subscription was canceled, it will be ended by {dayjs(workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_enddate).format('YYYY-MM-DD')}

</MDTypography>}


                <MDBox>
          
  <MDBox display="flex" justifyContent="space-between" alignItems="center" style={{marginTop:20,marginBottom:30}}> 
    <Grid container>
      <Grid item lg={0.1}></Grid>
      <Grid item lg={10} style={{marginLeft:10}}>
        <Grid container>
          <Grid item lg={1.5}>
          <Card style={{backgroundColor:"#e8fff3"}}>
              <MDTypography style={{fontSize:16,fontWeight:600,color:"#17845D",marginLeft:20,marginTop:10}}>
              {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.productname}
              
              </MDTypography>
              <MDTypography style={{fontSize:13,fontWeight:400,marginLeft:20,marginBottom:10}}>
                Monthly Plan
              </MDTypography>
            </Card>
          </Grid>
          
          <Grid item lg={0.5}></Grid>
          <Grid item lg={1.5}>
          <Card style={{backgroundColor:"#e8fff3"}}>
              <MDTypography style={{fontSize:16,fontWeight:600,color:"#17845D",marginLeft:20,marginTop:10}}>
              {dayjs(workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_enddate).format('YYYY MMM DD')}
              </MDTypography>
              <MDTypography style={{fontSize:13,fontWeight:400,marginLeft:20,marginBottom:10}}>
                  Valid Till
              </MDTypography>
            </Card>
          </Grid>
          <Grid item lg={0.5}></Grid>
          <Grid item lg={1.5}>
          <Card style={{backgroundColor:"#e8fff3"}}>
              <MDTypography style={{fontSize:16,fontWeight:600,color:"#17845D",marginLeft:20,marginTop:10}}>
              {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests<1000000?
    `${workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests/1000}K`:
  `${workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests/1000000}M`  
    }
              </MDTypography>
              <MDTypography style={{fontSize:13,fontWeight:400,marginLeft:20,marginBottom:10}}>
                  Total Requests
              </MDTypography>
            </Card>
          </Grid>
          <Grid item lg={0.5}></Grid>
          <Grid item lg={1.5}>
          <Card style={{backgroundColor:"#e8fff3"}}>
              <MDTypography style={{fontSize:16,fontWeight:600,color:"#17845D",marginLeft:20,marginTop:10}}>
              {workspacesdatastate.workspaces[0].containers.length} of {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofservers}
              </MDTypography>
              <MDTypography style={{fontSize:13,fontWeight:400,marginLeft:20,marginBottom:10}}>
                  Used Container
              </MDTypography>
            </Card>
          </Grid>
          
        </Grid>
      </Grid>
    </Grid>
    </MDBox>
    <MDBox display="flex" justifyContent="space-between" alignItems="left" flexDirection="column" style={{marginTop:20,marginBottom:30}}> 
    <Grid container>
      <Grid item lg={0.1}></Grid>
      <Grid item lg={8} style={{marginLeft:5}}>
    
      <MDBox display="flex" justifyContent="flex-start" alignItems="left" style={{marginTop:20}}>
      <MDTypography style={{fontSize:14,fontWeight:600}}>{workspacesdatastate.workspaces[0].workspaceusedreq.usedrequests} of  {workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests<1000000?
    `${workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests/1000}K`:
  `${workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests/1000000}M`  
    }</MDTypography>&nbsp;

<MDTypography style={{fontSize:14,fontWeight:600}}>( {Math.round((workspacesdatastate.workspaces[0].workspaceusedreq.usedrequests/workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests) * 100)}% )</MDTypography>&nbsp;

    <MDTypography style={{fontSize:14}}>requests used</MDTypography>
      </MDBox>
   
      
    <MDBox width="40rem">
      
      {(workspacesdatastate.workspaces[0].workspaceusedreq.usedrequests/workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests * 100) < 70?
          <MDProgress variant="contained" value={(workspacesdatastate.workspaces[0].workspaceusedreq.usedrequests/workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests) * 100} color="warning" />
       :
       (workspacesdatastate.workspaces[0].workspaceusedreq.usedrequests/workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests * 100)<50?
       <MDProgress variant="contained" value={(workspacesdatastate.workspaces[0].workspaceusedreq.usedrequests/workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests) * 100} color="success" />
       :
       <MDProgress variant="contained" value={(workspacesdatastate.workspaces[0].workspaceusedreq.usedrequests/workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests) * 100} color="error" />
  }
        </MDBox>
        
        </Grid>
        
        </Grid>
        
        </MDBox>

        </MDBox>



           
            
                    </>}
        
        </Card>}

        
        <MDBox py={2}>
        <Grid container>
        <Card sx={{ width: "100%" }} >
    

      {workspacesdatastate && workspacesdatastate.workspaces[0].containers.length>0 ?
       <MDBox py={0.5}>
       <Grid container>
   <Card style={{width:"100%"}}>
   <MDBox display="flex" justifyContent="space-between" alignItems="center">
   <MDBox p={3} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
             Containers
              </MDTypography>
              
            </MDBox>
<MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20}}>
       <MDButton
       
       onClick={()=>{
         handleOpenDialog();
        // router.push("/stripeindex")
         
       }}
       size="small"
       variant="contained"
       color="success"
     >
       
       Add Container
     </MDButton> &nbsp;&nbsp;&nbsp;
     </MDBox>
     </MDBox>
       {containerdata?
  
   <WorkspaceTable data={containerdata.container} columns={columns} loading={containerdataloading} noEndBorder isSorted={false}/>
   
 :<CircularProgress/>}
   </Card>
   </Grid>
   </MDBox>
    :
    workspacesdatastate && workspacesdatastate.workspaces[0].stripe_subscription_id!==null && workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_subscription_status==="active" || workspacesdatastate && workspacesdatastate.workspaces[0].plantype==="free"?
   
    <MDBox py={0.5}>
        <Grid container>
        <Card style={{width:"100%"}}>
    <MDBox display="flex" justifyContent="flext-start" alignItems="left" flexDirection="column">
    <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
          No Containers. Create Now
        </MDTypography>
<MDBox justifyContent="flex-end" alignItems="center" style={{marginTop:20,marginLeft:20,marginBottom:20}}>
        <MDButton
        
        onClick={()=>{
          handleOpenDialog();
         // router.push("/stripeindex")
          
        }}
        size="small"
        variant="contained"
        color="success"
      >
        
        Add Container
      </MDButton> &nbsp;&nbsp;&nbsp;
      </MDBox>
      </MDBox>
        
    </Card>
   
    </Grid>
    </MDBox>:null
    }
   </Card>
        </Grid>
      </MDBox>



     {/*  <Footer /> */}
    </DashboardLayout>
    </Authenticated>
  );
}

export default Workspaces;

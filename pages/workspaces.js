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
import Link from "next/link";

import Checkbox from '@mui/material/Checkbox';
import tag from "../assets/images/logo/tag.jpg";
import support from "../assets/images/logo/support.jpg";
import bgImage from "../assets/images/logo/bgimage.jpg";
import Image from "next/image";
import dayjs from 'dayjs';

//import styled from "styled-components";
import {
  CircularProgress,
  Button,
  styled,
  Slide,
  Dialog,
  IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
import {
  PaymentElement,
  
  LinkAuthenticationElement,
  useStripe,
  useElements,
  
} from "@stripe/react-stripe-js";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import logoSlack from "/assets/images/small-logos/labeled.png";
//import logoSlack from '@mui/icons-material/Workspaces';
import Switch from "@mui/material/Switch";
// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";
import ReportsBarChart from "/examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "/examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "/examples/Cards/StatisticsCards/ComplexStatisticsCard";
import BookingCard from "/examples/Cards/BookingCard";
import MDButton from "/components/MDButton";
import MDBadge from "/components/MDBadge";
import logoAtlassian from "/assets/images/small-logos/logo-atlassian.svg";

import {useAuth} from '../hooks/useAuth';
import { isLoaded,isEmpty,useFirebase } from 'react-redux-firebase';
import _ from 'lodash';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Menu from "@mui/material/Menu";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
import { useVirtualizer } from '@tanstack/react-virtual'
// Anaytics dashboard components
import SalesByCountry from "/pagesComponents/dashboards/analytics/components/SalesByCountry";

// Data
import reportsBarChartData from "/pagesComponents/dashboards/analytics/data/reportsBarChartData";
import reportsLineChartData from "/pagesComponents/dashboards/analytics/data/reportsLineChartData";
import DataTable from "./DataTable";
import {useGetPricesDataQuery,useGetUsersQuery,useSetUserProfileMutation,useGetWorspaceDataQuery,useSetcreateworkspaceMutation,useSetcreatecontainerMutation,useSetdeleteworkspaceMutation,useLazyGetContainerDataQuery,useSetSubscriptionMutation,useSeteditworkspaceMutation,useSetCancelSubscriptionMutation,useGetPaymentintentDataQuery} from '../services/hasuraquerydata';
import {Authenticated} from "../pagesComponents/authenticated";
import Loadingimg from "/assets/images/icons/loading.gif";
import ComplexProjectCard from "/examples/Cards/ProjectCards/ComplexProjectCard";
import team4 from "/assets/images/team-4.jpg";
import team5 from "/assets/images/team-5.jpg";
import MDAvatar from "/components/MDAvatar";

import {create} from 'zustand';

export const useWorkspaceStore = create((set) => ({
  workspacename: "",
  setWorkspaceName: (name) => set({ workspacename: name }),
}));

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
        
        padding: 0.5rem;
        border-bottom: 1px solid #a6a6a6;
        border-top: 1px solid #a6a6a6;
        border-right: 1px solid #a6a6a6;
        text-align:left;
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
      :first-child {
        
        text-align:left;
      }
      
    }
  }
 
`));


const DialogWrapper = styled(Dialog)(
    () => `
        .MuiDialog-paper {
          overflow: visible;
        }
  `
  );


function WorkspaceTable({ columns, data,sorting,setSorting,renderSubComponent
  
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
const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  })

return (
 <>
 
  <div className="p-2" >
  
   <div className="h-2" />
   <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan} style={{color:"#17845D",fontSize:14,borderLeft:2,width:header.width}}>
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
                    <td key={cell.id} style={{fontSize:14,fontWeight:500}}>
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



const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function Workspaces() {
  const router = useRouter();
  const stripe = useStripe();
const dark = "#344767"
  const redirect_status = router.query.redirect_status;
  const payment_intent = router.query.payment_intent;
  const { user, logout, signInWithEmailAndPassword } = useAuth();
  

  let setWorkspaceName = useWorkspaceStore(state => state.setWorkspaceName);
  let workspacename = useWorkspaceStore(state => state.workspacename);


  const [datastate,setdatastate] = useState();
  const [polling,setpolling]=useState(true);
  const [selectedworkspaceid,setselectedworkspaceid] = useState();
  const [selectedworkspacename,setselectedworkspacename] = useState();
  React.useEffect(()=>{

  },[redirect_status,payment_intent])
  const {data:pricesdata,isLoading:pricesdataloading,isSuccess:pricesdatasuccess}= useGetPricesDataQuery({},{
    
    skip:isEmpty(user),
    refetchOnMountOrArgChange: true,
    skip: false,
   });

   const {data:usersdata,isLoading:usersdataloading,isSuccess:usersdatasuccess}= useGetUsersQuery({},{
    pollingInterval: 3000,
    skip:isEmpty(user),
    refetchOnMountOrArgChange: true,
    skip: false,
   });
   //console.log(`pricesdata is ${JSON.stringify(pricesdata)}`)
   const [workspacesdatastate,setworkspacesdatastate] = useState();
   const [usersdatastate,setusersdatastate] = useState();
   React.useEffect(()=>{
    if(usersdata){
      const tempdata = _.cloneDeep(usersdata)
      setusersdatastate(tempdata)
    }
   },[usersdata])
  const { data: workspacesdata, isLoading:workspacesloading,isSuccess:workspacedatasuccess} = useGetWorspaceDataQuery({},{
    skip:isEmpty(user),
    refetchOnMountOrArgChange: true,
    //pollingInterval: polling?5000:0,
    pollingInterval: 3000,
    skipPollingIfUnfocused: true,
    skip: false,
  })
  //console.log(`workspacedata is ${JSON.stringify(workspacesdata)}`)
  const [state,setstate]=useState({
    anchorEl: null,
    menus: []
  });
  React.useEffect(()=>{
if (workspacesdata) {
  const menus = workspacesdata.workspaces.map(m => false);
  setstate({ anchorEl: null,menus });
  console.log(`menuitems menu is ${JSON.stringify(menus)}`)

  const tempdata = _.cloneDeep(workspacesdata)
  setworkspacesdatastate(tempdata);
  if(workspacesdata.workspaces.length>0 && workspacesdata.workspaces[0].workspace_subscriptions){
  setSelectedValue(workspacesdata.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.productname)
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


   const [cancelsubscriptions, setcancelsubscription] = useState(false);
   const openCancelSubscription = () => setcancelsubscription(true);
   const closeCancelSubscription = () => setcancelsubscription(false);


   const [updatesubscriptions, setupdatesubscription] = useState(false);
   const openUpdateSubscription = () => setupdatesubscription(true);
   const closeUpdateSubscription = () => setupdatesubscription(false);

   const [setuserprofile,{ data:setuserprofiledata, isLoading:setuserprofiledataloading }] = useSetUserProfileMutation();




  const [rowid,setrowid] = useState('')

  const [containerdatastate,setcontainerdatastate] = useState();

  const [getcontainerdata, {data:containerdata,isUninitialized,isLoading:containerdataloading,isSuccess:containerdataSuccess}, lastPromiseInfo] = useLazyGetContainerDataQuery();
/* 
  const { data: containerdata, isLoading:containerdataloading,isSuccess:containerdataSuccess} = useGetContainerDataQuery({
    workspaceid:rowid
  },{
    skip:isEmpty(rowid===''),
    refetchOnMountOrArgChange: true,
    //pollingInterval: polling?5000:0,
    pollingInterval: 5000,
    skipPollingIfUnfocused: true,
    skip: false,
  }) */
  React.useEffect(()=>{
    if(containerdata) {
        
           const tempdata = _.cloneDeep(containerdata)
           setcontainerdatastate(tempdata)
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
        
      
       },[containerdata,rowid])
    

  const handleToggle=(row)=>{


      
      row.toggleExpanded();
      
      
      //logger.debug(`row.toggleExpanded is ${row.toggleExpanded.toString()}`)
     // console.log(`table expanded options are ${JSON.stringify(tablestate.getExpandedRowModel())} ${tablestate.getExpandedDepth}`)
      if(row.depth===0){
       
    
        //console.log(`row depth ${row.depth} row id ${row.workspaceid} row index ${row.index}`)
      setrowid(row.original.workspaceid);
      // logger.debug(`fromdate ${fromdate} todate ${todate} row data is ${JSON.stringify(row.original)}`)
      if(!row.getIsExpanded()){
        
        getcontainerdata({
         workspaceid:row.original.workspaceid,
                  }) 
        
    
      }
    }
     }


     const renderadsRowSubComponent = React.useCallback(
        ({ row }) => 
        {
          //console.log(`row in table subquery component is ${row.original.entityid}`)
         
          //console.log(` api table data is ${JSON.stringify(containerdata)}`)
          //setshowadgtable(!showadgtable)
        return(
          <>
         
         <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }} style={{textAlign:'left'}}>
          Containers
        </MDTypography>
        <Divider/>
        <MDBox >
<Grid container spacing={3} >
                      
                      <Grid item xs={12} md={6} lg={3} sx={{
                       
                         borderTop:1,
                        "&:last-child":{
                        borderBottom:0
                        }
                      }}>
                        <MDBox display="flex" flexDirection="column" >
                      <MDTypography variant="title" fontWeight="medium" style={{fontSize:16,color:"#17845D"}}>
                        Name
                        </MDTypography>
       
                      </MDBox>
     
      </Grid>
      <Grid item xs={12} md={6} lg={3} sx={{  borderTop:1 }}>
      <MDBox display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                      <MDTypography variant="title" fontWeight="medium" style={{fontSize:16,color:"#17845D"}}>
                        Status
                        </MDTypography>
       
      </MDBox>
                      </Grid>

      <Grid item xs={12} md={6} lg={2.5} sx={{  borderTop:1 }}>
      
                        <MDBox display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                      <MDTypography variant="title" fontWeight="medium" style={{fontSize:16,color:"#17845D"}}>
                        Region Code
                        </MDTypography>
                      </MDBox>
                      </Grid>

      <Grid item xs={12} md={6} lg={2.5} sx={{  borderTop:1}}>
     
                        <MDBox display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                      <MDTypography variant="title" fontWeight="medium" style={{fontSize:16,color:"#17845D"}} >
                        Used requests
                        </MDTypography>
       
                      </MDBox>
                      </Grid>

      <Grid item xs={12} md={6} lg={1} sx={{ borderTop:1 }}>
     
                        <MDBox display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                      <MDTypography variant="title" fontWeight="medium" style={{fontSize:16,color:"#17845D"}} >
                        
                        </MDTypography>
      
        </MDBox>
                      </Grid>
                    
      </Grid>
        <Divider />
        
</MDBox>
           {containerdata?
           <>
            
        

<MDBox mt={3}>
                   

        
{containerdata && <>
{
containerdata.container.map((containeritem)=>{
return(
<MDBox key={containeritem.containerid} style={{marginBottom:30}}>
<Grid container spacing={3} key={containeritem.containerid}>
                      
                      <Grid item xs={12} md={6} lg={3} sx={{borderTop:1}}>
                        <MDBox display="flex" flexDirection="column" >
                      
      
                    <MDTypography variant="button" fontWeight="medium" style={{fontSize:16}}>
                      {containeritem.containername}
                      </MDTypography>
                      </MDBox>
     
      </Grid>
      <Grid item xs={12} md={6} lg={3} sx={{  borderTop:1 }}>
      <MDBox display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                      
      
        {containeritem.container_requests.request_status ==="initiated" || containeritem.container_requests.request_status ==="inprocess"?
        <MDBox display="flex" flexDirection="row" style={{fontSize:16,fontWeight:500}}>{"creating container "} &nbsp;<Image 
        src={Loadingimg}
        alt={"loading"}
        quality={50}
        //sizes="100%"
        style={{ width: "20%", height: "20%", display: "block",marginTop:-20 }}
      /></MDBox>
      :
      containeritem.container_requests.request_status ==="finished"?
      <MDBadge
        variant="contained"
        color="success"
        badgeContent="Active"
        container
      />:
      <MDBadge
        variant="contained"
        color="error"
        badgeContent="Inactive"
        container
      />
      }
      </MDBox>
                      </Grid>

      <Grid item xs={12} md={6} lg={2.5} sx={{  borderTop:1}}>
      
                        <MDBox display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                      
      
      <MDTypography variant="button" fontWeight="medium" style={{fontSize:16}}>
      {containeritem.regioncode}
                      </MDTypography>
                      </MDBox>
                      </Grid>

      <Grid item xs={12} md={6} lg={2.5} sx={{  borderTop:1 }}>
     
                        <MDBox display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                      
      
      <MDTypography variant="button" fontWeight="medium" style={{fontSize:16}}>
      {"1200"}
                      </MDTypography>
                      </MDBox>
                      </Grid>

      <Grid item xs={12} md={6} lg={1} sx={{ borderTop:1}}>
     
                        <MDBox display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                      <MDTypography variant="title" fontWeight="medium" style={{fontSize:16,color:"#17845D"}} >
                        
                        </MDTypography>
      
      <MDButton variant="gradient" color="warning" style={{marginBottom:10}} iconOnly onClick={()=>{
                    //router.push("/containersettings")
                    router.push({ pathname: '/workspace/container', query: { containerid: containeritem.containerid} })
                   }}>
         <Icon>settings</Icon>
        </MDButton>
        </MDBox>
                      </Grid>
                    
      </Grid>
       {/*  <Divider style={{margin:5}}/> */}
        
</MDBox>
)
})
}</>
}

                      </MDBox>
          

        </>:<CircularProgress/>}
          </>
        )
        },
        [rowid,containerdata]
      )

     const [successContainer, setSuccessContainer] = useState(false);
     const openSuccessContainer = () => setSuccessContainer(true);
     const closeSuccessContainer = () => setSuccessContainer(false);

  //console.log(`datastate is ...................${JSON.stringify(datastate)}`)

  const [errorContainer, setErrorContainer] = useState(false);


  const openErrorContainer = () => setErrorContainer(true);
  const closeErrorContainer = () => setErrorContainer(false);


  const [successWorkspace, setSuccessWorkspace] = useState(false);
  const openSuccessWorkspace = () => setSuccessWorkspace(true);
  const closeSuccessWorkspace = () => setSuccessWorkspace(false);

  const [successEditWorkspace, setSuccessEditWorkspace] = useState(false);
  const openEditSuccessWorkspace = () => setSuccessEditWorkspace(true);
  const closeEditSuccessWorkspace = () => setSuccessEditWorkspace(false);


const [errorWorkspace, setErrorWorkspace] = useState(false);


const openErrorWorkspace = () => setErrorWorkspace(true);
const closeErrorWorkspace = () => setErrorWorkspace(false);

  const [setcreateworkspace,{ data:setcreateworkspacedata, isLoading:setcreateworkspaceloading }] = useSetcreateworkspaceMutation();
  React.useEffect(()=>{

   if (setcreateworkspacedata) {
     
     //console.log(`setcreateworkspacedata data is ..............................${JSON.stringify(setcreateworkspacedata)}`)
     if(setcreateworkspacedata.createworkspace.status===true){
        openSuccessWorkspace()
     }
     else{
        openErrorWorkspace()
     }
   }},[setcreateworkspacedata]);


  const [seteditworkspace,{ data:seteditworkspacedata, isLoading:seteditworkspaceloading }] = useSeteditworkspaceMutation();
  React.useEffect(()=>{

   if (seteditworkspacedata) {
     
     //console.log(`seteditworkspacedata data is ..............................${JSON.stringify(seteditworkspacedata)}`)
     if(seteditworkspacedata.editworkspace.status===true){
        openEditSuccessWorkspace()
     }
     
   }},[seteditworkspacedata]);
 
   const [setdeleteworkspace,{ data:setdeleteworkspacedata, isLoading:setdeleteworkspaceloading }] = useSetdeleteworkspaceMutation();
   React.useEffect(()=>{
 
    if (setdeleteworkspacedata) {
      
      //console.log(`seteditworkspacedata data is ..............................${JSON.stringify(seteditworkspacedata)}`)
      handleCloseDeleteDialog()
      if(setdeleteworkspacedata.delete_workspaces.affected_rows.length>0){
         handleCloseDeleteDialog()
      }
      
    }},[setdeleteworkspacedata]);
  

   const [setcreatecontainer,{ data:setcreatecontainerdata,error,isSuccess, isLoading:setcreatecontainerdataloading }] = useSetcreatecontainerMutation();
   React.useEffect(()=>{

    if (setcreatecontainerdata) {
      
      //console.log(`setcreatecontainerdata data is ..............................${JSON.stringify(setcreatecontainerdata)}`)
      if(setcreatecontainerdata.createcontainer.status===true){
        openSuccessContainer()
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
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    
  };
 
  
  const [autoupgrade, setautoupgrade] = useState(false);
  const [period, setPeriod] = useState('');
  //const [selectedValue, setSelectedValue] = useState(workspacesdatastate?workspacesdatastate.workspaces[0].workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.productname:'free');
  const [selectedValue, setSelectedValue] = useState('free');
  //console.log(`selected value is ${selectedValue}` )
  
  
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

  const workspacecolumns = React.useMemo(
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
        accessorKey: 'workspacename',
        header: () => <span> Name</span>,
        enableHiding:false,
        
         cell: ({ row, getValue }) => {
          return (
            <div
                style={{
                  // Since rows are flattened by default,
                  // we can use the row.depth property
                  // and paddingLeft to visually indicate the depth
                  // of the row
                  paddingLeft: `${row.depth * 1}rem`,
                  whiteSpace:'nowrap',
                  overflow:'hidden',
                  textOverflow:'ellipsis'
                  
                }}
              >{/* 
                 <IconButton
                sx={{
                  '&:hover': {
                    background: "#d2fce7"
                  },
                  color: "#17845D",
                 
                }}
                color="inherit"
                size="small"
                  onClick={() => {
                   // event.stopPropagation();
                   setrowid(row.original.workspaceid);
                   handleToggle(row);
                  
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {row.depth===1?null:row.getIsExpanded() ? <ArrowDropDownIcon style={{marginLeft:-10,color: "#17845D"}} fontSize="large"/>: <ArrowRightIcon style={{marginLeft:-10}} fontSize="large"/>}
                </IconButton> */}
<MDButton variant="text" color="dark" style={{fontSize:14,textTransform:"capitalize",fontWeight:500}} onClick={()=>{
    setWorkspaceName(row.original.workspacename);

  router.push({ pathname: '/workspace/settings', query: { workspaceid: row.original.workspaceid } })}}>
                <span title={getValue()} style={{lineHeight:"2rem",marginLeft:10}}>{getValue()}</span>
                </MDButton>
               
            </div>
          );
        },
        footer: props => props.column.id,
      },
      {
        accessorKey: 'workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.productname',
        header: () => <span> Plan Type</span>,
        enableHiding:false,
        size:10,
         cell: ({ row, getValue }) => {
          return (
            <div
              >

                <span title={getValue()} style={{lineHeight:"2rem",marginLeft:10}}>{row.original.stripe_subscription_id===null && row.original.plantype==="free"? "Free Plan": row.original.stripe_subscription_id!==null?`${getValue()} `:
                <MDButton variant="contained" color="warning" onClick={()=>{
                    //router.push("/containersettings")
                    setWorkspaceName(row.original.workspacename);
                    router.push({ pathname: '/workspace/subscription', query: { workspaceid: row.original.workspaceid } })
                   }}>
         Add Subscription
        </MDButton>
                }</span>
            </div>
          );
        },
        footer: props => props.column.id,
      },
      {
        accessorKey: 'workspace_subscriptions.stripe_subscription_status',
        header: () => <span>Plan Status</span>,
        enableHiding:false,
        
         cell: ({ row, getValue }) => {
          return (
            <div
              >

                <span title={getValue()} style={{lineHeight:"2rem",marginLeft:10}}>
                    {row.original.stripe_subscription_id===null && row.original.plantype==="free"?
                    <MDBadge
                    variant="contained"
                    color="success"
                    badgeContent="Active"
                    size="sm"
                    container
                  />:
                    row.original.stripe_subscription_id ===null || row.original.workspace_subscriptions && row.original.workspace_subscriptions.stripe_subscription_status==="incomplete"?            
      <MDBadge
        variant="contained"
        color="error"
        badgeContent="Inactive"
        size="sm"
        container
      />:
      <MDBadge
        variant="contained"
        color="success"
        badgeContent="Active"
        size="sm"
        container
      />}
                    </span>
            </div>
          );
        },
        footer: props => props.column.id,
      },
      {
        accessorKey: 'workspace_subscriptions.stripe_subscription_enddate',
        header: () => <span>Valid Till</span>,
        enableHiding:false,
        
         cell: ({ row, getValue }) => {
          return (
            <div
              >

               {/*  <span title={getValue()} style={{lineHeight:"2rem",marginLeft:10}}>{getValue()}</span> */}
               <span title={getValue()} style={{lineHeight:"2rem",marginLeft:10}}>{row.original.stripe_subscription_id===null && row.original.plantype==="free"? dayjs(row.original.workspace_freeplan.to).format('MMMM DD YYYY') :row.original.stripe_subscription_id ===null || row.original.workspace_subscriptions && row.original.workspace_subscriptions.stripe_subscription_status==="incomplete"?"--":dayjs(getValue()).format('MMMM DD YYYY')}</span>

            </div>
          );
        },
        footer: props => props.column.id,
      },
      {
        id: "settings",
      
        header: () => <span> Settings</span>,
        enableHiding:false,
        width:50,
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        cell: ({ row,getValue }) => {
          //console.log("row is " + JSON.stringify(row.original));
          return (
            <MDBox>
              
           <MDButton variant="gradient" color="info" iconOnly onClick={()=>{
            //router.push("/containersettings")
            setWorkspaceName(row.original.workspacename);
            router.push({ pathname: '/workspace/settings', query: { workspaceid: row.original.workspaceid } })
           }}>
  <Icon>settings</Icon>
</MDButton>&nbsp;&nbsp;

<MDButton variant="gradient" color="warning" iconOnly onClick={()=>{
            //router.push("/containersettings")
            handleOpenEditDialog();
            setselectedworkspaceid(row.original.workspaceid);
            setselectedworkspacename(row.original.workspacename);
           }}>
  <Icon>edit</Icon>
</MDButton>
&nbsp;&nbsp;
{/* 
<MDButton variant="gradient" color="error" iconOnly onClick={()=>{
            //router.push("/containersettings")
            handleOpenDeleteDialog();
            setselectedworkspaceid(row.original.workspaceid);
            setselectedworkspacename(row.original.workspacename);
           }}>
  <Icon>delete</Icon>
</MDButton> */}
            </MDBox>
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
      
    ]
  )
  const [slackBotMenu, setSlackBotMenu] = useState(null);

  const gotosettings = workspace =>{
    setWorkspaceName(workspace.workspacename);
    router.push({ pathname: '/workspace/settings', query: { workspaceid: workspace.workspaceid } })
  }
 const  openSlackBotMenu = index => event => {
    const { menus } = state;
    menus[index] = true;

    console.log(`menuitems in openslackbot is ${JSON.stringify(menus)},  index is ${index}`)
    setstate({ anchorEl: event.currentTarget, menus });
  };

 const closeSlackBotMenu = index => () => {
    const { menus } = state;
    menus[index] = false;
    setstate({ anchorEl: null, menus });
  };
 const onSettings = workspace => event=> {
  alert(workspace.workspacename);
  console.log(`menuitems workspace in subscription is ${JSON.stringify(workspace)}`)
  setWorkspaceName(workspace.workspacename);
  router.push({ pathname: '/workspace/settings', query: { workspaceid: workspace.workspaceid } })
  closeSlackBotMenu()
  }
  const onSubscription = workspace  => event =>{
    alert(workspace.workspacename);
    console.log(`menuitems workspace in subscription is ${JSON.stringify(workspace)}`)
    setWorkspaceName(workspace.workspacename);
    router.push({ pathname: '/workspace/subscription', query: { workspaceid: workspace.workspaceid } })
    closeSlackBotMenu()
  }
  const renderMenu = (state, close,workspacename,workspaceid) => (
    <Menu
      anchorEl={state}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(state)}
      onClose={close}
      
    >
      
      <MenuItem onClick={()=>{
        router.push({ pathname: '/workspace/subscription', query: { workspaceid: workspaceid } })
        closeSlackBotMenu()
      }}>Subscription</MenuItem>
      <MenuItem onClick={()=>{
        setWorkspaceName(workspacename);
        router.push({ pathname: '/workspace/settings', query: { workspaceid: workspaceid } })
        closeSlackBotMenu()
      }}>Settings</MenuItem>
      
      <MenuItem onClick={()=>{
        handleOpenEditDialog();
        setselectedworkspaceid(workspaceid);
        setselectedworkspacename(workspacename);
        closeSlackBotMenu()
      }}>Edit</MenuItem>
      
      
    </Menu>
  );


const [turnupgrade,setturnupgrade] = useState(true)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      workspacename: openDialog ? '': openEditDialog && workspacesdatastate && workspacesdatastate.workspaces.length>0 ?workspacesdatastate.workspaces[0].workspacename:'',
      
     
    },
    validationSchema: Yup.object({
        workspacename: Yup.string()
        
        .max(255)
        .required('Workspace name field is required'),
        
     
    }),
    onSubmit: async (values, helpers) => {

      //console.log(`form values are ${JSON.stringify(values)}`)
      setselectedworkspacename(values.workspacename)
      if(openDialog){
      setcreateworkspace({
        
          workspacename:values.workspacename
          
      })
    
      handleCloseDialog();
    }
    else if(openEditDialog){
      seteditworkspace({
        workspacename:values.workspacename,
        workspaceid:selectedworkspaceid
      })
      handleCloseEditDialog()
    }
      /* if(setcreatecontainerdata.data.createcontainer.status){
        
      } */

    }
  });
  const userformik = useFormik({
    initialValues: {
      firstname:'',
      lastname:'',
      accounttype:'personal',
      agencyname:'',
      workspacename:'',
      mobno:'',
      location:''
      
     
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        
        .max(255)
        .required('First name field is required'),
        lastname: Yup.string()
        
        .max(255)
        .required('Last name field is required'),
        accounttype: Yup.string()
        
        .max(255)
        .required('Account Type field is required'),
        agencyname: Yup.string()
        
        .max(255)
        .required('Agency name field is required'),
        workspacename: Yup.string()
        
        .max(255)
        .required('Workspace name field is required'),
        
     
    }),
    onSubmit: async (values, helpers) => {

      //console.log(`form values are ${JSON.stringify(values)}`)
      setuserprofile({
        firstname:values.firstname,
        lastname:values.lastname,
        accounttype:values.accounttype,
        agencyname:values.agencyname,
        workspacename:values.workspacename,
        workspaceid:workspacesdatastate.workspaces[0].workspaceid,
        accountid:workspacesdatastate.workspaces[0].accountid
      })
      
      /* if(setcreatecontainerdata.data.createcontainer.status){
        
      } */

    }
  });
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
      title="Workspace Created Successfully"
      //content="Container Created Successfully"
     // dateTime="11 mins ago"
      open={successWorkspace}
      onClose={closeSuccessWorkspace}
      close={closeSuccessWorkspace}
      bgSuccess
    />
    <MDSnackbar
      color="success"
      icon="check"
      title="Workspace Edited Successfully"
      //content="Container Created Successfully"
     // dateTime="11 mins ago"
      open={successEditWorkspace}
      onClose={closeEditSuccessWorkspace}
      close={closeEditSuccessWorkspace}
      bgSuccess
    />
    <MDSnackbar
      color="error"
      icon="warning"
      title="Workspace limit exceeded"
      //content="Container Created Successfully"
     // dateTime="11 mins ago"
      open={errorWorkspace}
      onClose={closeErrorWorkspace}
      close={closeErrorWorkspace}
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
                          open={openDialog}
                          maxWidth="sm"
                          //width="800"
                          fullWidth
                          //TransitionComponent={Transition}
                          keepMounted
                          onClose={handleCloseDialog}
                        >
                            <MDBox my={2} >
                          

                                <MDBox pt={1} pb={3} px={2}>
                                  
                                  
                                <MDBox pt={1} px={1} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                                
                        
                                <MDTypography variant="h5" fontWeight="medium">
                                  Create Workspace
                                </MDTypography>
                              
                                      <Divider/>
                                        <form noValidate onSubmit={formik.handleSubmit}>
                                      
                                                              {/* <MDTypography variant="title" style={{fontSize:"14px",fontWeight:"200",marginTop:10}}>
                                        Your package will automatically be upgraded based on your requests.
                                          </MDTypography> */}
                          <TextField
                            
                            fullWidth
                            
                            label={'Workspace Name'}
                            //placeholder={t('Your email address here...')}
                            {...formik.getFieldProps('workspacename')}
                            helperText={formik.errors.workspacename && formik.touched.workspacename && `${formik.errors.workspacename}`}
                            error={formik.touched.workspacename && formik.errors.workspacename}
                            margin="normal"
                            name="workspacename"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.workspacename}
                            
                            variant="outlined"
                          />
                          
                          <Divider />
                          <MDBox>

                  <MDButton

                  onClick={()=>{
                  handleCloseDialog();

                  }}
                  size="small"
                  variant="outlined"
                  color="success"
                  >

                  Close
                  </MDButton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                  <MDButton

                  //onClick={settimeline(2)}
                  size="small"
                  variant="gradient"
                  color="success"

                  startIcon={
                  formik.isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={formik.isSubmitting}
                  type="submit"

                  >

                  Submit

                  </MDButton>
                  </MDBox>

                        </form>
                                
                          
                                        
                                      
                                  
                                  
                      
                                    </MDBox>
                                  
                                </MDBox>
                              
                        </MDBox>
                          
                        </DialogWrapper>
                        <DialogWrapper
                          open={openEditDialog}
                          maxWidth="lg"
                          //width="800"
                          
                          //TransitionComponent={Transition}
                          keepMounted
                          onClose={handleCloseEditDialog}
                        >

<MDBox my={2} >
                          

                          <MDBox pt={1} pb={3} px={2}>
                            
                            
                          <MDBox pt={1} px={1} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                          
                  
                          <MDTypography variant="h5" fontWeight="medium">
                            Edit Workspace
                          </MDTypography>
                        
                                <Divider/>
                                  <form noValidate onSubmit={formik.handleSubmit}>
                                
                                                        {/* <MDTypography variant="title" style={{fontSize:"14px",fontWeight:"200",marginTop:10}}>
                                  Your package will automatically be upgraded based on your requests.
                                    </MDTypography> */}
                    <TextField
                      
                      fullWidth
                      
                      label={'Workspace Name'}
                      placeholder={workspacesdatastate && workspacesdatastate.workspaces[0].workspacename}
                      {...formik.getFieldProps('workspacename')}
                      //helperText={formik.errors.workspacename && formik.touched.workspacename && `${formik.errors.workspacename}`}
                      error={formik.touched.workspacename && formik.errors.workspacename}
                      margin="normal"
                      name="workspacename"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      value={formik.values.workspacename}
                      
                      variant="outlined"
                    />
                    
                    <Divider />
                    <MDBox>

            <MDButton

            onClick={()=>{
            handleCloseEditDialog();

            }}
            size="small"
            variant="outlined"
            color="success"
            >

            Close
            </MDButton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <MDButton

            //onClick={settimeline(2)}
            size="small"
            variant="gradient"
            color="success"

            startIcon={
            formik.isSubmitting ? <CircularProgress size="1rem" /> : null
            }
            disabled={formik.isSubmitting}
            type="submit"

            >

            Submit

            </MDButton>
            </MDBox>

                  </form>
                          
                    
                                  
                                
                            
                            
                
                              </MDBox>
                            
                          </MDBox>
                        
                  </MDBox>
                    
                          
                        </DialogWrapper>

                        <DialogWrapper
                          open={openDeleteDialog}
                          maxWidth="lg"
                          //width="800"
                          
                          //TransitionComponent={Transition}
                          keepMounted
                          onClose={()=>{
                            handleCloseDeleteDialog()
                          }}
                        >

                  <MDBox my={2} style={{height:"200px",width:"500px"}}>
                          <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} lg={12}>
                              <MDBox display="flex" justifyContent="center" alignItems="center">
                  <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
                  Are you sure you want to delete {selectedworkspacename} worksspace        </MDTypography>
                              </MDBox>
                              <Divider variant="fullWidth"/>
                              <MDBox display="flex" justifyContent="center" alignItems="center" style={{marginTop:30}}>
                              
                          <MDBox>

                  <MDButton

                  onClick={()=>{
                  handleCloseDeleteDialog();

                  }}
                  size="small"
                  variant="outlined"
                  color="error"
                  >

                  <b style={{marginLeft:10}}>Discard</b>
                  </MDButton>&nbsp;&nbsp;&nbsp;&nbsp;

                  <MDButton

                  onClick={()=>{
                    setdeleteworkspace({
                              
                    workspaceid:selectedworkspaceid
                  })}}
                  size="small"
                  variant="gradient"
                  color="error"

                  type="submit"

                  >

                  <b style={{marginLeft:10}}>Yes Delete</b>&nbsp;

                  </MDButton>
                  </MDBox>

                                          </MDBox>
                                    
                              
                              </Grid>
                              </Grid>
                              </MDBox>
                          </DialogWrapper>


      {
workspacesdatastate &&<>
    
                <MDBox py={0.5} style={{marginTop:40}}>
        <Grid container>
    

        {workspacesdatastate ? workspacesdatastate.workspaces.length===1 && workspacesdatastate.workspaces[0].stripe_subscription_id===null?
         <Card style={{width:"100%"}}>
        <MDBox>
        <MDBox display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center">
        
        <MDTypography variant="h4"  style={{marginBottom:10,fontWeight:600,marginTop:20,marginLeft:20}}>
        {workspacesdatastate.workspaces[0].workspacename}
        </MDTypography>

        <MDTypography variant="h5"  style={{marginBottom:10,fontWeight:500,marginTop:20,marginLeft:20,fontSize:16}}>
        Welcome to ServerTag! We&apos;re excited to have you onboard.

       
        </MDTypography>



        <MDTypography variant="h5"  style={{marginBottom:10,fontWeight:500,marginTop:10,marginLeft:20,fontSize:16}}>
        

        To kick off, we&apos;ve set up a your workspace. Here, you can unleash the power of server-side tracking tailored to your needs.
        </MDTypography>
        </MDBox>

        <MDBox display="flex" justifyContent="flex-start" alignItems="left" flexDirection="column">

        <MDTypography variant="h5"  style={{marginBottom:10,fontWeight:400,marginTop:20,marginLeft:20,fontSize:16,textAlign:'left'}}>
        Next Steps to complete the setup:
       
        </MDTypography>
        </MDBox>

        <MDTypography variant="h5"  style={{marginBottom:10,fontWeight:500,marginTop:20,marginLeft:20,fontSize:16,textAlign:'left'}}>
1. Add a Subscription: 
<MDTypography variant="h5"  style={{marginBottom:10,fontWeight:400,marginTop:5,marginLeft:20,fontSize:16,marginRight:10}}>
Activate your workspace for Server-side Tagging by adding a subscription. Access premium features to boost data accuracy and privacy compliance. You can also avail the Free plan.       
        </MDTypography>
        </MDTypography>



        <MDTypography variant="h5"  style={{marginBottom:10,fontWeight:500,marginTop:20,marginLeft:20,fontSize:16,textAlign:'left'}}>
2. Create Container: 
<MDTypography variant="h5"  style={{marginBottom:10,fontWeight:400,marginTop:5,marginLeft:20,fontSize:16,marginRight:10}}>
Click on &quot;Create Container&quot; to begin the process of setting up your container. You can choose from the given options to suit your tracking requirements. It’s highly recommended to setup your Custom Domain too. 
        </MDTypography>
        </MDTypography>



        <MDTypography variant="h5"  style={{marginBottom:10,fontWeight:500,marginTop:20,marginLeft:20,fontSize:16,textAlign:'left'}}>
3. Configure Your Settings: 
<MDTypography variant="h5"  style={{marginBottom:10,fontWeight:400,marginTop:5,marginLeft:20,fontSize:16,marginRight:10}}>
Tailor the account and workspace to your requirements - tweak your personal and account settings, workspace / container names and such.
        </MDTypography>
        </MDTypography>



        <MDTypography variant="h5"  style={{marginBottom:10,fontWeight:500,marginTop:20,marginLeft:20,fontSize:16,textAlign:'left'}}>
4. Explore Our Features: 
<MDTypography variant="h5"  style={{marginBottom:10,fontWeight:400,marginTop:5,marginLeft:20,fontSize:16,marginRight:10}}>
Discover Server Boosts for refining data quality, securing information, enhancing accuracy and ensuring privacy compliance.
        </MDTypography>
        </MDTypography>



        <MDTypography variant="h5"  style={{marginBottom:10,fontWeight:500,marginTop:20,marginLeft:20,fontSize:16,textAlign:'left'}}>
5. Need Assistance?: 
<MDTypography variant="h5"  style={{marginBottom:10,fontWeight:400,marginTop:5,marginLeft:20,fontSize:16,marginRight:10}}>
Our support team is ready to guide you.
        </MDTypography>
        </MDTypography>
    
        <MDBox display="flex" flexDirection="column" justifyContent="flex-start" alignItems="center">
        <MDTypography variant="h5"  style={{marginBottom:10,fontWeight:500,marginTop:20,marginLeft:20,fontSize:16}}>
        Adding a subscription is a key step in transforming how your business uses data. Get set to revamp your tracking!
       
        </MDTypography>

        <MDButton variant="contained" color="warning" style={{marginTop:20,marginBottom:20}} onClick={()=>{
                    //router.push("/containersettings")
                    setWorkspaceName(workspacesdatastate.workspaces[0].workspacename);
                    router.push({ pathname: '/workspace/subscription', query: { workspaceid: workspacesdatastate.workspaces[0].workspaceid } })
                   }}>
         Add Subscription
        </MDButton>
        </MDBox>
        </MDBox>
        </Card>
        :
        <>
       <MDBox style={{width:"100%",backgroundColor: 'transparent' }} >
<MDBox mt={1} >
<Grid container spacing={6} >
            {workspacesdatastate.workspaces.map((workspace,index)=>{
              
              return(
                
          
    
            <Grid item xs={12} md={6} lg={4} key={workspace.workspaceid} style={{marginBottom:20}}>
             
           
              <ComplexProjectCard
                
                  image={logoSlack}
                  title={
                  <MDBox display="flex" flexDirection="row">
                  <MDTypography variant="h6"
              textTransform="capitalize"
              fontWeight="medium"
              onClick={()=>gotosettings(workspace)} style={{cursor:"pointer"}}>{workspace.workspacename}</MDTypography>

<ArrowForwardIcon fontSize="small" style={{cursor:"pointer",marginLeft:5,marginTop:2}} onClick={()=>gotosettings(workspace)}/>
              </MDBox>
            
            }
                  description=
                  {workspace.stripe_subscription_id===null && workspace.plantype==="free"? 
                  <MDBox display="flex" justifyContent="flex-start" alignItems="center" style={{marginBottom:30}}>
                  <MDTypography style={{fontWeight:500,fontSize:14}}>Plan Type :  </MDTypography>&nbsp;
                  <MDTypography style={{fontWeight:400,fontSize:14}}>Free Plan,  </MDTypography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <MDTypography style={{fontWeight:500,fontSize:14}}>Plan Status :  </MDTypography>&nbsp;
                  <MDTypography style={{fontWeight:500,fontSize:14,color:"#17845D"}}>Active</MDTypography>
                  </MDBox>
                  : workspace.stripe_subscription_id!==null?workspace.workspace_subscriptions.stripe_subscription_status==="incomplete"?
                  <MDBox display="flex" justifyContent="space-between" alignItems="center" style={{marginBottom:30}}>
                  
                  <MDTypography style={{fontWeight:400,fontSize:14}}>You haven&apos;t subscribed to any plan  </MDTypography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <MDTypography style={{fontWeight:500,fontSize:14}}>Plan Status :  </MDTypography>&nbsp;
                  <MDTypography style={{fontWeight:500,fontSize:14}}>In Active</MDTypography>
                  </MDBox>
                  :
                  <MDBox display="flex" justifyContent="flex-start" alignItems="center" style={{marginBottom:30}}>
                  
                  <MDTypography style={{fontWeight:500,fontSize:14}}>Plan Type :  </MDTypography>&nbsp;
                  <MDTypography style={{fontWeight:400,fontSize:14}}>{workspace.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.productname}  </MDTypography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <MDTypography style={{fontWeight:500,fontSize:14}}>Plan Status :  </MDTypography>&nbsp;
                  <MDTypography style={{fontWeight:500,fontSize:14,color:"#17845D"}}>Active</MDTypography>
                  </MDBox>
                  :
                  <MDBox display="flex" justifyContent="space-between" alignItems="left">
                  <MDTypography style={{fontWeight:400,fontSize:14}}>Please subscribe to start utilizing this workspace.</MDTypography>
                  <MDButton variant="contained" color="dark" size="small" onClick={()=>{
                    //router.push("/containersettings")
                    setWorkspaceName(workspace.workspacename);
                    router.push({ pathname: '/workspace/subscription', query: { workspaceid: workspace.workspaceid } })
                   }}>
         Subscribe
        </MDButton>
                  </MDBox>}
                  dateTime={workspace.stripe_subscription_id===null && workspace.plantype==="free"? dayjs(workspace.workspace_freeplan.to).format('MMMM DD YYYY') :workspace.stripe_subscription_id ===null || workspace.workspace_subscriptions && workspace.workspace_subscriptions.stripe_subscription_status==="incomplete"?"--":dayjs(workspace.workspace_subscriptions.stripe_subscription_enddate).format('MMMM DD YYYY')}
                  members={[workspace.containers.length,workspace.stripe_subscription_id===null?0:workspace.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofservers]}
                  //members={[team1, team2, team3, team4, team5]}
                   dropdown={{
                    action: openSlackBotMenu(index),
                    menu: 
                    (
                       <Menu
                      anchorEl={state.anchorEl}
                      anchorOrigin={{ vertical: "top", horizontal: "left" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      open={state.menus[index]}
                      onClose={closeSlackBotMenu(index)}
                      keepMounted
                      
                    >
                      
                      <MenuItem /* key={workspacesdatastate.workspaces[index].workspaceid} */ onClick={()=>{
                        //alert(workspace.workspacename);
                        //console.log(`menuitems workspace in subscription is ${JSON.stringify(workspace)}`)
                        setWorkspaceName(workspace.workspacename);
                       router.push({ pathname: '/workspace/subscription', query: { workspaceid: workspace.workspaceid } })
                        closeSlackBotMenu(index)
                      }}>Subscription</MenuItem>
                      <MenuItem /* key={workspacesdatastate.workspaces[index].workspaceid} */ onClick={()=>{
                        //alert(workspace.workspacename);
                        //console.log(`menuitems workspace in subscription is ${JSON.stringify(workspace)}`)
                        setWorkspaceName(workspace.workspacename);
                       router.push({ pathname: '/workspace/settings', query: { workspaceid: workspace.workspaceid } })
                        closeSlackBotMenu(index)
                      }}>Settings</MenuItem>
                      {/* 
                      <MenuItem onClick={()=>{
                        handleOpenEditDialog();
                        setselectedworkspaceid(workspace.workspaceid);
                        setselectedworkspacename(workspace.workspacename);
                        closeSlackBotMenu()
                      }}>Edit</MenuItem> */}
                      
                      
                    </Menu>
                    ),
                   
                  }} 
                />
               
            </Grid>
           
       
              )
            })}
             </Grid>
         </MDBox>
         </MDBox>
         {
    workspacesdatastate && workspacesdatastate.workspaces.length===1 && workspacesdatastate.workspaces[0].workspace_subscriptions===null?null:

<MDBox
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        style={{marginTop:20}}
      ><MDButton
        
      onClick={()=>{
          handleOpenDialog()
      }}
      size="small"
      variant="contained"
     color="#eb7438"
     style={{backgroundColor:"#eb7438",color:"#FFFFFF"}}
    >
      
      <Icon>add</Icon>&nbsp;Add New Workspace
    </MDButton>
    
      </MDBox> }

        {/* <Card style={{width:"100%"}}>
   <Styles> 
    <WorkspaceTable data={workspacesdatastate.workspaces} columns={workspacecolumns} renderSubComponent={renderadsRowSubComponent}/>
    </Styles>
    </Card> */}
    </>
    
  :
  <Card style={{width:"100%"}}>
  <CircularProgress/></Card>}
    
    </Grid>
    
    </MDBox>
    <MDBox py={0.5}>
        <Grid container>
    {/* <Card style={{width:"100%"}}>
    <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
          Shared Workspaces
        </MDTypography>
    
    </Card> */}
    </Grid>
    </MDBox></>}

    <Grid container style={{marginBottom:20,marginTop:80}}>
    
<Grid item md={4}>
<Card 
     >
          {/* 
            <Image
              src={tag}
              //alt={title}
              size="80%"
              quality={100}
              style={{ width: "500px", height: "400px", display: "block" }}
            /> */}
          
        

      <MDBox textAlign="center" px={3}>
        
        <MDTypography variant="h5" fontWeight="regular" style={{marginBottom:10,marginTop:20,marginLeft:20}}>
        👋 Welcome
        </MDTypography>
        <MDTypography variant="body2" color="text" sx={{ mt: 1.5, mb: 1 }} style={{fontWeight:500}}>
        We are glad to see you among Server Tag users!
If you have any problems with the service - contact our support team.
        </MDTypography> 
      </MDBox>
     
    </Card>

</Grid>
<Grid item md={4}>
<Card style={{marginLeft:10}} //style={{ width: "500px" }}
    >
          
        {/*     <Image
              src={support}
              //alt={title}
              size="80%"
              quality={100}
              style={{ width: "500px", height: "400px", display: "block" }}
            />
          
         */}

      <MDBox textAlign="center" px={3}>
        
        <MDTypography variant="h5" fontWeight="regular" style={{marginBottom:10,marginTop:20,marginLeft:20}}>
        👋 24/7 Support
        </MDTypography>
        <MDTypography variant="body2" color="text" sx={{ mt: 1.5, mb: 1 }} style={{fontWeight:500}}>
        We are glad to see you among Server Tag users!
If you have any problems with the service - contact our support team.
        </MDTypography> 
      </MDBox>
     
    </Card>

</Grid>

<Grid item md={4} >
<Card style={{marginLeft:10}} //style={{ width: "510px" }}
    >
          {/* 
            <Image
              src={bgImage}
              //alt={title}
              size="80%"
              quality={100}
              style={{ width: "510px", height: "400px", display: "block" }}
            /> */}
          
        

      <MDBox textAlign="center" px={3}>
        
        <MDTypography variant="h5" fontWeight="regular" style={{marginTop:20}}>
        💳 Setup Workspace
        </MDTypography>
        
        <MDTypography variant="body2" color="text" sx={{ mt: 1.5, mb: 1 }} style={{fontWeight:500}}>

We will charge you only when your container or gateway is up and running and you’ve selected the best subscription plan.
        </MDTypography> 
      </MDBox>
     
      
    </Card>
</Grid>
 
    </Grid>

     {/*  <Footer /> */}
{/* 
    {turnupgrade?
<MDBox style={{marginBottom:20}}>
    <Card style={{backgroundColor:"#ffffff"}}> 
    <Grid container style={{marginBottom:20,marginTop:20,padding:10,marginLeft:20}}>
      <Grid item md={8}>
      <MDTypography variant="h5" fontWeight="regular" style={{marginBottom:10,fontSize:16}}>
        💳 Turn on automatic upgrade


        </MDTypography>
      <MDTypography variant="body2" color="dark" sx={{ mt: 1.5, mb: 1 }} style={{fontSize:16}}>
      Click "Turn on auto-upgrade" to add billing and enable auto-upgrade for all Containers.
        </MDTypography> 
        <MDBox style={{marginLeft:20,marginTop:10}}>
        <MDButton
        
        onClick={()=>{
           // handleOpenDialog()
        }}
        size="large"
        variant="gradient"
        color="warning"
       // style={{backgroundColor:"#ff9d77",color:"#FFFFFF"}}
      >
        
        <b style={{marginLeft:10}}>Turn on Auto Upgrade</b>
      </MDButton> &nbsp;&nbsp;&nbsp;&nbsp;
      <MDButton
        
        onClick={()=>{
           // handleOpenDialog()
           setturnupgrade(false)
        }}
        size="large"
        variant="gradient"
        color="dark"
      >
        
        <b style={{marginLeft:10}}>May be Later</b>
      </MDButton> 
      
        </MDBox>
      </Grid>
    </Grid>
    </Card>
    </MDBox>:null} */}
    </DashboardLayout>
    </Authenticated>
  );
}

export default Workspaces;





/* 

<Card style={{width:"100%"}}>
<MDBox p={2}>
  <MDBox display="flex" alignItems="center">
    <MDAvatar
      src={logoAtlassian}
      alt={<a href="https://www.flaticon.com/free-icons/seo-and-web" title="seo and web icons">Seo and web icons created by Pixel perfect - Flaticon</a>}
      size="xl"
      variant="rounded"
      bgColor={"transparent"}
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
       {workspace.workspacename}
      </MDTypography>
      
    </MDBox>
    
      <MDButton
      iconOnly
        color="secondary"
        onClick={()=>{
          openSlackBotMenu();
          setselectedworkspaceid(workspace.workspaceid)
        }}
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
      </MDButton>
    
    <Menu
                anchorEl={slackBotMenu}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(slackBotMenu)}
                onClose={closeSlackBotMenu}
                
              >
                
                <MenuItem onClick={()=>{
                  setWorkspaceName(workspace.workspacename);
                  router.push({ pathname: '/workspace/subscription', query: { workspaceid: workspace.workspaceid } })
                  closeSlackBotMenu()
                }}>Subscription</MenuItem>
                <MenuItem onClick={()=>{
                  setWorkspaceName(workspace.workspacename);
                  router.push({ pathname: '/workspace/settings', query: { workspaceid: workspace.workspaceid } })
                  closeSlackBotMenu()
                }}>Settings {selectedworkspaceid}</MenuItem>
                
                
                
              </Menu>
  </MDBox>
  <MDBox my={2} lineHeight={1}>
    <MDTypography variant="button"z fontWeight="light" color="dark" style={{fontWeight:400}}>
    {workspace.stripe_subscription_id===null && workspace.plantype==="free"? 
            <MDBox display="flex" justifyContent="flex-start" alignItems="center" style={{marginBottom:30}}>
            <MDTypography style={{fontWeight:500,fontSize:14}}>Plan Type :  </MDTypography>&nbsp;
            <MDTypography style={{fontWeight:400,fontSize:14}}>Free Plan,  </MDTypography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <MDTypography style={{fontWeight:500,fontSize:14}}>Plan Status :  </MDTypography>&nbsp;
            <MDTypography style={{fontWeight:500,fontSize:14,color:"#17845D"}}>Active</MDTypography>
            </MDBox>
            : workspace.stripe_subscription_id!==null?workspace.workspace_subscriptions.stripe_subscription_status==="incomplete"?
            <MDBox display="flex" justifyContent="space-between" alignItems="center" style={{marginBottom:30}}>
            
            <MDTypography style={{fontWeight:400,fontSize:14}}>You haven&apos;t subscribed to any plan  </MDTypography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <MDTypography style={{fontWeight:500,fontSize:14}}>Plan Status :  </MDTypography>&nbsp;
            <MDTypography style={{fontWeight:500,fontSize:14}}>In Active</MDTypography>
            </MDBox>
            :
            <MDBox display="flex" justifyContent="flex-start" alignItems="center" style={{marginBottom:30}}>
            
            <MDTypography style={{fontWeight:500,fontSize:14}}>Plan Type :  </MDTypography>&nbsp;
            <MDTypography style={{fontWeight:400,fontSize:14}}>{workspace.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.productname}  </MDTypography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <MDTypography style={{fontWeight:500,fontSize:14}}>Plan Status :  </MDTypography>&nbsp;
            <MDTypography style={{fontWeight:500,fontSize:14,color:"#17845D"}}>Active</MDTypography>
            </MDBox>
            :
            <MDBox display="flex" justifyContent="space-between" alignItems="left">
            <MDTypography style={{fontWeight:400,fontSize:14}}>Please subscribe to start utilizing this workspace.</MDTypography>
            <MDButton variant="contained" color="dark" size="small" onClick={()=>{
              //router.push("/containersettings")
              setWorkspaceName(workspace.workspacename);
              router.push({ pathname: '/workspace/subscription', query: { workspaceid: workspace.workspaceid } })
             }}>
   Subscribe
  </MDButton>
            </MDBox>}
    </MDTypography>
  </MDBox>
  <Divider />
  <MDBox
    display="flex"
    justifyContent="space-between"
    alignItems="center"
  >
    
      <MDBox display="flex" flexDirection="column" lineHeight={0}>
        {workspace.stripe_subscription_id===null?"0":
        <MDTypography variant="button" fontWeight="medium">
          {workspace.containers.length} of {workspace.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofservers}
          
        </MDTypography>}
        <MDTypography
          variant="button"
          fontWeight="regular"
          color="secondary"
        >
          Containers Used
        </MDTypography>
      </MDBox>
    
    
      <MDBox display="flex" flexDirection="column" lineHeight={0}>
        <MDTypography variant="button" fontWeight="medium">
        {workspace.stripe_subscription_id===null && workspace.plantype==="free"? dayjs(workspace.workspace_freeplan.to).format('MMMM DD YYYY') :workspace.stripe_subscription_id ===null || workspace.workspace_subscriptions && workspace.workspace_subscriptions.stripe_subscription_status==="incomplete"?"--":dayjs(workspace.workspace_subscriptions.stripe_subscription_enddate).format('MMMM DD YYYY')}
        </MDTypography>
        <MDTypography
          variant="button"
          fontWeight="regular"
          color="secondary"
        >
          Valid Till
        </MDTypography>
      </MDBox>
    
  </MDBox>
</MDBox>
</Card> */
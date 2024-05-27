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
import Checkbox from '@mui/material/Checkbox';
import { Authenticated } from "../../../pagesComponents/authenticated"
import {
  CircularProgress,
  styled,
  
  Slide,
  Dialog,
  
} from '@mui/material';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import MDBadge from "/components/MDBadge";

import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import Autocomplete from "@mui/material/Autocomplete";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import MDTypography from "/components/MDTypography";
import Divider from "@mui/material/Divider";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SellIcon from '@mui/icons-material/Sell';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StyleIcon from '@mui/icons-material/Style';

import TimelineItem from "/examples/Timeline/TimelineItem";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useRouter } from 'next/router';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
import MDInput from "/components/MDInput";
import {useGetContainersDataQuery,useSetdeletecontainerMutation,useSetaddcustomdomainMutation,useSetverifycustomdomainMutation} from '../../../services/hasuraquerydata';
import {useAuth} from '../../../hooks/useAuth';
import MDProgress from "/components/MDProgress";
import verticalBarChartData from "/pagesComponents/pages/charts/data/verticalBarChartData";
import VerticalBarChart from "/examples/Charts/BarCharts/VerticalBarChart";
import { isLoaded,isEmpty,useFirebase } from 'react-redux-firebase';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Loadingimg from "/assets/images/icons/loading.gif";
import Image from "next/image";
import MDAvatar from "/components/MDAvatar";
import dayjs from 'dayjs';


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
import {useTheme} from '@mui/material';
import {CopyToClipboard} from 'react-copy-to-clipboard';
//import styles from '../pagesComponents/Dotpulse.module.css';
import logoGlobe from "/assets/images/small-logos/globe.png";


import Accounts from "/pagesComponents/pages/account/settings/components/Accounts";
import Notifications from "/pagesComponents/pages/account/settings/components/Notifications";
import Sessions from "/pagesComponents/pages/account/settings/components/Sessions";
import DeleteAccount from "/pagesComponents/pages/account/settings/components/DeleteAccount";

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
const CustomCheckbox = styled(Checkbox)(() => ({
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


function ContainerTable({ columns, data,sorting,setSorting,loading
  
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
                  <th key={header.id} colSpan={header.colSpan} style={{color:"#17845D",fontSize:14,width:header.width}}>
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
                    <td key={cell.id} style={{fontSize:10,fontWeight:400,marginTop:10,marginBottom:10}}>
                       <div style={{marginTop:10,marginBottom:10}}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      </div>
                    </td>
                  )
                })}
              </tr>
               {/* {row.depth===0 && row.getIsExpanded() && (
                <tr>
                  
                  <td colSpan={row.getVisibleCells().length}>
                    {renderSubComponent({ row })}
                  </td>
                </tr>
              )}  */}
              </Fragment>
            )
          })}
        </tbody>
      </table>



 </div>
 
  </>
  )
}

function ContainerSettings() {
  const router = useRouter();

  const containerid = router.query.containerid;
  const workspaceid = router.query.workspaceid;
  const workspaceplan = router.query.workspaceplan;
  console.log(`containerid from workspaces is ${containerid} workspaceplan ${workspaceplan}`)
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    
  };

  const [cdn,setcdn]= useState('stateglobal');
  const handleChange = (event) => {
    setcdn(event.target.value);
  };


  const { data: containersdata, isLoading:containersdataloading,isSuccess:containersdatasuccess} = useGetContainersDataQuery({
    containerid:containerid
  },{
    skip:isEmpty(containerid),
    refetchOnMountOrArgChange: true,
    pollingInterval: 5000,
    skip: false,
  })
  console.log(`containersdata is ${JSON.stringify(containersdata)}`)

  const[showdomaindetails,setshowdomaindetails] = useState(false)

  const [setdeletecontainer,{ data:setdeletecontainerdata,error,isSuccess, isLoading:setdeletecontainerdataloading }] = useSetdeletecontainerMutation();

  const [setaddcustomdomain,{ data:setaddcustomdomaindata, isLoading:setaddcustomdomainloading }] = useSetaddcustomdomainMutation();

  const [setverifycustomdomain,{ data:setverifycustomdomaindata, isLoading:setverifycustomdomainloading }] = useSetverifycustomdomainMutation();

  const [copied,setcopied] = useState(false);

  const [urlcopied,seturlcopied] =useState(false);

  const columns = React.useMemo(
    () => [
      
      {
        accessorKey: 'customdomain',
        header: () => <span>Domain</span>,
        enableHiding:false,
         cell: ({ row, getValue }) => {
          return (
            <div
                
              >

                
                <CopyToClipboard text={`https://${getValue()}`}
          onCopy={() => setcopied(true) }>
         <Tooltip title={copied?"copied":"copy"} placement="top">
              <MDButton onlyicon>
              <MDTypography title={getValue()} style={{lineHeight:"1rem",marginLeft:10,fontSize:14}} type="text">https://{getValue()} 
             
             </MDTypography>&nbsp;
       
              <Icon color="warning">copy</Icon>
              </MDButton>
            </Tooltip>
        </CopyToClipboard>
                
            </div>
          );
        },
        footer: props => props.column.id,
      },
      
      {
        accessorKey: 'hascertificate',
        header: () => <span>Status</span>,
        enableHiding:false,
         cell: ({ row, getValue }) => {
          return (
            <div
                
              >

                <span style={{lineHeight:"2rem",marginLeft:10}}>{row.original.hascertificate==="success" ? 
                <MDBadge
        variant="contained"
        color="success"
        badgeContent="Ready"
        size='lg'
      />:row.original.hascertificate==="initiated" && row.original.container_req && row.original.container_req.requesttype==="create_container"?
      <MDTypography style={{fontSize:14,marginTop:-20}}>creating your request, please waite</MDTypography>:
      row.original.hascertificate==="initiated" && row.original.container_req && row.original.container_req.requesttype==="create_customdomain"?
      <MDTypography style={{fontSize:14,marginTop:-20}}>creating your domain, please waite</MDTypography>:
      row.original.hascertificate==="initiated" && row.original.container_req && row.original.container_req.requesttype==="verify_certificate"?
      <MDTypography style={{fontSize:14,marginTop:-20}}>verifying your domain, please waite</MDTypography>:
      row.original.hascertificate==="failed" ?
      <MDBadge
        variant="contained"
        color="error"
        badgeContent="Failed"
        size='lg'
      />:<MDBadge
      variant="contained"
      color="warning"
      badgeContent="Not Ready"
      size='lg'
    />

      
      }</span>
            </div>
          );
        },
        footer: props => props.column.id,
      },
      
      {
        id: "settings",
      
        header: () => <span> Verification</span>,
        enableHiding:false,
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        cell: ({ row,getValue }) => {
          //console.log("row is " + JSON.stringify(row.original));
          return (
            <div>
              {row.original.hascertificate===false && row.original.ownurl===false ?
           <MDButton variant="gradient" color="warning" onClick={()=>{
            setverifycustomdomain({
              containerid:containerid,
              customdomain:row.original.container_customdomain.customdomain,
              cdnhostname_id:row.original.cdnhostname_id,
              pullzone_id:row.original.pullzone_id
            })
           }}>
 Verify
</MDButton>:"--"}
            </div>
          );
        }
      },
      {
        accessorKey: 'instructions',
        header: () => <span>Instructions</span>,
        enableHiding:false,
         cell: ({ row, getValue }) => {
          return (
            <div
                
              >

                <span title={getValue()} style={{lineHeight:"2rem",marginLeft:10}}>{"Add CNAME Record, Name:customdomain name and value pullzone name"}</span>
            </div>
          );
        },
        footer: props => props.column.id,
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
      name: '',
      config: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        
        .max(255)
        .required('This field is required'),
        config: Yup.string()
        
        .max(255)
        .required('This field is required'),
        
    }),
    onSubmit: async (values, helpers) => {

    }
  });

  const customdomainformik = useFormik({
    initialValues: {
      customdomain: ''
      
    },
    validationSchema: Yup.object({
     
      customdomain: Yup.string()
        .required('Custom Domain Required')
      .max(40)
      .matches(
        /((http|https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Not a valid domain!'
    ),   
    }),
    onSubmit: async (values, helpers) => {
            console.log(`values from form are ${JSON.stringify(values)}`)

            setaddcustomdomain({
              containerid:containerid,
              customdomain:values.customdomain
            })
            setshowdomaindetails(true);
    }
  });
  const sidenavItems = [
    
    { icon: "receipt_long", label: "Server Boosts", href: "serverboosts" , id:"serverboosts"},

    
    { icon: "analytics", label: "Analysis", href: "analysis" },
    { icon: "settings_applications", label: "Integration", href: "integration" }, 
    { icon: "security", label: "GDPR", href: "gdpr" }, 
    { icon: "quiz", label: "Testing", href: "testing" }, 
   
  ];

  

  const renderSidenavItems = sidenavItems.map(({ icon, label, href }, key) => {
    const itemKey = `item-${key}`;
  
    return (
      <MDBox key={itemKey} component="li" pt={key === 0 ? 0 : 1} >
        <MDTypography
          component="a"
          onClick={()=>
            {
          
            router.push({pathname:`/workspace/container/${href}`,query:{containerid:containerid,workspaceid:workspaceid}})
              
          }}
          style={{cursor: "pointer"}}
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          sx={({
            borders: { borderRadius },
            functions: { pxToRem },
            palette: { light },
            transitions,
          }) => ({
            display: "flex",
            alignItems: "center",
            borderRadius: borderRadius.md,
            padding: `${pxToRem(10)} ${pxToRem(16)}`,
            transition: transitions.create("background-color", {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.shorter,
            }),

            "&:hover": {
              backgroundColor: light.main,
            },
          })}
        >
          <MDBox mr={1.5} lineHeight={1} color={"dark"}>
            <Icon fontSize="small">{icon}</Icon>
          </MDBox>
          {label}
        </MDTypography>
      </MDBox>
    );
  });
  const [value, setValue] = React.useState('1');

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Authenticated>
     
    <DashboardLayout>
    <DashboardNavbar /> 
      <MDBox mt={4}>
      
    {containersdata?<>
     <Card width="100%" style={{marginTop:50,marginBottom:30}}>
<MDBox display="flex" alignItems="center">
          <MDAvatar
            src={logoGlobe.src || logoGlobe}
            alt={<a href="https://www.flaticon.com/free-icons/seo-and-web" title="seo and web icons">Seo and web icons created by Pixel perfect - Flaticon</a>}
            size="xl"
            variant="rounded"
            bgColor={"dark"}
            sx={{
              p: 1,
              mt: -4,
              borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
            }}
            style={{marginLeft:10}}
          />
          {containersdata?
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
       <MDBox ml={3} mt={1} lineHeight={0}>
              <MDTypography variant="h5" fontWeight="medium">
              {containersdata.container[0].containername}
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
          </MDBox>
          
      
      
        </MDBox>

                    <MDBox>
          
          <MDBox display="flex" justifyContent="space-between" alignItems="center" style={{marginTop:40,marginBottom:10}}> 
            <Grid container>
              <Grid item lg={0.1}></Grid>
              <Grid item lg={10} style={{marginLeft:10}}>
                <Grid container>
                  <Grid item lg={1.5}>
                  <Card style={{backgroundColor:"#e8fff3"}}>
                      <MDTypography style={{fontSize:16,fontWeight:600,color:"#17845D",marginLeft:20,marginTop:10}}>
                      {containersdata.container[0].workspace_obj.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.productname}
                      
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
                      {dayjs(containersdata.container[0].workspace_obj.workspace_subscriptions.stripe_subscription_enddate).format('YYYY MMM DD')}
                      </MDTypography>
                      <MDTypography style={{fontSize:13,fontWeight:400,marginLeft:20,marginBottom:10}}>
                          Valid Till
                      </MDTypography>
                    </Card>
                  </Grid>
                  <Grid item lg={0.5}></Grid>
                  
                 
                  <Grid item lg={1.5}>
       
                    {containersdata.container[0].container_requests[0].request_status==="finished"?
                    <Card style={{backgroundColor:"#e8fff3"}}>
                    <MDTypography style={{fontSize:16,fontWeight:600,color:"#17845D",marginLeft:20,marginTop:10}}>
                    Active
                    </MDTypography>
                    <MDTypography style={{fontSize:13,fontWeight:400,marginLeft:20,marginBottom:10}}>
                        Status
                    </MDTypography>
                  </Card>:
                  <Card style={{backgroundColor:"#f2b0b0"}}>
                      <MDTypography style={{fontSize:16,fontWeight:600,color:"#F65F53",marginLeft:20,marginTop:10}}>
                      Inactive
                      </MDTypography>
                      <MDTypography style={{fontSize:13,fontWeight:400,marginLeft:20,marginBottom:10}}>
                          Status
                      </MDTypography>
                    </Card>}
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>
            </MDBox>
            <MDBox display="flex" justifyContent="space-between" alignItems="left" flexDirection="column" style={{marginTop:20,marginBottom:30}}> 
            <Grid container>
              <Grid item lg={0.2}></Grid>
              <Grid item lg={8} style={{marginLeft:5}}>
            
              <MDBox display="flex" justifyContent="flex-start" alignItems="left" style={{marginTop:20}}>
              <MDTypography style={{fontSize:14,fontWeight:600}}>{containersdata.container[0].containerusedreq_obj.usedrequests} of  {containersdata.container[0].workspace_obj.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests<1000000?
            `${containersdata.container[0].workspace_obj.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests/1000}K`:
          `${containersdata.container[0].workspace_obj.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests/1000000}M`  
            }</MDTypography>&nbsp;
        
        <MDTypography style={{fontSize:14,fontWeight:600}}>( {Math.round((containersdata.container[0].containerusedreq_obj.usedrequests / containersdata.container[0].workspace_obj.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests) * 100)}% )</MDTypography>&nbsp;
        
            <MDTypography style={{fontSize:14}}>requests used</MDTypography>
              </MDBox>
           
              
            <MDBox width="40rem">
              
              {(containersdata.container[0].containerusedreq_obj.usedrequests / containersdata.container[0].workspace_obj.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests * 100) < 70?
                  <MDProgress variant="contained" value={(containersdata.container[0].containerusedreq_obj.usedrequests / containersdata.container[0].workspace_obj.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests) * 100} color="warning" />
               :
               (containersdata.container[0].containerusedreq_obj.usedrequests / containersdata.container[0].workspace_obj.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests * 100)<50?
               <MDProgress variant="contained" value={(containersdata.container[0].containerusedreq_obj.usedrequests / containersdata.container[0].workspace_obj.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests) * 100} color="success" />
               :
               <MDProgress variant="contained" value={(containersdata.container[0].containerusedreq_obj.usedrequests / containersdata.container[0].workspace_obj.workspace_subscriptions.stripe_plan.stripe_product.stripe_prod_limit.noofrequests) * 100} color="error" />
          }
                </MDBox>
                
                </Grid>
                
                </Grid>
                
                </MDBox>
        
                </MDBox>
                </Card>
         
        
        <Grid container spacing={3}>
          <Grid item xs={12} lg={2.5}>
          <Card
      sx={{
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
        position: "sticky",
        top: "1%",
      }}
    >
      <MDBox
        //component="ul"
        display="flex"
        flexDirection="column"
        p={2}
        m={0}
        sx={{ listStyle: "none" }}
      >
         <MDTypography
          component="a"
          onClick={()=>
            {
          
            router.push({pathname:`/workspace/container/serverboosts`,query:{containerid:containerid,workspaceid:workspaceid}})
              
          }}
          style={{cursor: "pointer"}}
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          sx={({
            borders: { borderRadius },
            functions: { pxToRem },
            palette: { light },
            transitions,
          }) => ({
            display: "flex",
            alignItems: "center",
            borderRadius: borderRadius.md,
            padding: `${pxToRem(10)} ${pxToRem(16)}`,
            transition: transitions.create("background-color", {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.shorter,
            }),

            "&:hover": {
              backgroundColor: light.main,
            },
          })}
        >
          <MDBox mr={1.5} lineHeight={1} color={"dark"}>
            <Icon fontSize="small">receipt_long</Icon>
          </MDBox>
          Server Boosts
        </MDTypography>


        <MDTypography
          component="a"
          onClick={()=>
            {
          
            router.push({pathname:`/workspace/container/analysis`,query:{containerid:containerid,workspaceid:workspaceid}})
              
          }}
          style={{cursor: "pointer"}}
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          sx={({
            borders: { borderRadius },
            functions: { pxToRem },
            palette: { light },
            transitions,
          }) => ({
            display: "flex",
            alignItems: "center",
            borderRadius: borderRadius.md,
            padding: `${pxToRem(10)} ${pxToRem(16)}`,
            transition: transitions.create("background-color", {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.shorter,
            }),

            "&:hover": {
              backgroundColor: light.main,
            },
          })}
        >
          <MDBox mr={1.5} lineHeight={1} color={"dark"}>
            <Icon fontSize="small">analytics</Icon>
          </MDBox>
          Analysis
        </MDTypography>


        <MDTypography
          component="a"
          onClick={()=>
            {
          
            router.push({pathname:`/workspace/container/integration`,query:{containerid:containerid,workspaceid:workspaceid}})
              
          }}
          style={{cursor: "pointer"}}
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          sx={({
            borders: { borderRadius },
            functions: { pxToRem },
            palette: { light },
            transitions,
          }) => ({
            display: "flex",
            alignItems: "center",
            borderRadius: borderRadius.md,
            padding: `${pxToRem(10)} ${pxToRem(16)}`,
            transition: transitions.create("background-color", {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.shorter,
            }),

            "&:hover": {
              backgroundColor: light.main,
            },
          })}
        >
          <MDBox mr={1.5} lineHeight={1} color={"dark"}>
            <Icon fontSize="small">settings_applications</Icon>
          </MDBox>
          Integration
        </MDTypography>


        <MDTypography
          component="a"
          onClick={()=>
            {
          
            router.push({pathname:`/workspace/container/gdpr`,query:{containerid:containerid,workspaceid:workspaceid}})
              
          }}
          style={{cursor: "pointer"}}
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          sx={({
            borders: { borderRadius },
            functions: { pxToRem },
            palette: { light },
            transitions,
          }) => ({
            display: "flex",
            alignItems: "center",
            borderRadius: borderRadius.md,
            padding: `${pxToRem(10)} ${pxToRem(16)}`,
            transition: transitions.create("background-color", {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.shorter,
            }),

            "&:hover": {
              backgroundColor: light.main,
            },
          })}
        >
          <MDBox mr={1.5} lineHeight={1} color={"dark"}>
            <Icon fontSize="small">security</Icon>
          </MDBox>
          GDPR
        </MDTypography>


        <MDTypography
          component="a"
          onClick={()=>
            {
          
            router.push({pathname:`/workspace/container/testing`,query:{containerid:containerid,workspaceid:workspaceid}})
              
          }}
          style={{cursor: "pointer"}}
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          sx={({
            borders: { borderRadius },
            functions: { pxToRem },
            palette: { light },
            transitions,
          }) => ({
            display: "flex",
            alignItems: "center",
            borderRadius: borderRadius.md,
            padding: `${pxToRem(10)} ${pxToRem(16)}`,
            transition: transitions.create("background-color", {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.shorter,
            }),

            "&:hover": {
              backgroundColor: light.main,
            },
          })}
        >
          <MDBox mr={1.5} lineHeight={1} color={"dark"}>
            <Icon fontSize="small">quiz</Icon>
          </MDBox>
          Testing
        </MDTypography>

        {/* {renderSidenavItems} */}
      </MDBox>
    </Card>
          </Grid>
          <Grid item xs={12} lg={9.5} style={{width:"100%"}}>
            <MDBox mb={3}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                <Card id="settings" style={{width:"100%"}}>
      <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Container Details
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            <MDBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
              
            >
              <MDButton
        
        onClick={handleOpenDialog}
        size="small"
        variant="gradient"
        color="success"
      >
        
        <Icon>edit</Icon>
      </MDButton>
&nbsp;&nbsp;&nbsp;&nbsp;
      <MDButton
        
        //onClick={handleLogout}
        size="small"
        variant="outlined"
        color="error"
        //style={{marginLeft:20}}
        onClick={()=>{
         handleopencancelconfirm()
        }}
        
      >
        
        <Icon>delete</Icon>
      </MDButton>
            </MDBox>
          </Grid>
        </Grid>

      <DialogWrapper
        open={openDialog}
        maxWidth="lg"
        //width="800"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
          <MDBox my={2}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} lg={12}>
            
              <MDBox pt={2} px={2}>
              <MDBox display="flex" justifyContent="space-between" alignItems="center">
      <MDBox>
        <MDBox mb={1}>
          <MDTypography variant="h4" fontWeight="medium">
            Edit Container
          </MDTypography>
        </MDBox>
        
      </MDBox>
    </MDBox>
              </MDBox>
              <Divider />
              <Grid item xs={12} md={6} lg={12}>
                      
                      <MDBox pt={2} px={6} display="flex" justifyContent="space-between" alignItems="center">
                      <form noValidate onSubmit={formik.handleSubmit}>
                     
        <MDTypography variant="title" fontWeight="medium" style={{fontSize:14}}>
        Container Name
                        </MDTypography>
                      
        <TextField
          
          fullWidth
          
          
          //label={t('Website')}
          //placeholder={t('Your email address here...')}
          margin="normal"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          //error={formik.errors}
          type="text"
          value={formik.values.name}
          variant="outlined"
        />
            <MDTypography variant="title" style={{fontSize:"14px",fontWeight:"200",marginTop:10}}>
            How you want to call your container?

                        </MDTypography> 
        <MDBox>
        <MDTypography variant="title" fontWeight="medium" style={{fontSize:14}}>
        Container Configuration
                        </MDTypography>
                        </MDBox>
        <TextField
          
          fullWidth
          
          //label={t('Container Configuration')}
          //placeholder={t('Your email address here...')}
          margin="normal"
          name="config"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          //error={formik.errors}
          type="text"
          value={formik.values.config}
          variant="outlined"
        />
            <MDTypography variant="title" style={{fontSize:"14px",fontWeight:"200",marginTop:10}}>
            This config is provided by Google when you are setting up your tagging server. If you really really want, you can leave this blank to create a dummy container. 
            Just don’t forget to add a real ID when you’re ready.
                        </MDTypography> 

      </form>
               
        <Divider />
                      </MDBox>
                      <MDBox style={{marginTop:30,display:'flex',justifyContent:'center'}}>

                      <MDButton
        
        onClick={()=>{
          
          handleCloseDialog()
        }}
         size="medium"
         variant="outlined"
         color="success"
       >
        
         <b style={{marginLeft:10}}>Discard</b>
       </MDButton>&nbsp;&nbsp;&nbsp;&nbsp;
       
       <MDButton
         
         //onClick={settimeline(2)}
          size="medium"
          variant="gradient"
          color="success"
        >
         
          <b style={{marginLeft:10}}>Save</b>&nbsp;
         
        </MDButton>
                      </MDBox>
                  
                    </Grid>
                    
          </Grid>
        </Grid>
      </MDBox>
         
      </DialogWrapper>

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
Are you sure you want to delete container     </MDTypography>
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

Discard
</MDButton>&nbsp;&nbsp;&nbsp;&nbsp;

<MDButton

onClick={()=>{
  setdeletecontainer({
    containerid:containerid
  })
  //router.push('/workspaces')
  router.push({ pathname: '/workspace/settings', query: { workspaceid:workspaceid} })
  handleclosecancelconfirm()
}}
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
        
        {containersdata?
        <>
        <MDBox height="100%" mt={3} lineHeight={1} display="flex">
          <Grid container>
            <Grid item lg={1.5}>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="medium">
               Name 

              </MDTypography>
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="regular">
               {containersdata.container[0].containername}

              </MDTypography>
            </Grid>
            
          </Grid>
              
            </MDBox>
            <MDBox height="100%" mt={2} lineHeight={1} display="flex">
            <Grid container>
            <Grid item lg={1.5}>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="medium">
            Status 

              </MDTypography> 
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="regular">
            {containersdata.container[0].status==="active"?        <MDBadge
        variant="contained"
        color="success"
        badgeContent="Active"
        size='lg'
      />: containersdata.container[0].container_requests.length>0 && containersdata.container[0].container_requests[0].request_status==="initiated" || containersdata.container[0].container_requests[0].request_status==="inprocess"? 
      <MDBox display="flex" flexDirection="row">{"creating container "} &nbsp;<Image 
      src={Loadingimg}
      alt={"loading"}
      quality={50}
      //sizes="100%"
      style={{ width: "20%", height: "20%", display: "block",marginTop:-10 }}
    /></MDBox>:
      <MDBadge
      variant="contained"
      color="error"
      badgeContent="Inactive"
      size='lg'
    />}

              </MDTypography>
            </Grid>
            
          </Grid>
             
            </MDBox>
            <MDBox height="100%" mt={2} lineHeight={1} display="flex">
            <Grid container>
            <Grid item lg={1.5}>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="medium">
            Config 

              </MDTypography> 
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="regular">
            {containersdata.container[0].container_config}

              </MDTypography>
            </Grid>
            
          </Grid>
            </MDBox>
            <MDBox height="100%" mt={2} lineHeight={1} display="flex">
            <Grid container>
            <Grid item lg={1.5}>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="medium">
            Website 

              </MDTypography> 
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="regular">
            {containersdata.container[0].website}

              </MDTypography>
            </Grid>
            
          </Grid>
              </MDBox>
            <MDBox height="100%" mt={2} lineHeight={1} display="flex">
            <Grid container>
            <Grid item lg={1.5}>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="medium">
            Container Key 

              </MDTypography> 
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="regular">
            {containersdata.container[0].containerkey}

              </MDTypography>
            </Grid>
            
          </Grid>
             
            </MDBox>
            <MDBox height="100%" mt={2} lineHeight={1} display="flex">
            <Grid container>
            <Grid item lg={1.5}>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="medium">
            GTM Id 

              </MDTypography> 
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="regular">
            {containersdata.container[0].gtm_containerid}

              </MDTypography>
            </Grid>
            
          </Grid>
             
            </MDBox>

            <MDBox height="100%" mt={2} lineHeight={1} display="flex">
            <Grid container>
            <Grid item lg={1.5}>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="medium">
            Used Req 

              </MDTypography> 
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="regular">
            {containersdata.container[0].containerusedreq_obj!==null?containersdata.container[0].containerusedreq_obj.usedrequests:"--"}

              </MDTypography>
            </Grid>
            
          </Grid>
             
            </MDBox>
            <MDBox height="100%" mt={2} lineHeight={1} display="flex">
            <Grid container>
            <Grid item lg={1.5}>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="medium">
            Container Url

              </MDTypography> 
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <CopyToClipboard text= {containersdata.container[0].container_url!==null?containersdata.container[0].container_url:"--"}
          onCopy={() => seturlcopied(true) }>
         <Tooltip title={urlcopied?"copied":""} placement="top">
              <MDButton onlyicon>
              <MDTypography title= {containersdata.container[0].container_url!==null && containersdata.container[0].container_url} style={{marginTop:-10,marginLeft:-25}} display="block"
                      variant="button"
                      fontWeight="regular"> {containersdata.container[0].container_url!==null?containersdata.container[0].container_url:"--"}
             
             </MDTypography>&nbsp;
       
              <Icon color="warning" style={{marginTop:-10}}>copy</Icon>
              </MDButton>
            </Tooltip>
        </CopyToClipboard>
        
            </Grid>
            
          </Grid>
             
            </MDBox>
           
            
            </>:null
}
      </MDBox>
    </Card>
    
{containersdata && containersdata.container[0].workspace_obj.plantype==="free"?null:
     <Card id="settings" style={{marginTop:20,width:"100%"}}>
    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              Domains (Tagging Server URLs)
              </MDTypography>
            </MDBox>
          </Grid>
         
      </Grid>
     {containersdata ? containersdata.container[0].container_customdomains.length===0 || containersdata && containersdata.container[0].container_customdomains[0].customdomain===""?
      <Grid container spacing={3} alignItems="center">
        <Grid item lg={6}>

            <MDBox mt={2} >
            <form noValidate onSubmit={customdomainformik.handleSubmit}>
                     
                     <TextField
                       
                       fullWidth
                       
                       
                       label={'Custom Domain'}
                       //placeholder={t('Your email address here...')}
                       {...customdomainformik.getFieldProps('customdomain')}
          helperText={customdomainformik.errors.customdomain && customdomainformik.touched.customdomain && `${customdomainformik.errors.customdomain}`}
          error={customdomainformik.touched.customdomain && customdomainformik.errors.customdomain}
          
                       margin="normal"
                       name="customdomain"
                       onBlur={customdomainformik.handleBlur}
                       onChange={customdomainformik.handleChange}
                       //error={formik.errors}
                       type="text"
                       value={customdomainformik.values.customdomain}
                       variant="outlined"
                     />
                     <Divider/>
                    <MDButton

//onClick={settimeline(2)}
size="small"
variant="contained"
color="success"

startIcon={
  customdomainformik.isSubmitting ? <CircularProgress size="1rem" /> : null
}
disabled={customdomainformik.isSubmitting}
type="submit"

>

Add Custom Domain

</MDButton>

                   </form>
            </MDBox>
        </Grid>
        
      </Grid>
    : containersdata && containersdata.container[0].container_customdomains.length>0 ?
    <>
    <Grid container spacing={3} alignItems="center">
        <Grid item lg={10}>
        <MDBox height="100%" mt={3} lineHeight={1} display="flex">
          <Grid container>
            <Grid item lg={1.5}>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="medium">
               Domain 

              </MDTypography>
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>

            <CopyToClipboard text={`https://${containersdata.container[0].container_customdomains[0].customdomain}`}
          onCopy={() => setcopied(true) }>
         <Tooltip title={copied?"copied":""} placement="top">
              <MDButton onlyicon>
              <MDTypography title={containersdata.container[0].container_customdomains[0].customdomain} style={{marginTop:-20,marginLeft:-25}} display="block"
                      variant="button"
                      fontWeight="regular">https://{containersdata.container[0].container_customdomains[0].customdomain} 
             
             </MDTypography>&nbsp;
       
              <Icon color="warning" style={{marginTop:-20}}>copy</Icon>
              </MDButton>
            </Tooltip>
        </CopyToClipboard>
            
            </Grid>
            
          </Grid>
              
            </MDBox>
            <MDBox height="100%" mt={1} lineHeight={1} display="flex">
          <Grid container>
            <Grid item lg={1.5}>
            <MDTypography display="block"
                      variant="button"
                      fontWeight="medium">
               Status 

              </MDTypography>
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            {
              !containersdata.container[0].container_customdomains[0].awaitingsslstatus?
              containersdata.container[0].container_customdomains[0].status?
              <MDBadge
        variant="contained"
        color="success"
        badgeContent="Ready"
        size='lg'
      />:
      <MDBadge
      variant="contained"
      color="warning"
      badgeContent="Not Ready"
      size='lg'
    />:<MDBox display="flex" flexDirection="row" 
    variant="button"
    fontWeight="regular">{"Creating your domain "} &nbsp;<Image 
    src={Loadingimg}
    alt={"loading"}
    quality={50}
    //sizes="100%"
    style={{ width: "20%", height: "20%", display: "block",marginTop:-10 }}
  /></MDBox>

            }

            {/* {containersdata.container[0].container_customdomains[0].hascertificate==="success" ? 
            <MDBadge
        variant="contained"
        color="success"
        badgeContent="Ready"
        container
      />:containersdata.container[0].container_customdomains[0].hascertificate==="initiated" && containersdata.container[0].container_customdomains[0].container_req && containersdata.container[0].container_customdomains[0].container_req.requesttype==="create_container"?
      <MDTypography style={{fontSize:14,fontWeight:500}}>creating your request, please wait ...</MDTypography>:
      containersdata.container[0].container_customdomains[0].hascertificate==="initiated" && containersdata.container[0].container_customdomains[0].container_req && containersdata.container[0].container_customdomains[0].container_req.requesttype==="create_customdomain"?
      <MDTypography style={{fontSize:14,fontWeight:500}}>creating your domain, please wait ...</MDTypography>:
      containersdata.container[0].container_customdomains[0].hascertificate==="initiated" && containersdata.container[0].container_customdomains[0].container_req && containersdata.container[0].container_customdomains[0].container_req.requesttype==="verify_certificate"?
      <MDTypography style={{fontSize:14,fontWeight:500}}>verifying your domain, please wait ...</MDTypography>:
      containersdata.container[0].container_customdomains[0].hascertificate==="failed" ?
      <MDBadge
        variant="contained"
        color="error"
        badgeContent="Failed"
        container
      />:<MDBadge
      variant="contained"
      color="warning"
      badgeContent="Not Ready"
      container
    />} */}


            </Grid>
            
          </Grid>
              
            </MDBox>
            
        </Grid>
    </Grid>  

    {
    !containersdata.container[0].container_customdomains[0].awaitingsslstatus && containersdata.container[0].container_customdomains[0].status?null:
    !containersdata.container[0].container_customdomains[0].awaitingsslstatus && containersdata.container[0].container_customdomains[0].instructions &&
    <>
          

    <Grid container >
      
      <Grid item xs={12} md={12}>
    
<MDBox display="flex" justifyContent="space-arround" alignItems="center" style={{marginTop:30}}>
<MDBox>
<MDTypography style={{fontSize:14,fontWeight:500,color:"#000000"}}>
Type
</MDTypography>
<Divider/>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10}}>
{containersdata.container[0].container_customdomains[0].instructions.hostname_obj ? containersdata.container[0].container_customdomains[0].instructions.hostname_obj.type : "--"}
</MDTypography>
<Divider/>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10}}>
{ containersdata.container[0].container_customdomains[0].instructions.ssl_obj ? containersdata.container[0].container_customdomains[0].instructions.ssl_obj.type:"--"}
</MDTypography>



</MDBox>
<MDBox>
<MDTypography style={{fontSize:14,fontWeight:500,color:"#000000",textAlign:"left",marginLeft:50}}>
Name
</MDTypography>
<Divider/>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10,textAlign:"left",marginLeft:50}}>
{containersdata.container[0].container_customdomains[0].instructions.hostname_obj ? containersdata.container[0].container_customdomains[0].instructions.hostname_obj.name : ""}
</MDTypography>
<Divider/>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10,textAlign:"left",marginLeft:50}}>
{containersdata.container[0].container_customdomains[0].instructions.ssl_obj? containersdata.container[0].container_customdomains[0].instructions.ssl_obj.name : "--"}
</MDTypography>


</MDBox>

<MDBox>
<MDTypography style={{fontSize:14,fontWeight:500,color:"#000000",textAlign:"left",marginLeft:50}}>
Value
</MDTypography>
<Divider/>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10,textAlign:"left",marginLeft:50}}>
{containersdata.container[0].container_customdomains[0].instructions.hostname_obj ? containersdata.container[0].container_customdomains[0].instructions.hostname_obj.value : "--"}
</MDTypography>
<Divider/>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10,textAlign:"left",marginLeft:50}}>
{containersdata.container[0].container_customdomains[0].instructions.ssl_obj ? containersdata.container[0].container_customdomains[0].instructions.ssl_obj.value : "--"}
</MDTypography>


</MDBox>


<MDBox>
<MDTypography style={{fontSize:14,fontWeight:500,color:"#000000",textAlign:"left",marginLeft:50}}>
Status
</MDTypography>
<Divider/>
<MDTypography style={{fontSize:14,fontWeight:600,marginTop:10,textAlign:"left",marginLeft:50}}>
{containersdata.container[0].container_customdomains[0].instructions.hostname_obj ? containersdata.container[0].container_customdomains[0].instructions.hostname_obj.status : "--"}
</MDTypography>
<Divider/>
<MDTypography style={{fontSize:14,fontWeight:600,marginTop:10,textAlign:"left",marginLeft:50}}>
{containersdata.container[0].container_customdomains[0].instructions.ssl_obj ? containersdata.container[0].container_customdomains[0].instructions.ssl_obj.status : "--"}
</MDTypography>


</MDBox>

</MDBox>
</Grid>
</Grid>


</>
    }
   
 
 


{!containersdata.container[0].container_customdomains[0].awaitingsslstatus && !containersdata.container[0].container_customdomains[0].status ?
<MDBox display="flex" justifyContent="flex-start">
<MDButton variant="contained" color="success" size="small" style={{marginTop:30}} onClick={()=>{
  setverifycustomdomain({
    containerid:containerid,
    customdomain:containersdata.container[0].container_customdomains[0].customdomain,
    cdnhostname_id:containersdata.container[0].container_customdomains[0].cdnhostname_id
  })
}}>Verify</MDButton>
</MDBox>:null
}
{
    containersdata.container[0].container_customdomains[0].container_req[0].requesttype==="verify_centificate"?
    containersdata.container[0].container_customdomains[0].container_req[0].request_status==="initiated"?
    
    <MDTypography style={{fontSize:14,fontWeight:500,color:"#fb8c00",marginTop:10}}>Custom Domain verification in process ...</MDTypography>
    :
    <MDTypography style={{fontSize:14,fontWeight:500,marginTop:10}}>Your last request is completed</MDTypography>:null
  }
    </>:<MDBox
       
       display="flex"
       justifyContent="center"
       alignItems="center"
       
       style={{marginTop:100,marginBottom:100}}
     >
       <CircularProgress style={{color:"#17845D"}}/> 
       </MDBox>
    :<MDBox
       
    display="flex"
    justifyContent="center"
    alignItems="center"
    
    style={{marginTop:100,marginBottom:100}}
  >
    <CircularProgress style={{color:"#17845D"}}/> 
    </MDBox>
    }
    {/* {containersdata ? showdomaindetails && containersdata.container[0].container_customdomains.length>0 &&
    <>
    <Grid container spacing={3} alignItems="center">
        <Grid item lg={10}>
        <MDBox height="100%" mt={2} lineHeight={1} display="flex">
          <Grid container>
            <Grid item lg={1.5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400}}>
               Domain 

              </MDTypography>
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>

            <CopyToClipboard text={`https://${containersdata.container[0].container_customdomains[0].customdomain}`}
          onCopy={() => setcopied(true) }>
         <Tooltip title={copied?"copied":"copy"} placement="top">
              <MDButton onlyicon>
              <MDTypography title={containersdata.container[0].container_customdomains[0].customdomain} style={{fontSize:14,fontWeight:500,marginTop:-10,marginLeft:-25}} type="text">https://{containersdata.container[0].container_customdomains[0].customdomain} 
             
             </MDTypography>&nbsp;
       
              <Icon color="warning" style={{marginTop:-10}}>copy</Icon>
              </MDButton>
            </Tooltip>
        </CopyToClipboard>
            
            </Grid>
            
          </Grid>
              
            </MDBox>
            <MDBox height="100%" mt={1} lineHeight={1} display="flex">
          <Grid container>
            <Grid item lg={1.5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400}}>
               Status 

              </MDTypography>
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            {containersdata.container[0].container_customdomains[0].hascertificate==="success" ? 
            <MDBadge
        variant="contained"
        color="success"
        badgeContent="Ready"
        container
      />:containersdata.container[0].container_customdomains[0].hascertificate==="initiated" && containersdata.container[0].container_customdomains[0].container_req && containersdata.container[0].container_customdomains[0].container_req.requesttype==="create_container"?
      <MDTypography style={{fontSize:14,fontWeight:500}}>creating your request, please wait ...</MDTypography>:
      containersdata.container[0].container_customdomains[0].hascertificate==="initiated" && containersdata.container[0].container_customdomains[0].container_req && containersdata.container[0].container_customdomains[0].container_req.requesttype==="create_customdomain"?
      <MDTypography style={{fontSize:14,fontWeight:500}}>creating your domain, please wait ...</MDTypography>:
      containersdata.container[0].container_customdomains[0].hascertificate==="initiated" && containersdata.container[0].container_customdomains[0].container_req && containersdata.container[0].container_customdomains[0].container_req.requesttype==="verify_certificate"?
      <MDTypography style={{fontSize:14,fontWeight:500}}>verifying your domain, please wait ...</MDTypography>:
      containersdata.container[0].container_customdomains[0].hascertificate==="failed" ?
      <MDBadge
        variant="contained"
        color="error"
        badgeContent="Failed"
        container
      />:<MDBadge
      variant="contained"
      color="warning"
      badgeContent="Not Ready"
      container
    />}


            </Grid>
            
          </Grid>
              
            </MDBox>
            
        </Grid>
    </Grid>  
 
{containersdata.container[0].container_customdomains[0].awaitingsslstatus && !containersdata.container[0].container_customdomains[0].status?
<MDBox display="flex" justifyContent="flex-end">
<MDButton variant="contained" color="success" size="large" style={{marginTop:30}}>Verify</MDButton>
</MDBox>:null
}
    </>
    :<MDBox
       
    display="flex"
    justifyContent="center"
    alignItems="center"
    
    style={{marginTop:100,marginBottom:100}}
  >
    <CircularProgress style={{color:"#17845D"}}/> 
    </MDBox>} */}

      </MDBox>
    </Card> }
                </Grid>

                                
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
        </>: <Card width="100%" style={{marginTop:50,marginBottom:30}}>
        <MDBox
       
        display="flex"
        justifyContent="center"
        alignItems="center"
        
        style={{marginTop:100,marginBottom:100}}
      >
       
        <CircularProgress style={{color:"#17845D"}}/> 
        
        </MDBox></Card>
        }
      </MDBox>
    
       
     
      
     {/*  <Footer /> */}
    </DashboardLayout>
    </Authenticated>
  );
}

export default ContainerSettings;

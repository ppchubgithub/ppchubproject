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
import { Authenticated } from "../pagesComponents/authenticated"
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
import {useGetContainersDataQuery,useSetdeletecontainerMutation,useSetaddcustomdomainMutation,useSetverifycustomdomainMutation} from '../services/hasuraquerydata';
import {useAuth} from '../hooks/useAuth';
import MDProgress from "/components/MDProgress";
import verticalBarChartData from "/pagesComponents/pages/charts/data/verticalBarChartData";
import VerticalBarChart from "/examples/Charts/BarCharts/VerticalBarChart";
import { isLoaded,isEmpty,useFirebase } from 'react-redux-firebase';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
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
import styles from '../pagesComponents/Dotpulse.module.css';
 

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
                    <td key={cell.id} style={{fontSize:16,fontWeight:500,marginTop:10,marginBottom:10}}>
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
              <MDTypography title={getValue()} style={{lineHeight:"1rem",marginLeft:10,fontSize:16}} type="text">https://{getValue()} 
             
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
        container
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
        container
      />:<MDBadge
      variant="contained"
      color="warning"
      badgeContent="Not Ready"
      container
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
    { icon: "settings", label: "Container Settings", href: "settings" },
    { icon: "receipt_long", label: "SGTM-Options", href: "power-ups" },

    /* 
    { icon: "security", label: "Logs", href: "logs" },
    { icon: "settings_applications", label: "Monitor", href: "monitor" }, */
   
  ];

  

  const renderSidenavItems = sidenavItems.map(({ icon, label, href }, key) => {
    const itemKey = `item-${key}`;
  
    return (
      <MDBox key={itemKey} component="li" pt={key === 0 ? 0 : 1}>
        <MDTypography
          component="a"
          href={`#${href}`}
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
  
  return (
    <Authenticated>
      <DashboardNavbar />
    <DashboardLayout>
     
      
      <MDBox py={3}>
        <Grid container spacing={3}>
        {/* <Card sx={{ width: "100%" }}>
        <MDBox p={2}>
      <MDBox display="flex">
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          variant="gradient"
          bgColor="success"
          color="white"
          shadow="md"
          borderRadius="xl"
          ml={3}
          mt={-2}
        >
          <Icon fontSize="medium" color="inherit">
            workspaces
          </Icon>
        </MDBox>
        {containersdata?
        <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
        {containersdata.container[0].containername}
        </MDTypography>:null}
            
      </MDBox>
      <Grid container spacing={3} alignItems="center">
          <Grid item>
      <MDBox>
        <MDTypography variant="body2" style={{fontSize:14,fontWeight:400,color:"#17845D",marginLeft:100}}>
       Running...
        </MDTypography>
        </MDBox>
        </Grid>
        <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }} >
            
          </Grid>
          </Grid>
        <MDBox style={{marginBottom:20}}>
            <Grid container spacing={2}>
                <Grid item lg={1}>

                </Grid>
                <Grid item lg={2}>
                    <MDBox 
          display="flex"
          justifyContent="center"
          alignItems="center">
                    <Card style={{backgroundColor:"#B4B4B4",width:120}}>
                        <MDBox>
                          {containersdata?
                    <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
        {containersdata.container[0].plan==="free" && 'Free'}
        </MDTypography>:null}
        </MDBox>
        <MDBox>
          {containersdata?
        <MDTypography variant="body2" style={{fontSize:14,fontWeight:400,marginLeft:10,marginRight:10,marginBottom:10}}>
        {containersdata.container[0].period} Plan
        </MDTypography>:null}
        </MDBox>

                    </Card>
                    </MDBox>

                </Grid>
                <Grid item lg={2}>
                    <MDBox 
          display="flex"
          justifyContent="center"
          alignItems="center">
                    <Card style={{backgroundColor:"#B4B4B4"}}>
                        <MDBox display="flex"
          justifyContent="center"
          alignItems="center">
                    <MDTypography variant="h6" sx={{ mt: 2, mb: 4, ml: 2 }} style={{marginRight:10,marginTop:20}}>
        17 JUN 2024
        </MDTypography>
        </MDBox>
        

                    </Card>
                    </MDBox>

                </Grid>
                <Grid item lg={2}>

                </Grid>
            </Grid>
        </MDBox>
        <MDBox>
          <Grid container>
            <Grid item lg={5}>
            <MDTypography variant="body2" style={{fontSize:14,fontWeight:400,marginLeft:100,marginTop:20}}>
        2768 of 10000 requests sent
        </MDTypography>
            </Grid>
            <Grid item lg={2}>
              
        <MDTypography variant="body2" style={{fontSize:14,fontWeight:400,marginTop:20}}>
        58% used
        </MDTypography>
            </Grid>
          </Grid>
       
        </MDBox>
        <MDBox width="30rem" justifyContent="center" alignItems="center" style={{marginBottom:30,marginLeft:200,marginTop:10}}>
          <MDProgress variant="gradient" value={80} color="success" />
          
        </MDBox>
        </MDBox>
        
    </Card> */}
    <MDBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
              style={{marginLeft:20,marginBottom:20}}
            >
            </MDBox>
      <MDBox mt={4}>
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
        component="ul"
        display="flex"
        flexDirection="column"
        p={2}
        m={0}
        sx={{ listStyle: "none" }}
      >
        {renderSidenavItems}
      </MDBox>
    </Card>
          </Grid>
          <Grid item xs={12} lg={9}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                <Card id="settings">
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
        size="large"
        variant="gradient"
        color="success"
      >
        
        <Icon>edit</Icon>
      </MDButton>
&nbsp;&nbsp;&nbsp;&nbsp;
      <MDButton
        
        //onClick={handleLogout}
        size="large"
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
                     
        <MDTypography variant="title" fontWeight="medium" style={{fontSize:16}}>
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
        <MDTypography variant="title" fontWeight="medium" style={{fontSize:16}}>
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
size="large"
variant="outlined"
color="error"
>

<b style={{marginLeft:10}}>Discard</b>
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
size="large"
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
        <Divider/>
        {containersdata?
        <>
        <MDBox height="100%" mt={2} lineHeight={1} display="flex">
          <Grid container>
            <Grid item lg={1.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
               Name 

              </MDTypography>
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:500}}>
               {containersdata.container[0].containername}

              </MDTypography>
            </Grid>
            
          </Grid>
              
            </MDBox>
            <MDBox height="100%" mt={2} lineHeight={1} display="flex">
            <Grid container>
            <Grid item lg={1.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            Status 

              </MDTypography> 
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:500}}>
            {containersdata.container[0].status==="active"?        <MDBadge
        variant="contained"
        color="success"
        badgeContent="Active"
        container
      />:<MDBadge
      variant="contained"
      color="error"
      badgeContent="Inactive"
      container
    />}

              </MDTypography>
            </Grid>
            
          </Grid>
             
            </MDBox>
            <MDBox height="100%" mt={2} lineHeight={1} display="flex">
            <Grid container>
            <Grid item lg={1.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            Config 

              </MDTypography> 
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:500}}>
            {containersdata.container[0].container_config}

              </MDTypography>
            </Grid>
            
          </Grid>
            </MDBox>
            <MDBox height="100%" mt={2} lineHeight={1} display="flex">
            <Grid container>
            <Grid item lg={1.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            Website 

              </MDTypography> 
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:500}}>
            {containersdata.container[0].website}

              </MDTypography>
            </Grid>
            
          </Grid>
              </MDBox>
            <MDBox height="100%" mt={2} lineHeight={1} display="flex">
            <Grid container>
            <Grid item lg={1.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            Container Key 

              </MDTypography> 
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:500}}>
            {containersdata.container[0].containerkey}

              </MDTypography>
            </Grid>
            
          </Grid>
             
            </MDBox>
            <MDBox height="100%" mt={2} lineHeight={1} display="flex">
            <Grid container>
            <Grid item lg={1.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            GTM Id 

              </MDTypography> 
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:500}}>
            {containersdata.container[0].gtm_containerid}

              </MDTypography>
            </Grid>
            
          </Grid>
             
            </MDBox>

            <MDBox height="100%" mt={2} lineHeight={1} display="flex">
            <Grid container>
            <Grid item lg={1.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            Used Req 

              </MDTypography> 
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:500}}>
            {containersdata.container[0].containerusedreq_obj!==null?containersdata.container[0].containerusedreq_obj.usedrequests:"--"}

              </MDTypography>
            </Grid>
            
          </Grid>
             
            </MDBox>
            <MDBox height="100%" mt={2} lineHeight={1} display="flex">
            <Grid container>
            <Grid item lg={1.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            Container Url

              </MDTypography> 
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>
            <CopyToClipboard text= {containersdata.container[0].container_url!==null?containersdata.container[0].container_url:"--"}
          onCopy={() => seturlcopied(true) }>
         <Tooltip title={urlcopied?"copied":""} placement="top">
              <MDButton onlyicon>
              <MDTypography title= {containersdata.container[0].container_url!==null && containersdata.container[0].container_url} style={{fontSize:16,fontWeight:500,marginTop:-10,marginLeft:-25}} type="text"> {containersdata.container[0].container_url!==null?containersdata.container[0].container_url:"--"}
             
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
    {/* 
    {containersdata && containersdata.container[0].container_customdomains[0].customdomain!==""?
    <Card id="settings" style={{marginTop:20}}>
    <MDBox p={2}>
    <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Custom Domains
              </MDTypography>
            </MDBox>
    {containersdata?
  <MDBox
  position="relative"
  my={4}
  
>

  <Styles>
   <ContainerTable data={containersdata.container[0].container_customdomains} columns={columns} loading={containersdataloading}/>
   </Styles>
   </MDBox>
 :<CircularProgress/>}
    </MDBox>
    </Card>:null} */}
{containersdata && containersdata.container[0].workspace_obj.plantype==="free"?null:
     <Card id="settings" style={{marginTop:20}}>
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
size="large"
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
        <MDBox height="100%" mt={2} lineHeight={1} display="flex">
          <Grid container>
            <Grid item lg={1.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
               Domain 

              </MDTypography>
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>

            <CopyToClipboard text={`https://${containersdata.container[0].container_customdomains[0].customdomain}`}
          onCopy={() => setcopied(true) }>
         <Tooltip title={copied?"copied":""} placement="top">
              <MDButton onlyicon>
              <MDTypography title={containersdata.container[0].container_customdomains[0].customdomain} style={{fontSize:16,fontWeight:500,marginTop:-10,marginLeft:-25}} type="text">https://{containersdata.container[0].container_customdomains[0].customdomain} 
             
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
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
               Status 

              </MDTypography>
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
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
        container
      />:
      <MDBadge
      variant="contained"
      color="warning"
      badgeContent="Not Ready"
      container
    />:<MDTypography style={{fontSize:16,fontWeight:500,color:"#fb8c00"}}>Request in process...</MDTypography>

            }

            {/* {containersdata.container[0].container_customdomains[0].hascertificate==="success" ? 
            <MDBadge
        variant="contained"
        color="success"
        badgeContent="Ready"
        container
      />:containersdata.container[0].container_customdomains[0].hascertificate==="initiated" && containersdata.container[0].container_customdomains[0].container_req && containersdata.container[0].container_customdomains[0].container_req.requesttype==="create_container"?
      <MDTypography style={{fontSize:16,fontWeight:500}}>creating your request, please wait ...</MDTypography>:
      containersdata.container[0].container_customdomains[0].hascertificate==="initiated" && containersdata.container[0].container_customdomains[0].container_req && containersdata.container[0].container_customdomains[0].container_req.requesttype==="create_customdomain"?
      <MDTypography style={{fontSize:16,fontWeight:500}}>creating your domain, please wait ...</MDTypography>:
      containersdata.container[0].container_customdomains[0].hascertificate==="initiated" && containersdata.container[0].container_customdomains[0].container_req && containersdata.container[0].container_customdomains[0].container_req.requesttype==="verify_certificate"?
      <MDTypography style={{fontSize:16,fontWeight:500}}>verifying your domain, please wait ...</MDTypography>:
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
    
<MDBox display="flex" justifyContent="space-between" alignItems="center" style={{marginTop:20}}>
<MDBox>
<MDTypography style={{fontSize:16,fontWeight:500,color:"#000000"}}>
Type
</MDTypography>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10}}>
{ containersdata.container[0].container_customdomains[0].instructions.ssl_obj ? containersdata.container[0].container_customdomains[0].instructions.ssl_obj.type:"--"}
</MDTypography>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10}}>
{containersdata.container[0].container_customdomains[0].instructions.hostname_obj ? containersdata.container[0].container_customdomains[0].instructions.hostname_obj.type : "--"}
</MDTypography>


</MDBox>
<MDBox>
<MDTypography style={{fontSize:16,fontWeight:500,color:"#000000",textAlign:"center"}}>
Name
</MDTypography>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10,textAlign:"center"}}>
{containersdata.container[0].container_customdomains[0].instructions.ssl_obj? containersdata.container[0].container_customdomains[0].instructions.ssl_obj.name : "--"}
</MDTypography>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10,textAlign:"center"}}>
{containersdata.container[0].container_customdomains[0].instructions.hostname_obj ? containersdata.container[0].container_customdomains[0].instructions.hostname_obj.name : ""}
</MDTypography>

</MDBox>

<MDBox>
<MDTypography style={{fontSize:16,fontWeight:500,color:"#000000",textAlign:"center"}}>
Value
</MDTypography>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10,textAlign:"center"}}>
{containersdata.container[0].container_customdomains[0].instructions.ssl_obj ? containersdata.container[0].container_customdomains[0].instructions.ssl_obj.value : "--"}
</MDTypography>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10,textAlign:"center"}}>
{containersdata.container[0].container_customdomains[0].instructions.hostname_obj ? containersdata.container[0].container_customdomains[0].instructions.hostname_obj.value : "--"}
</MDTypography>

</MDBox>


<MDBox>
<MDTypography style={{fontSize:16,fontWeight:500,color:"#000000",textAlign:"center"}}>
Status
</MDTypography>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10,textAlign:"center"}}>
{containersdata.container[0].container_customdomains[0].instructions.ssl_obj ? containersdata.container[0].container_customdomains[0].instructions.ssl_obj.status : "--"}
</MDTypography>
<MDTypography style={{fontSize:14,fontWeight:400,marginTop:10,textAlign:"center"}}>
{containersdata.container[0].container_customdomains[0].instructions.hostname_obj ? containersdata.container[0].container_customdomains[0].instructions.hostname_obj.status : "--"}
</MDTypography>

</MDBox>

</MDBox>
</Grid>
</Grid>


</>
    }
   
 
 


{!containersdata.container[0].container_customdomains[0].awaitingsslstatus && !containersdata.container[0].container_customdomains[0].status ?
<MDBox display="flex" justifyContent="flex-end">
<MDButton variant="contained" color="success" size="large" style={{marginTop:30}} onClick={()=>{
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
    <MDTypography style={{fontSize:16,fontWeight:500,color:"#fb8c00"}}>Custom Domain verification in process...</MDTypography>:null:null
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
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
               Domain 

              </MDTypography>
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
            : 

              </MDTypography> 
              
            </Grid>
            <Grid item>

            <CopyToClipboard text={`https://${containersdata.container[0].container_customdomains[0].customdomain}`}
          onCopy={() => setcopied(true) }>
         <Tooltip title={copied?"copied":"copy"} placement="top">
              <MDButton onlyicon>
              <MDTypography title={containersdata.container[0].container_customdomains[0].customdomain} style={{fontSize:16,fontWeight:500,marginTop:-10,marginLeft:-25}} type="text">https://{containersdata.container[0].container_customdomains[0].customdomain} 
             
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
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
               Status 

              </MDTypography>
              
            </Grid>
            <Grid item lg={0.5}>
            <MDTypography variant="body2" style={{fontSize:16,fontWeight:400}}>
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
      <MDTypography style={{fontSize:16,fontWeight:500}}>creating your request, please wait ...</MDTypography>:
      containersdata.container[0].container_customdomains[0].hascertificate==="initiated" && containersdata.container[0].container_customdomains[0].container_req && containersdata.container[0].container_customdomains[0].container_req.requesttype==="create_customdomain"?
      <MDTypography style={{fontSize:16,fontWeight:500}}>creating your domain, please wait ...</MDTypography>:
      containersdata.container[0].container_customdomains[0].hascertificate==="initiated" && containersdata.container[0].container_customdomains[0].container_req && containersdata.container[0].container_customdomains[0].container_req.requesttype==="verify_certificate"?
      <MDTypography style={{fontSize:16,fontWeight:500}}>verifying your domain, please wait ...</MDTypography>:
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
                 <Grid item xs={12}>
                  <Grid container spacing={1} >
                    
                    <Grid item lg={6}>
                    <Card id="power-ups" sx={{ overflow: "visible" }}>
                    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              Custom loader
              </MDTypography>
              <MDTypography variant="body2" color="text" style={{fontSize:10}}>
                popular
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
              <MDBox ml={1}>
                <Switch />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDTypography variant="body2" color="text" style={{fontSize:14,marginTop:10,fontWeight:400}}>
        Coming Soon...
              </MDTypography>
      </MDBox>
                    </Card>
                    </Grid>
                  
                    <Grid item lg={6}>
                    <Card id="power-ups" sx={{ overflow: "visible" }}>
                    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              Cookie keeper
              </MDTypography>
              <MDTypography variant="body2" color="text" style={{fontSize:10}}>
                PRO
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
              <MDBox ml={1}>
                <Switch />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDTypography variant="body2" color="text" style={{fontSize:14,marginTop:10,fontWeight:400}}>
       Coming soon...
              </MDTypography>
      </MDBox>
                    </Card>
                    </Grid>
                    <Grid item lg={6}>
                    <Card id="power-ups" sx={{ overflow: "visible" }}>
                    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              Anonymizer
              </MDTypography>
              <MDTypography variant="body2" color="text" style={{fontSize:10}}>
                PRO
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
              <MDBox ml={1}>
                <Switch />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDTypography variant="body2" color="text" style={{fontSize:14,marginTop:10,fontWeight:400}}>
        Coming soon...
              </MDTypography>
      </MDBox>
                    </Card>
                    </Grid>
                  
                    <Grid item lg={6}>
                    <Card id="power-ups" sx={{ overflow: "visible" }}>
                    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              HTTP Header Config
              </MDTypography>
              <MDTypography variant="body2" color="text" style={{fontSize:10}}>
                PRO
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
              <MDBox ml={1}>
                <Switch />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDTypography variant="body2" color="text" style={{fontSize:14,marginTop:10,fontWeight:400}}>
        Coming soon...
              </MDTypography>
      </MDBox>
                    </Card>
                    </Grid>
                    <Grid item lg={6}>
                    <Card id="power-ups" sx={{ overflow: "visible" }}>
                    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              Google service account
              </MDTypography>
              <MDTypography variant="body2" color="text" style={{fontSize:10}}>
                Pro
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
              <MDBox ml={1}>
                <Switch />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDTypography variant="body2" color="text" style={{fontSize:14,marginTop:10,fontWeight:400}}>
        Coming soon...
              </MDTypography>
      </MDBox>
                    </Card>
                    </Grid>
                    <Grid item lg={6}>
                    <Card id="power-ups" sx={{ overflow: "visible" }}>
                    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              Multi-Domains
              </MDTypography>
              <MDTypography variant="body2" color="text" style={{fontSize:10}}>
                Business
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
              <MDBox ml={1}>
                <Switch />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDTypography variant="body2" color="text" style={{fontSize:14,marginTop:10,fontWeight:400}}>
        Coming soon...
              </MDTypography>
      </MDBox>
                    </Card>
                    </Grid>
                    <Grid item lg={6}>
                    <Card id="power-ups" sx={{ overflow: "visible" }}>
                    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              GEO Headers
              </MDTypography>
              <MDTypography variant="body2" color="text" style={{fontSize:10}}>
                Business
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
              <MDBox ml={1}>
                <Switch />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDTypography variant="body2" color="text" style={{fontSize:14,marginTop:10,fontWeight:400}}>
        Coming soon...
              </MDTypography>
      </MDBox>
                    </Card>
                    </Grid>
                    <Grid item lg={6}>
                    <Card id="power-ups" sx={{ overflow: "visible" }}>
                    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              User Agent Info
              </MDTypography>
              <MDTypography variant="body2" color="text" style={{fontSize:10}}>
                Business
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
              <MDBox ml={1}>
                <Switch />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDTypography variant="body2" color="text" style={{fontSize:14,marginTop:10,fontWeight:400}}>
        Coming soon...
              </MDTypography>
      </MDBox>
                    </Card>
                    </Grid>
                    <Grid item lg={6}>
                    <Card id="power-ups" sx={{ overflow: "visible" }}>
                    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              File Proxy
              </MDTypography>
              <MDTypography variant="body2" color="text" style={{fontSize:10}}>
                Business
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
              <MDBox ml={1}>
                <Switch />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDTypography variant="body2" color="text" style={{fontSize:14,marginTop:10,fontWeight:400}}>
        Coming soon...
              </MDTypography>
      </MDBox>
                    </Card>
                    </Grid>
                    <Grid item lg={6}>
                    <Card id="power-ups" sx={{ overflow: "visible" }}>
                    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              XML to JSON
              </MDTypography>
              <MDTypography variant="body2" color="text" style={{fontSize:10}}>
                Business
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
              <MDBox ml={1}>
                <Switch />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDTypography variant="body2" color="text" style={{fontSize:14,marginTop:10,fontWeight:400}}>
        Coming soon...
              </MDTypography>
      </MDBox>
                    </Card>
                    </Grid>
                    <Grid item lg={6}>
                    <Card id="power-ups" sx={{ overflow: "visible" }}>
                    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              User ID
              </MDTypography>
              <MDTypography variant="body2" color="text" style={{fontSize:10}}>
                Business
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
              <MDBox ml={1}>
                <Switch />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDTypography variant="body2" color="text" style={{fontSize:14,marginTop:10,fontWeight:400}}>
        Coming soon...
              </MDTypography>
      </MDBox>
                    </Card>
                    </Grid>
                    <Grid item lg={6}>
                    <Card id="power-ups" sx={{ overflow: "visible" }}>
                    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              Schedule (Beta)
              </MDTypography>
              <MDTypography variant="body2" color="text" style={{fontSize:10}}>
                Business
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
              <MDBox ml={1}>
                <Switch />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDTypography variant="body2" color="text" style={{fontSize:14,marginTop:10,fontWeight:400}}>
        Coming soon...
              </MDTypography>
      </MDBox>
                    </Card>
                    </Grid>
                    <Grid item lg={6}>
                    <Card id="power-ups" sx={{ overflow: "visible" }}>
                    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              Request delay (Beta)
              </MDTypography>
              <MDTypography variant="body2" color="text" style={{fontSize:10}}>
                Business
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
              <MDBox ml={1}>
                <Switch />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDTypography variant="body2" color="text" style={{fontSize:14,marginTop:10,fontWeight:400}}>
        Coming soon...
              </MDTypography>
      </MDBox>
                    </Card>
                    </Grid>
                    <Grid item lg={6}>
                    <Card id="power-ups" sx={{ overflow: "visible" }}>
                    <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
              Open container for bot index
              </MDTypography>
              <MDTypography variant="body2" color="text" style={{fontSize:10}}>
                Business
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
              <MDBox ml={1}>
                <Switch />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <MDTypography variant="body2" color="text" style={{fontSize:14,marginTop:10,fontWeight:400}}>
        Coming soon...
              </MDTypography>
      </MDBox>
                    </Card>
                    </Grid>
                  </Grid>
             
                </Grid>
                 {/* 
                <Grid item xs={12}>
                  <Card id="subscription">
                  <MDBox p={3}>
        <MDTypography variant="h5">Usage statistic</MDTypography>
        
      </MDBox>
      <Divider/>
      <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          style={{marginLeft:10}}
        >
          <MDTypography variant="body2" color="main">
          Available requests this month left: 9,844
          </MDTypography>
          
            <Autocomplete
              style={{width:"500",marginRight:20}}
              //defaultValue={["In Stock", "Out of Stock"]}
              options={[
                "All Domains",
                "https://icxzfkbv.cin.xyz.io",
                
              ]}
              renderInput={(params) => (
                <MDInput {...params} variant="standard" label="Select Domain"/>
              )}
            />
            
        </MDBox>

                  <Grid item xs={12} md={12}>
              <VerticalBarChart
                //icon={{ color: "success", component: "splitscreen" }}
                //title="Usage statistic"
                //description="Sales related to age average"
                chart={verticalBarChartData}
              />
            </Grid>
                  </Card>
                </Grid> */}
                {/* <Grid item xs={12}>
                <Card id="logs">
      <MDBox p={2}>
        <Grid item alignItems="center">
        <MDBox
        mt={5}
          display="flex"
          justifyContent="center"
          alignItems={{ xs: "center", sm: "center" }}
          //flexDirection={{ xs: "column", sm: "row" }}
          style={{marginLeft:10}}
        >
          
          <MDTypography variant="h5" color="main">
          Logs are available for Pro, Business, Enterprise and Custom plans          </MDTypography>
          </MDBox>
          <MDBox 
          mt={5}
          mb={3}
          display="flex"
          justifyContent="center"
          alignItems={{ xs: "center", sm: "center" }}>

       
       <MDButton
         
         //onClick={settimeline(2)}
          size="medium"
          variant="gradient"
          color="success"
        >
         
          <b style={{marginLeft:10}}>Upgrade to use logs</b>
         
        </MDButton>
                      
                      </MDBox>
          </Grid>
          </MDBox>
          </Card>
                </Grid>
                <Grid item xs={12}>
                <Card id="monitor">
      <MDBox p={2}>
        <Grid item alignItems="center">
        <MDBox
        mt={5}
          display="flex"
          justifyContent="center"
          alignItems={{ xs: "center", sm: "center" }}
          //flexDirection={{ xs: "column", sm: "row" }}
          style={{marginLeft:10}}
        >
          
          <MDTypography variant="h5" color="main">
          Monitoring are available for Business, Enterprise and Custom plans
           </MDTypography>
          </MDBox>
          <MDBox 
          mt={5}
          mb={3}
          display="flex"
          justifyContent="center"
          alignItems={{ xs: "center", sm: "center" }}>

       
       <MDButton
         
         //onClick={settimeline(2)}
          size="medium"
          variant="gradient"
          color="success"
        >
         
          <b style={{marginLeft:10}}>Upgrade to use Monitoring</b>
         
        </MDButton>
                      
                      </MDBox>
          </Grid>
          </MDBox>
          </Card>
               
                </Grid> */}
               
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    
        </Grid>
      </MDBox>
      
     {/*  <Footer /> */}
    </DashboardLayout>
    </Authenticated>
  );
}

export default ContainerSettings;

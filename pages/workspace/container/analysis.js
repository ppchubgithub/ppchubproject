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

function Analysis() {
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


  const [opencanceldialog, setopencanceldialog] = useState(false);
  const handleopencancelconfirm = () => {
    setopencanceldialog(true);
  };
  const handleclosecancelconfirm = () => {
    setopencanceldialog(false);
    
  };

  const sidenavItems = [
    { icon: "settings", label: containersdata?containersdata.container[0].containername:"Container Details", href: "settings" },
    { icon: "receipt_long", label: "Server Boosts", href: "power-ups" },

    /* 
    { icon: "security", label: "Logs", href: "logs" },
    { icon: "settings_applications", label: "Monitor", href: "monitor" }, */
   
  ];

  
  
  return (
    <Authenticated>
    <DashboardLayout>
      <DashboardNavbar />
     
      <MDBox
       
       display="flex"
       justifyContent="center"
       alignItems="center"
       
       style={{marginTop:100,marginBottom:100}}
     >
        <MDBadge
          variant="contained"
          color="warning"
          badgeContent="Coming Soon..."
          container
        />
      
       </MDBox>
     
      </DashboardLayout>
      </Authenticated>
  );
}

export default Analysis;

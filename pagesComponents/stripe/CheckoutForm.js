import React from "react";
import {
  PaymentElement,
  
  LinkAuthenticationElement,
  useStripe,
  useElements,
  
} from "@stripe/react-stripe-js";
import MDBox from "/components/MDBox";

import { useTranslation } from 'react-i18next';
import { Button,Grid,Box,styled,Container,Card,Select,MenuItem,Stack,InputLabel} from '@mui/material';
import {useAuth} from '../../hooks/useAuth'
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import bg from '../../assets/images/logo/payment.png';
import PageLayout from "/examples/LayoutContainers/PageLayout";
import MDTypography from "/components/MDTypography";
import {
  CircularProgress
} from '@mui/material';
import MDButton from "/components/MDButton";

const MainContent = styled(Box)(
    ({ theme }) => `
    
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:1000
  `
  );


const SidebarWrapper = styled(MDBox)(
  ({ theme }) => `
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    background: linear-gradient(141deg, #028C6B 0%, #006742 100%);
    background-image: url("../../assets/images/logo/payment.png");
    width: 600px;
`
);

const SidebarContent = styled(MDBox)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(6)};
`
);

//const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutForm(props) {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  

  const appearance = {
    theme: 'stripe',
  
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px',
      // See all possible variables below
    }
  };
/* 
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );
  
  // Pass the appearance object to the Elements instance
  const elements = stripe.elements({clientSecret, appearance}); */

  React.useEffect(() => {
    if (!stripe) {
      return;
    }


    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);


  React.useEffect(()=>{
    if(props.from==="update"){
      
        stripe
        .confirmCardPayment(clientSecret)
        .then(function(result) {
          console.log(`subscription update payment result${JSON.stringify(result)}`)
        });
      
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      appearance,
      confirmParams: {
        
        //return_url: "https://apps.servertag.io/workspaces",
        return_url: `${process.env.NEXT_PUBLIC_RETURN_URL}?workspaceid=${props.workspaceid}?paymentstatus="success"`
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  
  const paymentElementOptions = {
    layout: "tabs",
   defaultValues:{billingDetails:{email:user.email}},
   appearance: {
    theme: 'dark',
    variables: {
      colorText: '#ffffff',
    },
  },
   
   // readOnly:true
  };
  

  return (
   
      <DashboardLayout>
    <DashboardNavbar />
   
     <MDBox display="flex" justifyContent="center" alignItems="middle" style={{marginTop:100}}>
        <Grid container >
          <Grid item lg={4}>

          </Grid>
          <Grid item lg={4}>
            <Card 
              sx={{
                p: 4,
                my: 4
              }}
            >
    <form  onSubmit={handleSubmit} >
      <LinkAuthenticationElement
        id="link-authentication-element"
        defaultValues= {{email: user.email}}
        onChange={(e) => setEmail(e.target.value)} 
      />
      <PaymentElement style={{marginBottom: '24px',marginTop:20}} options={paymentElementOptions}/>

      <MDButton

        //onClick={settimeline(2)}
        size="large"
        variant="gradient"
        color="success"
/* 
        startIcon={
          isLoading ? <CircularProgress size="1.5rem" style={{color:"#ffffff"}}/> : null
        } */
        //disabled={formik.isSubmitting}
        type="submit"

        >

{isLoading ? <CircularProgress size="1.5rem" style={{color:"#ffffff"}}/> : "Pay now"}
        
        </MDButton>

      {/* <button size="large" disabled={isLoading || !stripe || !elements} id="submit" style={{padding:15,marginTop:10,borderRadius:10,backgroundColor:"#1A73E8",color:"#FFFFFF",fontSize:14,fontWeight:600}}>
        
          {isLoading ? <CircularProgress size="1.5rem" style={{color:"#ffffff"}}/> : "Pay now"}
       
      </button>  */}
       
      
      
      {/* Show any error or success messages */}
      {message && <div id="payment-message" style={{marginTop:20,color:"#F44335",fontFamily:'Roboto'}}>{message}</div>}
    </form>
    </Card>
    </Grid>
    </Grid>
    </MDBox>
    </DashboardLayout>
  
   
  );
}

/* 
http://localhost:3000/?payment_intent=pi_3NxlwOLWdnOC3Wy80nT0FDeB&payment_intent_client_secret=pi_3NxlwOLWdnOC3Wy80nT0FDeB_secret_1vQtq1smJA7QNj3XY4ZZ5AkVK&redirect_status=succeeded */
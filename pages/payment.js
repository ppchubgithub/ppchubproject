import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../pagesComponents/stripe/CheckoutForm";
import { useRouter } from 'next/router';
import {useGetPaymentintentDataQuery,useGetRequestsQuery} from '../services/hasuraquerydata'
import { CircularProgress } from "@mui/material";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function App() {
  const router = useRouter();
  const from = router.query.from;
  const subscriptionid = router.query.subscriptionid;
  const workspaceid = router.query.workspaceid;
  console.log(`route params are  ${from}  ${subscriptionid} ${workspaceid}`)
   //const [clientSecret, setClientSecret] = React.useState("pi_3Nxm6tLWdnOC3Wy81BfyUX6H_secret_GAnj498pro8NVjvVpro92l89y");
    const [clientSecret, setClientSecret] = React.useState("");
   console.log(`clientsecret from db is ${clientSecret}`)
  const {data:paymentintentdata,isUninitialized,isLoading:paymentintentdataloading,isSuccess:paymentintentdatasuccess}= useGetPaymentintentDataQuery({workspaceid:workspaceid!==null?workspaceid:null},{

    pollingInterval: 3000,
    //pollingInterval: 3000,
    skipPollingIfUnfocused: true,
  });

  const {data:requestsdata}= useGetRequestsQuery({subscriptionid:subscriptionid!==null?subscriptionid:null},{

    pollingInterval: 3000,
    //pollingInterval: 3000,
    skipPollingIfUnfocused: true,
  });
  console.log(`paymentintentdata data is ${JSON.stringify(paymentintentdata)}`);
  React.useEffect(()=>{
    if(from==='update'){

      if(requestsdata){
        setClientSecret(requestsdata.stripe_requests[0].client_secret)
      }

    }
    else{
      if(paymentintentdata){
        setClientSecret(paymentintentdata.workspaces[0].workspace_subscriptions.stripe_paymentintents.stripe_clientsecret)
      }
    }
 
  
  
  },[paymentintentdata,paymentintentdataloading,requestsdata]);
     
  
  //const [clientSecret, setClientSecret] = React.useState("pi_3Nxm6tLWdnOC3Wy81BfyUX6H_secret_GAnj498pro8NVjvVpro92l89y");

  /* React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []); */
  const appearance = {
    theme: 'stripe',
    labels:"above",
    variables: {
      fontWeightNormal: '500',
      borderRadius: '2px',
      colorPrimary: '#f360a6',
      colorIconTabSelected: '#fff',
      spacingGridRow: '16px'
    },
    rules: {
      '.Tab, .Input, .Block, .CheckboxInput, .CodeInput': {
        boxShadow: '0px 3px 10px rgba(18, 42, 66, 0.08)'
      },
      '.Block': {
        borderColor: 'transparent'
      },
      '.BlockDivider': {
        backgroundColor: '#ebebeb'
      },
      '.Tab, .Tab:hover, .Tab:focus': {
        border: '0'
      },
      '.Tab--selected, .Tab--selected:hover': {
        backgroundColor: '#f360a6',
        color: '#fff'
      }
    }
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm workspaceid={workspaceid}/>
        </Elements>
      )}
    </div>
  );
}
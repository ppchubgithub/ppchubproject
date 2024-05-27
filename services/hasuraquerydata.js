import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import firebase from '../utils/firebase';
import { request, gql, ClientError } from 'graphql-request';
import { useSelector } from 'react-redux';
import {auth} from '../utils/firebase';

//import { getAuth } from "firebase/auth";
const graphqlBaseQuery =
  ({ baseUrl }) =>
  async ({ body,variables }) => {
   // const auth = getAuth();
//let user =  auth.currentUser;
    try {
      const result = await request(baseUrl, body,variables?variables:{},{'Content-Type': 'application/json',
      'contextrole':auth.currentUser.emailVerified?"user":"userguestrole",
      'Authorization': `Bearer ${await firebase.auth().currentUser.getIdToken()}`})
      return { data: result }
    } catch (error) {
      console.error(`error in graphqlbase query ${JSON.stringify(error)}`)
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } }
      }
      return { error: { status: 500, data: error } }
    }
  }

const api = createApi({
    reducerPath: 'ppchubApi',
    baseQuery: graphqlBaseQuery({
        //baseUrl: 'https://bkprod.ppchub.io/v1/graphql',
        //baseUrlx: 'https://honest-donuts-enjoy-49-37-156-234.loca.lt/v1/graphql',
        baseUrl: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
     /*    prepareHeaders:  async (headers,{getState}) => {
            const token = await firebase.auth().currentUser.getIdToken();
            console.log(`authorization id token in rtk query function ${token}`)

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            headers.set('Content-Type', 'application/json')
            headers.set('contextrole',"user")
            return headers;
        } */
    }),
   //keepUnusedDataFor: 60,
   tagTypes:['Home'],
   endpoints: build => ({         
       setUserRegistration: build.mutation({
             query: (variable) => ({
                 body: gql`mutation ($accesstoken: String!,$accountname:String,$accounttype:String,$firstname:String!,$lastname:String!,$location:String,$mobno:String,$workspacename:String) {
                  user_register(accesstoken: $accesstoken, accountname: $accountname, accounttype: $accounttype, firstname: $firstname, lastname: $lastname, location: $location, mobno: $mobno, workspacename: $workspacename) {
                    status
                  }
                }
                `,
                variables:{
                  accesstoken:variable.accesstoken,

             location:variable.location,
             mobno:variable.mobno,
             accountname:variable.accountname,
             accounttype:variable.accounttype,
             workspacename:variable.workspacename,
             firstname:variable.firstname,
             lastname:variable.lastname,
                 
                }
             }),
             invalidatesTags: ['Home'],
       }), 
       setUserGuestRegistration: build.mutation({
        query: (variable) => ({
            body: gql`mutation InsertUnverifiedusers($email: String, $firebaseid: String, , $firstname: String, $lastname: String, $location: String, $mobno: String, $accountname: String, $accounttype: String, $workspacename: String) {
              insert_unverifiedusers(objects: {email: $email, firebaseid: $firebaseid,  firstname: $firstname, lastname: $lastname, location: $location, mobno: $mobno, accountname: $accountname, accounttype: $accounttype, workspacename: $workspacename}) {
                affected_rows
                
              }
            }
                
                
            `,
           variables:{
            email:variable.email,
            firebaseid:variable.firebaseid,
             firstname:variable.firstname,
             lastname:variable.lastname,
             location:variable.location,
             mobno:variable.mobno,
             accountname:variable.accountname,
             accounttype:variable.accounttype,
             workspacename:variable.workspacename
             
            
           }
        }),
        invalidatesTags: ['Home'],
  }), 

      getUsers: build.query({
        query: (variable) => ({
            body: gql`query{
              users{
                firstname
                lastname
                email
                location
                mobno
                user_accounts{
                  accountid
                  account{
                    accountname
                    accounttype
                  }
                }
                user_workspaces{
                  workspace_obj{
                    workspacename
                    
                  }
                }
              }
            }
            `
        }),
        invalidatesTags: ['Home'],
      }),

      getGuestUsers: build.query({
        query: (variable) => ({
            body: gql`query{
              unverifiedusers{
                firstname
                lastname
                location
                mobno
                accountname
                accounttype
                workspacename
              }
            }
            `
        }),
        invalidatesTags: ['Home'],
      }),
      setUserProfile: build.mutation({
        query: (variable) => ({
            body: gql`mutation ($workspaceid: ID, $workspacename: String,$accountid:ID!,$accounttype:String!,$agencyname:String!,$firstname:String!,$lastname:String!) {
              userprofile(accountid: $accountid, accounttype: $accounttype, agencyname: $agencyname, firstname: $firstname, lastname: $lastname, workspaceid: $workspaceid, workspacename: $workspacename) {
                status
              }
            }
            
            `,variables:{
              firstname:variable.firstname,
              lastname:variable.lastname,
              agencyname:variable.agencyname,
              workspacename:variable.workspacename,
              accounttype:variable.accounttype,
              accountid:variable.accountid,
              workspaceid:variable.workspaceid
            }
        }),
        invalidatesTags: ['Home'],
      }),
      getCustomers: build.query({
        query: (variable) => ({
            body: gql`{
              googlecustomerclients(where: {managerstatus: {_eq: false}}) {
                gcustomerid
                gcustomerclientid
                descriptivename
                timezone
                currencycode
              }
            }
            
            `
        }),
        invalidatesTags: ['Home'],
      }),
       setgoogleauth: build.mutation({
        query: (variable) => ({
            body: gql`mutation ($googleoauthcode: String!, $redirect_uri: String!) {
              googleouathcode(googleoauthcode: $googleoauthcode, redirect_uri: $redirect_uri) {
                status
              }
            }`,
           variables:{
            googleoauthcode:variable.googleoauthcode,
          redirect_uri:variable.redirect_uri
           }
        }),
        invalidatesTags: ['Home'],
  }), 

  setaccountsetup: build.mutation({
    query: (variable) => ({
        body: gql`mutation($accountname:String!,$workspacename:String!) {
          accountsetup(accountname: $accountname, workspacename: $workspacename) {
            
            status
          }
        }`,
       variables:{
        accountname:variable.accountname,
        workspacename:variable.workspacename
       }
    }),
    invalidatesTags: ['Home'],
}), 
setcreatecontainer: build.mutation({
  query: (variable) => ({
      body: gql`mutation($containername:String!,$accountid:ID!,$workspaceid:ID!,$website:String,$configuration:String!,$plantype:String!,$regioncode:String!,$customdomain:String,$accountname:String!,$workspacename:String!,$gtm_containerid:String) {
        createcontainer(accountid: $accountid, workspaceid: $workspaceid, website: $website,  containername: $containername,configuration:$configuration,plantype:$plantype,regioncode:$regioncode,customdomain:$customdomain,accountname:$accountname,workspacename:$workspacename,gtm_containerid:$gtm_containerid) {
          status
          containerid
          containername
        }
      }`,
     variables:{
      
      website:variable.website,

      workspaceid:variable.workspaceid,
      accountid:variable.accountid,
      containername:variable.containername,
      configuration:variable.configuration,
      plantype:variable.plantype,
      regioncode:variable.regioncode,
      customdomain:variable.customdomain,
      workspacename:variable.workspacename,
      accountname:variable.accountname,
      gtm_containerid:variable.gtm_containerid
      
     }
  }),
  invalidatesTags: ['Home'],
}), 
setaddcustomdomain: build.mutation({
  query: (variable) => ({
      body: gql`mutation($containerid:ID!,$customdomain:String!) {
        addcustomdomain(containerid: $containerid, customdomain: $customdomain) {
          status
        }
      }
      `,
     variables:{
      containerid:variable.containerid,
      customdomain:variable.customdomain
      
     }
  }),
  invalidatesTags: ['Home'],
}), 
setverifycustomdomain: build.mutation({
  query: (variable) => ({
      body: gql`mutation($cdnhostname_id:String!,$containerid:ID!,$customdomain:String!) {
        verifycustomdomain(cdnhostname_id: $cdnhostname_id, containerid: $containerid, customdomain: $customdomain) {
          status
        }
      }
      
      `,
     variables:{
      containerid:variable.containerid,
      customdomain:variable.customdomain,
      cdnhostname_id:variable.cdnhostname_id
      
     }
  }),
  invalidatesTags: ['Home'],
}), 

setcreateworkspace: build.mutation({
  query: (variable) => ({
      body: gql`mutation($workspacename:String!) {
        createworkspace(workspacename: $workspacename) {
          status
        }
      }
      `,
     variables:{
      
      workspacename:variable.workspacename
      
     }
  }),
  invalidatesTags: ['Home'],
}), 
seteditworkspace: build.mutation({
  query: (variable) => ({
      body: gql`mutation ($workspaceid:ID!,$workspacename:String!){
        editworkspace(workspaceid: $workspaceid, workspacename: $workspacename) {
          status
        }
      }
      
      `,
     variables:{
      
      workspacename:variable.workspacename,
      workspaceid:variable.workspaceid
      
     }
  }),
  invalidatesTags: ['Home'],
}), 

setupdateworkspace: build.mutation({
  query: (variable) => ({
      body: gql`mutation ($workspaceid: uuid, $plantype: String,$from:timestamptz,$to:timestamptz) {
        update_workspaces(where: {workspaceid: {_eq: $workspaceid}}, _set: {plantype: $plantype}) {
          affected_rows
        }
        insert_workspaces_freeplan(objects: {workspaceid: $workspaceid, from: $from, to: $to}) {
          affected_rows
        }
      }
      
      
      `,
     variables:{
      
      plantype:variable.plantype,
      workspaceid:variable.workspaceid,
      from:variable.from,
      to:variable.to
      
     }
  }),
  invalidatesTags: ['Home'],
}), 



setdeleteworkspace: build.mutation({
  query: (variable) => ({
      body: gql`
      mutation($workspaceid:uuid) {
        delete_workspaces_users(where: {workspaceid: {_eq: $workspaceid}}){
          affected_rows
        }
        delete_workspaces(where: {workspaceid: {_eq: $workspaceid}}) {
          affected_rows
        }
        
      }
      
      `,
     variables:{
      
      
      workspaceid:variable.workspaceid
      
     }
  }),
  invalidatesTags: ['Home'],
}), 



      getWorspaceData: build.query({
        query: (variable) => ({
            body: gql`{
              workspaces{
                workspaceid
                workspacename
                accountid
                ws_displayid
                status
                plantype
                workspace_freeplan{
                  from
                  to
                }
                stripe_subscription_id
                containers{
                  containerid
                }
                workspace_subscriptions{
                  stripe_subscription_status
                  stripe_subscription_enddate
                  stripe_plan {
      stripe_price_unitamount
      stripe_product {
        stripe_prod_limit {
          productname

          noofservers
          noofrequests
        }
      }
    }
                  subscription_request{
                    status
                    payment_intent_status
                    client_secret
                  }
                  stripe_paymentintents{
                    stripe_clientsecret
                    stripe_receipt_url
                    stripe_paymentintent_description
                  }
                }
              }
            }


            `,
            
        }),
        invalidatesTags: ['Home'],
      }),
      getWorspacesData: build.query({
        query: (variable) => ({
            body: gql`query($workspaceid:uuid){
              workspaces(where: {workspaceid: {_eq: $workspaceid}}){
                workspaceid
                workspacename
                accountid
                ws_displayid
                status
                plantype
                workspaceusedreq{
                  usedrequests
                }
                workspace_freeplan{
                  from
                  to
                }
                stripe_subscription_id
                account{
                  accountname
                  accountusers_array{
                    customer_obj{
                      cardbrand
                      card4digits
                      exp_year
                      exp_month
                    }
                  }
                }
                containers{
                  containerid
                }
                workspace_subscriptions{
                  cancel_at_period_end
                  stripe_subscription_enddate
                  stripe_subscription_status
                  stripe_customer{
                    cardbrand
                    card4digits
                    exp_year
                    exp_month
                  }
                  stripe_invoices(order_by: {created: asc}){
                    stripe_invoice_amountdue
                    stripe_invoice_amountpaid
                    stripe_invoice_id
                    stripe_invoice_pdf
                    stripe_invoice_period_start
                    stripe_invoice_period_end
                    }
                  stripe_plan {
      stripe_price_unitamount
      stripe_product {
        stripe_prod_limit {
          productname

          noofservers
          noofrequests
        }
      }
    }
                  subscription_request{
                    status
                    payment_intent_status
                    client_secret
                  }
                  stripe_paymentintents{
                    stripe_clientsecret
                    stripe_receipt_url
                    stripe_paymentintent_description
                  }
                }
              }
            }


            `,
            variables:{
              workspaceid : variable.workspaceid
             }
        }),
        invalidatesTags: ['Home'],
      }),
      
      getContainerData: build.query({
        query: (variable) => ({
            body: gql`query($workspaceid:uuid){
              container(where: {workspaceid: {_eq: $workspaceid}}) {
                containerid
                containername
                website
                regioncode
                gtm_containerid
                status
                workspace_obj{
                  plantype
                  workspace_subscriptions{
                    stripe_subscription_enddate
                    stripe_plan{
                      stripe_product{
                        stripe_prod_limit{
                          noofrequests
                          productname
                        }
                      }
                    }
                  }
                }
                containerusedreq_obj{
                  usedrequests
                }
                container_requests{
                  request_status
                }
                workspace_obj{
                  stripe_subscription_id
                  
                }
              }
            }
            `,
            variables:{
              workspaceid : variable.workspaceid
             }
        }),
        invalidatesTags: ['Home'],
      }),
      getContainersData: build.query({
        query: (variable) => ({
            body: gql`query ($containerid: uuid) {
              container(where: {containerid: {_eq: $containerid}}) {
                containerid
                containername
                containerkey
                container_config
                website
                gtm_containerid
                status
                container_url
                container_requests{
                  request_status
                }
                workspace_obj{
                  plantype
                  workspace_subscriptions{
                    stripe_subscription_enddate
                    stripe_plan{
                      stripe_product{
                        stripe_prod_limit{
                          noofrequests
                          productname
                        }
                      }
                    }
                  }
                }
                containerusedreq_obj {
                  usedrequests
                }
                container_customdomains {
                  customdomain
                  cdnhostname_id
                  pullzone_id
                  originstatus
                  status
                  sslstatus
                  hostnamestatus
                  awaitingsslstatus
                  instructions
                  hascertificate
                  ownurl
                  hostnameinstructions
                  certificateinstructions
                  cnameinstructions
                  awaitinginstructions
                  container_req(order_by: {created: desc}, limit: 1) {
                    requesttype
                    request_status
                  }
                }
              }
            }
            
            `,
            variables:{
              containerid : variable.containerid
             }
        }),
        invalidatesTags: ['Home'],
      }),
      
      setdeletecontainer: build.mutation({
        query: (variable) => ({
            body: gql`mutation($containerid:uuid) {
              delete_container(where: {containerid: {_eq: $containerid}}) {
                affected_rows
              }
            }
            `,
           variables:{
            containerid:variable.containerid,
            
           }
        }),
        invalidatesTags: ['Home'],
      }), 
      
      getPricesData: build.query({
        query: (variable) => ({
            body: gql`query{
              stripe_prices(order_by: {stripe_price_unitamount: asc}) {
                stripe_price_id
                stripe_price_currency
                stripe_price_unitamount
                stripe_product{
                  stripe_prod_limit{
                    productname
                    noofservers
                    noofrequests
                  }
                }
              }
            }
            `
        }),
        invalidatesTags: ['Home'],
      }),

      setSubscription: build.mutation({
        query: (variable) => ({
            body: gql`mutation($planid:String!,$accountid:ID!,$couponcode:String!,$workspaceid:ID!) {
              subscriptions(planid: $planid,accountid:$accountid,couponcode:$couponcode,workspaceid:$workspaceid) {
                status
                str_clientsecret
                default_payment_method
              }
            }
            
            
            `,
            variables:{
              planid:variable.planid,
              accountid:variable.accountid,
              couponcode:variable.couponcode,
              workspaceid:variable.workspaceid
              }
        }),
        invalidatesTags: ['Home'],
      }),
      getPaymentProductData: build.query({
        query: (variable) => ({
            body: gql`{
              accountsubscription {
                stripe_subscription_id
                stripe_subscription {
                  stripe_prices {
                    stripe_price_currency
                    stripe_price_unitamount
                    stripe_price_recurring
                    stripe_product {
                      stripe_prod_name
                    }
                  }
                  stripe_subscription_status
                  stripe_subscription_currentperiodstart
                  stripe_subscription_currentperiodend
                }
              }
            }
            
            `,
          
        }),
        
        invalidatesTags: ['Home'],
      }),
      setUpdateSubscription: build.mutation({
        query: (variable) => ({
            body: gql`mutation($planid:String!,$workspaceid:ID!,$couponcode:String!) {
              updatesubscription(planid: $planid,workspaceid:$workspaceid,couponcode:$couponcode) {
                status
              }
            }
            
            
            `,
            variables:{
              planid:variable.planid,
              workspaceid:variable.workspaceid,
              couponcode:variable.couponcode
              }
        }),
        invalidatesTags: ['Home'],
      }),

      setCancelSubscription: build.mutation({
        query: (variable) => ({
            body: gql`mutation ($workspaceid:ID!,$canceltype:String!){
              cancelsubscription(workspaceid: $workspaceid,canceltype:$canceltype) {
                status
              }
            }
            
            
            `,
            variables:{
              
              workspaceid:variable.workspaceid,
              canceltype:variable.canceltype
              }
        }),
        invalidatesTags: ['Home'],
      }),


      setCancelSubscriptionAtEnd: build.mutation({
        query: (variable) => ({
            body: gql`mutation ($workspaceid:ID!,$canceltype:String!){
              cancelsubscriptionatend(workspaceid: $workspaceid,canceltype:$canceltype) {
                status
              }
            }
            
            
            `,
            variables:{
              
              workspaceid:variable.workspaceid,
              canceltype:variable.canceltype
              }
        }),
        invalidatesTags: ['Home'],
      }),

      getPaymentintentData: build.query({
        query: (variable) => ({
            body: gql`query($workspaceid:uuid){
              workspaces(where: {workspaceid: {_eq: $workspaceid}}){
                workspace_subscriptions{
                  stripe_paymentintents{
                    stripe_clientsecret
                    stripe_receipt_url
                  }
                }
            }
}
            
            `,
            variables:{
              
              workspaceid:variable.workspaceid,
            }
          
        }),
        invalidatesTags: ['Home'],
      }),
      getPlanData: build.query({
        query: (variable) => ({
            body: gql`query($stripe_subscription_id:String){
              stripe_subscriptions(where: {stripe_subscription_id: {_eq: $stripe_subscription_id}}) {
                stripe_plan {
                  stripe_price_unitamount
                  stripe_product {
                    stripe_prod_limit {
                      productname
                    }
                  }
                }
              }
            }
            
            `,
          
        }),
        invalidatesTags: ['Home'],
      }),
      getAccountID:  build.query({
        query: (variable) => ({
            body: gql`query{
              accountusers{
                accountid
              }
            }
            `,
          
        }),
        invalidatesTags: ['Home'],
      }),
      getRequests:  build.query({
        query: (variable) => ({
            body: gql`query($subscriptionid:String){
              stripe_requests(where: {subscriptionid: {_eq: $subscriptionid}}) {
                client_secret
                payment_intent_status
                status
              }
            }
            
            `,
            variables:{
              
              subscriptionid:variable.subscriptionid
              }
          
        }),
        invalidatesTags: ['Home'],
      }),
    }), 
    

});
export const {useSetUserRegistrationMutation,useSetUserGuestRegistrationMutation,useGetUsersQuery,useGetGuestUsersQuery,useSetUserProfileMutation,useGetCustomersQuery,useSetgoogleauthMutation,useSetaccountsetupMutation,useSetcreatecontainerMutation,useSetaddcustomdomainMutation,useSetverifycustomdomainMutation,useSetcreateworkspaceMutation,useSeteditworkspaceMutation,useSetupdateworkspaceMutation,useSetdeleteworkspaceMutation,useGetWorspaceDataQuery,useGetWorspacesDataQuery,useGetContainerDataQuery,useLazyGetContainerDataQuery,useGetContainersDataQuery,useSetdeletecontainerMutation,useGetPricesDataQuery,useSetSubscriptionMutation,useGetPaymentProductDataQuery,useSetUpdateSubscriptionMutation,useSetCancelSubscriptionMutation,useSetCancelSubscriptionAtEndMutation,useGetPaymentintentDataQuery,useGetPlanDataQuery,useGetAccountIDQuery,useGetRequestsQuery} = api;
export default api;
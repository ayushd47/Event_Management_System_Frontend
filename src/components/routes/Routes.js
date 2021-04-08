import React from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
 import HomePage from '../pages/HomePage';
 import Login from '../pages/Users/auth/Login';
 import Signup from '../pages/Users/auth/Signup';
import Venues from '../pages/Venues';
import VendorsLogin from "../pages/Vendor/auth/VendorsLogin";
import Profile from '../pages/Users/Profile';
import VendorSignup from "../pages/Vendor/auth/VendorsSignup"
import SideNavigation from '../layouts/Headers/SideNavigation';
import VendorsSignup from '../pages/Vendor/auth/VendorsSignup';
//  import Test from '../pages/Test';
import ProfessionalDashboard from '../pages/Vendor/Business/ProfessionalDashboard';
import RegisterVenue from '../pages/Vendor/Venues/RegisterVenue';
import ShowVenue from '../pages/Vendor/Venues/ShowVenue';
import VenuesList from '../pages/Vendor/Venues/VenuesList';
import VendorDashboard from '../pages/Vendor/Venues/VendorDashboard';
import BusinessList from '../pages/Vendor/Business/BusinessList';
import BusinessRegister from '../pages/Vendor/Business/BusinessRegister';
import Catgories from '../pages/HomePage/Categories';
  
import Category from '../pages/Category';
import SearchVenues from '../pages/SearchVenues';
import Business from '../pages/Business';
import ShowBusiness from  '../pages/Vendor/Business/ShowBusiness';
import RegisterWedding from '../pages/Wedding/RegisterWedding';
import Inventory from '../pages/Wedding/Inventory';
import WeddingView from '../pages/Wedding/WeddingView';
import UpdateProfile from '../pages/Users/UpdateProfile';
import Invitations from '../pages/Wedding/Invitations';
import UpdateVendor from '../pages/Vendor/UpdateVendor';
import ShowBookings from '../pages/Vendor/Venues/ShowBookings';
import ShowBusinessBooking from '../pages/Vendor/Business/ShowBusinessBooking';
 

 export default class Routes extends React.Component{

      loggedIn(){
        
        if(sessionStorage.getItem('user_token') == null){
            return false;
        }
          return true; 
     }

     vendorLoggedIn(){
        if(sessionStorage.getItem('vendor_token') == null){
            return false;
        }
          return true; 
     }

     

        render(){

            return (
             
                      //Main Routes
                <BrowserRouter>

             <Switch>
                 
                 <Route exact path = "/" component = {HomePage} />

                 {/* If else condition to rediect if user is logged in or not logged in */}

                 <Route path = "/login"   render={() => (
                     this.loggedIn() == false ? ( <Login /> ) : (<Redirect to = "/profile" />  )
                 )}/>
                <Route path = "/signup"   render={() => (
                     this.loggedIn() == false ? ( <Signup /> ) : (<Redirect to = "/profile" />  )
                 )}/>
                 <Route path = "/venues/:venueid" component = {Venues} />
                 <Route path = "/business/:businessid" component = {Business} />
                 <Route path = "/profile" render={() => (
                     this.loggedIn() == false ? ( <Redirect to = "/login" /> ) : (<Profile /> )
                 )}/>
                  <Route path = "/registerWedding" render={() => (
                     this.loggedIn() == false ? ( <Redirect to = "/login" /> ) : (<RegisterWedding /> )
                 )}/>
                  <Route path = "/inventory" render={() => (
                     this.loggedIn() == false ? ( <Redirect to = "/login" /> ) : (<Inventory /> )
                 )}/>
                    <Route path = "/wedding/:weddingid" render={(props) => (
                     this.loggedIn() == false ? ( <Redirect to = "/login" /> ) : (<WeddingView  {...props}/> )
                 )}/>

                    <Route path = "/updateProfile" render={(props) => (
                     this.loggedIn() == false ? ( <Redirect to = "/login" /> ) : (<UpdateProfile  {...props}/> )
                 )}/>

                    <Route path = "/invitations/:weddingid" render={(props) => (
                     this.loggedIn() == false ? ( <Redirect to = "/login" /> ) : (<Invitations  {...props}/> )
                 )}/>

             <Route path = "/vendroslogin" render={() => (
                     this.vendorLoggedIn() == false ? ( <VendorsLogin />  ) : (<Redirect to = "/vendor/" />)
                 )}/>
                 
             <Route path = "/vendorsignup" render={() => (
                     this.vendorLoggedIn() == false ? ( <VendorSignup />  ) : (<Redirect to = "/vendor/" />)
                 )}/>
               
               <Route path = "/category/:category" component = {props => <Category {...props} />}
               />
               <Route path = "/search/:searchquery" component = {props => <SearchVenues {...props} />}
               />


               {/* Vendor Routes for type business */}
               
                 <Route path = "/vendor/" render={({ location, history }) => (
                        this.vendorLoggedIn() == false ? ( <Redirect to = "/vendroslogin" /> ) :  <React.Fragment>
                        <SideNavigation location = {location} history = {history}/>
                        {
                              
                            (sessionStorage.getItem('vendor_type') == "Professional") ?
                            
                          <main id = "wrapper" className = "wrapper">
                              
                          <Route path="/vendor/" exact component={props => <ProfessionalDashboard />} />
                          <Route path="/vendor/home" component={props => <BusinessList />} />
                          <Route path="/vendor/addBusiness" component={props => <BusinessRegister />} />
                          <Route path="/vendor/showbusiness/:businessid"component={props => <ShowBusiness {...props}/>}  />
                          <Route path="/vendor/updateVendor" component={props => <UpdateVendor {...props}/>} />
                          <Route path="/vendor/showBookings" component={props => <ShowBusinessBooking {...props}/>} />

                      </main>

                      :
                      

                    //Vendor routes type venues
                      <main id = "wrapper" className = "wrapper">
                            
                      <Route path="/vendor/" exact component={props => <VendorDashboard />} />
                      <Route path="/vendor/home" component={props => <VenuesList />} />
                      <Route path="/vendor/addvenues" component={props => <RegisterVenue />} />
                      <Route path="/vendor/showvenue/:venueid"component={props => <ShowVenue {...props}/>}  />
                      <Route path="/vendor/updateVendor" component={props => <UpdateVendor {...props}/>} />
                      <Route path="/vendor/showBookings" component={props => <ShowBookings {...props}/>} />

                  </main>
                        }
             </React.Fragment>
               
   )}
   />
              
             </Switch>
             </BrowserRouter>
          
            )
        }
 }
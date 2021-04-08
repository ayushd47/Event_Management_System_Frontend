import React from "react"
import Nav from "../layouts/Headers/Nav"
import axios from "axios";
import LatLngMap from './Vendor/LatLngMap';
import Album from "../layouts/Album";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Bookings from "./Bookings";
import Review from "../review/Review";
 


export default class Venues extends React.Component{

    
       constructor(props){
        super(props);
        this.state = {
            venuedata : [],
            capacity : {
                indoor : "",
                outdoor : "",
            },
            pricing : {
                veg : "",
                nonveg : "",
            },
            location : {
                name : "",
                lat : 27.724231,
                lng :  85.315264,
            },
            dates : [] ,
            
            renderMap :  false,           
      
            venueRating : "",
            token : null,
            
            album : [],
         
            loadingBarProgress: 0
            
        }
    }
 
   
    
    //Executes When component are mounted 
        componentDidMount(){
            //taking the value send in the url
            if(this.props.match.params){
            var  venueid = this.props.match.params.venueid;

           var data = {
                venueid : venueid
            }

            //getting the token from the sessionstorage
            var token = sessionStorage.getItem("user_token");
            var useremail = sessionStorage.getItem("user_email");
            
            this.setState(
                {
                    token : token,
            
                }
            )
            var config  = {
                headers: {
                    'Authorization': token,
                  }
            }


            //Getting the avg ratings of the venue
            axios.post("http://localhost:3200/api/getRatingAvg", data).then((res) => {
         
                 this.setState({     
                    venueRating : res.data.averageRating
                 })
            console.log(res.data.averageRating)
            
         })

         //Getting the venuedata by id            
            axios.post("http://localhost:3200/api/getVenueById", data).then((venue) => {
              this.setState({
                  venuedata : venue.data.venue[0],
                  capacity : venue.data.venue[0].venueCapacity,
                  pricing : venue.data.venue[0].venuePricing,
                  location : venue.data.venue[0].location,
              
                  album : venue.data.venue[0].album,
                  loadingBarProgress :100
              })
            
            
            });
         }
           
        }
     
        
        


    render(){
       

        return(
            <main>
                <Nav load = {this.state.loadingBarProgress}/>
                
    <div className = "venue-banner">
        <img src =  {"http://localhost:3200/public/images/" + this.state.venuedata.image } className = "venue-banner-img" />
        
    </div>
   
    <div className = "venue-view-details">
        <div className = "container-fluid">
<div className = "row">
    <div className = "col-md-9">
            <h1 className = "text-left">{this.state.venuedata.venueName}</h1>
            <h6 className = "text-left venue-location"><span className = "fas fa-map-marker-alt"></span>&nbsp;{this.state.location.name}</h6> 
            <span className = {this.state.venueRating >= 1? "fa fa-star star-orange" : "fa fa-star"}></span>
            <span className = { this.state.venueRating >= 2? "fa fa-star star-orange" : "fa fa-star"}></span>   
            <span className = { this.state.venueRating >= 3? "fa fa-star star-orange" : "fa fa-star"}></span>   
            <span className = { this.state.venueRating >= 4? "fa fa-star star-orange" : "fa fa-star"}></span>   
            <span className = { this.state.venueRating == 5? "fa fa-star star-orange" : "fa fa-star"}></span>       
    </div>
    <div className = "col-md-3 border-left">
       
        <button className = "btn btn-danger  custom-btn mt-2">Contact Venue</button>
        <Bookings id = {this.props.match.params.venueid} type = "venue" />
    </div>
    
</div>
        </div>
           
        </div>

        <div className = "container-fluid">
            <div className = "row">
                <div className = "col-12 col-sm-12 col-md-8 col-lg-8 mt-5">
                        <div className = "venue-view-body">

                                <div className = "venue-view-about">
                                 <h4 className = "bold-title text-left">About this venue</h4>
                                    <p className = "text-justify">
                                    {this.state.venuedata.venueDesc}
                                    </p>
                                </div>
                                <div className = "venue-view-overview mt-5">
                                    <h4 className = "bold-title text-left">Overview</h4>
                                    <div className = "container py-4 ">
                                        <div className = "row overview-box">
                                            <div className = "col-3 col-sm-3 col-md-4">
                                                <div className = "row">
                                                    <div className = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                                                            
                                                                  <h4 className = "text-center"><i className="icon-altar overview-icon"></i></h4>  
                                                          
                                                    </div>
                                                    <div className = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                                        <h6 className = "text-center">Venue type</h6>
                                                        <h6 className = "text-center light-bold font-small">{this.state.venuedata.venueType}</h6>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className = "col-3 col-sm-3 col-md-4">
                                                    <div className = "row">
                                                        <div className = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                                                                
                                                                      <h4 className = "text-center">
                                                                          <i className="icon-wedding-dinner overview-icon"></i></h4>  
                                                              
                                                        </div>
                                                        <div className = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                                            <h6 className = "text-center">Catering Prices</h6>
                                                            <h6 className = "text-center light-bold font-small">Veg: {this.state.pricing.veg}</h6>
                                                            <h6 className = "text-center light-bold font-small">Non-Veg: {this.state.pricing.nonVeg}</h6>
    
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className = "col-3 col-sm-3 col-md-4">
                                                        <div className = "row">
                                                            <div className = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                                                                    
                                                                          <h4 className = "text-center">
                                                                              <i className="icon-001-newlyweds overview-icon"></i></h4>  
                                                                  
                                                            </div>
                                                            <div className = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                                                <h6 className = "text-center">Capacity</h6>
                                                                <h6 className = "text-center light-bold font-small">Indoor: {this.state.capacity.indoor}</h6>
                                                                <h6 className = "text-center light-bold font-small">Outdoor: {this.state.capacity.outdoor}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
                <div className = "col-12 col-sm-12 col-md-4 col-lg-4 mt-5">
                        <div className = "venue-view-body">

                                <div className = "venue-gallery-section">
                             
                                        <div className = "container-fluid">
                                                <h6 className = "bold-title text-left">Photos</h6>
                                            <div className = "row py-2">
                                            {this.state.ablum != "No Photos" ? 
                                            <Album album = {this.state.album} type = "venues" id = {this.props.match.params.venueid}/>
                                            
                                            :
                                             ""}</div>
                                        </div>
                                </div>

                                
                
                            </div>   
                </div>
                <Review venueid = {this.props.match.params.venueid}/>
                <div className = "col-12 col-sm-12 col-md-4 col-lg-4 mt-5">
                   
              {/* Map Component*/}
        
                   <LatLngMap  
                   google = {this.props.google}
                   center = {
                       {
                           lat : this.state.location.lat, 
                           lng : this.state.location.lng
                       }
                   }
                   height = '300px'
                   zoom = {15}
                   />
        {/* Map */}
                     </div>
            </div>
           
        </div>

        

            </main>
        )
    }
}
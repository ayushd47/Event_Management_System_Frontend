import React from "react"
import Nav from "../layouts/Headers/Nav"
import axios from "axios";
import LatLngMap from './Vendor/LatLngMap';
import Album from "../layouts/Album";
import Bookings from "./Bookings";


export default class Business extends React.Component{

    
       constructor(props){
        super(props);
        this.state = {
            businessdata : [],
            location : {
                name : "",
                lat : 27.724231,
                lng :  85.315264,
            },
            dates : [] ,
            renderMap :  false,           
            businessRating : "4",
            token : null,
            useremail : null,
            icon: "",
            album : [],
            loadingBarProgress: 0
        }
        
    }
 
        componentDidMount(){
            if(this.props.match.params){
            var  businessid = this.props.match.params.businessid;
                
           var data = {
                businessid : businessid
            }

            var token = sessionStorage.getItem("user_token");
            var useremail = sessionStorage.getItem("user_email");
            
            this.setState(
                {
                    token : token,
                    useremail : useremail
                }
            )
            var config  = {
                headers: {
                    'Authorization': token,
                  }
            }

           
            axios.post("http://localhost:3200/api/getBusinessById", data).then((business) => {

            
              this.setState({
                  businessdata : business.data.business, 
                    location : business.data.business.businesslocation, 
                    album : business.data.business.album,
                    loadingBarProgress: 100
              })
              console.log(this.state.album)

              if(business.data.business.businesstype == "Photography"){
                    this.setState({
                        icon : "icon-025-wedding-video"
                    })
              }else if(business.data.business.businesstype == "Bakery"){
                this.setState({
                    icon : "icon-003-wedding-cake"
                })
               }else{
                this.setState({
                    icon : "icon-makeup"
                })
                }
              
            });
         }
           
        }
        
 

        


    render(){

        return(
            <main>
                <Nav load = {this.state.loadingBarProgress} />
                
    <div className = "business-banner">
        <img src =  {"http://localhost:3200/public/images/" + this.state.businessdata.businessImage } className = "business-banner-img" />
        
    </div>
   
    <div className = "business-view-details">
        <div className = "container-fluid">
<div className = "row">
    <div className = "col-md-9">
            <h1 className = "text-left">{this.state.businessdata.businessname}</h1>
            <h6 className = "text-left location-text"><span className = "fas fa-map-marker-alt"></span>&nbsp;{this.state.location.name}</h6> 
            <span className = {this.state.businessRating >= 1? "fa fa-star star-orange" : "fa fa-star"}></span>
            <span className = { this.state.businessRating >= 2? "fa fa-star star-orange" : "fa fa-star"}></span>   
            <span className = { this.state.businessRating >= 3? "fa fa-star star-orange" : "fa fa-star"}></span>   
            <span className = { this.state.businessRating >= 4? "fa fa-star star-orange" : "fa fa-star"}></span>   
            <span className = { this.state.businessRating == 5? "fa fa-star star-orange" : "fa fa-star"}></span>       
    </div>
    <div className = "col-md-3 border-left">
       
        <button className = "btn btn-danger  custom-btn mt-2">Contact Us</button>
        <Bookings id = {this.props.match.params.businessid} type = "business" />
    </div>
    
</div>
        </div>
           
        </div>

        <div className = "container-fluid">
            <div className = "row">
                <div className = "col-12 col-sm-12 col-md-8 col-lg-8 mt-5">
                        <div className = "business-view-body">

                                <div className = "business-view-about">
                                 <h4 className = "bold-title text-left">About </h4>
                                    <p className = "text-justify">
                                    {this.state.businessdata.businessdec}
                                    </p>
                                </div>
                                <div className = "business-view-overview mt-5">
                                    <h4 className = "bold-title text-left">Overview</h4>
                                    <div className = "container py-4 ">
                                        <div className = "row overview-box">
                                            <div className = "col-3 col-sm-3 col-md-4">
                                                <div className = "row">
                                                    <div className = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                                                            
                                                                  <h4 className = "text-center">
                                                                      <i className= {this.state.icon + " overview-icon"}></i></h4>  
                                                          
                                                    </div>
                                                    <div className = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                                        <h6 className = "text-center">Business</h6>
                                                        <h6 className = "text-center light-bold font-small">{this.state.businessdata.businesstype}</h6>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className = "col-3 col-sm-3 col-md-4">
                                                    <div className = "row">
                                                        <div className = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                                                                
                                                                      <h4 className = "text-center">
                                                                          <i className="icon-money overview-icon"></i></h4>  
                                                              
                                                        </div>
                                                        <div className = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                                            <h6 className = "text-center">Usual Price</h6>
                                                            <h6 className = "text-center light-bold font-small">{this.state.businessdata.businesspricing}</h6>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className = "col-3 col-sm-3 col-md-4">
                                                       
                                                    </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
                <div className = "col-12 col-sm-12 col-md-4 col-lg-4 mt-5">
                        <div className = "business-view-body">

                                <div className = "business-gallery-section">
                             
                                        <div className = "container-fluid">
                                                <h6 className = "bold-title text-left">Photos [10]</h6>
                                            <div className = "row py-2">
                                                {this.state.album != "" ? 
                                            <Album album = {this.state.album} type = "business" id = {this.props.match.params.businessid}/>
                                            
                                            :
                                             "No Photos"}

                                            </div>
                                        </div>
                                </div>

                                
                
                            </div>   
                </div>
             
                <div className = "col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
                   
              
        
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
        
                     </div>
            </div>
           
        </div>
            </main>
        )
    }
}
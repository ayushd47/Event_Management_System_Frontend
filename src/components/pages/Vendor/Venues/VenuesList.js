import React from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";
import VendorNav from '../../../layouts/Headers/VendorNav';
export default class VenuesList extends React.Component{

    constructor(){
        super();

        this.state = {
            venuesarray : [],
            loadingProgress : 0,
        }
    }

    componentDidMount(){

        var token = sessionStorage.getItem("vendor_token");
       
        var config  = {
            headers: {
                'Authorization': token,
              }
        }

        axios.get("http://localhost:3200/api/getVenuesByVendor", config).then((venues) => {
            this.setState({
                venuesarray : venues.data.venues,
                loadingProgress : 100
            })
        });


    }

    render(){
        var venuesarray = this.state.venuesarray;
        if(venuesarray != null){
            var data = venuesarray.map(function(value, index){
                return(
            <div className = "col-md-4 mt-3" key = {index}>
                        <Link to = {"showvenue/" + value._id}>    <div className = "venues">
                           <div className = "overlay">
                           </div>
                             <img src = {"http://localhost:3200/public/images/" + value.image } className = "venues-img" />
                               <div className = "venue-details">
                                    <h4 className = "text-center">{value.venueName}</h4>
                               </div>
                       </div>
                       </Link>
               </div>
                )
          
    
            });
        }
        

        return(
            <div>
                <VendorNav  load = {this.state.loadingProgress} />
                <div className = "container-fluid mt-5">
                    <Link to = "addvenues" ><button className = "btn btn-success mt-5"><span className = "fa fa-plus"></span></button></Link>
                    <div className = "row">
                         {data}
                    
                    </div>
                    
                </div>
            </div>
        )
    }
}
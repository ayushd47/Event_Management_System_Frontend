import React from 'react'
import VendorNav from '../../../layouts/Headers/VendorNav'
import { Link } from 'react-router-dom'
import axios from 'axios';


export default class BusinessList extends React.Component{

    constructor(){
        super();

        this.state = {
            businessarray : [],
            loadingProgress : 0
        }
    }

    componentDidMount(){

        var token = sessionStorage.getItem("vendor_token");
        var config  = {
            headers: {
                'Authorization': token,
              }
        }
        axios.get("http://localhost:3200/api/getBusinessByVendor", config).then((business) => {
            this.setState({
                businessarray : business.data.business,
                loadingProgress : 100
            })
        });

    }

    render(){
        var businessarray = this.state.businessarray;
        if(businessarray != null){
            var data = businessarray.map(function(value, index){
                return(
            <div className = "col-md-4 mt-3" key = {index}>
                        <Link to = {"showbusiness/" + value._id}>    <div className = "venues">
                           <div className = "overlay">
                           </div>
                             <img src = {"http://localhost:3200/public/images/" + value.businessImage } className = "venues-img" />
                               <div className = "venue-details">
                                    <h4 className = "text-center">{value.businessname}</h4>
                               </div>
                       </div>
                       </Link>
               </div>
                )
          
    
            });
        }
        return(
            <div>
                <VendorNav load = {this.state.loadingProgress}/>
                 <div className = "container-fluid mt-5">
                    <Link to = "addBusiness" ><button className = "btn btn-success mt-5"><span className = "fa fa-plus"></span></button></Link>
                    <div className = "row">
                        
                    {data}
                    </div>
                </div>
            </div>
        )
    }
}
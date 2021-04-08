import React from 'react'
import VendorNav from '../../../layouts/Headers/VendorNav'
import Map from '../../Map';
import axios from 'axios';
import { Redirect } from 'react-router';

export default class BusinessRegister extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            location : {
                address: "Nagpokhari Marg 390, Kathmandu 44600, Nepal",
                lat : "27.717245",
                lng : "85.323961"
            },
            image : "",
            redirect : false,
            pricingLabel : "per Hour",
        }
      
    }

    handleLocationChange(location){
        this.setState({
            location : location
        })
    }

    handleImageChange(e){
        if (e.target.files && e.target.files[0]) {
            this.setState({
              image: URL.createObjectURL(e.target.files[0])
            });
          }else{
            this.setState({
                image: ""
              });
          }
    }
    setRedirect(){
        this.setState({
            redirect : true
        })
    }

    handleRedirect(){
        if(this.state.redirect){
            return <Redirect to='/vendor/home' />
        }
    }

    handleSubmit(e){
        e.preventDefault();

        var formData = new FormData();

        var name = this.refs.bname.value;
        var type = this.refs.btype.value;
        var price = this.refs.bprice.value + " " +this.state.pricingLabel;
        var desc  = this.refs.bdesc.value;
        var contact = this.refs.bcontact.value;
        var  address  = this.refs.address.value;
        var  lat = this.refs.lat.value;
        var  lng  = this.refs.lng.value;
        var image = this.refs.businessimage.files[0];


        formData.append("name", name);
        formData.append("type", type);
        formData.append("price", price);
        formData.append("desc", desc);
        formData.append("contact", contact);
        formData.append("address", address);
        formData.append("lat", lat);
        formData.append("lng", lng);
        formData.append("image", image);

        var token = sessionStorage.getItem("vendor_token");
       
        var config  = {
            headers: {
                'Accept' : 'multipart/form-data',
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization': token,
              }
        }

        axios.post("http://localhost:3200/api/addBusiness", formData, config).then((res) => {
                 console.log(res);
                 this.setRedirect();
            });

    }

    handleChange=(e)=>{
       var type = e.target.value;

       if(type == "Photography"){
        this.setState({
            pricingLabel : "per Hour"
        })
       }else if(type == "Bakery"){
        this.setState({
            pricingLabel : "per Pound"
        })
       }else if(type == "Beauty Parlor"){
        this.setState({
            pricingLabel : "per Session"
        })
        }else{
        this.setState({
            pricingLabel : ""
        })
       }
    }

    render(){
        return(
            <div>
            {this.handleRedirect()}
         <VendorNav />
            <div className = "container mt-8">
           
          <div class  = "background-form mb-8">
          <h2 className = "bold-title">Add New Business</h2><hr></hr>
          <form onSubmit = {this.handleSubmit.bind(this)}>
            <div className = "container-fluid">
                
                <div className = "form-group">
                <input type = "text" placeholder = "Business Name" ref = "bname" className = "form-control"></input>
                </div>
                <div className = "form-group">
              
                    <select className = "form-control" ref = "btype" onChange = {this.handleChange}>
                        <option>Photography</option>
                        <option>Bakery</option>
                        <option>Beauty Parlor</option>
                    </select>
                </div>
                <div className = "form-group">
                <textarea type = "text" placeholder = "Business Description" ref = "bdesc" className = "form-control"></textarea>

                </div>
                <div className = "form-group">
                <input type = "number" placeholder = "Business Contact" ref = "bcontact" className = "form-control"></input>

                </div>
                <div className = "form-group">
                <input type = "hidden" value = {this.state.location.address} ref = "address" className = "form-control"></input>
                </div>
                <div className = "form-group">
                <input type = "hidden" value = {this.state.location.lat} ref = "lat" className = "form-control"></input>
                </div>
                <div className = "form-group">
                <input type = "hidden" value = {this.state.location.lng} ref = "lng" className = "form-control"></input>
                </div>
             
                <div className = "form-group row">
                <div className = "col-md-9">
                <input type = "number" placeholder = "Price" ref = "bprice" className = "form-control"></input>

                </div>
                <div className = "col-md-3">
                <input type = "text" value = {this.state.pricingLabel} readOnly ref = "pricelabel" className = "form-control"></input>


                </div>
                </div>
          
            </div>
            <div className = "container-fluid mb-8 ">
            
        <Map onLocationChange = {this.handleLocationChange.bind(this)} 
        google = {this.props.google}
        center = {{lat : 27.717245, lng : 85.323961}}
        height = '300px'
        zoom = {15}
        />
                        </div>

                    
                        <div className = "container-fluid">
        <input type = "file" ref = "businessimage" onChange = {this.handleImageChange.bind(this)} className = "form-control"/>
        <div className = "preview-div">
    <div className = "img-container">
    <img src = {this.state.image} className = {(this.state.image == "" ? "venue-img-preview d-none" : "venue-img-preview mt-3" )}/>
    
             </div>      
                      </div>
        
                <button className = "custom-btn btn-primary mt-3">Submit</button>
                </div>
                </form>
          </div>
        </div>
        </div>
        )
    }
}
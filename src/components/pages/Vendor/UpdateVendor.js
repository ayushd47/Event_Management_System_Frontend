import React from 'react';
import Nav from '../../layouts/Headers/Nav';
import Footer from '../../layouts/Footer';
import Axios from 'axios';
import VendorNav from '../../layouts/Headers/VendorNav';

export default class UpdateVendor extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            vendor : [],
            message : "",
            fullname : "",
            email : "",
            phone : "",
        }
    }
    componentDidMount(){
        const vendor_email = sessionStorage.getItem("vendor_email");
        const token = sessionStorage.getItem('vendor_token');

        const  data = {
            email : vendor_email,
        }
        fetch("http://localhost:3200/api/getVendor", {
            method : "post",
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : token
            },
            
        }).then(function(data) {
            return data.json();
        }).then(json => {
            var dataarray = [json];
           this.setState({
               vendor : dataarray[0].vendor,
               fullname : dataarray[0].vendor.fullname,
               phone  : dataarray[0].vendor.contact,
               email : dataarray[0].vendor.email,
               
           })
          
    })
    }

    handleSubmit(e){
        e.preventDefault();
        var token = sessionStorage.getItem("vendor_token")

        var fullname = this.refs.fname.value;
        var location = this.refs.location.value;
        var phonenumber = this.refs.phone.value;
        var email = this.refs.email.value;

        var  data = {
            fullname : fullname,
            location : location,
            phonenumber : phonenumber,
            email : email

        }
        var config = {
           
            headers : {
                'Authorization' : token
            }
        }

        Axios.put("http://localhost:3200/api/updateVendor",data,  config).then((res) => {
            if(res.data.success){
                this.setState({
                    message :  res.data.message,
                    vendor : res.data.vendor
                })

                sessionStorage.setItem("vendor_name", res.data.vendor.fullname);
                sessionStorage.setItem("vendor_email", res.data.vendor.email );
                window.location.reload();
            }
        
        })


    }

    handleChangeFname(e){
        this.setState({
            fullname : e.target.value
        })
    }
  
    handleChangeEmail(e){
        this.setState({
            email : e.target.value
        })
    }
    handleChangePhone(e){
        this.setState({
            phone : e.target.value
        })
    }

    handleDelete(){
        var token = sessionStorage.getItem("vendor_token")
        var config = {
           
            headers : {
                'Authorization' : token
            }
        }

        Axios.delete("http://localhost:3200/api/deleteVendor", config).then((res) => {
            if(res.data.success){
                sessionStorage.clear("vendor_token");
                sessionStorage.clear("vendor_name");
                sessionStorage.clear("vendor_email");
               

                window.location.reload();
            }
        })

    }

    render(){
        return(
            <div>
                <VendorNav />
                <div className = "container mt-5 pt-5">
                    <div className = {this.state.message == "" ? "alert alert-success d-none" : "alert alert-success"}>{this.state.message}</div>
                    <div className = "content-div">
                        <h5 className = "bold-title">Update Profile</h5><hr></hr>
                        <form onSubmit = {this.handleSubmit.bind(this)}>
                            <div className = "form-group row">
                                <div className = "col-12 col-sm-12 col-md-12 col-lg-12">
                                    <input className = "form-control" type = "text" ref = "fname" value = {this.state.fullname} placeholder = "FullName" onChange = {this.handleChangeFname.bind(this)} required/>
                                </div>
                                
                            </div>
                            <div className = "form-group">
                            <input className = "form-control" type = "email" ref = "email" value = {this.state.email} placeholder = "Email" onChange = {this.handleChangeEmail.bind(this)} required/>
                                
                            </div>

                            <div className = "form-group">
                                <select className = "form-control" ref = "location">
                                        <option>{this.state.vendor.location}</option>
                                    <option>Kathmandu</option>

                                </select>
                            </div>
                            <div className = "form-group">
                            <input className = "form-control" type = "number" ref = "phone" placeholder = "Phone Number" onChange = {this.handleChangePhone.bind(this)} value = {this.state.phone} required/>
                                
                            </div>

                            <div className = "form-group">
                                <button className = "btn btn-primary w-100">Update</button>
                            </div>
                        </form>
                        <button className = "btn btn-danger w-100" onClick = {() => this.handleDelete()}>Delete</button>
                    </div>
                </div>

            </div>
        )
    }
}
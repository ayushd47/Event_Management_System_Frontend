import React from 'react';
import Nav from '../../layouts/Headers/Nav';
import Footer from '../../layouts/Footer';
import Axios from 'axios';

export default class UpdateProfile extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            userdata : [],
            message : "",
            firstname : "",
            lastname : "",
            email : "",
            phone : "",
        }
    }
    componentDidMount(){
        const user_email = sessionStorage.getItem("user_email");
        const token = sessionStorage.getItem('user_token');

        const  data = {
            email : user_email,
        }
        fetch("http://localhost:3200/api/profile", {
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
               userdata : dataarray[0].userdata,
               firstname : dataarray[0].userdata.firstname,
               lastname : dataarray[0].userdata.lastname,
               email : dataarray[0].userdata.email,
               phone : dataarray[0].userdata.phonenumber 
           })
          
    })
    }

    handleSubmit(e){
        e.preventDefault();
        var token = sessionStorage.getItem("user_token")
        var firstname = this.refs.fname.value;
        var lastname = this.refs.lname.value;
        var location = this.refs.location.value;
        var phonenumber = this.refs.phone.value;
        var email = this.refs.email.value;
        var  data = {
            firstname : firstname,
            lastname : lastname,
            location : location,
            phonenumber : phonenumber,
            email : email

        }
        var config = {
           
            headers : {
                'Authorization' : token
            }
        }

        Axios.put("http://localhost:3200/api/updateUser",data,  config).then((res) => {
            if(res.data.success){
                this.setState({
                    message :  res.data.message,
                    userdata : res.data.userdata
                })

                sessionStorage.setItem("user_name", res.data.userdata.firstname + " " + res.data.userdata.lastname );
                sessionStorage.setItem("user_email", res.data.userdata.email );
                window.location.reload();
            }
        
        })


    }

    handleChangeFname(e){
        this.setState({
            firstname : e.target.value
        })
    }
    handleChangeLname(e){
        this.setState({
            lastname : e.target.value
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
        var token = sessionStorage.getItem("user_token")
        var config = {
           
            headers : {
                'Authorization' : token
            }
        }

        Axios.delete("http://localhost:3200/api/deleteUser", config).then((res) => {
            if(res.data.success){
                sessionStorage.clear("user_token");
                sessionStorage.clear("user_name");
                sessionStorage.clear("user_email");
               

                window.location.reload();
            }
        })

    }

    render(){
        return(
            <div>
                <Nav />
                <div className = "container my-5">
                    <div className = {this.state.message == "" ? "alert alert-success d-none" : "alert alert-success"}>{this.state.message}</div>
                    <div className = "content-div">
                        <h5 className = "bold-title">Update Profile</h5><hr></hr>
                        <form onSubmit = {this.handleSubmit.bind(this)}>
                            <div className = "form-group row">
                                <div className = "col-12 col-sm-12 col-md-6 col-lg-6">
                                    <input className = "form-control" type = "text" ref = "fname" value = {this.state.firstname} placeholder = "First Name" onChange = {this.handleChangeFname.bind(this)} required/>
                                </div>
                                <div className = "col-12 col-sm-12 col-md-6 col-lg-6">
                                    <input className = "form-control" type = "text" ref = "lname" value = {this.state.lastname} placeholder = "Last Name" onChange = {this.handleChangeLname.bind(this)} required/>
                                </div>
                            </div>
                            <div className = "form-group">
                            <input className = "form-control" type = "email" ref = "email" value = {this.state.email} placeholder = "Email" onChange = {this.handleChangeEmail.bind(this)} required/>
                                
                            </div>

                            <div className = "form-group">
                                <select className = "form-control" ref = "location">
                                        <option>{this.state.userdata.location}</option>
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
<Footer />
            </div>
        )
    }
}
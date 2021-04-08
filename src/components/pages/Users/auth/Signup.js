import React from 'react';
import Nav from '../../../layouts/Headers/Nav';
import Footer from '../../../layouts/Footer';
 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
export default class Signup extends React.Component{


    constructor(props){
        super(props);
    
    
        this.state = {
            responseData  : [],
            checkEmailResponse : [],
            redirect : false,
            showemailerr : false,
            showpasserr : false,
            showpasssuccess : false,
            emailavailable : false,
            validation : false,
        }
    
    }
    setRedirect(){
        this.setState({
            redirect : true
        })
    }

    handleRedirect(){
        if(this.state.redirect){
            return <Redirect to='/profile' />
        }
    }

    handleSignup(e){
        e.preventDefault();

        let fname = this.refs.fname.value;
        let lname = this.refs.lname.value;
        let location = this.refs.location.value;
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        let cpassword = this.refs.cpassword.value;
        let phone = this.refs.phone.value;

 

        if(this.state.emailavailable == true && this.state.showpasssuccess == true){
            let data = {
                fname : fname,
                lname : lname,
                location : location,
                phone : phone,
                email : email,
                password : password, 
            }
    
            
            fetch("http://localhost:3200/api/auth/register", {
                method : "post",
                body : JSON.stringify(data),
                headers : {
                    "Content-Type" : "application/json"
                },
            }).then(function(data) {
                return data.json();
               
    
    
            }).then(json => {
                
                var dataarray = [json];
               
                sessionStorage.setItem("user_token", dataarray[0].token);
                sessionStorage.setItem("user_name", dataarray[0].name );
                sessionStorage.setItem("user_email", dataarray[0].email );
                this.setRedirect();
               
            })
        }else{

        }
       

}

 

        emailHandler(e){
                let email = e.target.value;
                if(email != ""){
                    let data = {
                        email : email,
                    }

                    fetch("http://localhost:3200/api/auth/checkemail", {
                        method : "post",
                        body : JSON.stringify(data),
                        headers : {
                            "Content-Type" : "application/json"
                        },
                    }).then(function(data) {
                        return data.json();
                    }).then(json => {
                        let dataarray = [json];
                        this.setState({
                            checkEmailResponse : dataarray,
                            setemailerr : true,
                        
                        })

                        if(dataarray[0].success == true){
                            this.setState({
                               emailavailable : true,
                            })
                        }else{
                            this.setState({
                                emailavailable : false,
                             })
                        }
                    });
                }else{
                    this.setState({
                        setemailerr : false,
                    });
                }

               
              
            }

            passwordChangeHandler(){
                    let password = this.refs.password.value;
                    let cpassword = this.refs.cpassword.value;
                    if(password == "" || cpassword == ""){
                        this.setState({
                            showpasserr : false,
                            showpasssuccess : false,
                        })
                    }else{
                        if(password != cpassword){
                            this.setState({
                                showpasserr : true,
                                showpasssuccess : false,
                            })
                        }else{
                            this.setState({
                                showpasserr : false,
                                showpasssuccess : true
                            })
                        }
                    }
              
            }

    render(){
        var checkemail = this.state.checkEmailResponse;
        
        checkemail = checkemail.map(function(value, index){
            if(value.success == false){
                return(

                    <span key = {index} className = {this.state.setemailerr == true ? "errormsg" : "errormsg d-none"} id = "log-errmsg" >
                        
                         <h6 id = "errormsg" > <span className = "fas fa-times-circle"></span>&nbsp;{value.message}</h6>
                          </span>
                   
          
                )
            }else{
                return(
                    <span key = {index} className = {this.state.setemailerr == true ? "errormsg err-success" : "errormsg d-none"}  id = "log-errmsg" >
                        
                         <h6 id = "errormsg" >  <span className = "fas fa-check-circle"></span>&nbsp;{value.message}</h6>
                        
                          </span>
                   
          
                )
            }
        }, this);

        var getData = this.state.responseData;
        
        getData = getData.map(function(value, index){
            if(value.success == false){
                return(
                    <span key = {index} className = "errormsg" id = "log-errmsg" >
                        
                        <h6 id = "errormsg" >{value.message}</h6>
                          </span>
                   
          
                )
            }else{
                return(
                    <span key = {index} className = "errormsg err-success"  id = "log-errmsg" >
                        
                      <h6 id = "errormsg" > {value.message}</h6>
                          </span>
                   
          
                )
            }
         
        })
        return(
            <div>
                {this.handleRedirect()}
                <Nav />
                <div className = "container-fluid mb-5">
                    <div className = "content-wrapper">
                        <div className = "content-box">
                        <div className  = "row">
                       
                   
                           <div className = "col-md-6  col-12 col-sm-12">
                               <div className = "login-form">
                                   <label className = "form-title bold-title">
                                       <h4>Register</h4>
                                   </label>

                                   {getData}
                                   <form className = "" onSubmit = {this.handleSignup.bind(this)}>
                                   <div className = "form-group pos-relative">
                                       <label htmlFor="your_name" className = "form-label"><i class="fa fa-user"></i></label>
                                       <input className = "custom-loginform-control" type = "text" id = "fname"  ref = "fname" placeholder = "First Name" required/>
                                   
                                       </div>
                                        <div className = "form-group pos-relative">
                                       <label htmlFor="your_name" className = "form-label"><i class="fa fa-user"></i></label>
                                       <input className = "custom-loginform-control" type = "text" id = "lname"  ref = "lname" placeholder = "Last Name" required/>
                                   
                                       </div>
                                       <div className = "form-group pos-relative">
                                       <label htmlFor="your_name" className = "form-label"><i class="fas fa fa-angle-down"></i></label>
                                       <select className = "custom-loginform-control custom-form-select" name = "location" ref = "location">
                                        <option>Kathmandu</option>
                                         </select>
                                       </div>
                                       <div className = "form-group pos-relative">
                                       <label htmlFor="your_name" className = "form-label"><i class="fa fa-phone"></i></label>
                                       <input className = "custom-loginform-control" type = "number" id = "phone"  ref = "phone" placeholder = "Enter PhoneNumber" required/>
                                   
                                       </div>
                                       <div className = "form-group pos-relative">
                                       <label htmlFor="your_name" className = "form-label"><i class="fa fa-envelope"></i></label>
                                       <input className = "custom-loginform-control" type = "email" id = "email" onChange = {this.emailHandler.bind(this)} ref = "email" placeholder = "Enter Email" required/>
                                   
                                       </div>
                                       {checkemail}
                                  
                                       <div className = "form-group pos-relative">
                                       <label htmlFor="your_name" className = "form-label"><i class="fa fa-lock"></i></label>
                                       <input className = "custom-loginform-control" type = "password" ref  = "password" onChange = {this.passwordChangeHandler.bind(this)} id = "password" placeholder = "Enter Password" required/>

                                       </div>
                                       <div className = "form-group pos-relative">
                                       <label htmlFor="your_name" className = "form-label"><i class="fa fa-lock"></i></label>
                                       <input className = "custom-loginform-control" type = "password" onChange = {this.passwordChangeHandler.bind(this)}  ref  = "cpassword" id = "cpassword" placeholder = "Re-Enter Password" required/>
                                       </div>
                                       <span className = {this.state.showpasserr == false ? "errormsg d-none" : "errormsg"}>   <h6 id = "errormsg" >Password Doesn't Match</h6></span>
                                       <span className = {this.state.showpasssuccess == false ? "errormsg err-success d-none" : "errormsg err-success"}>   <h6 id = "errormsg" >Password Match</h6></span>

                                       <div className= "form-group">
                                           <input type = "checkbox"></input> <span>I agree to the Tearns and Conditions </span>
                                       </div>

                                       <div className = "form-group">
                                           <button className = "btn btn-primary-faded">Sign Up</button>
                                       </div>
                                       <div className = "form-group mt-5">
                                           <Link to = "/login" >Already Have an Account?</Link>
                                       </div>
                                   </form>
                               </div>
                           </div>
                           <div className = "col-md-6 col-12 col-sm-12 d-md-block d-none">
                       <img src = {require('../../../../assets/images/signup-image.jpg')} className = "login-img mt-4"/>
                           </div>
               </div>
                        </div>
           
                    </div>
                    
                </div>
                <Footer />
                </div>
                )
    }

}

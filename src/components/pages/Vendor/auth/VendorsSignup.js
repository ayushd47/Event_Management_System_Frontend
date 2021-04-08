import React from "react";
import Nav from "../../../layouts/Headers/Nav";
import Footer from '../../../layouts/Footer';
import {Link, Redirect} from 'react-router-dom';


export default class VendorsSignup extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            responseData  : [],
            checkEmailResponse: [],
            setemailerr : false,
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
            return <Redirect to='/vendor' />
        }
    }
    handleSubmit(e){
        e.preventDefault();
        let fullname = this.refs.fullname.value;
        let contact = this.refs.contact.value;
        let location = this.refs.location.value;
        let type = this.refs.business_type.value;
        let email = this.refs.email.value;
        let password = this.refs.password.value;

    
        
        if(this.state.emailavailable == true && this.state.showpasssuccess == true){
            let data = {
                fullname :fullname,
                contact : contact,
                location : location,
                type : type,
                email : email,
                password : password,
            }
    
    
            fetch("http://localhost:3200/api/auth/registervendor", {
                method : "post",
                body : JSON.stringify(data),
                headers : {
                    "Content-Type" : "application/json"
                },
            }).then(function(data){
                return data.json();
            }).then(json => {
                    let dataarray = [json];
                    console.log(dataarray);
    
                    sessionStorage.setItem("vendor_token", dataarray[0].token);
                    sessionStorage.setItem("vendor_name", dataarray[0].name );
                    sessionStorage.setItem("vendor_email", dataarray[0].email );
                    sessionStorage.setItem("vendor_type", dataarray[0].type );
                    this.setRedirect();
    
            });
        }else{
          
        }
      

    }

     
    
            emailHandler(e){
                    let email = e.target.value;
                    if(email != ""){
                        let data = {
                            email : email,
                        }
    
                        fetch("http://localhost:3200/api/auth/checkvendoremail", {
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

                    <span key = {index} className = {this.state.setemailerr == true ? "errormsg error-icon" : "errormsg d-none error-icon"} id = "log-errmsg" >
                        <h6 id = "errormsg" > <i className = "fas fa-times-circle p-2"></i></h6>
                          </span>      
                )
            }else{
                return(
                    <span key = {index} className = {this.state.setemailerr == true ? "errormsg err-success error-icon" : "errormsg d-none error-icon"}  id = "log-errmsg" >
                         <h6 id = "errormsg" >  <span className = "fas fa-check-circle p-2"></span></h6>
                          </span>
                )
            }
        }, this);
        return(
            
            <div >
                 {this.handleRedirect()}
            <Nav />
             <div className = "container  mb-4">
                 
                          <div className = "content-box vendorsignup-box">
                        <div className = "row">
                            <div className = "col-md-6">

                            </div>
                            <div className = "col-md-6">
                                   
                          <div className = "vendorsignup p-4">
                                <div className = "vendorlogo" >
                                <img src = {require("../../../../assets/images/weblogo.png")} />
                                </div>
                                
                                 <form className = "mt-3 container" onSubmit = {this.handleSubmit.bind(this)}> 
                                 <div  className = "row form-group pos-relative">
                                 <label   className = "form-label"><i class="fa fa-lock"></i></label>
                                     <input className = "col-12 form-control" type = "text" ref  = "fullname" placeholder = "Enter Fullname" required />
                                     </div>
                                     <div  className = "row form-group">
                                    
                                    <input className = "col-12 form-control" type = "number" ref  = "contact" placeholder = "Enter Phone" required/>
                                    </div>
                                     <div className = "row form-group">
                                        <select className = "col-12 form-control"  ref = "location">
                                            <option>Kathmandu</option>
                                        </select>
                                     </div>
                                     <div className = "row form-group">
                                        <select className = "col-12 form-control" ref = "business_type">
                                            <option>Venues</option>
                                            <option>Professional</option>
                                        </select>
                                     </div>
                            
                                     <div  className = "row form-group pos-relative">
                                     {checkemail}
                                    <input className = "col-12 form-control" type = "email" ref  = "email" placeholder = "Enter Email" onChange = {this.emailHandler.bind(this)} required/>
                                    </div>
                                  
                                     <div  className = "row form-group pos-relative">
                                     <span className = {this.state.showpasserr == false ? "errormsg d-none error-icon" : "errormsg error-icon"}>   <h6 id = "errormsg" ><span className = "fas fa-times-circle p-2"></span></h6></span>
                                       <span className = {this.state.showpasssuccess == false ? "errormsg err-success d-none error-icon" : "errormsg err-success error-icon"}>  <h6 id = "errormsg" ><span className = "fas fa-check-circle p-2"></span></h6></span>

                                    <div className = "col-6 pl-0">
                                    <input className = " form-control  " type = "password" ref  = "password"  onChange = {this.passwordChangeHandler.bind(this)}  placeholder = "Enter Password" required />

                                    </div>
                                    <div className = "col-6 pr-0">
                                    
                                    <input className = " form-control  " type = "password" ref  = "cpassword" onChange = {this.passwordChangeHandler.bind(this)}  placeholder = "Re-Enter Password" required />

                                    </div> </div>
                                    <div className= "form-group mt-2">
                                           <input type = "checkbox"></input> <span>I agree with the Terms and Conditions. </span>
                                       </div>
                                    <div  className = "row form-group">
                                    
                                  <button className = "btn btn-primary w-100">Signup</button>

                                  <Link to  = "vendorsignup" className = "mt-3">Already have an account?</Link>
                                    </div>
                                 </form>
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
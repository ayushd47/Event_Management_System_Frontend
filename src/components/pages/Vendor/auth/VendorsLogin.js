import React from "react";
import Nav from "../../../layouts/Headers/Nav";
import Footer from '../../../layouts/Footer';
import {Link, Redirect} from "react-router-dom";

export default class VendorsLogin extends React.Component{
    constructor(props){
        super(props);
    
    
        this.state = {
            responseData  : [],
            redirect : false,
        }
    
    }
    handleLogin(e){
        e.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;

        let data = {
            email : email,
            password : password,
        }
      
        fetch("http://localhost:3200/api/auth/loginvendor", {
            method : "post",
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            },
        }).then(function(data) {
            return data.json();
           
       }).then(json => {
            var dataarray = [json];
           this.setState({
            responseData : dataarray
           })
          
           if(dataarray[0].success){
            sessionStorage.setItem("vendor_token", dataarray[0].token);
            sessionStorage.setItem("vendor_name", dataarray[0].name );
            sessionStorage.setItem("vendor_email", dataarray[0].email );
            sessionStorage.setItem("vendor_type", dataarray[0].type );
            this.setRedirect();
           }
         
    
        })
        

    

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

    render(){
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
                        
                         <h6 id = "errormsg" >{value.message}</h6>
                          </span>
                   
          
                )
            }
         
        })
        return(

           <section >
                      {this.handleRedirect()}
               <Nav />
                <div className = "container vendorlogin">
                    <div className = "row">
                        <div className = "col-md-5">
                            <div className = "content-box vendor-login-box">
                               <div>
                                   <div className = "vendorlogo" >
                                   <img src = {require("../../../../assets/images/weblogo.png")} />
                                   </div>
                                   {getData}
                                    <form className = "mt-3" onSubmit = {this.handleLogin.bind(this)}> 
                                        <div  className = "row form-group">
                                       
                                        <input className = "col-12 form-control" type = "email" ref  = "email" placeholder = "Enter Email" />
                                        </div>
                                        <div  className = "row form-group">
                                       
                                       <input className = "col-12 form-control" type = "password" ref  = "password" placeholder = "Enter Password" />
                                       </div>
                                       <div  className = "row form-group">
                                       
                                     <button className = "btn btn-primary w-100">Login</button>

                                     <div className= "form-group mt-2">
                                           <input type = "checkbox"></input> <span>Remember me </span>
                                       </div>
                                  
                                       </div>
                                    </form>
                            <Link to  = "vendorsignup"><h6 className = "text-center">Creat Vendor Account?</h6></Link>
                                  
                               </div>
                            </div>
                        </div>
                        <div className = "col-md-7 d-none d-md-block">
                            <div className = "vendorloginimg">
                                <img src = {require("../../../../assets/images/vendorlogin.jpg")} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
           </section>
        )
    }

}
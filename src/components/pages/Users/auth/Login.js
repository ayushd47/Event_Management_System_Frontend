import React from 'react';
import Nav from '../../../layouts/Headers/Nav';
import Footer from '../../../layouts/Footer';
import {Redirect} from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import {Link} from 'react-router-dom';
export default class Login extends React.Component{

constructor(props){
    super(props);


    this.state = {
        responseData  : [],
        redirect : false,
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

    handleLogin(e){
        e.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;

        let data = {
            email : email,
            password : password,
        }
      
        fetch("http://localhost:3200/api/auth/login", {
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
            sessionStorage.setItem("user_token", dataarray[0].token);
            sessionStorage.setItem("user_name", dataarray[0].name );
            sessionStorage.setItem("user_email", dataarray[0].email );
            this.setRedirect();
           }
         
    
        })
        

    

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
            <div>
                {this.handleRedirect()}
                <Nav />
           
            <div className = "container-fluid mb-5">
                    <div className = "content-wrapper">
                        <div className = "content-box">
                        <div className  = "row">
                    
                       <div className = "col-md-6 col-12 col-sm-12 d-md-block d-none">
                       <img src ='/assets/images/signin-image.jpg' className = "login-img mt-4"/> 
                       {/* <img src = {require('../../../../assets/images/signin-image.jpg')} className = "login-img mt-4"/> */}
                           </div>
                           <div className = "col-md-6  col-12 col-sm-12">
                               <div className = "login-form">
                                   <label className = "form-title bold-title">
                                       <h4>Login</h4>
                                   </label>

                                   {getData}
                                   <form className = "" onSubmit = {this.handleLogin.bind(this)}>
                                       <div className = "form-group pos-relative">
                                       <label className = "form-label"><i class="fa fa-user"></i></label>
                                       <input className = "custom-loginform-control" type = "email" id = "email"  ref = "email" placeholder = "Enter Email"/>
                                   
                                       </div>
                                  
                                       <div className = "form-group pos-relative">
                                       <label   className = "form-label"><i class="fa fa-lock"></i></label>
                                       <input className = "custom-loginform-control" type = "password"  ref  = "password" id = "password" placeholder = "Enter Password"/>

                                       </div>

                                       <div className= "form-group">
                                           <input type = "checkbox"></input> <span>Remember me </span>
                                       </div>

                                       <div className = "form-group">
                                           <button className = "btn btn-primary-faded ">Login</button>
                                       </div>
                                       <div className = "form-group mt-5">
                                           <Link to = "/signup" >Create a Account?</Link>
                                       </div>
                                   </form>
                               </div>
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
import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import {Link, Redirect} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import Axios from "axios";
export default class VendorNav extends React.Component{
    
    constructor(props) {
        super(props)
        this.state = {
          
          collapsed: true,
          loadingprogress : 0
         
        }
    }


    toggleCollapse(){
        const collapsed = !this.state.collapsed;

        this.setState({collapsed : collapsed});
    }

    setRedirect(){
        this.setState({
          redirect : true,
        })
      }
      handleRedirect(){
        if(this.state.redirect){
          return <Redirect to='/vendorslogin' />
        }
      }

      componentWillReceiveProps(nextProp) {
        
        if(nextProp.load != this.state.loadingprogress){
            this.setState({
              loadingprogress : nextProp.load,
                
            })
        }

    }


    // Logout function
    handleLogout(){


      var token   = sessionStorage.getItem("vendor_token");

      var config = {
         headers : {
           'Authorization' : token
         }
       }


       Axios.get("http://localhost:3200/api/auth/vendorlogout", config).then((res) => {
         if(res.data.success) {
          sessionStorage.clear('vendor_token');
        sessionStorage.clear('vendor_name');
        sessionStorage.clear('vendor_email');
        this.setRedirect();
    
         }
       })
      
      }

      complete = () => {
        this.setState({ loadingprogress: 100 });
      };
     
      onLoaderFinished = () => {
        this.setState({ loadingprogress: 0 });
      };
     

    render(){
        const collapsed = this.state.collapsed;
        const navClass = collapsed ? "collapse" : "";
        const vendor_name = sessionStorage.getItem("vendor_name");
            return (
                <div>
                    {this.handleRedirect()}
                     <LoadingBar
          progress={this.state.loadingprogress}
          height={3}
          color='red'
          onLoaderFinished={() => this.onLoaderFinished()}
        />
                    <div className = "navbar navbar-expand-lg navbar-classic navbar-second bg-light navbar-light fixed-top vendor-nav">
                    <button className="navbar-toggler collapsed" onClick = {this.toggleCollapse.bind(this)} type="button" data-toggle="collapse" data-target="#navbar-classNameic" aria-controls="navbar-classNameic" aria-expanded="false" aria-label="Toggle navigation">
                                           <span className= "fa fa-bars"></span>
                                        </button>
                                        <div className= {"navbar-collapse " + navClass} id="navbar-classNameic" >
                                           
                                           <ul className="navbar-nav ml-auto right-nav">
                                           <Dropdown>
    <Dropdown.Toggle className = "custom-dropdown  nav-link" id="dropdown-basic">
   Welcome,  {vendor_name}
  </Dropdown.Toggle>
  <Dropdown.Menu>
     
     
     <Link onClick = {this.handleLogout.bind(this)} to = "" className = "nav-link">Logout</Link>
  
    </Dropdown.Menu>
  </Dropdown>
                                               </ul>
                                               </div>
                    </div>
                </div>
            )
    }
}
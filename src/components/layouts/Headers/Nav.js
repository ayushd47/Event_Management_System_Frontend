import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import animateScrollTo from 'animated-scroll-to';
import Dropdown from 'react-bootstrap/Dropdown';
import LoadingBar from 'react-top-loading-bar';
import Axios from 'axios';

class Nav extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          prevScrollpos: window.pageYOffset,
          collapsed: true,
          navfixed : false,
          redirect : false,
          loadingprogress : 0
        }

      

       
      }

      componentWillReceiveProps(nextProp) {
        
        if(nextProp.load != this.state.loadingprogress){
            this.setState({
              loadingprogress : nextProp.load,
                
            })
        }

    }
      toggleCollapse(){
          const collapsed = !this.state.collapsed;

          this.setState({collapsed : collapsed});
      }

     
    
      componentDidMount() {

        const currentScrollPos = window.pageYOffset;
        const navfixed =  currentScrollPos < 50;

        this.setState({
         prevScrollpos: currentScrollPos,
         navfixed
       });
     
        return window.addEventListener('scroll', this.handleScroll)
      }
    
      componentWillUnmount() {
        return window.removeEventListener('scroll', this.handleScroll)
      }
    
      handleScroll = () => {
   
        const { prevScrollpos } = this.state;

        const currentScrollPos = window.pageYOffset;

         const navfixed =  currentScrollPos < 50;

         this.setState({
          prevScrollpos: currentScrollPos,
          navfixed
        });
      
      }
    
      handlePageScroll(e){
        const options = {
            easing: t =>    t * t + 1,
            maxDuration: 150,
  
            // Minimum duration of the scroll animation
            minDuration: 100,
            
            // Duration of the scroll per 1000px
            speed: 10,
        }

        animateScrollTo(document.querySelector(e.target.name),options);
      }
      setRedirect(){
        this.setState({
          redirect : true,
        })
      }
      handleRedirect(){
        if(this.state.redirect){
          return <Redirect to='/login' />
        }
      }
      handleLogout(e){
e.preventDefault();
        var token   = sessionStorage.getItem("user_token");

       var config = {
          headers : {
            'Authorization' : token
          }
        }


        Axios.get("http://localhost:3200/api/auth/logout", config).then((res) => {
          if(res.data.success) {
            sessionStorage.clear('user_token');
        sessionStorage.clear('user_name');
        sessionStorage.clear('user_email');
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
     

    render()
    {
       const collapsed = this.state.collapsed;
        const navfixed = this.state.navfixed;
        const navClass = collapsed ? "collapse" : "";
        
        const usertoken = sessionStorage.getItem('user_token');
        const user_name = sessionStorage.getItem('user_name');
         
        const UserLoginHeader =    (usertoken != null) ? 
        (<Dropdown>
    <Dropdown.Toggle className = "custom-dropdown  nav-link" id="dropdown-basic">
     {user_name}
  </Dropdown.Toggle>

    <Dropdown.Menu>
     
    <Link  to = '/profile' className = "nav-link">Profile</Link>
    <Link onClick = {this.handleLogout.bind(this)} to = "" className = "nav-link">Logout</Link>
 
   </Dropdown.Menu>
  </Dropdown>
        
         ) :    
         <Link to = '/login' className = "nav-link">Login</Link>;
    
      
        return(

        <div>
  
 {this.handleRedirect()}
 <LoadingBar
          progress={this.state.loadingprogress}
          height={3}
          color='red'
          onLoaderFinished={() => this.onLoaderFinished()}
        />
<nav className={(navfixed) ? 'navbar navbar-expand-lg navbar-classic navbar-second bg-light navbar-light' : 'navbar navbar-expand-lg navbar-classic navbar-second bg-light navbar-light  fixed-top'}>
                                            <a className={(navfixed) ? "navbar-brand  d-none" : "navbar-brand"} href="index.html">
                                            
                                                 
                                            <h1 className = "title">
                                        <img src = {require('../../../assets/images/weblogo.png')} className = "logo"/> 
                                        </h1>
                                            </a>
                                        <button className="navbar-toggler collapsed" onClick = {this.toggleCollapse.bind(this)} type="button" data-toggle="collapse" data-target="#navbar-classNameic" aria-controls="navbar-classNameic" aria-expanded="false" aria-label="Toggle navigation">
                                           <span className= "fa fa-bars"></span>
                                        </button>
                                        <div className= {"navbar-collapse " + navClass} id="navbar-classNameic" >
                                           
                                            <ul className="navbar-nav mr-auto right-nav">
                                            <Dropdown>
  <Dropdown.Toggle className = "custom-dropdown nav-link" id="dropdown-basic">
  Homepage
  </Dropdown.Toggle>

  <Dropdown.Menu >
    <Dropdown.Item onClick = {this.handlePageScroll.bind(this)} name = "#venues">Venues</Dropdown.Item>
    <Dropdown.Item onClick = {this.handlePageScroll.bind(this)} name = "#planning">  Wedding Planning Tools</Dropdown.Item>
    <Dropdown.Item onClick = {this.handlePageScroll.bind(this)} name = "#couples"> Married Couples</Dropdown.Item>
    <Dropdown.Item onClick = {this.handlePageScroll.bind(this)}  name = "#app">Android App </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
                                               
                                                <li className = "nav-item">
                                                    <Link to = '/about' className = "nav-link">About Us</Link>
                                                </li>
                                                <li className = "nav-item">
                                                        <Link to = '/contact' className = "nav-link">Contact us</Link>
                                                    </li>
                                                    <li className = "nav-item">
                                                            <Link to = '/' className = "nav-link">Home</Link>
                                                        </li>
                                               </ul>
                                               <ul className = "navbar-nav ml-auto right-nav">
                                                    <li className = "nav-item">
                                                   {UserLoginHeader}
                                                        </li>
                                                        
                                            </ul>
                                        </div>
                                    </nav>
</div>
        )
    }

}


export default Nav;
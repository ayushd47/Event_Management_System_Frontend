import React from "react";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
 
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {withRouter, Route, BrowserRouter, Router} from 'react-router-dom';
 
 
class SideNavigation extends React.Component{

   constructor(props){
       super(props);
     
    this.state = {
        expanded : false
    }

   }

   handleToggle(){
      
    var elem = document.querySelector('#wrapper');
    (this.state.expanded == true) ? elem.style.marginLeft = "64px" : elem.style.marginLeft = "250px";
    
   }
    render(){
        return(
        
            <SideNav
            onSelect={(selected) => {
                const to = '/vendor/' + selected;
                if (this.props.location.pathname !== to) {
                    this.props.history.push(to);
            
                }
            }}
            expanded={this.state.expanded}
            onToggle={(expanded) => {
                this.handleToggle()
                this.setState({expanded: expanded});
              
            }}
        >  
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="">
                <NavIcon>
                    <i className="fa fa-home" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Home
                </NavText>
            </NavItem>
            <NavItem eventKey="home">
                <NavIcon>
                    <i className="fa fa-fw fa-edit" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Inventroy
                </NavText>
            </NavItem>
            <NavItem eventKey="updateVendor">
                <NavIcon>
                    <i className="fa fa-user" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Update Profile
                </NavText>
            </NavItem>
        </SideNav.Nav>
 
        </SideNav>
         
  
        )
    }
}

export default withRouter(SideNavigation);
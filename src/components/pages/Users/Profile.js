import React from "react"
import Nav from "../../layouts/Headers/Nav"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Modal, Button} from 'react-bootstrap';
import Footer from "../../layouts/Footer";
import axios from 'axios';
import { Link } from "react-router-dom";

export default class Profile extends React.Component{
    constructor(){
        super();
        this.state = {
            userdata : [],
            setShow : false,
            show : false,
            image : "",
        }
    }

    handleClose(){
        this.setState(
            {
                setShow : false,
                show : false
            }
        )
    }

    handleShow(){
        this.setState(
            {
                setShow : true,
                show : true
            }
        )
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
               userdata : [dataarray[0].userdata],
           })
          
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
 
    handleSubmit(){
       var formData = new FormData();

        var image = this.refs.profilepic.files[0];

        formData.append("image", image);


    
        var token = sessionStorage.getItem("user_token");
       
        var config  = {
            headers: {
                'Accept' : 'multipart/form-data',
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization': token,
              }
        }

 
      axios.post("http://localhost:3200/api/updateProfileImage", formData, config).then(function(res){
        window.location.reload();
     });

    }
    
    render(){
        const getData = this.state.userdata;

       const getImage = getData.map((value, index) => {
            return(
                <div className = "profile-img-box" id = "profile-img-box" key = {index}>
                    <div className = "profile-pic-update" id = "profile-pic-update" onClick = {this.handleShow.bind(this)}> 
                        <span className = "fa fa-edit"></span>
                    </div>
                                <img src = {`http://localhost:3200/public/images/${value.profileImg}`}   className = "profile-img" />
                            </div>
            )
        });
        const getprofileheader = getData.map(function(value, index){
            return(
                <div className = "profile-details" key = {index}>
                <h6 className = "text-sm-center text-center bold-title">Welcome, {value.firstname}</h6>
                <h6 className = "user-location mt-3 text-sm-center text-center   "><span className = "fas fa-map-marker-alt"></span>&nbsp;{value.location}</h6> 
        
            </div>
            )
        });


        const getProfileDetails = getData.map(function(value,index){
            return(
                <div className = "container-fluid" key = {index}>
                <div className = "user-details p-4">
                    <div className = "row">
                        <label className = "col-md-4 col-sm-4 col-4 ">
                            <h6 className = "font-weight-bold">First Name</h6>
                        </label>
                        <label className = "col-md-6 col-sm-6 col-6 ">
                            <h6>{value.firstname}</h6>
                        </label>
                    </div>
                    <div className = "row">
                        <label className = "col-md-4 col-sm-4 col-4">
                            <h6 className = "font-weight-bold">Last Name</h6>
                        </label>
                        <label className = "col-md-6 col-sm-6 col-6 ">
                            <h6>{value.lastname}</h6>
                        </label>
                    </div>
                    <div className = "row">
                        <label className = "col-md-4 col-sm-4 col-4">
                            <h6 className = "font-weight-bold">Location</h6>
                        </label>
                        <label className = "col-md-6 col-sm-6 col-6 ">
                            <h6>{value.location}</h6>
                        </label>
                    </div>
                    <div className = "row">
                        <label className = "col-md-4 col-sm-4 col-4">
                            <h6 className = "font-weight-bold">Email</h6>
                        </label>
                        <label className = "col-md-6 col-sm-6 col-6 ">
                            <h6 >{value.email}</h6>
                        </label>
                    </div>
                </div>
            </div>
            )
        })

        return(
            <div>
                <Nav />
               <div className = "container my-3">
                   <div className = "row">
                       <div className = "col-12 col-md-3 col-lg-3">
                           <div className  = "row">
                               <div className=  "col-12">
                               <div className = "profile-title ">
                               <h6 className = "bold-title" >Profile</h6>
                           </div>
                               </div>
                               <div className = "col-md-12 m-md-auto  ">
                           {getImage}
                        </div>

                        <div className = "col-lg-12 col-md-12 p-4">
                        {getprofileheader}
                        </div>
                        <div className = "col-lg-12 col-md-12 p-4">
                            <ul className = "user-profile-nav">
                            <Link to = "/updateProfile"  className = "simple-link">  <li><h6 className = "text-left"><i className = "fa fa-edit user-profile-navicon"></i> &nbsp; Update Profile</h6></li></Link>
                                <Link to = "/registerWedding" className = "simple-link"> <li><h6 className = "text-left"><i className = "fas fa-calendar-week user-profile-navicon"></i>  &nbsp; Start Planning</h6></li>
                               </Link>
                            </ul>
                        </div>
                           </div>
                         

                       </div>
                       <div className = "col-12 col-md-9 col-lg-9">
                    <div className = "row">
                        <div className = "col-12">
                            <div className = "profile-title">
                            <h6 className = "bold-title">Activities</h6>
                            </div>
                            <div className = "row mt-4">
                            <div className = "col-4">
                            <Link to = "/search/All" className = "simple-link">   <div className = "content-div profile-act">
                     <div className = "profile-act-img">
                        <img src = {require('../../../assets/images/venue.png')} />
                </div>
                <span className = "text-center act-title"><h6>Venues</h6></span>
                 </div></Link>
                                </div>



                                <div className = "col-4">
                               <Link to = "/inventory" className = "simple-link"><div className = "content-div profile-act">
                     <div className = "profile-act-img">
                        <img src = {require('../../../assets/images/chest.png')} />
                </div>
                <span className = "text-center act-title"><h6>Inventory</h6></span>
                 </div></Link> 
                                </div>
                            </div>
                       
                        </div>



                        <div className = "col-12 mt-5">
                        <div className = "profile-title">
                                <h6 className = "bold-title">Overview</h6>
                            </div>
                            <div className = "row">
                        <div className = "col-lg-6 col-md-6 col-12 col-sm-12 my-2">
                          <div className = "content-div">
                              <h6 className = "text-center bold-title">Profile Details</h6><hr></hr>
                          {getProfileDetails}

                              </div>
                              </div>
                              <div className = "col-lg-6 col-md-6 col-12 col-sm-12 my-2">
                          <div className = "content-div pos-relative">

                          <h6 className = "text-center bold-title">Recent Activities</h6><hr></hr>

                          {/* Timeline */}
                          <div className = "scrollview">
                          <div className="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                                                    <div className="vertical-timeline-item dot-danger vertical-timeline-element">
                                                        <div>
                                                            <span className="vertical-timeline-element-icon bounce-in"></span>
                                                            <div className="vertical-timeline-element-content bounce-in">
                                                                <h4 className="timeline-title">You Created A Inventory</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                              {/* Timeline */}

                               {/* Timeline */}
                          <div className="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                                                    <div className="vertical-timeline-item dot-danger vertical-timeline-element">
                                                        <div>
                                                            <span className="vertical-timeline-element-icon bounce-in"></span>
                                                            <div className="vertical-timeline-element-content bounce-in">
                                                                <h4 className="timeline-title">You Browsed a Venue</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                              {/* Timeline */}
                              </div>
                              </div>
                              </div>
                              </div>
                        </div>
                    </div>
                       </div>
                   </div>
               </div>
           <Footer/>


           <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
                <input className = "form-control mb-3" type = "file" ref = "profilepic" onChange = {this.handleImageChange.bind(this)}/>
                <img src = {this.state.image} className = {(this.state.image == "" ? "venue-img-preview d-none" : "venue-img-preview" )}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose.bind(this)}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSubmit.bind(this)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
        )
    }


}
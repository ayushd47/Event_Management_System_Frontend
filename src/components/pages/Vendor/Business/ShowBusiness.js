import React from "react"
import VendorNav from "../../../layouts/Headers/VendorNav"
import axios from "axios";
import LatLngMap from '../LatLngMap';
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Album from "../../../layouts/Album";
import UpdateBusiness from "./UpdateBusiness";

export default class ShowBusiness extends React.Component{

    
       constructor(props){
        super(props);
        this.state = {
             
            businessdata : [],
            name : "",
            type : "",
            contact : "",
            desc : "",
            price : "",
            location : {
                name : "",
                lat : 27.724231,
                lng :  85.315264,
            },
            dates : [] ,
            image : "",
            renderMap :  false,          
            businessRating : "4", 
            token : null,
            useremail : null, 
            icon: "",
            album : [],
            setShow : false,
            show : false,
            dates : [],
            today : new Date(),
            loadingProgress : 0,
            showalbum :[]

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
            if(this.props.match.params){
            var  businessid = this.props.match.params.businessid;
                
           var data = {
                businessid : businessid
            }

            var token = sessionStorage.getItem("user_token");
            var useremail = sessionStorage.getItem("user_email");
            
            this.setState(
                {
                    token : token,
                    useremail : useremail
                }
            )
            var config  = {
                headers: {
                    'Authorization': token,
                  }
            }
 
            axios.post("http://localhost:3200/api/getBusinessById", data).then((business) => {

            
              this.setState({
                  businessdata : business.data.business,
                    name : business.data.business.businessname,
                    type : business.data.business.businesstype,
                    image : business.data.business.businessImage,
                    price : business.data.business.businesspricing,
                    contact : business.data.business.businesscontact,
                    location : business.data.business.businesslocation,
                    desc : business.data.business.businessdesc,
                    showalbum : business.data.business.album,
                    loadingProgress : 100
              })

              if(business.data.business.businesstype == "Photography"){
                    this.setState({
                        icon : "icon-025-wedding-video"
                    })
              }else if(business.data.business.businesstype == "Bakery"){
                this.setState({
                    icon : "icon-003-wedding-cake"
                })
               }else{
                this.setState({
                    icon : "icon-makeup"
                })
                }
              
            });
         }
           
        }
         
        
            handleImagePreview = (e) =>{
                if (e.target.files && e.target.files[0]) {
                    var imagearray =    [];
                    
                    Array.from(e.target.files).map(function(value, index){
                        imagearray.push(URL.createObjectURL(e.target.files[index]))
                    })
                    this.setState({
                        album: imagearray
                    });
                  
                  }else{
                    this.setState({
                        album: []
                      });
                  }
            }
        
            handleSubmit(e){
                e.preventDefault();
                 
                const formData = new FormData();
                if(this.props.match.params){
        
                    var  businessid = this.props.match.params.businessid;
            
                var images = this.refs.album.files;
                var imagearray =    [];
                    
                Array.from(images).map(function(value, index){
                    formData.append("image", images[index]);
                })
        
                 
        
                formData.append("businessid",businessid );
        
                
        
                var token = sessionStorage.getItem("vendor_token")
        
                var config  = {
                    headers: {
                        'Accept' : 'multipart/form-data',
                        'Content-Type' : 'application/x-www-form-urlencoded',
                        'Authorization': token,
                      }
                }
                axios.post("http://localhost:3200/api/addToBusinessAlbum", formData, config).then((res) => {
                    console.log(res);
                    this.setState({
                        album: []
                      });
                      window.location.reload();
                })
                }
            }
            handleSelectDate=(date)=>{
                var date =  new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(date)
        
                  var addedDates = this.state.dates.concat(date);
                  this.setState({ dates: addedDates })
                
            }
            
            deleteDate(index){
                
                var array = [...this.state.dates]; // make a separate copy of the array
                
                if (index !== -1) {
                  array.splice(index, 1);
                  this.setState({dates: array});
                }
            }
        
            handleAddDates(){
                var dates = this.state.dates;
                
                var data = {
                    businessid : this.props.match.params.businessid,
                    dates : dates
                }
        
                axios.post("http://localhost:3200/api/addAvailableDatesBusiness" , data).then((res) =>{
                    console.log(res);
                } ) 
            }

    render(){
       
        var lastWeek = new Date(this.state.today.getFullYear(), this.state.today.getMonth(), this.state.today.getDate() - 7);

        var dates = this.state.dates;
        dates = dates.map((value, index) => {
           return(
               <div  className = "col-md-4" key = {index}>
               
                   <button className = "btn btn-primary mt-3" onClick = {() => this.deleteDate(index)}>{value}</button>
               </div>
           )
       })
        
        var album = this.state.album;
        var album = album.map((value, index) => {
            return(<div className = "col-md-4" key = {index}>
                <div className = "venue-img-box">
                    <img src = {value} className = "venue-img"></img>
                </div>
            </div>)
        })
        return(
            <main>
                <VendorNav load = {this.state.loadingProgress} />
                
    <div className = "business-banner">
        <img src =  {"http://localhost:3200/public/images/" + this.state.image } className = "business-banner-img" />
        
    </div>
   
    <div className = "business-view-details">
        <div className = "container-fluid">
<div className = "row">
    <div className = "col-md-9">
            <h1 className = "text-left">{this.state.name}</h1>
            <h6 className = "text-left location-text"><span className = "fas fa-map-marker-alt"></span>&nbsp;{this.state.location.name}</h6> 
            <span className = {this.state.businessRating >= 1? "fa fa-star star-orange" : "fa fa-star"}></span>
            <span className = { this.state.businessRating >= 2? "fa fa-star star-orange" : "fa fa-star"}></span>   
            <span className = { this.state.businessRating >= 3? "fa fa-star star-orange" : "fa fa-star"}></span>   
            <span className = { this.state.businessRating >= 4? "fa fa-star star-orange" : "fa fa-star"}></span>   
            <span className = { this.state.businessRating == 5? "fa fa-star star-orange" : "fa fa-star"}></span>       
    </div>
    <div className = "col-md-3 border-left">
       
   <UpdateBusiness businessdata = {this.state.businessdata} />
         <button className = "btn btn-danger custom-btn mt-2 ml-2" onClick = {() => this.handleShow()}>Add  Dates</button>
    
    </div>
    
</div>
        </div>
           
        </div>

        <div className = "container-fluid">
            <div className = "row">
                <div className = "col-12 col-sm-12 col-md-8 col-lg-8 mt-5">
                        <div className = "business-view-body">

                                <div className = "business-view-about">
                                 <h4 className = "bold-title text-left">About </h4>
                                    <p className = "text-justify">
                                    {this.state.desc}
                                    </p>
                                </div>
                                <div className = "business-view-overview mt-5">
                                    <h4 className = "bold-title text-left">Overview</h4>
                                    <div className = "container py-4 ">
                                        <div className = "row overview-box">
                                            <div className = "col-3 col-sm-3 col-md-4">
                                                <div className = "row">
                                                    <div className = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                                                            
                                                                  <h4 className = "text-center">
                                                                      <i className= {this.state.icon + " overview-icon"}></i></h4>  
                                                          
                                                    </div>
                                                    <div className = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                                        <h6 className = "text-center">Business</h6>
                                                        <h6 className = "text-center light-bold font-small">{this.state.type}</h6>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className = "col-3 col-sm-3 col-md-4">
                                                    <div className = "row">
                                                        <div className = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                                                                
                                                                      <h4 className = "text-center">
                                                                          <i className="icon-money overview-icon"></i></h4>  
                                                              
                                                        </div>
                                                        <div className = "col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                                                            <h6 className = "text-center">Usual Price</h6>
                                                            <h6 className = "text-center light-bold font-small">{this.state.price}</h6>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className = "col-3 col-sm-3 col-md-4">
                                                       
                                                    </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className = "row">
                            <div className = "col-12 col-sm-12 col-md-12 col-lg-12 ">
                   
                   <LatLngMap  
                   google = {this.props.google}
                   center = {
                       {
                           lat : this.state.location.lat, 
                           lng : this.state.location.lng
                       }
                   }
                   height = '300px'
                   zoom = {15}
                   />
        
                     </div>
                            </div>
                </div>
              <div className = "col-12 col-sm-12 col-md-4 col-lg-4">
                  <div className = "row">
                  <div className = "col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
                    <div className = "content-div">
                        <form onSubmit = {this.handleSubmit.bind(this)}>
                        <input type = "file" ref = "album" multiple className = "form-control" onChange = {this.handleImagePreview}></input>
                      
                    <div className = "row">
                    {album} 
                    </div> 
                    <button className = "btn btn-primary mt-5">
                        Add To Album
                        </button>
                        </form>
                    </div>
                   
                </div>
                
                <div className = "col-12 col-sm-12 col-md-12 col-lg-12 mt-5">
                        <div className = "business-view-body">

                                <div className = "business-gallery-section">
                             
                                        <div className = "container-fluid">
                                                <h6 className = "bold-title text-left">Photos</h6>
                                            <div className = "row py-2">
                                                {this.state.showalbum != "" ? 
                                            <Album vendor = {true} album = {this.state.showalbum} type = "business" id = {this.props.match.params.businessid}/> 
                                            :
                                             "No Photos"}

                                            </div>
                                        </div>
                                </div>

                                
                
                            </div>   
                </div>
                  </div>
              </div>
             
                
            </div>
           
        </div>
        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Set Available Dates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className= "container">
            <div className = "row mb-3">
            {dates}
            </div>
        </div>
        <InfiniteCalendar
     width={470}
   height={450}
   rowHeight={70}
    selected={this.state.today}
    disabledDays={[0,6]}
    minDate={lastWeek}
    min={lastWeek}
    onSelect = {(date) => this.handleSelectDate(date)}
  
  />,
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose.bind(this)}>
            Close
          </Button>
          <Button  onClick = {this.handleAddDates.bind(this)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            </main>
        )
    }
}
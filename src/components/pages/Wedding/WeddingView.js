import React from 'react';
import axios from 'axios';
import Nav from '../../layouts/Headers/Nav';
import { Link } from 'react-router-dom';
import ShowOneElement from './ShowOneElement';
import Footer from '../../layouts/Footer'
import WeddingAlbum from './WeddingAlbum';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default class WeddingView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            wedding : [],
            album : [],
            slider : []
        }
    }
    componentDidMount(){
        var token = sessionStorage.getItem("user_token");
        
        if(this.props.match.params){
            var weddingid = this.props.match.params.weddingid;

            var data = {
                weddingid : weddingid
            }

            var config = {
                headers : {
                    'Authorization' : token
                }
            }

            axios.post("http://localhost:3200/api/getWedding", data,  config).then((response)=>{

            if(response.data.success){
                this.setState({
                    wedding : response.data.wedding,
                    album : response.data.wedding.album
                })
             
            }
            })
        }
    }

    handledelete = (value) =>{
        var image = value;
        var token = sessionStorage.getItem("user_token")

        var config = {
            data : {
                image : image,
                weddingid : this.state.wedding._id
            },
            headers : {
                'Authorization' : token
            }
        }

        axios.delete("http://localhost:3200/api/deleteAlbumWedding",config).then((res) => {
            if(res.data.success){
                this.setState(
                    {
                        album  : res.data.album
                    }
                )
            }
        })
    }


    render(){
        var wedding = this.state.wedding;
     
        
            var album = this.state.album;
           
         var album =  album.map((value, index) => {
              return (
                  <div key = {index} className = "slider-image-container ml-3 pos-relative">
<button className = "btn btn-danger delete-album-btn" onClick={() => this.handledelete(value)}>
            <span className = "fa fa-times"></span></button>
                      <img src = {"http://localhost:3200/public/images/wedding/" + this.state.wedding._id+ "/" + value}  className = "venue-img"/>
                  </div>
              )
            })

        
        
  
          
      
        
        return(
            <div>
                <Nav /> 
                <div className = "container mt-5 mb-5">
                <div className = "content-div pb-5">
                    <div className = "row">
                        <div className = "col-md-6">
                        <h3 className = "bold-title">{wedding.brideName  + " & " + wedding.groomName}</h3>
                    <h6 className = "font-italic"><span className = "icon-048-wedding-day"></span> &nbsp; {wedding.weddingDate}</h6>
                
                        </div>
                        <div className = "col-md-6">
                            <div className = "row">
                                <div className = "col-md-6 col-12 col-sm-12">
                                <Link to = {"/invitations/" + wedding._id}>  <button className = "custom-btn btn-start w-100">Invitations</button>
                      </Link> 
                                </div>
                                <div className = "col-md-6 col-12 col-sm-12">
                               <WeddingAlbum id = {this.state.wedding._id}/>
                   
                                </div>
                            </div>
                       </div>
                    </div>
                    <hr/>
                   <div className = "row">
                       <div className = "col-md-4 col-sm-12 mt-5">
                           <h5 className = "text-center bold-title">Wedding Venue</h5>
                            {
                                wedding.weddingVenue != undefined  ? 
                                <ShowOneElement name = {wedding.weddingVenue.venueName} image = {wedding.weddingVenue.image} id = {wedding.weddingVenue._id} weddingid = {wedding._id} type = "venues" />
                                : <div><Link to = "/search/All">
                                     <div className = "circle-div mt-5"><h6 className = "text-center"><span className = "fa fa-plus"></span></h6></div>  
                                     </Link></div> 
                            }
                       </div>
                       <div className = "col-md-4 col-sm-12 mt-5">
                           <h5 className = "text-center bold-title">Photographer</h5>
                           {
                                 wedding.weddingPhotography != undefined  ?
                                 <ShowOneElement name = {wedding.weddingPhotography.businessname} image = {wedding.weddingPhotography.businessImage} id = {wedding.weddingPhotography._id} weddingid = {wedding._id} type = "business"/>
                                  : <div><Link to = "/category/Photography">
                                   <div className = "circle-div mt-5"><h6 className = "text-center"><span className = "fa fa-plus"></span></h6>
                                   </div>  
                                     </Link></div> 
                            }
                       </div>
                       <div className = "col-md-4 col-sm-12 mt-5">
                           <h5 className = "text-center bold-title">Bakery</h5>
                           {
                                wedding.weddingBakery != undefined  ? 
                                <ShowOneElement name = {wedding.weddingBakery.businessname} image = {wedding.weddingBakery.businessImage} id = {wedding.weddingBakery._id} weddingid = {wedding._id} type = "business"/>
                                 :<div><Link to = "/category/Bakery">
                                     <div className = "circle-div mt-5"><h6 className = "text-center"><span className = "fa fa-plus"></span></h6></div>  
                                     </Link></div> 
                            }
                       </div>
                       <div className = "col-md-4 col-sm-12 mt-5">
                           <h5 className = "text-center bold-title">Beauty Parlor</h5>
                           {
                                 wedding.weddingMakeup != undefined  ? 
                                 <ShowOneElement name = {wedding.weddingMakeup.businessname} image = {wedding.weddingMakeup.businessImage} id = {wedding.weddingMakeup._id} weddingid = {wedding._id} type = "business"/>
                                  :<div><Link to = "/category/Beauty Parlor">
                                      <div className = "circle-div mt-5"><h6 className = "text-center"><span className = "fa fa-plus"></span></h6></div>  
                                      </Link></div> 
                            }
                       </div>
                   </div>

                   <div className = "mt-8">
                       <h4 className = "">Wedding Album</h4><hr></hr>
                   <Carousel additionalTransfrom={0}
  arrows
  autoPlaySpeed={3000}
  centerMode={false}
  className=""
  containerClass="container-with-dots"
  dotListClass=""
  draggable
  focusOnSelect={false}
  infinite
  itemClass=""
  keyBoardControl
  minimumTouchDrag={80}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  responsive={{
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  }}
  showDots={false}
  sliderClass=""
  slidesToSlide={1}
  swipeable>
                     {album}
                </Carousel>
                
                   </div>
                </div>
                </div>

                <Footer />
            </div>
        )
    }
}
import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import Axios from 'axios';

export default class Album  extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            album : this.props.album,
            id : this.props.id,
            setShow : false,
                show : false,
                selected :"",
                type : this.props.type,
                vendor : this.props.vendor
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
    componentWillReceiveProps(nextProp) {
        
        if(nextProp.album != this.state.album){
            this.setState({
                album : nextProp.album,
                
            })
        }

    }

    handleImageView=(src)=>{
        this.handleShow();

        this.setState({
            selected : src
        })
    }

    handledelete = (value) => {

        var image = value;
        var token = sessionStorage.getItem("vendor_token")

       
        if(this.state.type == "venues"){
            var config = {
                data : {
                    image : image,
                    venueid : this.state.id
                },
                headers : {
                    'Authorization' : token
                }
            }
    
            Axios.delete("http://localhost:3200/api/deleteAlbumFromVenue",config).then((res) => {
                if(res.data.success){
                    this.setState(
                        {
                            album  : res.data.album
                        }
                    )
                }
            })
        }else if(this.state.type == "business"){
            var config = {
                data : {
                    image : image,
                    businessid : this.state.id
                },
                headers : {
                    'Authorization' : token
                }
            }
    
        Axios.delete("http://localhost:3200/api/deleteAlbumFromBusiness",config).then((res) => {
            if(res.data.success){
                this.setState(
                    {
                        album  : res.data.album
                    }
                )
            }
            })
        }
        
    }
    
    render(){

        var album = this.state.album;
        album = album.map((value, index) => {
            return(
                <div className = "col-md-4 col-4 venue-img-box" key = {index}> 
            <img src = {"http://localhost:3200/public/images/" + this.state.type + "/" + this.state.id + "/" + value} className = "venue-img" onClick = {()=> this.handleImageView("http://localhost:3200/public/images/" + this.state.type + "/" + this.state.id + "/" + value)}/>
            {!this.state.vendor  ? "" : <button className = "btn btn-danger delete-album-btn" onClick={() => this.handledelete(value)}>
            <span className = "fa fa-times"></span>
          </button>
    }
      
        </div>
            )
        })
        return(
            <div className = "row">
                {album}

                <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <img src = {this.state.selected} className = {(this.state.selected == "" ? "venue-img-preview d-none" : "venue-img-preview" )}/>

        </Modal.Body>
        <Modal.Footer>      
          <Button variant="secondary" onClick={this.handleClose.bind(this)}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>

      
            </div>

        )
    }
}
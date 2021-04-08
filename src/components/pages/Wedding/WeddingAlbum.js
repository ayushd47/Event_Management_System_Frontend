

import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import Axios from 'axios';

export default class WeddingAlbum extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            setShow : false,
            show : false,
            album : [],
            id : this.props.id,
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

    handleSubmit(e){
        e.preventDefault();
        var formData = new FormData()
        var images = this.refs.album.files;
                var imagearray =    [];
                    
                Array.from(images).map(function(value, index){
                    formData.append("image", images[index]);
                })

                formData.append("weddingid", this.state.id);

                var token = sessionStorage.getItem("user_token");

                var config = {
                    headers : {
                        'Authorization' : token
                    }
                }

        Axios.post("http://localhost:3200/api/addToWeddingAlbum", formData, config).then((res) => {

      
                window.location.reload();
        

         })
                 

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.id != this.state.id){
            this.setState({
                id : nextProps.id
            })
        }
    }

    handleImagePreview(e){
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

    render(){
        
        var album = this.state.album;
        var album = album.map((value, index) => {
            return(<div className = "col-md-4" key = {index}>
                <div className = "venue-img-box">
                    <img src = {value} className = "venue-img"></img>
                </div>
            </div>)
        })
        return(
            <div>
                 <button className = "custom-btn btn-start w-100" onClick = {() => this.handleShow()}>Add To Album</button>

            <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
         <Modal.Header closeButton>
           <Modal.Title>Add To Wedding Album</Modal.Title>
         </Modal.Header>
         <Modal.Body>
             <form onSubmit = {this.handleSubmit.bind(this)}>
                        <input type = "file" ref = "album" multiple className = "form-control" onChange = {this.handleImagePreview.bind(this)}></input>
                      
                    <div className = "row">
                    {album} 
                    </div> 
                    <button className = "btn btn-primary mt-5">
                        Add To Album
                        </button>
                        </form>
        
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
import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import Axios from 'axios';


export default class UpdateVenue extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            setShow : false,
            show : false,
            venuedata : this.props.venuedata,
            name : "",
            desc : "",
            contact : "",
            indoor: "",
            outdoor : "",
            veg : "",
            nonveg : "",
            message : "",
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
        
        if(nextProp.venuedata != this.state.venuedata){
            this.setState({
                venuedata : nextProp.venuedata,
                name : nextProp.venuedata.venueName,
                indoor : nextProp.venuedata.venueCapacity.indoor,
                outdoor : nextProp.venuedata.venueCapacity.outdoor,
                veg : nextProp.venuedata.venuePricing.veg,
                nonveg : nextProp.venuedata.venuePricing.nonVeg,
                desc : nextProp.venuedata.venueDesc,
                contact : nextProp.venuedata.venueContact
            })
           
        }

    }

    handleNameChange(e){
            this.setState({
                name : e.target.value
            })
    }

    handleDescChange(e){
        this.setState({
            desc : e.target.value
        })
}

handleContactChange(e){
    this.setState({
        contact : e.target.value
    })
}

handleIndoorChange(e){
    this.setState({
        indoor : e.target.value
    })
}

handleOutdoorChange(e){
    this.setState({
        outdoor : e.target.value
    })
}

handleVegChange(e){
    this.setState({
        veg : e.target.value
    })
}

handleNonVegChange(e){
    this.setState({
        nonveg : e.target.value
    })
}

            handleSubmit(e){
                    e.preventDefault();
                    var type = this.refs.vtype.value;
                    

                var venueCapacity = {
                    indoor: this.state.indoor,
                    outdoor : this.state.outdoor
                }

                var venuePricing = {
                    veg : this.state.veg,
                    nonVeg : this.state.nonveg
                }
                    var data = {
                        venueName : this.state.name,
                        venueDesc : this.state.desc,
                        venueContact : this.state.contact,
                        venueCapacity  : venueCapacity,
                        venuePricing : venuePricing,
                        venueType : type,
                        venueid : this.state.venuedata._id

                    }

                    var token = sessionStorage.getItem("vendor_token");

                    var config = {
                        headers : {
                            'Authorization' : token
                        }
                    }

                    Axios.put("http://localhost:3200/api/updateVenue", data, config).then((res) => {
                        console.log(res)
                        if(res.data.success){
                           window.location.reload();
                        }else{
                            this.setState({
                                message : res.data.message
                            })
                        }
                    })
            }

    render(){
 
        return(
            <>
                  <button className = "btn btn-danger custom-btn mt-2" onClick = {()=>this.handleShow()}>Edit Venue</button>
                 
           <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Venues</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className = "container">

           <div className  = "background-form mb-8">
               <div className = {this.state.message == "" ? "alert alert-danger d-none" : "alert alert-danger"} >{this.state.message}</div>
                        <form onSubmit = {this.handleSubmit.bind(this)}>
                <div className = "form-group">
                    <input type = "text" className = "form-control" ref = "vname" value = {this.state.name}  onChange = {this.handleNameChange.bind(this)}/>
                </div>
                <div className = "form-group">
                    <select ref = "vtype" className = "form-control">
        <option>{this.state.venuedata.venueType}</option>
                        <option>Resort</option>
                        <option>Hotel</option>
                        </select> 
                </div>
                <div className = "form-group">
                    <input type = "text" className = "form-control" ref = "vdesc" value = {this.state.desc} onChange = {this.handleDescChange.bind(this)}/>
                </div>
                <div className = "form-group">
                    <input type = "number" className = "form-control" ref = "vcontact" value = {this.state.contact} onChange = {this.handleContactChange.bind(this)}/>
                </div>
                <div className = "form-group row">
                        <div className = "col-md-6">
                        <input type = "number" className = "form-control" ref = "indoor"  value = {this.state.indoor} onChange = {this.handleIndoorChange.bind(this)}/>

                        </div>
                        <div className = "col-md-6">
                        <input type = "number" className = "form-control" ref = "outdoor" value = {this.state.outdoor} onChange = {this.handleOutdoorChange.bind(this)}/>

                        </div>

                </div>

                <div className = "form-group row">
                        <div className = "col-md-6">
                        <input type = "number" className = "form-control" ref = "veg"  value = {this.state.veg}  onChange = {this.handleVegChange.bind(this)}/>

                        </div>
                        <div className = "col-md-6">
                        <input type = "number" className = "form-control" ref = "nonveg" value = {this.state.nonveg} onChange = {this.handleNonVegChange.bind(this)}/>

                        </div>

                </div>
                <button  className = "btn btn-primary w-100" >
            Save Changes
          </button >
            </form>
           
           </div>
           </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose.bind(this)}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
            </>
        )
    }
}
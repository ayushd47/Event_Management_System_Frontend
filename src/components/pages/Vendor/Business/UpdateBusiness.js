
import React from 'react'
import {Modal, Button } from 'react-bootstrap';
import Axios from 'axios';

export default class UpdateBusiness extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            setShow : false,
                show : false,
                businessdata : this.props.businessdata,
                name : "",
                desc : "",
                contact : "",
                price : "",
                pricelabel : "",
                message: "",

        }
    }

    componentWillReceiveProps(nextProp) {
        
        if(nextProp.businessdata != this.state.businessdata){

            var price = nextProp.businessdata.businesspricing;

            var splitPrice = price.split(" ");



            this.setState({
                businessdata : nextProp.businessdata,
                name : nextProp.businessdata.businessname,
                desc : nextProp.businessdata.businessdesc,
                contact : nextProp.businessdata.businesscontact,
                price : splitPrice[0],
                pricelabel : splitPrice[1] +" "+  splitPrice[2] 
            })

         
           
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

        var data = {
            businessname : this.state.name,
            businesscontact : this.state.contact,
            businessdesc  : this.state.desc,
            businesspricing : this.state.price + " " + this.state.pricelabel,
            businessid : this.state.businessdata._id
        }

      var token = sessionStorage.getItem("vendor_token");

      var config = {
          headers : {
              'Authorization' : token
          }
      }


        Axios.put('http://localhost:3200/api/updateBusiness', data, config).then((res) => {

        if(res.data.success){
            window.location.reload();
        }else{
            this.setState({
                message : res.data.message
            })
        }
        })

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

    handlePriceChange(e){
        this.setState({
            price : e.target.value
        })
    }

    render(){
 
        return(
            <>
                   <button className = "btn btn-danger custom-btn mt-2" onClick = {()=>this.handleShow()}>Edit Business</button>
                 
                 <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Update Business</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div className = "container">
      
                 <div className  = "background-form mb-8">
                     <div className = {this.state.message == "" ? "alert alert-danger d-none" : "alert alert-danger"} >{this.state.message}</div>
                              <form onSubmit = {this.handleSubmit.bind(this)}>
                              
                
                <div className = "form-group">
                <input type = "text" placeholder = "Business Name" ref = "bname"  value = {this.state.name} onChange = {this.handleNameChange.bind(this)} className = "form-control"></input>
                </div>
               
                <div className = "form-group">
                <textarea type = "text" placeholder = "Business Description" ref = "bdesc" value = {this.state.desc} onChange = {this.handleDescChange.bind(this)} className = "form-control"></textarea>
                
                </div>
                <div className = "form-group">
                <input type = "number" placeholder = "Business Contact" ref = "bcontact" value = {this.state.contact} onChange = {this.handleContactChange.bind(this)} className = "form-control"></input>
                
                </div>
             
                
                <div className = "form-group row">
                <div className = "col-md-8">
                <input type = "number" placeholder = "Price" value = {this.state.price} ref = "bprice"  onChange = {this.handlePriceChange.bind(this)} className = "form-control"></input>
                
                </div>
                <div className = "col-md-4">
                <input type = "text" value = {this.state.pricelabel} readOnly ref = "pricelabel" className = "form-control"></input>
                
                
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



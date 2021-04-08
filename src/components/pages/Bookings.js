import React from 'react'
import Axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default class Bookings extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            setShow : false,
            show : false,
            weddings : [],
            id : this.props.id,
            dates : [],
            type : this.props.type,
            success : "",
            error : ""
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


    getVenueDates(){
        
        var token = sessionStorage.getItem("user_token");

        var config = {
            headers : {
                'Authorization' : token,
            }
        }

        var data = {
            venueid : this.state.id,
        }

        Axios.post("http://localhost:3200/api/getVenueDates", data, config).then((response) => {
            if(response.data.success){
                this.setState({
                    dates : response.data.dates
                })
               
            }
        })
    }

    
    getBusinessDates(){
        
        var token = sessionStorage.getItem("user_token");

        var config = {
            headers : {
                'Authorization' : token,
            }
        }

        var data = {
            businessid : this.state.id,
        }

        Axios.post("http://localhost:3200/api/getBusinessDates", data, config).then((response) => {
            if(response.data.success){
                this.setState({
                    dates : response.data.dates
                })
            }
        })
    }
    

    componentDidMount(){

        var token = sessionStorage.getItem("user_token");

        var config = {
            headers : {
                'Authorization' : token,
            }
        }
        Axios.get("http://localhost:3200/api/getWeddingsByUser", config).then((response) => {
            if(response.data.success){
                this.setState({
                    weddings : response.data.weddings
                })
            }
        })
 
        if(this.state.type == "venue"){
           
            this.getVenueDates()
        }else if(this.state.type == "business"){
           
            this.getBusinessDates()
        }
    }

    handleSubmit(e){
        e.preventDefault();
       
        var weddingid = this.refs.wedding.value;
        var date = this.refs.dates.value;

        if(date == ""){
                this.setState({
                    error : "Select Date"
                })
        }else{

        if(this.state.type == "venue"){
        var venueid =  this.state.id;
            
        var data = {
            weddingid : weddingid,
            venueid : venueid,
            date : date,
            type : this.state.type
        }

        }else if(this.state.type == "business"){
            var businessid =  this.state.id;
            
            var data = {
                weddingid : weddingid,
                businessid : businessid,
                date : date,
                type : this.state.type
            }
        }
       
     

        var token = sessionStorage.getItem("user_token");

        var config = {
            headers : {
                'Authorization' : token
            }
        }

       Axios.post("http://localhost:3200/api/addBooking", data, config).then((res) => {
           if(res.data.success){
               this.setState({
                   success : res.data.message
               })
           }else{
            this.setState({
                error : res.data.message
            }) 
           }
       })
    }
    }

        render(){
            var weddings = this.state.weddings;
            weddings = weddings.map((value, index) => {
                return(
                    <option key = {index} value = {value._id}>
                        {value.groomName + " & " + value.brideName}
                    </option>
                )
            });

            var dates = this.state.dates;
            dates = dates.map((value, index) => {
                return(
                    <option key = {index}>
                        {value}
                    </option>
                )
            })
        return(
            <>
        <button className = "btn btn-danger  custom-btn mt-2 ml-2" onClick = {() => this.handleShow()}>Book This Venue</button>

                <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Bookings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className = {this.state.success == "" ? "alert alert-success m-2 d-none" : "alert alert-success m-2"}>{this.state.success}</div>
          <div className =  {this.state.error == "" ? "alert alert-danger m-2 d-none" : "alert alert-danger m-2"}>{this.state.error}</div>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className = "form-group row">
                    <label className = "col-md-4 col-4 col-sm-4 text-left">Wedding</label>
                    <div className = "col-md-8 col-lg-8 col-8 col-sm-8 ">
                    <select className = "form-control" ref = "wedding">
                    {weddings}
                </select>
                    </div> 
                </div>
             
                <div className = "form-group row">
                    <label className = "col-md-4 col-4 col-sm-4 text-left">Available Dates</label>
                    <div className = "col-md-8 col-lg-8 col-8 col-sm-8 ">
                    <select className = "form-control" ref = "dates">
                    {dates}
                </select>
                    </div>
                </div>
                <Button variant="success w-100" type = "submit">
            Book Now
          </Button>
            </form>
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
import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class ShowOneElement extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            name : this.props.name,
            image : this.props.image,
            id : this.props.id,
            type : this.props.type,
            weddingid : this.props.weddingid,

        }
    }

    handleDelete(){

        var id = this.state.id;
        var token = sessionStorage.getItem("user_token");
        var config = {
            headers : {
                'Authorization' : token
            }
        }


        if(this.state.type == "venues"){

            var data = {
                venueid : id,
                weddingid : this.state.weddingid
            }
            axios.post('http://localhost:3200/api/deleteBookingsVenue', data, config).then((res) => {
                window.location.reload();
               
            })

        }else{
            var data = {
                businessid : id,
                weddingid : this.state.weddingid
            }
            axios.post('http://localhost:3200/api/deleteBookingsBusiness' , data, config).then((res) => {
                window.location.reload();
            })
        }

       
    }

    render(){
        return(
            <div className = "row">
            <div className = "col-md-12 mt-2" >
            <Link to = {"/"+ this.state.type + "/" + this.state.id}>    <div className = "venues">
               <div className = "overlay">
               </div>
                 <img src = {"http://localhost:3200/public/images/" + this.state.image } className = "venues-img" />
                   <div className = "venue-details">
                        <h4 className = "text-center">{this.state.name}</h4>
                   </div>
           </div>
           </Link>
           <button className = "btn btn-danger mt-2" onClick = {() => this.handleDelete()}><span className = "fa fa-trash"></span></button>
   </div>
   </div>
        )
    }
}
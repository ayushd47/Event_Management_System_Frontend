import React from 'react'
import axios from 'axios';
import Nav  from '../../layouts/Headers/Nav';
import { Link } from 'react-router-dom';
import Footer from '../../layouts/Footer';
export default class Inventory extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            weddingsarray : []
        }
    }

    componentDidMount(){
        var token = sessionStorage.getItem("user_token");
        var config = {
            headers : {
                'Authorization' : token
            }
        }

        axios.get("http://localhost:3200/api/getWeddingsByUser", config).then((response) => {
            var dataarray = response.data.weddings;

            this.setState({
                weddingsarray : dataarray
            })
             
        })
    }

    render(){
        var weddingsarray = this.state.weddingsarray;
        weddingsarray = weddingsarray.map((value, index) => {
            return(
                <div className = "col-md-4 mt-5" key = {index}>
                 
                 <Link to = {"/wedding/" + value._id} className = "simple-link"> <div className = "content-div content-div-hoverable">
                       <span className = "text-left">{index + 1}<h6>{value.groomName +  " & " + value.brideName }</h6></span>
                    </div></Link>  
                </div>
            )
        })
        return(
            <div>
                   <Nav />
<div className = "container my-5 pb-5">
    <h4>Your Inventory</h4><hr></hr>
    <div className = "row">
    {this.state.weddingsarray.length == 0 ? <div className = "mt-5"><h4 className = "text-center"><i className = "fas fa-box-open"></i> Empty Inventory</h4></div> : weddingsarray}   
    </div>
</div>

<Footer />
            </div>
        )
    }
}
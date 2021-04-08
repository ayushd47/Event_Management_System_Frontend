
import React from 'react'
import Axios from 'axios';
import VendorNav from '../../../layouts/Headers/VendorNav';


export default class ShowBusinessBooking extends React.Component{



    constructor(){
        super()

        this.state = {
            bookingarray : []
    }
}

componentDidMount(){

    var token = sessionStorage.getItem("vendor_token");

    if(token != null){
        var config = {
            headers : {
                'Authorization' : token
            }
        }

        Axios.get("http://localhost:3200/api/getBusinessBookings", config).then((res) => {
            console.log(res)
           this.setState({
               bookingarray : res.data.data
           })
        })
    }


    
}
    render(){
        var bookingarray = this.state.bookingarray;
        bookingarray = bookingarray.map((value, index) => {
            return(
                <tr>
                    <td>{index +1}</td>
                    <td>{value.businessid.businessname}</td>
                    <td><img src = {"http://localhost:3200/public/images/"  + value.businessid.businessImage} style = {{weidth: "100%", height : "150px"}}/></td>
                    <td>{value.weddingid.groomName + " & " + value.weddingid.brideName }</td>
                    <td>{value.date}</td>
                    <td>{value.weddingid.userid.firstname   + " " +value.weddingid.userid.lastname}</td>
                </tr>
            )
        })
        return(
                  <div>
                <VendorNav />
                <div className = "container mt-8">
                    <h4>Bookings Table</h4><hr></hr>
                <table>
                    <tbody className = "table table-hover">
                        <tr>
                            <th>Sn</th>
                            <th>Business Name</th>
                            <th>Business Image</th>
                           
                            <th>Wedding Of</th>
                            <th>Booked Date</th>
                            <th>Booked By</th>
                        </tr>

                        {bookingarray}
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}
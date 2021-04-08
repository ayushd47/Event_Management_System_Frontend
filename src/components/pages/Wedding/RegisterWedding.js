import React from 'react'
import Nav from '../../layouts/Headers/Nav';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import Footer from '../../layouts/Footer';
export default class RegisterWedding extends React.Component{

    constructor(){
        super();

        this.state = {
            date : "",
            redirect : false,
            today : new Date()
        }
    }
    setRedirect(){
        this.setState({
            redirect : true
        })
    }

    handleRedirect(){
        if(this.state.redirect){
            return <Redirect to='/inventory' />
        }
    }

    handleSelectDate=(date)=>{
                var date =  new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
                  }).format(date)
        
                  
                  this.setState({ date: date })

                 
            }

            handleSubmit = (e) => {
                e.preventDefault();

                var date = this.state.date;
                var bridename = this.refs.bridename.value;
                var groomname = this.refs.groomname.value;

                var token = sessionStorage.getItem("user_token")
                
                    var data = {
                        bridename : bridename,
                        groomname : groomname,
                        date : date
                    }
                    var config  = {
                        headers: {
                            'Content-Type' : 'application/json',
                            'Authorization': token,
                          }
                    }

                    axios.post("http://localhost:3200/api/registerWedding", data , config).then((res) => {
                    if(res.data.success){
                        this.setRedirect()
                    }
                    console.log(res)
                    })
            

            }

    render(){
      
        var lastWeek = new Date(this.state.today.getFullYear(), this.state.today.getMonth(), this.state.today.getDate() - 7);

        return(<div>
            {this.handleRedirect()}
            <Nav />

            <div className = "container my-5">
            <div className = "content-div">
                <h5 className = "bold-title">Register Wedding</h5>
                <hr></hr>
                <div className = "row">
                <div className = "col-md-6 d-none d-md-block">
                    
                    <img src = {require("../../../assets/images/planning.jfif")} className = "w-100"/>
         
            </div>
            <div className = "col-md-6 col-12 col-sm-12">
                
                    <form onSubmit = {this.handleSubmit}>
                        <div className = "form-group">
                            <input className = "form-control" ref = "bridename" placeholder = "Bride's Fullname" required/>
                        </div>
                        <div className = "form-group">
                            <input className = "form-control" ref = "groomname" placeholder = "Groom's Fullname" required/>
                        </div>
                       <div className = "form-group">
                       <InfiniteCalendar
                                  width={500}
                               height={250}
                                rowHeight={70}
                           selected={this.state.today}
                             disabledDays={[0,6]}
                          minDate={lastWeek}
                           min={lastWeek}
                        onSelect = {(date) => this.handleSelectDate(date)}
                        displayOptions={{
                            showHeader: false
                          }}
                             />
                       </div>
                       <div className = "form-group">
                           <button className = "btn btn-primary w-100">Register Wedding</button>
                       </div>
                    </form>
                </div>
                </div>
                </div>
            </div>
            <Footer />
        </div>)
    }

}
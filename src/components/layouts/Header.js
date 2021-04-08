import React from 'react';
import Nav from './Headers/Nav'
import { Link } from 'react-router-dom';

class Header extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            location : "Kathmandu"
        }
    }

    handleChange(e){
        var location = e.target.value;

        this.setState({
            location : location
        })
    }

    render()
    {
    return(
        <div className = "header">
        <div className = "container">
                <div className = "header-title">
                        <div className = "row">
                            <div className = "col-xl-9 col-lg-8 col-md-12 col-sm-12 col-12">
                                
                                <h1 className = "title">
                                        <img src = {require('../../assets/images/weblogo.png')} className = "logo"/> 
                                        </h1>
                            </div>
                            <div className = "col-xl-3 col-lg-4 d-sm-none d-none d-md-none d-lg-block    ">
                                <div className = "website-details">
                                    <div className = "row">
                                        <div className = "col-md-5"><h6 className = "text-right">Contact Us :</h6></div>
                                        <div className = "col-md-7">9808438993</div>
                                    </div>
                                    <div className = "row">
                                            <div className = "col-md-5"><h6 className = "text-right">Address :</h6></div>
                                            <div className = "col-md-7">Kathmandu, Nepal</div>
                                        </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <Nav />
                 
                        </div>
                    </div>
            </div>


                    <div className = "header-img mt-3">
                        <div className = "search-box">
                            <h1 className = "text-center">Search For Wedding Venues</h1>
                            <h6 className = "text-center">Browse for 300+ wedding ceremony and event venues. </h6>
                            <div className = "search-form container mt-5">
                              
 
                                        <div className  = "form-row row">
                                          
                                            <div className = "col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                                                    <select className = "form-control search-control w-100" onChange = {this.handleChange.bind(this)}>
                                                            <option>Kathmandu</option>
                                                            <option>Pokhara</option>
                                                            <option>Godawari</option>
                                                            <option>Patan</option>
                                                            <option>Bhaktapur</option>
                                                        </select>
                                            </div>
                                              <div className = "col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <Link to = {{ pathname: '/search/' + this.state.location , query2 : "venues" }}><button className= "btn btn-search w-100">Search</button></Link>  
                                              </div>
                                            </div>
                                 
                                    
                             
                            </div>
                        </div>
                    </div>
          
</div>
    )
    }

}


export default Header;
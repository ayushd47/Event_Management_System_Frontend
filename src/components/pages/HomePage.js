import React from 'react';

import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ChooseUser from './HomePage/ChooseUser';
import TopVenues from './HomePage/TopVenues';
import StartPlanning from './HomePage/StartPlanning';
import RealCouples from './HomePage/RealCouples';
import Catgories from './HomePage/Categories';

class HomePage extends React.Component{


    constructor(){
        super();
        this.state = {
            venuesarray : [],

            //Storing token from sessionStroage to state
            token : sessionStorage.getItem("user_token")
        }
    }

    //Getting List of Venues To Display in the homepage
    componentDidMount(){
        axios.get("http://localhost:3200/api/getTopVenues").then((venues) => {

            this.setState({
                venuesarray : venues.data.venue
            })

        });
    }


    render()
    {
    return(
      <div>
          {/* Header Section */}
          <Header />
          {this.state.token == null ?
            <ChooseUser />
        
        : <Catgories />}
           

                {/* Top Venues List Component */}
                <div  id = "venues"></div>
                <TopVenues venues = {this.state.venuesarray} />

                {/* Start Wedding Planning Component */}
                <div  id = "planning"></div>
                <StartPlanning />

                    {/* RealCouples Component */}
                <div  id = "couples"></div>
                <RealCouples />

       <div  id = "app"></div>
       <div className = "section section-app">
           <div className ="container">
               <div className = "row">
                   <div className = "col-xl-6 col-lg-6 col-md-8 col-sm-12 col-12">
                        <div className="cta-section">
                                <h1 className="text-white">Get The Wedding App </h1>
                                <p className="mb40">Wedding planning app to get things done aenean non dui a nunc imperdie hendrerit vitae non nun estibulum metus elit.</p>
                               
                                {/* <a href="#"><img src="assets/images/play-store-icon.png" alt="" class="img-fluid"></a> */}
                            </div>
                   </div>
               </div>
           </div>
      
       </div>
       <Footer />
      </div>
    )
    }

}


export default HomePage;    
import React from 'react'
import { Link } from 'react-router-dom';


export default class TopVenues extends React.Component{


    constructor(props){
        super(props);
        
        this.state = {
            venuesarray : this.props.venues
        }

     
    }


    componentWillReceiveProps(nextProp) {
        
        if(nextProp.venues != this.state.venuesarray){
            this.setState({
                venuesarray : nextProp.venues
            })
        }

    }

    render(){
        
        var venuesarray = this.state.venuesarray;
        var data = venuesarray.map(function(value, index){
           return(
       <div className = "col-md-4 mt-5" key = {index}>
                   <Link to = {"venues/" + value.id}>    <div className = "venues">
                      <div className = "overlay">
                      </div>
                        <img src = {"http://localhost:3200/public/images/" + value.image } className = "venues-img" />
                          <div className = "venue-details">
                               <h4 className = "text-center">{value.name}</h4>
                          </div>
                  </div>
                  </Link>
          </div>
           )
     

       });
        return(
            <div className = "section section-venues bg-secondary">

            <div className = "section-title">
                <h2 className = "text-center">Top Venues</h2>
                <p className = "text-center section-title-secondary">Our Top Rated Wedding Venues</p>
            </div>
            <div className = "container">
                 <div className = "row">
                 {data}
                     </div>
                     <div className = "start-btn ">
                     <Link to = "/search/All"><button className = "btn btn-start w-100">View All</button></Link>
                    </div>
            </div>
    </div>
        )
    }

}
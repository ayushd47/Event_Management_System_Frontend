import React from 'react';

import axios from 'axios';
import  Nav  from '../layouts/Headers/Nav';
import ListView from '../layouts/ListStyle/ListView';
import GridView from '../layouts/ListStyle/GridView';

export default class SearchVenues extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            list : [],
            listStyle : 'list',
             
        }

    }
    componentDidMount(){
      
     
        if(this.props.match.params){
            var  location = this.props.match.params.searchquery;
            
            if (location == "All"){
                this.getAllVenues();
            }else{
                this.getVenuesByLocation(location);
            }
        }
        
       
    }

 
    getVenuesByLocation(location){  

            axios.get("http://localhost:3200/api/getVenuesByLocation/" + location).then((response) => {

            var dataarray = response.data.venue;

            this.setState({
                list : dataarray
            })
                console.log(response)
            })
        
    }

    handleListStyle = (style) =>{
        this.setState({
            listStyle : style
        })
    }

    getAllVenues = () =>{

        axios.get("http://localhost:3200/api/getVenues").then((response) => {
            var dataarray = response.data.venue;
            this.setState({
                list : dataarray
            })
        })

    }


    handleLocation = (e) =>{
        var location = e.target.value;

        if (location == "All"){
            this.getAllVenues();
        }else{
            this.getVenuesByLocation(location);
        }
      
    }

   

    handleSearch(e){
        e.preventDefault();

        var searchquery = this.refs.search.value;

        var data = {
            searchquery : searchquery
        }

        axios.post("http://localhost:3200/api/getVenuesBySearch", data).then((response) => {
            var dataarray = response.data.venue;
            this.setState({
                list : dataarray
            })
        })

    }

    render(){
        return(
            <>
            <Nav />
            <div className = "container-fluid mt-5">
                
                <div className = "row">
                    <div className = "col-md-4">
                        <div className = "content-div">
                            <h5>Search Filter</h5>
                            <hr></hr>

                            <div className = "row">
                                
                                <div className = "col-md-12 ">
                                    <form onSubmit = {this.handleSearch.bind(this)}>
                                <div className = "form-group pos-relative">
                
                <input className = "custom-loginform-control" type = "text"  onChange = {this.handleInpChange} ref  = "search" id = "search" placeholder = "Search"/>
                <button className = " mt-2 form-btn span-btn"><i class="fas fa-search"></i></button>
              
                </div>
                </form>
                 </div>
                            </div>
                            <div className = "row mt-3">
                                <div className = "col-md-4"><label className = "text-left">Location</label></div>
                                <div className = "col-md-8">
                                    <select className = "form-control w-100" onChange = {this.handleLocation}>
                                         <option>All</option>
                                        <option>Kathmandu</option>
                                        <option>Pokhara</option>
                                        <option>Godawari</option>
                                        <option>Bhaktapur</option>
                                        <option>Patan</option>
                                    </select>
                                </div>
                            </div>

                          

                        </div>
                    </div>
                    <div className = "col-md-8">
                        <div className = "content-div">
                          {/* ///</div> */}
                          <div className = "search-header">
                          <div className = "row">
                              <div className = "col-md-6">
                                    <h6>Search: {this.props.match.params.searchquery}</h6>
                              </div>
                              <div className = "col-md-6">
                              <span className = {this.state.listStyle == 'list' ? "fas fa-list view-style-icon color-active" : "fas fa-list view-style-icon"} onClick = {() => this.handleListStyle('list')}></span>
                                    <span className = {this.state.listStyle == 'grid' ? "fas fa-th-large view-style-icon color-active ml-3" : "fas fa-th-large view-style-icon ml-3"} onClick = {() => this.handleListStyle('grid')}></span>&nbsp;
    
                                  </div>
                          </div>
                          </div>
                             <hr></hr>
                             {this.state.listStyle == "list" ?
                              <ListView list = {this.state.list} search = "venues"/>
                            : 
                            <GridView list = {this.state.list} search = "venues"/>
                            }
                          
                         
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
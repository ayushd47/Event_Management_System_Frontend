import React from 'react';

import axios from 'axios';
import  Nav  from '../layouts/Headers/Nav';
import ListView from '../layouts/ListStyle/ListView';
import GridView from '../layouts/ListStyle/GridView';

export default class Category extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            list : [],
            listStyle : 'list',
      
        }

    }
    componentDidMount(){
              
        this.getBusinessByCategory();
    }

    getBusinessByCategory(){
        if(this.props.match.params){
            var  category = this.props.match.params.category;
          
            var data = {
                category : category
            }
             

            axios.post("http://localhost:3200/api/getBusinessByCategory", data).then((response) => {

            var dataarray = response.data.business;

            this.setState({
                list : dataarray
            })
                console.log(dataarray)
            })
        }  
    }

    
    handleListStyle = (style) =>{
        this.setState({
            listStyle : style
        })
    }



    handleLocation = (e) =>{
        var location = e.target.value;

        if (location == "All"){
            this.getBusinessByCategory();
        }else{
            var data = {
                location : location
            }
            axios.post("http://localhost:3200/api/getBusinessByLocation", data).then((response) => {
    
                var dataarray = response.data.business;
    
                this.setState({
                    list : dataarray
                })
                   
                })
        }
      
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
                                <div className = "col-md-4"><label className = "text-left">Location</label></div>
                                <div className = "col-md-6">
                                    <select className = "form-control" onChange = {this.handleLocation}>
                                         <option>All</option>
                                        <option>Kathmandu</option>
                                        <option>Pokhara</option>
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
                                    <h6>Category: {this.props.match.params.category}</h6>
                              </div>
                              <div className = "col-md-6">
                              <span className = {this.state.listStyle == 'list' ? "fas fa-list view-style-icon color-active" : "fas fa-list view-style-icon"} onClick = {() => this.handleListStyle('list')}></span>
                                    <span className = {this.state.listStyle == 'grid' ? "fas fa-th-large view-style-icon color-active ml-3" : "fas fa-th-large view-style-icon ml-3"} onClick = {() => this.handleListStyle('grid')}></span>&nbsp;
    
                                  </div>
                          </div>
                          </div>
                             <hr></hr>
                             {this.state.listStyle == "list" ?
                              <ListView list = {this.state.list} search = "business"/>
                            : 
                            <GridView list = {this.state.list} search = "business"/>
                            }
                          
                         
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}
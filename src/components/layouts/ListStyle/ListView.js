import React from 'react'
import { Link } from 'react-router-dom';


export default class ListView extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            list : this.props.list,
            search : this.props.search
        }
    }



    componentWillReceiveProps(nextProp) {
        
        if(nextProp.list != this.state.list){
            this.setState({
                list : nextProp.list,
                
            })
        }

    }

    render(){

        var list  = this.state.list;
        list = list.map((value, index)=>{
                return(
                 <>
                                    <div className = "col-md-4 mt-4"  key = {index}>
                                        <div className = "list-image">
                                            <img src = {"http://localhost:3200/public/images/" + value.image} />
                                        </div>
                                    </div>
                                    <div className = "col-md-4 mt-4">
                                            <div className = "list-details">
                                                <h4 className = "bold-title">{value.name}</h4>
                                                <h6 className = "text-left location-text"><span className = "fas fa-map-marker-alt"></span>&nbsp;{value.location.name}</h6> 
                                            </div>
                                    </div>
                                    <div className  = "col-md-4 mt-4 border-left">
                                        <div className = "list-action">
                                        <Link to = {"/" + this.state.search + "/" + value.id}>   <button className = "btn btn-primary w-100">
                                                    View 
                                                </button>
                                                </Link>
                                        </div>
                                    </div>
                             </> 
                )
        })

        return(
            <div className = "list-view">
            <div className = "row">
                 {list}
            </div>
            </div>
           
        )
    }
}
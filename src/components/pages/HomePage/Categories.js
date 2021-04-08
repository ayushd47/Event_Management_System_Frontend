import React from 'react'
import { Link } from 'react-router-dom'


export default class Catgories extends React.Component{


    render(){
        return(
            <div className = "section section-venues bg-secondary">
                
            <div className = "section-title">
                <h2 className = "text-center">Vendors by Categories</h2>
                <p className = "text-center section-title-secondary">Search for vendors by their category</p>
            </div>
            <div className = "container">
                 <div className = "row">
             <div className = "col-md-12  col-lg-4 mt-4">
               <Link to = {{ pathname: '/category/Photography', query : "business" }}> <div className = "content-div">
                    <div className = "feature-icon">
                    <i className = "icon-camera float-left"></i>   <h4 className = "text-center pt-3">Photography</h4>
                    </div>
                   
                </div></Link>
             </div>

             <div className = "col-md-12 col-lg-4 mt-4">
             <Link to = {{ pathname: '/category/Bakery', query : "business" }}>   <div className = "content-div">
                <div className = "feature-icon">
                    <i className = "icon-003-wedding-cake float-left"></i> <h4 className = "text-center pt-3">Bakery</h4>
                </div>
                </div></Link>
             </div>

             <div className = "col-md-12 col-lg-4 mt-4">
             <Link to = {{ pathname: '/category/Beauty Parlor', query : "business" }}><div className = "content-div">
                    <div className = "feature-icon">
                        <i className = "icon-makeup float-left"></i> <h4 className = "text-center pt-3">Beauty</h4>
                    </div>
                </div></Link>
             </div>
                     </div>
            </div>
    </div>
        )
    }
}
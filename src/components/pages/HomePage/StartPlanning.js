import React from 'react'
import { Link } from 'react-router-dom'


export default class StartPlanning extends React.Component{


    render(){
        return(
            <div className = "section section-planning">
            <div className = "section-title">
                    <h2 className = "text-center">Wedding Planning Tools</h2>
                </div> 
                <div className = "container">
                    <div className = "row">
                        <div className = "col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
                          <div className = "tool-icon-box">
                              <div className = "feature-icon">
                                    <i className="icon-wedding"></i>
                              </div>

                             <h6 className = "text-center">CheckList</h6>
                               
                          </div>  
                        </div>
                        <div className = "col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
                                <div className = "tool-icon-box">
                                    <div className = "feature-icon">
                                          <i className="icon-wedding-invitation"></i>
                                    </div>
      
                                   <h6 className = "text-center">Invitations</h6>
                                     
                                </div>  
                              </div>
                              <div className = "col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
                                    <div className = "tool-icon-box">
                                        <div className = "feature-icon">
                                              <i className="icon-wedding-dinner"></i>
                                        </div>
          
                                       <h6 className = "text-center">Foods</h6>
                                         
                                    </div>  
                                  </div>
                                  <div className = "col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
                                        <div className = "tool-icon-box">
                                            <div className = "feature-icon">
                                                  <i className="icon-camera"></i>
                                            </div>
              
                                           <h6 className = "text-center">Photos</h6>
                                             
                                        </div>  
                                      </div>
                                      <div className = "col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
                                            <div className = "tool-icon-box">
                                                <div className = "feature-icon">
                                                      <i className="icon-altar"></i>
                                                </div>
                  
                                               <h6 className = "text-center">Venue</h6>
                                                 
                                            </div>  
                                          </div>
                                          <div className = "col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
                                                <div className = "tool-icon-box">
                                                    <div className = "feature-icon">
                                                          <i className="icon-wedding-day"></i>
                                                    </div>
                      
                                                   <h6 className = "text-center">Date</h6>
                                                     
                                                </div>  
                                              </div>
                    </div>
                    <div className = "start-btn ">
                        <Link to = "/registerWedding" ><button className = "btn btn-start w-100">Start Planning</button></Link>
                    </div>
                </div>
       </div>
        )
    }

}
import React from 'react'


export default class RealCouples extends React.Component{

    render(){
        return(
            <div className = "section section-married-couples bg-secondary">
            <div className = "section-title">
                    <h2 className = "text-center">Married Couples</h2>
                </div> 
                <div className = "container">
                    <div className = "row">
                        <div className = "col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mt-3">
                            <div className = "married-couples-box">
                                    <div className = "married-couples-img">
                                        <img src = {require('../../../assets/images/married3.png')} className = "venues-img" />
                                    </div>
                                    <div className = "married-couples-details">
                                        <h4>Ram  &  Sita</h4>
                                        <span className="married-date">07 May, 2018</span>
                                        <span className="married-location ml-3 location-text">
                                                <i className="fas fa-map-marker-alt  p-2"></i>Kathmandu, Nepal</span>
                                    </div>
                            </div>
                        </div>
                        <div className = "col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mt-3">
                                <div className = "married-couples-box">
                                        <div className = "married-couples-img">
                                        <img src = {require('../../../assets/images/married1.jpg')} className = "venues-img" />
                                        </div>
                                        <div className = "married-couples-details">
                                            <h4>Hari  &  Laxmi</h4>
                                            <span className="married-date">07 Jan, 2018</span>
                                            <span className="married-location ml-3 location-text">
                                                    <i className="fas fa-map-marker-alt  p-2"></i>Kathmandu, Nepal</span>
                                        </div>
                                </div>
                            </div>
                            <div className = "col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mt-3">
                                    <div className = "married-couples-box">
                                            <div className = "married-couples-img">
                                                <img src = {require('../../../assets/images/married2.jpg')} className = "venues-img" />
                                            </div>
                                            <div className = "married-couples-details">
                                                <h4>Sam  &  Gita</h4>
                                                <span className="married-date">10 May, 2018</span>
                                                <span className="married-location ml-3 location-text">
                                                        <i className="fas fa-map-marker-alt  p-2"></i>Kathmandu, Nepal</span>
                                            </div>
                                    </div>
                                </div>
                    </div>
                </div>
       </div>
        )
    }
} 
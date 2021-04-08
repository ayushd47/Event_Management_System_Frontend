import React from 'react'
import { Link } from 'react-router-dom'


export default class ChooseUser extends React.Component{

    render(){
        return(
            <div id = "users">
            <div className = "section section-venues">
                <div className = "section-title">
                    <h2 className = "text-center">Which One Are You?</h2>
                    <p className = "text-center section-title-secondary">What type of user are you?</p>
                </div>
                <div className = "container">
                  <div className = "row">
                      <div className = "col-md-6 mt-5">
                         <Link to = "/login" className = "link-no-style"> <div className = "content-div usertype-content">
                              <div className = "usertype-img">
                              <img src = {require('../../../assets/images/boy.png')} />
                              </div>
                              <div className = "p-4">
                              <h3 className = "text-center">General User</h3>
                              </div>
                          </div></Link>
                      </div>
                      <div className = "col-md-6 mt-5">
                      <Link to = "/vendroslogin" className = "link-no-style">  <div className = "content-div usertype-content">
                          <div className = "usertype-img ">
                              <img src = {require('../../../assets/images/rich.png')} />
                              </div>
                              <div class = "p-4">
                              <h3 className = "text-center">Vendor</h3>
                              </div>
                             
                          </div></Link>
                      </div>
                  </div>
                </div>
            </div>
        </div>
        )
    }

}
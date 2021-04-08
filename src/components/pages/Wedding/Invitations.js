import React from 'react'
import Nav from '../../layouts/Headers/Nav';
import Footer from '../../layouts/Footer';
import Axios from 'axios';

export default class Invitations extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            loadingProgress : 0,
            invitationdata : []
        }
    }

    componentDidMount(){
        if(this.props.match.params){
            var weddingid = this.props.match.params.weddingid;

            var token = sessionStorage.getItem("user_token");
            var data = {
                weddingid : weddingid
            }
            var config = {
                headers : {
                    'Authorization' : token
                }
            }

            Axios.post("http://localhost:3200/api/getInvitations",  data, config).then((res) => {
                if(res.data.success){
                    this.setState({
                        invitationdata : res.data.invitationdata
                    })

                    console.log(res.data.invitationdata)
                }
            })
        }

    }


    handleSubmit(e){
        e.preventDefault();
        if(this.props.match.params){
            var weddingid = this.props.match.params.weddingid;

        
        var name = this.refs.gname.value;
        var email = this.refs.gemail.value;

        var data = {
            name : name,
            weddingid : weddingid,
            email : email,
        }

        var token = sessionStorage.getItem("user_token");

        var config = {
            headers : {
                'Authorization' : token
            }
        }
        this.setState({
            loadingProgress : 50
        })
        Axios.post("http://localhost:3200/api/addInvitation", data, config).then((res) => {
        
        var addinvitation = this.state.invitationdata.concat(res.data.invitationdata);

            if(res.data.success){
                this.setState({
                    loadingProgress : 100,
                    invitationdata : addinvitation
                })
               
            }
        })
    }

    }

    render(){
        var invitationdata = this.state.invitationdata;
        invitationdata = invitationdata.map((value, index) => {
           return(
            <i key = {index}>
           <h5>{value.name}</h5> 
                <h6 className = "font-italic">{value.email}</h6> 
                <hr></hr>   </i>
           )
        })

        return(
            <div>
                <Nav load = {this.state.loadingProgress} />
                
                <div className = "container mt-5 mb-5">
                    <div className = "row">
                        <div className = "col-md-4">
                            <div className = "content-div">
                                <h4 className = "font-italic">Guest List</h4>
                                <hr></hr>
                        {this.state.invitationdata.length == 0 ? "No Guests Invited":invitationdata}
                            </div>
                        </div>
                        <div className = "col-md-8 mb-5">
                            <div className = "content-div">
                                <h4 className = "">Add Invitation</h4>
                                <hr></hr>
                                <form onSubmit = {this.handleSubmit.bind(this)}>
                                    <div className = "form-group row">
                                        <label htmlFor = "Guest Name" className = "col-md-4 col-sm-4 text-left">Name</label>
                                        <div className = "col-md-8 col-sm-8 col-8">
                                            <input className = "form-control" type = "text" ref = "gname" placeholder = "Guest Name" required/>
                                        </div>
                                    </div>
                                    <div className = "form-group row">
                                        <label htmlFor = "Guest Email" className = "col-md-4 col-sm-4 text-left">Email</label>
                                        <div className = "col-md-8 col-sm-8 col-8">
                                            <input className = "form-control" type = "email" ref = "gemail" placeholder = "Guest Email" required/>
                                        </div>
                                    </div>

                                    <div className = "form-group">
                                       <button className = "btn btn-primary w-100">Invite</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>


                <Footer />
            </div>
        )
    }
}
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class Review extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            starhover : 0,
            commentdata : [],
            userRating: "", 
            replydata : [],
            useremail : null,
          
            empValue : "",
            venueid : this.props.venueid
        }
    }
    componentDidMount(){

        var  venueid = this.state.venueid;

        var data = {
             venueid : venueid
         }

         var token = sessionStorage.getItem("user_token");
         var useremail = sessionStorage.getItem("user_email");
         
         this.setState(
             {
                 token : token,
                 useremail : useremail
             }
         )
         var config  = {
             headers: {
                 'Authorization': token,
               }
         }

         //sending request to get the ratings if the token is not null
        if(token != null){
            axios.post("http://localhost:3200/api/getRatingByUser", data, config).then((response) => {
            if(response.data.success){
                this.setState({
                    userRating : response.data.rating.rating
                })
               
            }
                
            })
        }else{
            
        }
      
        
        this.getComments()

        axios.post("http://localhost:3200/api/getRating", data, config).then((res) => {

          if(res.data.success == true){
            if(res.data.rating.length != 0){
                this.setState({     
                    userRating : res.data.rating[0].rating
                })
            }else{
              
            }
          }else{

          }
           
        })
    }


    //Function to get the comments
    getComments(){
     
            var  venueid = this.state.venueid;

           var data = {
                venueid : venueid
            }

            axios.post("http://localhost:3200/api/getComments", data).then((res) => {
                       
                var dataarray = res.data.comments;
                
                    this.setState({
                        commentdata : dataarray,
                      
                       })

                      
        })
 
    
    }

    //Handleing Comment TextField Change
    handleCommentChange(event) {
        this.setState({empValue: event.target.value});
      }
  

      //Function to handle the submission of ratings
    hanldeRating(e){
       var rating = e.target.id;
        var token = sessionStorage.getItem("user_token");
        
        var  venueid = this.state.venueid;

        var data = {
            venueid : venueid,
            rating : rating
        }
        
        var config = {
            headers : {
                "Authorization" : token
            }
        }
        axios.post("http://localhost:3200/api/rateVenue", data, config ).then((response) => {
            
            this.setState({
                userRating : response.data.rating.rating
            })
            window.location.reload();
        })
        
    

    }

//Function to hanlde the submission of comments
    handleCommentSubmit(e){
        e.preventDefault();

        var comment = this.refs.comment.value;
        var  venueid = this.state.venueid;
        var token = sessionStorage.getItem("user_token");
         
        var data = {
            comment : comment,
            venueid : venueid
        }

        fetch("http://localhost:3200/api/addComment", {
            method : "post",
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : token
            },

        }).then(function(data) {
            return data.json();
           
       }).then(json => {
            var dataarray = json.comments;
            
            

           this.setState({
            commentdata : dataarray,
            empValue : ""
           })
          
        })
       

    }


    //Function to handle the deleting of comments
    handleDeleteComment = (commentId) => {
       
            var  venueid = this.state.venueid;
          
            var config = {
                 data : {
                    commentId : commentId,
                    venueid : venueid
                },
                headers : {
                    "Authorization" : this.state.token
                }
            }
          axios.delete("http://localhost:3200/api/deleteComment", config).then((res) => {
                       
            var dataarray = res.data.comments;
            console.log(dataarray)
                this.setState({
                    commentdata : dataarray
                   })
    })
 
    }

    //function to handle the reply to a comment

    handleReplySubmit(commentId){
       
      
            var  venueid = this.state.venueid;
            var reply = this.refs.reply.value;
        var  data = {
            commentId : commentId,
            venueid : venueid,
            reply : reply
        }
        var config = {
            headers : {
                "Authorization" : this.state.token
                }
        }
      

    
    axios.post("http://localhost:3200/api/addReply", data, config).then((res) => {
                       
        var dataarray = res.data.reply;
        this.setState({
            replydata : dataarray
           })
         
})
        }


        //Ratig star hover animations
        removestar(){
            this.setState({
                starhover : 0
            })
            
        }
        starAnimate(e){
            this.setState({
                starhover : e.target.id 
            })        
        }
s
        //end 


    render(){
        var commentdata = this.state.commentdata;
        var replydata = this.state.replydata;

        replydata = replydata.map((value, index) => {
            return(
                <>
            </>
            )
        })
        

        commentdata = commentdata.map((value, index) => {
            return(
                <div className = "container-fluid venue-comments mt-5" key = {index}><div className = "row">
                <div className = "col-2 col-md-2 col-lg-2 col-sm-2">
                <div className = " cmt-img">
                        <img src = {"http://localhost:3200/public/images/" + value.userid.profileImg} className = "cmt-profile-img" /> 

                </div>
            </div>
            <div className = "col-9 col-md-9 col-lg-9 col-sm-9">
                <div className = "cmt-details p-2">
                     <h6 className = "bold-title">{value.userid.firstname}</h6>
                        <p className = "text-justify">
                        {value.comment}
                        </p>
                    {/* Reply Comments */}
                      
                        {value.replies.map((repvalue, subindex) => {
                                return(
                                    <div className = "row mt-3">
                                     <div className = "col-1 col-md-1 col-lg-1 col-sm-1">
               
               <div className = "cmt-img cmt-reply-img">
                   <img src = {"http://localhost:3200/public/images/" + repvalue.id.userid.profileImg } className = "cmt-profile-img" /> 

           </div>
                                    </div>
                                
   
       <div className = "col-9 col-md-10 col-lg-10 col-sm-10">
           <div className = "cmt-details cmt-relpy-details p-2">
                <h6 className = "bold-title">{repvalue.id.userid.firstname}</h6>
                   <p className = "text-justify">
                   {repvalue.id.reply}
                   </p>
                               
           </div>
                           </div>
                           </div>
                                )
                        })
                    }
                      
                        {
                    (this.state.token != null) ? 

                    (this.state.useremail != value.userid.email) ?
                    <form onSubmit = {this.handleReplySubmit.bind(this, value._id)}>
                    <div className = "form-group pos-relative">
                
                    <input className = "custom-loginform-control" type = "text"  ref  = "reply" id = "reply" placeholder = "Reply"/>
                    <button className = "btn btn-primary mt-2 form-btn"><i class="fas fa-reply"></i></button>
                  
                    </div>
                    </form>
                    :
                        ""
                            :
                                ""
                                    }
                   
                </div>
               
            </div>
            {
                    (this.state.token != null) ? 

                    (this.state.useremail == value.userid.email) ?
                 
            <div className = "col-1 col-md-1 col-lg-1 col-sm-1">
               
                    <span className = "fa fa-trash" onClick = {() => this.handleDeleteComment(value._id)}></span><span> </span>
        
            </div>
            :
            ""

             :

             ""

             }
            </div>
            </div>
            )
        })

        return(
           <div className = "col-12 col-sm-12 col-md-8 col-lg-8 mt-5">
            <div className = "venue-view-body">
                {(sessionStorage.getItem("user_token") != null) ? 
                <div>
                <div className = "rating">
                <span className = "light-bold px-3">Your Ratings</span>

                    <span className = {this.state.starhover >= 1 || this.state.userRating >= 1? "fa fa-star star-orange" : "fa fa-star"} onClick = {this.hanldeRating.bind(this)} onMouseEnter = {this.starAnimate.bind(this)} onMouseOut = {this.removestar.bind(this)} id = "1"></span>
                    <span className = {this.state.starhover >= 2 || this.state.userRating >= 2 ? "fa fa-star star-orange" : "fa fa-star"} onClick = {this.hanldeRating.bind(this)} onMouseEnter = {this.starAnimate.bind(this)}  onMouseOut = {this.removestar.bind(this)} id = "2"></span>
                    <span className = {this.state.starhover >= 3 || this.state.userRating >= 3 ? "fa fa-star star-orange" : "fa fa-star"} onClick = {this.hanldeRating.bind(this)} onMouseEnter = {this.starAnimate.bind(this)} onMouseOut = {this.removestar.bind(this)} id = "3"></span>
                    <span className = {this.state.starhover >= 4 || this.state.userRating >= 4 ? "fa fa-star star-orange" : "fa fa-star"} onClick = {this.hanldeRating.bind(this)} onMouseEnter = {this.starAnimate.bind(this)} onMouseOut = {this.removestar.bind(this)}  id = "4"></span>
                    <span className = {this.state.starhover == 5 || this.state.userRating == 5? "fa fa-star star-orange" : "fa fa-star"} onClick = {this.hanldeRating.bind(this)} onMouseEnter = {this.starAnimate.bind(this)} onMouseOut = {this.removestar.bind(this)} id = "5"></span>

        </div>
    
            <div className = "venue-comment-form">
                <form onSubmit = {this.handleCommentSubmit.bind(this)}>
                    <textarea value = {this.state.empValue} onChange = {this.handleCommentChange.bind(this)} className = "venue-comment-control" ref = "comment" placeholder = "Write Your Comments"></textarea>
                
                <button className = "custom-btn btn-danger">Submit Comment</button>
                </form>
            </div>
            <div className = "venue-comment-section">
              <h5 className = "ligh-bold">Comments </h5><hr/>                            
                {commentdata}
             </div>

            </div>
            : 
            <div className = "alert alert-warning"><span className = "fas fa-exclamation-triangle"></span> &nbsp; You must <Link to = "/login">Login</Link>  to post reviews</div>
            }
                   
                  
            </div>
    </div> 
        )
    }
}
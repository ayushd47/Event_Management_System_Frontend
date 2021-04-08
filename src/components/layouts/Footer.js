import React from 'react';

class Footer extends React.Component{

    render(){
        return(
            <div className = "Footer">
                <footer className="page-footer font-small pink pt-4">

 
<div className="container-fluid text-center text-md-left p-5">

 
  <div className="row">
       <div className="col-md-6 mt-md-0 mt-3">

 
      <h5 className="text-uppercase font-weight-bold">Glossary</h5>
      <ul style = {{listStyle : "none", paddingLeft : "0px"}}>
       <li>About Us</li>
       <li>Privacy Policy</li>
       <li>Terms and Conditions</li>
     </ul>

    </div>
   
 
    <hr className="clearfix w-100 d-md-none pb-3" />

 
    <div className="col-md-6 mb-md-0 mb-3">

     
    <h5 className="text-uppercase font-weight-bold">Links</h5>
     <ul style = {{listStyle : "none", paddingLeft : "0px"}}>
       <li>Facebook</li>
       <li>Gmail</li>
       <li>Twitter</li>
     </ul>

    </div>
  

  </div>
 
</div>
 

 
<div className="footer-banner text-center py-3">© 2020 Copyright:
  <a href=""> WeddingBells.com</a>
</div> 

</footer>
            </div>
        )
    }

}

export default Footer;
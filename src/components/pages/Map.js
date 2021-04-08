import React from 'react';
import {withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker} from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import mapstyle from "../../assets/mapstyle";
import Leaflet from "leaflet";

//Setting the api key
Geocode.setApiKey("AIzaSyAaBx__3P4UG2uCp0CY5vN6ahjOYmsxa6Q");
Geocode.enableDebug();


export default class Map extends React.Component{

    constructor( props ){
        super( props );
        this.state = {
         address: '',
         err : false,

         //Initial mapposition taken from the props 
         mapPosition: {
          lat: this.props.center.lat,
          lng: this.props.center.lng
         },
         markerPosition: {
          lat: this.props.center.lat,
          lng: this.props.center.lng
      },
           
        }
       }


    componentDidMount(){
        Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
            response => {
             const address = response.results[0].formatted_address
             
           
             this.setState( {
              address: ( address ) ? address : '',
             
             } )
            },
            error => {
             console.error(error);
            }
           );
          }
    

          //Executes if the component updates 
    shouldComponentUpdate(nextProps, nextState){
        if(
            this.state.markerPosition.lat !== this.props.center.lat ||
            this.state.address !== nextState.address 
        ){
            return true;
        }else if(this.props.center.lat === nextProps.center.lat){
            return false;
        }
    }
  /** 
  * And function for city,state and address input
  * @param event
  */
    onChange = ( event ) => {
        this.setState({ [event.target.name]: event.target.value });
       };
      /**
        * This Event triggers when the marker window is closed
        *
        * @param event
        */
       onInfoWindowClose = ( event ) => {
      };

      onPlaceSelected(place){
         
        if(place.formatted_address == undefined){
           this.setState({
            address : "Kathmandu",
                err : true,
           })
           return;
        }else{
            const address = place.formatted_address,
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();
  
            this.props.onLocationChange({
              lat : latValue,
              lng : lngValue,
              address : address
            })
            
            this.setState({
                address : (address) ? address : '',
              err : false,
                markerPosition: {
                  lat: latValue,
                  lng: lngValue
                 },
                 mapPosition: {
                  lat: latValue,
                  lng: lngValue
                 },
                
            })
        }
            
       
        
          console.log(this.state.err)
      }



      //Google maps marker drag handle
      onMarkerDragEnd(event){

      

          let newLat = event.latLng.lat(),
          newLng = event.latLng.lng();
          
    
          Geocode.fromLatLng(newLat, newLng).then(
            response => {
             const address = response.results[0].formatted_address
             
           
             this.setState({
              address: ( address ) ? address : '',
             markerPosition : {
                lat: newLat,
                lng: newLng
             }
             })
             this.props.onLocationChange({
                lat : newLat,
                lng : newLng,
                address : this.state.address
            })
  
            },
            error => {
             console.error(error);
            }
           );
      }


      render(){
        
          const AsyncMap = withScriptjs(
              withGoogleMap(
                  props => (
                      
                      <GoogleMap google = {this.props.google}
                      defaultZoom = {this.props.zoom}
                      defaultCenter = {{ lat : this.state.mapPosition.lat,
                                         lng : this.state.mapPosition.lng
                                        }}
                                        defaultOptions = {{styles : mapstyle}}
                                        >
                        <Autocomplete
                        style = {{
                            width : '100%',
                            height : '40px',
                            paddingLeft : '16px',
                            marginTop : '20px',
                            marginBottom : '100px'
                        }}
                        
                        onPlaceSelected = {this.onPlaceSelected.bind(this)}
                       
                        className = {['form-control']}
                        type = {['(regions)']}
                        />
                        <Marker google = {this.props.google}
                        name = {'Dolores Park'}
                        draggable = {true}
                      
                        onDragEnd = {this.onMarkerDragEnd.bind(this)}
                        position = {{lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng}}
              
                       >

                        </Marker>
                        <InfoWindow
                        onClose = {this.onInfoWindowClose}
                        position = {{lat : this.state.markerPosition.lat + 0.0018, lng : this.state.markerPosition.lng}}
                        >
                            <div>
                                <span style = {{padding : 0, margin : 0}}>{this.state.address}</span>
                            </div>
                        </InfoWindow>
                                        </GoogleMap>
                  )
              )
          );

          let map;
          if(this.props.center.lat !== undefined){
              map = <div>
                  <div>
                      <div className = {this.state.err == true ? "alert alert-danger" : "alert alert-danger d-none"}>Invalid Location!</div> 
                     <div className = "form-group">
                          <label htmlFor = "">Address</label>
                          
                          <input type = "text" name = "address" className = "form-control" onChange = {this.onChange}
                          readOnly = "readOnly" value = {this.state.address}/>
                      </div>
                  
                  </div>
                  <AsyncMap
                   googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAaBx__3P4UG2uCp0CY5vN6ahjOYmsxa6Q&libraries=geometry,places"
                   loadingElement = {
                       <div style = {{ height : `100%`}}/>
                   }
                   containerElement={
                    <div style={{ height: this.props.height }} />
                   }
                   mapElement={
                    <div style={{ height: `100%` }} />
                   }
                  />
              </div>
          }else{
              map = <div style = {{height : this.props.height}}/>
          }
          return(map)
      }


}
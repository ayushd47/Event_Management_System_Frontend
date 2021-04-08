import React from 'react';
import {withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker} from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import mapstyle from "../../../assets/mapstyle";
import Leaflet from "leaflet";

Geocode.setApiKey("AIzaSyAaBx__3P4UG2uCp0CY5vN6ahjOYmsxa6Q");
Geocode.enableDebug();

export default class LatLngMap extends React.Component{

    constructor( props ){
        super( props );
        this.state = {
         address: '',
         err : false,

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

   
        async  componentWillReceiveProps(nextProp) {
             if(nextProp.center.lat != this.state.mapPosition.lat && nextProp.center.lng != this.state.mapPosition.lng){
                
                var lat = parseFloat(nextProp.center.lat);
                var lng = parseFloat(nextProp.center.lng);

                this.setState({
                    mapPosition: {
                        lat: lat,
                        lng: lng
                       },
                       markerPosition: {
                        lat: lat,
                        lng: lng
                    }
                 })
                 Geocode.fromLatLng( lat ,  lng ).then(
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
                    
                          <Marker google = {this.props.google}
                          name = {'Dolores Park'}
                          draggable = {false}
                        
                          
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
                       <div className = "form-group">
                            <label htmlFor = "">Address</label>
                            
                            <input type = "text" name = "address" className = "form-control" onChange = {this.onChange}
                            readOnly = "readOnly" value = {this.state.address}/>
                        </div>
                    
                    </div>
                    <AsyncMap
                     googleMapURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAaBx__3P4UG2uCp0CY5vN6ahjOYmsxa6Q"
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


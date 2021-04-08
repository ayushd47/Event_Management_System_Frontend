import React from "react";

import Map from "../../Map";
import {Link} from "react-router-dom";
import  CanvasJSReact  from "../../../../assets/scripts/canvasjs.react";
import VendorNav from "../../../layouts/Headers/VendorNav";
export default class VendorDashboard extends React.Component{
   
   
render(){
    var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    const options = {
        theme: "light2",
        title: {
            text: "Stock Price of NIFTY 50",
            fontSize: 20,
        },  
        axisY: {
            title: "Closing Price (in EUR)",
            includeZero: false,
            valueFormatString: "€##0.00",
            crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function(e) {
                    return "€" + CanvasJS.formatNumber(e.value, "##0.00");
                }
            },
           
        },
        data: [{
   
            type: "area",
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "$#,##0.00",
            dataPoints:  [
                { label: "Apple",  y: 10  },
                { label: "Orange", y: 15  },
                { label: "Banana", y: 25  },
                { label: "Mango",  y: 30  },
                { label: "Grape",  y: 28  }
            ]
        }]
    }
    const options2 = {
        animationEnabled: true,
        title: {
            text: "Customer Satisfaction"
        },
        subtitles: [{
            text: "71% Positive",
            verticalAlign: "center",
            fontSize: 24,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###'%'",
            dataPoints: [
                { name: "Unsatisfied", y: 5 },
                { name: "Very Unsatisfied", y: 31 },
                { name: "Very Satisfied", y: 40 },
                { name: "Satisfied", y: 17 },
                { name: "Neutral", y: 7 }
            ]
        }]
    }

    return(

        <div>
            <VendorNav />
          
            <div className = "container-fluid c-mt-4">
                <div className = "row">
                    <div className = "col-md-6">
                    <Link to = "/vendor/home">
                        <div className = "content-box w-100">
                   <h6 className = "bold-title">Venues</h6>
               </div>
               </Link>
                    </div>
               
                    <div className = "col-md-6">
                    <Link to = "/vendor/showBookings">
                    <div className = "content-box  w-100">
                   <h6 className = "bold-title">Bookings</h6>
                   
               </div></Link>
                    </div>
                </div>
               <div className = "row">
                   <div className = "col-md-6">
   <div className = "content-box  w-100">
                    <CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
                     </div>
                   </div>
                   <div className = "col-md-6">
   <div className = "content-box  w-100">
                    <CanvasJSChart options = {options2} 
				 onRef={ref => this.chart = ref}
			/>
                     </div>
                   </div>
               </div>
                 
                
       
               
          </div>
        </div>
     
       
    )
}

}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Platform} from "ionic-angular";

import { AuthService } from '../../providers/auth-service/auth-service';
import {

  
  GoogleMapsEvent,
  MarkerCluster,
  Marker,
  GoogleMap
} from "@ionic-native/google-maps";

declare var google: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
@ViewChild('map') mapElement: ElementRef;
boolean= false
markers=[]
markerCluster: any;
locations: any;
data: any;
map: any;
position:any

  constructor(public navCtrl: NavController,private geolocation:Geolocation,public authService: AuthService, public http: Http,    public platform: Platform  ) {
    this.locations = [];

  }
  getMarkers() {
    this.http.get('assets/data/markers.json')
    .map((res) => res.json())
    .subscribe(data => {
      this.addMarkersToMap(data)
    })
 
  ;
  }

  addMarkersToMap(markers) {
   
    for(let marker of markers) {
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var dogwalkMarker = new google.maps.Marker({position: position, name: marker.name, icon: marker.icon});
      dogwalkMarker.setMap(this.map);
    }
  }
geo(){
  this.geolocation.getCurrentPosition().then((resp) => {
    resp.coords.latitude
    resp.coords.longitude
   }).catch((error) => {
     console.log('Error getting location', error);
   });
   
   let watch = this.geolocation.watchPosition();
   watch.subscribe((data) => {
    data.coords.latitude
    data.coords.longitude
   });
}

ionViewDidLoad(){
 this.loadMap();

}
loadMap(){
 
  this.geolocation.getCurrentPosition().then((position)=>{
    
    let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    let mapOptions={
      center: latlng,
      zoom:8,
      scrollwheel: true,
            streetViewControl: true,
            zoomControl: true,
            keyboardShortcuts : false,
            draggable:true,

      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map =new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }, (err) =>{
    console.log(err)
  });

}


addMarker(){

if(this.boolean== false){
  this.boolean= true
    let image: "../assets/icon/mpo.png"
   
     let marker= new google.maps.Marker({
      mapp:this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      icon: image
      
    });
    let content="<h5> Vous êtes ici </h5> ";

    this.addInfoWindow(marker, content);
  }
  else{
   document.getElementById('pos').style.display ="block";
    }
 
    
}
addInfoPosition(content){

}


addInfoWindow(marker, content){
  let infoWindow= new google.maps.InfoWindow({
    content:content
  });
  google.maps.event.addListener(marker, 'click', () =>{
    infoWindow.open(this.map, marker)
  })
}

reload(){
  location.reload();

 
   
    


}
poshide(){
  document.getElementById('pos').style.display ="none";
}
  features = [
    {
      position: new google.maps.LatLng(-42.6657911, 2.91656),
      type: 'culture'
    }, {
      position: new google.maps.LatLng(-42.8147645, 2.74728),
      type: 'culture'
    }, {
      position: new google.maps.LatLng(- 42.5282041,  2.39879),
      type: 'boutique'
    }, {
      position: new google.maps.LatLng(-43.2997678, 3.412993),
      type: 'sport'
    }, {
      position: new google.maps.LatLng(-42.577154, 3.035382),
      type: 'culture'
    }, {
      position: new google.maps.LatLng(-42.5767127,3.035740),
      type: 'culture'
    }, {
      position: new google.maps.LatLng(-42.5761422, 3.035143),
      type: 'culture'
    }, {
      position: new google.maps.LatLng(-42.5755271, 3.036939),
      type: 'restaurant'
    }
  ]


 icons={
 culture:{
   icon: "assets/icons/museum.svg"
 },
 sport:{
  icon: "assets/icons/gym.svg"
},
boutique:{
  icon: "assets/icons/department-store.svg"

},
restaurant:{
  icon:  "assets/icons/food.svg"

}
}
 addMarkers(feature) {
  console.log(feature.position)

  var marker = new google.maps.Marker({
    position: feature.position,
    icon: this.icons[feature.type].icon,
    map: this.map
  });
 
  console.log(this.position)


}
}


import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
@ViewChild('map') mapRef: ElementRef;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
 
  }

geo(){
  this.geolocation.getCurrentPosition().then((resp) => {
    // resp.coords.latitude
    // resp.coords.longitude
   }).catch((error) => {
     console.log('Error getting location', error);
   });
   
   let watch = this.geolocation.watchPosition();
   watch.subscribe((data) => {
    // data can be a set of coordinates, or an error (if an error occurred).
    // data.coords.latitude
    // data.coords.longitude
   });
}

ionViewDidLoad(){
 this.showMap();
}
showMap(){
  const location = new google.maps.LatLng(510507351, -0.127758);

  const options={
    center: location,
    zoom:2
  }
  const map= new google.maps.Map(this.mapRef.nativeElement,
  options);
    this.geo()
    this.addMarker(location, map)
   
}



addMarker(position, map){
return new google.maps.Marker({
  position,
  map
})
}
}

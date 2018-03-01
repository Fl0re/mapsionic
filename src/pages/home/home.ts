import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
@ViewChild('map') mapElement: ElementRef;
map: any;

  constructor(public navCtrl: NavController,private geolocation:Geolocation) {
 
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
      zoom:15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map =new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }, (err) =>{
    console.log(err)
  });

}

addMarker(){
  let marker= new google.maps.Marker({
    map:this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
  let content="<h5> Ma position </h5> ";
  this.addInfoWindow(marker, content);
}

addInfoWindow(marker, content){
  let infoWindow= new google.maps.InfoWindow({
    content:content
  });
  google.maps.event.addListener(marker, 'click', () =>{
    infoWindow.open(this.map, marker)
  })
}
}

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
boolean= false
markers=[]

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
      zoom:10,
      scrollwheel: true,
            streetViewControl: true,
            zoomControl: true,
            keyboardShortcuts : false,
            draggable:false,

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
      map:this.map,
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
}

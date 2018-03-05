import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import{TabsPage} from '../pages/tabs/tabs'
import { HomePage } from '../pages/home/home';
import { CartePage } from '../pages/carte/carte';
import { ConnexionPage } from '../pages/connexion/connexion';
import { AuthService } from '../providers/auth-service/auth-service';
@NgModule({
  declarations: [
    MyApp,
   TabsPage,
   HomePage,
   CartePage,
   ConnexionPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    CartePage,
    ConnexionPage

    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}

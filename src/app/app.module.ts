import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DadosService } from './servicos/dados.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({                                                           //module = recursos avançados (pega de um local e traz pra cá)
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [                                                        //providers = pega infos do próprio projeto (componente)
    StatusBar,
    SplashScreen,
    DadosService,   //BD virtual
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}   //com 'class' não importa a ordem dos imports

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomDetailComponent } from './room/room-detail/room-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { GioithieuComponent } from './components/gioithieu/gioithieu.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ServicesComponent } from './components/services/services.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { FormsModule } from '@angular/forms';
import { RegistersComponent } from './components/registers/registers.component';
import { 
          HttpClientModule,
          HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './interceptors/token.interceptor';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
//import { PopoverComponent } from './popover/popover.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomDetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    GioithieuComponent,
    RoomsComponent,
    ServicesComponent,
    NewsComponent,
    ContactComponent,
    OrderComponent,
    LoginComponent,
    RegisterComponent,
    OrderConfirmComponent,
    RegistersComponent,
    UserProfileComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

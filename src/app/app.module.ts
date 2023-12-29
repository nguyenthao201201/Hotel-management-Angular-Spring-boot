import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomDetailComponent } from './room/room-detail/room-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { GioithieuComponent } from './gioithieu/gioithieu.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ServicesComponent } from './services/services.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { FormsModule } from '@angular/forms';
import { RegistersComponent } from './registers/registers.component';
import { 
          HttpClientModule,
          HTTP_INTERCEPTORS } from '@angular/common/http';

import { TokenInterceptor } from './interceptors/token.interceptor';

import { ReactiveFormsModule } from '@angular/forms';

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
    RegistersComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
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

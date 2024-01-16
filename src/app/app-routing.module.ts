import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GioithieuComponent } from './components/gioithieu/gioithieu.component';
import { HomeComponent } from './components/home/home.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { NewsComponent } from './components/news/news.component';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
//import { RegistersComponent } from './components/registers/registers.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { OrderAdminComponent } from './components/admin/order.admin/order.admin.component';
//import { HomeComponent } from './home/home.component';

// Kết hợp cả hai tuyến đường vào một mảng duy nhất
const routes: Routes = [
  { path: 'rooms', component: RoomsComponent },
  { path: 'home', component: HomeComponent},
  { path: 'about', component: GioithieuComponent},
  { path: 'rooms', component:RoomsComponent},
  { path: 'services', component:ServicesComponent},
  { path: 'news', component:NewsComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'booking', component:OrderComponent},
  { path: 'confirm', component:OrderConfirmComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'login', component:LoginComponent},
  //{ path: 'registers', component:RegistersComponent},
  { path: 'user-profile', component:UserProfileComponent},
  { path: 'admin', component:AdminComponent},
  { path: 'order-admin', component:OrderAdminComponent},

  // { path: 'admin', component: AdminComponent, canActivate:[AdminGuardFn] }, // check quyền admin mới được truy cập
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Sử dụng mảng tuyến đường đã kết hợp
  exports: [RouterModule]
})
export class AppRoutingModule { }

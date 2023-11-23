import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GioithieuComponent } from './gioithieu/gioithieu.component';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component';
// import { HomeComponent } from './home/home.component';

// Kết hợp cả hai tuyến đường vào một mảng duy nhất
const routes: Routes = [
  { path: 'rooms', component: RoomsComponent },
  { path: 'home', component: HomeComponent},
  { path: 'about', component: GioithieuComponent},
  { path: 'rooms', component:RoomsComponent},
  { path: 'services', component:ServicesComponent},
  { path: 'news', component:NewsComponent},
  { path: 'contact', component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Sử dụng mảng tuyến đường đã kết hợp
  exports: [RouterModule]
})
export class AppRoutingModule { }

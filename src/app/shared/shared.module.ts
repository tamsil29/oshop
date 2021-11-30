import { ShoppingModule } from './../shopping/shopping.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminAuthGuardService } from '../admin/services/admin-auth-guard.service';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailComponent,
  ],
  imports: [
    FormsModule,
    ShoppingModule,
    CommonModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forChild([
      {path: 'order-detail/:id', component: OrderDetailComponent, canActivate: [ AuthGuardService ]},
    ])
  ],
  exports:[
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  providers:[
    AuthService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
})
export class SharedModule { }

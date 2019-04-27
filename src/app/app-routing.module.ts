import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListProductsComponent} from './components/list-products/list-products.component';
import {InsertProductsComponent} from './components/insert-product/insert-product.component';
import { InsertUsersComponent } from './components/insert-user/insert-user.component';
import { LoginUsersComponent } from './components/login-user/login-user.component';
import { DetailsProductsComponent } from './components/details-products/details-productscomponent';

const routes: Routes = [
  {
    path: 'products',
    component: ListProductsComponent
  },
  {
    path: 'products/:id',
    component: DetailsProductsComponent
  },
  {
    path: 'products-add/:id',
    component: InsertProductsComponent
  },
  {
    path: 'register',
    component: InsertUsersComponent
  },
  {
    path: 'login',
    component: LoginUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DetailsProductsComponent } from './components/details-products/details-productscomponent';
import { InsertProductsComponent } from './components/insert-product/insert-product.component';
import { InsertUsersComponent } from './components/insert-user/insert-user.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { LoginUsersComponent } from './components/login-user/login-user.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    DetailsProductsComponent,
    InsertProductsComponent,
    InsertUsersComponent,
    ListProductsComponent,
    LoginUsersComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        // throwNoTokenError: true,
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.api_url_sin_protocolo],
        // blacklistedRoutes son rutas que no queremos inyectar el bearer token
        blacklistedRoutes: [
          environment.api_url_sin_protocolo + '/login/',
          environment.api_url_sin_protocolo + '/sendResetLinkEmail',
        ],
      },
    }),
    AngularFontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

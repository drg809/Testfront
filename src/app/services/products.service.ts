import { Product } from './../class/product';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public static editProductId: number;
  public static editSellerId: number;
  url: string;
  constructor(private http: HttpClient, private router: Router) {
    this.url = environment.api_url;
  }

  public getProducts(page: number, perPage: number) {
    const url = environment.api_url;
    const urlPeticion =
      url + '/products?page=' + page + '&per_page=' + perPage;
    return this.http.get(urlPeticion);
  }

  public deleteProduct(product_id: number) {
    const urlPeticion =
      this.url + '/products/' + product_id;
    return this.http.delete(urlPeticion);
  }

  public getProduct(product_id: number) {
    const urlPeticion =
      this.url + '/products/' + product_id;
    return this.http.get(urlPeticion);
  }

  public updateProduct(product: Product) {
    const url = environment.api_url;
    const id = product.product_id;
    // Limpiamos el product de nulls
    const productObject: any = product;
    for (const varName in productObject) {
      if (
        productObject[varName] == null ||
        productObject[varName].toString().trim() === ''
      ) {
        delete productObject[varName];
      }
    }
    const url_peticion = url + '/products/' + id;
    const peticion = this.http.put(url_peticion, productObject);
    return peticion;
  }

  public createProduct(product: Product) {
    const url = environment.api_url;
    product.seller_id = localStorage.getItem('id');
    const productObject: any = product;
    const uploadData = new FormData();

    for (const varName in productObject) {
      if (
        !(
          productObject[varName] == null ||
          productObject[varName].toString().trim() === ''
        )
      ) {
        uploadData.append(varName, productObject[varName]);
      }
    }
    const url_peticion = url + '/products';
    const peticion = this.http.post(url_peticion, uploadData);

    return peticion;
  }
}
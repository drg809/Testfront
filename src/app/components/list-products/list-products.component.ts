import { Component, OnInit } from '@angular/core';
import {Product} from '../../class/product';
import {ProductsService} from '../../services/products.service';
import {Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  // array donde almacenaremos la lista de products
  public listProducts: Array<Product>;
  private subscription: Subscription;
  totalProducts: number;
  public pager: any;
  headElements:any;
  constructor(private router: Router, private serviceProducts: ProductsService) {
    this.cargarPagina(1, 10);
    this.pager;
  }
  userId = localStorage.getItem('id');
  private cargarPagina(page: number, perPage: number) {
    // Si por ejemplo hemos pulsado en la página 2 y mientras carga pedimos la página 3
    // pues destruimos esa suscripcion y nos quedamos siempre con la más nueva
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.serviceProducts
      .getProducts(page, perPage)
      .subscribe(
        (data: any) => {
          this.subscription.unsubscribe();

          this.listProducts = data.data;
          this.headElements = ['ID', 'Producto', 'Precio', 'Vendedor','Opciones'];
          this.pager = {
            first: data.links.first,
            last: data.links.last,
            next: data.links.next,
            prev: data.links.prev,
            meta: data.meta
          };
        },
        (error: any) => {
          this.subscription.unsubscribe();
          alert('Ha habido un error con la petición');
        }
      );
  }

  ngOnInit() {
  }

  deleteProduct(productId: number) {
    // console.log('eliminamos product');
    // console.log('id product -> ' + productId);
    if (confirm('Esta seguro de que quiere eliminar al product?' + productId)) {
      this.serviceProducts.deleteProduct(productId).subscribe(
        (data: any) => {
          this.listProducts = data.data;
          console.log('respuesta servidor');
          console.log(data);
        },
          error => {
            switch(error.status){
              case 401:
                alert('Debe logearse para borrar un producto');
                break;
              case 422:
                alert(error.error.error.message);
                break;
              default:
                alert('Error');
            }
          }
      );
    }
  }
  detailsProduct(productId: number) {
    // console.log('modificar product');
    // console.log('id product -> ' + productId);
    this.router.navigate(['products', productId]);
  }
  updateProduct(productId: number) {
    // console.log('modificar product');
    // console.log('id product -> ' + productId);
    this.router.navigate(['products-add', productId]);
  }
}

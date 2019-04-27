import {Component, OnInit} from '@angular/core';
import {Product} from '../../class/product';
import {ProductsService} from '../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrls: ['./insert-product.component.css']
})
export class InsertProductsComponent implements OnInit {
  public product: Product;
  public textBtn: string;

  constructor(private productService: ProductsService, private router: Router, private route: ActivatedRoute) {
    this.product = new Product();
    this.textBtn = 'Añadir Producto';
  }

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    if (productId !== '-1') {
      this.textBtn = 'Modificar Producto';
      this.productService.getProduct(productId).subscribe((data: any) => {
        this.product = data.data;
      });
    }
  }

  onSubmit(product: Product) {
    // MODIFICA
    if (this.product.product_id) {
      product.product_id = this.product.product_id;
      this.productService.updateProduct(product).subscribe((data: any) => {
          this.router.navigate(['/products']);
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
    } else {
      // INSERTA
      this.productService.createProduct(product).subscribe((data: any) => {
          if (data.hasOwnProperty('data')) {
            alert('Producto añadido correctamente');
            this.router.navigate(['/products']);
          } else {
            alert('Error al añadir');
          }
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
}

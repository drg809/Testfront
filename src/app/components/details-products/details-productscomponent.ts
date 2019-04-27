import { Component, OnInit } from '@angular/core';
import {Product} from '../../class/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-details-products',
  templateUrl: './details-products.component.html',
  styleUrls: ['./details-products.component.css']
})
export class DetailsProductsComponent implements OnInit {
  public product: Product;
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductsService) {
    this.product = new Product();
  }
  
  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    this.productService.getProduct(productId).subscribe((data: any) => this.product = data.data);
  }
  userId = localStorage.getItem('id');
  deleteProduct(productId: number) {
    // console.log('eliminamos product');
    // console.log('id product -> ' + productId);
    if (confirm('Esta seguro de que quiere eliminar al product?' + productId)) {
      this.productService.deleteProduct(productId).subscribe((data: any) => {
        console.log('Respuesta servidor');
        console.log(data);
        if (data.result === 'OK') {
          this.router.navigate(['/products']);
        } else {
          alert('No se pudo borrar el product');
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
      });
    }
  }

}

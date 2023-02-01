import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  isAdmin: any;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {

  }

  ngOnInit() {
    this.getProducts();
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture',  'actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts(){
    this.productService.getProducts()
        .subscribe( (data:any) => {
          console.log("respuesta de productos: ", data);
          this.processProductResponse(data);
        }, (error: any) => {
          console.log("error en productos: ", error);
        })
  }

  processProductResponse(resp: any){
    const dateProduct: ProductElement[] = [];
     if( resp.metadata[0].code == "00"){
       let listCProduct = resp.product.products;

       listCProduct.forEach((element: ProductElement) => {
         element.category = element.category.name;
         element.picture = 'data:image/jpeg;base64,'+element.picture;
         dateProduct.push(element);
       });

       //set the datasource
       this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
       this.dataSource.paginator = this.paginator;
     }
  }

   buscar(name: any){
    if ( name.length === 0){
      return this.getProducts();
    }

    this.productService.getProductByName(name)
        .subscribe( (resp: any) =>{
          this.processProductResponse(resp);
        })
  }

}

export interface ProductElement {
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;
}

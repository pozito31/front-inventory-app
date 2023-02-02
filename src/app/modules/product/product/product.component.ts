import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewProductComponent } from '../new-product/new-product.component';

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

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'picture',  'actions'];
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

  openProductDialog() {
    const dialogRef = this.dialog.open(NewProductComponent , {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if( result == 1){
        this.openSnackBar("Producto Agregado", "Exitosa");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar producto", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
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

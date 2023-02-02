import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * get all the products
   */
  getProducts(){
    const endpoint = `${ base_url}/products`;
    return this.http.get(endpoint);
  }

  /**
   * save the product
   */
  saveProduct(body: any){
    const endpoint = `${ base_url}/products`;
    return this.http.post(endpoint, body);
  }

  /**
   * update product
   */
  updateProduct (body: any, id: any){
    const endpoint = `${ base_url}/products/ ${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * delete product
   */
  deleteProduct(id: any){
    const endpoint = `${ base_url}/products/ ${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * search by name
   */
  getProductByName(name: any){
    const endpoint = `${ base_url}/products/filter/${name}`;
    return this.http.get(endpoint);
  }

}

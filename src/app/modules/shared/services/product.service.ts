import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(){
    const endpoint = `${ base_url}/products`;
    return this.http.get(endpoint);
  }

  getProductByName(name: any){
    const endpoint = `${ base_url}/products/filter/${name}`;
    return this.http.get(endpoint);
  }

  saveProduct(body: any){
    const endpoint = `${ base_url}/products`;
    return this.http.post(endpoint, body);
  }

  updateProduct (body: any, id: any){
    const endpoint = `${ base_url}/products/ ${id}`;
    return this.http.put(endpoint, body);
  }
}

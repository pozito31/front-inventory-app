import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }

  /**
   * get all categories
   */
  getCategories(){

    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);

  }

  /**
   * save the categories
   */
  saveCategorie(body: any) {
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, body);
  }

  /**
   * update categorie
   */
  updateCategorie(body: any, id: any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   * update categorie
   */
  deleteCategorie(id: any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.delete(endpoint);
  }

  /**
   * update categorie
   */
  getCategorieById(id: any){
    const endpoint = `${base_url}/categories/ ${id}`;
    return this.http.get(endpoint);
  }

  /**
   * export excel categories
   */
  exportCategories(){
    const endpoint = `${base_url}/categories/export/excel`;
    return this.http.get(endpoint, {
      responseType: 'blob'
    });
  }
}

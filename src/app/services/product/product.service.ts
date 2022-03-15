import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

export interface IProduct{
  id?: number,
  active?: boolean,
  categoryNameAr?: string,
  categoryNameEn?: string,
  code?: string,
  createdAt?: string,
  nameAr?: string,
  nameEn?: string,
  price?: number,
  quantity?: number,
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  authData = JSON.parse(localStorage.getItem('user')||'');

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer '+ this.authData.token})
  };
  baseUrl:string = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {  
      console.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }


  getProducts(limit:number, offset:number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl+"/product?limit="+limit+"&offset="+offset, this.httpOptions)
      .pipe(
        catchError(this.handleError<IProduct[]>('getProducts', []))
      );
  }

  updateProduct(product: IProduct): Observable<any> {
    return this.http.put(this.baseUrl+"/product/"+product.id , product, this.httpOptions).pipe(
      catchError((this.handleError<any>('updateProduct')))
    );
  }

  upload(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl+"/product/upload" , formData, this.httpOptions).pipe(
      catchError((this.handleError<any>('uploadSheet')))
    );
  }
  
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../products";

@Injectable({
  providedIn: 'root'
})
export class RosconesService {
  private serverUrl = 'http://localhost:3000'; // Cambia la URL si tu servidor Node.js está en otro puerto o dominio
  constructor(private http: HttpClient) { }

  getRoscones(cliente: string): Observable<any[]> {
    const url = `${this.serverUrl}/roscones/${cliente}`;
    return this.http.get<any[]>(url);
  }

  sendOrder(client: string, prods: Product[]): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `${this.serverUrl}/roscones/${client}`;
    return this.http.post<any[]>(url, prods, { headers });
  }

  deleteOrder(client: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = `${this.serverUrl}/roscones/${client}`;
    return this.http.delete<any[]>(url, { headers });
  }

  modifyOrder(client: string, prods: Product[]): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `${this.serverUrl}/roscones/${client}`;
    return this.http.put<any[]>(url, prods, { headers });
  }
}

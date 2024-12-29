import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
import {Roscon} from "../products";

@Injectable({
  providedIn: 'root'
})
export class RosconesService {
  // private serverUrl = 'http://192.168.1.106'; // Cambia la URL si tu servidor Node.js está en otro puerto o dominio
  private serverUrl = 'http://localhost'; // Cambia la URL si tu servidor Node.js está en otro puerto o dominio
  constructor(private http: HttpClient) { }

  getRoscones(cliente: string): Observable<any[]> {
    const url = `${this.serverUrl}/roscones/${cliente}`;
    return this.http.get<any[]>(url);
  }

  getAllRoscones(): Observable<any[]> {
    const url = `${this.serverUrl}/roscones`;
    return this.http.get<any[]>(url);
  }

  getSpecialsRoscones(): Observable<any[]> {
    const url = `${this.serverUrl}/especiales`;
    return this.http.get<any[]>(url);
  }

  sendOrder(client: string, prods: Roscon[]): Observable<any[]> {
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

  modifyOrder(client: string, prods: Roscon[]): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `${this.serverUrl}/roscones/${client}`;
    return this.http.put<any[]>(url, prods, { headers });
  }

  markAsSold(client: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `${this.serverUrl}/sold/${client}`;
    return this.http.put<any[]>(url, { headers });
  }

  markAsUnsold(client: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `${this.serverUrl}/unsold/${client}`;
    return this.http.put<any[]>(url, { headers });
  }


  getSumBySize(): Observable<{GRANDE:number, PEQUENO:number}> {
    const url = `${this.serverUrl}/roscones/sum/size`;
    return this.http.get<{GRANDE:number, PEQUENO:number}>(url);
  }

  getSumBySizeAndFill(): Observable<{
    grNATA: number,
    grSin: number,
    grESP: number,
    peqNATA: number,
    peqSIN: number,
    peqESP: number
  }> {
    const url = `${this.serverUrl}/roscones/sum/size/fill`;
    return this.http.get<{
      grNATA: number,
      grSin: number,
      grESP: number,
      peqNATA: number,
      peqSIN: number,
      peqESP: number
    }>(url);
  }

}

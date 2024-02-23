import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Insurance {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export type ApiResponse = Insurance[];

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  private apiUrl = 'http://localhost:3000/insurances';

  constructor(private http: HttpClient) {}

  getAllInsurances(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }

  createInsurance(insuranceData: Insurance): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, insuranceData);
  }

  updateInsurance(id: string, insuranceData: Insurance): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<ApiResponse>(url, insuranceData);
  }

  deleteInsurance(id: string): Observable<ApiResponse> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ApiResponse>(url);
  }
}

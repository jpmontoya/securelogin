import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, first } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private apiUrl = environment.apiUrl;

  private token: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private userID: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private userName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private userEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private tokenStr: string = '';

  constructor(private http: HttpClient) { }

  set changeToken(data: string | null) {
    this.token.next(data);
    if (data !== null || data !== '') {
      this.tokenStr = data === null ? '' : data;
      const decodeToken = this.decodeToken(String(data));
      this.userID.next(decodeToken.userID);
      this.userName.next(decodeToken.userName);
      this.userEmail.next(decodeToken.userEmail);
    }
  }

  get getToken() {
    return this.token.asObservable();
  }

  get getUserID() {
    return this.userID.asObservable();
  }

  get getUserName() {
    return this.userName.asObservable();
  }

  get getUserEmail() {
    return this.userEmail.asObservable();
  }

  private decodeToken(token: string): any {
    const decodedToken: any = jwt_decode.jwtDecode(token);
    return { userID: decodedToken.id, userName: decodedToken.user_name, userEmail: decodedToken.email };
  }

  public validateRoute() {
    return this.http.get(`${this.apiUrl}/auth/route`, { headers: this.getHeaders()});
  }

  public validateRoutePermissions() {
    return this.http.get(`${this.apiUrl}/auth/permission`, { headers: this.getHeaders()});
  }

  public validateRouteLogin() {
    return this.http.get(`${this.apiUrl}/auth/routelogin`, { headers: this.getHeaders()});
  }

  private getHeaders(): HttpHeaders{
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('x-auth-token', this.tokenStr);
    return headers;
  }
}

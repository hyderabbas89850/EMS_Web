import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  endpoint: string = 'http://localhost:8080/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router, private toastrService: ToastrService) {}

  // Signup
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/auth/signup`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/auth/signin`, user)
      .subscribe((res: any) => {
        if(res.status == 1){
          this.toastrService.success(res.message);
          localStorage.setItem('access_token', res.data.token);
          this.router.navigate(['home/']);
          /**this.getUserProfile(res._id).subscribe((res) => {
            this.currentUser = res;
            this.router.navigate(['user-profile/' + res.msg._id]);
          });*/
        }else{
          this.toastrService.warning(res.message);
        }
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.toastrService.error('Logout Successfully.');
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user-profile`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}

import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SignupRequestPayload} from '../models/signup-request.payload';
import {map, tap} from 'rxjs/operators';
import {LoginResponse} from '../models/login-response';
import {LoginRequestPayload} from '../models/login-request.payload';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();


  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) {
  }

  // tslint:disable-next-line:typedef
  getRefreshTokenPayload() {
    return {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    };
  }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/alwo/auth/signup', signupRequestPayload, { responseType: 'text' });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/alwo/auth/login',
      loginRequestPayload).pipe(map(data => {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);

      this.loggedIn.emit(true);
      this.username.emit(data.username);
      return true;
    }));
  }

  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      this.getRefreshTokenPayload())
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  logout() {

    console.log(this.getRefreshTokenPayload());

    this.httpClient.post('http://localhost:8080/alwo/auth/logout', this.getRefreshTokenPayload(),
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      });
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}

// export class AuthService {
//
//   @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
//   @Output() username: EventEmitter<string> = new EventEmitter();
//
//   refreshTokenPayload = {
//     refreshToken: this.getRefreshToken(),
//     username: this.getUserName()
//   };
//
//   constructor(private httpClient: HttpClient,
//               private localStorage: LocalStorageService) { }
//
//   signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
//     return this.httpClient.post('http://localhost:8080/alwo/auth/signup', signupRequestPayload, {responseType: 'text'});
//   }
//
//   login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
//
//     return this.httpClient.post<LoginResponse>('http://localhost:8080/alwo/auth/login', loginRequestPayload)
//       .pipe(map(data => {
//         this.localStorage.store('authenticationToken', data.authenticationToken);
//         this.localStorage.store('username', data.username);
//         this.localStorage.store('refreshToken', data.refreshToken);
//         this.localStorage.store('expiresAt', data.expiresAt);
//
//         this.loggedIn.emit(true);
//         this.username.emit(data.username);
//
//         console.log(localStorage.getItem('authenticationToken'));
//         console.log(localStorage.getItem('username'));
//
//         return true;
//       }));
//
//   }
//
//   logout(): void {
//     console.log(this.localStorage.retrieve('refresh'));
//     console.log(this.localStorage.retrieve('username'));
//
//     this.httpClient.post('http://localhost:8080/alwo/auth/logout', this.refreshTokenPayload,
//       { responseType: 'text' })
//       .subscribe(data => {
//         console.log(data);
//       }, error => {
//         throwError(error);
//       });
//     this.localStorage.clear('authenticationToken');
//     this.localStorage.clear('username');
//     this.localStorage.clear('refreshToken');
//     this.localStorage.clear('expiresAt');
//   }
//
//   // tslint:disable-next-line:typedef
//   refreshToken() {
//     return this.httpClient.post<LoginResponse>('http://localhost:8080/alwo/auth/refresh/token',
//       this.refreshTokenPayload)
//       .pipe(tap(response => {
//         this.localStorage.clear('authenticationToken');
//         this.localStorage.clear('expiresAt');
//
//         this.localStorage.store('authenticationToken',
//           response.authenticationToken);
//         this.localStorage.store('expiresAt', response.expiresAt);
//       }));
//   }
//
//   // tslint:disable-next-line:typedef
//   getJwtToken() {
//     return this.localStorage.retrieve('authenticationToken');
//   }
//
//   // tslint:disable-next-line:typedef
//   getUserName() {
//     return this.localStorage.retrieve('username');
//   }
//
//   isLoggedIn(): boolean {
//     return this.getJwtToken() != null;
//   }
//
//   // tslint:disable-next-line:typedef
//   getRefreshToken() {
//     return this.localStorage.retrieve('refreshToken');
//   }
// }

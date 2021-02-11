import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
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
  @Output() userRole: EventEmitter<string> = new EventEmitter();

  private isLogged$ = new BehaviorSubject<boolean>(false);


  constructor(private httpClient: HttpClient,
              private localStorage: LocalStorageService) {
  }

  getIsLogged$(): Observable<boolean> {
    return this.isLogged$.asObservable();
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
      loginRequestPayload).pipe(
      map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        this.localStorage.store('userrole', data.userRole);

        this.loggedIn.emit(true);
        this.username.emit(data.username);
        this.userRole.emit(data.userRole);

        return true;
      }),
      tap(() => this.isLogged$.next(true)),
    );
  }

  loadAuthData(): void {
    if (this.getJwtToken() != null) {
      this.isLogged$.next(true);

    } else {
      this.isLogged$.next(false);
    }
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
      { responseType: 'text' }).pipe(
      tap(() => this.isLogged$.next(false)),
    )
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      });
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('userrole');
    this.localStorage.clear('basket');
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

  getUserRole(): string {
    return this.localStorage.retrieve('userrole');
  }

}


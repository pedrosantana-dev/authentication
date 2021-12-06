import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';
import { User } from './auth/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  authenticated$: Observable<boolean>;
  user$: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private router: Router) {
    this.authenticated$ = authService.isAuthenticated();
    this.user$ = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}

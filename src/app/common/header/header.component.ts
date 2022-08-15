import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/Auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authStatusSub!: Subscription;
  userIsAuthenticated = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authStatusSub = this.authService
      .getStatusAuthListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }
}

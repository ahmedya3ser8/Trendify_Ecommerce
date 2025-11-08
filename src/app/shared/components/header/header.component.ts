import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

import { CartService } from '@features/cart/services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { EmptyStateComponent } from "../empty-state/empty-state.component";
import { IUserInfo } from '@core/models/iuser';
import { AuthService } from '@features/auth/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, DrawerModule, MenuModule, CartItemComponent, EmptyStateComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cookieService = inject(CookieService);
  visible: boolean = false;
  items: MenuItem[] | undefined;
  cartDetails = this.cartService.cart;
  menuItems = signal([
    {
      text: 'Home',
      link: '/home'
    },
    {
      text: 'Products',
      link: '/products'
    },
    {
      text: 'About Us',
      link: '/about-us'
    },
    {
      text: 'Blog',
      link: '/blog'
    },
    {
      text: 'Contact Us',
      link: '/contact-us'
    },
  ]);
  userInfo = this.authService.userInfo;
  ngOnInit(): void {
    this.initItems();
    this.getLoggedUserCart();
  }
  initItems(): void {
    this.items = [
      {
        label: 'Profile',
        icon: 'fa-solid fa-user',
        command: () => this.router.navigateByUrl('/account/profile')
      },
      {
        label: 'Logout',
        icon: 'fa-solid fa-right-from-bracket',
        command: () => this.logout()
      }
    ];
  }
  getLoggedUserCart(): void {
    this.cartService.getLoggedUserCart().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
  logout(): void {
    this.cookieService.delete('access_token', '/');
    this.cookieService.delete('userInfo', '/');
    this.router.navigateByUrl('/auth/login');
  }
}

import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

import { CartService } from '@features/cart/services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, DrawerModule, MenuModule, CartItemComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
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
  userName = signal('');
  ngOnInit(): void {
    this.initItems();
    this.getLoggedUserCart();
    this.userName.set(this.cookieService.get('userName'));
  }
  initItems(): void {
    this.items = [
      {
        label: 'All Orders',
        icon: 'fa-solid fa-bag-shopping',
        command: () => this.router.navigateByUrl('/account/allorders')
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
    this.cookieService.delete('userName', '/');
    this.router.navigateByUrl('/auth/login');
  }
}

import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

import { CookieService } from 'ngx-cookie-service';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, DrawerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  visible: boolean = false;
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
  logout(): void {
    this.cookieService.delete('access_token', '/');
    this.router.navigateByUrl('/auth/login');
  }
}

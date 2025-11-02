import { Component } from '@angular/core';

import { HeroComponent } from "./components/hero/hero.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { NewCollectionComponent } from "./components/new-collection/new-collection.component";
import { DiscoverComponent } from "./components/discover/discover.component";
import { ServicesComponent } from "./components/services/services.component";
import { TestimonialsComponent } from "./components/testimonials/testimonials.component";
import { FlashSaleComponent } from "./components/flash-sale/flash-sale.component";
import { TopProductsComponent } from "./components/top-products/top-products.component";
import { BestSellingComponent } from "./components/best-selling/best-selling.component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, CategoriesComponent, NewCollectionComponent, DiscoverComponent, ServicesComponent, TestimonialsComponent, FlashSaleComponent, TopProductsComponent, BestSellingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

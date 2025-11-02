import { Component } from '@angular/core';

import { GalleryComponent } from "./components/gallery/gallery.component";
import { HeroComponent } from "./components/hero/hero.component";
import { OnlineShoppingComponent } from "./components/online-shopping/online-shopping.component";
import { WhyChooseUsComponent } from "./components/why-choose-us/why-choose-us.component";

@Component({
  selector: 'app-about-us',
  imports: [HeroComponent, WhyChooseUsComponent, OnlineShoppingComponent, GalleryComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}

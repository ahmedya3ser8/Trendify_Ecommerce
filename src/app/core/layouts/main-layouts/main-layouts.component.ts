import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from "@shared/components/header/header.component";
import { FooterComponent } from "@shared/components/footer/footer.component";

@Component({
  selector: 'app-main-layouts',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './main-layouts.component.html',
  styleUrl: './main-layouts.component.css'
})
export class MainLayoutsComponent {

}

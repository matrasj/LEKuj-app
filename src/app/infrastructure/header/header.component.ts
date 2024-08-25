import { Component } from '@angular/core';
import {RouteManager} from "../route-manager";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public readonly RouterManager = RouteManager;
}

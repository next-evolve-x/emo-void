import { Component } from '@angular/core';
import { VoidAnimatorComponent } from './void-animator/void-animator.component';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [VoidAnimatorComponent, NgStyle]
})
export class AppComponent {
  title = 'EmoVoid';
}

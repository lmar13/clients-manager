import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrientationCheckComponent } from './components/orientation-check/orientation-check.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OrientationCheckComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'clients-manager';
  isPortrait = window.innerHeight > window.innerWidth;

  @HostListener('window:resize')
  onResize() {
    this.isPortrait = window.innerHeight > window.innerWidth;
  }
}

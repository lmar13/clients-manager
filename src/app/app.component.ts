import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { OrientationCheckComponent } from './components/orientation-check/orientation-check.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OrientationCheckComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private router = inject(Router);

  title = 'clients-manager';
  isPortrait = window.innerHeight > window.innerWidth;

  @HostListener('window:resize')
  onResize() {
    this.isPortrait = window.innerHeight > window.innerWidth;
  }

  ngOnInit() {
    this.router.navigateByUrl('/'); // <-- wymusza przekierowanie na główną
  }
}

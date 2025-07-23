import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-orientation-check',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (showWarning) {
      <div class="orientation-warning">
        <p>Obróć urządzenie do trybu poziomego (landscape), aby kontynuować.</p>
      </div>
    } @else {
      <ng-content></ng-content>
    }
  `,
  styles: [
    `
      .orientation-warning {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        text-align: center;
        z-index: 9999;
        padding: 1rem;
      }
    `,
  ],
})
export class OrientationCheckComponent {
  showWarning = false;

  constructor() {
    this.updateOrientationWarning();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateOrientationWarning();
  }

  @HostListener('window:orientationchange')
  onOrientationChange() {
    this.updateOrientationWarning();
  }

  private updateOrientationWarning() {
    const isMobile = window.innerWidth < 768;
    const isPortrait = window.innerHeight > window.innerWidth;
    this.showWarning = isMobile && isPortrait;
  }
}

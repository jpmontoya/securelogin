import { Component } from '@angular/core';
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  public loading;

  constructor(private loadingService: LoadingService) {
    this.loading = loadingService.getLoading;
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontapp';

  isLoading = true;
  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 5000); // 5000 milisegundos = 5 segundos
  }
}

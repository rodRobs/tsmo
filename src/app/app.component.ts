import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tsmo';

  onRedSocial(link: string) {
    // console.log(link);
    window.open(link, '_blank');
  }

  politica() {
    window.open('https://tsmo.com.mx/politica.html', '_blank');
  }
}

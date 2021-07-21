import { ActivationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent{

  titulo: string;

  constructor( private router: Router ) {
    this.getDataRouter();
  }

  getDataRouter() {
    this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data ),
    )
    .subscribe( event => {
      // console.log(event);
      this.titulo = event.titulo;
    })
  }

}

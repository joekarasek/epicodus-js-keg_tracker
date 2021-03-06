import { Component, EventEmitter } from 'angular2/core';
import { Keg } from './keg.model';

@Component({
    selector: 'keg-display',
    inputs: ['keg'],
    outputs: ['onKegPour'],
  template: `
  <div class="well row">
    <h3 class="keg__name">{{ keg.name }}</h3>
    <div class="well empty"
    [class.hidden]="keg.pints !== 0">
    Out of Beer!
    </div>
    <div class="col-sm-4">
      <h4>Types:</h4>
      <ul>
        <li *ngFor="#type of keg.type">{{ type }}</li>
      </ul>
    </div>
    <div class="col-sm-4">
      <h4>Info: </h4>
      <h5>ABV: {{ keg.ABV }}%</h5>
      <h5>Price: {{ keg.price | currency:'USD':true:'1.2-2' }}</h5>
      <h5>Capacity: {{ (keg.pints/124 * 100).toFixed(2) }} %</h5>
    </div>
    <div class="col-sm-4">
      <button class="btn-primary" (click)="kegPour(keg)"
        name="button"
        [class.hidden]="keg.pints === 0">
        Pour Beer
      </button>
      <h2 *ngIf="(keg.pints/124 * 100).toFixed(2) > 75.00" class="well full">FULL</h2>
      <h2 *ngIf="75.00 >= (keg.pints/124 * 100).toFixed(2) && (keg.pints/124 * 100).toFixed(2) > 40.00" class=" well notFull">PLENTY LEFT</h2>
      <h2 *ngIf="40.00 >= (keg.pints/124 * 100).toFixed(2) && (keg.pints/124 * 100).toFixed(2) > 10.00" class=" well low">GETTING LOW!</h2>
      <h2 *ngIf="(keg.pints/124 * 100).toFixed(2) <= 10.00" class="well danger">DANGER! EMPTY SOON!</h2>
    </div>
  </div>
  `
})
export class KegComponent {
  public keg: Keg;
  public onKegPour: EventEmitter<Keg>;
  constructor() {
    this.onKegPour = new EventEmitter();
  }
  kegPour(keg: Keg) {
    if (keg.pints > 0) keg.pints --;
    this.onKegPour.emit(keg);
  }
}

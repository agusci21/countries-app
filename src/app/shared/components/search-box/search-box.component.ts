import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer = new Subject<string>();
  private debouncerSuscription? : Subscription

  @Input()
  public placeHolder!: String;

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  emitValue(value: string) {
    this.onValue.emit(value);
  }

  onKeyPressed(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(debounceTime(500))
    .subscribe((value) => {
      this.onDebounce.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe()
  }
}

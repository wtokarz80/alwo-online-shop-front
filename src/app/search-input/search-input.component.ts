import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: 'search-input.component.html'
})

export class SearchInputComponent implements OnDestroy {
  // Optionally, I have added a placeholder input for customization
  @Input() readonly placeholder: string = '';
  @Output() setValue: EventEmitter<string> = new EventEmitter();
  private searchSubject: Subject<string> = new Subject();

  constructor() {
    this.setSearchSubscription();
  }

  private setSearchSubscription(): void {
    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe((searchValue: string) => {
      this.setValue.emit( searchValue );
    });
  }

  public updateSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTextValue = inputElement.value;
    this.searchSubject.next( searchTextValue );
  }

  ngOnDestroy(): void {
    this.searchSubject.unsubscribe();
  }
}

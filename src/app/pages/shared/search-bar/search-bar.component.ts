import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/App.state';
import { User } from '../../../models/User';
import { map, Observable, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Input() options: any[] = [];
  @Input() placeholder: string = "Placeholder"
  @Output() onSelectedOption = new EventEmitter<any>();
  selectedItem: any | null = null;
  query = new FormControl('');
  filteredOptions$: Observable<any[]> = this.query.valueChanges.pipe(
    startWith(''),
    map((value) => this.filter(value || ''))
  );

  constructor(private store: Store<AppState>) {}

  filter(value: string) {
    return this.options.filter((option) => {
      let isMatch = false;
      for (let property in option) {
        if (typeof option[property] == 'string' && option[property].includes(value)) {
          isMatch = true;
        }
      }
       return isMatch;
    });
  }

  select($event: MatAutocompleteSelectedEvent) {
    const item = this.options.find((item) => item.id == $event.option.value);
    if (item) {
      this.selectedItem = item;
      this.onSelectedOption.emit(this.selectedItem);
    }

    this.query.setValue('');
  }

  getProperties() {
    const properties = [];
    for (let property in this.options[0]) {
      properties.push(property)
    }
    return properties;
  }
}

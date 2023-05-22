import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/App.state';
import { User } from '../../../models/User';
import { map, Observable, startWith } from 'rxjs';
import { addUserToGroup } from '../../../state/groups/group.action';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Input() options: User[] = [];
  @Output() onSelectedOption = new EventEmitter<User>();
  selectedUser: User | null = null;
  query = new FormControl('');
  filteredOptions$: Observable<User[]> = this.query.valueChanges.pipe(
    startWith(''),
    map((value) => this.filter(value || ''))
  );

  constructor(private store: Store<AppState>) {}

  filter(value: string) {
    return this.options.filter((option) => {
      return (
        option.lastname.includes(value) ||
        option.firstname.includes(value) ||
        option.email.includes(value)
      );
    });
  }

  select($event: MatAutocompleteSelectedEvent) {
    const user = this.options.find((user) => user.id == $event.option.value);
    if (user) {
      this.selectedUser = user;
      this.onSelectedOption.emit(this.selectedUser);
    }

    this.query.setValue('');
  }
}

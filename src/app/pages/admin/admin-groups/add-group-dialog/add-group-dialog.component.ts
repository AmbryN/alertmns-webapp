import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../../../state/App.state';
import { Store } from '@ngrx/store';
import { addGroup } from '../../../../state/groups/group.action';

@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.scss'],
})
export class AddGroupDialogComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(private store: Store<AppState>) {}

  onAdd() {
    if (this.form.valid)
      this.store.dispatch(addGroup({ group: this.form.value }));
  }
}

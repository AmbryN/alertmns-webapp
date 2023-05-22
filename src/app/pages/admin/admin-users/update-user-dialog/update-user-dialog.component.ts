import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../../../state/App.state';
import { Store } from '@ngrx/store';
import { updateUser } from '../../../../state/users/user.action';
import { UserService } from '../../../../services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../models/User';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss'],
})
export class UpdateUserDialogComponent {
  userForm: FormGroup = this.formBuilder.group({
    id: [this.data.id],
    firstname: [this.data.firstname, [Validators.required]],
    lastname: [this.data.lastname, [Validators.required]],
    email: [this.data.email, [Validators.required, Validators.email]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private store: Store<AppState>,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    console.log(data);
  }

  onSubmit(): void {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      this.store.dispatch(updateUser({ user: this.userForm.value }));
    }
  }
}

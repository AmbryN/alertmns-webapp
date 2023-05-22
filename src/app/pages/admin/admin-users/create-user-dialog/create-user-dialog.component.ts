import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppState } from '../../../../state/App.state';
import { Store } from '@ngrx/store';
import { updateUser } from '../../../../state/users/user.action';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
})
export class CreateUserDialogComponent {
  userForm: FormGroup = this.formBuilder.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private store: Store<AppState>,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  onSubmit(): void {
    if (this.userForm.valid) {
      this.store.dispatch(updateUser({ user: this.userForm.value }));
    }
  }
}

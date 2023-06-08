import { Component, effect, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppState } from '../../../../state/App.state';
import { Store } from '@ngrx/store';
import { loadUser, updateUser } from '../../../../state/users/user.action';
import { UserService } from '../../../../services/user/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../models/User';
import { loadRoles } from '../../../../state/role/role.actions';
import { selectAllRoles } from '../../../../state/role/role.selectors';
import { Role } from '../../../../models/Role';
import { selectSelectedUser } from '../../../../state/users/user.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss'],
})
export class UpdateUserDialogComponent {
  roles$ = this.store.select(selectAllRoles);
  selectedUser = toSignal(this.store.select(selectSelectedUser));

  userForm: FormGroup = this.formBuilder.group({
    id: [this.data.id],
    firstname: [this.data.firstname, [Validators.required]],
    lastname: [this.data.lastname, [Validators.required]],
    email: [this.data.email, [Validators.required, Validators.email]],
  });
  roles: FormControl<Role[] | null> = new FormControl([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private store: Store<AppState>,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.store.dispatch(loadRoles());
    this.store.dispatch(loadUser({ userId: this.data.id! }));

    effect(() => this.roles.setValue(this.selectedUser()!.roles!));
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.store.dispatch(
        updateUser({
          user: { ...this.userForm.value, roles: this.roles.value },
        })
      );
    }
  }

  compare(first: Role, second: Role) {
    return first && second ? first.id === second.id : first === second;
  }
}

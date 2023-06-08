import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Channel } from "../../../../../models/Channel";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../state/App.state";
import { updateGroup } from "../../../../../state/group/group.action";

@Component({
  selector: "app-rename-group",
  templateUrl: "./rename-group.component.html",
  styleUrls: ["./rename-group.component.scss"],
})
export class RenameGroupComponent {
  form: FormGroup = new FormGroup({
    id: new FormControl(this.data.channel.id),
    name: new FormControl(this.data.channel.name, [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { channel: Channel },
    private store: Store<AppState>
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(updateGroup({ group: this.form.value }));
    }
  }
}

import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FileService } from "../../../../services/file/file.service";
import { AppState } from "../../../../state/App.state";
import { Store } from "@ngrx/store";
import { batchUploadUsers } from "../../../../state/users/user.action";

@Component({
  selector: "app-import-user-dialog",
  templateUrl: "./import-user-dialog.component.html",
  styleUrls: ["./import-user-dialog.component.scss"],
})
export class ImportUserDialogComponent {
  formData: FormData = new FormData();

  constructor(
    private fileService: FileService,
    private store: Store<AppState>
  ) {}

  onFileSelected(event: any) {
    this.formData.append("file", event.target.files[0]);
  }

  onSubmit() {
    if (this.formData.has("file")) {
      this.store.dispatch(batchUploadUsers({ file: this.formData }));
    }
  }
}

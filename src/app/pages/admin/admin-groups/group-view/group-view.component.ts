import { Component, computed } from "@angular/core";
import { AppState } from "../../../../state/App.state";
import { Store } from "@ngrx/store";
import {
  addUserToGroup,
  loadGroup,
  removeUserFromGroup,
} from "../../../../state/group/group.action";
import { ActivatedRoute } from "@angular/router";
import { selectedGroup } from "../../../../state/group/group.selectors";
import { User } from "../../../../models/User";
import { MatDialog } from "@angular/material/dialog";
import { AddMemberDialogComponent } from "../../../shared/add-member-dialog/add-member-dialog.component";
import { RenameGroupComponent } from "./rename-group/rename-group.component";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-group-view",
  templateUrl: "./group-view.component.html",
  styleUrls: ["./group-view.component.scss"],
})
export class GroupViewComponent {
  groupId = 0;
  selectedGroup = toSignal(this.store.select(selectedGroup), {
    initialValue: null,
  });
  members = computed(() => this.selectedGroup()?.members);

  columns = [
    {
      header: "Prénom",
      columnName: "firstname",
      cell: (element: User) => `${element.firstname}`,
    },
    {
      header: "Nom",
      columnName: "lastname",
      cell: (element: User) => `${element.lastname}`,
    },
    {
      header: "E-mail",
      columnName: "email",
      cell: (element: User) => `${element.email}`,
    },
    {
      header: "Actions",
      columnName: "action",
      cell: () => ``,
    },
  ];

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.route.paramMap.subscribe((params) => {
      this.groupId = Number(params.get("id"));
      this.store.dispatch(loadGroup({ groupId: this.groupId }));
    });
  }

  onDelete(userId: number): void {
    this.store.dispatch(removeUserFromGroup({ groupId: this.groupId, userId }));
  }

  openDialog(): void {
    this.dialog.open(AddMemberDialogComponent, {
      data: { containerId: this.groupId, dispatcher: addUserToGroup },
    });
  }

  openRenameDialog(): void {
    this.dialog.open(RenameGroupComponent, {
      data: { channel: this.selectedGroup() },
    });
  }
}

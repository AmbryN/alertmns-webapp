import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { selectAllNotifications } from "src/app/state/notifications/notification.selectors";
import { Channel } from "../../../models/Channel";
import { User } from "../../../models/User";
import { AppState } from "../../../state/App.state";
import { selectCurrentUser } from "../../../state/login/login.selectors";
import { Notification } from "src/app/models/Notification";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
  notifications$: Observable<Notification[]> = this.store.select(
    selectAllNotifications
  );
  notificationMap: Map<number, number> = new Map<number, number>();
  channels$: Observable<Channel[]> = this.store.select(selectCurrentUser).pipe(
    map((user) => {
      if (user && user.channels) {
        return user.channels;
      } else return [];
    })
  );
  currentUser$: Observable<User | null> = this.store.select(selectCurrentUser);
  isAdmin$: Observable<boolean> = this.currentUser$.pipe(
    map((user) => {
      if (user != null)
        return (
          user!.roles!.find((role) => role.name == "ROLE_ADMIN") != undefined
        );
      else return false;
    })
  );

  constructor(private store: Store<AppState>) {
    this.notifications$.subscribe((notifications) => {
      this.notificationMap = notifications.reduce((acc, val) => {
        if (val.seenAt) {
          return acc;
        }
        const value = acc.get(val.channel.id!!);
        if (value) {
          acc.set(val.channel.id!!, value + 1);
        } else {
          acc.set(val.channel.id!!, 1);
        }
        return acc;
      }, new Map<number, number>());
    });
  }
}

import { Component, ElementRef, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { loadMessages, sendMessage } from "../../state/messages/message.action";
import { selectAllMessages } from "../../state/messages/message.selectors";
import { AppState } from "../../state/App.state";
import { ActivatedRoute } from "@angular/router";
import { loadChannel } from "../../state/channels/channel.action";
import { selectedChannel } from "../../state/channels/channel.selectors";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../../models/User";
import { delay, map, tap } from "rxjs";
import { selectCurrentUser } from "../../state/login/login.selectors";
import { FileService } from "../../services/file/file.service";
import { FileFormat } from "src/app/models/FileFormat";
import { markNotificationsAsSeen } from "src/app/state/notifications/notification.action";

@Component({
  selector: "app-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.scss"],
})
export class ChannelComponent {
  @ViewChild("messages_id") container!: ElementRef;

  selectedChannel$ = this.store.select(selectedChannel);
  members$ = this.selectedChannel$.pipe(
    map((channel) => channel.members),
    map((members) => {
      return members.map((member) => {
        return {
          name: `${member.firstname!} ${member.lastname!}`,
          link: "",
          icon: "person",
        };
      });
    })
  );

  messages$ = this.store.select(selectAllMessages);
  scrollSubscription = this.messages$
    .pipe(
      delay(50),
      tap(() => this.scrollDown())
    )
    .subscribe();

  messageForm = new FormGroup({
    message: new FormControl("", [
      Validators.required,
      Validators.minLength(1),
    ]),
  });

  private channelId = Number(this.route.snapshot.paramMap.get("id"));
  private currentUser: User | null = null;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fileService: FileService
  ) {
    this.route.params.subscribe((params) => {
      this.channelId = params["id"];
      if (this.channelId) {
        this.store.dispatch(loadChannel({ channelId: this.channelId }));
        this.store.dispatch(loadMessages({ channelId: this.channelId }));
        this.store.dispatch(
          markNotificationsAsSeen({ channelId: this.channelId })
        );
      }
    });

    this.store
      .select(selectCurrentUser)
      .subscribe((user) => (this.currentUser = user));
  }

  scrollDown(): void {
    this.container.nativeElement.scrollTo(0, 20000);
  }

  addMessage(): void {
    if (this.messageForm.valid) {
      this.store.dispatch(
        sendMessage({
          message: {
            channelId: this.channelId,
            userId: this.currentUser!.id!,
            content: this.messageForm.value.message!,
          },
        })
      );
      this.messageForm.reset();
    }
  }

  download(format: FileFormat): void {
    this.fileService.downloadFile(this.channelId, format).subscribe();
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }
}

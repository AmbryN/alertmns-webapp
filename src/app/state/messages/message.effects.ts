import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from '../../services/message.service';
import { AppState } from '../App.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadMessages,
  loadMessagesFailure,
  loadMessagesSuccess,
  sendMessage,
  sendMessageFailure,
  sendMessageSuccess,
} from './message.action';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class MessageEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private messageService: MessageService
  ) {}

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMessages),
      switchMap((action) =>
        this.messageService.getMessages(action.channelId).pipe(
          tap(() => this.messageService.connect(action.channelId)),
          map((messages) => loadMessagesSuccess({ messages: messages })),
          catchError((error) => of(loadMessagesFailure({ error: error })))
        )
      )
    )
  );

  sendMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sendMessage),
        switchMap((action) =>
          from(this.messageService.saveMessage(action.message)).pipe(
            map((_) => sendMessageSuccess()),
            catchError((error) => of(sendMessageFailure({ error: error })))
          )
        )
      ),
    { dispatch: false }
  );
}

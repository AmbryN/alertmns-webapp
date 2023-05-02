import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from '../../services/message.service';
import { AppState } from '../App.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  sendMessage,
  loadMessages,
  loadMessagesFailure,
  loadMessagesSuccess,
  sendMessageSuccess,
  sendMessageFailure,
} from './message.action';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { selectMessageToSend } from './message.selectors';

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
        from(this.messageService.getMessages(action.channelId)).pipe(
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
          of(this.messageService.saveMessage(action.message)).pipe(
            map((_) => sendMessageSuccess()),
            catchError((error) => of(sendMessageFailure({ error: error })))
          )
        )
      ),
    { dispatch: false }
  );
}

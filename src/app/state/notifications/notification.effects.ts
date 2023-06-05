import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap } from 'rxjs';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { loadProfileSuccess } from '../login/login.action';
import {
  loadNotificationsFailure,
  loadNotificationsSuccess,
  markNotificationsAsSeen,
  markNotificationsAsSeenFailure,
  markNotificationsAsSeenSuccess,
} from './notification.action';

@Injectable()
export class NotificationEffects {
  constructor(
    private actions$: Actions,
    private notificationService: NotificationService
  ) {}

  loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfileSuccess),
      switchMap((action) =>
        this.notificationService.getNotifications().pipe(
          map((notifications) =>
            loadNotificationsSuccess({ notifications: notifications })
          ),
          catchError((error) => of(loadNotificationsFailure({ error: error })))
        )
      )
    )
  );

  markNotificationsAsSeen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(markNotificationsAsSeen),
      switchMap((action) =>
        this.notificationService.markNotificationsAsSeen(action.channelId).pipe(
          map((notifications) =>
            markNotificationsAsSeenSuccess({ notifications: notifications })
          ),
          catchError((error) =>
            of(markNotificationsAsSeenFailure({ error: error }))
          )
        )
      )
    )
  );
}

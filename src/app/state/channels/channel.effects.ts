import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../App.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadChannel,
  loadChannelFailure,
  loadChannelSuccess,
} from './channel.action';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { ChannelService } from '../../services/channel.service';

@Injectable()
export class ChannelEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private channelService: ChannelService
  ) {}

  loadChannel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadChannel),
      switchMap((action) =>
        from(
          this.channelService.getChannel(action.channelId).pipe(
            map((channel) => loadChannelSuccess({ channel })),
            catchError((error) => of(loadChannelFailure({ error })))
          )
        )
      )
    )
  );
}

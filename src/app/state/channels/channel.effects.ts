import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../App.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadChannel,
  loadChannelFailure,
  loadChannels,
  loadChannelsFailure,
  loadChannelsSuccess,
  loadChannelSuccess,
} from './channel.action';
import { catchError, from, map, of, switchMap } from 'rxjs';
import {} from './channel.selectors';

import { LoginService } from '../../services/login.service';
import { ChannelService } from '../../services/channel.service';

@Injectable()
export class ChannelEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private channelService: ChannelService,
    private loginService: LoginService
  ) {}
  //
  // loadChannels$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadChannels),
  //     switchMap(() =>
  //       from(
  //         this.channelService
  //           .getUserChannels({ id: 1, email: 'pierre.martin@message.fr' })
  //           .pipe(
  //             map((channels) => loadChannelsSuccess({ channels })),
  //             catchError((error) => of(loadChannelsFailure({ error: error })))
  //           )
  //       )
  //     )
  //   )
  // );

  loadChannel = createEffect(() =>
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

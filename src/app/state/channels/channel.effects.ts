import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../App.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadChannels,
  loadChannelsFailure,
  loadChannelsSuccess,
} from './channel.action';
import { catchError, from, map, of, switchMap } from 'rxjs';
import {} from './channel.selectors';
import { ChannelService } from '../../services/channel.service';
import { LoginService } from '../../services/login.service';

@Injectable()
export class ChannelEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private channelService: ChannelService,
    private loginService: LoginService
  ) {}

  loadChannels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadChannels),
      switchMap(() =>
        from(
          this.channelService
            .getUserChannels({ id: 1, email: 'pierre.martin@message.fr' })
            .pipe(
              map((channels) => loadChannelsSuccess({ channels })),
              catchError((error) => of(loadChannelsFailure({ error: error })))
            )
        )
      )
    )
  );
}

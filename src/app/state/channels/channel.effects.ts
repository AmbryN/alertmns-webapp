import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../App.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addGroupsToChannel,
  addGroupToChannelFailure,
  addGroupToChannelSuccess,
  addUsersToChannel,
  addUsersToChannelFailure,
  addUsersToChannelSuccess,
  createChannel,
  createChannelFailure,
  createChannelSuccess,
  loadChannel,
  loadChannelFailure,
  loadChannels,
  loadChannelsSuccess,
  loadChannelSuccess,
  removeGroupFromChannel,
  removeGroupFromChannelFailure,
  removeGroupFromChannelSuccess,
  removeUserFromChannel,
  removeUserFromChannelFailure,
  removeUserFromChannelSuccess,
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

  loadChannels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadChannels),
      switchMap(() =>
        this.channelService.getChannels().pipe(
          map((channels) => loadChannelsSuccess({ channels })),
          catchError((error) => of(loadChannelFailure({ error })))
        )
      )
    )
  );

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

  createChannel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createChannel),
      switchMap((action) =>
        this.channelService.createChannel(action.channel).pipe(
          map((channel) => createChannelSuccess({ channel })),
          catchError((error) => of(createChannelFailure({ error })))
        )
      )
    )
  );

  addUsersToChannel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUsersToChannel),
      switchMap((action) =>
      this.channelService.addUsers(action.channelId, action.users).pipe(
        map((channel) => addUsersToChannelSuccess({ channel })),
        catchError((error) => of(addUsersToChannelFailure({ error })))
      )
    )
  ));

  removeUserFromChannel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeUserFromChannel),
      switchMap((action) =>
      this.channelService.removeUser(action.channelId, action.userId).pipe(
        map((channel) => removeUserFromChannelSuccess({ channel })),
        catchError((error) => of(removeUserFromChannelFailure({ error })))
      )
    )
  ));


  addGroupsToChannel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addGroupsToChannel),
      switchMap((action) =>
      this.channelService.addGroups(action.channelId, action.groups).pipe(
        map((channel) => addGroupToChannelSuccess({ channel })),
        catchError((error) => of(addGroupToChannelFailure({ error })))
      )
    )
  ));

  removeGroupFromChannel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeGroupFromChannel),
      switchMap((action) =>
        from(
          this.channelService
            .removeGroup(action.channelId, action.groupId)
            .pipe(
              map((channel) => removeGroupFromChannelSuccess({ channel })),
              catchError((error) => of(removeGroupFromChannelFailure({ error })))
            )
        )
      )
    )
  );
}

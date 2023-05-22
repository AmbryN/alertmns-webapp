import { AppState } from '../App.state';
import { GroupState } from './group.reducers';
import { createSelector } from '@ngrx/store';

export const selectGroups = (state: AppState) => state.groups;

export const selectAllGroups = createSelector(
  selectGroups,
  (state: GroupState) => state.groups
);

export const selectedGroup = createSelector(
  selectGroups,
  (state: GroupState) => state.selectedGroup
);

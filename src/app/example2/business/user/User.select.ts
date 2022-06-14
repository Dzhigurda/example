import { createSelector } from '@ngrx/store';
import { AppState, User } from '..';

export interface UserCounter {
    all: number;

    woman: number;
    man: number;

    admin: number;
    manager: number;
    guest: number;
}

export const selectUsers = (state: AppState) => state.users;
export const selectUserByID = (id: number) => (state: AppState) => state.users.find(u => u.id === id);
export const selectCurrenUserId = (state: AppState) => state.current_user ?? 0;
export const selectCurrentUser = (state: AppState) => state.users?.find(r => r.id === state?.current_user)
export const selectUsersCount = createSelector<AppState, User[], UserCounter>(
    selectUsers,
    (u) => ({
        all: u.length,

        woman: u.filter(r => r.gender === 'WOMAN').length,
        man: u.filter(r => r.gender === 'MAN').length,

        admin: u.filter(r => r.role === 'Admin').length,
        manager: u.filter(r => r.role === 'Manager').length,
        guest: u.filter(r => r.role === 'Guest').length,
    })
);

 
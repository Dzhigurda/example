import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, debounceTime, EMPTY, forkJoin, map, mergeMap, of, switchMap, tap } from "rxjs";
import { UserService } from "../../user.service";
import { ActionTypes } from "../actions";
import { UserDTO, UserFormDTO, UserRoleFormDTO } from "./User";
import { AvatarCleared, ClearUserAvatar, ErrorLoadedUsers, ErrorUpdatedUser, LoadedUsers, RemoveUser, SetUserAvatar, UpdatedUser, UserAdded, UserRemoved } from "./User.action";

@Injectable()
export class UserEffect {

    @Effect()
    loadUsers$ = this.actions$
        .pipe(
            ofType(ActionTypes.LoadUsers),
            mergeMap(() => this.userService.getAll()
                .pipe(
                    tap(console.log),
                    map(users => new LoadedUsers(users)),
                    catchError((err) => of(new ErrorLoadedUsers(err)))
                )
            )
        );

    @Effect()
    patchUsers$ = this.actions$
        .pipe(
            ofType<{ type: string, id: number, payload: UserDTO | UserFormDTO | UserRoleFormDTO }>(ActionTypes.ChangeUser, ActionTypes.ChangeUserRole, ActionTypes.SetAvatar),
            mergeMap((value) => this.userService.edit(value.payload)
                .pipe(
                    tap(console.log),
                    map(user => new UpdatedUser(user)),
                    catchError((err) => of(new ErrorUpdatedUser(err)))
                )
            ),
            debounceTime(300)
        )

    @Effect()
    userAdded$ = this.actions$
        .pipe(
            ofType<{ type: string, payload: UserDTO }>(ActionTypes.AddUser),
            mergeMap((value) => this.userService.add(value.payload)
                .pipe(
                    tap(console.log),
                    map(user => new UserAdded(user)),
                    catchError((err) => of(new ErrorUpdatedUser(err)))
                )
            ),
            debounceTime(300)
        )

    @Effect()
    deleteUsers$ = this.actions$
        .pipe(
            ofType<RemoveUser>(ActionTypes.RemoveUser),
            mergeMap((value) => forkJoin([this.userService.remove(value.id), of(value.id)])
                .pipe(
                    tap(console.log),
                    map(([result, userId]) => new UserRemoved(userId)),
                    catchError((err) => of(new ErrorUpdatedUser(err)))
                )
            )
        )

    @Effect()
    clearAvatar$ = this.actions$
        .pipe(
            ofType<ClearUserAvatar>(ActionTypes.ClearAvatar),
            mergeMap((value) => forkJoin([this.userService.clearAvatar(value.id), of(value.id)])
                .pipe(
                    tap(console.log),
                    map(([result, userId]) => new AvatarCleared(userId)),
                    catchError((err) => of(new ErrorUpdatedUser(err)))
                )
            )
        )
    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }
}
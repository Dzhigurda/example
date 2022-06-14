import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, EMPTY, map, mergeMap, of, tap } from "rxjs";
import { UserService } from "../../user.service";
import { ActionTypes } from "../actions";
import { ErrorLoadedUsers, LoadedUsers } from "./User.action";

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
                    catchError(() => of(new ErrorLoadedUsers()))
                )
            )
        );

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }
}
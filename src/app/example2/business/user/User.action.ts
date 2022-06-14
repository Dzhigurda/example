import { ActionTypes } from "../actions";
import { User, UserAvatarFormDTO, UserDTO, UserFormDTO, UserRoleFormDTO } from "./User";
import { Action } from '@ngrx/store';

export class UserAction {

}

export class AddUser extends UserAction implements Action {
    readonly type = ActionTypes.AddUser;
    constructor(public payload: UserDTO) { super() }
}
export class UserAdded extends UserAction implements Action {
    readonly type = ActionTypes.UserAdded;
    constructor(public payload: UserDTO) { super() }
}

export class RemoveUser extends UserAction implements Action {
    readonly type = ActionTypes.RemoveUser;
    constructor(public id: number) { super() }
}

export class ChangeUser extends UserAction implements Action {
    readonly type = ActionTypes.ChangeUser;
    constructor(public payload: UserFormDTO) { super() }
}

export class ChangeUserRole extends UserAction implements Action {
    readonly type = ActionTypes.ChangeUserRole;
    constructor(public payload: UserRoleFormDTO) { super() }
}

export class SetUserAvatar extends UserAction implements Action {
    readonly type = ActionTypes.SetAvatar;
    constructor(public payload: UserAvatarFormDTO) { super() }
}
export class ClearUserAvatar extends UserAction implements Action {
    readonly type = ActionTypes.ClearAvatar;
    constructor(public id: number) { super() }
}

export class ChangeCurrentUser implements Action {
    readonly type = ActionTypes.ChangeCurrentUser
    constructor(public id: number) { }
}

export class LoadUsersAction implements Action {
    readonly type = ActionTypes.LoadUsers;
    constructor() { }
}
export class LoadedUsers implements Action {
    readonly type = ActionTypes.LoadedUsers;
    constructor(public users: User[]) { }
}

export class ErrorLoadedUsers implements Action {
    readonly type = ActionTypes.ErrorLoadedUsers;
    constructor(public err: any) { }
}

export class UpdatedUser implements Action {
    readonly type = ActionTypes.UpdatedUser;
    constructor(public payload: User) { }
}

export class ErrorUpdatedUser implements Action {
    readonly type = ActionTypes.ErrorUpdatedUser;
    constructor(public err: any) { }
}

export class UserRemoved implements Action {
    readonly type = ActionTypes.UserDeleted;
    constructor(public id: any) {}
}

export class AvatarCleared implements Action {
    readonly type = ActionTypes.AvatarCleared;
    constructor(public id: any) {}
}

export type UserActionUnion =
    AddUser
    | UserAdded
    | RemoveUser
    | ChangeUser
    | ChangeUserRole
    | SetUserAvatar
    | ClearUserAvatar
    | AvatarCleared
    | LoadUsersAction
    | LoadedUsers
    | ErrorLoadedUsers
    | UpdatedUser
    | ErrorUpdatedUser
    | UserRemoved;
import { ActionTypes } from "../actions";
import { UserAvatarFormDTO, UserDTO, UserFormDTO, UserRoleFormDTO } from "./User";
import { Action } from '@ngrx/store';

export class UserAction {

}

export class AddUser extends UserAction implements Action {
    readonly type = ActionTypes.AddUser;
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

export class ChangeCurrentUser  implements Action {
    readonly type = ActionTypes.ChangeCurrentUser
    constructor(public id: number) { }
}


export type UserActionUnion = AddUser | RemoveUser | ChangeUser | ChangeUserRole | SetUserAvatar | ClearUserAvatar;
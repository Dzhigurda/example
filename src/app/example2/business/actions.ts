import { GUIActionUnion } from "./gui/GUI.action";
import { UserActionUnion } from "./user/User.action";


export enum ActionTypes {
    AddUser = '[Example User] Add user',
    UserAdded = '[Example User] User Added',
    RemoveUser = '[Example User] Remove user',
    ChangeUser = '[Example User] Change user',
    ChangeUserRole = '[Example User] Change user role',
    SetAvatar = '[Example User] Set avatar',
    ClearAvatar = '[Example User] Clear avatar',
    ChangeThemeGUI = '[Example GUI] Change GUI',
    ChangeCurrentUser = "[Example CurrentUser] Change CurrentUser",
    LoadUsers = "[Example User] Load Users",
    LoadedUsers = "[Example User] Users Loaded Success",
    ErrorLoadedUsers = "[Example User] Users Loaded fail",
    UpdatedUser = "[Example User] Users updated",
    ErrorUpdatedUser = "[Example User] Error user updated",
    UserDeleted = "[Example User] User Deleted Success",
    AvatarCleared = "[Example User] User avatar Clered Success"
}

export type ActionsUnion =
    UserActionUnion
    | GUIActionUnion;
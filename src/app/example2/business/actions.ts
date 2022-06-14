import { GUIActionUnion } from "./gui/GUI.action";
import { UserActionUnion } from "./user/User.action";


export enum ActionTypes {
    AddUser = '[Example User] Add user',
    RemoveUser = '[Example User] Remove user',
    ChangeUser = '[Example User] Change user',
    ChangeUserRole = '[Example User] Change user role',
    SetAvatar = '[Example User] Set avatar',
    ClearAvatar = '[Example User] Clear avatar',
    ChangeThemeGUI = '[Example GUI] Change GUI',
    ChangeCurrentUser = "[Example CurrentUser] Change CurrentUser"
}

export type ActionsUnion = UserActionUnion | GUIActionUnion;
import { ActionTypes } from "./actions";
import { GUI } from "./gui/GUI";
import { User } from "./user/User";

export interface AppState {
    users: User[];
    gui: GUI;
    current_user: number | undefined;
}
  
export * from "./actions";
export * from "./user/User.action";
export * from "./gui/GUI.action";
export * from "./user/User";
export * from "./gui/GUI";
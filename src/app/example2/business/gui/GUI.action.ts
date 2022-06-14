import { Action } from "@ngrx/store";
import { ActionTypes } from "../actions";
import { GUIFormDTO } from "./GUI";


export class GUIAction { }

export class ChangeThemeGUI extends GUIAction implements Action {
    readonly type = ActionTypes.ChangeThemeGUI;

    constructor(public payload: GUIFormDTO) { super() }
}


export type GUIActionUnion = ChangeThemeGUI; 
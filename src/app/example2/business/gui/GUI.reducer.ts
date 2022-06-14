import { ActionTypes } from "../actions";
import { GUI } from "./GUI";
import { GUIActionUnion } from "./GUI.action";

export const initialState: GUI = new GUI();



export function reducer(
    state = initialState,
    action: GUIActionUnion
): GUI {
    switch (action.type) {
        case ActionTypes.ChangeThemeGUI: {
            const isDark = action.payload.theme === 'dark';
            document.documentElement.classList.toggle("dark-mode", isDark);
            localStorage.setItem("color-theme", action.payload.theme);
            return new GUI().restore(state).changeTheme(action.payload.theme);
        }

        default: {
            return state;
        }
    }
}
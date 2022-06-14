import { AppState, UserAction, UserActionUnion } from ".";
import { ActionsUnion } from "./actions";
import { initialState as initialStateGUI} from "./gui/GUI.reducer";
import { initialState as initialStateUser} from "./user/User.reducer";
import { GUIAction, GUIActionUnion } from "./gui/GUI.action";
import { reducer as GUIReducer } from "./gui/GUI.reducer";
import { reducer as UserReducer } from "./user/User.reducer";

export function reducer(
    state: AppState = {users: initialStateUser, gui: initialStateGUI, current_user: 1},
    action: ActionsUnion
): AppState { 
    console.log(state, action);
    if(action instanceof GUIAction) {
        const gui = GUIReducer(state.gui, action as GUIActionUnion);
        return {...state, gui};
    }
    if(action instanceof UserAction) {
        const users = UserReducer(state.users, action as UserActionUnion);
        return {...state, users};
    }

    return state;
};
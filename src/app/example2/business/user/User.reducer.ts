import { ActionTypes } from "../actions";
import { sortByIdASC } from "../sort";
import { User } from "./User";
import { AvatarCleared, UserActionUnion } from "./User.action";


export const initialState: User[] = [
];

export function reducer(
    state = initialState,
    action: UserActionUnion
): User[] {
    switch (action.type) {
        case ActionTypes.AddUser: {
            return state;
        }

        case ActionTypes.UserAdded: {

            const user = new User().restore(action.payload);
            const nextState = Array.from(state);
            const index = nextState.findIndex(u => u.id === user.id);
            if (~index)
                nextState.splice(index, 1);
            return [...nextState, user].sort(sortByIdASC);
        }
        case ActionTypes.RemoveUser: {
            return state;
        }
        case ActionTypes.UserDeleted: {
            return state.filter(u => u.id !== action.id);
        }
        case ActionTypes.ChangeUser: {
            return state; 
        }

        case ActionTypes.ChangeUserRole: { 
            return state;
        }

        case ActionTypes.SetAvatar: { 
            return state;
        }

        case ActionTypes.ClearAvatar: { 
            return state;
        }

        case ActionTypes.AvatarCleared: {
            const oldUser = state.find(u => u.id === action.id)!;
            const user = new User().restore(oldUser).clearAvatar();
            return [...state.filter(u => u.id !== action.id), user].sort(sortByIdASC);
        }

        case ActionTypes.LoadUsers: {
            return state;
        }

        case ActionTypes.LoadedUsers: {
            return [...action.users].sort(sortByIdASC);
        }

        case ActionTypes.ErrorLoadedUsers: {
            return state;
        }

        case ActionTypes.UpdatedUser: {
            const oldUser = state.find(u => u.id === action.payload.id)!;
            const user = new User().restore(oldUser).patch(action.payload);
            return [...state.filter(u => u.id !== action.payload.id), user].sort(sortByIdASC);
        }

        case ActionTypes.ErrorUpdatedUser: {
            return state;
        }

        default: {
            return state;
        }
    }
}
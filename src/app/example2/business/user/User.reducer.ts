import { ActionTypes } from "../actions";
import { sortByIdASC } from "../sort";
import { User } from "./User";
import { UserActionUnion } from "./User.action";


export const initialState: User[] = [ 
];

export function reducer(
    state = initialState,
    action: UserActionUnion
): User[] {
    switch (action.type) {
        case ActionTypes.AddUser: {
            const user = new User().restore(action.payload);
            const nextState = Array.from(state);
            const index = nextState.findIndex(u => u.id === user.id);
            if (~index)
                nextState.splice(index, 1);
            return [...nextState, user].sort(sortByIdASC);
        }

        case ActionTypes.RemoveUser: {
            return state.filter(u => u.id !== action.id);
        }

        case ActionTypes.ChangeUser: {
            const oldUser = state.find(u => u.id === action.payload.id)!;
            const user = new User().restore(oldUser).changeDescription(action.payload);
            return [...state.filter(u => u.id !== action.payload.id), user].sort(sortByIdASC);
        }

        case ActionTypes.ChangeUserRole: {
            const oldUser = state.find(u => u.id === action.payload.id)!;
            const user = new User().restore(oldUser).changeRole(action.payload);
            return [...state.filter(u => u.id !== action.payload.id), user].sort(sortByIdASC);
        }

        case ActionTypes.SetAvatar: {
            const oldUser = state.find(u => u.id === action.payload.id)!;
            const user = new User().restore(oldUser).setAvatar(action.payload.avatar!);
            return [...state.filter(u => u.id !== action.payload.id), user].sort(sortByIdASC);
        }
        
        case ActionTypes.ClearAvatar: {
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
 
        default: {
            return state;
        }
    }
}
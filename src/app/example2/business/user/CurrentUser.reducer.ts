import { ActionTypes } from "../actions";
import { ChangeCurrentUser } from "./User.action";

export function reducer(state = +(localStorage.getItem("iam") || 1), action: ChangeCurrentUser) {
    switch (action.type) {
        case ActionTypes.ChangeCurrentUser: {
            localStorage.setItem("iam", action.id.toString()); 
            return action.id;
        }
        default:
            return state;
    }
}
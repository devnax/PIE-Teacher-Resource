import { OPEN_SIDEBAR } from "@redux/types";



const initialState = {
    openSidebar: false
}



export default function (state = initialState, action) {
    
    switch(action.type){
        case OPEN_SIDEBAR: 
            return {
                ...state,
                openSidebar: !state.openSidebar ? true : false
            }
        break;
        default:
            return state
    }
}
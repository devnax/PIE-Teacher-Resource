import {FOLDER_CREATE_DIALOG, CURRENT_PATH, PATH_DATA, SELECT_FILE} from '@redux/types'

const initialState = {
    dialog_open: false,
    current_path: '/',
    path_data: {},
    selected_files: {}
}


export default function (state = initialState, action){
    switch (action.type) {
        case FOLDER_CREATE_DIALOG:
            return {
                ...state,
                dialog_open: !state.dialog_open ? true : false
            }
            break;
        case CURRENT_PATH:
            return {
                ...state,
                current_path: action.payload
            }
            break;
        case PATH_DATA:
            return {
                ...state,
                path_data: action.payload
            }
            break;
        case SELECT_FILE:
            if(state.selected_files[action.payload]){
                delete state.selected_files[action.payload];
                return {
                    ...{},
                    ...state,
                    selected_files: state.selected_files
                }
            }
            var newFile = {
                ...state.selected_files,
                [action.payload]: true
            }
            return {
                ...state,
                selected_files: newFile
            }
            break;
        
    
        default:
            return state;
            break;
    }
}

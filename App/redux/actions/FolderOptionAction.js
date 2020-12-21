import { FOLDER_CREATE_DIALOG, PATH_DATA, CURRENT_PATH, SELECT_FILE } from '@redux/types';



export function handleDialog(){
    return {
        type:  FOLDER_CREATE_DIALOG
    }
}

export function updatePathData(p){
    
    return {
        type:  PATH_DATA,
        payload: p
    }
}

export function updateCurrentPath(p){
    
    return {
        type:  CURRENT_PATH,
        payload: p
    }
}

export function selectFile(p){
    
    return {
        type:  SELECT_FILE,
        payload: p
    }
}


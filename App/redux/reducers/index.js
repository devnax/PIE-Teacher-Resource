import { combineReducers } from "redux";
import sidebarReducer from '@redux/reducers/sidebarReducer'
import FolderOptionReducer from '@redux/reducers/FolderOptionReducer'



export default combineReducers({
    sidebarReducer,
    FolderOptionReducer
});
import { Grid, Typography,IconButton,CircularProgress } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import { connect } from "react-redux";
import {updatePathData, updateCurrentPath} from "@redux/actions/FolderOptionAction";
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/PlayForWork';



const useStyles = makeStyles((theme) =>
  createStyles({
    itemBox:{
        textAlign: 'center',
        background: '#FEF3ED',
        width: 90,
        height: 90,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        margin: 10,
        marginBottom: 5,
        cursor: "pointer",
        position: 'relative',
        '&:hover button':{
            display: 'block!important'
        }
    },
    deleteIcon:{
        position: 'absolute',
        top: 2,
        right: 2,
        display: 'none'
    },
    downloadIcon:{
        position: 'absolute',
        bottom: 2,
        right: 2,
        display: 'none'
    },
    icon:{
        fontSize: 50
    },
    title:{
        textAlign: 'center',
        textTransform: 'initial',
        display: 'block'
    },
    progress:{
        position: 'absolute',
    }
  }),
);



const FileItem = ({item, updatePathData, updateCurrentPath, current_path}) => {
    const classes = useStyles();
    const [isPregress, setProgress] = React.useState(false)
    

    const deleteItem = path =>{

        if(!confirm("Are You sure to delete this item")){
            return;
        }

        setProgress(true)

        const data = {
            action: 'pt_delete_dir',
            path: current_path,
            file: path.id,
          }
          window.jQuery.ajax({
            url: ajaxurl,
            method: 'post',
            data: data,
            success: function(res){
              updatePathData(res)
              setProgress(false)
            }
        });
    }

    const downloadItem = path => {
        console.log(path)
        const link = document.createElement('a');
        link.href = path.url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const enterTopath = path =>{

        if(path.type == 'file'){
            window.open(path.url,'_blank');
            return;
        }
        setProgress(true)
        const dir = current_path+path.name+"/";
        const data = {
            action: 'pt_get_dir',
            path: dir,
          }
          window.jQuery.ajax({
            url: ajaxurl,
            method: 'post',
            data: data,
            success: function(res){
              updatePathData(res)
              updateCurrentPath(dir)
              setProgress(false)
            }
        });
    }

    var fileAttrs = {};
    if(item.type == 'file' ){
        fileAttrs = {
            href: item.url,
            target: '_blank'
        };
    }

    
    return (
        <Grid item className={classes.controlCol}>
         <div>
            <div className={classes.itemBox} onDoubleClick ={() => enterTopath(item)}  >
                <IconButton aria-label="delete" className={classes.deleteIcon} size="small" onClick={e => deleteItem(item)}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
                {
                    item.type == 'folder' ? "" : (<a href={item.url} download><IconButton  aria-label="delete" className={classes.downloadIcon} size="small" >
                    <DownloadIcon fontSize="inherit" /></IconButton></a>)
                }
                
                
                {isPregress ? <CircularProgress size={20} className={classes.progress} /> : ''}
                {item.type == 'folder' ? <FolderIcon className={classes.icon} style={{color: 'orange'}}/> : <FileIcon className={classes.icon} style={{color: 'black'}} /> }
            </div>
            <Typography align="center" variant="button" className={classes.title}>
                {item.name.substr(-14)}
            </Typography> 
         </div>
      </Grid>
    )
}
const mapStateToProps = state => {
    return {
        current_path: state.FolderOptionReducer.current_path
    }
}
export default connect(mapStateToProps, {updatePathData, updateCurrentPath})(FileItem);
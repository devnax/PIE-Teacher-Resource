import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, TextField, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import {handleDialog, updatePathData} from "@redux/actions/FolderOptionAction";
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }
}));

const SimpleDialog = ({handleDialog, openDialog, current_path, updatePathData}) => {
  const classes = useStyles();
  const [folderName, setFolderName] = React.useState(null);



  const createHandle = () => {
    if(!folderName.length){
      return;
    }
    const data = {
      action: 'pt_create_folder',
      name: folderName,
      path: current_path,
    }
    window.jQuery.ajax({
      url: ajaxurl,
      method: 'post',
      data: data,
      success: function(res){
        updatePathData(res)
        handleDialog()
        setFolderName(null)
      }
    });
  }
 
  const updateFolderName = e => {
    setFolderName(e.target.value);
  }

  return (
    <Dialog onClose={handleDialog}  open={openDialog}>
        <DialogTitle id="simple-dialog-title">Enter Folder Name or File Url</DialogTitle>
        <form className={classes.form}  autoComplete="off" onSubmit={e => {e.preventDefault(), createHandle()}}>
            <TextField onChange={updateFolderName} id="standard-basic" label="Standard" />
            <div><Button onClick={createHandle} color="primary">Create</Button></div>
        </form>
    </Dialog>
  );
}

const mapStateToProps = state =>{
    return {
        openDialog: state.FolderOptionReducer.dialog_open,
        current_path: state.FolderOptionReducer.current_path,
    }
}

export default connect(mapStateToProps, {handleDialog, updatePathData})(SimpleDialog);
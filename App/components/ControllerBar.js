import {connect} from 'react-redux'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, IconButton } from "@material-ui/core";
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewListIcon from '@material-ui/icons/ViewList';
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import AddBoxIcon from '@material-ui/icons/AddBox';

import sidebarToggle from "@redux/actions/sidebarAction";
import {handleDialog, updateCurrentPath, updatePathData} from "@redux/actions/FolderOptionAction";
import FolderCreate from "@components/FolderCreate";
import Breadcurmb from "@components/breadcurm";


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: 10,
      borderBottom: '1px solid #ddd'
    },
    controlCol:{
        display: 'inline-flex'
    },
    title:{
        padding: 0,

    }
  }),
);

const ControlerBar = ({sidebarToggleHandle, handleDialog, updatePathData, updateCurrentPath})  =>{
  const classes = useStyles();


  const goHomeDirectory = () => {
    const data = {
      action: 'pt_get_dir',
      path: '/',
    }
    window.jQuery.ajax({
      url: ajaxurl,
      method: 'post',
      data: data,
      success: function(res){
        updatePathData(res)
        updateCurrentPath('/')
      }
  });
  }

  const isAdmin = window.PT_SETTING.is_user_admin;


  return (
    <Grid
    container
    direction="row"
    justify="space-between"
    alignItems="center"
    className={classes.root}
    >
      <Grid item className={classes.controlCol}>
           <Typography variant="h5" component="h2">
                Teacher Resources
            </Typography>
            <Breadcurmb />
      </Grid>
      <Grid item className={classes.controlCol}>
        <IconButton color="primary" aria-label="upload picture" component="span" onClick={goHomeDirectory}>
          <HomeIcon />
        </IconButton>
        {/* <IconButton color="primary" aria-label="upload picture" component="span" onClick={sidebarToggleHandle}>
          <ViewListIcon />
        </IconButton> */}
        {
          !isAdmin ? '' : (
          <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleDialog}>
              <CreateNewFolderIcon />
            </IconButton>
          ) 
        }

        {
          !isAdmin ? '' : <FolderCreate />
        }
        
      </Grid>
    </Grid>
  );
}



const Actions = {
    sidebarToggleHandle: sidebarToggle,
    handleDialog,
    updatePathData,
    updateCurrentPath
}

export default connect(null, Actions)(ControlerBar);

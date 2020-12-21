import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import {updatePathData} from "@redux/actions/FolderOptionAction";
import FileItem from '@components/fileItem';




const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: 10,
    },
    controlCol:{
        display: 'inline-flex'
    }
  }),
);

const FileGrid = ({path_data, current_path, updatePathData}) => {
  const classes = useStyles();
  const {useEffect} = React;

  useEffect(() => {
    const data = {
      action: 'pt_get_dir',
      path: current_path,
    }
    window.jQuery.ajax({
      url: ajaxurl,
      method: 'post',
      data: data,
      success: function(res){
        updatePathData(res)
      }
    });
  },[]);
  
  

  return (
    <Grid
    container
    direction="row"
    alignItems="center"
    className={classes.root}
    >
    
    {Object.keys(path_data).map((key)=> <FileItem key={key} item={path_data[key]}/>)}
      
      
      
      
    </Grid>
  );
}
const mapStateToProps = state => {
  return {
    path_data: state.FolderOptionReducer.path_data,
    current_path: state.FolderOptionReducer.current_path
  }
}
export default connect(mapStateToProps, {updatePathData})(FileGrid);

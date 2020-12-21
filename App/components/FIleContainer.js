import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core";
import FolderIcon from '@material-ui/icons/Folder';
import FileGrid from "@components/FileGrid";
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
    },
    sideList:{
        width: 180,
        borderRight: "1px solid #ddd",
        padding: 10,
    },
    container:{
      padding: 10,
      minHeight: 500,
    }
  }),
);

const FileContainer = ({openSidebar}) => {
  const classes = useStyles();
  return (
    <Grid
    container
    direction="row"
    className={classes.root}
    >
      <Grid item className={classes.sideList} style={!openSidebar ? {display: 'none'} : {}}>
         
      </Grid>
      <Grid item className={classes.container} style={!openSidebar ? {width: '100%'} : {}}>
          <FileGrid />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    openSidebar: state.sidebarReducer.openSidebar
  }
}
export default connect(mapStateToProps, {})(FileContainer);
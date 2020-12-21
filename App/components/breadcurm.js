import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { connect } from "react-redux";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import _ from "lodash";
import {updatePathData, updateCurrentPath} from "@redux/actions/FolderOptionAction";


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: 6,
      marginLeft: 10
    }
  }),
);




const BreadcrumbsTree = ({current_path, updatePathData, updateCurrentPath}) => {
    var items = [];
    var path = current_path.trim()
    if(path == '/'){
        items.push({
            name: "Home",
            path: path
        })
    }else{
        path = _.trimEnd(path,'/')
        var paths = path.split('/')
        var newPath = '';
        _.forEach(paths, val => {
            if(_.isEmpty(val)){
                newPath = '/'
                items.push({
                    name: "Home",
                    path: newPath 
                })
            }else{
                newPath+= val+"/";
                items.push({
                    name: val,
                    path: newPath
                })
            }
            
        });

    }


    const handleClick = item => {
    
        if(path.type == 'file'){
            window.open(path.url,'_blank');
            return;
        }
        const dir = item.path;
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
            }
        });
    }
    const classes = useStyles();

    return (
        <Breadcrumbs aria-label="breadcrumb" className={classes.root}>
            {items.map(item => <Link color="inherit" href="/" onClick={e => {e.preventDefault(); handleClick(item)}}>{item.name}</Link>)}
        </Breadcrumbs>
    );
}

const mapStateToProps = state => {
    return {
      current_path: state.FolderOptionReducer.current_path
    }
  }
export default connect(mapStateToProps, {updatePathData, updateCurrentPath})(BreadcrumbsTree);

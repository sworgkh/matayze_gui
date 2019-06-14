import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

class PaperSheet extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id :  props.message.id,
            title: props.message.title,
            message: props.message.message,
        }
        this.delete = this.delete.bind(this);
    }

    delete() {
        this.props.delete(this.state.id);
    }

    render() {
        return (
            <div style={{margin:10, width:this.props.width, height: 90, float: 'left'}}>
                <Paper className={styles.root} style={{
                    display: 'flex',
                    backgroundColor:'transparent',
                    flexWrap: 'wrap',
                    border: 'solid 2px white',
                    borderRadius: '10px',
                    justifyContent:'space-between',
                    alignContent: 'space-between',
                    
                    // margin:10,
                    width:'100%'

                }} elevation={1}>
                    <div>
                        <Typography style={{margin:10, color: 'white'}} variant="h5" component="h3">
                            {this.state.title}
                        </Typography>
                        <Typography style={{margin:10, color: 'white'}} component="p">
                            {this.state.message}
                        </Typography>
                    </div>
                    <div>
                        <Fab onClick={this.delete}  style={{margin:10, color:'rgb(101, 0, 101, 0.7)'}} aria-label="Delete"
                             className={styles.fab}>
                            <DeleteIcon />
                        </Fab>
                    </div>
                </Paper>
            </div>
        );


    }
}


export default withStyles(styles)(PaperSheet);

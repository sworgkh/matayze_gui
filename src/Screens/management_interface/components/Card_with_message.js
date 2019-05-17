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
            title: props.message.title,
            message: props.message.message,
        }
        this.delete = this.delete.bind(this);
    }

    delete() {
        this.props.delete(this.state.title);
    }

    render() {
        return (
            <div style={{margin:10,width:'96%'}}>
                <Paper className={styles.root} style={{ display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent:'space-between',
                    alignContent: 'space-between'

                }} elevation={1}>
                    <div>
                        <Typography style={{margin:10}} variant="h5" component="h3">
                            {this.state.title}
                        </Typography>
                        <Typography style={{margin:10}} component="p">
                            {this.state.message}
                        </Typography>
                    </div>
                    <div>
                        <Fab style={{margin:10}} aria-label="Delete"
                             className={styles.fab}>
                            <DeleteIcon onClick={this.delete} />
                        </Fab>
                    </div>
                </Paper>
            </div>
        );


    }
}


export default withStyles(styles)(PaperSheet);

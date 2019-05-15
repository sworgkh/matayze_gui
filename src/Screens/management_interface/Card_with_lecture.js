import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = {
    card: {
        maxWidth: 600,
        width: "31%",
        float: "left",
        margin: "1%"
    },
    media: {
        height: 400,
    },
};



class Lecture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start_time: props.allData.start_time,
            end_time: props.allData.end_time,
            lecture: props.allData.lecture,
            message: props.allData.message,
            lecturer: props.allData.lecturer,
            room: props.allData.room,
        };
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);


    }

    edit(){
        alert("edit " + this.state.lecture)
    }

    delete(){
        alert("delete " +  this.state.lecture)
    }

    render() {
        return (
            <Card style={styles.card}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2"> {this.state.lecture}</Typography>
                        <Typography component="p">{this.state.message} </Typography>
                        <Typography component="p">{this.state.start_time} </Typography>
                        <Typography component="p">{this.state.end_time} </Typography>
                        <Typography component="p">{this.state.lecturer} </Typography>
                        <Typography component="p">{this.state.room} </Typography>

                    </CardContent>
                </CardActionArea>
                <CardActions style={{justifyContent: 'space-between'}}>
                    <Button size="small" color="primary" onClick={this.edit}>
                        Edit
                    </Button>
                    <Button size="small" color="primary"  onClick={this.delete}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        );
    }
}


export default withStyles(styles)(Lecture);
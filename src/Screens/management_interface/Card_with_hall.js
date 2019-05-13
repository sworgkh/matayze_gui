import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import bla from "./1.png";


const styles = {
    card: {
        maxWidth: 600,
    },
    media: {
        height: 300,
    },
};



class MediaCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            img: props.img,
            header: props.header
        };
    }

    bla(){
        alert("bla")
    }

    render() {
        return (
            <Card className={styles.card}>
                <CardActionArea>
                    <CardMedia
                        className={styles.media}
                        // image={this.state.img}
                        image="1.png"
                        // image="https://cdn.pixabay.com/photo/2013/04/06/11/50/image-editing-101040_1280.jpg"
                        title="Contemplative Reptile"
                    />
                    <img src={this.state.img} alt="bla" />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.state.header}
                        </Typography>
                        <Typography component="p">{this.state.text}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{justifyContent: 'space-between'}}>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary"  onClick={this.bla}>
                        Do
                    </Button>
                </CardActions>
            </Card>
        );
    }
}


export default withStyles(styles)(MediaCard);
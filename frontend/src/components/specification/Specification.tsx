import React from 'react'
import { Card, CardHeader, CardMedia, Typography, CardContent, CardActions, IconButton, Collapse, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    grid: {
        margin: theme.spacing(1, 1)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    paper: {
        height: 140,
        width: 100
    },
    card: {
        maxWidth: 345
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    }
}));

type SpecificationProps = {
    title: string,
    creationDate: Date,
    slug: string
}

const Specification: React.FunctionComponent<SpecificationProps> = props => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
                title={props.title}
                subheader={props.creationDate} />
            <CardMedia
                className={classes.media}
                image="/React-icon.svg"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={`/${props.slug}`}>
                    Go to specification
                </Link>
            </CardActions>
        </Card>
    )
}

export default Specification;
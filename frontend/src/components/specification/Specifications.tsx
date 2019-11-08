import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Specification from './Specification';

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


const Specifications = () => {
    const specifications = [
        { title: "Spec1", creationDate: "2019-10-10" },
        { title: "Spec2", creationDate: "2019-11-11" },
        { title: "Spec2", creationDate: "2019-11-11" },
    ];
    const classes = useStyles();

    const specComponents = specifications.map(spec => (
        <Grid item>
            <Specification title={spec.title} creationDate={spec.creationDate} />
        </Grid>
    ));

    return (
        <Grid className={classes.grid} container justify="center" spacing={4}>
            {specComponents}
        </Grid>
    )
}

export default Specifications

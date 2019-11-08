import React from 'react'
import { Grid, Paper, Card, CardHeader } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    grid: {
        margin: theme.spacing(1, 1)
    },
    paper: {
        height: 140,
        width: 100
    },
    card: {
        maxWidth: 345
    }
}));

type SpecificationProps = {
    title: string,
    creationDate: string
}

const Specification: React.FunctionComponent<SpecificationProps> = props => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false)
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    return (
        <Card className={classes.card}>
            <CardHeader 
                title={props.title}
                subheader={props.creationDate}>

            </CardHeader>
        </Card>
    )
}

const Specifications = () => {
    const nums = [0, 1, 2];
    const classes = useStyles();

    const gridItems = nums.map(num => (
        <Grid key={num} item>
            <Paper className={classes.paper} />
        </Grid>
    ))

    return (
        <Grid className={classes.grid} container spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {gridItems}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Specifications

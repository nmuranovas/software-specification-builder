import React from 'react'
import { Typography, TextField, makeStyles, Theme, createStyles, Button, Grid, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

const maximumFRCount = 20;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            margin: theme.spacing(1)
        }
    })
)

type ListEditingComponentProps = {
    title: string,
    values: string[],
    valuesChanged: ((newValues: string[]) => void)
}

const ListEditingComponent = (props: ListEditingComponentProps) => {
    const classes = useStyles();

    const handleRequirementChange = (index: number, newValue: string) => {
        const valuesCopy = props.values.slice();
        valuesCopy[index] = newValue;
        props.valuesChanged(valuesCopy);
    }

    const removeRequirement = (index: number) => {
        const valuesCopy = props.values.slice();
        valuesCopy.splice(index, 1);
        props.valuesChanged(valuesCopy);
    }

    const addNewRequirement = () => {
        const valuesCopy = props.values.slice();
        valuesCopy.push("");
        props.valuesChanged(valuesCopy);
    }

    const requirementTextFields = props.values.map((fr, index) => (
        <React.Fragment>
            <Grid container alignItems="center">
                <Grid item xs={11}>
                    <TextField
                        key={index}
                        className={classes.textField}
                        multiline
                        fullWidth
                        value={fr}
                        onChange={event => handleRequirementChange(index, event.target.value)}
                        label={`Requirement #${index + 1} description`} />
                </Grid>
                <Grid item xs={1}>
                    <IconButton aria-label="delete"
                        color="secondary"
                        onClick={() => removeRequirement(index)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </React.Fragment>
    ))

    return (
        <React.Fragment>
            <Typography variant="h5" component="h3" gutterBottom>
                {props.title}
            </Typography>
            {requirementTextFields}
            <Button onClick={addNewRequirement} disabled={maximumFRCount === props.values.length} variant="contained" color="primary">
                Add requirement
            </Button>
        </React.Fragment>
    )
}

export default ListEditingComponent

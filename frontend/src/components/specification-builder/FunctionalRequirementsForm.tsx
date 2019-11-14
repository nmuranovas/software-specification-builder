import React, { useState } from 'react'
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

const FunctionalRequirementsForm = () => {
    const classes = useStyles();
    const [functionalRequirements, setFunctionalRequirements] = useState(["Example requirement"]);

    const handleRequirementChange = (index: number, newValue: string) => {
        const requirements = functionalRequirements.slice();
        requirements[index] = newValue;
        setFunctionalRequirements(requirements);
    }

    const removeRequirement = (index: number) => {
        const requirementCopy = functionalRequirements.slice();
        requirementCopy.splice(index, 1);
        setFunctionalRequirements(requirementCopy);
    }

    const addNewRequirement = () => {
        const requirementCopy = functionalRequirements.slice();
        requirementCopy.push("");
        setFunctionalRequirements(requirementCopy);
    }

    const requirementTextFields = functionalRequirements.map((fr, index) => (
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
                        <DeleteIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </React.Fragment>
    ))

    return (
        <React.Fragment>
            <Typography variant="h5" component="h3" gutterBottom>
                Functional requirements
            </Typography>
            <Typography gutterBottom>
                {requirementTextFields}
            </Typography>
            <Button onClick={addNewRequirement} disabled={maximumFRCount === functionalRequirements.length} variant="contained" color="primary">
                Add requirement
            </Button>
        </React.Fragment>
    )
}

export default FunctionalRequirementsForm

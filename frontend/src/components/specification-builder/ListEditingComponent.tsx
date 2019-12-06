import React, { useState, useEffect } from 'react'
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
    inputName: string,
    values: string[],
    onValuesChange: (name: string, value: string[]) => void,
    onFieldsValid: () => void,
    onFieldsNotValid: () => void
}

const ListEditingComponent = (props: ListEditingComponentProps) => {
    const classes = useStyles();

    const {values} = props;

    useEffect(() => {
        if (values.length < 1){
            props.onFieldsNotValid();
        }else{
            const anyFieldEmpty = values.filter(val => val === "").length > 0;
            if (anyFieldEmpty){
                props.onFieldsNotValid();
            }else{
                props.onFieldsValid();
            }
        }
    }, [values]);

    const handleRequirementChange = (index: number, newValue: string) => {
        const valuesCopy = values.slice();
        valuesCopy[index] = newValue;
        props.onValuesChange(props.inputName, valuesCopy);
    }

    const removeRequirement = (index: number) => {
        const valuesCopy = values.slice();
        valuesCopy.splice(index, 1);
        props.onValuesChange(props.inputName, valuesCopy);
    }

    const addNewRequirement = () => {
        const valuesCopy = values.slice();
        valuesCopy.push("");
        props.onValuesChange(props.inputName, valuesCopy);
    }

    const requirementTextFields = values.map((fr, index) => (
            <Grid container alignItems="center">
                <Grid item xs={11}>
                    <TextField
                        name={props.inputName}
                        key={index}
                        className={classes.textField}
                        multiline
                        fullWidth
                        value={fr}
                        onChange={event => handleRequirementChange(index, event.target.value)}
                        label={`Requirement #${index + 1} description`}
                        error={fr.length < 1 || fr.length > 160}
                        helperText={fr.length < 1 ? "Cannot be empty" : fr.length > 160 ? "Cannot contain more than 160 characters" : null}
                        />
                </Grid>
                <Grid item xs={1}>
                    <IconButton aria-label="delete"
                        color="secondary"
                        onClick={() => removeRequirement(index)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
    ))

    return (
        <React.Fragment>
            <Typography variant="h5" component="h3" gutterBottom>
                {props.title}
            </Typography>
            {requirementTextFields}
            <Button onClick={addNewRequirement} disabled={maximumFRCount === values.length} variant="contained" color="primary">
                Add requirement
            </Button>
        </React.Fragment>
    )
}

export default ListEditingComponent

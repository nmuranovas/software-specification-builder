import React from 'react'
import { Typography, TextField, makeStyles, Theme, createStyles, Grid } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        }
    }))

const SpecificationInfoForm = () => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography variant="h5" component="h3" gutterBottom>
                Specification information
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField className={classes.textField} required fullWidth label="Title" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField className={classes.textField} required fullWidth label="Audience" />
                </Grid>
                <Grid item xs={12}>
                    <TextField className={classes.textField}
                        required
                        multiline
                        fullWidth 
                        label="Purpose" />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default SpecificationInfoForm

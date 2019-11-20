import React from 'react'
import { Container, Grid, Theme } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles'
import DashboardMenu from './DashboardMenu'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        visualiser1: {
            backgroundColor: 'red'
        },
        visualiser2: {
            backgroundColor: 'blue'
        },
        grid: {
            margin: theme.spacing(2, 2)
        }
    })
)

const Dashboard = () => {
    const styles = useStyles();

    return (
            <Grid className={styles.grid} container justify="center" alignContent="center">
                <Grid item md={3}>
                    <DashboardMenu/>
                </Grid>
                <Grid className={styles.visualiser2} item md={6}>
                    a
                </Grid>
            </Grid>
    )
}

export default Dashboard

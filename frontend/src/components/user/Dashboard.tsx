import React, { useEffect, useState } from 'react'
import { Container, Grid, Theme, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles'
import DashboardMenu from './DashboardMenu'
import SpecificationListing from './SpecificationListing'
import { useAuth0 } from '../../services/react-auth0-spa'
import { fetchMySpecifications } from '../../services/BackendAPI'
import { ShortenedSpecificationModel } from '../../models/Specification'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grid: {
            margin: theme.spacing(2, 2)
        }
    })
)

const Dashboard = () => {
    const styles = useStyles();
    const { getTokenSilently } = useAuth0();
    const [specifications, setSpecifications] = useState<ShortenedSpecificationModel[]>()

    useEffect(() => {
        const fetchSpecifications = async () => {
            const token = await getTokenSilently();
            const response = await fetchMySpecifications(token);
            setSpecifications(response.data.specifications)
        }

        fetchSpecifications();
    }, [])

    const specListing = !specifications ? <div>Loading...</div> : <SpecificationListing specifications={specifications} />

    return (
        <React.Fragment>
            <Grid className={styles.grid} container justify="center" alignContent="center">
                <Grid item md={3}>
                    <DashboardMenu />
                </Grid>
                <Grid item md={6}>
                    {specListing}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Dashboard

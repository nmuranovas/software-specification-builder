import React, { useEffect, useState } from 'react'
import { Grid, Theme, Container } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles'
import SpecificationListing from './SpecificationListing'
import { useAuth0 } from '../../services/react-auth0-spa'
import { fetchMySpecifications } from '../../services/BackendAPI'
import { ShortenedSpecificationModel } from '../../models/Specification'
import { classes } from 'istanbul-lib-coverage'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
          }
    })
)

const Dashboard = () => {
    const styles = useStyles();
    const { getTokenSilently } = useAuth0();
    const [specifications, setSpecifications] = useState<ShortenedSpecificationModel[]>()
    const [reloadRequested, setReloadRequested] = useState(false)

    useEffect(() => {
        const fetchSpecifications = async () => {
            try {
                const token = await getTokenSilently();
                const response = await fetchMySpecifications(token);
                setSpecifications(response.data.specifications)
            } catch (error) {
                console.log(error)
            } finally {
                setReloadRequested(false);
            }
        }

        fetchSpecifications();
    }, [reloadRequested])

    const handleSpecReload = () => {
        setReloadRequested(true);
    }

    const specListing = !specifications ? <div>Loading...</div> : <SpecificationListing specifications={specifications} onReloadSpecifications={handleSpecReload} />

    return (
        <Container maxWidth="lg" className={styles.container}>
            <Grid container spacing={3}>
                {/* <Grid item md={3}>
                    <DashboardMenu />
                </Grid> */}
                <Grid item xs={12}>
                    {specListing}
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dashboard

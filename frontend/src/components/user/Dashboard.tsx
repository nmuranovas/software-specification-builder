import React, { useEffect, useState } from 'react'
import { Grid, Theme } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles'
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
    const [reloadRequested, setReloadRequested] = useState(false)

    useEffect(() => {
        const fetchSpecifications = async () => {
            try {
                const token = await getTokenSilently();
                const response = await fetchMySpecifications(token);
                setSpecifications(response.data.specifications)
            } catch (error) {
                console.log(error)
            }finally{
                setReloadRequested(false);
            }
        }

        fetchSpecifications();
    }, [reloadRequested])

    const handleSpecReload = () => {
        setReloadRequested(true);
    }

    const specListing = !specifications ? <div>Loading...</div> : <SpecificationListing specifications={specifications} onReloadSpecifications={handleSpecReload}/>

    return (
        <React.Fragment>
            <Grid className={styles.grid} container justify="center" alignContent="center">
                {/* <Grid item md={3}>
                    <DashboardMenu />
                </Grid> */}
                <Grid item md={6}>
                    {specListing}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Dashboard

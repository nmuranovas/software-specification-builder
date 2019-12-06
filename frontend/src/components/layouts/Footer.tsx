import React from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    footer: {
      padding: theme.spacing(3, 2),
      marginTop: 'auto',
      backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    },
  }));

const Footer = () => {
    const styles = useStyles();

    return (
        <footer className={styles.footer}>
            <Container>
                <Typography variant="h6" align="center" component="p" gutterBottom>
                    Software Specification Builder
                </Typography>
                <Typography variant="body2" align="center" component="p">
                    Copyright © Nerijus Muranovas 2019
                </Typography>
            </Container>
        </footer>
    )
}

export default Footer

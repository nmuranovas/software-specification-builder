import React from 'react'
import { Container, Typography } from '@material-ui/core'
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={classes.footer}>
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

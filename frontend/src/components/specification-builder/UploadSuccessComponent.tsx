import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import classes from './UploadSuccessComponent.module.css'

type UploadSuccessComponentProps = {
    specificationSlug: string
}

const UploadSuccessComponent = (props: UploadSuccessComponentProps) => {
    return (
        <div>
            <div className={classes.fullWidth}>
                <p>Specification successfuly uploaded!</p>
            </div>
            <div className={classes.fullWidth}>
                <Link to={`/${props.specificationSlug}`}>
                    <Button>Go to specification</Button>
                </Link>
            </div>
        </div>
    )
}

export default UploadSuccessComponent;

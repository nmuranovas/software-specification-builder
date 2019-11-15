import React from 'react'
import classes from './DottedSpinner.module.css'

type DottedSpinnerProps = {
    color: string
}

const DottedSpinner = (props: DottedSpinnerProps) => {
    return (
        <div className={classes.ldsEllipsis}>
            <div style={{background: props.color}}></div>
            <div style={{background: props.color}}></div>
            <div style={{background: props.color}}></div>
            <div style={{background: props.color}}></div>
        </div>
    )
}

export default DottedSpinner

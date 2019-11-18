import React from 'react'
import CalendarToday from '@material-ui/icons/CalendarToday';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const DateAscendingIcon = () => {
    return (
        <React.Fragment>
            <CalendarToday fontSize="small" />
            <ArrowDropUpIcon />
        </React.Fragment>
    )
}

export default DateAscendingIcon

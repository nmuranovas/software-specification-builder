import React from 'react'
import CalendarToday from '@material-ui/icons/CalendarToday';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const DateDescendingIcon = () => {
    return (
            <React.Fragment>
                <CalendarToday fontSize="small" />
                <ArrowDropDownIcon />
            </React.Fragment>
        )
}

export default DateDescendingIcon

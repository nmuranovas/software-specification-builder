import React from 'react'
import { ListItem, ListItemText, List } from '@material-ui/core'
import { SpecRequirement } from '../../models/Specification'

type RequirementListProps = {
    requirements: SpecRequirement[],
    listItemNumberingText: string
}

const RequirementList = (props: RequirementListProps) => {
    const content = props.requirements.map((req, index) => (
        <ListItem key={index} alignItems="flex-start">
            <ListItemText
                primary={`${props.listItemNumberingText} #${index + 1}`}
                secondary={req.description} />
        </ListItem>
    ))

    return (
        <List>
            {content}
        </List>
    )
}

export default RequirementList

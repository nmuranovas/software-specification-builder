import React from 'react'
import { SpecRequirement } from '../../models/Specification'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

type RequirementPanelProps = {
    requirements: SpecRequirement[],
    heading: string
}

const RequirementPanel = (props: RequirementPanelProps) => {
    const requirements = props.requirements.map((req, index) => (
        <Typography key={index}>
            {index + 1}. {req.description}
        </Typography>
    ))

    return (
        <ExpansionPanel expanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                    {props.heading}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                {requirements}
                {/* <RequirementList requirements={props.requirements}
                    listItemNumberingText="Non-Functional requirement" /> */}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default RequirementPanel

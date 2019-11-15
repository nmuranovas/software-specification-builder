import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Specification from './Specification';
import SpecificationModal from './SpecificationModal';

const useStyles = makeStyles(theme => ({
    grid: {
        margin: theme.spacing(1, 1)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    paper: {
        height: 140,
        width: 100
    },
    card: {
        maxWidth: 345
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    }
}));


const Specifications = () => {
    const specifications = [
        { title: "Spec1", audience: "Some audience", intendedUse: "some use", creationDate: "2019-10-10" },
        { title: "Spec2", audience: "Some audience", intendedUse: "some use", creationDate: "2019-11-11" },
        { title: "Spec2", audience: "Some audience", intendedUse: "some use", creationDate: "2019-11-11" },
    ];
    const classes = useStyles();
    const [showSpecModal, setShowSpecModal] = useState(false);
    const [selectedSpec, setSelectedSpec] = useState(specifications[0]);

    const openSpecModal = (index: number) => {
        setSelectedSpec(specifications[index]);
        setShowSpecModal(true);
    }
    const closeSpecModal = () => { setShowSpecModal(false); }

    const specComponents = specifications.map((spec, index) => (
        <div onClick={() => openSpecModal(index)}>
            <Grid item>
                <Specification title={spec.title} creationDate={spec.creationDate} />
            </Grid>
        </div>
    ));

    return (
        <div>
            <Grid className={classes.grid} container justify="center" spacing={4}>
                {specComponents}
            </Grid>
            <SpecificationModal title={selectedSpec.title}
                audience={selectedSpec.audience}
                intendedUse={selectedSpec.intendedUse}
                open={showSpecModal}
                onClose={closeSpecModal} />
        </div>
    )
}

export default Specifications

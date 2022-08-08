import * as React from 'react';
import {Box} from '@mui/material';
import NavBar from '../../components/NavBar/NavBar'

const NotFound = () => {

    return (
        
        <>
            <NavBar/>
            <Box sx={{m:10}}>
                <h1>Not Found</h1>
            </Box>
        </>
    )
}

export default NotFound

import React from "react";
import { LinearProgress } from '@mui/material';
import { Box } from '@mui/material';
import { Fade } from '@mui/material';

export default function Loading({loading}) {
  return (   
    <Fade
    in={loading}
    style={{
    }}
    unmountOnExit
  >
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
      </Box>
      </Fade>
  );
}

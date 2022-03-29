import { Box, CircularProgress, styled } from '@mui/material'
import React from 'react'

const Root = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: 24
})

export const Loading = () => {
  return (
    <Root>
      <CircularProgress size={64} thickness={2} />
    </Root>
  )
}

import { Box, styled } from '@mui/material'
import { grey } from '@mui/material/colors'

export const Root = styled(Box, {
  shouldForwardProp: (props) => props !== 'noBorder'
})<{ noBorder?: boolean }>(({ theme, noBorder }) => ({
  transition: 'all 0.25s',
  maxWidth: noBorder ? undefined : 360,
  padding: noBorder ? undefined : theme.spacing(4, 2),
  border: noBorder ? undefined : `solid 1px ${grey[300]}`,
  borderRadius: theme.shape.borderRadius
}))

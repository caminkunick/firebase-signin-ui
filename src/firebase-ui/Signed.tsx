import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material'
import { signOut } from 'firebase/auth'
import React from 'react'
import { useFSUI } from '../context'

export const SignedBox = () => {
  const { auth, user, t } = useFSUI()

  const handleSignOut = async () => {
    if (auth) {
      await signOut(auth)
    }
  }

  return (
    <div>
      <List>
        <Divider />
        <ListItem divider>
          <ListItemAvatar>
            <Avatar src={user?.data?.photoURL || undefined} />
          </ListItemAvatar>
          <ListItemText
            primary={user?.data?.displayName}
            secondary={user?.data?.email}
          />
        </ListItem>
        <ListItem divider>
          <Button
            fullWidth
            variant='contained'
            disableElevation
            size='large'
            startIcon={<FontAwesomeIcon icon={['fas', 'sign-out']} />}
            onClick={handleSignOut}
          >
            {t('SignOut')}
          </Button>
        </ListItem>
      </List>
    </div>
  )
}

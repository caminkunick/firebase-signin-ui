import { Button, Stack } from '@mui/material'
import React from 'react'
import { useFSUI } from '../context'

export const RegisForget = () => {
  const { setState, t } = useFSUI()

  const handleChangeTab = (tab: string) => () =>
    setState((s) => ({ ...s, tab }))

  return (
    <Stack direction={'row'} justifyContent='space-between' sx={{ mt: 2 }}>
      <Button onClick={handleChangeTab('forget')}>{t('ForgetPassword')}?</Button>
      <Button
        variant='contained'
        disableElevation
        onClick={handleChangeTab('register')}
      >
        {t('SignUp')}
      </Button>
    </Stack>
  )
}

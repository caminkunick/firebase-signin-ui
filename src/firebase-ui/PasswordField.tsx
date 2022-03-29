import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  FormControl,
  FormHelperText,
  IconButton,
  IconButtonProps,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps
} from '@mui/material'
import React from 'react'
import { forwardRef, MouseEvent, useState } from 'react'
import { useFSUI } from '../context'

const Visibility = () => <FontAwesomeIcon icon={['fas', 'eye']} />
const VisibilityOff = () => <FontAwesomeIcon icon={['fas', 'eye-slash']} />

export const PasswordField = forwardRef(
  (
    props: Pick<
      OutlinedInputProps,
      'value' | 'onChange' | 'onKeyDown' | 'disabled' | 'label' | 'error'
    > & {
      showPassword?: boolean
      uid?: string
      helperText?: React.ReactNode
    } & Pick<IconButtonProps, 'onClick' | 'onMouseDown'>,
    ref
  ) => {
    const { getIcon, t } = useFSUI()
    const [show, setShow] = useState<boolean>(false)

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) =>
      event.preventDefault()

    return (
      <FormControl fullWidth variant='outlined' sx={{ mt: 2 }}>
        <InputLabel htmlFor={props.uid || 'outlined-adornment-password'}>
          {props.label || t('Password')}
        </InputLabel>
        <OutlinedInput
          id={props.uid || 'outlined-adornment-password'}
          type={show ? 'text' : 'password'}
          value={props.value}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          disabled={props.disabled}
          inputRef={ref}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => setShow((s) => !s)}
                onMouseDown={handleMouseDownPassword}
                edge='end'
                tabIndex={4}
                disabled={props.disabled}
              >
                {show
                  ? getIcon('visibilityOff', <VisibilityOff />)
                  : getIcon('visibility', <Visibility />)}
              </IconButton>
            </InputAdornment>
          }
          error={props.error}
          label={props.label || t('Password')}
          tabIndex={2}
        />
        {props.helperText && (
          <FormHelperText error>{props.helperText}</FormHelperText>
        )}
      </FormControl>
    )
  }
)

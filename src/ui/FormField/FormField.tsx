import type { FC } from 'react'
import AsteriskIcon from '../../assets/svg/asterisk-icon.svg?react'
import { IFormFieldProps } from './types'

export const FormField: FC<IFormFieldProps> = ({
  children,
  label,
  errorMessage,
  required,
}) => {
  return (
    <>
      <div className="form-field">
        <label className="form-field__label">
          <div className="form-field__label-wrap">
            {required && <AsteriskIcon width={7} height={22} />}
            <span className="form-field__label-text">{label}</span>
          </div>
          {children}
        </label>
        {errorMessage && (
          <span className="form-field__error-text">{errorMessage}</span>
        )}
      </div>
    </>
  )
}

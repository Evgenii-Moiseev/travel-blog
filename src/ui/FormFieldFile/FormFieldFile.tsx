import type { FC } from 'react'
import UploadIcon from '../../assets/svg/upload-icon.svg?react'
import CameraIcon from '../../assets/svg/camera-icon.svg?react'

import { IFormFieldFileProps } from './types'

export const FormFieldFile: FC<IFormFieldFileProps> = ({
  children,
  label,
  page,
  fileName,
}) => {
  return (
    <>
      <div className="form-field-file">
        <label
          className={`form-field-file__label ${page === 'profile' ? 'form-field-file__label--bordless' : ''}`}
        >
          <div className="form-field-file__label-wrap">
            {page === 'profile' ? (
              <CameraIcon
                className="form-field-file__icon form-field-file__icon--XL"
                width={32}
                height={32}
              />
            ) : (
              <UploadIcon
                className="form-field-file__icon"
                width={14}
                height={14}
              />
            )}
            <span
              className={`form-field-file__label-text ${page === 'profile' ? 'form-field-file__label-text--orange' : ''}`}
            >
              {label}
            </span>
          </div>
          {children}
        </label>
        {fileName&&<span className='form-field-file__name'>Выбран файл: {fileName}</span>}
      </div>
    </>
  )
}

import { FC } from 'react'
import { ILoaderProps } from './types'

export const Loader: FC<ILoaderProps> = ({ modifier }) => {
  return <span className={`loader ${modifier ? modifier : ''}`}></span>
}

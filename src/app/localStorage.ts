import { IAuthState } from './types'

export const loadAuthState = (): IAuthState | undefined => {
  try {
    const serializedState = localStorage.getItem('authState')
    if (!serializedState) return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    console.error('Не удалось загрузить состояние auth из localStorage', error)
    return undefined
  }
}

export const saveAuthState = (state: IAuthState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('authState', serializedState)
  } catch (error) {
    console.error('Не удалось сохранить состояние auth в localStorage', error)
  }
}

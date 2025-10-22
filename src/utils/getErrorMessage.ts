export function getErrorMessage(error: unknown) {
  let errorMessage = 'При отправке данных произошла ошибка'
  let errorStatus = null

  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    error.status === 400
  ) {
    errorMessage = 'Аккаунт с данным email уже существует'
    errorStatus = 400
  }

  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    error.status === 401
  ) {
    errorMessage = 'Неправильный логин или пароль'
    errorStatus = 401
  }

  return { errorMessage, errorStatus }
}

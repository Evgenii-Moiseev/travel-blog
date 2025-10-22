import { Link } from 'react-router-dom'
import LogoIcon from '../../assets/svg/LogoIcon.svg?react'
import { FC, useEffect, useState } from 'react'
import { IHeaderProps } from './types'
import { useGetUserDataQuery } from '../../app/userApiSlice'
import { BASE_URL } from '../../app/config'
import { Button } from '../../ui/Button/Button'
import MenuIcon from '../../assets/svg/menu-icon.svg?react'
import { useLogoutMutation } from '../../app/authApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../../app/authSlice'
import { RootState } from '../../app/store'

export const Header: FC<IHeaderProps> = ({ modifier }) => {
  const { data: user, refetch } = useGetUserDataQuery()
  const [logout, { isLoading: isLogoutLoading, isSuccess: isLogoutSuccess }] =
    useLogoutMutation()

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()

  const handleLogout = () => {
    logout()
    refetch()
  }

  useEffect(() => {
    if (isLogoutSuccess) {
      dispatch(deleteUser())
      setIsMenuOpen(false)
    }
  }, [isLogoutSuccess, dispatch, setIsMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <header className={`header ${modifier ? modifier : ''}`}>
        <img
          src="/header-background.jpg"
          className="header__img"
          width={1920}
          height={251}
        />
        <div className="container">
          <div className="header__wrap">
            <Link to={'/'} className="header__link">
              <LogoIcon className="header__logo" width={182} height={41} />
            </Link>

            {isAuthenticated && user ? (
              <div className="header__user">
                <img
                  src={user.photo ? `${BASE_URL}${user.photo}` : '/profile.jpg'}
                  alt={user.full_name}
                  className="header__avatar"
                  width={30}
                  height={30}
                />
                <span className="header__user-name">{user.full_name}</span>
                <Button
                  className={`btn btn--borderless header__menu-btn ${!isMenuOpen ? '' : 'header__menu-btn--open'}`}
                  type="button"
                  onClick={toggleMenu}
                >
                  <MenuIcon
                    className="btn__icon btn__icon--S header__menu-icon"
                    width={14}
                    height={11}
                  />
                </Button>
                {isMenuOpen && (
                  <div className="header__menu">
                    <Link to={'/profile'} className="header__menu-item">
                      Профиль
                    </Link>
                    <Button
                      className="btn btn--borderless btn--text"
                      onClick={handleLogout}
                      isLoading={isLogoutLoading}
                    >
                      Выйти
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Link to={'/login'} className="header__link">
                Войти
              </Link>
            )}
          </div>
          <div className="header__slogan-wrap">
            {modifier ? (
              <span className="header__slogan">
                Там, где мир начинается с&nbsp;путешествий
              </span>
            ) : (
              <span className="header__slogan">Истории ваших путешествий</span>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

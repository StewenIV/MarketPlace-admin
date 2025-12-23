import { useState, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { paths } from 'routes/helper'
import { post } from 'helpers/request'
import { useAppSelector, useAppDispatch } from 'store'
import Input from 'components/Input'
import Button from 'components/Button/Button'
import { setIsAppLoading, setIsLogged } from 'features/App/reducer'
import logo from 'features/Header/img/logo.png'
import {
  PageWrapper,
  FormWrapper,
  Logo,
  Heading,
  SubHeading,
  VerticalCol,
  AuthForm,
  GoToWrapper
} from './styled'
import { selectIsAppLoading } from 'features/App/selectors'

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isApploading = useAppSelector(selectIsAppLoading)

  const [fields, setFields] = useState({
    loginOrEmail: process.env.REACT_APP_DEV_LOGIN || '',
    password: process.env.REACT_APP_DEV_PASSWORD || ''
  })

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields({
        ...fields,
        [e.target.name]: e.target.value
      })
    },
    [fields]
  )

  const isLoginDisabled = useCallback(() => {
    return !fields['loginOrEmail'] || !fields['password']
  }, [fields])

  const handleLogin = useCallback(async () => {
    dispatch(setIsAppLoading(true))

    const res = await post('/users/login', {
      loginOrEmail: fields['loginOrEmail'],
      password: fields['password']
    })

    const { status } = res

    if (status === 'error') {
      toast.error('Введены неверные данные')
      dispatch(setIsAppLoading(false))
      return
    }

    dispatch(setIsLogged(true))

    navigate(paths.home)

    toast.success('Успешный вход в систему')

    dispatch(setIsAppLoading(false))
  }, [dispatch, fields, navigate])

  const handleFormKeyPress = useCallback(
    ({ code }: React.KeyboardEvent<HTMLFormElement>) => {
      if (['Enter', 'NumpadEnter'].includes(code) && !isLoginDisabled()) {
        handleLogin()
      }
    },
    [handleLogin, isLoginDisabled]
  )

  return (
    <PageWrapper>
      <Helmet>
        <title>Вход в систему</title>
      </Helmet>

      <FormWrapper>
        <Logo src={logo} alt="logo" />
        <Heading>Добро пожаловать!</Heading>
        <SubHeading>Пожалуйста, войдите в свою учетную запись</SubHeading>

        <AuthForm>
          <VerticalCol onKeyPress={handleFormKeyPress}>
            <Input
              name="loginOrEmail"
              label="Логин или почта"
              placeholder="Введите логин или почту"
              autocomplete="username"
              value={fields['loginOrEmail']}
              onChange={onChangeInput}
            />

            <Input
              name="password"
              label="Пароль"
              placeholder="Введите пароль"
              autocomplete="current-password"
              value={fields['password']}
              onChange={onChangeInput}
              type="password"
            />
          </VerticalCol>

          <Button
            block
            onClick={handleLogin}
            disabled={isLoginDisabled() || isApploading}
          >
            Войти
          </Button>
        </AuthForm>

        <GoToWrapper>
          <span>Не зарегистрированы?</span>
          &nbsp;
          <Link to={paths.register}>Пройти регистрацию</Link>
        </GoToWrapper>
        <GoToWrapper>
          <Link to={paths.home}>На главную</Link>
        </GoToWrapper>
      </FormWrapper>
    </PageWrapper>
  )
}

export default LoginPage

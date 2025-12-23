import { lazy, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import { useAppDispatch } from 'store'
import history from 'store/histrory'
import { get } from 'helpers/request'
import { setIsLogged } from 'features/App/reducer'
import { setAdminData } from 'features/AdminData/reducer'
import { checkPathMatch, paths } from './helper'

const ProductsPage = lazy(() => import('pages/ProductsPage'))

const PrivateRoutes: React.FC = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const rawData = localStorage.getItem('MW_MP_TOKEN_ADMIN')

    // 1. Сначала проверяем, есть ли вообще строка в localStorage
    if (!rawData) {
      history.push(paths.logout)
      return
    }

    try {
      // 2. Парсим и используем опциональную цепочку ?.
      const adminData = JSON.parse(rawData)
      const adminId = adminData?.adminId

      if (!adminId) {
        history.push(paths.logout)
        return
      }

      // 3. Если всё ок, делаем запрос
      get(`/admins/${adminId}`).then((res) => {
        if (res?.data) {
          dispatch(setAdminData(res.data))
        }
      })
    } catch (error) {
      // На случай, если в localStorage лежит невалидный JSON
      console.error('Ошибка парсинга токена:', error)
      history.push(paths.logout)
    }
  }, [dispatch])

  const isMatch = checkPathMatch(location.pathname, paths)

  // Если пользователь на странице logout - выполняем выход
  if (location.pathname === paths.logout) {
    localStorage.removeItem('MW_MP_TOKEN_ADMIN')
    dispatch(setIsLogged(false))
    return <Navigate to={paths.login} replace />
  }

  // Если пользователь на публичной странице (login) - редиректим на home
  if (location.pathname === paths.login) {
    return <Navigate to={paths.home} replace />
  }

  return (
    <Routes>
      <Route path={paths.products} element={<ProductsPage />} />

      <Route
        path="*"
        element={!isMatch ? <Navigate to={paths.home} /> : null}
      />
    </Routes>
  )
}

export default PrivateRoutes

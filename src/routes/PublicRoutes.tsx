import { lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import { checkPathMatch, paths, pathsPrivate } from './helper'

const LoginPage = lazy(() => import('pages/LoginPage'))


const PublicRoutes: React.FC = () => {
  const location = useLocation()

  const isMatch = checkPathMatch(location.pathname, paths)

  // Если пользователь на logout - просто редиректим на login
  if (location.pathname === paths.logout) {
    return <Navigate to={paths.login} replace />
  }

  // Если пользователь на приватной странице - редиректим на login
  if (checkPathMatch(location.pathname, pathsPrivate)) {
    return <Navigate to={paths.login} replace />
  }

  return (
    <Routes>
      <Route path={paths.login} element={<LoginPage />} />
      <Route path="*" element={!isMatch ? <Navigate to={paths.login} replace /> : null} />
    </Routes>
  )
}

export default PublicRoutes
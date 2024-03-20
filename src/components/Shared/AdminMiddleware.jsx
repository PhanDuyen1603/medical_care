import { Outlet, useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../service/auth.service';
import { useEffect } from 'react';

const AdminMiddleware = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const localAuth = getUserInfo();
    if (!localAuth) {navigate('/login', {replace: true})}
    if (localAuth.role !== 'admin') {navigate('/', {replace: true})}
  }, [navigate])

  return <Outlet />
};

export default AdminMiddleware;
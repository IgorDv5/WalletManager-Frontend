import {
  HttpInterceptorFn
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req,
  next
) => {

  const token = localStorage.getItem('token');

  const publicRoutes = [
    '/auth/login'
  ];

  const isPublicRoute = publicRoutes.some(
    route => req.url.includes(route)
  );

  if (token && !isPublicRoute) {

    req = req.clone({

      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
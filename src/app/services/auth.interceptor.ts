import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  const clonedRequest = req.clone({
    url: `${environment.apiUrl}${req.url}`,
    setHeaders: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  return next(clonedRequest);
};
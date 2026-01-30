import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../state/auth.selectors';
import { map, take } from 'rxjs';
import { inject } from '@angular/core/primitives/di';

export const authGuard: CanActivateFn = () => {
    const store = inject(Store);
    const router = inject(Router);
    return store.select(selectIsLoggedIn).pipe(
        take(1),
        map(isLoggedIn => {
            if (isLoggedIn) {
                return true;
            } else {
                router.navigate(['/login']);
                return false;
            }
        }));

};
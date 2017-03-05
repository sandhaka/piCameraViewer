import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {

    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    canActivate() {
        let user = localStorage.getItem('currentUser');

        if (!user)
            this.router.navigate(['/login']);

        return !(!user);
    }
}

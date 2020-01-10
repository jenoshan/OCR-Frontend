import { HttpInterceptor, 
    HttpRequest, 
    HttpHandler,
    HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private userService: UserService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.userService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('AUTHORIZATION', "Bearer " + token)
        });
        return next.handle(authRequest);
    }

}
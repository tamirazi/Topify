import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';


export class ApiInterceptor implements HttpInterceptor {
    token: string;
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (!this.token) {
            const userData = JSON.parse(localStorage.getItem('userData'));
            this.token = userData._token;
        }

        const reqWithHeader = req.clone(
            {
                headers: new HttpHeaders({
                    Authorization: 'Bearer ' + this.token
                  })
            }
        );
        return next.handle(reqWithHeader);
    }
}

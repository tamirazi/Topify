import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SpotifyService } from './spotify.service';


export class ApiInterceptor implements HttpInterceptor {
    token: string;

    constructor(private spotify: SpotifyService){}
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
        return next.handle(reqWithHeader).pipe( catchError( err => {
            this.spotify.error.next(err)
            return next.handle(reqWithHeader);
        }));
    }
}

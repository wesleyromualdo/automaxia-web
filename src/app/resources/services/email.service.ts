import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    constructor(private http: HttpClient) { }

    async envioemail(subject:any='',html_corpo:any='',email_user:any=''){

        try {
            const url = "https://consoleapi-dsv.api.zello.services"
            //const url = "http://127.0.0.1:8000"
            const header = this.headers();
            const path = `${url}/envio-email?subject=${subject}&html_corpo=${html_corpo}&email_user=${email_user}`;
            // @ts-ignore
            console.log(path);
            return this.http.get(path, header).toPromise().catch(err => {
                return err;
            });
        } catch (e) {
            return e;
        }
    }
    protected headers(token:any='') {
        const httpOptions = {
            'Content-Type': 'application/json',
        }
        return  {
            headers: new HttpHeaders(httpOptions)
        };
    }
}

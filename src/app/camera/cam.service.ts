import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

import {AuthenticationService} from "../security/authentication.service";

@Injectable()
export class CamService {
    private http: Http;
    private authenticationService: AuthenticationService;

    constructor(http: Http, authenticationService: AuthenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
    }

    grabFrame(camIndex: number): Observable<any> {
        return this.http.post(`/api/v1/fswebcam`,
            {
                "camIndex": camIndex
            })
            .map(data => data);
    }
}

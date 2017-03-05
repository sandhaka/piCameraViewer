import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

	constructor(private http: Http) {	}

	login(username: string, password: string): Observable<boolean> {
		return this.http.post('/api/v1/login', { "username": username, "password": password })
			.map((response: Response) => {

			if(response.ok) {
				localStorage.setItem('currentUser', JSON.stringify(response.json()));
			}

			return response.ok;
			});
	}

	logout(): Observable<boolean> {
		return this.http.post('/api/v1/logout', {}).map((response: Response) => {

			if(localStorage.getItem('currentUser'))
				localStorage.removeItem('currentUser');

			return response.ok;
		});
	}
}

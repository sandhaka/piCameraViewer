import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {LoginInputData} from "./login.data";
import {AuthenticationService} from "../security/authentication.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

    private form: FormGroup;
    private formBuilder: FormBuilder;
    private loginData: LoginInputData;
    private authService: AuthenticationService;
    private router: Router;

    constructor(formBuilder: FormBuilder, authService: AuthenticationService, router: Router) {
        this.formBuilder = formBuilder;
        this.loginData = new LoginInputData();
        this.authService = authService;
        this.router = router;
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            'username': [
                this.loginData.username,
                Validators.required
            ],
            'password': [
                this.loginData.password,
                Validators.required
            ]
        });

        this.form.valueChanges.subscribe((data) => {
            this.onDataChanged(data);
        });

        this.onDataChanged();
    }

    private onSubmit() {

        this.loginData = this.form.value;

        this.authService.login(this.loginData.username, this.loginData.password)
            .subscribe(result => {
                    if (result === true) {
                        this.router.navigate(['/camera']);
                    } else {
                        alert("UserName or password incorrect");
                    }
                },
                error => {
                    if (error.status == 401)
                        alert("Username or password not valid");
                    else
                        alert(`Error: ${error.statusText}, code: ${error.status}`);
                });
    }

    private onDataChanged(data?: any) {
        if (!this.form)
            return;

        const _form = this.form;

        for (const field in this.formErrors) {
            const control = _form.get(field);
            this.formErrors[field] = '';

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ';';
                }
            }
        }
    }

    formErrors = {
        'username': '',
        'password': ''
    };

    validationMessages = {
        'username': {
            'required': 'Required'
        },
        'password': {
            'required': 'Required'
        }
    };
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {CameraModule} from "./camera/camera.module";
import {AppRoutingModule} from "./app-routing.module";
import {NotFoundComponent} from "./notFound.component";
import {LoginModule} from "./login/login.module";
import {SecurityModule} from "./security/security.module";
import {AuthGuardService} from "./security/auth-guard.service";

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        CameraModule,
        LoginModule,
        SecurityModule
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthGuardService
    ]
})
export class AppModule {
}

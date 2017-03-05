import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import {CamService} from "./cam.service";
import {CameraComponent} from "./camera.component";
import {SecurityModule} from "../security/security.module";
import {AuthenticationService} from "../security/authentication.service";

@NgModule({
	declarations: [
		CameraComponent
	],
	imports: [
		HttpModule,
		SecurityModule
	],
	providers: [
		CamService,
		AuthenticationService
	]
})
export class CameraModule { }

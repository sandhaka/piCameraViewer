import {Routes, RouterModule} from "@angular/router";
import {CameraComponent} from "./camera/camera.component";
import {NgModule} from "@angular/core";
import {NotFoundComponent} from "./notFound.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuardService} from "./security/auth-guard.service";

const appRoutes: Routes = [
	{path: 'login', component: LoginComponent },
	{path: 'camera', component: CameraComponent, canActivate: [AuthGuardService] },
	{path: '', redirectTo: '/login', pathMatch: 'full'},
	{path: '**', component: NotFoundComponent}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule {}

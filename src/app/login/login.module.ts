import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
	imports: [
		ReactiveFormsModule
	],
	declarations: [
		LoginComponent
	],
	exports: [
		LoginComponent
	]
})
export class LoginModule { }

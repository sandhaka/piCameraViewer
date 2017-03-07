import {Component} from '@angular/core';
import {CamService} from "./cam.service";
import {AuthenticationService} from "../security/authentication.service";
import {Router} from "@angular/router";

@Component({
    selector: 'camera-component',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.css']
})
export class CameraComponent {

    private readonly imageRootSrc = "assets/media/cam/camera";

    private camService: CamService;
    private authService: AuthenticationService;
    private router: Router;

    private imgSrc0 = "";
    private imgSrc1 = "";

    public constructor(camService: CamService, authService: AuthenticationService, router: Router) {
        this.camService = camService;
        this.authService = authService;
        this.router = router;
    }

    private logout() {
        this.authService.logout().subscribe(res => {
            console.log("logged out!");
            this.router.navigate(['/login']);
        });
    }

    private grabAndReload(camIndex): void {
        this.camService.grabFrame(camIndex).subscribe(
            res => {

                let guid = res._body;

                switch (camIndex) {
                    case 0: { this.imgSrc0 = `${this.imageRootSrc}${guid}_0.jpg`; break; }
                    case 1: { this.imgSrc1 = `${this.imageRootSrc}${guid}_1.jpg`; break; }
                }
            },
            err => {
                console.error(`Error during frame updating: ${err._body}`);
            });
    }
}
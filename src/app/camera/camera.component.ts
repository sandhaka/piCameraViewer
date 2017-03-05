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

    private readonly imageSrc0 = "../../assets/media/cam/camera0.jpg";
    private readonly imageSrc1 = "../../assets/media/cam/camera1.jpg";

    private camService: CamService;
    private authService: AuthenticationService;
    private router: Router;

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
        this.camService.grabFrame(camIndex).subscribe(res => {
                console.log("Frame updated successfully!");
            },
            err => {
                console.error(`Error during frame updating: ${err._body}`);
            },
            () => {
                location.reload();
            });
    }
}

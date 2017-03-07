var express = require('express');
var cp = require('child_process');
var guid = require('guid');

var router = express.Router();

router.post('/', function (req, res) {

    var camIndex = req.body.camIndex;
    var _guid = guid.raw();

    var retObject = cp.spawnSync('fswebcam', ['-d', '/dev/video' + camIndex, '/media/NAS/cam/dist/assets/media/cam/camera' + _guid + '_' + camIndex + '.jpg'], {
        timeout: 5000,
        stdio: 'inherit'
    });

    console.log("Exit with status: " + retObject.status);

    if (retObject.error != undefined) {
        console.error(retObject.error);
        res.status(500).send("Error during fswebcam execution: " + retObject.error);
    } else {
        res.status(200).send(_guid);
    }
});

module.exports = router;

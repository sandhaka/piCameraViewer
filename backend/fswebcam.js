var express = require('express');
var cp = require('child_process');

var router = express.Router();

router.post('/', function(req, res) {

	var camIndex = req.body.camIndex;

	var retObject = cp.spawnSync('fswebcam', ['-d', '/dev/video' + camIndex, '/media/NAS/cam/dist/assets/media/cam/camera' + camIndex + '.jpg'],{timeout: 5000, stdio: 'inherit'});

	if(retObject.error) {
		console.error(retObject.error);
		res.status(500).send("Error during fswebcam execution: " + retObject.error);
	}

	res.status(200).send('Frame updated');
});

module.exports = router;

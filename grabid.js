const link =
	'<p><a href="https://courses.stackschool.co/courses/take/dive-into-nodejs/lessons/7715999-6-nodejs-path-module?wvideo=vfz73qns3w"><img src="https://embed-ssl.wistia.com/deliveries/9846ba1c101a44f2b6e2856f1f17d7b95bbfe827.jpg?image_play_button_size=2x&amp;image_crop_resized=960x600&amp;image_play_button=1&amp;image_play_button_color=7b796ae0" width="400" height="250" style="width: 400px; height: 250px;"></a></p><p><a href="https://courses.stackschool.co/courses/take/dive-into-nodejs/lessons/7715999-6-nodejs-path-module?wvideo=vfz73qns3w">6. Path Module.mp4</a></p>';

const grabId = () => {
	const regex = /wvideo=.{10}/;
	let matched = link.match(regex);
	if (matched !== null && matched.length > 0) {
		matched = matched[0];
		matched = matched.split("=")[1];
		console.log(matched);
		return matched;
	}
};

grabId();

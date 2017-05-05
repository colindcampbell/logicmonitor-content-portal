class Layout {
	constructor() {
		// Center Div in parent div
		this.centerDiv = {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)"		
		},
		this.horizontalCenter = {
			position: "absolute",
			left: "50%",
			transform: "translateX(-50%)"		
		}
	}
}

var layout = new Layout();
export default layout;

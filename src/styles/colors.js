class Colors {
	constructor() {
		// LM Primary Scheme NEW
		this.primary0 = "#0037FF", // Darker blue
		this.primary1 = "#0076FF",
		this.primary2 = "#1a84ff",
		this.primary3 = "#3391ff",
		this.primary4 = "#4d9fff",
		this.primary5 = "#66adff",
		this.primary6 = "#80bbff",
		this.primary7 = "#99c8ff",
		this.primary8 = "#b3d6ff",
		this.primary9 = "#cce4ff",
		this.primary10 = "#e6f1ff",

		// LM Secondary Scheme
		this.secondary1 = "#FE5A1D", //Orange
		this.secondary1a = "#FFDED0", //Light Orange
		this.secondary1b = "#e73f01", //Dark Orange
		this.secondary2 = "#FFCC00", //Yellow
		this.secondary3 = "#F2F4FC", //Light bluegray
		this.secondary4 = "#1C2841", //Dark Navy Blue
		this.secondary4a = "#495367",
		this.secondary4b = "#60687A",
		this.secondary5 = "#81ae49", //Replaces Green

		// LM Grays
		this.gray1 = "#151515",
		this.gray2 = "#2c2c2c",
		this.gray3 = "#444444",
		this.gray4 = "#5b5b5b",
		this.gray5 = "#737373",
		this.gray6 = "#8a8a8a",
		this.gray7 = "#a1a1a1",
		this.gray8 = "#b9b9b9",
		this.gray9 = "#d0d0d0",
		this.gray10 = "#e8e8e8",
		this.navGray = "#333333"

		// LM Alert Colors
		this.critical = "#ed1e24",
		this.error = "#f26522",
		this.warning = "#ffcc00",
		this.cleared = "#81ae49",
		this.acknowledged = this.primary1,
		this.disabled = this.gray7,
		this.sdt = this.gray4,

		// Misc
		this.highlight = "#FCF8E3",
		this.highlightAdd = "#DCFFDC",
		this.highlightRemove = "#FFE8E9"
		
	}
}

var colors = new Colors();
export default colors;

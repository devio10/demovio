export const localPreferences: {
	environment: string;
	environmentDarkAvailable: boolean;
	showEnvironment: boolean;
	spatialEnvironment: string;
	backstageStatus: boolean;
	backstageCitizenship: boolean;
	backstagePages: boolean;
} = $state({
	environment: "",
	environmentDarkAvailable: true,
	spatialEnvironment: "",
	showEnvironment: true,
	backstageStatus: false,
	backstageCitizenship: false,
	backstagePages: false,
});

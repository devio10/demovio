export const localPreferences: {
	environment: string;
	showEnvironment: boolean;
	spatialEnvironment: string;
	backstageStatus: boolean;
	backstageCitizenship: boolean;
	backstagePages: boolean;
} = $state({
	environment: "",
	spatialEnvironment: "",
	showEnvironment: true,
	backstageStatus: false,
	backstageCitizenship: false,
	backstagePages: false,
});

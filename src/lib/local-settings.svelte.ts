export const localPreferences: {
	environment: string;
	spatialEnvironment: string;
	backstageStatus: boolean;
	backstageCitizenship: boolean;
	backstagePages: boolean;
} = $state({
	environment: "",
	spatialEnvironment: "",
	backstageStatus: false,
	backstageCitizenship: false,
	backstagePages: false,
});

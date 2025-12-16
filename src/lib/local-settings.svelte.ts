export const localPreferences: {
	environment: string;
	environmentDarkAvailable: boolean;
	showEnvironment: boolean;
	spatialEnvironment: string;
	backstageStatus: boolean;
	backstageCitizenship: boolean;
	backstagePages: boolean;
	environmentTheme: number;
	contrastTheme: boolean;
} = $state({
	environment: "",
	environmentDarkAvailable: true,
	environmentTheme: 0,
	spatialEnvironment: "",
	showEnvironment: true,
	backstageStatus: false,
	backstageCitizenship: false,
	backstagePages: false,
	contrastTheme: false,
});

export enum EnvironmentThemes {
	unset,
	light,
	dark,
	auto,
}

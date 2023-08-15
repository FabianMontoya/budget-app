import { ApexOptions } from 'apexcharts';

declare global {
	interface Window {
		Apex: ApexOptions;
	}
}

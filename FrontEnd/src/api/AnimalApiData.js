import axios from "axios";

export const fetchRegionData = async (regionId) => {
	if (regionId === 'gyeonggi') {
		const API_URL = 'https://openapi.gg.go.kr/AbdmAnimalProtect';
		const API_KEY = '83bf0ac4c32a47ba80ff7914a7ec4a5e';
		const PAGE_SIZE = 100;

		let allData = [];
		let pageIndex = 1;

		while (true) {
			const response = await axios.get(API_URL, {
				params: {
					KEY: API_KEY,
					Type: 'json',
					pIndex: pageIndex,
					pSize: PAGE_SIZE,
				}
			});
			
			const AbdmAnimalProtect = response.data?.AbdmAnimalProtect;
			const data = (Array.isArray(AbdmAnimalProtect) 
						&& AbdmAnimalProtect.length > 1 
						&& AbdmAnimalProtect[1]?.row)
						? AbdmAnimalProtect[1].row
						: [];

			console.log(data);
			if (!data || data.length === 0) {
				break;
			}

			allData = allData.concat(data);
			pageIndex++;
		}
		return allData;
	}
};

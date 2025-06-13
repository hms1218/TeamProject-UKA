const API_URL = process.env.REACT_APP_ALL_ANIMAL_API_URL;
const API_KEY = process.env.REACT_APP_ALL_ANIMAL_API_KEY;
const BACKEND_API_URL = "http://localhost:8888/api/animals/import";
const PAGE_SIZE = 1000;

export const fetchRegionData = async () => {
        
    let pageIndex = 1;
    let allData = [];

    while (true) {
        try {
            const params = {
                serviceKey: API_KEY,
                pageNo: pageIndex,
                numOfRows: PAGE_SIZE,
            };
            const response = await fetch (
                `${API_URL}?serviceKey=${params.serviceKey}&pageNo=${params.pageNo}&numOfRows=${params.numOfRows}&_type=json`
            );

            const json = await response.json();
            const AnimalProtect = json?.response?.body?.items.item;

            // 배열이 아니면 즉 데이터가 없으면 빈 배열로 처리
            const data = Array.isArray(AnimalProtect) &&
                AnimalProtect.length > 1 &&
                AnimalProtect ? AnimalProtect : [];

            if (!data.length) break;

            allData = allData.concat(data);
            pageIndex++;
            
        } catch (error) {
            console.error("API 요청 실패:", error);
            break;
        }
    }
    console.log(allData);

    return allData;
};

// 2. 데이터 전체를 백엔드(Spring)로 전송
export const sendDataToBackend = async (data) => {
    try {
        const res = await fetch(BACKEND_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        console.log("서버 응답:", result);
        return result;
    } catch (error) {
        console.error("백엔드 전송 실패:", error);
        throw error;
    }
};

// 3. react에서 데이터 호출할때 이걸로 호출
export const fetchAndSendAnimals = async () => {
    const allData = await fetchRegionData();
    await sendDataToBackend(allData);
};

// React에서 데이터 불러오기
export const fetchSavedAnimals = async () => {
    const res = await fetch("http://localhost:8888/api/animals/");
    const data = await res.json();
    console.log(data);
    return data; // 배열 형태로 동물 데이터 반환
};
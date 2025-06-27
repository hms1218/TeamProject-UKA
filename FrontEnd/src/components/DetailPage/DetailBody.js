import { useState, useEffect } from "react"
import './DetailBody.css'

import { Button } from "@mui/material";
import NaverMap from "../DetailMap/NaverMap";
import SiDoData from "../Map/koreaSiDoData";
import SiGunGooData from "../Map/KoreaSiGunGooData";

import { fetchSavedAnimals } from "../../api/AnimalApiData";

export const DetailBody = () => {
    const [siDo, setSiDo] = useState('');
    const [gunGu, setGunGu] = useState('');
    const [center, setCenter] = useState('');
    const [allData, setAllData] = useState([]);
    const [targetAddress, setTargetAddress] = useState('');

    // 상태 추가: 마커로 찍을 센터 배열 관리
    const [targetCenters, setTargetCenters] = useState([]);

    useEffect(() => {
        async function loadData() {
            try {
                const result = await fetchSavedAnimals();
                setAllData(result);
            } catch (e) {
                setAllData([]);
            }
        }
        loadData();
    }, []);

    const gunList = siDo ? SiGunGooData.filter(item => item.uprCd === siDo) : [];
    const siDoName = siDo ? SiDoData.find(x => x.orgCd === siDo)?.orgdownNm : "";
    const gunGuName = gunGu ? SiGunGooData.find(x => x.orgCd === gunGu)?.orgdownNm : "";
    const centerOptions = getFilteredCentersByOrgNm(allData, siDoName, gunGuName);
    const selectedCenterData = center ? allData.find(item => item.careRegNo === center) : null;

    return (
        <div className="DBcontainer">
            {/* 헤더 */}
            <div className="DBcombobox">
                {/* 시 */}
                <div>
                    <label className="DBtext" htmlFor="siDo">시 선택</label>
                    <select
                        id="siDo"
                        value={siDo}
                        onChange={e => {
                            setSiDo(e.target.value);
                            setGunGu("");
                            setCenter("");
                            setTargetAddress("");
                        }}
                    >
                        <option value="">시/도 선택</option>
                        {SiDoData.map(siItem => (
                            <option key={siItem.orgCd} value={siItem.orgCd}>
                                {siItem.orgdownNm}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 군 */}
                <div>
                    <label className="DBtext" htmlFor="gunGu">군 선택</label>
                    <select
                        id="gunGu"
                        value={gunGu}
                        onChange={e => {
                            setGunGu(e.target.value);
                            setCenter('');
                            setTargetAddress('');
                        }}
                        disabled={!siDo}
                    >
                        <option value="">군/구 선택</option>
                        {gunList.map(item => (
                            <option key={item.orgCd} value={item.orgCd}>
                                {item.orgdownNm}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 센터 */}
                <div>
                    <label className="DBtext" htmlFor="center">센터 선택</label>
                    <select
                        id="center"
                        value={center}
                        onChange={e => setCenter(e.target.value)}
                        disabled={!gunGu}
                    >
                        <option value="">센터 선택</option>
                        {centerOptions.map(item => (
                            <option key={item.careRegNo} value={item.careRegNo}>
                                {item.careNm}
                            </option>
                        ))}
                    </select>
                </div>
                <Button
                    variant="contained"
                    className="DBButton"
                    color="inherit"
                    sx={{ marginLeft: '20px', marginTop: '37px' }}
                    onClick={() => {
                        let filteredCenters = [];

                        if (selectedCenterData) {
                            // 센터 선택 시 1개 센터만 마커 표시
                            filteredCenters = [selectedCenterData];
                        } else if (siDoName && gunGuName) {
                            // 시군구 선택 시 그 지역 내 모든 센터 표시
                            filteredCenters = allData.filter(
                                item => item.orgNm === `${siDoName} ${gunGuName}`
                            );
                        } else if (siDoName) {
                            // 시/도 선택 시 그 시도 내 모든 센터 표시
                            filteredCenters = allData.filter(
                                item => item.orgNm.startsWith(siDoName)
                            );
                        }

                        setTargetCenters(filteredCenters);
                        console.log("마커 표시할 센터 목록:", filteredCenters);
                    }}
                >
                    검색하기
                </Button>
            </div>

            {/* 지도 영역 */}
            <div className="DBtop">
                <div className="DBmap">
                    <NaverMap centers={targetCenters} />
                </div>
            </div>
        </div>
    )
}

// 유틸 함수
function getFilteredCentersByOrgNm(allData, siDoName, gunGuName) {
    if (!Array.isArray(allData) || !siDoName || !gunGuName) return [];
    const targetNm = `${siDoName} ${gunGuName}`;
    const unique = {};
    allData
        .filter(item => item.orgNm === targetNm)
        .forEach(item => {
            if (!unique[item.careRegNo]) unique[item.careRegNo] = item.careNm;
        });
    return Object.entries(unique).map(([careRegNo, careNm]) => ({
        careRegNo, careNm
    }));
}

import { useEffect, useState } from "react"
import img from "../../assets/test1.jpg"
import KoreaMapSection from "../Map/KoreaMapSection";
import './DetailBody.css'

export const DetailBody = () => {

    //콤보박스 시군구+센터이름
    const [si,setSi] = useState({});
    const [gun,setGun] = useState('');
    const [gu,setGu] = useState('');
    const [center,setCenter] = useState('');

    //지도 데이터 로딩용
    useEffect(()=>{
        
    },[])


    return(
        <div className="container">
            <div className="top">
                <div className="map">
                    {/* <KoreaMapSection 
                                    // onRegionSelect={handleRegionSelect}
                                    //  selectedRegionId={selectedRegionId}
                                    //  tooltipContent={tooltipContent}
                                    //  setTooltipContent={setTooltipContent}
                                    //  regionInfo={regionInfo}
                    /> */}
                </div>

                <div className="combobox">
                    {/* 시 */}
                    <select>
                        
                    {<option value=''></option>}
                    
                    </select>

                    {/* 군 */}
                    <select>
                        <option value=''></option>
                    </select>

                    {/* 구 */}
                    <select>
                        <option value=''></option>
                    </select>
                </div>
            </div>{/* end top */}

            <div className="bottom">
                {/* 상세정보 하나 들어가는 박스 */}
                <div className="detail">
                {/* 이미지 */}
                <img src={img} alt="테스트 이미지"/>
                
                <hr/>
                {/* 간략한 정보(하이퍼 링크) */}
                <h3><a href="/">간략한 정보(하이퍼링크)</a></h3>
                    
                </div>
            </div> 

        </div>
    )
}
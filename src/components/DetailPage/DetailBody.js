import { useEffect, useState } from "react"
import img from "../../assets/test1.jpg"
import KoreaMapSection from "../Map/KoreaMapSection";
import './DetailBody.css'
import { Link } from "react-router-dom";

// 부트스트랩
import {Carousel,Button, Card} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import { CardComponent } from "./CardComponent";

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
                    <KoreaMapSection 
                                    // onRegionSelect={handleRegionSelect}
                                    //  selectedRegionId={selectedRegionId}
                                    //  tooltipContent={tooltipContent}
                                    //  setTooltipContent={setTooltipContent}
                                    //  regionInfo={regionInfo}
                    />
                </div>

                <div className="combobox">
                    {/* 시 */}
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <label className="text" for="si" >시 선택</label> 
                        <select id='si'title="시입니다">                        
                        {<option value={si}>시</option>}
                        </select>
                    </div>

                    {/* 군 */}
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <label className="text" for="gun" >군 선택</label>
                        <select>
                            <option id="gun" value={gun}>군</option>
                        </select>
                    </div>

                    {/* 구 */}
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <label className="text" for="gu" >구 선택</label>
                        <select>
                            <option id='gu' value={gu}>구</option>
                        </select>
                    </div>
                </div>
                
            </div>{/* end top */}
{/* ================================================================================================ */}
            {/* 지역선택하면 값을 받아서 렌더링하게 설정할것(지금은 일단 보임.) */}
            <div className="bottom">
                {/* 렌더링 개수 정하는 드롭다운. */}
                <div className="dropdown">
                    <select>
                        <option value='8'>8</option>
                        <option value='12'>12</option>
                        <option value='16'>16</option>
                    </select>
                </div>


                {/* 상세정보 하나 들어가는 박스 */}
                <div className="detail-box">

                    {/* 상세정보하나 */}
                    <CardComponent img={img} description={'간략한 정보'} title={'제목'}/>

                    {/* 상세정보하나 */}
                    <CardComponent img={img} description={'간략한 정보'} title={'제목'}/>

                    {/* 상세정보하나 */}
                    <CardComponent img={img} description={'간략한 정보'} title={'제목'}/>

                    {/* 상세정보하나 */}
                    <CardComponent img={img} description={'간략한 정보'} title={'제목'}/>

                    {/* 상세정보하나 */}
                    <CardComponent img={img} description={'간략한 정보'} title={'제목'}/>

                    {/* 상세정보하나 */}
                    <CardComponent img={img} description={'간략한 정보'} title={'제목'}/>

                    {/* 상세정보하나 */}
                    <CardComponent img={img} description={'간략한 정보'} title={'제목'}/>

                    {/* 상세정보하나 */}
                    <CardComponent img={img} description={'간략한 정보'} title={'제목'}/>



                    {/* 상세정보 하나 들어가는 박스 */}
                    {/* <div className="detail"> */}
                    {/* 이미지 */}
                        {/* <img src={img} alt="테스트 이미지"/> */}
                        
                        {/* <div className="detail-content"> */}
                            {/* 간략한 정보(하이퍼 링크) */}
                            {/* <h3><Link to="/about/select">간략한 정보(하이퍼링크O)</Link></h3> */}
                        {/* </div> */}
                    {/* </div> */}

                    

                </div>
            </div>{/* end bottom */}
            

        </div>
    )
}
import { useEffect, useState } from "react"
import img from "../../assets/test1.jpg"
import './DetailBody.css'

import { CardComponent } from "./CardComponent";
import { Button } from "react-bootstrap";

export const DetailBody = () => {

    //콤보박스 시군구+센터이름
    const [si,setSi] = useState({});
    const [gun,setGun] = useState('');
    const [gu,setGu] = useState('');
    const [center,setCenter] = useState('');
    const [regionInfo, setRegionInfo] = useState([]);

    const [isRow,setIsRow] = useState(false);
    const [show,setShow] = useState(false);

    //지도 데이터 로딩용
    useEffect(()=>{
        
    },[])


    return(
        <div className="DBcontainer">
            <div className="DBtop">
                <div className="DBmap">
                    {/* <KoreaMapSection 
                        // onRegionSelect={handleRegionSelect}
                        //     selectedRegionId={selectedRegionId}
                        //     tooltipContent={tooltipContent}
                        //     setTooltipContent={setTooltipContent}
                            regionInfo={regionInfo}
                    /> */}
                </div>

                <div className="DBcombobox">
                    {/* 시 */}
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <label className="DBtext" for="si" >시 선택</label> 
                        <select id='si'title="시입니다">                        
                        {<option value={si}>시</option>}
                        </select>
                    </div>

                    {/* 군 */}
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <label className="DBtext" for="gun" >군 선택</label>
                        <select>
                            <option id="gun" value={gun}>군</option>
                        </select>
                    </div>

                    {/* 구 */}
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <label className="DBtext" for="gu" >구 선택</label>
                        <select>
                            <option id='gu' value={gu}>구</option>
                        </select>
                    </div>
                    <Button title="검색하기" onClick={()=>{

                    }}/>
                </div>
                
            </div>{/* end top */}
{/* ================================================================================================ */}
            {/* 지역선택하면 값을 받아서 렌더링하게 설정할것(지금은 일단 보임.) */}
            <div className="DBbottom">
                {/* 렌더링 방식 정하는 드롭다운. */}
                <div className="DBdropdown">
                    <select value={isRow} onChange={(e)=>{
                        setIsRow(e.target.value==='true') 
                        console.log(isRow)
                        }}>
                        <option value='false'>세로</option>
                        <option value='true'>가로</option>
                    </select>
                </div>


                {/* 상세정보 하나 들어가는 박스 */}
                <div className="DBdetail-box">

                    {/* 상세정보하나 */}
                    <CardComponent row={isRow} img={img} description={'간략한 정보'} title={'제목'}/>
                    <CardComponent row={isRow} img={img} description={'간략한 정보'} title={'제목'}/>
                    <CardComponent row={isRow} img={img} description={'간략한 정보'} title={'제목'}/>
                    <CardComponent row={isRow} img={img} description={'간략한 정보'} title={'제목'}/>
                    <CardComponent row={isRow} img={img} description={'간략한 정보'} title={'제목'}/>

                    <CardComponent row={isRow} img={img} description={'간략한 정보'} title={'제목'}/>
                    <CardComponent row={isRow} img={img} description={'간략한 정보'} title={'제목'}/>
                    <CardComponent row={isRow} img={img} description={'간략한 정보'} title={'제목'}/>
                    <CardComponent row={isRow} img={img} description={'간략한 정보'} title={'제목'}/>
                    <CardComponent row={isRow} img={img} description={'간략한 정보'} title={'제목'}/>
                    <CardComponent row={isRow} img={img} description={'간략한 정보'} title={'제목'}/>
                    <CardComponent row={isRow} img={img} description={'간략한 정보'} title={'제목'}/>
                    <CardComponent row={isRow} img={img} description={'간략한 정보'} title={'제목'}/>
                                       
                    

                </div>
            </div>{/* end bottom */}
            

        </div>
    )
}
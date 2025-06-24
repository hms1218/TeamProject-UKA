import { useEffect, useState } from "react"
import img from "../../assets/test1.jpg"
import './DetailBody.css'

import { CardComponent } from "./CardComponent";
import { Box, Button, InputLabel, Select } from "@mui/material";

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

            {/* 헤더 */}
            <div className="DBcombobox">
                {/* 시 */}
                <div style={{}}>
                    <label className="DBtext" for="si" >시 선택</label> 
                    <select id='si'title="시입니다">                        
                    {<option value={si}>시</option>}
                    </select>
                </div>

                {/* 군 */}
                <div style={{}}>
                    <label className="DBtext" for="gun" >군 선택</label>
                    <select>
                        <option id="gun" value={gun}>군</option>
                    </select>
                </div>

                {/* 구 */}
                <div style={{}}>
                    <label className="DBtext" for="gu" >구 선택</label>
                    <select>
                        <option id='gu' value={gu}>구</option>
                    </select>
                </div>
                <Button 
                    variant="contained"
                    className="DBButton"
                    color="inherit"
                    sx={{
                        marginLeft:'20px',
                        marginTop:'37px'
                    }}
                    onClick={()=>{
                        setShow(!show)

                    }}>검색하기
                </Button>
            </div>

            {/* 상단 div */}
            <div className="DBtop">
                {/* 여기에 지도 들어갈 것 같아요. */}
                <div className="DBmap">
                    지도할라고
                    {/* <KoreaMapSection 
                        // onRegionSelect={handleRegionSelect}
                        //     selectedRegionId={selectedRegionId}
                        //     tooltipContent={tooltipContent}
                        //     setTooltipContent={setTooltipContent}
                            regionInfo={regionInfo}
                    /> */}
                </div>

                
                

                
            </div>{/* end top */}

            

            {/* 보드에서 가져온 헤더 */}
                <div className="DBboard-layout">
                
                    <div className="DBboard-header-container">
                        <div className="DBboard-header-left">
                            <h1 className="DBboard-title">상세검색</h1>
                        </div>
                        <div className="DBboard-header-center">
                            <div >
                            <select>
                                <optgroup label="견종" >
                                    <option >보호상태</option>
                                </optgroup>
                            </select>

                            <select>
                                <optgroup label="견종" >
                                    <option >공고날짜</option>
                                </optgroup>
                            </select>

                            <select>
                                <optgroup label="견종" >
                                    <option >털색</option>
                                </optgroup>
                            </select>

                            <select>
                                <optgroup label="견종" >
                                    <option >나이</option>
                                </optgroup>
                            </select>

                            <select>
                                <optgroup label="견종" >
                                    <option >품종</option>
                                </optgroup>
                            </select>

                            <select>
                                <optgroup label="견종" >
                                    <option >성별</option>
                                </optgroup>
                            </select>

                           </div>
                        </div>
                         <Button 
                            variant="contained"
                            className="DBButton"
                            color="inherit"
                         
                            onClick={()=>{
                                setShow(!show)

                            }}>검색하기
                        </Button>
                        <div className="DBboard-header-right">
                            
                        </div>   
                    </div>

                    {/* 탭 메뉴 */}
                    <nav className="DBmini-tab-bar">
                        <div className="DBboard-header-center">
                            <input
                                className="DBboard-search-input"
                                type="text"
                                placeholder="통합검색"
                            />
                            <button className="DBboard-search-button">
                            🔍
                            </button>
                        </div>
                    </nav>

                 </div>




{/* ================================================================================================ */}
            {/* 지역선택하면 값을 받아서 렌더링하게 설정할것(지금은 일단 보임.) */}
            <div className="DBbottom">
                {/* 렌더링 방식 정하는 드롭다운. */}
                <div className="DBdropdown">
                    <select value={isRow} onChange={(e)=>{
                        setIsRow(e.target.value==='true') 
                        }}>
                        <option value='false'>세로</option>
                        <option value='true'>가로</option>
                    </select>

                    <div className="DBrowbutton"
                        onClick={()=>{setIsRow(false)}} 
                    >
                        📱
                    </div>
                    <div className="DBrowbutton"
                        onClick={()=>{setIsRow(true)}} 
                    >
                        🪪
                    </div>
                    
                </div>


                {/* 상세정보 하나 들어가는 박스 */}
                {show&&<Box className="DBdetail-box">
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

                    
                </Box>}
            </div>{/* end bottom */}
            

        </div>
    )
}
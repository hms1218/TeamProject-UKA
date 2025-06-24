import { Button,Box } from '@mui/material'
import { RequestComponent } from './RequestComponent'
import img from "../../assets/test1.jpg"
import './RequestMain.css'
import { useNavigate } from 'react-router-dom'

export const RequestMain = () => {
    const navigate = useNavigate();

    return(
        <div className="RMcontainer">
            
        
            <Button 
                variant="contained"
                className="DBButton"
                color="primary"
                sx={{marginLeft:'auto', marginTop:'20px'}}

                onClick={()=>{
                    navigate('/request/write')
                    window.scrollTo(0,0)
                }}>작성하기
            </Button>

            <Box className='RMtop'>
                {/* 나열식으로 실종신고서 보여주기 */}
                {/* RequestComponent로 데이터 가져오기 */}
                {/* kind,sex,age,name,local,time,phone,descripsion */}
                <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> 

                <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                /> <RequestComponent
                    img={img}
                    kind={'진돗개'}
                    age={'2살'}
                    sex={'수컷'}
                    name={'길동이'}
                    local={'부평역 주변'}
                    time={'2025년 6월 25일 오후 7시'}
                    phone={'032-222-2222'}
                    descripsion={`사람을 잘따름 \n 아무거나 잘먹음 \n 귀여움 `}
                />  

                
            </Box>
        </div>
    )
}
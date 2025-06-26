import {useNavigate}from 'react-router-dom'
import defimg from '../../assets/default.jpg'
import {Card,CardContent,CardMedia,CardActionArea,Typography, Alert, Button} from '@mui/material'

export const RequestComponent = ({img=`${defimg}`,kind='종류',sex='성별',age='나이',name='이름',local='지역',time='시간',phone='연락처',descripsion='특징',url='',row=false}) => {

    const navigate = useNavigate();

    return(
        // 미디어 카드(가로) 
        <Card sx={{ flex:'0 0 95%', display:'flex',flexDirection:'row'}} raised={true} >
                <div>
                {/* 카드 사진 내용 */}
                    <CardMedia
                    component="img"
                    height="auto"
                    image={img}
                    sx={{ width: 360, height: 300, objectFit: 'cover'}}
                    />
                </div>






                <div style={{display:'flex',flexDirection:'column'}}>
                    {/* 빨간 div */}
                    <Typography 
                    sx={{backgroundColor:'red', color:'white', textAlign:'center' }}
                    variant="h5" component="div" >
                        🐾{kind} | 🧸{sex} | 🕒{age} | 🏷️{name}
                    </Typography>
                    
                    {/* 카드 상세 내용 */}
                    <div style={{display:'flex', flexDirection:'column',justifyContent:'center',width:'655px'}}>
                        {/* 내용 들어있는 상자. */}
                        <CardContent
                            sx={{width:'95%',display:'flex',flexDirection:'column',height:'100%',height:'228px',justifyContent:'center'}}
                        >    
                            <Typography sx={{fontSize:'16px'}}
                            gutterBottom variant="h5" component="div">
                            <b>실종 장소</b>: {local}
                            </Typography>
                            <Typography sx={{fontSize:'16px'}}
                            gutterBottom variant="h5" component="div">
                            <b>실종 시간</b>: {time}
                            </Typography>
                            <Typography sx={{fontSize:'16px'}}
                            gutterBottom variant="h5" component="div">
                            <b>연락수단</b>: {phone}
                            </Typography>
                            <Typography sx={{fontSize:'16px', whiteSpace:'pre-line' }} 
                            gutterBottom variant="h5" component="div">
                            <b>특징</b>: {`${descripsion}`}
                            </Typography>
                            {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {description}
                            </Typography> */}
                            {/* 버튼구역 */}
                            <div style={{display:'flex', flexDirection:'row',justifyContent:'flex-end', gap:'10px'}}>
                                <Button variant='outlined' color='primary'
                                    onClick={()=>{}}
                                >수정</Button>
                                <Button variant='outlined' color='primary'
                                    onClick={()=>{}}
                                >삭제</Button>
                            </div>
                        </CardContent>
                    </div>
                </div>
        
        </Card>

    )
}
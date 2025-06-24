import {useNavigate}from 'react-router-dom'
import defimg from '../../assets/default.jpg'
import {Card,CardContent,CardMedia,CardActionArea,Typography, Alert} from '@mui/material'

export const RequestComponent = ({img=`${defimg}`,kind='종류',sex='성별',age='나이',name='이름',local='지역',time='시간',phone='연락처',descripsion='특징',url='',row=false}) => {

    const navigate = useNavigate();

    // if(!row){
    //     return(
    //     // 카드(세로)
    //     <Card sx={{ flex:'0 0 18%'}} raised={true} >
    //         <CardActionArea onClick={()=>{
    //             navigate('/about/select' + url)
    //             window.scrollTo(0,0)
    //             }}           
         
    //             >
    //             <CardMedia
    //             component="img"
    //             height="auto"
    //             image={img}
    //             />
    //             <CardContent>
    //             <Typography gutterBottom variant="h5" component="div">
    //             {title}
    //             </Typography>
    //             <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    //                 {description}
    //             </Typography>
    //             </CardContent>
    //         </CardActionArea>
    //     </Card>
    //     )
    // }

    return(
        // 미디어 카드(가로) maxWidth: 350,
        <Card sx={{ flex:'0 0 90%',height:'100%'}} raised={true} >
            <CardActionArea        
                sx={{ display: 'flex',height:'100%'}} // 가로 정렬
            >
                <div style={{display:'flex', flexDirection:'column',width:'60%',height:'100%'}}>
                {/* 카드 핵심 내용 */}
                    <CardMedia
                    component="img"
                    height="auto"
                    image={img}
                    sx={{height:'100%'}}
                    />
                    <Typography 
                    sx={{backgroundColor:'red', color:'white', textAlign:'center' }}
                    variant="h5" component="div" >
                        {kind} / {sex} / {age} / {name}
                    </Typography>
                </div>
                {/* 카드 상세 내용 */}
                <div style={{display:'flex', flexDirection:'column',width:'40%',height:'100%'}}>
                    <CardContent
                        sx={{height:'100%'}}
                    >
                        <Typography sx={{fontSize:'20px'}}
                        gutterBottom variant="h5" component="div">
                        실종 장소: {local}
                        </Typography>
                        <Typography sx={{fontSize:'20px'}}
                        gutterBottom variant="h5" component="div">
                        실종 시간: {time}
                        </Typography>
                        <Typography sx={{fontSize:'20px'}}
                        gutterBottom variant="h5" component="div">
                        연락수단: {phone}
                        </Typography>
                        <Typography sx={{fontSize:'20px', whiteSpace:'pre-line' }} 
                        gutterBottom variant="h5" component="div">
                        특징: {`${descripsion}`}

                        </Typography>

                        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                        </Typography> */}

                        
                    </CardContent>
                </div>
            </CardActionArea>
        </Card>



    )
}
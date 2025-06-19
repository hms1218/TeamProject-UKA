import {Link, useNavigate}from 'react-router-dom'
import {Card,CardContent,CardMedia,CardActionArea,Typography, Alert} from '@mui/material'

export const CardComponent = ({img,title,description,url=''}) => {

    const navigate = useNavigate();

    return(
        // 카드(새로)
        // <Card sx={{ maxWidth: 345}} raised={true}>
        //     <CardActionArea onClick={()=>{
        //         navigate('/about/select' + url)
        //         window.scrollTo(0,0)
        //         }}           
        //         >
        //         <CardMedia
        //         component="img"
        //         height="140"
        //         image={img}
        //         />
        //         <CardContent>
        //         <Typography gutterBottom variant="h5" component="div">
        //         {title}
        //         </Typography>
        //         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        //             {description}
        //         </Typography>
        //         </CardContent>
        //     </CardActionArea>
        // </Card>


        // 미디어 카드(가로)
        <Card sx={{ maxWidth: 350}} raised={true}>
            <CardActionArea onClick={()=>{
                navigate('/about/select' + url)
                window.scrollTo(0,0)
                }}           
                sx={{ display: 'flex'}} // 가로 정렬
                >
                <CardMedia
                component="img"
                height="140"
                image={img}
                />
                <CardContent
                    sx={{width:200}}
                >
                <Typography gutterBottom variant="h5" component="div">
                {title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {description}
                </Typography>
                </CardContent>
            </CardActionArea>
        </Card>



    )
}
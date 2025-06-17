import { Button, Card } from 'react-bootstrap'
import {Link}from 'react-router-dom'

// import 'bootstrap/dist/css/bootstrap.min.css';

export const CardComponent = ({img,title,description,url=''}) => {

    return(

        <Card style={{ width: '16rem' }}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                {description}
                </Card.Text>
            <Button variant="primary">
                <Link to={'/about/select' + url}>
                    <span style={{color:'white'}}>이동하기</span>
                </Link>
                </Button>
            </Card.Body>
        </Card>

    )
}
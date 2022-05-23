import React from "react";
import {Link} from "react-router-dom";
import './Homepage.css';
import Alisa from './alisa.jpeg'
import Siri from './siri.png';
import CallCenter from './call-center.webp';
import {Button, Card, CardContent, CardMedia, Container, Typography, withStyles} from "@material-ui/core";

const ColorButton = withStyles(() => ({
    root: {
        backgroundColor: "#a85d5c",
        color: '#fff'
    },
    "&:hover": {
        backgroundColor: "#a85d5c",
        color: '#fff'
    }
}))(Button);

const HomePage: React.FC = () => {
    return (
        <div>
            <Container className="container">
                <h2 className="home-page_title">Кто может использовать нашу разработку?</h2>
                <img src="./alisa.jpeg" alt=""/>
                <Container>
                    <Card className="card-spacing">
                        <CardMedia className="card-picture" image={Alisa}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Смарт-колонки
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Наша нейросеть может помочь считывать состояние или настроение в комнате в фоновом
                                режиме
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className="card-spacing">
                        <CardMedia className="card-picture" image={CallCenter}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Call-центры
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Нейросеть в режиме реального времени способна распознавать эмоции клиента, что может
                                быть полезно в целях улучшения качества обслуживания
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card className="card-spacing">
                        <CardMedia className="card-picture" image={Siri}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Персональные ассистенты
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Ассистент в режиме реального времени может отслеживать психологическое состояние
                                владельца смартфона
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>
                <div className="button_container">
                    <Link to='/record'>
                        <ColorButton size='large' variant="contained" className="button button__short">
                            Попробовать
                        </ColorButton>
                    </Link>
                </div>
            </Container>
        </div>
    )
}

export default HomePage;
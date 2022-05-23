import React, {Fragment} from 'react';
import {Container, Typography, Box} from "@material-ui/core";

import './Info.css';

const Info: React.FC = () => {
    return (
        <Fragment>
            <Container>
                <Box my={8}>
                    <Typography variant='h3'>
                        Записываем ваш голос и отправляем его на сервер
                    </Typography>
                    <Typography className="text__big" variant="body1" color="textSecondary">
                        В браузере записываем ваш голос и отправляем на наш сервер, обрабатывая его и извлекая ключевые
                        характеристики
                        вашего голоса. Ваш голос остается обезличенным, мы не храним никаких личных данных о вас.
                    </Typography>
                </Box>
                <Box my={8}>
                    <Typography className="float__right" variant='h3'>
                        Распознаём ваш гендер
                    </Typography>
                    <Typography className="float__right text__big" variant="body1" color="textSecondary">
                        Используя сверточную нейронную сеть, мы распознаем ваш гендер, это помогает нам определить,
                        какую
                        нейронную сеть
                        в дальнейшем использовать для того, чтобы распознать вашу эмоцию. Дело в том, что мужские и
                        женские
                        голоса
                        довольно разные, и та или иная эмоция отличается разным набором ключевых характеристик.
                    </Typography>
                </Box>
                <Box my={8}>
                    <Typography variant='h3'>
                        Распознаём вашу эмоцию
                    </Typography>
                    <Typography className="text__big" variant="body1" color="textSecondary">
                        Подгрузив необходимую модель, мы запускаем основную нейросеть, которая занимается распознаванием
                    </Typography>
                </Box>
            </Container>
        </Fragment>
    )
}

export default Info;
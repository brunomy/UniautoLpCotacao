import './Header.scss'

import { Link } from "react-router-dom";
import { Box, Button } from '@mui/material';

//images
import logo from './../../assets/logo.png';
import beneficio from './../../assets/beneficio.png';
import whatsapp from './../../assets/whatsapp.svg';

export default function Header() {
    return (
        <header>
            <nav>
                <Box className="content">
                    <Box>
                        <Box className="logo">
                            <img src={logo} alt="Uniauto" />
                        </Box>
                        <Box className="beneficio">
                            <img src={beneficio} alt="Benefício Social Familiar" />
                        </Box>
                    </Box>
                    <Button component={Link} target="_blank" to="https://wa.me/5562981600067?text=Olá,%20venho%20através%20do%20site,%20quero%20tirar%20algumas%20dúvidas.">
                        <img src={whatsapp} />
                        <span>tire suas dúvidas</span>
                    </Button>
                </Box>
            </nav>
        </header>
    )
}
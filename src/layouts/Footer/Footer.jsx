import './Footer.scss'

import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { SvgIcons } from '../../assets/SvgIcons'

import uniauto from './../../assets/footer/uniauto.png'
import fan from './../../assets/footer/fan.png'
import aaapv from './../../assets/footer/aaapv.png'
import appStore from './../../assets/footer/appStore.png'
import googlePlay from './../../assets/footer/googlePlay.png'

export default function Footer() {
    return (
        <footer>
            <Box className="content">
                <Box className="top_content">
                    <Box className="pages">
                        <Box>
                            <h2>Institucional</h2>
                            <Button component={Link} target="_blank" to="https://uniautobrasil.org.br/uniato/">Quem somos</Button>
                            <Button component={Link} target="_blank" to="https://uniautobrasil.org.br/atendimento-ao-consultor/">Área do Consultor</Button>
                            {/* <Button component={Link} target="_blank" to="">Área do Prestador</Button> */}
                        </Box>
                        <Box>
                            <h2>Para você</h2>
                            <Button component={Link} target="_blank" to="https://uniautobrasil.org.br/beneficios/">Benefícios</Button>
                            <Button component={Link} target="_blank" to="https://uniautobrasil.org.br/assistencia-24-horas/">Assistência 24hrs</Button>
                            <Button component={Link} target="_blank" to="https://www.xodo.vip/postos/uniauto">Postos Parceiros</Button>
                        </Box>
                        <Box>
                            <h2>Área do Associado</h2>
                            <Button component={Link} target="_blank" to="https://kepler.hinova.com.br/sga/area/v5/login/">2ª via de boleto</Button>
                            <Button component={Link} target="_blank" to="https://uniautobrasil.org.br/assistencia-24-horas/">Chamar assistência</Button>
                            <Button component={Link} target="_blank" to="https://abertura.veico.com.br/uniauto">Comunicar evento</Button>
                        </Box>
                        <Box className="contact">
                            <Button className="phone" component={Link} to="tel:0800%20940%200587">
                                <h3>Assistência 24h</h3>
                                <span><SvgIcons icon="phone"/>0800 940 0587</span>
                            </Button>
                        </Box>
                    </Box>
                    <Button component={Link} target="_blank" to="https://abertura.veico.com.br/uniauto">Comunicar evento</Button>
                </Box>
                <Box className="botton_content">
                    <Box className="left">
                        <img className="uniauto" src={uniauto} alt="" />
                        <img className="fan" src={fan} alt="" />
                        <img className="aaapv" src={aaapv} alt="" />
                    </Box>
                    <Box className="right">
                        <Box className="store">
                            <Button component={Link} target="_blank" to="https://apps.apple.com/br/app/uniauto-brasil/id6449090990"><img src={appStore} /></Button>
                            <Button component={Link} target="_blank" to="https://play.google.com/store/apps/details?id=br.org.uniautobrasil&hl=pt_BR"><img src={googlePlay} /></Button>
                        </Box>
                        <Box className="social">
                            <Button component={Link} target="_blank" to="https://www.instagram.com/uniautobrasil/"><SvgIcons icon="instagram" /></Button>
                            <Button component={Link} target="_blank" to="https://www.youtube.com/@uniautobrasil"><SvgIcons icon="youtube" /></Button>
                            <Button component={Link} target="_blank" to="https://www.facebook.com/uniautobrasiloficial/?locale=pt_BR"><SvgIcons icon="facebook" /></Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="privacy_policy">
                <Box className="content">
                    <p>© 2024 UNIAUTO BRASIL - Seu Carro Protegido e Você Tranquilo. Todos os Direitos Reservados.</p>
                    <Button component={Link} target="_blank" to="https://luminastudio.digital/"><SvgIcons icon="lumina" /></Button>
                </Box>
            </Box>
        </footer>
    )
}
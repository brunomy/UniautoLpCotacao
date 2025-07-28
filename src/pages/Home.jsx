import './Home.scss';

import { Link } from "react-router-dom";
import { 
    Box, 
    Button, 
    Modal,
    Dialog,
    DialogContent,
    DialogContentText,
    Autocomplete,
    MenuItem,
    Select,
    TextField,
    FormControl,
    InputLabel,
} from '@mui/material';
import { useState, useEffect } from 'react';

//images
import protecaoCarro from './../assets/protecaoCarro.png';
import protecaoMoto from './../assets/protecaoMoto.png'
import logoModal from './../assets/logoModal.png'
import bgForm from './../assets/bgForm.png'
import car from './../assets/car.png'
import motorcicle from './../assets/motorcicle.png'
import { SvgIcons } from '../assets/SvgIcons';

import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

export default function Home() {
    const [open, setOpen] = useState(false);
    const [vehicleType, setVehicleType] = useState(0);

    const path = window.location.pathname;
    const slug = path.split("/").filter(Boolean).pop(); 
    useEffect(() => {
        console.log('slug', slug);
        
        if(slug == 'proteger-carro'){
            setVehicleType(1);
            setOpen(true);
        }
        if(slug == 'proteger-moto'){
            setVehicleType(2);
            setOpen(true);
        }
    }, [])

    return (
        <Box className="home_content">
            <Box className="title_content">
                <h1>E se roubassem seu veículo agora?</h1>
                <p>Não se preocupe, você estando protegido pela Uniauto, pagamos o valor do seu veículo!</p>
            </Box>
            <Box className="links">
                <Box>
                    <img src={protecaoMoto} />
                    <Button component={Link} to="/beneficiosocialfamiliar/proteger-moto" onClick={() => { setVehicleType(2); setOpen(true); }}>
                        <span className="text">Clique aqui para proteger sua moto</span>
                        <SvgIcons icon="hand" />
                    </Button>
                </Box>
                <Box>
                    <img src={protecaoCarro} />
                    <Button component={Link} to="/beneficiosocialfamiliar/proteger-carro" onClick={() => { setVehicleType(1); setOpen(true); }}>
                        <span className="text">Clique aqui para proteger seu carro</span>
                        <SvgIcons icon="hand" />
                    </Button>
                </Box>
            </Box>
            <ModalForm open={open} setOpen={setOpen} vehicleType={vehicleType} />
        </Box>
    )
}

function ModalForm({ open, setOpen, vehicleType }) {
    const handleClose = () => setOpen(false);
  
    return (
        <Dialog className="modal_form" open={open} onClose={handleClose} fullWidth maxWidth="xl">
            <DialogContent>
                <Button className="fechar" onClick={handleClose}><HighlightOffTwoToneIcon /> <span className="text">Fechar</span></Button>
                <Box className="bg">
                    <img src={bgForm} />
                </Box>
                <Box className="form_content">
                    <Box>
                        <Box className="title_content">
                            <Box className="left">
                                <img src={logoModal} alt="" />
                                <h2>Faça sua <span>Cotação!</span></h2>
                            </Box>
                            <Box className="right">
                                <img src={ vehicleType === 1 ? car : motorcicle } alt="" />
                            </Box>
                        </Box>
                        <Form open={open} setOpen={setOpen} vehicleType={vehicleType} />
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

function Form({ open, setOpen, vehicleType }) {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        telefone: '',
        placa: '',
        tipoVeiculo: vehicleType,
        marcaVeiculo: '',
        modeloVeiculo: '',
        anoVeiculo: '',
        estado: '',
        cidade: '',
    });
  
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [anos, setAnos] = useState([]);
    const [modelos, setModelos] = useState([]);

    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        if (!open) return;
        fetchMarcas(vehicleType);
        fetchEstados();
    }, [open]);

    useEffect(() => {
        const raw = form.telefone.replace(/\D/g, '').slice(0, 11);
        let masked = raw;
        if (raw.length === 11)
            masked = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
        else if (raw.length === 10)
            masked = `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`;
        if (masked !== form.telefone) setForm((prev) => ({ ...prev, telefone: masked }));
    }, [form.telefone]);

    useEffect(() => {
        if (form.estado) fetchCidades(form.estado);
    }, [form.estado]);
  
    useEffect(() => {
        if (form.marcaVeiculo) fetchAnos(form.marcaVeiculo);
    }, [form.marcaVeiculo]);
  
    useEffect(() => {
        if (form.anoVeiculo && form.marcaVeiculo)
            fetchModelos(form.marcaVeiculo, form.anoVeiculo);
    }, [form.anoVeiculo]);
  
    const fetchEstados = async () => {
        const res = await fetch(`https://utilities.powercrm.com.br/state/stt`);
        const json = await res.json();
        setEstados(json);
    };
  
    const fetchCidades = async (estadoId) => {
        const res = await fetch(`https://utilities.powercrm.com.br/city/ct?st=${estadoId}`);
        const json = await res.json();
        setCidades(json);
    };
  
    const fetchMarcas = async (tipo) => {
        const res = await fetch(`https://app.powercrm.com.br/cb/?type=${tipo}`);
        const json = await res.json();
        setMarcas(json);
    };
  
    const fetchAnos = async (marcaId) => {
        const res = await fetch(`https://app.powercrm.com.br/bmy/?cb=${marcaId}`);
        const json = await res.json();
        setAnos(json);
    };
  
    const fetchModelos = async (marcaId, ano) => {
        const res = await fetch(`https://app.powercrm.com.br/cmby/?cb=${marcaId}&cy=${ano}`);
        const json = await res.json();
        setModelos(json);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
            companyHash: 'unipv br4sil152',
            formCode: vehicleType === 1 ? 'KQBA80OE' : 'dlmvYgGz',
            pipelineColumn: '1',
            leadSource: '18609',
            clientName: form.nome,
            clientEmail: form.email,
            clientPhone: form.telefone,
            clientState: form.estado,
            clientCity: form.cidade,
            vehiclePlate: form.placa,
            vehicleType: vehicleType,
            vehicleBranch: form.marcaVeiculo,
            vehicleModel: form.modeloVeiculo,
            vehicleYear: form.anoVeiculo,
        };

        const res = await fetch(`https://app.powercrm.com.br/svQttnDynmcFrm`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
            redirected: true
        });

        const json = await res.json();
        if (json.success) {
            setForm({ ...form, nome: '', email: '', telefone: '', placa: '' });
            if (json.redirecTo) {
                window.location.href = json.redirecTo; // link externo
            } else if (json.isPlan > 0) {
                if (json.isPlan == 1) {
                if (json.specificTable || json.planPriority == 2) {
                    window.location.href = `https://app.powercrm.com.br/newQuotation?h=${json.qttnCd}`;
                } else {
                    window.location.href = `https://app.powercrm.com.br/compareTables?h=${json.qttnCd}`;
                }
                } else {
                    window.location.href = `https://app.powercrm.com.br/receivedQuotation?h=${json.qttnCd}`;
                }
            } else {
                window.location.href = `https://app.powercrm.com.br/noPlan?h=${json.qttnCd}`;
            }
        } else {
            alert(json.message || 'Erro ao enviar');
        }

        setOpen(false);
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <Box className="half">
                <label>Nome</label>
                <TextField fullWidth value={form.nome} onChange={handleChange('nome')} />
            </Box>
            <Box className="half">
                <label>Telefone</label>
                <TextField fullWidth error={form.telefone.length > 0 && !isValidPhone(form.telefone)} value={form.telefone} onChange={handleChange('telefone')} />
            </Box>
            <Box>
                <label>E-mail</label>
                <TextField error={form.email.length > 0 && !isValidEmail(form.email)} fullWidth value={form.email} onChange={handleChange('email')} />
            </Box>
            <Box className="half">
                <label>Placa</label>
                <TextField fullWidth value={form.placa} onChange={handleChange('placa')} />
            </Box>
            <Box className="half">
                <label>Marca do Veículo</label>
                <Autocomplete
                    fullWidth
                    disablePortal
                    options={marcas.map((m) => ({ ...m, label: m.text }))}
                    value={
                        marcas
                        .map((m) => ({ ...m, label: m.text }))
                        .find((opt) => opt.id === form.marcaVeiculo) || null
                    }
                    onChange={(_, newValue) => {
                        setForm((prev) => ({
                        ...prev,
                        marcaVeiculo: newValue?.id || '',
                        modeloVeiculo: '',
                        anoVeiculo: '',
                        }));
                    }}
                    renderInput={(params) => (
                        <TextField {...params}  />
                    )}
                />
            </Box>
            <Box className="half">
                <label>Ano do Modelo</label>
                <Autocomplete
                    fullWidth
                    disablePortal
                    options={anos.map((m) => ({ ...m, label: m.text }))}
                    value={
                        anos
                        .map((m) => ({ ...m, label: m.text }))
                        .find((opt) => opt.id === form.anoVeiculo) || null
                    }
                    onChange={(_, newValue) => {
                        setForm((prev) => ({
                        ...prev,
                        anoVeiculo: newValue?.id || '',
                        modeloVeiculo: '',
                        }));
                    }}
                    renderInput={(params) => (
                        <TextField {...params}  />
                    )}
                />
            </Box>
            <Box className="half">
                <label>Modelo</label>
                <Autocomplete
                    fullWidth
                    disablePortal
                    options={modelos.map((m) => ({ ...m, label: m.text }))}
                    value={
                        modelos
                        .map((m) => ({ ...m, label: m.text }))
                        .find((opt) => opt.id === form.modeloVeiculo) || null
                    }
                    onChange={(_, newValue) => {
                        setForm((prev) => ({
                            ...prev,
                            modeloVeiculo: newValue?.id || '',
                        }));
                    }}
                    renderInput={(params) => (
                        <TextField {...params}  />
                    )}
                />
            </Box>
            <Box className="half">
                <label>Estado</label>
                <Autocomplete
                    fullWidth
                    disablePortal
                    options={estados.map((m) => ({ ...m, label: m.text }))}
                    value={
                        estados
                        .map((m) => ({ ...m, label: m.text }))
                        .find((opt) => opt.id === form.estado) || null
                    }
                    onChange={(_, newValue) => {
                        setForm((prev) => ({
                            ...prev,
                            estado: newValue?.id || '',
                            cidade: '',
                        }));
                    }}
                    renderInput={(params) => (
                        <TextField {...params}  />
                    )}
                />
            </Box>
            <Box className="half">
                <label>Cidade</label>
                <Autocomplete
                    fullWidth
                    disablePortal
                    options={cidades.map((m) => ({ ...m, label: m.text }))}
                    value={
                        cidades
                        .map((m) => ({ ...m, label: m.text }))
                        .find((opt) => opt.id === form.cidade) || null
                    }
                    onChange={(_, newValue) => {
                        setForm((prev) => ({
                            ...prev,
                            cidade: newValue?.id || '',
                        }));
                    }}
                    renderInput={(params) => (
                        <TextField {...params}  />
                    )}
                />
            </Box>
            <Button type="submit" variant="contained" disabled={!validate(form)}>
                SOLICITAR COTAÇÃO
            </Button>

            <p>
                Ao preencher o formulário, concordo em receber comunicações e estou de acordo com os <Button component={Link} to="https://site.powercrm.com.br/termos-e-condicoes/" target="_blank">termos de uso</Button>.
            </p>
        </form>
        </>
    );
}

function validate(form) {
    if(form.nome.length === 0) return false;
    if(form.placa.length < 7) return false;
    if(form.marcaVeiculo === '') return false;
    if(form.modeloVeiculo === '') return false;
    if(form.anoVeiculo === '') return false;
    if(form.estado === '') return false;
    if(form.cidade === '') return false;
    if(!isValidEmail(form.email)) return false;
    if(!isValidPhone(form.telefone)) return false;

    return true;
}
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function isValidPhone(phone) {
    const cleaned = phone?.replace(/\D/g, '');
    return /^(\d{10}|\d{11})$/.test(cleaned);
}
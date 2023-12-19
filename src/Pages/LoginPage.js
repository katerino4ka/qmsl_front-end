import React from 'react'
import { Paper, Box, TextField, Stack, Button, Typography, Icon, InputAdornment, Fade, Alert, AlertTitle, IconButton } from '@mui/material'
import { AccountCircle, VisibilityOff, Visibility } from '@mui/icons-material'
import Logo from '../Content/Logo.png'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Routes/App'

function LoginPage() {
    const { user, setUser } = React.useContext(UserContext);
    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [validEmail, setValidEmail] = React.useState(false);
    const [validPassword, setValidPassword] = React.useState(false);
    const [alertVisibility, setAlertVisibility] = React.useState(false);
    const navigate = useNavigate();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const dec = (token) => {
        return jwtDecode(token);
    }

    const handleSubmit = (event) => {
        //Make a network call somewhere
        event.preventDefault();
    }
    const handlePasswordChange = (e) => {
        const reg = new RegExp(/.{5,}/);
        setValidPassword(reg.test(e.target.value));
        setPassword(e.target.value)
    }

    const handleEmailChange = (e) => {
        const reg = new RegExp(/^(.+)@(.+)\.(.+){2,3}$/);
        setValidEmail(reg.test(e.target.value));
        setEmail(e.target.value)

    };

    const login = () => {
        const result = fetch("https://localhost:7233/api/Auth/LogIn", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((result) => {
                const parsedToken = dec(result);
                localStorage.setItem("USER", JSON.stringify({ id: parsedToken.id, type: parsedToken.role }));
                setUser({ id: parsedToken.id, type: parsedToken.role })
                navigate('surveys/available')
            })
            .catch((error) => {
                setAlertVisibility(true);
                console.log('error: ' + error);
            });

    };


    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Stack spacing={2}>  <Stack direction={'row'} spacing={2}>
                <Icon sx={{ width: '10%', height: '10%' }}>
                    <img src={Logo} width = '100%' height= '100%' />
                </Icon>
                <Typography variant='h2'>QMSL</Typography>
            </Stack>

                <Paper width={'lg'} sx={{
                    height: '20%'
                }}>
                    <form onSubmit={handleSubmit}>
                        <Stack margin={5} spacing={3} justifyContent="center" alignItems="center">
                            <TextField label="Ел. пошта" error={!validEmail} fullWidth required={true} placeholder='Email' sx={{ color: "white" }} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }} onChange={(e) => handleEmailChange(e)}></TextField>
                            <TextField
                            fullWidth
                                required={true}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end"  >
                                            <IconButton onMouseDown={handleMouseDownPassword} onClick={handleClickShowPassword}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>

                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ color: "white"}}
                                label="Пароль"
                                onChange={(e) => handlePasswordChange(e)}
                                error={!validPassword}
                            />
                            <Button type='submit' variant="contained" disabled={!validEmail | !validPassword} sx={{ color: "white", width: 200 }} onClick={() => login()}>Увійти</Button>
                        </Stack>
                    </form>
                </Paper>
                <Fade
                    in={alertVisibility}
                    timeout={{ enter: 1000, exit: 1000 }}
                    addEndListener={() => {
                        setTimeout(() => {
                            setAlertVisibility(false)
                        }, 2000);
                    }}
                >
                    <Alert severity="error" variant="standard" className="alert">
                        <AlertTitle>Не вдалося увійти.</AlertTitle>
                        Перевірте введені дані.
                    </Alert>
                </Fade>
            </Stack>

        </Box>

    )

}

export default LoginPage;
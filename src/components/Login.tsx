import { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Carlist from "./Carlist";
import Snackbar from "@mui/material/Snackbar";
import { Dispatch, SetStateAction } from 'react';

interface LoginProps {
  setUsername: Dispatch<SetStateAction<string | null>>;
}

type User={
    username:string;
    password:string;
}
interface LoginProps {
  setUsername: Dispatch<SetStateAction<string | null>>;
}

function Login({ setUsername }: LoginProps) {
    const [user, setUser]= useState<User>({
        username:'',
        password:''
    });
    // const [isAuthenticated, setAuth] = useState(false);
    const [open, setOpen] = useState(false);

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }
    const handleLogin = ()=>{
        axios.post(import.meta.env.VITE_API_URL + "/login", user,{
            headers:{
                'Content-Type': 'application/json'
            }
        })
        //agar res true howa to sessionStorage mein jwt token store karna hai
        .then(res =>{
            const jwtToken=res.headers.authorization;

            if(jwtToken !==null){
                sessionStorage.setItem("jwt", jwtToken);
                localStorage.setItem("token", jwtToken);
                setUsername(user.username);
                // setAuth(true);
            }
        })
        .catch(() => setOpen(true));
    }

    const handleLogout = () =>{
        // setAuth(false);
        sessionStorage.setItem("jwt", "");
        localStorage.setItem("token", "");
        setUsername(null);

        window.location.reload();
    }
    if(localStorage.getItem("token")){
        return <Carlist logout= {handleLogout} />;
    }
    else{
    return (
        <>
        <Stack spacing={2} alignItems="center" mt={2}>
            <TextField name="username" label="Username" onChange={handleChange} />
            <TextField type="password" label="Password" name="password" onChange={handleChange}/>
            <Button variant="outlined" color="primary" onClick={handleLogin}>Login</Button>
        </Stack>
        <Snackbar 
            open={open}
            autoHideDuration={3000}
            onClose ={() => setOpen(false)}
            message = "Login Failed: Check Username and Password"
        />
        </>    
        );
    }
}
export default Login;
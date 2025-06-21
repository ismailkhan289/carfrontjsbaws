import { useState } from "react";
import { CarResponse, AddingCar, EditCarEntry } from "../types";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import CarDialogContent from "./CarDialogContent";
import { updateCar } from "../api/carapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from "@mui/material/Tooltip";

type FormProps={
    carData:CarResponse
}
function EditCar({carData}:FormProps){

    const [car, setCar]=useState<AddingCar>({
        brand:'',
        model:'',
        color:'',
        registrationNumber:'',
        modelYear:0,
        price:0

    });
    const [dialogOpen, setDialogOpen]=useState(false);
    const handleClickOpen=()=>{
        setCar({
            brand:carData.brand,
            model:carData.model,
            color:carData.color,
            registrationNumber:carData.registrationNumber,
            modelYear:carData.modelYear,
            price:carData.price
        });
        setDialogOpen(true);
    }
    const handleClose=()=>{
        setDialogOpen(false);
    }
    
    const queryClient=useQueryClient();

    const{mutate}= useMutation(updateCar,{
        onSuccess:()=>{
            queryClient.invalidateQueries(["cars"]);
        },
        onError: (err)=>{
            console.error(err);
        }
    })
    const handleSave=()=>{
        const url = carData._links.self.href;
        const editCar:EditCarEntry={car, url}
        mutate(editCar);
        setCar({
            brand:'',
            model:'',
            color:'',
            registrationNumber:'',
            modelYear:0,
            price:0

        })
        setDialogOpen(false);

    }
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setCar({
            ...car,
            [event.target.name]:event.target.value
        });
    }
    return(
        <>
        <Tooltip title="Edit Car">
            <IconButton aria-label="edit" size="large" 
                onClick={handleClickOpen}>
                    <EditIcon fontSize="small" />
            </IconButton>
        </Tooltip>    
        <Dialog 
            open={dialogOpen} 
            onClose={handleClose} 
            maxWidth="md"
            fullWidth>
            <DialogTitle>Edit Car</DialogTitle>
            <CarDialogContent car={car} handleChange={handleChange} />    
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>        
        </>
    )
}

export default EditCar;
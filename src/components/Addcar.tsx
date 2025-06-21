
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useState } from "react";
import { AddingCar } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";
import Button from "@mui/material/Button";

interface AddcarProps {
  onNewCarAdded?: () => void;
}
function Addcar(props: AddcarProps){
    const [openDialog, setOpenDialog]= useState(false);
    
    //fetching the AddingCar from types.ts and assigning it to the addCarState
    //passing the addCarState as a props in the CarDialogContent
    //CarDialogContent works for bothe adding new Car and Editing the exiting Car as well
    const [addCarState, setAddCarState]= useState<AddingCar>({
        brand:'',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price:0

    })
    const queryClient=useQueryClient();

    const handleDialogOpen=()=>{
        setOpenDialog(true);
    }

    const handleDialogClose=()=>{
        setOpenDialog(false);
    }
    //This is the function passing as a props to CarDialogContent
    const handleChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setAddCarState({
            ...addCarState,
            [event.target.name]:event.target.value
        })
    }
    const {mutate}=useMutation(addCar,{
        onSuccess:()=>{
            if(props.onNewCarAdded) props.onNewCarAdded();
            queryClient.invalidateQueries({queryKey:["cars"]});
        },
        onError:(err)=>{
            console.error(err);
        }
    })

    const handleSave= ()=>{
        mutate({
            ...addCarState,
            modelYear: Number(addCarState.modelYear),
            price: Number(addCarState.price)
        });
        setAddCarState({
            brand:'',
            model: '',
            color: '',
            registrationNumber: '',
            modelYear: 0,
            price: 0
        })
        handleDialogClose();
    }
    return(
        <>
        <Button onClick={handleDialogOpen}>Add New Car</Button>
        <Dialog 
            open={openDialog} 
            onClose={handleDialogClose}
            maxWidth="md"
            fullWidth>
            
            <DialogTitle>New Car</DialogTitle>
            <CarDialogContent car={addCarState} handleChange={handleChange} />
            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}
export default Addcar;
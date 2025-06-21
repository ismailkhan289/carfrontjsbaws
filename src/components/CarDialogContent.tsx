import { AddingCar } from "../types";
import { DialogContent } from "@mui/material";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

//Here defining a type and its properties, car assigned AddingCar types and handleChange is explicitly defined as 
//a Html input Element function.
type DialogFormProps ={
    car:AddingCar;
    handleChange:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}
//both the properties from DialogFromProps and passing it to the CarDialogContent as props
function CarDialogContent({car, handleChange}:DialogFormProps){
    return(
        <DialogContent>
            <Stack spacing={2} mt={1}>
                <TextField label="Brand" required placeholder="Enter Brand" name="brand" value={car.brand} onChange={handleChange} /><br/>
                <TextField label="Model" required placeholder="Enter Model" name="model" value={car.model} onChange={handleChange} /><br/>
                <TextField label="Color" required placeholder="Enter Color" name="color" value={car.color} onChange={handleChange} /><br/>
                <TextField label="Model Year" required placeholder="Enter Model Number" type="number" name="modelYear" value={car.modelYear===0?'':car.modelYear.toString()} onChange={handleChange} /><br/>
                <TextField label="Reg Nr." required placeholder="Enter Registration Number"  name="registrationNumber" value={car.registrationNumber} onChange={handleChange} /><br/>
                <TextField label="Price" required placeholder="Enter Price in Euro"  type="number" name="price" value={car.price===0?'':car.price.toString()} onChange={handleChange} /><br/>
            </Stack>
        </DialogContent>
    )
}
export default CarDialogContent;
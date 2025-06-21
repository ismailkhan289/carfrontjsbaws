import {useState} from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCars, deleteCar } from '../api/carapi';
import { Snackbar, Alert} from '@mui/material';
import {DataGrid, GridCellParams, GridColDef} from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Addcar from './Addcar';
import EditCar from './EditCar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

type CarlistProps = {
    logout?: () => void;
}
function Carlist({logout}: CarlistProps) {
    //adding a Snackbar message on Adding a new car
    const [addSnackbarOpen, setAddSnackbarOpen]= useState(false);
    const [addSnackbarMsg, setAddSnackbarMsg]= useState("");
    const [snackbarSeverity, setSnackbarSeverity]=useState<'success' | 'error'>('success');

    const [deletionMessage, setDeletionMessage]=useState(false);
    const [deleteCarName, setDeleteCarName]=useState<string | null> (null);
    
    const queryClient=useQueryClient();
    
    const columns: GridColDef[] = [
        {field: 'brand', headerName: 'Brand', width: 200},
        {field: 'model', headerName: 'Model', width: 200},
        {field: 'color', headerName: 'Color', width: 200},
        {field: 'registrationNumber', headerName: 'Reg.nr.', width: 150},
        {field: 'modelYear', headerName: 'Model Year', width: 150},
        {field: 'price', headerName: 'Price', width: 150},
        {
            field:'edit',
            headerName:'Edit',
            width:90,
            sortable:false,
            filterable:false,
            disableColumnMenu:true,
            renderCell:(params:GridCellParams)=>
                <EditCar carData={params.row} />
        },
        {
            field:'delete',
            headerName:'Action',
            width:90,
            sortable:false,
            filterable:false,
            disableColumnMenu:true,
            renderCell:(params:GridCellParams)=>(
                <IconButton aria-label="delete" size="small" 
                    onClick={()=>{
                        if(window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)){    
                        mutate({
                        link:params.row._links.car.href,
                        name:`${params.row.brand} ${params.row.model}`
                    })
                    }}
                }>
                    <DeleteIcon fontSize="small" />
                </IconButton>
            )
        }
    ];
    const {data, error, isSuccess} = useQuery({
        queryKey:["cars"],
        queryFn:getCars //using this function which in carapi.ts, useQuery hook is assigned a task to fetch the car using getCars
                        //function in carapi.ts and store the value in data for further processing
    });
    //Here useMutation hook is asigned a task to delete a car Using the function deleteCar in carapi.ts
    const {mutate}=useMutation(deleteCar,{
        onSuccess:(_data, variables)=>{
            setDeleteCarName(variables.name);
            setDeletionMessage(true);
            queryClient.invalidateQueries({queryKey:['cars']});
            //car Deleted
        },
        onError:(err)=>{
            console.error(err);
        },
    });
    
    if(!isSuccess){
        return <span>Loading...</span>
    }
    else if(error){
        return <span>Error fetching Cars...</span>
    }
    else{
        return(
            <>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {/* this is the top header bar over the table of carList having two components */}
                    <Addcar onNewCarAdded={()=>{
                        setAddSnackbarMsg('A New Car is Added Successfully');
                        setSnackbarSeverity('success');
                        setAddSnackbarOpen(true);
                    }} />
                    <Button onClick={logout}>Log Out</Button>
                </Stack>
                {/* this is the data grid displaying the list of cars */}
                <DataGrid
                    rows={data}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row=>row._links.self.href}
                />
                {/* this is the Snackbar message for deletion of car */}
                <Snackbar 
                    open={deletionMessage}
                    autoHideDuration={2000}
                    onClose={()=> setDeletionMessage(false)}
                    message={deleteCarName ? `Car "${deleteCarName}" Deleted`:"Car Deleted"}
                />
                {/* this is the Snackbar message for adding a new car */}
                <Snackbar 
                    open={addSnackbarOpen}
                    autoHideDuration={2000}
                    onClose={()=>setAddSnackbarOpen(false)}
                    anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
                    <Alert onClose={()=>setAddSnackbarOpen(false)} severity={snackbarSeverity} sx={{width:'100%'}}>
                        {addSnackbarMsg}
                    </Alert>
                </Snackbar>

            </>
        )
    }

    
}
export default Carlist;
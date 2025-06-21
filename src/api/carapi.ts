//CarResponse is used for Listing the data of Cars in db
//AddingCar is used for adding a new car in db
//EditCar is used to updating the existing car in db
import { CarResponse, AddingCar, EditCarEntry} from "../types";
import axios, {AxiosRequestConfig} from "axios";

const getAxiosConfig = (): AxiosRequestConfig =>{
    const token = sessionStorage.getItem("jwt");
    return {
        headers:{
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
        }
    }
}

//Listing Cars in db
export const getCars = async (): Promise<CarResponse[]>=>{
   
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cars`,getAxiosConfig());
    return response.data._embedded.cars;
}

//Deleting a Car
export const deleteCar = async ({link}:{link:string;name:string}): Promise<CarResponse>=>{
    const response = await axios.delete(link, getAxiosConfig());
    return response.data;
}

//Adding a New Car
export const addCar=async (car:AddingCar): Promise<CarResponse> =>{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cars`, car, getAxiosConfig());
    return response.data;
}

//update function, passing EditCar type as editCar and expecting a response type similar
//CarResponse. Using axios.put editCar.url and editCar.car is passing as parameters.
export const updateCar = async (editCar:EditCarEntry):Promise<CarResponse> =>{
    const response = await axios.put(editCar.url, editCar.car, getAxiosConfig());
    return response.data;
}


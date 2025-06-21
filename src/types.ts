//type CarResponse is created for ellaborating the CarResponse from fetch using get
export type CarResponse={
    brand: string;
    model: string;
    color: string;
    registrationNumber: string;
    modelYear: number;
    price: number;
    carOwner:{
        firstname:string;
        lastname:string;
    }
    _links: {
        self: {
        href: string;
        },
        car: {
        href: string;
        },
        owner: {
        href: string;
        }
    };
}
//This type is declared for adding a new Car, axios post for adding a new car
//addingCar type is created for defining the properties of a car
export type AddingCar={
    brand:string;
    model:string;
    color:string;
    registrationNumber:string;
    modelYear:number;
    price:number;
}

//for editing the existing car, creating EditCarEntry type, axios put for editing a car
//EditCarEntry type is created for defining the properties of a car and url for editing the
export type EditCarEntry={
    car:AddingCar;
    url:string;
}
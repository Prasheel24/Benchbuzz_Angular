
export interface IDropdownData {
    Item: string;
    ID: number;
}

export interface IUpdateProfile {
    DropdownItems: IDropdownData;
    DropdownName: string;
}

export interface IGetUpdateProfileDetails{
IsMaternity :boolean;
MaternityFrom:Date;
MaternityTo:Date;
IsLOA:boolean;
LOAFrom:Date;
LOATo:Date;
IsVacation:boolean;
VacationFrom:Date;
VacationTo:Date;
IsCrossTrain:boolean;
LocationID:number;
IsRelocate:boolean;
Prefrerence1:number;
Prefrerence2:number;
IsVisa:boolean;
VisaCountryID:number;
AlternateContact:number;
IsCV_Uploaded:boolean;
}

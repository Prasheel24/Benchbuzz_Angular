export interface ICustomData {
    AssignedRole: string;
    PocName: string;
    DemandDetails: string;
    CreatedDate: string;
    ClientName: string;
    SkillName: string;
    RRDNumber: string;
    RRDCount: number;
    ReqdBy: string;
    Location: string;
    Facility: string;
    CareerLevel: string;
    ApplicationStatus: string;
    RejectionStatus: string;
}


export interface IDropdownData {
    Item: string;
    ID: number;
    CityID: number;
}

export interface ICustomisedJobSearch {
    DropdownItems: IDropdownData;
    DropdownName: string;
}

//export interface IDemandDetailsData {
//}


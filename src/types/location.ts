
export interface GHNProvince {
    [key: string]: any,
    ProvinceID: number | string,
    ProvinceName: string,
}
export interface GHNDistrict {
    [key: string]: any,
    "DistrictID":number | string,
    "DistrictName":string
}

export interface GHNWard {
    [key: string]: any,
    "WardCode":number | string,
    "WardName":string
}


//
// interface ILocation {
//     code: number ,
//     name: string
// }
interface IProvince {
    ProvinceID: number ,
    ProvinceName: string
}
interface IDistrict {
    DistrictID: number ,
    DistrictName: string
}

interface IWard {
    WardCode: number ,
    WardName: string
}



export interface IAddress {
    ward: IWard,
    province: IProvince,
    district: IDistrict,
    address: string
}

export interface UserAddress  extends IAddress {
    name: string,
    id: string
}
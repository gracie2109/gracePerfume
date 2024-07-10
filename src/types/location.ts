
export interface GHNProvince {
    [key: string]: any,
    ProvinceID: number,
    ProvinceName: string,
}
export interface GHNDistrict {
    [key: string]: any,
    "DistrictID":number,
    "DistrictName":string
}

export interface GHNWard {
    [key: string]: any,
    "WardCode":number | string,
    "WardName":string
}



interface ILocation {
    code: number ,
    name: string
}

export interface IAddress {
    ward: ILocation,
    province: ILocation,
    district: ILocation,
    address: string
}

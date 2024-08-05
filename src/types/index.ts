import type {Component} from "vue";
import type {DateRange} from "radix-vue";
import {DateValue} from "@internationalized/date";


export interface Option {
    label: string
    value: string
    icon?: Component
}

export interface DataTableSearchableColumn<TData> {
    id: keyof TData
    title: string
}

export interface DataTableFilterableColumn<TData>
    extends DataTableSearchableColumn<TData> {
    options: Option[]
}

export type IFilterModel ={
    brands: [],
    price:{
        min:number,
        max:number
    },
    attributes:[]
}


export type TErrors = {
    code: string | null,
    message: string
}

export interface DateRangeValueType extends DateRange{
    start:DateValue | undefined,
    end: DateValue | undefined
}
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '@/plugins/firebase';
import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getDetailData (collectionName:string,fieldName:string, data:string) {
  const q = query(collection(db, collectionName), where(fieldName, '==', data));
  const querySnapshot = await getDocs(q);

  return querySnapshot
}

export async function checkItemExistence(collectionName:string,fieldName:string, data:string) {
  const querySnapshot = await getDetailData(collectionName, fieldName, data)
  return !querySnapshot.empty;
}


export const generateId = () => {
  let ID = "";
  const  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiolkjhgfdsazxcvbnm0123456789";
  for (let i = 0; i < characters.length; i++ ) {
    ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return ID;

}


export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value
      = typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}

export const profitAndMarginAlg = (sale_price:number, cost_price: number,  puschase_price:number ) => {
  if(!(sale_price && cost_price && puschase_price)) return 0;
  return Number(sale_price - puschase_price);
}


export function formatPrice(
    price: number | string,
    options: {
      currency?: "USD" | "EUR" | "GBP" | "BDT" | "VND"
      notation?: Intl.NumberFormatOptions["notation"]
    } = {}
) {
  const {currency = "VND", notation = "standard"} = options
  if (price == "undefined") return
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency,
    notation,
  }).format(Number(price))
}


export function groupBrands (data:string[]) {
  // const getName = new Set(data.map((i) => i.name.toLowerCase().at(0)))
  return data
}

export function getAllAlphabet () {
  const alphabet = [];
  for (let i = 65; i <= 90; i++) {
    alphabet.push(String.fromCharCode(i));
  }
  return alphabet
}

export function getBrandsByCharacter(data:string[],letter:string) {
  const brandMap = new Map();
  if(!data) return []
  data.forEach((brand:string) => {
    const initial = brand[0].toUpperCase();
    if (!brandMap.has(initial)) {
      brandMap.set(initial, []);
    }
    brandMap.get(initial).push(brand);
  });
  return brandMap.get(letter.toUpperCase()) || [];
}


export  function groupByPermissions(data: any[]) {
  console.log("groupByPermissions", data)
  const response: any[] = [];
  const groupedData: any = {};
  if (!data) return [];

  data.forEach((item) => {
    const permissionName = item.name.split('.')[1];
    const perName = item.name.split('.')[2];
    if (!groupedData[permissionName]) {// @ts-ignore
      groupedData[permissionName] = new Set<string>();
    }// @ts-ignore
    groupedData[permissionName].add(perName);
  });

  const allPerNames = new Set<string>();
  for (const permissionName in groupedData) {
    for (const perName of groupedData[permissionName]) {
      // @ts-ignore
      allPerNames.add(perName);
    }
  }

  const sortedPerNames = Array.from(allPerNames);

  for (const permissionName in groupedData) {
    const permissionArray: (string | null)[] = [];
    for (const perName of sortedPerNames) {// @ts-ignore
      permissionArray.push(groupedData[permissionName].has(perName) ? perName : null);
    }
    const permissionItemArray = permissionArray.map((perName) => {
      const foundItem = data.find((item) => item.name.split('.')[1] === permissionName && item.name.split('.')[2] === perName);
      const newItem = {...foundItem, indentity: permissionName}
      return foundItem ? newItem : null;
    });// @ts-ignore
    // @ts-ignore
    const permissionObject = {
      // @ts-ignore
      [permissionName]: permissionItemArray,

    };
    response.push(permissionObject);
  }
  return response
}

export function truncateText(text:string, maxLength: number){
    const newText = text.slice(0, maxLength);
    return `${newText}...`;
}
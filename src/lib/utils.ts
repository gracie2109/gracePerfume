import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '@/plugins/firebase';
import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue';
import slugify from 'slugify';

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
) {
  if (price == "undefined") return
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency:"VND",
    notation:'standard',
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
  return {
    data: response || [],
    methods:sortedPerNames||[]
  }
}

export function truncateText(text:string, maxLength: number){
    const newText = text.slice(0, maxLength);
    return `${newText}...`;
}


export function getUniquePermissions(array1: any, array2: any) {
  if(!(array1 && array2)) return [];
  const setA = new Set(array1?.map((item: any) => item?.id));
  const uniqueElements = array2?.filter((item: any) => {
      if (!setA.has(item?.id)) {
          setA.add(item?.name);
          return item;
      }
  });

  return uniqueElements;
}


export const getQuantityOfPermission = (data: any[]) => {
  if (!data) return null;
  const dataname = data?.map((i) => i.name?.split('.')?.at(-1));
  return dataname.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
  }, {});
}


export function matchingTwoObject(obj1: any, ob2: any): any[] {
  if (!(obj1 || ob2)) return []
  else {
      const matchingKeys = [];
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(ob2);

      for (const key of keys1) {
          if (keys2.includes(key) && obj1[key] === ob2[key]) {
              matchingKeys.push(key);
          }
      }
      return matchingKeys;
  }
}


export const reduceData = (data: any) => {
  return data.reduce((acc: any, curr: any) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
};

export function getTotalVariantLength(raw: any) {
  if(raw){
    const totalLength = raw.reduce((acc: any, item: any) => {
      if (item?.variant && Array.isArray(item?.variant)) {
        return acc + item?.variant?.length;
      } else {
        return acc + 1;
      }
    }, 0);

    return totalLength;
  }else return 0

}
export function arraysEqual(arr1:any, arr2:any) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

export  function removeVietnameseTones(str: string) {
  return slugify(str, {
    replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: false,      // convert to lower case, defaults to `false`
    strict: false,     // strip special characters except replacement, defaults to `false`
    locale: 'vi',      // language code of the locale to use
    trim: true         // trim leading and trailing replacement chars, defaults to `true`
  })
}


export const calcSalePercentage = (price: number, cost:number) => {
  return 100 - (100 * price) / cost;
}
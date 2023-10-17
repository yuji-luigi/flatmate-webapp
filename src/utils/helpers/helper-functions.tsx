/* eslint-disable no-param-reassign */
// export const getFormFieldsJson = async (str: string): Promise<Array<any>> =>{
//   const import(`../../data/datatable/formFields/index${str}`);}

import { PATH_API } from '../../path/path-api';
import { MixedMediaType, UploadingMediaType } from '../../types/data/media/media-types';
import { Sections, isSection, sectionsArray } from '../../types/general/data/sections-type';
import { AllModels } from '../../types/models/allmodels';
import axiosInstance from '../axios-instance';

type ALotOfNumbers = number;
export const getRandomNumber = (): ALotOfNumbers => Math.ceil(10 ** 10 * Math.random());

export const getPsuedoID = () => Math.floor(Math.random() * 1e15);
type OnlyNumber = number;
export const getRandomNumberOne = (): OnlyNumber => Math.ceil(10 * Math.random());

export const createLabelFromArrayStr = (
  arr: string[],
  document: any,
  label: string = ''
): string => {
  const clonedArr = [...arr];

  if (!clonedArr.length) {
    return label;
  }

  const index = clonedArr.shift();
  if (!index) return label;

  const gotLabel = document[index];
  label += label ? `${label} - ${gotLabel}` : gotLabel;

  return createLabelFromArrayStr(clonedArr, document, label);
};

// eslint-disable-next-line no-promise-executor-return
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function isObjectEmpty(value: Record<any, any> | any) {
  return (
    Object.prototype.toString.call(value) === '[object Object]' && JSON.stringify(value) === '{}'
  );
}

export function getCookie(name: string) {
  return document.cookie.split(';').some((c) => c.trim().startsWith(`${name}=`));
}

export function deleteCookie(name: string, path: string, domain: string) {
  if (getCookie(name)) {
    document.cookie = `${name}=${path ? `;path=${path}` : ''}${
      domain ? `;domain=${domain}` : ''
    };expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  }
}

/**
 *
 * - converts all key value pair as url query string. \n setQueryForDataFetching converts array of object instead.
 */
export function createQuery(data: Record<string, string>) {
  const createdQuery = Object.entries(data).reduce((acc, [key, value]) => {
    if (!value) {
      return acc;
    }
    if (acc === '?') {
      acc += `${key}=${value}`;
      return acc;
    }
    acc += `&${key}=${value}`;
    return acc;
  }, '?');
  return createdQuery === '?' ? undefined : createdQuery;
}

/** Piece of useful function from StackOverflow
 * https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-and-arrays-by-string-path */
export function _get(obj: Record<string, any>, path: string[] | string, separator: string = '.') {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr) => prev?.[curr], obj);
}

export function _set(
  obj: Record<string, any>,
  path: string[] | string,
  newValue: any,
  separator: string = '.'
) {
  const properties = Array.isArray(path) ? path : path.split(separator);
  return properties.reduce((prev, curr, index) => {
    /** define case last index of the property set the value */
    if (properties.length === index + 1) {
      prev[curr] = newValue;
      return obj;
    }
    /** new prev value to next reduce function */
    return prev?.[curr];
  }, obj);
}

// export const getCsvPrimitive = ({
//   array = [],
//   obj,
// }: {
//   array: string[];
//   obj: Record<string, string>;
// }): Record<string, string> => {
//   const data = obj;
//   if (!array.length) {
//     return data;
//   }
//   const newData = data[array[0]];
//   array.shift();
//   return getCsvPrimitive({ array, obj: newData || '' });
// };

export const capitalize = (str?: string) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '');

export const convertToSelectItems = (mongooseDocuments: Array<any>, label: string = 'name') => {
  return mongooseDocuments.map((doc) => {
    return {
      value: doc._id,
      label: doc[label],
    };
  });
};

export function getEntityFromUrl(
  url: string = window.location.pathname,
  keyword: string = 'dashboard'
): Sections {
  const regex = new RegExp(`${keyword}\\/(\\w+)`);
  let match = regex.exec(url)?.[1];
  match = transformMatchForExceptions(match);
  if (match && isSection(match)) {
    return match;
  }
  console.log(match);
  throw new Error('entity is not valid. getEntityFromUrl');
}

export function getEntityOrUndefinedFromUrl(
  url: string = window.location.pathname,
  keyword: string = 'dashboard'
): Sections | undefined {
  const regex = new RegExp(`${keyword}\\/(\\w+)`);
  let match = regex.exec(url)?.[1];
  match = transformMatchForExceptions(match);
  if (match && isSection(match)) {
    return match;
  }
  return undefined;
}

export function getWordNextFromUrl(url = window.location.pathname, keyword = 'dashboard') {
  const regex = new RegExp(`${keyword}\\/(\\w+)`);
  const match = regex.exec(url);
  return match ? match[1] : null;
}

function transformMatchForExceptions(match: string | undefined) {
  if (match === 'space') {
    return 'spaces';
  }
  return match;
}

import { ImageRequireSource } from 'react-native';

/**
 * IndexType url
 * url is relative path 'res/drawable/...' rather than 'http...'
 * Its absolute path: get_material_path(url) in 'nemo/src/utils'
 */
export interface IndexType {
  id:number;
  name:string;
  category_id:number;
  url:string[];
  sub_category_id?:number;
}

export interface FilterType {
  [key:string]:IndexType[];
}

export enum ActorCategoryID {
  Actor = 1,
  Interface,
  Prop,
  Effect,
  Shape,
  GuGong,
}

export enum BackgroundCategoryID {
  Game = 1,
  Life,
  Nature,
  GuGong,
}

export enum SoundCategoryID {
  Music = 1,
  SoundEffect,
}

export type CategoryID = BackgroundCategoryID | ActorCategoryID | SoundCategoryID | string;

export interface SubCategory {
  sub_category_id:number;
  name:string;
}

export interface Category {
  category_id:CategoryID;
  name:string;
  icon_on:ImageRequireSource;
  icon_off:ImageRequireSource;
}

export interface ActorCategory extends Category {
  sub_category:SubCategory[];
}

export type ICategory = Category | ActorCategory;

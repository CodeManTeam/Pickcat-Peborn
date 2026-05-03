import * as _ from 'lodash-es';

import * as I from './interfaces';
import { UI } from '../../ui';

const actor_indexes:I.IndexType[] = require('./actor_index');
const background_indexes:I.IndexType[] = require('./background_index');
const sound_indexes:I.IndexType[] = require('./sound_index');

export const ACTOR_CATEGORIES:I.ActorCategory[] = [
  {
    category_id: I.ActorCategoryID.Actor,
    name: '角色',
    icon_on: UI.assets.characters_on,
    icon_off: UI.assets.characters_off,
    sub_category: [
      {
        sub_category_id: 1,
        name: '人物',
      },
      {
        sub_category_id: 2,
        name: '源码精灵',
      },
      {
        sub_category_id: 3,
        name: '动物',
      },
    ],
  },
  {
    category_id: I.ActorCategoryID.Interface,
    name: '界面',
    icon_on: UI.assets.interfaces_on,
    icon_off: UI.assets.interfaces_off,
    sub_category: [
      {
        sub_category_id: 1,
        name: '常用',
      },
      {
        sub_category_id: 2,
        name: '其他',
      },
    ],
  },
  {
    category_id: I.ActorCategoryID.Prop,
    name: '道具',
    icon_on: UI.assets.items_on,
    icon_off: UI.assets.items_off,
    sub_category: [
      {
        sub_category_id: 1,
        name: '游戏',
      },
      {
        sub_category_id: 2,
        name: '生活',
      },
      {
        sub_category_id: 3,
        name: '装备',
      },
      {
        sub_category_id: 4,
        name: '自然',
      },
    ],
  },
  {
    category_id: I.ActorCategoryID.Effect,
    name: '特效',
    icon_on: UI.assets.effects_on,
    icon_off: UI.assets.effects_off,
    sub_category: [
      {
        sub_category_id: 1,
        name: '效果',
      },
      {
        sub_category_id: 2,
        name: '技能',
      },
    ],
  },
  {
    category_id: I.ActorCategoryID.GuGong,
    name: '故宫',
    icon_on: UI.assets.gugong_characters_on,
    icon_off: UI.assets.gugong_characters_off,
    sub_category: [
      {
        sub_category_id: 1,
        name: '故宫宫廷文化-人物',
      },
      {
        sub_category_id: 2,
        name: '故宫宫廷文化-神兽',
      },
      {
        sub_category_id: 3,
        name: '故宫宫廷文化-道具',
      },
    ],
  },
  {
    category_id: I.ActorCategoryID.Shape,
    name: '图形',
    icon_on: UI.assets.shapes_on,
    icon_off: UI.assets.shapes_off,
    sub_category: [
      {
        sub_category_id: 1,
        name: '图形',
      },
    ],
  },
];

export const actor_filter_indexes = ACTOR_CATEGORIES.reduce<I.FilterType>(
  (acc, cur) => {
    cur.sub_category.forEach((category) => {
      acc[`${cur.category_id}-${category.sub_category_id}`] = _.filter(
        actor_indexes,
        (value:I.IndexType) => {
          return value.category_id === cur.category_id &&
            value.sub_category_id === category.sub_category_id;
        });
    });
    return acc;
  },
  {},
);

export const BACKGROUND_CATEGORIES:I.Category[] = [
  {
    category_id: I.BackgroundCategoryID.Game,
    name: '游戏',
    icon_on: UI.assets.games_on,
    icon_off: UI.assets.games_off,
  },
  {
    category_id: I.BackgroundCategoryID.Life,
    name: '生活',
    icon_on: UI.assets.life_on,
    icon_off: UI.assets.life_off,
  },
  {
    category_id: I.BackgroundCategoryID.Nature,
    name: '自然',
    icon_on: UI.assets.nature_on,
    icon_off: UI.assets.nature_off,
  },
  {
    category_id: I.BackgroundCategoryID.GuGong,
    name: '故宫',
    icon_on: UI.assets.gugong_on,
    icon_off: UI.assets.gugong_off,
  },
];

export const background_filter_indexes = BACKGROUND_CATEGORIES.reduce<I.FilterType>(
  (acc, cur) => {
    acc[cur.category_id] = _.filter(
      background_indexes,
      (value) => {
        return value.category_id === cur.category_id;
      });
    return acc;
  },
  {},
);

export const SOUND_CATEGORIES:I.Category[] = [
  {
    category_id: I.SoundCategoryID.Music,
    name: '音乐',
    icon_on: UI.assets.music_on,
    icon_off: UI.assets.music_off,
  },
  {
    category_id: I.SoundCategoryID.SoundEffect,
    name: '音效',
    icon_on: UI.assets.sounds_on,
    icon_off: UI.assets.shapes_off,
  },
];

export const sound_filter_indexes = SOUND_CATEGORIES.reduce<I.FilterType>(
  (acc, cur) => {
    acc[cur.category_id] = _.filter(
      sound_indexes,
      (value) => {
        return value.category_id === cur.category_id;
      });
    return acc;
  },
  {},
);

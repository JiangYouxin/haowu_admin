import { Mongo } from 'meteor/mongo';

export const posts = new Mongo.Collection('posts');
export const users = new Mongo.Collection('users');
export const audios = new Mongo.Collection('audios');

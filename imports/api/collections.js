import { Mongo } from 'meteor/mongo';

export const posts = new Mongo.Collection('posts');
export const users = new Mongo.Collection('users');
export const audios = new Mongo.Collection('audios');
export const comments = new Mongo.Collection('comments');
export const user_feeds = new Mongo.Collection('user_feeds');
export const topics = new Mongo.Collection('topics');
export const asks = new Mongo.Collection('asks');
export const qr_codes = new Mongo.Collection('qr_codes', {idGeneration: 'MONGO'});

import { Mongo } from 'meteor/mongo';

export const posts = new Mongo.Collection('posts');

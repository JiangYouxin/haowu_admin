import { Mongo } from 'meteor/mongo';

export const users = new Mongo.Collection('users');

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatch = exports.unsubscribe = exports.subscribe = exports.createStore = void 0;
const reducer_1 = __importDefault(require("./reducer"));
let store;
let subscribers;
let rootReducer;
let isInitialized = false;
const createStore = (initialValue = {}, reducer = reducer_1.default) => {
    if (isInitialized) {
        return;
    }
    if (!store)
        store = initialValue;
    rootReducer = reducer;
    isInitialized = true;
};
exports.createStore = createStore;
const subscribe = (subscriber) => {
    if (!isInitialized) {
        console.warn('Store was not initialized');
        return;
    }
    if (!subscribers)
        subscribers = [];
    subscribers.push(subscriber);
};
exports.subscribe = subscribe;
const unsubscribe = (subscriber) => {
    if (!isInitialized) {
        console.warn('Store was not initialized');
        return;
    }
    subscribers = subscribers.filter((sub) => sub != subscriber);
};
exports.unsubscribe = unsubscribe;
const dispatch = (action) => {
    if (!isInitialized) {
        console.warn('Store was not initialized');
        return;
    }
    let prevState = Object.assign({}, store);
    store = rootReducer(prevState, action);
    subscribers.forEach((sub) => {
        sub(store);
    });
};
exports.dispatch = dispatch;

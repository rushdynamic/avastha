"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const store_1 = require("./store");
const useSqrrl = (initialState, rootReducer) => {
    (0, store_1.createStore)(initialState, rootReducer);
    const useSqrrlState = (stateKey) => {
        const [currState, setCurrState] = (0, react_1.useState)(initialState);
        (0, store_1.subscribe)(setCurrState);
        return currState === null || currState === void 0 ? void 0 : currState[stateKey];
    };
    return { useSqrrlState, dispatch: store_1.dispatch };
};
exports.default = useSqrrl;

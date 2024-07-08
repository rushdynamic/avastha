"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SqrrlWrapper;
const react_1 = __importDefault(require("react"));
const useSqrrl_1 = __importDefault(require("./useSqrrl"));
function SqrrlWrapper({ initialState = {}, rootReducer, children, }) {
    const { useSqrrlState, dispatch } = (0, useSqrrl_1.default)(initialState, rootReducer);
    const wrappedChildren = react_1.default.Children.map(children, (child) => react_1.default.cloneElement(child, { useSqrrlState, dispatch }));
    return react_1.default.createElement(react_1.default.Fragment, null, wrappedChildren);
}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../../models/user");
var product_1 = require("../../models/product");
var order_1 = require("../../models/order");
var userStore = new user_1.UserStore();
var productStore = new product_1.ProductStore();
var orderStore = new order_1.OrderStore();
// This function adds some test data,
// so we can do some tests when our ENV is set to 'test'
var addTestData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var newUserA, newUserB, newProducts, completedOrderA, completedOrderB, openOrderA, openOrderB, a, b, i_1, coOrderA, coOrderB, opOrderA, opOrderB, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newUserA = {
                    firstName: 'Izuku',
                    lastName: 'Midoriya',
                    username: 'deku',
                    password: 'numberone1'
                };
                newUserB = {
                    firstName: 'Bakugo',
                    lastName: 'Katsuki',
                    username: 'kacchan',
                    password: 'numbertwo2'
                };
                newProducts = [
                    {
                        name: 'Sabila',
                        price: 20.00,
                        category: 'plants'
                    },
                    {
                        name: 'Cactus',
                        price: 10.00,
                        category: 'plants'
                    },
                    {
                        name: 'Rose',
                        price: 5.00,
                        category: 'plants'
                    },
                    {
                        name: 'Peace Lily',
                        price: 15.00,
                        category: 'plants'
                    },
                    {
                        name: 'Spider Plant',
                        price: 15.00,
                        category: 'plants'
                    },
                    {
                        name: 'Pothos',
                        price: 15.00,
                        category: 'plants'
                    },
                    {
                        name: 'Air Plant',
                        price: 15.00,
                        category: 'plants'
                    },
                    {
                        name: 'Snake Plant',
                        price: 15.00,
                        category: 'plants'
                    }
                ];
                completedOrderA = {
                    status: order_1.OrderStatus.completed,
                    userId: 0, // set later
                };
                completedOrderB = {
                    status: order_1.OrderStatus.completed,
                    userId: 0 // set later
                };
                openOrderA = {
                    status: order_1.OrderStatus.open,
                    userId: 0, // set later
                };
                openOrderB = {
                    status: order_1.OrderStatus.open,
                    userId: 0 // set later
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 24, , 25]);
                return [4 /*yield*/, userStore.create(newUserA)];
            case 2:
                a = _a.sent();
                return [4 /*yield*/, userStore.create(newUserB)];
            case 3:
                b = _a.sent();
                completedOrderA.userId = a.id || 0;
                openOrderA.userId = a.id || 0;
                completedOrderB.userId = b.id || 0;
                openOrderB.userId = b.id || 0;
                i_1 = 0;
                newProducts.map(function (p) { return __awaiter(void 0, void 0, void 0, function () {
                    var prod;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, productStore.create(p)];
                            case 1:
                                prod = _b.sent();
                                newProducts[i_1].id = (_a = prod.id) !== null && _a !== void 0 ? _a : 0;
                                i_1++;
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, orderStore.create(completedOrderA)];
            case 4:
                coOrderA = _a.sent();
                return [4 /*yield*/, orderStore.create(completedOrderB)];
            case 5:
                coOrderB = _a.sent();
                return [4 /*yield*/, orderStore.create(openOrderA)];
            case 6:
                opOrderA = _a.sent();
                return [4 /*yield*/, orderStore.create(openOrderB)];
            case 7:
                opOrderB = _a.sent();
                completedOrderA.id = coOrderA.id || 0;
                completedOrderB.id = coOrderB.id || 0;
                openOrderA.id = opOrderA.id || 0;
                openOrderB.id = opOrderB.id || 0;
                // add to carts
                return [4 /*yield*/, orderStore.addProduct(8, completedOrderA.id || 0, newProducts[0].id || 0)];
            case 8:
                // add to carts
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(7, completedOrderA.id || 0, newProducts[1].id || 0)];
            case 9:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(6, completedOrderA.id || 0, newProducts[2].id || 0)];
            case 10:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(5, completedOrderA.id || 0, newProducts[3].id || 0)];
            case 11:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(4, completedOrderB.id || 0, newProducts[4].id || 0)];
            case 12:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(3, completedOrderB.id || 0, newProducts[5].id || 0)];
            case 13:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(2, completedOrderB.id || 0, newProducts[6].id || 0)];
            case 14:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(1, completedOrderB.id || 0, newProducts[7].id || 0)];
            case 15:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(8, openOrderA.id || 0, newProducts[0].id || 0)];
            case 16:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(7, openOrderA.id || 0, newProducts[1].id || 0)];
            case 17:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(6, openOrderA.id || 0, newProducts[2].id || 0)];
            case 18:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(5, openOrderA.id || 0, newProducts[3].id || 0)];
            case 19:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(4, openOrderB.id || 0, newProducts[4].id || 0)];
            case 20:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(3, openOrderB.id || 0, newProducts[5].id || 0)];
            case 21:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(2, openOrderB.id || 0, newProducts[6].id || 0)];
            case 22:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct(1, openOrderB.id || 0, newProducts[7].id || 0)];
            case 23:
                _a.sent();
                return [3 /*break*/, 25];
            case 24:
                err_1 = _a.sent();
                console.log("Error while trying to add test data: ".concat(err_1));
                return [3 /*break*/, 25];
            case 25: return [2 /*return*/];
        }
    });
}); };
addTestData();

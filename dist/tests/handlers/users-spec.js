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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var request = (0, supertest_1.default)(server_1.default);
describe('users handler', function () {
    describe('401 status code', function () {
        it('no jwt to /users should produce 401 response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/users')];
                    case 1:
                        resp = _a.sent();
                        expect(resp.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('no jwt to /users/1 should produce 401 response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/users/1')];
                    case 1:
                        resp = _a.sent();
                        expect(resp.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('no jwt to /users/1 (delete) should produce 401 response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.delete('/users/1')];
                    case 1:
                        resp = _a.sent();
                        expect(resp.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
        it('no username or password to /authenticate (post) should produce 401 response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.post('/users/authenticate')];
                    case 1:
                        resp = _a.sent();
                        expect(resp.status).toBe(401);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('400 status code', function () {
        var testJWT = process.env.TEST_JWT || '';
        it('request for not existing user should produce error status', function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/users/100')
                            .set('authorization', "Bearer ".concat(testJWT))];
                    case 1:
                        resp = _a.sent();
                        expect(resp.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('request to delete not existing user should produce error status', function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .delete('/users/100')
                            .set('authorization', "Bearer ".concat(testJWT))];
                    case 1:
                        resp = _a.sent();
                        expect(resp.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('empty post to /user should not create user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/users')
                            .send({})];
                    case 1:
                        resp = _a.sent();
                        expect(resp.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('200 status code', function () {
        var testJWT = process.env.TEST_JWT || '';
        var testUsername = process.env.TEST_USERNAME || '';
        var testPassword = process.env.TEST_PASSWORD || '';
        var newRecord = {
            firstName: 'Diego',
            lastName: 'Pérez',
            username: testUsername,
            password: testPassword
        };
        it('post to /users should create user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/users')
                            .send(newRecord)];
                    case 1:
                        resp = _a.sent();
                        token = resp.body;
                        expect(resp.status).toBe(200);
                        expect(token).toBeDefined();
                        expect(token).toBeInstanceOf(String);
                        return [2 /*return*/];
                }
            });
        }); });
        it('get to /users should return users', function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/users')
                            .set('authorization', "Bearer ".concat(testJWT))];
                    case 1:
                        resp = _a.sent();
                        arr = resp.body;
                        expect(resp.status).toBe(200);
                        expect(arr.length).toBeGreaterThanOrEqual(1);
                        expect(arr[0].username).toBe(newRecord.username);
                        return [2 /*return*/];
                }
            });
        }); });
        it('get to /users/1 should return a user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .get('/users/1')
                            .set('authorization', "Bearer ".concat(testJWT))];
                    case 1:
                        resp = _a.sent();
                        user = resp.body;
                        expect(resp.status).toBe(200);
                        expect(user.username).toBe(user.username);
                        return [2 /*return*/];
                }
            });
        }); });
        it('post to /users/authenticate should return token', function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .post('/users/authenticate')
                            .send({ username: testUsername, password: testPassword })];
                    case 1:
                        resp = _a.sent();
                        token = resp.body;
                        expect(resp.status).toBe(200);
                        expect(token).toBeDefined();
                        expect(token).toBeInstanceOf(String);
                        return [2 /*return*/];
                }
            });
        }); });
        it('delete to /users/1 should delete user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var resp, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request
                            .delete('/users/1')
                            .set('authorization', "Bearer ".concat(testJWT))];
                    case 1:
                        resp = _a.sent();
                        user = resp.body;
                        expect(resp.status).toBe(200);
                        expect(user.username).toBe(user.username);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});

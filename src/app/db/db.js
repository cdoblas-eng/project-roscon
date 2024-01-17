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
exports.__esModule = true;
exports.insertRoscon = void 0;
// import credentials from './credentials/credentials.json' ;
var credentials = require('../../assets/credentials.json');
var googleapis_1 = require("googleapis");
var products_1 = require("../products");
var utils_1 = require("./utils");
var spreadsheetId = '1t6npY-2SMi7jDKrhhi2Tatc3RNc-WmrKKn3fmMRJHhk';
// const sheetName = 'grande-nata';
// const range = `${sheetName}!B3:B`; // Rango que incluye todas las filas de la columna A (suponiendo que la tabla comienza en la columna B)
var client = new googleapis_1.google.auth.JWT(credentials.client_email, undefined, credentials.private_key, ['https://www.googleapis.com/auth/spreadsheets']);
function authorizeClient() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.authorize()];
                case 1:
                    _a.sent();
                    console.log('Cliente autorizado');
                    return [2 /*return*/];
            }
        });
    });
}
console.log("INICIO SCRIPT:");
function getLastRow(rosconType) {
    return __awaiter(this, void 0, void 0, function () {
        var sheets, sheetName, range, response, values, i, row, startOffset, lastRow, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    // Authorize the client
                    return [4 /*yield*/, authorizeClient()];
                case 1:
                    // Authorize the client
                    _a.sent();
                    sheets = googleapis_1.google.sheets({ version: 'v4', auth: client });
                    sheetName = (0, products_1.getSheetTable)(rosconType);
                    range = "".concat(sheetName, "!B3:B");
                    return [4 /*yield*/, sheets.spreadsheets.values.get({
                            spreadsheetId: spreadsheetId,
                            range: range
                        })];
                case 2:
                    response = _a.sent();
                    values = response.data.values;
                    if (values) {
                        for (i = 0; i < values.length; i++) {
                            row = values[i];
                            console.log("Row ".concat(i + 1, ": ").concat(row));
                        }
                    }
                    startOffset = 3;
                    lastRow = values ? values.length + startOffset : startOffset;
                    console.log('The next row to be filled is:', lastRow);
                    return [2 /*return*/, lastRow];
                case 3:
                    err_1 = _a.sent();
                    console.error('Error while getting the next row:', err_1);
                    return [2 /*return*/, -1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function insertRoscon(cliente, roscon) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var sheets, spreadsheetId_1, sheetName, nextRow, currentDateTime, normal, range, newRowData, request, response, err_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 4, , 5]);
                    // Autorizar el cliente
                    return [4 /*yield*/, client.authorize()];
                case 1:
                    // Autorizar el cliente
                    _d.sent();
                    sheets = googleapis_1.google.sheets({ version: 'v4', auth: client });
                    spreadsheetId_1 = '1t6npY-2SMi7jDKrhhi2Tatc3RNc-WmrKKn3fmMRJHhk';
                    sheetName = (0, products_1.getSheetTable)(roscon.type);
                    return [4 /*yield*/, getLastRow(roscon.type)];
                case 2:
                    nextRow = _d.sent();
                    currentDateTime = (0, utils_1.getCurrentDateTime)();
                    normal = roscon.type != products_1.Type.ESP;
                    range = normal ? "".concat(sheetName, "!B").concat(nextRow, ":D").concat(nextRow) : "".concat(sheetName, "!B").concat(nextRow, ":G").concat(nextRow);
                    newRowData = normal ?
                        [
                            cliente,
                            roscon.quantity,
                            currentDateTime
                        ]
                        :
                            [
                                cliente,
                                (_a = roscon.especial) === null || _a === void 0 ? void 0 : _a.size,
                                (_b = roscon.especial) === null || _b === void 0 ? void 0 : _b.fill,
                                (_c = roscon.especial) === null || _c === void 0 ? void 0 : _c.half,
                                roscon.quantity,
                                currentDateTime
                            ];
                    console.log('RANGO: ' + range);
                    request = {
                        spreadsheetId: spreadsheetId_1,
                        range: range,
                        valueInputOption: 'USER_ENTERED',
                        requestBody: {
                            values: [newRowData]
                        }
                    };
                    return [4 /*yield*/, sheets.spreadsheets.values.append(request)];
                case 3:
                    response = _d.sent();
                    // Imprimir la respuesta en la consola
                    console.log('Fila insertada con éxito:', response.data);
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _d.sent();
                    console.error('Error al insertar fila:', err_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.insertRoscon = insertRoscon;
// insertRoscon("FANTASMA DE INDRA", {
//   type: Type.GR_NATA,
//   quantity: 2,
//   price: 20,
//   especial: null,
// });
// insertRoscon("ADRI", {
//   type: Type.ESP,
//   quantity: 1,
//   price: 18,
//   especial:{
//     size: Size.GR,
//     fill: Fill.MERENGUE,
//     half: Fill.CAFE
//   } ,
// });
// async function readIndex() {
//     let datos: any;
//     try {   
//         // Autorizar el cliente
//         await client.authorize();
//         // Crear instancia del servicio de hojas de cálculo de Google
//         const sheets = google.sheets({ version: 'v4', auth: client });
//         // ID de la hoja de cálculo y rango de celdas a leer
//         // Leer datos de la hoja de cálculo
//         const response = await sheets.spreadsheets.values.get({
//         spreadsheetId: spreadsheetId,
//         range: range,
//         });
//         // Obtener los datos leídos
//         const datos = response.data.values;
//         // Imprimir los datos en la consola
//         console.log('Datos leídos de la hoja de cálculo:', datos);
//     } catch (err) {
//         console.error('Error al leer datos de la hoja de cálculo:', err);
//     }
//     console.log('Indice leido: ' + datos.toString());
// }
// readIndex();
// // Función para leer datos de una hoja de cálculo
// async function leerDatos() {
//   try {
//     // Autorizar el cliente
//     //await client.authorize();
//     client.authorize(function (err) {
//       if (err) {
//         console.error('Error de autenticación:', err);
//         return;
//       }
//       console.log('Autenticación exitosa!');
//       // Tu código para acceder a la API de Google Sheets aquí
//     });
//     // Crear instancia del servicio de hojas de cálculo de Google
//     const sheets = google.sheets({ version: 'v4', auth: client });
//     // ID de la hoja de cálculo y rango de celdas a leer
//     const spreadsheetId = '1t6npY-2SMi7jDKrhhi2Tatc3RNc-WmrKKn3fmMRJHhk';
//     const range = 'grande-nata!B3:D10';
//     // Leer datos de la hoja de cálculo
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: spreadsheetId,
//       range: range,
//     });
//     // Obtener los datos leídos
//     const datos = response.data.values;
//     // Imprimir los datos en la consola
//     console.log('Datos leídos de la hoja de cálculo:', datos);
//   } catch (err) {
//     console.error('Error al leer datos de la hoja de cálculo:', err);
//   }
// }
// Llamar a la función para probar el acceso a la hoja de cálculo
//leerDatos();
// Función para insertar una fila en la hoja de cálculo
// async function insertarFila() {
//   try {
//     // Autorizar el cliente
//     await client.authorize();
//     // Crear instancia del servicio de hojas de cálculo de Google
//     const sheets = google.sheets({ version: 'v4', auth: client });
//     // ID de la hoja de cálculo y rango de celdas donde insertar la fila
//     const spreadsheetId = '1t6npY-2SMi7jDKrhhi2Tatc3RNc-WmrKKn3fmMRJHhk';
//     const sheetName = 'grande-nata';
//     const range = `${sheetName}!B10:C10`; // Rango de la fila siguiente a insertar
//     // Datos de la nueva fila a insertar
//     //const newRowData = ["645424785", "",'Enano Alcoholico']; // Reemplaza con tus propios datos
//     const newRowData = [645424785, 3]; // Reemplaza con tus propios datos
//     // Configurar la solicitud de inserción de la fila
//     const request: sheets_v4.Params$Resource$Spreadsheets$Values$Append = {
//       spreadsheetId: spreadsheetId,
//       range: range,
//       valueInputOption: 'RAW',
//       insertDataOption: 'INSERT_ROWS',
//       requestBody: {
//         values: [newRowData],
//       },
//     };
//     // Insertar la nueva fila
//     const response = await sheets.spreadsheets.values.append(request);
//     // Imprimir la respuesta en la consola
//     console.log('Fila insertada con éxito:', response.data);
//   } catch (err) {
//     console.error('Error al insertar fila:', err);
//   }
// }
// // Llamar a la función para insertar una fila en la hoja de cálculo
// insertarFila();

"use strict";
exports.__esModule = true;
exports.getSheetTable = exports.products = exports.Fill = exports.Size = exports.Type = void 0;
var Type;
(function (Type) {
    Type["GR_NATA"] = "GRANDE NATA";
    Type["GR_SIN"] = "GRANDE SIN RELLENO";
    Type["PEQ_NATA"] = "PEQUE\u00D1O NATA";
    Type["PEQ_SIN"] = "PEQUE\u00D1O SIN RELLENO";
    Type["ESP"] = "ESPECIAL";
})(Type = exports.Type || (exports.Type = {}));
var Size;
(function (Size) {
    Size["GR"] = "GRANDE";
    Size["MED"] = "MEDIANO";
    Size["PEQ"] = "PEQUE\u00D1O";
})(Size = exports.Size || (exports.Size = {}));
var Fill;
(function (Fill) {
    Fill["NATA"] = "NATA";
    Fill["MOCA"] = "MOCA";
    Fill["MERENGUE"] = "MERENGUE";
    Fill["CREMA"] = "CREMA";
    Fill["CAFE"] = "CAFE";
    Fill["EMPTY"] = "SIN RELLENO";
})(Fill = exports.Fill || (exports.Fill = {}));
exports.products = [
    {
        type: Type.GR_NATA,
        quantity: 1,
        price: 18,
        // notes: null,
        especial: null
    },
    {
        type: Type.GR_SIN,
        quantity: 1,
        price: 16,
        // notes: null,
        especial: null
    },
    {
        type: Type.PEQ_NATA,
        quantity: 1,
        price: 14,
        // notes: null,
        especial: null
    },
    {
        type: Type.PEQ_SIN,
        quantity: 1,
        price: 12,
        // notes: null,
        especial: null
    },
];
function getSheetTable(rosconType) {
    switch (rosconType) {
        case Type.GR_NATA:
            return 'grande-nata';
        case Type.GR_SIN:
            return 'grande-sin';
        case Type.PEQ_NATA:
            return 'pequeno-nata';
        case Type.PEQ_SIN:
            return 'pequeno-sin';
        default:
            return 'especiales';
    }
}
exports.getSheetTable = getSheetTable;
/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

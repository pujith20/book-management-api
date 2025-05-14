"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importCSV = void 0;
const fs_1 = __importDefault(require("fs"));
const bookService = __importStar(require("../services/bookService"));
const importCSV = (req, res) => {
    const file = req.file;
    if (!file)
        return res.status(400).json({ message: 'CSV file is required' });
    const data = fs_1.default.readFileSync(file.path, 'utf-8');
    const lines = data.trim().split('\n');
    const rows = lines.map((line, idx) => {
        const [title, author, publishedYearStr] = line.split(',');
        const publishedYear = Number(publishedYearStr);
        return { title: title === null || title === void 0 ? void 0 : title.trim(), author: author === null || author === void 0 ? void 0 : author.trim(), publishedYear };
    });
    const result = bookService.importBooks(rows);
    res.json({ addedBooksCount: result.added, errorRows: result.errors });
};
exports.importCSV = importCSV;

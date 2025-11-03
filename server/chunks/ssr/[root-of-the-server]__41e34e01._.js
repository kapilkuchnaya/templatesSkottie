module.exports = {

"[externals]/fs/promises [external] (fs/promises, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[project]/src/lib/data.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "getTemplates": (()=>getTemplates),
    "getTemplatesDb": (()=>getTemplatesDb),
    "getTemplatesDbNew": (()=>getTemplatesDbNew)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
// This file is intended for server-side data fetching.
// For client-side, see data-client.ts
async function getTemplatesFromDb(db) {
    const fileMap = {
        'main': 'templates.json',
        'db': 'template2-db.json',
        'db-new': 'template2-db-new.json'
    };
    const fileName = fileMap[db] || 'templates.json';
    const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'src', 'lib', 'data', fileName);
    try {
        const jsonData = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(filePath, 'utf-8');
        if (!jsonData || jsonData.trim() === '') return [];
        const data = JSON.parse(jsonData);
        if (typeof data !== 'object' || data === null || Array.isArray(data)) {
            console.error(`Error: ${fileName} is not a category-grouped object.`);
            return [];
        }
        return Object.values(data).flat();
    } catch (error) {
        if (error.code === 'ENOENT') {
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, JSON.stringify({}, null, 2), 'utf-8');
            return [];
        }
        console.error(`Error reading or parsing ${fileName}:`, error);
        return [];
    }
}
async function getTemplates() {
    return getTemplatesFromDb('main');
}
async function getTemplatesDb() {
    return getTemplatesFromDb('db');
}
async function getTemplatesDbNew() {
    return getTemplatesFromDb('db-new');
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__41e34e01._.js.map
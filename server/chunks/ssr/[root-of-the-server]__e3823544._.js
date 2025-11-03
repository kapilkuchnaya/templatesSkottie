module.exports = {

"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:crypto [external] (node:crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}}),
"[externals]/node:util [external] (node:util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}}),
"[project]/src/lib/auth.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "createSession": (()=>createSession),
    "decrypt": (()=>decrypt),
    "deleteSession": (()=>deleteSession),
    "encrypt": (()=>encrypt),
    "getSession": (()=>getSession)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/node/esm/jwt/sign.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/node/esm/jwt/verify.js [app-rsc] (ecmascript)");
;
;
const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);
async function encrypt(payload) {
    return await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SignJWT"](payload).setProtectedHeader({
        alg: 'HS256'
    }).setIssuedAt().setExpirationTime('1d').sign(key);
}
async function decrypt(input) {
    try {
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$verify$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jwtVerify"])(input, key, {
            algorithms: [
                'HS256'
            ]
        });
        return payload;
    } catch (error) {
        return null;
    }
}
async function createSession(userId) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    ;
    const session = await encrypt({
        userId,
        expires
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])().set('session', session, {
        expires,
        httpOnly: true
    });
}
async function getSession() {
    const sessionCookie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])().get('session')?.value;
    if (!sessionCookie) return null;
    const session = await decrypt(sessionCookie);
    if (!session) return null;
    if (new Date(session.expires) < new Date()) {
        return null;
    }
    return session;
}
async function deleteSession() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])().set('session', '', {
        expires: new Date(0)
    });
}
}}),
"[externals]/fs/promises [external] (fs/promises, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}}),
"[project]/src/lib/actions.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"009fb872ef6e593b70b3a3e1d2dd02a82287c7f66b":"logout","400c23683a4388243db1212c4219d6919d16a47721":"deleteTemplateDb","402fef81be1e05b089fcf2724e9d6723fa7b2d1cb5":"deleteTemplateDbNew","40a242b78bf3c308840471631b905412891b158634":"deleteTemplate","40bcf7d9e14908faffc1bfaf07afa9111107777633":"saveTemplatesDbNew","603adedf048c24623454e943645362eddde2f135ee":"uploadTemplateDb","6059cd153796468d4bad3be1f043ef279fceec49c0":"toggleTemplateMultiStatus","6059e4f1496a9481b31c3ad060eaa7f91841e9a4cf":"toggleTemplateMultiStatusDbNew","605dac353029d896248a2387509fc33466ac8b9125":"uploadTemplateDbNew","605ebdba1a157410461afe12ff28c7292394bb03d6":"toggleTemplateProStatus","6074138201d2fd2df7a178250d8044fa432a8ffa5d":"toggleTemplateMultiStatusDb","60922b336b8354a99e49216e2c19945e6c44dbe7c1":"authenticate","6097edc0931a576ff840ad641a0eb2933653aa7d38":"toggleTemplateProStatusDb","60cbb3701b3d531f83a4757a0a2a05ce853bb511fe":"uploadTemplate","60fb1981cb8b0185466fc1832b1ceef1b3165fc26f":"toggleTemplateProStatusDbNew"},"",""] */ __turbopack_context__.s({
    "authenticate": (()=>authenticate),
    "deleteTemplate": (()=>deleteTemplate),
    "deleteTemplateDb": (()=>deleteTemplateDb),
    "deleteTemplateDbNew": (()=>deleteTemplateDbNew),
    "logout": (()=>logout),
    "saveTemplatesDbNew": (()=>saveTemplatesDbNew),
    "toggleTemplateMultiStatus": (()=>toggleTemplateMultiStatus),
    "toggleTemplateMultiStatusDb": (()=>toggleTemplateMultiStatusDb),
    "toggleTemplateMultiStatusDbNew": (()=>toggleTemplateMultiStatusDbNew),
    "toggleTemplateProStatus": (()=>toggleTemplateProStatus),
    "toggleTemplateProStatusDb": (()=>toggleTemplateProStatusDb),
    "toggleTemplateProStatusDbNew": (()=>toggleTemplateProStatusDbNew),
    "uploadTemplate": (()=>uploadTemplate),
    "uploadTemplateDb": (()=>uploadTemplateDb),
    "uploadTemplateDbNew": (()=>uploadTemplateDbNew)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
async function authenticate(prevState, formData) {
    try {
        const email = formData.get("email");
        const password = formData.get("password");
        if (email !== process.env.ADMIN_EMAIL) {
            return {
                error: "Invalid email address."
            };
        }
        if (password !== process.env.ADMIN_PASSWORD) {
            return {
                error: "Invalid password."
            };
        }
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createSession"])(email);
    } catch (error) {
        if (error.message.includes("CredentialsSignin")) {
            return {
                error: "Invalid credentials."
            };
        }
        return {
            error: "Something went wrong."
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/admin");
}
async function logout() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteSession"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/");
}
async function getFilePath(db) {
    const fileMap = {
        'main': 'templates.json',
        'db': 'template2-db.json',
        'db-new': 'template2-db-new.json'
    };
    const fileName = fileMap[db] || 'templates.json';
    return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'src', 'lib', 'data', fileName);
}
async function readTemplatesFromFile(db) {
    const filePath = await getFilePath(db);
    try {
        const currentData = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(filePath, 'utf-8');
        if (!currentData.trim()) return {};
        const templates = JSON.parse(currentData);
        return typeof templates === 'object' && templates !== null && !Array.isArray(templates) ? templates : {};
    } catch (e) {
        return {};
    }
}
async function writeTemplatesToFile(db, templates) {
    const filePath = await getFilePath(db);
    const content = typeof templates === 'string' ? templates : JSON.stringify(templates, null, 2);
    await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(filePath, content, 'utf-8');
}
async function handleTemplateUpload(formData, db) {
    const file = formData.get("templateFile");
    let jsonContent = formData.get("templateJson");
    let newTemplateContent;
    if (file && file.size > 0) {
        if (file.type !== "application/json") {
            return {
                error: "Invalid file type. Please upload a JSON file."
            };
        }
        newTemplateContent = await file.text();
    } else if (jsonContent) {
        newTemplateContent = jsonContent;
    } else {
        return {
            error: "Please select a file or paste JSON content to upload."
        };
    }
    if (!newTemplateContent) {
        return {
            error: "No template content found."
        };
    }
    try {
        let sanitizedContent = newTemplateContent.trim();
        const parsedData = JSON.parse(sanitizedContent);
        const templatesToProcess = Array.isArray(parsedData) ? parsedData : [
            parsedData
        ];
        const templates = await readTemplatesFromFile(db);
        let templatesAddedCount = 0;
        for (const newTemplate of templatesToProcess){
            if (!newTemplate.category || !Array.isArray(newTemplate.category) || newTemplate.category.length === 0) {
                if (templatesToProcess.length > 1) continue;
                return {
                    error: "Each template must have a 'category' array with at least one category."
                };
            }
            const primaryCategory = newTemplate.category[0];
            const uniqueId = newTemplate.id || newTemplate.templateId || Math.random().toString(36).substring(2, 15);
            const templateWithId = {
                ...newTemplate,
                id: uniqueId,
                templateId: uniqueId
            };
            if (!templates[primaryCategory]) {
                templates[primaryCategory] = [];
            }
            templates[primaryCategory].unshift(templateWithId);
            templatesAddedCount++;
        }
        await writeTemplatesToFile(db, templates);
        const revalidationPath = db === 'main' ? "/admin" : `/admin/templates-${db}`;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(revalidationPath);
        return {
            message: `${templatesAddedCount} template(s) uploaded successfully!`
        };
    } catch (error) {
        console.error(error);
        if (error instanceof SyntaxError) {
            return {
                error: "Invalid JSON format in the uploaded file or text."
            };
        }
        return {
            error: "An unexpected error occurred while uploading the template."
        };
    }
}
async function handleToggleProStatus(originalId, currentStatus, db) {
    try {
        const templatesByCat = await readTemplatesFromFile(db);
        let found = false;
        for(const category in templatesByCat){
            const templateIndex = templatesByCat[category].findIndex((t)=>t.id === originalId || t.templateId === originalId);
            if (templateIndex !== -1) {
                templatesByCat[category][templateIndex].pro = !currentStatus;
                found = true;
                break;
            }
        }
        if (!found) return {
            error: "Template not found."
        };
        await writeTemplatesToFile(db, templatesByCat);
        const revalidationPath = db === 'main' ? "/admin" : `/admin/templates-${db}`;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(revalidationPath);
        return {
            message: `Template status changed successfully.`
        };
    } catch (error) {
        console.error(error);
        return {
            error: "Failed to update template status."
        };
    }
}
async function handleToggleMultiStatus(originalId, currentStatus, db) {
    try {
        const templatesByCat = await readTemplatesFromFile(db);
        let found = false;
        for(const category in templatesByCat){
            const templateIndex = templatesByCat[category].findIndex((t)=>t.id === originalId || t.templateId === originalId);
            if (templateIndex !== -1) {
                templatesByCat[category][templateIndex].isMultipleTemplate = !currentStatus;
                found = true;
                break;
            }
        }
        if (!found) return {
            error: "Template not found."
        };
        await writeTemplatesToFile(db, templatesByCat);
        const revalidationPath = db === 'main' ? "/admin" : `/admin/templates-${db}`;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(revalidationPath);
        return {
            message: `Template multiple status changed successfully.`
        };
    } catch (error) {
        console.error(error);
        return {
            error: "Failed to update template multiple status."
        };
    }
}
async function handleDeleteTemplate(originalId, db) {
    try {
        const templatesByCat = await readTemplatesFromFile(db);
        let foundAndDeleted = false;
        for(const category in templatesByCat){
            const initialLength = templatesByCat[category].length;
            templatesByCat[category] = templatesByCat[category].filter((t)=>t.id !== originalId && t.templateId !== originalId);
            if (templatesByCat[category].length < initialLength) {
                foundAndDeleted = true;
                if (templatesByCat[category].length === 0) {
                    delete templatesByCat[category];
                }
                break;
            }
        }
        if (!foundAndDeleted) return {
            error: "Template not found to delete."
        };
        await writeTemplatesToFile(db, templatesByCat);
        const revalidationPath = db === 'main' ? "/admin" : `/admin/templates-${db}`;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])(revalidationPath);
        return {
            message: "Template deleted successfully."
        };
    } catch (error) {
        console.error(error);
        return {
            error: "Failed to delete template."
        };
    }
}
async function uploadTemplate(prevState, formData) {
    return handleTemplateUpload(formData, 'main');
}
async function toggleTemplateProStatus(originalId, currentStatus) {
    return handleToggleProStatus(originalId, currentStatus, 'main');
}
async function toggleTemplateMultiStatus(originalId, currentStatus) {
    return handleToggleMultiStatus(originalId, currentStatus, 'main');
}
async function deleteTemplate(originalId) {
    return handleDeleteTemplate(originalId, 'main');
}
async function uploadTemplateDb(prevState, formData) {
    return handleTemplateUpload(formData, 'db');
}
async function toggleTemplateProStatusDb(originalId, currentStatus) {
    return handleToggleProStatus(originalId, currentStatus, 'db');
}
async function toggleTemplateMultiStatusDb(originalId, currentStatus) {
    return handleToggleMultiStatus(originalId, currentStatus, 'db');
}
async function deleteTemplateDb(originalId) {
    return handleDeleteTemplate(originalId, 'db');
}
async function uploadTemplateDbNew(prevState, formData) {
    return handleTemplateUpload(formData, 'db-new');
}
async function toggleTemplateProStatusDbNew(originalId, currentStatus) {
    return handleToggleProStatus(originalId, currentStatus, 'db-new');
}
async function toggleTemplateMultiStatusDbNew(originalId, currentStatus) {
    return handleToggleMultiStatus(originalId, currentStatus, 'db-new');
}
async function deleteTemplateDbNew(originalId) {
    return handleDeleteTemplate(originalId, 'db-new');
}
async function saveTemplatesDbNew(jsonContent) {
    try {
        JSON.parse(jsonContent);
        await writeTemplatesToFile('db-new', jsonContent);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/templates-db-new');
        return {
            message: "Templates saved successfully."
        };
    } catch (error) {
        console.error(error);
        if (error instanceof SyntaxError) {
            return {
                error: "Invalid JSON format."
            };
        }
        return {
            error: "Failed to save templates."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    authenticate,
    logout,
    uploadTemplate,
    toggleTemplateProStatus,
    toggleTemplateMultiStatus,
    deleteTemplate,
    uploadTemplateDb,
    toggleTemplateProStatusDb,
    toggleTemplateMultiStatusDb,
    deleteTemplateDb,
    uploadTemplateDbNew,
    toggleTemplateProStatusDbNew,
    toggleTemplateMultiStatusDbNew,
    deleteTemplateDbNew,
    saveTemplatesDbNew
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(authenticate, "60922b336b8354a99e49216e2c19945e6c44dbe7c1", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logout, "009fb872ef6e593b70b3a3e1d2dd02a82287c7f66b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(uploadTemplate, "60cbb3701b3d531f83a4757a0a2a05ce853bb511fe", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleTemplateProStatus, "605ebdba1a157410461afe12ff28c7292394bb03d6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleTemplateMultiStatus, "6059cd153796468d4bad3be1f043ef279fceec49c0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTemplate, "40a242b78bf3c308840471631b905412891b158634", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(uploadTemplateDb, "603adedf048c24623454e943645362eddde2f135ee", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleTemplateProStatusDb, "6097edc0931a576ff840ad641a0eb2933653aa7d38", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleTemplateMultiStatusDb, "6074138201d2fd2df7a178250d8044fa432a8ffa5d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTemplateDb, "400c23683a4388243db1212c4219d6919d16a47721", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(uploadTemplateDbNew, "605dac353029d896248a2387509fc33466ac8b9125", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleTemplateProStatusDbNew, "60fb1981cb8b0185466fc1832b1ceef1b3165fc26f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleTemplateMultiStatusDbNew, "6059e4f1496a9481b31c3ad060eaa7f91841e9a4cf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteTemplateDbNew, "402fef81be1e05b089fcf2724e9d6723fa7b2d1cb5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveTemplatesDbNew, "40bcf7d9e14908faffc1bfaf07afa9111107777633", null);
}}),
"[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
}}),
"[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "009fb872ef6e593b70b3a3e1d2dd02a82287c7f66b": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"]),
    "603adedf048c24623454e943645362eddde2f135ee": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uploadTemplateDb"]),
    "605dac353029d896248a2387509fc33466ac8b9125": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uploadTemplateDbNew"]),
    "60cbb3701b3d531f83a4757a0a2a05ce853bb511fe": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uploadTemplate"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "009fb872ef6e593b70b3a3e1d2dd02a82287c7f66b": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["009fb872ef6e593b70b3a3e1d2dd02a82287c7f66b"]),
    "603adedf048c24623454e943645362eddde2f135ee": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["603adedf048c24623454e943645362eddde2f135ee"]),
    "605dac353029d896248a2387509fc33466ac8b9125": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["605dac353029d896248a2387509fc33466ac8b9125"]),
    "60cbb3701b3d531f83a4757a0a2a05ce853bb511fe": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["60cbb3701b3d531f83a4757a0a2a05ce853bb511fe"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <exports>');
}}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/components/templates/template-grid-page.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "TemplateGridPage": (()=>TemplateGridPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const TemplateGridPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call TemplateGridPage() from the server but TemplateGridPage is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/templates/template-grid-page.tsx <module evaluation>", "TemplateGridPage");
}}),
"[project]/src/components/templates/template-grid-page.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "TemplateGridPage": (()=>TemplateGridPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const TemplateGridPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call TemplateGridPage() from the server but TemplateGridPage is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/templates/template-grid-page.tsx", "TemplateGridPage");
}}),
"[project]/src/components/templates/template-grid-page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$templates$2f$template$2d$grid$2d$page$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/templates/template-grid-page.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$templates$2f$template$2d$grid$2d$page$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/components/templates/template-grid-page.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$templates$2f$template$2d$grid$2d$page$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/lib/data.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/src/app/admin/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>AdminPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$templates$2f$template$2d$grid$2d$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/templates/template-grid-page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-rsc] (ecmascript)");
;
;
;
async function AdminPage() {
    const templates = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getTemplates"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$templates$2f$template$2d$grid$2d$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TemplateGridPage"], {
        initialTemplates: templates,
        db: "main"
    }, void 0, false, {
        fileName: "[project]/src/app/admin/page.tsx",
        lineNumber: 6,
        columnNumber: 12
    }, this);
}
}}),
"[project]/src/app/admin/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/admin/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__e3823544._.js.map
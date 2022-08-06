"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const axios_1 = require("axios");
function activate(context) {
    const disposable = vscode.commands.registerCommand("extension.mikasa.search", async function () {
        // Get the active text editor
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            // Get the word within the selection
            const word = document.getText(selection);
            const res = await axios_1.default
                .post("http://192.168.1.39:5000/search", word, {
                headers: {
                    "Content-Type": "text/plain",
                },
            })
                .catch((err) => console.error(err));
            editor.edit((editBuilder) => {
                editBuilder.replace(selection, res?.data || "Not found :(");
            });
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map
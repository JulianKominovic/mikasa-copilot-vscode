import * as vscode from "vscode";
import axios from "axios";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "extension.mikasa.search",
    async function () {
      // Get the active text editor
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        // Get the word within the selection
        const word = document.getText(selection);

        const res = await axios
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
    }
  );

  context.subscriptions.push(disposable);
}

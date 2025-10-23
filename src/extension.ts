import * as vscode from 'vscode';
export function activate(ctx: vscode.ExtensionContext) {
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  ctx.subscriptions.push(
    item,
    vscode.window.onDidChangeTextEditorSelection(update),
    vscode.window.onDidChangeActiveTextEditor(update)
  );
  update();
  function update() {
    const e = vscode.window.activeTextEditor;
    if (!e) {
      item.hide();
      return;
    }
    const enc = new TextEncoder();
    const end = enc.encode(e.document.getText()).length;
    const offset = enc.encode(
      e.document.getText(new vscode.Range(new vscode.Position(0, 0), e.selection.active))
    ).length;
    item.text = `${offset} / ${end} B`;
    item.show();
  }
}

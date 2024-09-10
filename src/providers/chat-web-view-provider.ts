import * as vscode from "vscode";

type Role = "function" | "user" | "model";

export interface IHistory {
  role: Role;
  parts: { text: string }[];
}

export let _view: vscode.WebviewView | undefined;
/**
 * @deprecated This module is deprecated and will be removed in a future version.
 * Please use the new module instead: {@link NewModule}
 */

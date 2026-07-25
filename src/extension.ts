import * as vscode from 'vscode';

const FIND_FILE_PATTERN = '**/.gitignore';
const FILE_WATCHER_PATTERN = '**/.gitignore';
const HIDE_COMMAND = 'gitignoredFiles.hide';
const SHOW_COMMAND = 'gitignoredFiles.show';
const EXCLUDE_GIT_IGNORE = 'explorer.excludeGitIgnore';
const IS_EXCLUDED_CONTEXT = 'gitignoredFiles:isExcluded';
const IS_FOUND_CONTEXT = 'gitignoredFiles:isGitignoreFound';

let statusBarItem: vscode.StatusBarItem;

function isGitIgnoredExcluded(): boolean {
  return vscode.workspace.getConfiguration().get<boolean>(EXCLUDE_GIT_IGNORE, false);
}

async function hasGitIgnoreFile(): Promise<boolean> {
  const gitIgnoreFiles = await vscode.workspace.findFiles(FIND_FILE_PATTERN);
  return gitIgnoreFiles.length > 0;
}

function renderStatusBar(excluded: boolean): void {
  if (excluded) {
    statusBarItem.text = '$(eye-closed) .gitIgnore';
    statusBarItem.tooltip = '.gitIgnored files are hidden';
    statusBarItem.command = SHOW_COMMAND;
  } else {
    statusBarItem.text = '$(eye) .gitIgnore';
    statusBarItem.tooltip = '.gitIgnored files are visible';
    statusBarItem.command = HIDE_COMMAND;
  }
}

async function renderFromSetting(): Promise<void> {
  const excluded = isGitIgnoredExcluded();
  await vscode.commands.executeCommand('setContext', IS_EXCLUDED_CONTEXT, excluded);
  renderStatusBar(excluded);
}

async function renderGitIgnorePresence(): Promise<void> {
  const found = await hasGitIgnoreFile();
  await vscode.commands.executeCommand('setContext', IS_FOUND_CONTEXT, found);
  if (found) {
    statusBarItem.show();
  } else {
    statusBarItem.hide();
  }
}

async function toggleGitIgnored(): Promise<void> {
  const excluded = isGitIgnoredExcluded();
  await vscode.workspace.getConfiguration().update(EXCLUDE_GIT_IGNORE, !excluded, vscode.ConfigurationTarget.Workspace);
  await renderFromSetting();
}

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
  context.subscriptions.push(statusBarItem);

  context.subscriptions.push(vscode.commands.registerCommand(HIDE_COMMAND, toggleGitIgnored));
  context.subscriptions.push(vscode.commands.registerCommand(SHOW_COMMAND, toggleGitIgnored));

  const fileWatcher = vscode.workspace.createFileSystemWatcher(FILE_WATCHER_PATTERN, false, true, false);
  context.subscriptions.push(fileWatcher);
  context.subscriptions.push(fileWatcher.onDidCreate(() => renderGitIgnorePresence()));
  context.subscriptions.push(fileWatcher.onDidDelete(() => renderGitIgnorePresence()));

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(async (event) => {
      if (event.affectsConfiguration(EXCLUDE_GIT_IGNORE)) {
        await renderFromSetting();
      }
    }),
  );

  await renderFromSetting();
  await renderGitIgnorePresence();
}

export function deactivate() {
  // No-op.
}

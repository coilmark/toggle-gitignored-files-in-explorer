# Toggle Gitignored Files in Explorer

[![Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/coilmark.toggle-gitignored-files-in-explorer)](https://marketplace.visualstudio.com/items?itemName=coilmark.toggle-gitignored-files-in-explorer)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/coilmark.toggle-gitignored-files-in-explorer)](https://marketplace.visualstudio.com/items?itemName=coilmark.toggle-gitignored-files-in-explorer)
[![CI](https://github.com/coilmark/toggle-gitignored-files-in-explorer/actions/workflows/ci.yml/badge.svg)](https://github.com/coilmark/toggle-gitignored-files-in-explorer/actions/workflows/ci.yml)

Show or hide gitignored files in the VS Code Explorer with one click.

VS Code 1.68 added the `explorer.excludeGitIgnore` setting, which hides files matched by `.gitignore` from the Explorer. It works well, but turning it on and off means digging through Settings. This extension adds a status bar toggle and Explorer context menu entries for it.

## Features

- **Status bar toggle**: a `.gitIgnore` item with an eye icon shows whether gitignored files are visible (eye) or hidden (eye-closed). Click it to switch.
- **Explorer context menu**: right-click in the Explorer to pick _Show Gitignored Files_ or _Hide Gitignored Files_.
- **Command Palette**: run either command by name.
- **Stays in sync**: if you change `explorer.excludeGitIgnore` by hand, the status bar and menus update to match.
- **Only appears where it applies**: the toggle is shown only when the workspace has a `.gitignore` file, and it reacts when one is added or deleted.

## Usage

| Command               | ID                     | Effect                                      |
| --------------------- | ---------------------- | ------------------------------------------- |
| Show Gitignored Files | `gitignoredFiles.show` | Sets `explorer.excludeGitIgnore` to `false` |
| Hide Gitignored Files | `gitignoredFiles.hide` | Sets `explorer.excludeGitIgnore` to `true`  |

> **Note:** The setting is written at **workspace** scope, so toggling updates `.vscode/settings.json`. If that file is under version control, you may want to commit the setting, or keep `.vscode/settings.json` out of the repo.

### Keyboard shortcuts

No default keybinding is included (the original one clashed with **Toggle Developer Tools** on Windows/Linux). To add your own, open **Preferences: Open Keyboard Shortcuts** (`Ctrl+K Ctrl+S` / `Cmd+K Cmd+S`), search for `gitignoredFiles`, and assign keys to the show and hide commands.

## Requirements

VS Code 1.68 or newer.

## Upgrading from "Hide Git Ignored (Revived)"

v0.2.0 renamed the extension and published it under a new ID, `coilmark.toggle-gitignored-files-in-explorer`. Uninstall the old extension, install this one, and rebind any custom shortcuts to the new command IDs (`gitignoredFiles.show` / `gitignoredFiles.hide`). See the [CHANGELOG](CHANGELOG.md).

## About this fork

This is a maintained fork of [Hide Git Ignored](https://github.com/ChrisBibby/vscode_hide-git-ignored) by Chris Bibby, which was archived in 2022 and removed from the Marketplace. All credit for the original extension goes to Chris; this fork adds bug fixes and updated tooling.

## Development

```bash
npm ci
npm run watch      # rebuild on change; press F5 to launch the Extension Development Host
npm run lint
npm run package    # build a .vsix
```

## License & attribution

[MIT](LICENSE.md). Icon derived from [Codicons](https://github.com/microsoft/vscode-codicons) by Microsoft, licensed CC BY 4.0.

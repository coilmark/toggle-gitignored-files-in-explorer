# Hide Git Ignored README

## About this fork

This is a maintained fork of [Hide Git Ignored](https://github.com/ChrisBibby/vscode_hide-git-ignored) by Chris Bibby, whose original project was archived in 2022 and delisted from the VS Code Marketplace. Full credit for the original extension goes to Chris Bibby; this fork revives it under the `coilmark` publisher with bug fixes and updated tooling.

This VSCode extension adds additional functionality to the .gitignore setting added to VSCode [v1.68](https://code.visualstudio.com/updates/v1_68#_hide-files-in-explorer-based-on-gitignore) (May 2022) which provided the option of hiding of files that are excluded in a `.gitignore` file from the explorer view.


## Features
- Context menu to show / hide 
- Status bar to indicate current setting

## How to use

| Action                            | Command Palette         |
| --------------------------------- | ----------------------- |
| Show files excluded in .gitignore | Show Git Ignored Files  |
| Hide files excluded in .gitignore | Hide Git Ignored Files  |

You can also toggle via the `.gitIgnore` status bar item (shown when the workspace contains a `.gitignore` file) or the Explorer context menu.

### Key bindings

This extension ships no default keybinding (the one in the original collided with **Toggle Developer Tools** on Windows/Linux). To bind your own keys, open **Preferences: Open Keyboard Shortcuts** (`Ctrl+K Ctrl+S` / `Cmd+K Cmd+S`), search for `hide-git-ignored.hide` and `hide-git-ignored.show`, and assign a key to each command.

## Attribution

Icon derived from [Codicons](https://github.com/microsoft/vscode-codicons) by Microsoft, licensed CC BY 4.0.

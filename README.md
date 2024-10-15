# obs-plugin-template-tasks README

This extension provides Command support for tasks defined in a obs plugin template project.

## Features

Exposes specific tasks, like `PlugTemp: Testing`, `PlugTemp: Archive` and `PlugTemp: Build Installer` as Commands in the Command Palette.

## Requirements

None

## Extension Settings

This extension contributes the following settings:

* `plugtemp.testing`: Performs CMake install using --prefix CMAKE_INSTALL_PREFIX.
* `plugtemp.archive`: Runs CMake install to `${workspaceFolder}\release\${Configuration}` and creates a zip archive of its contents which can be found in the `release` folder.
* `plugtemp.build-installer`: Runs CMake install to `${workspaceFolder}\release\${Configuration}` and creates an Inno Setup installer of its contents which can be found in the `release` folder.

## Known Issues

None so far.

## Release Notes

10/15/2024(0.5.2): Fixed bug when trying to execute commands in an empty vscode instance(no workspace or folder open). Added support for running in untrusted workspaces.
10/15/2024(0.5.1): Added LICENSE, Added repository to package.json, Removed switches for skipping license and missing repository properties.
10/15/2024(0.5.0): Added the powershell script that does everything, Copy it to `build-aux` if needed and added 3 new commands: `plugtemp.testing`, `plugtemp.archive`, `plugtemp.build-installer`. Removed `plugtemp.helloWorld`
10/14/2024(0.0.1): Adds a test command that runs a targeted task from .vscode/tasks.json
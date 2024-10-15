# Change Log

All notable changes to the "obs-plugin-template-tasks" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.1] - 10/14/2024

### Added

 - Added a test command that runs a targeted task from .vscode/tasks.json

## [0.5.0] - 10/15/2024

### Added

 - Added Install-Windows.ps1 script which handles everything.
 - Copying of the powershell script to `build-aux` if needed.
 - 3 new commands: `plugtemp.testing`, `plugtemp.archive`, `plugtemp.build-installer`.

### Removed

 - Removed `plugtemp.helloWorld`

## [0.5.1] - 10/15/2024

### Added

 - Added LICENSE
 - Added repository to package.json

### Removed
 - Removed switches for skipping license and missing repository properties.

## [0.5.2] - 10/15/2024

### Added

 - Added support for running in untrusted workspaces.

### Fixed

 - Fixed bug when trying to execute commands in an empty vscode instance(no workspace or folder open).
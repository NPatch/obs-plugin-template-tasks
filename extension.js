const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const copyScriptIfNeeded = (extensionPath, workspaceFolder, scriptName, targetFolder) => 
{
    const sourcePath = path.join(extensionPath, 'scripts', scriptName);
    const targetPath = path.join(workspaceFolder, targetFolder, scriptName);

    if (!fs.existsSync(targetPath)) {
        if (!fs.existsSync(path.dirname(targetPath))) {
            fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        }
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${scriptName} to ${targetFolder}`);
    } else {
        console.log(`${scriptName} already exists in ${targetFolder}`);
    }

    return targetPath;
}

const getRelativePath = (absolutePath, workspaceFolder) => 
{
    return path.relative(workspaceFolder, absolutePath);
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	const scriptName = 'Install-Windows.ps1';
	const targetFolder = 'build-aux';

	const extensionPath = context.extensionPath;

	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (!workspaceFolders) 
	{
		return;
	}
    const workspaceFolder = workspaceFolders[0].uri.fsPath;

	const scriptPath = copyScriptIfNeeded(extensionPath, workspaceFolder, scriptName, targetFolder);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let archive_desposable = vscode.commands.registerCommand('plugtemp.archive', ()=>{return runPowershellScript(workspaceFolder, scriptPath, Intent.ARCHIVE)});

	context.subscriptions.push(archive_desposable);

	let build_installer_desposable = vscode.commands.registerCommand('plugtemp.build-installer', ()=>{return runPowershellScript(workspaceFolder, scriptPath, Intent.INSTALLER)});

	context.subscriptions.push(build_installer_desposable);

	let testing_desposable = vscode.commands.registerCommand('plugtemp.testing', ()=>{return runPowershellScript(workspaceFolder, scriptPath, Intent.TESTING)});

	context.subscriptions.push(testing_desposable);
}

const Intent = Object.freeze({
    TESTING: 'Testing',
    ARCHIVE: 'Archive',
    INSTALLER: 'Installer',
    toString: function(intent) {
        return this[intent] || 'Invalid intent';
    }
});

async function runPowershellScript(workspaceFolder, scriptPath, intent)
{
	const relativeScriptPath = getRelativePath(scriptPath, workspaceFolder);

	const args = ['-Intent', Intent.toString(intent)];
	const relativeArgs = args.map(arg => {
		if (arg.includes('${workspaceFolder}')) {
			return getRelativePath(arg.replace('${workspaceFolder}', workspaceFolder), workspaceFolder);
		}
		return arg;
	});

	const terminal = vscode.window.activeTerminal || vscode.window.createTerminal('pwsh');
	terminal.show();

	const command = `.\\"${relativeScriptPath}" ${relativeArgs.join(' ')}`;
	terminal.sendText(command);

	// return new Promise((resolve, reject) => {
    //     try {
	// 		const command = `.\\"${relativeScriptPath}" ${relativeArgs.join(' ')}`;
	// 		terminal.sendText(command);
	// 		resolve();
    //     } catch (error) {
    //         reject(error);
    //     }
	// });
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

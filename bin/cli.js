#!/usr/bin/env node
const {execSync} = require('child_process')
const runCommand = command=>{
try {
  execSync(`${command}`,{stdio:'inherit'})
} catch (error) {
  console.error(`Failed to execute ${command}`,error)
  return false
}
return true
}

const repoName = process.argv[2]
const gitCheckoutCommand = `git clone --depth 1 https://github.com/StanPrajwal/react-ts-scaffolding ${repoName}`
const installDepsCommad = `cd ${repoName} && npm install`

console.log(`Cloning the repository with name ${repoName}`)
const checkeOut = runCommand(gitCheckoutCommand)
if(!checkeOut){
  process.exit(-1);
}

console.log(`Installing dependencies fro ${repoName}`)
const installedDeps = runCommand(installDepsCommad)
if(!installedDeps){
  process.exit(-1)
}

console.log("Congratulation! Your are ready. Follow the following commands to start")
console.log(`cd ${repoName} && npm start`)





// import cp from "child_process";
// import fs from "fs";
// import path from "path";
// import { promisify } from "util";
// // cli spinners
// import ora from "ora";

// // convert libs to promises
// const exec = promisify(cp.exec);
// const rm = promisify(fs.rm);

// if (process.argv.length < 3) {
//   console.log("You have to provide a name to your app.");
//   console.log("For example :");
//   console.log("    npx simple-ts-app my-app");
//   process.exit(1);
// }

// const projectName = process.argv[2];
// const currentPath = process.cwd();
// const projectPath = path.join(currentPath, projectName);
// // TODO: change to your boilerplate repo
// const git_repo = "https://github.com/StanPrajwal/react-ts-scaffolding";

// // create project directory
// if (fs.existsSync(projectPath)) {
//   console.log(
//     `The file ${projectName} already exist in the current directory, please give it another name.`
//   );
//   process.exit(1);
// } else {
//   fs.mkdirSync(projectPath);
// }

// try {
//   const gitSpinner = ora("Downloading files...").start();
//   // clone the repo into the project folder -> creates the new boilerplate
//   await exec('git', ['clone', '--depth', '1', git_repo, projectPath, '--quiet']);
//   gitSpinner.succeed();

//   const cleanSpinner = ora("Removing useless files").start();
//   // remove my git history
//   const rmGit = rm(path.join(projectPath, ".git"), {
//     recursive: true,
//     force: true,
//   });
//   // remove the installation file
//   const rmBin = rm(path.join(projectPath, "bin"), {
//     recursive: true,
//     force: true,
//   });
//   await Promise.all([rmGit, rmBin]);

//   process.chdir(projectPath);
//   // remove the packages needed for cli
//   await exec("npm uninstall ora cli-spinners");
//   cleanSpinner.succeed();

//   const npmSpinner = ora("Installing dependencies...").start();
//   await exec("npm install");
//   npmSpinner.succeed();

//   console.log("The installation is done!");
//   console.log("You can now run your app with:");
//   console.log(`    cd ${projectName}`);
//   console.log(`    npm start`);
// } catch (error) {
//   // clean up in case of error, so the user does not have to do it manually
//   fs.rmSync(projectPath, { recursive: true, force: true });
//   console.log(error);
// }

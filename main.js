// const fs = require('fs');
// const path = require('path');
//


// fs.mkdir(path.join(__dirname,'data'), (err)=>{
//     if (err) throw new Error()
// })
// fs.mkdir(path.join(__dirname,'data','bmw'), (err)=>{
//     if (err) throw new Error()
// })

// fs.mkdir(path.join(__dirname,'data','audi'), (err)=>{
//     if (err) throw new Error()
// })

// fs.mkdir(path.join(__dirname,'data','mercedes'), (err)=>{
//     if (err) throw new Error()
// })

// fs.mkdir(path.join(__dirname,'data','tesla'), (err)=>{
//     if (err) throw new Error()
// })

// fs.mkdir(path.join(__dirname,'data','toyota'), (err)=>{
//     if (err) throw new Error()
// })

// const pathToCreatedFile = path.join(__dirname,'data', 'bmw', 'file1.txt');
// fs.writeFile(pathToCreatedFile, 'BMW 3', (err)=>{
//     if (err) throw new Error();
// })

// const pathToCreatedFile = path.join(__dirname,'data', 'audi', 'file2.txt');
// fs.writeFile(pathToCreatedFile,'frebgk', (err)=>{
//     if (err) throw new Error();
// })

// const pathToCreatedFile = path.join(__dirname,'data', 'mercedes', 'file3.txt');
// fs.writeFile(pathToCreatedFile,'mercedes',  (err)=>{
//     if (err) throw new Error();
// })

// const pathToCreatedFile = path.join(__dirname,'data', 'tesla', 'file4.txt');
// fs.writeFile(pathToCreatedFile,'frebgk', (err)=>{
//     if (err) throw new Error();
// })

// const pathToCreatedFile = path.join(__dirname,'data', 'toyota', 'file5.txt');
// fs.writeFile(pathToCreatedFile,'frebgk', (err)=>{
//     if (err) throw new Error();
// })

// fs.unlink (pathToCreatedFile, (err)=>{
//     if (err) throw new Error();
// })

// ----------------------------------------------------------------------||


const fs = require('node:fs/promises');
const path = require('node:path');

// const foo = async () => {
//     const basePath = path.join(process.cwd(), 'base-folder');
//     try {
//         await fs.readdir(basePath);
//         await fs.rm(basePath, { recursive: true, force: true })
//     } catch (e) {
//         console.error(e.message);
//     }
//     await fs.mkdir(basePath, { recursive: true });
//
//     const folders = ['folder1', 'folder2', 'folder3', 'folder4'];
//     const files = ['file1', 'file2', 'file3', 'file4'];
//
//     for (const folder of folders) {
//         const folderPath = path.join(basePath, folder);
//         await fs.mkdir(folderPath, { recursive: true });
//     }
//     for (const file of files) {
//         const filePath = path.join(basePath, `${file}.txt`);
//         await fs.writeFile(filePath, 'Hey!');
//     }
//
//     const filesNames = await fs.readdir(basePath);
//     for (const filesName of filesNames) {
//         const stat = await fs.stat(path.join(basePath, filesName));
//         console.log(filesName, stat.isDirectory())
//     }
// }
// void foo();

// const foo = async () => {
//     const basePath = path.join(process.cwd(), 'base-folder');
//     try {
//         await fs.readdir(basePath);
//         await fs.rm(basePath, {recursive: true, force: true})
//     } catch (e) {
//         console.error(e.message);
//     }
//     await fs.mkdir(basePath, {recursive: true});
//
//     const folders = ['folder1', 'folder2', 'folder3', 'folder4'];
//     const files = ['file1', 'file2', 'file3', 'file4'];
//
//     await Promise.allSettled([
//         ...folders.map(async (folder) => {
//             const folderPath = path.join(basePath, folder);
//             await fs.mkdir(folderPath, {recursive: true});
//         }),
//         ...files.map(async (file) => {
//             const filePath = path.join(basePath, `${file}.txt`);
//             await fs.writeFile(filePath, 'Hey!');
//         }),
//     ]);
//
//     const filesNames = await fs.readdir(basePath);
//     for (const filesName of filesNames) {
//         const stat = await fs.stat(path.join(basePath, filesName));
//         console.log(filesName, stat.isDirectory())
//     }
// }
// void foo();

const foo = async () => {
    const basePath = path.join(process.cwd(), 'base-folder');
    try{
        await fs.readdir(basePath);
        await fs.rm(basePath,{recursive: true,force:true})
    } catch (e){
        console.error(e.message);
    }
    await fs.mkdir(basePath,{recursive: true});

    const folders = ['folder1', 'folder2', 'folder3', 'folder4'];
    // const files = ['file1', 'file2', 'file3', 'file4'];

    await Promise.allSettled(
        folders.map(async (folder, i) => {
            const folderPath = path.join(basePath, folder);
            await fs.mkdir(folderPath, {recursive: true});

            const filePath = path.join(folderPath, `file${i + 1}.txt`);
            await fs.writeFile(filePath, 'Hey!');
        })
    );

    const fileNames = await fs.readdir(basePath);
    for (const filesName of fileNames){
        const folderPath= path.join(basePath, filesName)
        const stat = await fs.stat(folderPath)
        console.log(filesName , stat.isDirectory())

        const filesNames = await fs.readdir(folderPath);

        for (const filesName of fileNames){
            const stat = await fs.stat(path.join(folderPath,filesName));
            console.log(filesName,stat.isDirectory())
        }
    }
}
void foo();



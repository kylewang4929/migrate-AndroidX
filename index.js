const fs = require('fs');
const path = require('path');

const targetJson = JSON.parse(fs.readFileSync('./target.json'));
const data = JSON.parse(fs.readFileSync('./androidx-class-mapping.json'));

function fileDisplay(filePath) {
  // 根据文件路径读取文件，返回文件列表
  const files = fs.readdirSync(filePath);
  files.map((filename) => {
    // 遍历读取到的文件列表
    // 获取当前文件的绝对路径
    const filedir = path.join(filePath, filename);
    // 根据文件路径获取文件信息，返回一个fs.Stats对象
    const stats = fs.statSync(filedir);
    const isFile = stats.isFile();// 是文件
    const isDir = stats.isDirectory();// 是文件夹
    if (isFile) {
      const extname = path.extname(filedir);
      if (extname === '.java') {
        let fileData = fs.readFileSync(filedir).toString();
        data.map((item) => {
          fileData = fileData.replace(item.old, item.new);
        });

        // 写回文件
        fs.writeFileSync(filedir, fileData);
      }
    }
    if (isDir) {
      let isTarget = false;
      targetJson.map((item) => {
        if (filedir.indexOf(item) !== -1) {
          isTarget = true;
        }
      });
      if (isTarget) {
        fileDisplay(filedir);// 递归，如果是文件夹，就继续遍历该文件夹下面的文件
      }
    }
  });
}

fileDisplay('../../node_modules');

console.log('********************');
console.log(' 迁移到AndroidX成功');
console.log('********************');

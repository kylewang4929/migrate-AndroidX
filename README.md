### 自动迁移到AndroidX
> react-native部分插件还不支持AndroidX，虽然as提供了工具一键迁移到AndroidX，但是重新yarn的时候，又回还原回去。

遍历node_modules，找出`ts、js、tsx`文件（需要的话可以自行拓展），替换target.json下的包（基于效率考虑，如果遍历所有文件，消耗的时间太多，有新增的包的时候，在target.json增加一下即可）

#### 使用方法

加hook，这样install的时候都会自动执行一次，确保使用的包都是AndroidX

```

{
    "scripts": {
    ...
    "install": "cd ./script/MigrateAndroidX; node index.js"
  }
}

```

# vue3-element-plus-template

## This is a modification based on vue element template, based on vue3, webpack5, typescript, element plus, scss

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### electron run
```
npm run electron:serve
```

### electron build
```
npm run electron:build
```

### 如果你不想使用electron, 你可选择不管electron(可以不移除electron的相关包), 但是封装的NodeHttpsUtils则不能使用, 此是基于原生Node实现的, 直接使用正常的启动方式启动即可, 你也可以选择移除electron相关包, 并删除background.ts文件以及preload.ts文件

### 注意: electron的preload.ts文件, 在background.ts中加载时, 需要将preload.ts文件执行tsc编译为js, 并移动preload.js到electron的打包目录, 默认应该为: `dist-electron`


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

### v0.3.0, 引入权限体系, 下述为权限体系说明

1. 如何设计一个好的权限体系, 是我一直思考的事情, 若是太过粗略则无法精细控制到按钮级, 而很多时候我们需要控制权限到按钮级
2. 如果定义了权限语法规则, 则很多时候很难扩展, 因此, 如何定义一套可扩展权限规则是一个值得思考的事情
3. 鉴于以上两点, 我定义如下规则, 以菜单为一级权限, 二级菜单为二级权限,以此类推. 默认各级权限以:分割, 在菜单之后加入最后一级, 为按钮级
4. 如果拥有某个一级权限以下的所有子菜单及子权限, 假如一级权限为a, 则权限表达式可为 `a:**:*, **` 代表n级,`*` 代表所有权限
5. 超级管理员权限可表达为`*:**:*` , 第一个`*`代表拥有所有一级菜单权限, 第二个`**`代表所有子菜单(可以表示没有子菜单), 最后一个`*`代表此页面的所有权限
6. 对于前端权限显示来说, 无非是控制按钮是否显示可用, 真正的权限是后端控制的, 因此, 按照某种规则, 可以细节化权限
7. 权限可以看做为资源限制, 将所有的菜单,页面,资源, 甚至接口看成一种资源即可.
8. 注意: 这里说的所有权限都是基于登录以后的, 关于登录令牌, 在我看来不是一种资源权限.


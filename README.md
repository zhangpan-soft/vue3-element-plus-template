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

## If you want to develop a desktop client, you can perform the following steps based on this project

1. Execute `vue add electron-builder@alpha` Command, wait for the background.js file to be generated 
2. Rename the background.js file to background.ts and make the following modifications
    1. Add Window Close Listening
   ```typescript
     // 当应用所有窗口关闭要做的事情
     win.on('closed', () => {
       win = null
     })
   ```
   2. Other things you want to do can be handled here, such as preload.js, backend services, IPC communication, and so on
3. After executing the `vue add electron-builder@alpha` command, the startup command for Electron and the packaging command will be added in package.json. Note that following this operation does not require specifying the main option in package.json
   `"electron:serve": "vue-cli-service electron:serve` and `"electron:build": "vue-cli-service electron:build"`

## My CSS skills are not very good, so I have some minor issues with the menu style. Please submit a merge request so that I can fix this issue. Thank you

## Regarding Electron, I have added a new branch called `vue3-element-plus-template-electron`


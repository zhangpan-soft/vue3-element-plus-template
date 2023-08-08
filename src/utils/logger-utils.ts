const isDev = process.env.NODE_ENV === "development";

const debug = (message: string, ...data: any):void=>{
    if (isDev){
        console.log(message,...data)
    }
}

const log = (message: string, ...data: any):void=>{
    console.log(message,...data)
}

const info = (message: string, ...data: any):void=>{
    console.info(message,...data)
}

const error = (message: string, ...data: any):void=>{
    console.error(message,...data)
}

const warn = (message: string, ...data: any):void=>{
    console.warn(message,...data)
}

export default {
    debug,
    log,
    info,
    error,
    warn
}

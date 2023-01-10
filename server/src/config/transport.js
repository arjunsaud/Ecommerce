import {createWriteStream} from "fs"
const myTransport =(options)=>{
    return createWriteStream(options.destination)
}

export default myTransport
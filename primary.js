import cluster from 'cluster'
import os from 'os'

//TO LINK SERVER FILE
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

//TO CHECK CPU COUNT
const cpuCount = os.availableParallelism()
console.log(`TOTAL NO. OF CPU : ${cpuCount}`)

//CHECK PID
console.log(`PRIMARY PID : ${process.pid}`)

//EXCUTE SERVER.JS FILE THROUGH PRIMARY
cluster.setupPrimary(
    {
        exec: `${__dirname}/server.js`
    }
)

//FORK CLUSTER ACCORDING TO CPU COUNT
for (let i = 0; i < cpuCount; i++) {
    cluster.fork()
}

//IF INSTANCE DIES START ANOTHER ONE
cluster.on('exit', (worker,code,signal)=>{
    console.log(`WORKER WITH PID : ${process.pid} HAS KILLED`)
    console.log('NEW WORKER START')
    cluster.fork()
})
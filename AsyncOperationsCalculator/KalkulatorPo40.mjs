import fs from 'fs'
import promises from "fs/promises"
import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question) {
    return new Promise(resolve=>{
        rl.question(question,answer=>{
            resolve(answer)
        })
    })
}

async function calc(){
    try{
        const liczba1 = await askQuestion("Podaj liczbe 1 ")
        const liczba2 = await askQuestion("Podaj liczbe 2 ")
        const znak = await askQuestion("Podaj operacje matematyczną")
        const metoda = await askQuestion("Podaj metode przeprowadzania obliczeń(callback/promise)")
        
    }catch(err){
        console.error(err)
    }finally{
        rl.close()
    }
}
calc()
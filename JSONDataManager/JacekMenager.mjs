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

async function readJson(error = true)
{
    const path = await askQuestion("Podaj ścieżkę do pliku JSON: ");

    if (!fs.existsSync(path))
    {
        if (error) console.error("Ja rozumiem, że nie skończyłaś gegry rozszerzonej, ale chyba wiesz jakie pliki masz?");
        return {};
    }
    return JSON.parse((await promises.readFile(path)).toString());
}

async function main(){
    const czegoduszachce = (await askQuestion("Obiekt czy dane? ")).toLowerCase();
    try{
        if (czegoduszachce == "dane"){            
            console.log(await readJson());
        }
        else if(czegoduszachce == "obiekt"){

            const name = await askQuestion("Uprzejmie proszę o wpisanie swojego pełnego imienia w polu tekstowym, abyśmy mogli właściwie zidentyfikować Twoją tożsamość w celu dodanie go do tegoż obiektu: ");
            const age = await askQuestion("Wprowadź wiek obiektu który aktualnie będzie dopisywany do twojego pliku JSON(który może nie istnieć): ");
            const email = await askQuestion("Jeszcze proszę podać email tegoż obiektu, gdyż bez tego program sie wywali i się nie wyko");
            // var json = JSON.stringify({name, age, email})
            // fs.writeFile(path, json, {}, () => {})
            
        }
        else{
            console.error("Miałeś jedno zadanie łosiu")
        }
    }
    catch(err){
        console.error("Masz downa!")
    }
}
main();
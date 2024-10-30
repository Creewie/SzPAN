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

async function readJson(path, error = true)
{
    if (!fs.existsSync(path))
    {
        if (error) console.error("Ja rozumiem, że nie skończyłaś gegry rozszerzonej, ale chyba wiesz jakie pliki masz?");
        return [];
    }
    return JSON.parse((await promises.readFile(path)).toString());
}

async function main(){
    const czegoduszachce = (await askQuestion("Obiekt czy dane? ")).toLowerCase();
    try{
        if (czegoduszachce == "dane"){           
            const path = await askQuestion("Podaj ścieżkę do pliku JSON: ");
            console.log(await readJson(path));
        }
        else if(czegoduszachce == "obiekt"){

            const name = await askQuestion("Uprzejmie proszę o wpisanie swojego pełnego imienia w polu tekstowym, abyśmy mogli właściwie zidentyfikować Twoją tożsamość w celu dodanie go do tegoż obiektu: ");
            const age = await askQuestion("Wprowadź wiek obiektu który aktualnie będzie dopisywany do twojego pliku JSON(który może nie istnieć): ");
            const email = await askQuestion("Jeszcze proszę podać email tegoż obiektu, gdyż bez tego program sie wywali i się nie wykona, bo nie, bo tak uznaliśmy: ");
            const path = await askQuestion("Podaj ścieżkę do pliku JSON: ");

            const array = await readJson(path);
            const newJson = { name, age, email };
            array.push(newJson);
            const str = JSON.stringify(array);
            fs.writeFile(path, str, {}, () => {});
        }
        else{
            console.error("Miałeś jedno zadanie łosiu")
        }
    }
    catch(err){
        console.error(err)
    }
}
main();
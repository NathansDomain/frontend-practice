const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

let firstPassword = document.getElementById("first-password");
let secondPassword = document.getElementById("second-password");
setupCopyButton(firstPassword);
setupCopyButton(secondPassword);

function setupCopyButton(button)
{
    button.addEventListener("click", async () => {
    if(button.textContent !== "")
    {
        try {
            await navigator.clipboard.writeText(button.textContent); 
            alert("Copied to clipboard.");
        } catch(err) {
            console.error(err);
        }
        }
        else
        {
                alert("Nothing to copy to clipboard.");
        }
    });
}

function passwordGenerator() {
    let password = "";
    for(let i = 0; i < 12; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }
    return password;
}

function main() {
    firstPassword.textContent = passwordGenerator();
    secondPassword.textContent = passwordGenerator();
}



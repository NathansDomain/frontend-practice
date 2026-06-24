
let colorArray = []
const palette = document.querySelector(".palette-container")
const colorCount = 5;

document.addEventListener("click", e => {
    const paletteItem = e.target.closest(".palette-item")
    if(!paletteItem)
    {
        return
    }
    navigator.clipboard.writeText(paletteItem.dataset.color)
})

document.addEventListener("submit", e => {
    e.preventDefault()
    
    const formData = new FormData(e.target)
    const formValue = Object.fromEntries(formData);
    
    colorArray = []
    palette.innerHTML = ""
    init(formValue)
})

function renderer()
{
    palette.style.gridTemplateColumns = `repeat(${colorArray.length}, 1fr)`
    
    for(const color of colorArray)
    {
        const parentItem = document.createElement("div")
        parentItem.classList.add("palette-item")
        parentItem.dataset.color = color
        
        const colorDiv = document.createElement("div")
        const codeDiv = document.createElement("div")
        
        codeDiv.classList.add("swatch-item")
        codeDiv.textContent = color
        colorDiv.classList.add("color-height")
        colorDiv.style.backgroundColor = color;
        
        parentItem.append(colorDiv)
        parentItem.append(codeDiv)
        palette.append(parentItem)
    }
}


async function colorGenerator(colorCount, apiData = {"hex": "#fb3", "colors": "monochrome"}) {
    try {
        const html = `https://www.thecolorapi.com/scheme?hex=${apiData.hex.replace(/#/, "")}&mode=${apiData.colors}&count=${colorCount}`
        const colors = await fetch(html)
            .then(response => 
                {
                    if(!response.ok)
                    {
                        console.log(`HTML Error Code: ${response.status}`); 
                    }
                    return response.json()
                })
            .then(data => data.colors) 
            
        for(const color of colors)
        {
            colorArray.push(color.hex.value)
        }
    }
    catch (error){
        console.error("An error occured: ", error)
    }
}

async function init(apiData)
{
    await colorGenerator(colorCount, apiData)
    renderer()
}

init()
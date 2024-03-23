window.onload = () => {
  const baseUrl ="http://127.0.0.1:8000" 

  const listBtn = document.querySelector("#listBtn")
  const crustaceanSelect = document.querySelector("#crustaceanSelect")
  const crustaceanContainer = document.querySelector("#crustaceanContainer")

  // Generate options for the user dropdown dynamically
  for (let i = 1; i <= 100; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.text = i;
      crustaceanSelect.appendChild(option);
  }

  const doFetch = async (url) => {
    const result = await fetch(url)
    const resultJson = await result.json()
    return resultJson
  }

  const getCrustaceans = async () => {
    const url = `${baseUrl}/all`
    const fetchResult = await doFetch(url)
    const crustacean = fetchResult.crustacean
    crustacean.forEach( p => createHtmlCrustacean(p))
  }

  const getCrustacean = async (id) => {
    const url = `${baseUrl}/${id}` 
    const fetchResult = await doFetch(url)
    const crustacean = fetchResult.crustacean
    createHtmlPerson(crustacean)
  }

  const removeCrustaceans = () => {
    while(crustaceanContainer.firstChild) {
      crustaceanContainer.removeChild(crustaceanContainer.firstChild)
    }
  }

  const createHtmlCrustacean = (crustacean) => {
    const div = document.createElement("div")
    const h3 = document.createElement("h3")
    const p1 = document.createElement("p")
    const p2 = document.createElement("p")

    h3.innerText = `name: ${crustacean.name}`
    p1.innerText = `place of origin: ${crustacean.origin}`
    p2.innerText = `fun fact: ${crustacean.fun_fact}`

    div.appendChild(h3)
    div.appendChild(p1)
    div.appendChild(p2)

    div.className = "item"

    crustaceanContainer.appendChild(div)
  }


  crustaceanSelect.addEventListener("change" ,(e) => {
      removeCrustaceans()
      getCrustacean(e.target.value)
    })
  
  listBtn.addEventListener("click" ,() => {
      removeCrustaceans()
      getCrustaceans()
    })
}
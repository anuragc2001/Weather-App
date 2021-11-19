const submit = document.querySelector(".submit")
const input = document.querySelector("input")
const p1 = document.querySelector(".p1")
const p2 = document.querySelector(".p2")


submit.addEventListener("click", (e) => {
    e.preventDefault()
    const url = "http://localhost:3000/weather?address=" + input.value

    p1.innerHTML = "Loading..."
    p2.innerHTML = ""
    fetch(url)
        .then((data) => data.json())
        .then((data) => {
            p1.innerHTML = `${data.region}, ${data.location}, ${data.country}`
            p2.innerHTML = data.forecast
        })

})


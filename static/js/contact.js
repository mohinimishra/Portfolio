let form = document.querySelector('#form');
let name = document.querySelector('#name')
let email = document.querySelector('#email')
let mobile = document.querySelector('#mobile')
let textarea = document.querySelector('#textarea')
let msg = document.querySelector('#msg')


form.addEventListener('submit', function (e) {
    e.preventDefault();
    let data = {
        name: name.value,
        email: email.value,
        mobile: mobile.value,
        description: textarea.value
    }
    console.log(data)

    fetch('http://localhost:3000/contact', {
        "method": "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((dt) => {
        return dt.json()
    }).then((parseData) => {
        let p = document.createElement('p');
        p.innerHTML = parseData.message;
        p.className = "alert alert-success";
        msg.appendChild(p)
        form.reset()

    }).catch((err) => {
        console.log(err)
    })

})



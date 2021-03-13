function getJson(url) {
    return fetch(url)
    .then(response => {
        if(response.ok)
            return response.json()
        else
            throw new Error(response.statusText)
        })
}

async function getData() {
    try {
        const [employees, roles] = await Promise.all([
            getJson('http://localhost:3000/employees'),
            getJson('http://localhost:3000/roles')
        ])    
        return [employees, roles]
    }
    catch (err) {
        showError(err)
    }
}

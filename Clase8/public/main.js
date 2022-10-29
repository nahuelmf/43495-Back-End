const guardarProducto = async () => {

    const name = document.getElementById('name').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    document.getElementById('data').reset()

    try {
        const data = { name, price, thumbnail}
        const response = await fetch('/api/productos', {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'},
        })
        const result = await response.json()
        return result

    } catch (error) {
        let err = new Error(error)
        return err
    }
}
export const htmlNewUserTemplate = (id, date) => {
    return `
    <h2>¡Usuario Creado!</h2>
    <p>Gracias por registrarse</p>
    <ul>
        <li><strong>UUID:</strong> ${id}</li>
        <li><strong>FECHA:</strong> ${date}</li>
    </ul>
    `
};
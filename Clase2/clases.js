class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    getFullName() {
        return `${this.nombre} ${this.apellido}`;}
    
    addMascota(mascota) {
        this.mascotas.push(mascota);}
    
    countMascotas() {
        return this.mascotas.length;}
    
    addBook(nombre, autor) {
        this.libros.push({ nombre, autor });}
    
    getBookNames() {
        return this.libros.map((i) => i.nombre);}
    }
    
    let Usuario1 = new Usuario("Nahuel", "Figueroa");
    console.log(Usuario1);
    
    Usuario1.addMascota("Perro");
    Usuario1.addMascota("Gato");
    Usuario1.addMascota("Gato");
    console.log(Usuario1.mascotas);
    
    console.log(`${Usuario1.nombre} ${Usuario1.apellido} tiene ${Usuario1.countMascotas()} mascotas.`);
    
    Usuario1.addBook("El principito", "Antoine de Saint-Exupéry");
    Usuario1.addBook("Don Quijote de La Mancha", "Miguel de Cervates");
    Usuario1.addBook("Cien años de soledad", "Gabriel García Márquez");
    Usuario1.addBook("Rayuela", "Rayuela");
    
    console.log(Usuario1.getBookNames());
    
    console.log(Usuario1.getFullName());
    
    let Usuario2 = new Usuario("Veronica", "Ulecia");
    console.log(Usuario2);
    
    Usuario2.addMascota("Perro");
    Usuario2.addMascota("Caballo");
    Usuario2.addMascota("Gato");
    Usuario2.addMascota("Loro");
    console.log(Usuario2.mascotas);
    
    console.log(`${Usuario2.nombre} ${Usuario2.apellido} tiene ${Usuario2.countMascotas()} mascotas.`);
    
    Usuario2.addBook("Dime quién soy", "Julia Navarro");
    Usuario2.addBook("Moby Dick", "Herman Melville");
    Usuario2.addBook("El lobo estepario", "Herman Hesse");
    
    console.log(Usuario2.getBookNames());
    
    console.log(Usuario2.getFullName());
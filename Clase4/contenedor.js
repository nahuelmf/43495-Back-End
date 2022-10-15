const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
        this.objects = this.readData(this.fileName) || [];
    }
    async createIfNotExist(){
        try{
            await fs.promises.access(this.fileName)
        }catch(err){
            await fs.promises.writeFile(this.fileName, '[]', 'utf8');
        }
    }
    //Guarda un objeto
    async save(content){
        try {
            const data = await this.getAll();
            content.id = (data[data.length - 1]?.id || 0) + 1;
            data.push(content);
            await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2), 'utf8');
        } catch (error) {
            if(error.message.includes('ENOENT')){
                await this.createIfNotExist();
                return this.save(content);
            } else {
                throw new Error(error);
            }
        }
    }
    //Devuelve el objeto con el ID buscado
    async deleteById(id){
        try {
            const data = await this.getAll();
            const newData = data.filter(item => item.id != id);
            await fs.promises.writeFile(this.fileName, JSON.stringify(newData, null, 2), 'utf8');
        } catch(error){
            throw new Error(error);
        }
    }
    //Devuelve un array con los objetos presentes en el archivo
    async getAll(){
        try {
            return JSON.parse(await fs.promises.readFile(this.fileName, 'utf8'));
        } catch (error) {
            throw new Error(error);
        }
    }
    //Elimina del archivo el objeto con el ID buscado
    async deleteById(id) {
        try {
            this.objects = await this.getAll();
            this.objects = this.objects.filter(el => el.id != Number(id));
            this.writeData(this.objects);
        } catch (err) {
            console.log(err);
        }
    }
    //Elimina todos los objetos guardados en el archivo
    async deleteAll(){
        try {
            await fs.promises.writeFile(this.fileName, '[]', 'utf8');
        } catch(error){
            throw new Error(error);
        }
    }
    
    readData(path) {
        const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
        return data;
    }
    writeData(objects) {
        fs.writeFileSync(this.fileName, JSON.stringify(objects, null, 2));
    }
    
}

module.exports = Contenedor;
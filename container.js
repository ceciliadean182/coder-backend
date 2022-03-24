const fs = require("fs");




const writeFileAsync = async (arr) => {
  try{
    await fs.promises.writeFile(
    "./productos.txt",
    JSON.stringify(arr, null, 2),
    "utf-8"
  )}
  catch (err){
    throw new Error('Error de lectura!')
  }
};


const readFileAsync = async (arr) => {
  try{
    let file = await fs.promises.readFile("./productos.txt", "utf-8");
    return file;
  }
  catch (err){
    throw new Error('Error de lectura!')
  }
};


class Contenedor {
  constructor() {
    this.producto = [];
  }

  
  async save(product) {
    
    let fileExits = await readFileAsync();

    
    if (fileExits && fileExits.length >= 0) {
      let dataFile = JSON.parse(fileExits);
      product.id = dataFile.length + 1;
      dataFile.push(product);
      this.producto = dataFile;
      writeFileAsync(this.producto);

    } 
    else {
      
      product.id = 1;
      this.producto.push(product);
      writeFileAsync(this.producto);
    }
  }

  
  async getById(id, position){
    let fileExits = await readFileAsync();

    
    if (fileExits) {
      let dataFile = JSON.parse(fileExits);
      const found = dataFile.find(element => element.id == id)
      

      if(!found){
        return console.log('null')
      }
      if (position){
        return dataFile.indexOf(found)
      }else{
        
        return console.log(found)
      } 
    }
  }

  
  async getAll(){
    let fileExits = await readFileAsync();
    
    if (fileExits) {
      let dataFile = JSON.parse(fileExits);
      this.producto.push(dataFile);
      console.log(this.producto)
    }
  }

  
  async deleteById(id){
   const positionItem = await this.getById(id, true)
   console.log(positionItem)

    let fileExits = await readFileAsync();

    
    if (fileExits && positionItem >= 0) {
      let dataFile = JSON.parse(fileExits);
      const deleteItem = dataFile.splice(positionItem, 1)
      
      console.log(dataFile)

      
      writeFileAsync(dataFile);
    }
    else
      console.log('No se pudo eliminar!')
  }


  
  async deleteAll(){ 
      writeFileAsync(this.producto);
  }

}


module.exports = Contenedor;
class Auto {
  constructor( titulo, transaccion, descripcion, precio) {
    this.id = Math.floor(Math.random() * 10) + 1;
    this.titulo = titulo;
    this.transaccion = transaccion;
    this.descripcion = descripcion;
    this.precio = +precio;
  }

  verify() {
    return this.checkTitulo();
  }

  checkTitulo() {
    return { success: true, rta: null };
  }
}

export { Auto };
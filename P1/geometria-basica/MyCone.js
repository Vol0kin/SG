
class MyCone extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    this.createGUI(gui, titleGui);

    // Crear la geometria del cono (radio, altura, resolucion)
    var geometry = new THREE.ConeGeometry(1, 1, 3);

    // Crear material que asigna color segun el vector normal
    var material = new THREE.MeshNormalMaterial();

    // Establecer que se va a usar sombreado plano y que se tiene que actualizar
    // en cada frame
    material.flatShading = true;
    material.needsUpdate = true;

    this.mesh = new THREE.Mesh(geometry, material);
    this.add(this.mesh);

    // Poner la base del cono sobre el suelo
    this.mesh.position.y += 0.5;
  }

  createGUI(gui,titleGui) {
    var that = this;
    // Controles para el radio, la altura y la resolucion
    this.guiControls = new function() {
      this.radius = 1.0;
      this.height = 1.0;
      this.resolution = 3;

      this.reset = function() {
        this.radius = 1.0;
        this.height = 1.0;
        this.resolution = 3;

        that.changeGeometry();
      }
    }

    var folder = gui.addFolder(titleGui);

    folder.add(this.guiControls, 'radius', 0.1, 5.0, 0.1).name("Radio: ").listen();
    folder.add(this.guiControls, 'height', 0.1, 5.0, 0.1).name("Altura: ").listen();
    folder.add(this.guiControls, 'resolution', 3, 30, 1).name("Resolución: ").onChange(function(value) {that.changeGeometry();}).listen();
    folder.add(this.guiControls, 'reset').name('[Reset]');
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    // Incrementar la rotacion en Y
    this.mesh.rotation.y += 0.01;

    // Actualizar posicion, rotacion y escala
    this.position.set(0,0,0);
    this.rotation.set(0,0,0);
    this.scale.set(this.guiControls.radius, this.guiControls.height, this.guiControls.radius);
  }

  changeGeometry() {
    // Crear la nueva geometria y asignarla
    var newGeometry = new THREE.ConeGeometry(1, 1, this.guiControls.resolution);
    this.mesh.geometry = newGeometry;

    // Subir el objeto para que la base este en los ejes y escalar
    this.position.y += this.guiControls.height / 2;
  }
}
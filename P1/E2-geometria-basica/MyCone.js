
class MyCone extends THREE.Object3D {
  constructor(gui, titleGui) {
    super();

    this.createGUI(gui, titleGui);

    // Crear la geometria del cono
    var coneGeo = new THREE.ConeGeometry(1, 1, 3);

    // Crear material que asigna color segun el vector normal
    var coneMat = new THREE.MeshNormalMaterial();
    coneMat.flatShading = true;
    coneMat.needsUpdate = true;

    this.mesh = new THREE.Mesh(coneGeo, coneMat);
    this.add(this.mesh);

    // Poner la base del cono sobre el suelo
    this.mesh.position.y += 0.5;
  }

  createGUI(gui,titleGui) {
    // Controles para el radio, la altura y la resolucion
    this.guiControls = new function() {
      this.radius = 1.0;
      this.height = 1.0;
      this.resolution = 3;
    }

    var that = this;

    var folder = gui.addFolder(titleGui);

    folder.add(this.guiControls, 'radius', 0.1, 5.0, 0.1).name("Radio: ").listen();
    folder.add(this.guiControls, 'height', 0.1, 5.0, 0.1).name("Altura: ").listen();
    folder.add(this.guiControls, 'resolution', 3, 30, 1).name("Resolución: ").onChange(function(value) {that.changeGeometry()});
  }

  update () {
    // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
    // Primero, el escalado
    // Segundo, la rotación en Z
    // Después, la rotación en Y
    // Luego, la rotación en X
    // Y por último la traslación
    this.position.set(0,0,0);
    this.rotation.set(0,0,0);
    this.scale.set(this.guiControls.radius, this.guiControls.height, this.guiControls.radius);
  }

  changeGeometry() {
    var newGeometry = new THREE.ConeGeometry(this.guiControls.radius, this.guiControls.height, this.guiControls.resolution);

    this.mesh.geometry = newGeometry;
  }
}
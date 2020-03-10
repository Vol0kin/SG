
class MyIcosahedron extends THREE.Object3D {
    constructor(gui, titleGui) {
        // Llamar al constructor de la superclase
        super();

        // Crar la GUI
        this.createGUI(gui, titleGui);

        // Crear la geometría del icosaedro (radio, detalle)
        var geometry = new THREE.IcosahedronGeometry(1.0, 0);

        // Crear el material
        var material = new THREE.MeshNormalMaterial();

        // Establecer que se va a usar sombreado plano y que se tiene que actualizar
        // en cada frame
        material.flatShading = true;
        material.needsUpdate = true;

        // Crear la malla
        this.mesh = new THREE.Mesh(geometry, material);
        this.add(this.mesh);
    }

    createGUI(gui, titleGui) {
        var that = this;

        // Controles para radio y detalle
        this.guiControls = new function() {
            this.radius = 1.0;
            this.detail = 0;

            this.reset = function() {
                this.radius = 1.0;
                this.detail = 0;

                that.recreateGeometry();
            }
        }

        // Crera folder que agrupa los controles anteriores
        var folder = gui.addFolder(titleGui);

        // Insertar los controles en el folder
        folder.add(this.guiControls, 'radius', 1.0, 3.0, 0.1).name('Radio: ').listen();
        folder.add(this.guiControls, 'detail', 0, 3, 1).name('Subdivision: ').onChange(() => {this.recreateGeometry()}).listen();
        folder.add(this.guiControls, 'reset').name('[Reset]');
    }

    update() {
        // Actualizar rotacion
        this.mesh.rotation.y += 0.01;

        this.position.set(0,0,0);
        this.rotation.set(0,0,0);
        this.scale.set(this.guiControls.radius, this.guiControls.radius, this.guiControls.radius);
    }

    recreateGeometry() {
        // Crear nueva geometria y asignarla
        var newGeo = new THREE.IcosahedronGeometry(1.0, this.guiControls.detail);
        this.mesh.geometry = newGeo;
    }
}
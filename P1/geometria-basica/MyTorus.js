
class MyTorus extends THREE.Object3D {
    constructor(gui, titleGui) {
        // Llamar al constructor de la superclase
        super();

        // Crear GUI
        this.createGUI(gui, titleGui);

        // Crear la geometria del toro (radio, radio tubo, resolucion toro, resolucon tubo)
        var geometry = new THREE.TorusGeometry(1.0, 0.2, 3, 3);

        // Crear material que asigna color segun el vector normal
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

        // Controles para radio, tubo, resolucion toro y resolucion tubo
        this.guiControls = new function() {
            this.radius = 1.0;
            this.tube = 0.2;
            this.radialSegments = 3;
            this.tubularSegments = 3;

            this.reset = function() {
                this.radius = 1.0;
                this.tube = 0.2;
                this.radialSegments = 3;
                this.tubularSegments = 3;

                that.recreateGeometry();
            }
        }

        // Crear folder que agrupa los controles anteriores
        var folder = gui.addFolder(titleGui);

        // Insertar los controles en el folder
        folder.add(this.guiControls, 'radius', 1.0, 3.0, 0.1).name('Radio Principal: ').onChange(() => {this.recreateGeometry()}).listen();
        folder.add(this.guiControls, 'tube', 0.2, 3.0, 0.1).name('Radio Tubo: ').onChange(() => {this.recreateGeometry()}).listen();
        folder.add(this.guiControls, 'radialSegments', 3, 60, 1).name('Resolución Toro: ').onChange(() => {this.recreateGeometry()}).listen();
        folder.add(this.guiControls, 'tubularSegments', 3, 60, 1).name('Resolución Tubo: ').onChange(() => {this.recreateGeometry()}).listen();
        folder.add(this.guiControls, 'reset').name('[Reset]');        
    }

    update() {
        // Rotar
        this.mesh.rotation.y += 0.01;

        // Actualizar
        this.position.set(0,0,0);
        this.rotation.set(0,0,0);
        this.scale.set(1,1,1);
    }

    recreateGeometry() {
        // Crear nueva geometria y asignarla
        var newGeo = new THREE.TorusGeometry(this.guiControls.radius,
            this.guiControls.tube,
            this.guiControls.radialSegments,
            this.guiControls.tubularSegments
        );

        this.mesh.geometry = newGeo;
    }
}
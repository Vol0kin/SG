
class MySphere extends THREE.Object3D {
    constructor(gui, titleGui) {
        // Llamar al constructor de la superclase
        super();

        // Crear la GUI
        this.createGUI(gui, titleGui);

        // Crear la geometria de la esfera (radio, segmentos anchura, segmentos altura)
        var geometry = new THREE.SphereGeometry(1.0, 3, 2);

        // Crear material que asigna color segun el vector normal
        var material = new THREE.MeshNormalMaterial();

        // Establecer que se va a usar sombreado plano y que se tiene que actualizar
        // en cada frame
        material.flatShading = true;
        material.needsUpdate = true;

        // Crear la malla
        this.mesh = new THREE.Mesh(geometry, material);
        this.add(this.mesh);

        // Hacer que la esfera este sobre los ejes
        this.mesh.position.y = 1.0;
    }

    createGUI(gui, titleGui) {
        var that = this;

        // Controles para radio, res. ecuador (segmentos anchura) y res. meridianos (seg. altura)
        this.guiControls = new function() {
            this.radius = 1.0;
            this.widthSegments = 3;
            this.heightSegments = 2;

            this.reset = function() {
                this.radius = 1.0;
                this.widthSegments = 3;
                this.heightSegments = 2;

                that.recreateGeometry();
            }
        }

        // Crear folder que agrupa los controles anteriores
        var folder = gui.addFolder(titleGui);

        // Insertar los controles en el folder
        folder.add(this.guiControls, 'radius', 1.0, 3.0, 0.1).name('Radio: ').listen();
        folder.add(this.guiControls, 'widthSegments', 3, 30, 1).name('Res. Ecuador: ').onChange(() => {this.recreateGeometry();}).listen();
        folder.add(this.guiControls, 'heightSegments', 2, 30, 1).name('Res. Meridiano: ').onChange(() => {this.recreateGeometry();}).listen();
        folder.add(this.guiControls, 'reset').name('[Reset]');
    }

    update() {
        // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación

        // Actualizar la rotacion
        this.mesh.rotation.y += 0.01;

        this.position.set(0,0,0);
        this.rotation.set(0,0,0);
        this.scale.set(this.guiControls.radius, this.guiControls.radius, this.guiControls.radius);
    }

    recreateGeometry() {
        // Crear la nueva geometria y asignarla
        var newGeo = new THREE.SphereGeometry(1, this.guiControls.widthSegments, this.guiControls.heightSegments);
        this.mesh.geometry = newGeo;

        // Poner la esfera sobre los ejes
        this.mesh.position.y = 1.0;
    }
}
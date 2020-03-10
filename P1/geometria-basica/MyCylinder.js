class MyCylinder extends THREE.Object3D {
    constructor(gui, titleGui) {
        // Llamar al constructor de la superclase
        super();

        // Crear GUI
        this.craeteGUI(gui, titleGui);

        // Crear la geometría del cilindro
        // (radio superior, radio inferior, altura, resolucion)
        var geometry = new THREE.CylinderGeometry(1.0, 1.0, 1.0, 3);

        // Crear material que asigna color segun el vector normal
        var material = new THREE.MeshNormalMaterial();
        
        // Establecer que se va a usar sombreado plano y que se tiene que actualizar
        // en cada frame
        material.flatShading = true;
        material.needsUpdate = true;

        // Crear malla
        this.mesh = new THREE.Mesh(geometry, material);
        this.add(this.mesh);

        // Poner la base del cilindrio sobre el suelo
        this.mesh.position.y += 0.5;
    }

    craeteGUI(gui, titleGui) {
        var that = this;

        // Controles para radio superior, radio inferior, altura y resolucion
        this.guiControls = new function() {
            this.radiusTop = 1.0;
            this.radiusBottom = 1.0;
            this.height = 1.0;
            this.resolution = 3;

            this.reset = function() {
                this.radiusTop = 1.0;
                this.radiusBottom = 1.0;
                this.height = 1.0;
                this.resolution = 3;

                that.recreateGeometry();
            }
        }

        // Crear folder que agrupa los controles anteriores
        var folder = gui.addFolder(titleGui);

        // Insertar los controles en el folder
        folder.add(this.guiControls, 'radiusTop', 1.0, 5.0, 0.1).name("Radio superior: ").onChange(() => {this.recreateGeometry();}).listen();
        folder.add(this.guiControls, 'radiusBottom', 1.0, 5.0, 0.1).name("Radio inferior: ").onChange(() => {this.recreateGeometry();}).listen();
        folder.add(this.guiControls, 'height', 1.0, 5.0, 0.1).name('Altura: ').listen();
        folder.add(this.guiControls, 'resolution', 3, 30, 1).name("Resolucioón: ").onChange(() => {this.recreateGeometry();}).listen();
        folder.add(this.guiControls, 'reset').name('[Reset]');
    }

    update() {
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
        this.scale.set(1, this.guiControls.height, 1);
    }

    recreateGeometry() {
        // Crear la nueva geometria y actualizarla
        var newGeo = new THREE.CylinderGeometry(this.guiControls.radiusTop, this.guiControls.radiusBottom, 1, this.guiControls.resolution);
        this.mesh.geometry = newGeo;

        // Subir el objeto para que la base este en los ejes
        this.position.y += this.guiControls.height / 2;

    }

}
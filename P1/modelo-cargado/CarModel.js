
class CarModel extends THREE.Object3D {
    constructor(gui, titleGui) {
        // Llamar al constructor de la superclase
        super();

        // Crear gui
        this.createGui(gui, titleGui);

        // Hacer referencia a this
        var that = this;

        // Path donde estan los archivos
        var path = '../models/porsche911/';

        // Crear loader de materiales (el objeto se cargara dentro)
        var mtlLoader = new THREE.MTLLoader();

        // Establecer path donde estaran los elementos
        mtlLoader.setPath(path);

        // Cargar material + modelo
        // Archivo, callback una vez cargado, callback mientras se carga y callback de error
        mtlLoader.load('911.mtl', function(materials) {
            // Precargar los materiales
            materials.preload();

            // Crear loader del objeto
            var objLoader = new THREE.OBJLoader();

            // Establecer materiales y path del objeto
            objLoader.setMaterials(materials);
            objLoader.setPath(path);

            // Cargar objeto
            // Archivo, callback una vez cargado carga, callback durante la carga, callback de error
            objLoader.load('Porsche_911_GT2.obj', function(object) {
                // Insertar modelo en la escena
                that.add(object);
            },
            function(xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            function(error) {
                console.log('Error while loading the model');
            });
        });        
    }

    createGui(gui, titleGui) {
        // Crear controles para la rotacion
        this.guiControls = new function() {
            this.enableSpin = false;
        }

        // Create new folder
        var folder = gui.addFolder(titleGui);

        // Insertar funciononalidad
        folder.add(this.guiControls, 'enableSpin').name('Giro: ');
    }

    update() {
        if (this.guiControls.enableSpin) {
            this.rotation.y += 0.01;
        }

        this.position.set(0, 0.6, 0);
        this.rotation.set(0, this.rotation.y, 0);
        this.scale.set(1, 1, 1);
    }
}
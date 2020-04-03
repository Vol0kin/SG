/**
 * Clase que representa un reloj con su manecilla
 */
class Clock extends THREE.Object3D {
    constructor(gui, titleGui) {
        // Llamar al constructor de la superclase
        super();

        // Guardar tiempo anterior (se utiliza para la animacion)
        this.previousTime = Date.now();

        // Crear gui
        this.createGUI(gui, titleGui);

        // Crear reloj
        var radius = 2;
        var geometry = new THREE.SphereGeometry(radius, 15, 15);

        var greenMaterial = this._createMaterial({color: 0x00ff00});
        var redMaterial = this._createMaterial({color: 0xff0000});

        const sphere = new THREE.Mesh(geometry, greenMaterial);

        var hourDistance = 20;
        this.HOUR_RADIAN = 2 * Math.PI / 12;
        var handleDistance = 15;

        // Poner las horas
        for (let i = 0; i < 12; i++) {
            let hourSphere  =sphere.clone();
            hourSphere.position.set(Math.cos(i * this.HOUR_RADIAN) * hourDistance, 0, Math.sin(i * this.HOUR_RADIAN) * hourDistance)
            this.add(hourSphere);
        }
        
        // Poner manecilla
        var handle = sphere.clone();
        handle.material = redMaterial;
        handle.position.x = handleDistance;

        // Crear nodo de rotacion
        this.rotationNode = new THREE.Object3D();

        this.rotationNode.add(handle);
        this.add(this.rotationNode);
    }

    _createMaterial(settings) {
        var material = new THREE.MeshPhongMaterial(settings);

        return material;
    }

    createGUI(gui, titleGui) {
        /** 
         * Crear objeto que contiene el control de lo siguiente:
         * - velocidad de rotacion
         */ 
        this.guiControls = new function() {
            this.rotationSpeed = 0;
        }

        // Crear folder que contiene el control
        var folder = gui.addFolder(titleGui);

        // Crear barra de control
        folder.add(this.guiControls, 'rotationSpeed', -12, 12, 1).name('Velocidad (marcas/s): ');
    }

    update() {
        // Obtener tiempo actual y medir cuanto tiempo ha pasado
        // desde la ultima medicion
        var currentTime = Date.now();
        var elapsedTime = (currentTime - this.previousTime) / 1000;

        // Calcular velocidad actual
        var speed = this.guiControls.rotationSpeed * this.HOUR_RADIAN * elapsedTime;

        // Actualizar rotacion (se resta para que vaya en sentido horario)
        this.rotationNode.rotation.y -= speed;
        
        // Actualizar ultimo tiempo
        this.previousTime = currentTime;
    }
}
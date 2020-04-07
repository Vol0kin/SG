/**
 * Clase que representa una bola saltarina
 */
class JumpingBall extends THREE.Object3D {
    constructor(gui, titleGui) {
        // Llamar al constructor de la superclase
        super();

        // Guardar tiempo anterior
        this.previousTime = Date.now();

        // Crear gui
        this.createGui(gui, titleGui);

        // Establecer velocidad de rotacion alrededor del cilindro
        // Una vuelta tarda 4 segundos
        var space = 2 * Math.PI;
        var time = 4;
        this.speed = space / time;
        
        // Establecer altura minima y maxima y si subir o bajar
        this.MIN_HEIGHT = 1;
        this.MAX_HEIGHT = 26;
        this.heightSpeed = 1;
        this.increaseHeight = true;

        // Crear material transparente
        var transparentMaterial = new THREE.MeshNormalMaterial({opacity: 0.35, transparent: true});

        // Crear material normal
        var normalMaterial = new THREE.MeshNormalMaterial();
        normalMaterial.flatShading = true;
        normalMaterial.needsUpdate = true;

        // Crear geometrias 
        this.height = 30;
        var cylinderGeometry = new THREE.CylinderGeometry(1, 1, this.height, 60);
        var sphereGeometry = new THREE.SphereGeometry(1, 25, 25);

        // Crear mallas
        this.cylinderMesh = new THREE.Mesh(cylinderGeometry, transparentMaterial);
        this.ballMesh = new THREE.Mesh(sphereGeometry, normalMaterial);

        // Posicionarlas
        this.cylinderMesh.position.y = this.height / 2;
        this.ballMesh.position.y = this.MIN_HEIGHT;

        // Crear nodo rotacion + traslacion por el cilindro de la bola
        this.ballNode = new THREE.Object3D();

        // Insertar elementos
        this.ballNode.add(this.ballMesh);

        this.add(this.cylinderMesh);
        this.add(this.ballNode);
    }

    createGui(gui, titleGui) {
        // Crear objeto que contiene el control de la escala de los radios
        this.guiControls = new function() {
            this.radius = 20;
        }

        // Crear folder que contiene los controles
        var folder = gui.addFolder(titleGui);

        // Insertar controles
        folder.add(this.guiControls, 'radius', 5, 30, 0.1).name('Radio: ');
    }

    update() {
        // Obtener tiempo actual y tiempo transcurrido
        var currentTime = Date.now();
        var elapsedTime = (currentTime - this.previousTime) / 1000;

        // Actualizar radios del cilindro
        this.cylinderMesh.scale.set(this.guiControls.radius, 1, this.guiControls.radius);

        // Actualizar posicion de la bola
        this.ballMesh.position.z = this.guiControls.radius;
        
        // Actualizar rotacion en Y de la bola
        this.ballNode.rotation.y += this.speed * elapsedTime;

        // Actualizar altura de la bola
        var accelerationDistance = 4;

        if (this.increaseHeight) {
            // Aceleracion, deceleracion y velocidad constante
            if (this.ballNode.position.y <= this.MIN_HEIGHT + accelerationDistance) {
                var lambda = (this.ballNode.position.y - this.MIN_HEIGHT) / accelerationDistance;
                var f = lambda * lambda;
                
                var v0 = this.heightSpeed / 4;

                this.ballNode.position.y += v0 + f * (this.heightSpeed - v0);
            } else if (this.ballNode.position.y >= this.MAX_HEIGHT - accelerationDistance) {
                var lambda = (this.ballNode.position.y - (this.MAX_HEIGHT - accelerationDistance)) / accelerationDistance;
                var f = -lambda * lambda + 2 * lambda;

                var v1 = this.heightSpeed / 4;

                this.ballNode.position.y += this.heightSpeed + f * (v1 - this.heightSpeed);
            } else if (this.ballNode.position.y >= this.MIN_HEIGHT + accelerationDistance
                        && this.ballNode.position.y <= this.MAX_HEIGHT - accelerationDistance) {
                this.ballNode.position.y += this.heightSpeed;
            }

            if (this.ballNode.position.y >= this.MAX_HEIGHT) {
                this.increaseHeight = false;
            }
            
        } else {
            // Aceleracion, deceleracion y velocidad constante
            if (this.ballNode.position.y >= this.MAX_HEIGHT - accelerationDistance) {
                var lambda = (this.ballNode.position.y - (this.MAX_HEIGHT - accelerationDistance)) / accelerationDistance;
                var f = lambda * lambda;

                var v0 = this.heightSpeed / 4;

                this.ballNode.position.y -= v0 + f * (this.heightSpeed - v0);
            } else if (this.ballNode.position.y <= this.MIN_HEIGHT + accelerationDistance) {
                var lambda = (this.ballNode.position.y - this.MIN_HEIGHT + accelerationDistance) / accelerationDistance;
                var f = -lambda * lambda + 2 * lambda;

                var v1 = this.heightSpeed / 4;

                this.ballNode.position.y -= this.heightSpeed + f * (v1 - this.heightSpeed);
            } else if (this.ballNode.position.y >= this.MIN_HEIGHT + accelerationDistance
                        && this.ballNode.position.y <= this.MAX_HEIGHT - accelerationDistance) {
                this.ballNode.position.y -= this.heightSpeed;
            }

            if (this.ballNode.position.y <= this.MIN_HEIGHT) {
                this.increaseHeight = true;
            }
        }

        // Actualizar tiempos
        this.previousTime = currentTime;
    }
}
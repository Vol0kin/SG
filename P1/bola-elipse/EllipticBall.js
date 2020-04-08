/**
 * Clase que representa una bola saltarina
 */
class EllipticBall extends THREE.Object3D {
    constructor(gui, titleGui) {
        // Llamar al constructor de la superclase
        super();

        // Crear gui
        this.createGui(gui, titleGui);

        // Crear material transparente
        var transparentMaterial = new THREE.MeshNormalMaterial({opacity: 0.35, transparent: true});

        // Crear material normal
        var normalMaterial = new THREE.MeshNormalMaterial();
        normalMaterial.flatShading = true;
        normalMaterial.needsUpdate = true;

        // Crear geometrias 
        var height = 3;
        var cylinderGeometry = new THREE.CylinderGeometry(5, 5, height, 60);
        var sphereGeometry = new THREE.SphereGeometry(1, 25, 25);

        // Crear mallas
        this.cylinderMesh = new THREE.Mesh(cylinderGeometry, transparentMaterial);
        this.ballMesh = new THREE.Mesh(sphereGeometry, normalMaterial);

        // Posicionarlas
        this.cylinderMesh.position.y = height / 2;
        this.ballMesh.position.y = 1;

        // Crear elipse que representa la trayectoria de la bola
        this.ellipticPath = this.createEllipticPath();

        /*
        var points = this.ellipticPath.getPoints( 100 );
        var geometryLine =  new THREE.BufferGeometry().setFromPoints( points );
        var material = new THREE.LineBasicMaterial( { color: 0x0000ff } ) ;
        this.visibleSpline = new THREE.Line ( geometryLine , material ) ;
        */

        // Crear nodo rotacion + traslacion por el cilindro de la bola
        this.ballNode = new THREE.Object3D();

        // Insertar elementos
        this.ballNode.add(this.ballMesh);

        this.add(this.cylinderMesh);
        this.add(this.ballNode);
        //this.add(this.visibleSpline)

        // Crear animacion TWEEN
        // Se usan puntos entre 0 y 1 para obtener puntos de la
        // curva eliptica (o casi eliptica)
        var origin = {p: 0};
        var destination = {p: 1};

        this.movement = new TWEEN.Tween(origin).to(destination, 4000)
            .easing(TWEEN.Easing.Linear.None).onUpdate(() => {
                // Obtener nueva posicion
                var position = this.ellipticPath.getPointAt(origin.p);

                // Copiar la posicion, actualizando la del objeto
                this.ballNode.position.copy(position);
            }).repeat(Infinity).start();
    }

    createGui(gui, titleGui) {
        // Crear objeto que contiene el control de la escala de los radios
        this.guiControls = new function() {
            this.bigRadiusLength = 0;
        }

        // Crear folder que contiene los controles
        var folder = gui.addFolder(titleGui);

        // Insertar controles
        folder.add(this.guiControls, 'bigRadiusLength', 0, 25, 0.1).name('Extensión: ').onChange(() => {
            this.ellipticPath = this.createEllipticPath();
            /*
            var points = this.ellipticPath.getPoints( 100 );
            var geometryLine =  new THREE.BufferGeometry().setFromPoints( points );
            this.visibleSpline.geometry = geometryLine;
            */
        });
    }

    createEllipticPath() {
        var ellipticPath = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -5 - this.guiControls.bigRadiusLength, 0, 0 ),
            new THREE.Vector3( 0, 0, 5 ),
            new THREE.Vector3( 5 + this.guiControls.bigRadiusLength, 0, 0 ),
            new THREE.Vector3( 0, 0, -5 )
        ], true );

        return ellipticPath;
    }

    update() {
        // Actualizar radios del cilindro
        this.cylinderMesh.scale.set(1 + this.guiControls.bigRadiusLength / 5, 1, 1);

        // Actualizar TWEEN
        TWEEN.update();
    }
}
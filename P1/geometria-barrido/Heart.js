
class Heart extends THREE.Object3D {
    constructor() {
        // Llamar al constructor de la superclase
        super();

        var x = 0, y = 0;

        // Crear la forma del corazon
        var heartShape = new THREE.Shape();

        // Moverse sin dibujar
        heartShape.moveTo( x + 5, y + 5 );

        // Dibujar curvas
        heartShape.moveTo( x + 5, y + 5 );
        heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
        heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
        heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
        heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
        heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
        heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

        /**
         * Crear configurcion para el extrude
         * - amount: cuanta profundidad tiene la extrusion
         * - bevelEnabled: si tiene bisel o no (corte oblicuo)
         * - bevelSegments: numero de segmentos del bisel
         * - bevelSize: tamanio del bisel
         * - bevelThickness: grosor del bisel
         */
        var extrudeSettings = {amount: 4, bevelEnabled: true, bevelSegments: 2, bevelSize: 1, bevelThickness: 1};

        var geometry = new THREE.ExtrudeBufferGeometry( heartShape, extrudeSettings );

        // Crear material
        var material = this.createMaterial();

        // Crear mesh
        var mesh = new THREE.Mesh(geometry, material);

        // Centrar mesh
        //mesh.position.x -= 5;
        mesh.rotation.z += Math.PI;
        mesh.position.set(5, 19/2, -2);
        //mesh.position.z -= 2;        
        //mesh.position.y += 19 / 2;
        this.rotationNode = new THREE.Object3D();
        this.rotationNode.add(mesh);
        this.add(this.rotationNode)

        //this.add(mesh);
    }

    createMaterial() {
        // Crear material de un color
        var material = new THREE.MeshPhongMaterial({color: 0xff0000});

        return material;
    }

    update() {
        //this.position.set(0, 0, 0);
        //this.rotation.set(0, 0, 0);
        this.rotationNode.rotation.y += 0.01;
        this.scale.set(0.5, 0.5, 0.5);
    }
}
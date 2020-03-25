
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

        // Opciones del extrude
        var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

        var geometry = new THREE.ExtrudeBufferGeometry( heartShape, extrudeSettings );

        // Crear material
        var material = this.createMaterial();

        // Crear mesh
        var heartMesh = new THREE.Mesh(geometry, material);

        this.add(heartMesh);
    }

    createMaterial() {
        // Crear material de un color
        var material = new THREE.MeshPhongMaterial({color: 0xff0000});

        return material;
    }

    update() {
        //this.position.set(0, 0, 0);
        //this.rotation.set(0, 0, 0);
        this.scale.set(0.5, 0.5, 0.5);
    }
}
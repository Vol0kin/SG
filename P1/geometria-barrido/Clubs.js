
class Clubs extends THREE.Object3D {
    constructor() {
        // Llamar al constructor de la superclase
        super();

        // Crear forma
        var shape = this.createShape();

        /**
         * Crear configurcion para el extrude
         * - amount: cuanta profundidad tiene la extrusion
         * - bevelEnabled: si tiene bisel o no (corte oblicuo)
         * - bevelSegments: numero de segmentos del bisel
         * - bevelSize: tamanio del bisel
         * - bevelThickness: grosor del bisel
         */
        var depth = 2;
        var extrudeSettings = {amount: depth, bevelEnabled: true, bevelSegments: 3, bevelSize: 0.2, bevelThickness: 0.5};

        // Crear geometria y material
        var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        var material = this.createMeshPhongMaterial();

        // Crear base
        var base = new Base();
        base.scale.set(0.5, 0.5, 0.5);

        // Crear mesh
        var clubs = new THREE.Mesh(geometry, material);

        clubs.position.z -= depth / 2;
        clubs.scale.set(2, 2, 1);
        clubs.position.y += 4;

        var mesh = new THREE.Object3D();
        mesh.add(clubs);
        mesh.add(base);

        /**
         * 1. Nodo rotacion beta en Y
         * 2. Nodo rotacion -alfa Z + traslacion X
         * 3. Nodo rotacion alfa Z
         */
        this.nodeRotateY = new THREE.Object3D();
        this.nodeRotateTranslate = new THREE.Object3D();
        this.nodeRotateZ = new THREE.Object3D();

        this.nodeRotateY.add(mesh);
        this.nodeRotateTranslate.add(this.nodeRotateY);
        this.nodeRotateZ.add(this.nodeRotateTranslate);
        this.add(this.nodeRotateZ);
    }

    createShape() {
        var shape = new THREE.Shape();

        /*
        var c = 0.551915024494
        
        shape.moveTo(-1, 0);

        shape.bezierCurveTo(c, 1, 1, c, 1, 0); // Primer cuadrante
        shape.bezierCurveTo(1, -c, c, -1, 0, -1); // Cuarto cuadrante
        shape.bezierCurveTo(-c, -1, -1, -c, -1, 0); // Tercer cuadrante
        shape.bezierCurveTo(-1, c, -c, 1, 0, 1); // Segundo cuadrante
        */

        // Crear arco
        // x centro, y centro, radio, radian inicio, radian final, sentido horario (bool)
        shape.absarc(-1, 0, 1, 0, Math.PI / 3, true);
        shape.absarc(0, 1.6, 1, -2 * Math.PI/3, -Math.PI / 3, true);
        shape.absarc(1, 0, 1, 2* Math.PI / 3, Math.PI, true);

        return shape;
    }
    
    createMeshPhongMaterial() {
        var material = new THREE.MeshPhongMaterial({color: 0x0000ff});

        return material;
    }

    update() {
        this.nodeRotateY.rotation.y += 0.01;

        this.nodeRotateTranslate.rotation.z -= 0.01;
        this.nodeRotateTranslate.position.y = 15;
        
        this.nodeRotateZ.rotation.z += 0.01;
    }
}
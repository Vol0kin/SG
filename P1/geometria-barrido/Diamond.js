
class Diamond extends THREE.Object3D {
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
        var extrudeSettings = {amount: 4, bevelEnabled: true, bevelSegments: 3, bevelSize: 1, bevelThickness: 1};

        // Crear geometria, material y mesh
        var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        var material = this.createMaterial();

        // Crear mesh
        var mesh = new THREE.Mesh(geometry, material);

        // Ajustar mesh
        mesh.position.z -= 1;
        mesh.scale.set(0.5, 0.5, 0.5);

        // Insertar objeto en la escena
        this.add(mesh);

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

        // Establecer inicio
        var x = 0, y = 0;
        
        // Moverse sin dibujar
        shape.moveTo(x, y - 10);

        // Crear lineas que forman el rombo
        shape.lineTo(x + 5, y);
        shape.lineTo(x, y + 10);
        shape.lineTo(x - 5, y);
        shape.lineTo(x, y - 10);

        return shape;
    }

    createMaterial() {
        // Crear material de un color
        var material = new THREE.MeshPhongMaterial({color: 0xff0000});

        return material;
    }

    update() {
        this.nodeRotateY.rotation.y += 0.01;

        this.nodeRotateTranslate.rotation.z -= 0.01;
        this.nodeRotateTranslate.position.x = -15;
        
        this.nodeRotateZ.rotation.z += 0.01;
    }
}

class Rhombus extends THREE.Object3D {
    constructor() {
        // Llamar al constructor de la superclase
        super();

        // Establecer inicio
        var x = 0, y = 0;

        // Crear forma
        var shape = new THREE.Shape();

        // Moverse sin dibujar
        shape.moveTo(x, y - 10);

        // Crear lineas que forman el rombo
        shape.lineTo(x + 5, y);
        shape.lineTo(x, y + 10);
        shape.lineTo(x - 5, y);
        shape.lineTo(x, y - 10);

        /**
         * Crear configurcion para el extrude
         * - amount: cuanta profundidad tiene la extrusion
         * - bevelEnabled: si tiene bisel o no (corte oblicuo)
         * - bevelSegments: numero de segmentos del bisel
         * - bevelSize: tamanio del bisel
         * - bevelThickness: grosor del bisel
         */
        var extrudeSettings = {amount: 4, bevelEnabled: true, bevelSegments: 2, bevelSize: 1, bevelThickness: 1};

        // Crear geometria
        var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);

        // Crear material
        var material = this.createMaterial();

        // Crear mesh
        var mesh = new THREE.Mesh(geometry, material);

        // Insertar objeto en la escena
        this.add(mesh);
    }

    createMaterial() {
        // Crear material de un color
        var material = new THREE.MeshPhongMaterial({color: 0xff0000});

        return material;
    }

    update() {
        this.rotation.set(0, 0, 0);
        this.position.set(0, 0, 0);
        this.scale.set(1, 1, 1);
    }
}
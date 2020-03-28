
class Clover extends THREE.Object3D {
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
        var extrudeSettings = {amount: 0.5, bevelEnabled: true, bevelSegments: 3, bevelSize: 0.2, bevelThickness: 0.5};

        // Crear geometria y material
        var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        var material = this.createMeshPhongMaterial();

        // Crear mesh
        var circle1 = new THREE.Mesh(geometry, material);
        var circle2 = new THREE.Mesh(geometry, material);
        var circle3 = new THREE.Mesh(geometry, material);
        circle1.position.x -= 0.9;
        circle2.position.x += 0.9;
        circle3.position.y += 1.43;

        var mesh = new THREE.Object3D();

        mesh.add(circle1);
        mesh.add(circle2);
        mesh.add(circle3);

        

        this.add(mesh);
    }

    createShape() {
        var shape = new THREE.Shape();

        var c = 0.551915024494

        // Dibujar primer círculo
        /*shape.moveTo(-2.5, 2.5);

        shape.quadraticCurveTo(0, 2.5, 0, 0);
        shape.quadraticCurveTo(0, -2.5, -2.5, -2.5);
        shape.quadraticCurveTo(-5, -2.5, -5, 0);
        shape.quadraticCurveTo(-5, 2.5, -2.5, 2.5);

        // Dibujar segundo circulo
        shape.moveTo(2.5, 2.5);

        shape.quadraticCurveTo(5, 2.5, 5, 0);
        shape.quadraticCurveTo(5, -2.5, 2.5, -2.5);
        shape.quadraticCurveTo(0, -2.5, 0, 0);
        shape.quadraticCurveTo(0, 2.5, 2.5, 2.5);

        // Dibujar tercer circulo
        shape.moveTo(0, 2.5);

        shape.quadraticCurveTo(-2.5, 2.5, -2.5, 5); // Tercer cuadrante
        shape.quadraticCurveTo(-2.5, 7.5, 0, 7.5); // Segundo cuadrante
        shape.quadraticCurveTo(2.5, 7.5, 2.5, 5); // Primer cuadrante
        shape.quadraticCurveTo(2.5, 2.5, 0, 2.5); // Cuarto cuadrante*/

        shape.moveTo(0, 1);
        shape.bezierCurveTo(c, 1, 1, c, 1, 0);
        shape.bezierCurveTo(1, -c, c, -1, 0, -1);
        shape.bezierCurveTo(-c, -1, -1, -c, -1, 0);
        shape.bezierCurveTo(-1, c, -c, 1, 0, 1);


        return shape;
    }
    
    createMeshPhongMaterial() {
        var material = new THREE.MeshPhongMaterial({color: 0xff0000});

        return material;
    }

    update() {
        this.position.set(0, 0, 0);
        this.rotation.set(0, 0, 0);
        this.scale.set(1, 1, 1);
    }
}
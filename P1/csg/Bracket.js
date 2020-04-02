/**
 * Clase que representa una escuadra
 */
class Bracket extends THREE.Object3D {
    constructor() {
        // Llamar al constructor de la superclase
        super();

        // Crear material
        var material = this.createMaterial();

        // Definir centro del lugar donde se hara el agujero
        var holeCenter = 8;

        // Crear escuadra con extrusion sin biselado
        var width = 10;
        var thickness = 0.5;
        var depth = 2;

        var shape = this.createShape(width, thickness);
        var extrudeSettings = {depth: depth, bevelEnabled: false};

        var bracket = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        bracket.translate(0, 0, -depth / 2)

        // Crear cilindros y posicionarlos
        var radius = 0.25;
        var height = 0.25;

        var cylinder1 = new THREE.CylinderGeometry(radius, radius, height, 15);
        cylinder1.translate(holeCenter, -height/2, 0);

        var cylinder2 = new THREE.CylinderGeometry(radius, radius, height, 15);
        cylinder2.rotateZ(Math.PI / 2);
        cylinder2.translate(height / 2, -holeCenter, 0);

        // Crear esferas y posicionarlas
        var radius = 0.6;

        var sphere1 = new THREE.SphereGeometry(radius, 15, 15);
        sphere1.translate(holeCenter, -height / 2 - radius, 0);

        var sphere2 = new THREE.SphereGeometry(radius, 15, 15);
        sphere2.translate(height / 2 + radius, -holeCenter, 0);

        // Crear objetos BSP
        var bracketBSP = new ThreeBSP(bracket);
        var cylinder1BSP = new ThreeBSP(cylinder1);
        var cylinder2BSP = new ThreeBSP(cylinder2);
        var sphere1BSP = new ThreeBSP(sphere1);
        var sphere2BSP = new ThreeBSP(sphere2);

        // Hacer operaciones
        var partial = bracketBSP.subtract(cylinder1BSP);
        partial = partial.subtract(cylinder2BSP);
        partial = partial.subtract(sphere1BSP);
        var result = partial.subtract(sphere2BSP);

        // Crear mesh y calcular normales de cara y vertices
        this.mesh = result.toMesh(material);
        this.mesh.geometry.computeFaceNormals();
        this.mesh.geometry.computeVertexNormals();

        this.add(this.mesh);
    }

    createMaterial() {
        var material = new THREE.MeshNormalMaterial();

        // Usar sombreado plano e indicar que se tiene que actualizar en cada
        // frame
        material.flatShading = true;
        material.needsUpdate = true;

        return material;
    }

    createShape(width, thickness) {
        var shape = new THREE.Shape();

        shape.lineTo(width, 0);
        shape.lineTo(width, -thickness);
        shape.lineTo(thickness + 1, -thickness);
        shape.quadraticCurveTo(thickness, -thickness, thickness, -thickness - 1);
        shape.lineTo(thickness, -width);
        shape.lineTo(0, -width);
        shape.lineTo(0, 0);

        return shape;
    }

    update() {
        var rotationInc = 0.01;

        this.mesh.rotation.y += rotationInc;
        this.mesh.rotation.z += rotationInc;
        this.mesh.position.set(-0.25, 5, 0);
    }
}
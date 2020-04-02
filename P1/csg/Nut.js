/**
 * Clase que representa una tuerca
 */
class Nut extends THREE.Object3D {
    constructor() {
        // Llamar al constructor de la superclase
        super();

        // Crear material
        var material = this.createMaterial();

        // Crear tuerca
        var radius = 5;
        var height = 3.5;
        var nut = new THREE.CylinderGeometry(radius, radius, height, 6);
        nut.rotateY(Math.PI / 3);

        // Crear esfera
        var radius = 5.1;
        var sphere = new THREE.SphereGeometry(radius, 25, 25);

        // Crear dientes de sierra
        var points = this.createPoints(2.5, height, 10);
        var sawtooth = new THREE.LatheGeometry(points, 25, 0, 2 * Math.PI);

        // Crear objetos BSP
        var nutBSP = new ThreeBSP(nut);
        var sphereBSP = new ThreeBSP(sphere);
        var sawtoothBSP = new ThreeBSP(sawtooth);

        // Operaciones constructivas
        var partial = nutBSP.intersect(sphereBSP);
        var result = partial.subtract(sawtoothBSP);

        // Obtener malla y calcular normales de cara y vertices
        this.mesh = result.toMesh(material);
        this.mesh.geometry.computeFaceNormals();
        this.mesh.geometry.computeVertexNormals();

        this.add(this.mesh);
    }

    createMaterial() {
        var material = new THREE.MeshNormalMaterial();

        material.flatShading = true;
        material.needsUpdate = true;

        return material;
    }

    createPoints(radius, height, numTriangles) {
        var points = [];
        var sideLength = height / numTriangles;
        var startY = -height / 2;
        var peakX = radius + sideLength * Math.sin(Math.PI / 3);

        points.push(new THREE.Vector3(0, startY, 0));
        

        // Dientes de sierra
        for (let i = 0; i < numTriangles; i++) {
            points.push(new THREE.Vector3(radius, startY + sideLength * i, 0));
            points.push(new THREE.Vector3(peakX, startY + sideLength / 2 + sideLength * i));
        }

        points.push(new THREE.Vector3(radius, height / 2, 0));
        points.push(new THREE.Vector3(0, height / 2, 0));

        return points;
    }

    update() {
        var rotationInc = 0.01;

        this.mesh.rotation.y += rotationInc;
        this.mesh.rotation.x += rotationInc;
        this.mesh.position.set(20, 0, 0);
    }
}
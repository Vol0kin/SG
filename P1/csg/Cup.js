
class Cup extends THREE.Object3D {
    constructor(gui, titleGui) {
        // Llamar al constructor de la superclase
        super();

        // Crear material que asigna color segun el vector normal
        var material = this.createMaterial();

        // Crear geometrias
        var cylinder1 = new THREE.CylinderGeometry(7, 7, 15, 40);
        var cylinder2 = new THREE.CylinderGeometry(6.5, 6.5, 14.5, 40);
        var torus = new THREE.TorusGeometry(5, 1.5, 16, 100);

        // Colocar correctamente las geometrías
        cylinder2.translate(0, 0.25, 0);
        torus.translate(7, 0, 0);

        var cylinder1BSP = new ThreeBSP(cylinder1);
        var cylinder2BSP = new ThreeBSP(cylinder2);
        var torusBSP = new ThreeBSP(torus);

        var partial = cylinder1BSP.union(torusBSP); // Union cilindro exterior con toro
        var result = partial.subtract(cylinder2BSP); // Restar al resultado el cilindro interior

        // Obtener mesh y normales (primero de caras y luego de vertices)
        var mesh = result.toMesh(material);
        mesh.geometry.computeFaceNormals();
        mesh.geometry.computeVertexNormals();

        // Crear nodo de transformaciones
        this.translateRotate = new THREE.Object3D();

        this.translateRotate.add(mesh);
        this.add(this.translateRotate);
    }

    createMaterial() {
        var material = new THREE.MeshNormalMaterial();

        // Establecer que se va a usar sombreado plano y que se tiene que actualizar
        // en cada frame
        material.flatShading = true;
        material.needsUpdate = true;

        return material;
    }

    update() {
        var rotationInc = 0.01;

        this.translateRotate.rotation.y += rotationInc;
        this.translateRotate.rotation.x += rotationInc;
        this.translateRotate.position.set(-20, 7.5, 0);
    }
}
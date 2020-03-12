
class Cup extends THREE.Object3D {
    constructor(gui, titleGui) {
        // Llamar al constructor de la superclase
        super();

        // Crear material que asigna color segun el vector normal
        var material = new THREE.MeshNormalMaterial();

        // Establecer que se va a usar sombreado plano y que se tiene que actualizar
        // en cada frame
        material.flatShading = true;
        material.needsUpdate = true;

        // Crear geometrias
        var sphere1 = new THREE.SphereGeometry(1.0, 10, 10);
        var sphere2 = new THREE.SphereGeometry(1.0, 10, 10);

        // Trasladar geometria de la esfera 2
        sphere2.translate(1.0, 0.0, 0.0);

        // Crear versiones de la geometria en ThreeBSP
        var sphere1bsp = new ThreeBSP(sphere1);
        var sphere2bsp = new ThreeBSP(sphere2);

        // Sustraer la segunda esfera a la primera
        var result = sphere1bsp.subtract(sphere2bsp);

        // Obtener mesh y normales
        var mesh = result.toMesh(material);
        mesh.geometry.computeFaceNormals();
        mesh.geometry.computeVertexNormals();

        this.add(mesh);        
    }

    update() {
        this.position.set(0, 0, 0);
        this.rotation.set(0.0, 0.0, 0.0);
        this.scale.set(1, 1, 1);
    }
}
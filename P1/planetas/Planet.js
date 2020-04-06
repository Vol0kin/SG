/**
 * Clase que representa un planeta
 */
class Planet extends THREE.Object3D {
    constructor(radius, texturePath) {
        // Llamar al constructor de la superclase
        super();

        // Crear geometria del planeta
        var geometry = new THREE.SphereGeometry(radius, 25, 25);

        // Crear material con la textura
        var texture = new THREE.TextureLoader().load(texturePath);
        var material = new THREE.MeshPhongMaterial({map: texture});

        // Crear mesh
        var mesh = new THREE.Mesh(geometry, material);

        // Insertar mesh en la escena
        this.add(mesh);
    }
}
/**
 * Clase que representa al pendulo pequeño
 */
class SmallPendulum extends THREE.Object3D {
    constructor() {
        // Llamar al constructor de la superclase
        super();

        // Crear materiales
        var blueMaterial = new THREE.MeshPhongMaterial({color: 0x0000ff});
        var grayMaterial = new THREE.MeshPhongMaterial({color: 0x808080});

        // Crear cubo azul y ponerlo debajo de Y = 0
        var width = 2;
        var height = 10;
        var depth = 0.5;
        this.blueBoxScale = 1;

        var blueBoxGeometry = new THREE.BoxGeometry(width, height, depth);
        var blueBox = new THREE.Mesh(blueBoxGeometry, blueMaterial);
        blueBox.position.y -= height / 2;

        // Crear engranaje
        var gearDepth = 0.25;
        var gearGeometry = new THREE.CylinderGeometry(0.5, 0.5, gearDepth, 8);

        var gear = new THREE.Mesh(gearGeometry, grayMaterial);
        gear.rotation.x = Math.PI / 2;
        gear.position.z += depth / 2 + gearDepth / 2;

        // Crear nodo para las transformaciones de la caja azul
        this.blueBoxNode = new THREE.Object3D();
        this.blueBoxNode.add(blueBox);

        this.add(this.blueBoxNode);
        this.add(gear);
    }

    update() {
        // Primero escalar y despues subir una unidad el nodo
        this.blueBoxNode.scale.set(1, this.blueBoxScale, 1);
        this.blueBoxNode.position.y = 1;
    }
}
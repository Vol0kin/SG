/**
 * Clase que representa el pendulo grande
 */
class BigPendulum extends THREE.Object3D {
    constructor() {
        // Llamar al constructor de la superclase
        super();

        // Crear materiales
        var redMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
        var greenMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00});
        var grayMaterial = new THREE.MeshPhongMaterial({color: 0x808080});

        // Crear cubo verde de arriba
        this.greenBoxHeight = 4;
        var width = 3;
        var depth = 1;

        var boxGeometry = new THREE.BoxGeometry(width, this.greenBoxHeight, depth);
        var greenBoxUp = new THREE.Mesh(boxGeometry, greenMaterial);

        // Crear cubo rojo y hacer que la parte superior este pegada
        // al eje Y
        this.redBoxHeight = 5;
        this.redBoxScaleY = 1;

        var redBoxGeometry = new THREE.BoxGeometry(width, this.redBoxHeight, depth);
        var redBox = new THREE.Mesh(redBoxGeometry, redMaterial);

        redBox.position.y -= this.redBoxHeight / 2;

        // Insertar cubo rojo en un nodo
        this.redBoxNode = new THREE.Object3D();
        this.redBoxNode.add(redBox);

        // Crear cubo verde de abajo
        this.greenBoxDown = greenBoxUp.clone();

        // Crear engranaje
        var gearDepth = 0.5;
        var gearGeometry = new THREE.CylinderGeometry(1, 1, gearDepth, 8);

        var gear = new THREE.Mesh(gearGeometry, grayMaterial);
        gear.rotation.x = Math.PI / 2;
        gear.position.z += depth / 2 + gearDepth / 2;

        // Insertar nodos/mallas en la escena
        this.add(greenBoxUp);
        this.add(this.redBoxNode);
        this.add(this.greenBoxDown);
        this.add(gear);
    }

    update() {
        // Actualizar cubo rojo
        this.redBoxNode.scale.set(1, this.redBoxScaleY, 1);
        this.redBoxNode.position.y = -this.greenBoxHeight / 2;

        // Actualizar cubo verde
        this.greenBoxDown.position.y = -this.greenBoxHeight - this.redBoxHeight * this.redBoxScaleY;
    }
}
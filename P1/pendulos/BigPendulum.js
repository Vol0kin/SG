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
        var greenSegmentUp = new THREE.Mesh(boxGeometry, greenMaterial);

        // Crear cubo rojo y hacer que la parte superior este pegada
        // al eje Y
        this.redSegmentHeight = 5;
        this.redSegmentScaleY = 1;

        var redSegmentGeometry = new THREE.BoxGeometry(width, this.redSegmentHeight, depth);
        var redSegment = new THREE.Mesh(redSegmentGeometry, redMaterial);

        redSegment.position.y -= this.redSegmentHeight / 2;

        // Insertar cubo rojo en un nodo
        this.redSegmentNode = new THREE.Object3D();
        this.redSegmentNode.add(redSegment);

        // Crear cubo verde de abajo
        this.greenSegmentDown = greenSegmentUp.clone();

        // Crear engranaje
        var gearDepth = 0.5;
        var gearGeometry = new THREE.CylinderGeometry(1, 1, gearDepth, 8);

        var gear = new THREE.Mesh(gearGeometry, grayMaterial);
        gear.rotation.x = Math.PI / 2;
        gear.position.z += depth / 2 + gearDepth / 2;

        // Insertar nodos/mallas en la escena
        this.add(greenSegmentUp);
        this.add(this.redSegmentNode);
        this.add(this.greenSegmentDown);
        this.add(gear);
    }

    update() {
        // Actualizar escala del segmento rojo, su posicion y actualizar su altura
        this.redSegmentNode.scale.set(1, this.redSegmentScaleY, 1);
        this.redSegmentNode.position.y = -this.greenBoxHeight / 2;
        this.redSegmentHeight = 5 * this.redSegmentScaleY;

        // Actualizar posicion del segmento verde inferior
        this.greenSegmentDown.position.y = -this.greenBoxHeight - this.redSegmentHeight;
    }
}
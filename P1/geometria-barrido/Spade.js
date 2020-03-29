
class Spade extends THREE.Object3D {
    constructor() {
        // Llamar al constructor de la superclase
        super();

        // Crear la forma del corazon
        var shape = this.createShape();

        /**
         * Crear configurcion para el extrude
         * - amount: cuanta profundidad tiene la extrusion
         * - bevelEnabled: si tiene bisel o no (corte oblicuo)
         * - bevelSegments: numero de segmentos del bisel
         * - bevelSize: tamanio del bisel
         * - bevelThickness: grosor del bisel
         */
        var extrudeSettings = {amount: 4, bevelEnabled: true, bevelSegments: 2, bevelSize: 1, bevelThickness: 1};

        // Crear geometria, material y mesh
        var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
        var material = this.createMaterial();

        // Crear corazon y ajustarlo
        var heart = new THREE.Mesh(geometry, material);

        // Centrar corazon
        heart.scale.set(0.5, 0.5, 0.5);
        heart.position.set(-5/2, -19/4, -1);

        // Crear nodo para escalar y subir el corazon
        var heartTranslateScale = new THREE.Object3D();
        heartTranslateScale.add(heart);
        heartTranslateScale.scale.set(0.6, 0.6, 1);
        heartTranslateScale.position.y += 4.5;
        
        // Crear base
        var base = new Base();
        base.scale.set(0.5, 0.5, 0.5);

        // Crear mesh
        var mesh = new THREE.Object3D();

        mesh.add(heartTranslateScale);
        mesh.add(base);        

        /**
         * 1. Nodo rotacion beta en Y
         * 2. Nodo rotacion -alfa Z + traslacion X
         * 3. Nodo rotacion alfa Z
         */
        this.nodeRotateY = new THREE.Object3D();
        this.nodeRotateTranslate = new THREE.Object3D();
        this.nodeRotateZ = new THREE.Object3D();

        this.nodeRotateY.add(mesh);
        this.nodeRotateTranslate.add(this.nodeRotateY);
        this.nodeRotateZ.add(this.nodeRotateTranslate);
        this.add(this.nodeRotateZ);
        
    }

    createMaterial() {
        // Crear material de un color
        var material = new THREE.MeshPhongMaterial({color: 0x0000ff});

        return material;
    }

    createShape() {
        var shape = new THREE.Shape();

        // Establecer puntos iniciales
        var x = 0, y = 0;

        // Moverse sin dibujar
        shape.moveTo( x + 5, y + 5 );

        // Dibujar curvas
        shape.moveTo( x + 5, y + 5 );
        shape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
        shape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
        shape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
        shape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
        shape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
        shape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

        return shape;
    }

    update() {
        this.nodeRotateY.rotation.y += 0.01;

        this.nodeRotateTranslate.rotation.z -= 0.01;
        this.nodeRotateTranslate.position.y = -15;
        
        this.nodeRotateZ.rotation.z += 0.01;
    }
}
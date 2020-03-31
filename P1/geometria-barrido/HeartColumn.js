
class HeartColumn extends THREE.Object3D {
    constructor() {
        // Llamar al constructor de la super clase
        super();

        // Crear forma del corazon
        var heartShape = this.createShape();

        // Crear puntos de la curva
        var curvePoints = this.createCurvePoints();

        // Crear camino
        var path = new THREE.CatmullRomCurve3(curvePoints);
        var options = { steps : 50 , curveSegments : 10 , extrudePath : path };
        var geometry = new THREE.ExtrudeGeometry(heartShape, options);

        var material = this.createMeshPhongMaterial();


        // Create the final object to add to the scene
        var mesh = new THREE.Mesh( geometry, material );
        mesh.scale.set(0.2, 0.2, 0.2);
        mesh.position.set(2, -12, 3.3);

        /**
         * 1. Nodo rotacion alfa X + rotacion alfa Y + traslacion X
         */
        this.nodeRotateTranslate = new THREE.Object3D();

        this.nodeRotateTranslate.add(mesh);

        this.add(this.nodeRotateTranslate);
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

    createMeshPhongMaterial() {
        var material = new THREE.MeshPhongMaterial({color: 0x00ff00});

        return material;
    }

    createCurvePoints() {
        var points = [];
        
        points.push(new THREE.Vector3(0, -20, 0));
        points.push(new THREE.Vector3(5, 0, 0));
        points.push(new THREE.Vector3(8, 15, 0));
        points.push(new THREE.Vector3(5, 30, 5));
        points.push(new THREE.Vector3(-5, 45, 5));
        points.push(new THREE.Vector3(-5, 60, -10));
        points.push(new THREE.Vector3(-5, 75, -10));
        points.push(new THREE.Vector3(0, 90, 0));
        points.push(new THREE.Vector3(10, 105, 0));
        points.push(new THREE.Vector3(10, 120, 0));

        return points;
    }

    update() {
        this.nodeRotateTranslate.rotation.x += 0.01;
        this.nodeRotateTranslate.rotation.y += 0.01;
        this.nodeRotateTranslate.position.x = 30;
    }
}

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

        var material = new THREE.MeshNormalMaterial();
        material.flatShading = true;
        material.needsUpdate = true;


        // Create the final object to add to the scene
        var curveObject = new THREE.Mesh( geometry, material );

        this.add(curveObject);
    }

    createShape() {
        // Puntos iniciales
        var x = 0, y = 0;

        // Crear la forma del corazon
        var heartShape = new THREE.Shape();

        // Moverse sin dibujar
        heartShape.moveTo( x + 5, y + 5 );

        // Dibujar curvas
        heartShape.moveTo( x + 5, y + 5 );
        heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
        heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
        heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
        heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
        heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
        heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

        return heartShape;
    }

    createCurvePoints() {
        var points = [];

        points.push(new THREE.Vector3( -10, 0, 10 ));
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(5, -5, 5));
        points.push(new THREE.Vector3(10, 0, 10));
        points.push(new THREE.Vector3(10, 10, 10)); // Punto extra 1
        //points.push(new THREE.Vector3(5, 15, 5)); // Punto extra 2
        points.push(new THREE.Vector3(0, 20, 0)); // Punto extra 3
        points.push(new THREE.Vector3(0, 50, 0)); // Punto extra 4

        return points;
    }

    update() {
        this.position.set(0, 0, 0);
        this.rotation.set(0, 0, 0);
        this.scale.set(1, 1, 1);
    }
}
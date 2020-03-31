
class ClubsColumn extends THREE.Object3D {
    constructor() {
        // Llamar al constructor de la superclase
        super();

        // Crear forma del corazon
        var heartShape = this.createShape();

        // Crear puntos de la curva
        var curvePoints = this.createCurvePoints();

        // Crear camino
        var path = new THREE.CatmullRomCurve3(curvePoints);
        var options = { steps : 50 , curveSegments : 10 , extrudePath : path };

        // Crear geometria y material
        var geometry = new THREE.ExtrudeGeometry(heartShape, options);
        var material = this.createMeshPhongMaterial();


        // Crear y posicionar mesh
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, -5, -0.75);

        /**
         * 1. Nodo rotacion alfa X + rotacion alfa Y + traslacion X
         */
        this.nodeRotateTranslate = new THREE.Object3D();

        this.nodeRotateTranslate.add(mesh);

        this.add(this.nodeRotateTranslate);
    }

    createShape() {
        var shape = new THREE.Shape();

        /*
        var c = 0.551915024494
        
        shape.moveTo(-1, 0);

        shape.bezierCurveTo(c, 1, 1, c, 1, 0); // Primer cuadrante
        shape.bezierCurveTo(1, -c, c, -1, 0, -1); // Cuarto cuadrante
        shape.bezierCurveTo(-c, -1, -1, -c, -1, 0); // Tercer cuadrante
        shape.bezierCurveTo(-1, c, -c, 1, 0, 1); // Segundo cuadrante
        */

        // Crear arco
        // x centro, y centro, radio, radian inicio, radian final, sentido horario (bool)
        shape.absarc(-1, 0, 1, 0, Math.PI / 3, true);
        shape.absarc(0, 1.6, 1, -2 * Math.PI/3, -Math.PI / 3, true);
        shape.absarc(1, 0, 1, 2* Math.PI / 3, Math.PI, true);

        return shape;
    }

    createMeshPhongMaterial() {
        var material = new THREE.MeshPhongMaterial({color: 0x00ff00});

        return material;
    }

    createCurvePoints() {
        var points = [];
        
        points.push(new THREE.Vector3(0.5, -2, 0));
        points.push(new THREE.Vector3(0.5, 0, 0));
        points.push(new THREE.Vector3(0.8, 1.5, 0));
        points.push(new THREE.Vector3(0.5, 3.0, 0.5));
        points.push(new THREE.Vector3(-0.5, 4.5, 0.5));
        points.push(new THREE.Vector3(-0.5, 6, -1));
        points.push(new THREE.Vector3(-0.5, 7.5, -1));
        points.push(new THREE.Vector3(0, 9, 0));
        points.push(new THREE.Vector3(1, 10.5, 0));
        points.push(new THREE.Vector3(1, 12, 0));

        return points;
    }

    update() {
        this.nodeRotateTranslate.rotation.x += 0.01;
        this.nodeRotateTranslate.rotation.y += 0.01;
        this.nodeRotateTranslate.position.x = -30;
    }
}
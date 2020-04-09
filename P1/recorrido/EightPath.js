/**
 * Clase que representa un recorrido en forma de 8
 */
class EightPath extends THREE.Object3D {
    constructor() {
        // Llamar al constructor de la superclase
        super();

        // Crear curva y objeto linea
        var curve = this.createCurve();

        var points = curve.getPoints(100);
        var curveGeometry = new THREE.BufferGeometry().setFromPoints(points);

        var curveMaterial = new THREE.LineBasicMaterial({color: 0xff0000});

        var curveObject = new THREE.Line(curveGeometry, curveMaterial);

        // Crear cono que se deslizara por la curva
        var coneGeometry = new THREE.ConeGeometry(0.5, 1.5, 3);
        var texture = new THREE.TextureLoader().load('../imgs/textura-ajedrezada.jpg');
        var coneMaterial = new THREE.MeshPhongMaterial({map: texture});

        var cone = new THREE.Mesh(coneGeometry, coneMaterial);
        cone.rotation.set(Math.PI / 2, Math.PI,0);

        var coneNode = new THREE.Object3D();
        coneNode.add(cone);

        this.add(curveObject);
        this.add(coneNode);

        var origin1 = {p: 0};
        var destination1 = {p: 0.5};

        var movement1 = new TWEEN.Tween(origin1).to(destination1, 4000)
            .easing(TWEEN.Easing.Quadratic.InOut).onUpdate(() => {
            // Obtener nueva posicion
            var position = curve.getPointAt(origin1.p);

            // Copiar la posicion, actualizando la del objeto
            coneNode.position.copy(position);

            // Orientar correctamente el objeto
            var tangent = curve.getTangentAt(origin1.p);
            position.add(tangent);

            coneNode.lookAt(position);
        });

        var origin2 = {p: 0.5};
        var destination2 = {p: 1};
        
        var movement2 = new TWEEN.Tween(origin2).to(destination2, 8000)
            .easing(TWEEN.Easing.Quadratic.InOut).onUpdate(() => {
            // Obtener nueva posicion
            var position = curve.getPointAt(origin2.p);

            // Copiar la posicion, actualizando la del objeto
            coneNode.position.copy(position);

            // Orientar correctamente el objeto
            var tangent = curve.getTangentAt(origin2.p);
            position.add(tangent);

            coneNode.lookAt(position);
        }).onComplete(() => {
            movement1.start();
        });

        movement1.chain(movement2);
        movement1.start();
    }

    createCurve() {
        var curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 7, 6),
            new THREE.Vector3(3, 5, 8),
            new THREE.Vector3(5, 4, 9),
            new THREE.Vector3(7, 3, 9),
            new THREE.Vector3(9, 2.5, 8),
            new THREE.Vector3(10, 2.75, 7),
            new THREE.Vector3(11, 3, 5),
            new THREE.Vector3(12, 3.25, 3),
            new THREE.Vector3(12, 3.75, 1),
            new THREE.Vector3(11, 4.25, -0.5),
            new THREE.Vector3(9, 5, -1.5),
            new THREE.Vector3(5, 7, -2),
            new THREE.Vector3(0, 10, 0), // A partir de aqui, 12 puntos mas
            new THREE.Vector3(-0.5, 11, 3.5),
            new THREE.Vector3(-1, 12, 5.5),
            new THREE.Vector3(-1.5, 13, 8),
            new THREE.Vector3(-4, 12.5, 9),
            new THREE.Vector3(-5, 12.25, 9),
            new THREE.Vector3(-7, 11.5, 9),
            new THREE.Vector3(-9, 10.5, 9.5),
            new THREE.Vector3(-11, 10, 8.5),
            new THREE.Vector3(-13, 9.5, 6),
            new THREE.Vector3(-10, 9, 3),
            new THREE.Vector3(-5, 8, 2),
            new THREE.Vector3(-2, 7.5, 4)
        ], true);

        return curve;
    }

    update() {
        TWEEN.update();
    }
}
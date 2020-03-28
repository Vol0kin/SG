
class Base extends THREE.Object3D {
    constructor() {
        // Llamar al constructor de la superclase
        super();

        // Crear puntos que determinan el perfil del objeto
        var points = this.createPoints();

        // Crear geometria
        var geometry = new THREE.LatheGeometry(points, 30, 0, Math.PI * 2);

        // Crear material
        var material = this.createMeshPhongMaterial();

        // Crear objeto
        var mesh = new THREE.Mesh(geometry, material);

        this.add(mesh);
    }

    createPoints() {
        var points = [];

        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(4, 0, 0));
        points.push(new THREE.Vector3(4, 0.5, 0))
        points.push(new THREE.Vector3(3, 0.5, 0));
        points.push(new THREE.Vector3(0.5, 3, 0));
        points.push(new THREE.Vector3(0.5, 10, 0));
        points.push(new THREE.Vector3(0, 10, 0));

        return points;
    }

    createMeshPhongMaterial() {
        // Crear material de un color
        var material = new THREE.MeshPhongMaterial({color: 0xff0000});

        return material;
    }

    update() {
        this.position.set(0, 0, 0);
        this.rotation.set(0, 0 , 0);
        this.scale.set(1, 1, 1);
    }
}
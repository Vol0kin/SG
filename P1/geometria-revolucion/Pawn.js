
class Pawn extends THREE.Object3D {
    constructor(gui, titleGui) {
        // Llamar al constructor de la superclase
        super();

        // Crear la parte de la GUI asociada al objeto
        this.createGui(gui, titleGui);

        // Crear los puntos
        this.createPoints();

        // Crear la geometria
        var geometry = this.createLatheGeometry();
        var material = this.createMaterial();

        // Crear la malla
        this.mesh = new THREE.Mesh(geometry, material);
    }

    createPoints() {
        this.points = [];

        this.points.add(new THREE.Vector3D(0.0, -1.4, 0.0));
        this.points.add(new THREE.Vector3D(1.0, -1.4, 0.0));
        this.points.add(new THREE.Vector3D(1.0, -1.1, 0.0));
        this.points.add(new THREE.Vector3D(0.5, -0.7, 0.0));
        this.points.add(new THREE.Vector3D(0.4, -0.4, 0.0));
        this.points.add(new THREE.Vector3D(0.4, 0.5, 0.0));
        this.points.add(new THREE.Vector3D(0.5, 0.6, 0.0));
        this.points.add(new THREE.Vector3D(0.3, 0.6, 0.0));
        this.points.add(new THREE.Vector3D(0.5, 0.8, 0.0));
        this.points.add(new THREE.Vector3D(0.55, 1.0, 0.0));
        this.points.add(new THREE.Vector3D(0.5, 1.2, 0.0));
        this.points.add(new THREE.Vector3D(0.3, 1.4, 0.0));
        this.points.add(new THREE.Vector3D(0.0, 1.4, 0.0));
    }

    createLatheGeometry() {
        return new THREE.LatheGeometry(this.points, 3);
    }

    createMaterial() {
        var material = new THREE.MeshNormalMaterial();

        // Establecer que se va a usar sombreado plano y que se tiene que actualizar
        // en cada frame
        material.flatShading = true;
        material.needsUpdate = true;

        return material;
    }

    createGui(gui, titleGui) {
        this.guiControls = new function() {
            this.resolution = 3;
            this.
        }
    }
}
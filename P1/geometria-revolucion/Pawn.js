
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

        // Insertar en el grafo
        this.add(this.mesh);

        // Subir el mesh para que este por encima del suelo
        this.mesh.position.y = 2.0;
    }

    createPoints() {
        // Crear lista con los puntos
        this.points = [];

        this.points.push(new THREE.Vector3(0.0, -1.4, 0.0));
        this.points.push(new THREE.Vector3(1.0, -1.4, 0.0));
        this.points.push(new THREE.Vector3(1.0, -1.1, 0.0));
        this.points.push(new THREE.Vector3(0.5, -0.7, 0.0));
        this.points.push(new THREE.Vector3(0.4, -0.4, 0.0));
        this.points.push(new THREE.Vector3(0.4, 0.5, 0.0));
        this.points.push(new THREE.Vector3(0.5, 0.6, 0.0));
        this.points.push(new THREE.Vector3(0.3, 0.6, 0.0));
        this.points.push(new THREE.Vector3(0.5, 0.8, 0.0));
        this.points.push(new THREE.Vector3(0.55, 1.0, 0.0));
        this.points.push(new THREE.Vector3(0.5, 1.2, 0.0));
        this.points.push(new THREE.Vector3(0.3, 1.4, 0.0));
        this.points.push(new THREE.Vector3(0.0, 1.4, 0.0));
    }

    createLatheGeometry() {
        // Crear la geometria (puntos, segmentos, inicio, longitud)
        return new THREE.LatheGeometry(this.points, this.guiControls.segments, 0, this.guiControls.phiLength);
    }

    createLineGeometry() {
        // Crear geometria nueva
        var lineGeometry = new THREE.Geometry();

        // Insertar vertices en la geometria
        lineGeometry.vertices = this.points;

        // Crear material para la linea (color azul)
        var material = new THREE.LineBasicMaterial({color:0x0000ff})

        // Crear linea
        var line = new THREE.Line(lineGeometry, material);

        // Subir linea sobre el origen y rotarla
        line.position.y = 2.0;
        line.rotation.y = Math.PI * 3 / 2;

        return line;
    }

    createMaterial() {
        var material = new THREE.MeshNormalMaterial();

        // Establecer que se va a usar sombreado plano y que se tiene que actualizar
        // en cada frame
        material.flatShading = true;
        material.needsUpdate = true;

        // Establecer que el material se tiene que ver tanto por dentro
        // como por fuera
        material.side = THREE.DoubleSide;

        return material;
    }

    createGui(gui, titleGui) {
        // Crear los controles
        this.guiControls = new function() {
            this.segments = 3;
            this.phiLength = 1;
        }

        // Crear folder que agrupa los controles anteriores
        var folder = gui.addFolder(titleGui);

        // Insertar botones para los controles
        folder.add(this.guiControls, 'segments', 3, 40, 1).name('Resolución: ').onChange(() => {this.recreateGeometry()});
        folder.add(this.guiControls, 'phiLength', 0.0, 2 * Math.PI, 0.1).name('Ángulo: ').onChange(() => {this.recreateGeometry()});
    }

    recreateGeometry() {
        var newGeo = this.createLatheGeometry();
        this.mesh.geometry = newGeo;
    }

    update() {
        this.position.set(0,0,0);
        this.rotation.set(0,0,0);
        this.scale.set(1,1,1);
    }
}
/**
 * Clase que representa el sistema solar
 */
class SolarSystem extends THREE.Object3D {
    constructor() {
        // Llamar al constructor de la superclase
        super();

        // Crear tierra
        var earth = new Planet(3, '../imgs/tierra.jpg');
        earth.position.y = 5;
        earth.rotation.y = - Math.PI / 2;

        // Crear otros planetas
        // Crear planeta cercano y situarlo a la misma altura que la tierra
        var closePlanet = new Planet(2, '../imgs/cara.jpg');
        closePlanet.rotation.y = Math.PI / 2;
        closePlanet.position.y = 5;

        // Crear planetas medio y lejano clonando el cercano
        this.midPlanet = closePlanet.clone();
        this.farPlanet = closePlanet.clone();

        // Establecer planetas en sus correspondientes posiciones
        closePlanet.position.z = 7.5;
        this.midPlanet.position.z = 15;
        this.farPlanet.position.z = 22.5;

        // Crear nodo que agrupa a todos los planetas
        this.solarSystem = new THREE.Object3D();

        this.solarSystem.add(earth);
        this.solarSystem.add(closePlanet);
        this.solarSystem.add(this.midPlanet);
        this.solarSystem.add(this.farPlanet);

        // Rotar planetas lejano y medio para que miren hacia la camara
        this.midPlanet.rotation.y = 3 * Math.PI / 2;
        this.farPlanet.rotation.y = 3 * Math.PI / 2;

        this.add(this.solarSystem);
    }

    update() {
        var rotationSpeed = 0.01;

        // Rotar planeta medio para que no deje de mirar a la camara
        // Se rota en sentido contrario
        this.midPlanet.rotation.y -= rotationSpeed;

        // Rotar planeta lejano
        // Rotarlo con el doble de la velocidad de rotacion en el sentido
        // contrario, de forma que gire al reves y no se quede quieto como el
        // planeta medio
        this.farPlanet.rotation.y -= 2 * rotationSpeed;

        // Rotar sistema solar
        this.solarSystem.rotation.y += rotationSpeed;
    }
}
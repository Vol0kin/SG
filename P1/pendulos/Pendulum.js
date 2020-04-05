/**
 * Clase que representa al pendulo.
 */
class Pendulum extends THREE.Object3D {
    constructor(gui) {
        // Llamar al constructor de la superclase
        super();

        // Crear gui
        this.createGui(gui);

        // Crear pendulos
        this.bigPendulum = new BigPendulum();
        this.smallPendulum = new SmallPendulum();

        // Establecer parametros base de los modelos
        this.BIG_PENDULUM_MIN_LENGTH = 5;
        this.SMALL_PENDULUM_MIN_LENGTH = 10;
        this.SMALL_PENDULUM_MIN_POSITION = 10;

        // Crear nodo para la rotacion global en Z (afecta a todo el modelo)
        // El nodo representa a todo el pendulo
        this.pendulum = new THREE.Object3D();
        
        // Insertar pendulos en el nodo
        this.pendulum.add(this.bigPendulum);
        this.pendulum.add(this.smallPendulum);

        // Insertar pendulo en la escena
        this.add(this.pendulum);
    }

    createGui(gui) {
        // Crear objeto que contiene los controles de los pendulos
        this.guiControls = new function() {
            // Controles del pendulo grande
            this.bigPendulumLength = 5;
            this.bigPendulumRotation = 0;

            // Controles del pendulo chico
            this.smallPendulumLength = 10;
            this.smallPendulumPosition = 10;
            this.smallPendulumRotation = 0;
        }

        var folderBigPendulum = gui.addFolder('Primer Péndulo');
        var folderSmallPendulum = gui.addFolder('Segundo Péndulo');

        folderBigPendulum.add(this.guiControls, 'bigPendulumLength', 5, 10, 1).name('Longitud: ');
        folderBigPendulum.add(this.guiControls, 'bigPendulumRotation', -Math.PI / 4, Math.PI / 4, 0.05).name('Giro: ');

        folderSmallPendulum.add(this.guiControls, 'smallPendulumLength', 10, 20, 1).name('Longitud: ');
        folderSmallPendulum.add(this.guiControls, 'smallPendulumPosition', 10, 90, 1).name('Posición (%): ');
        folderSmallPendulum.add(this.guiControls, 'smallPendulumRotation', -Math.PI / 4, Math.PI / 4, 0.05).name('Giro: ');
    }

    update() {
        /**
         * Actualizar pendulo grande
         * 
         * Primero se actualiza el atributo escala del segmento rojo, y
         * despues se llama al metodo update para que se actualice todo
         * correctamente.
         */
        this.bigPendulum.redSegmentScaleY = this.guiControls.bigPendulumLength / this.BIG_PENDULUM_MIN_LENGTH;
        this.bigPendulum.update();

        /**
         * Actualizar pendulo chico
         * 
         * Primero se actualiza el atributo escala del segmento azul y
         * se llama al metodo update para que actualice la longitud.
         * 
         * A continuacion se actualiza el desplazamiento, multiplicando la
         * altura actualizada del segmendo rojo por el % de la posicion y se
         * suma 2 (mitad de la altura del segmento verde).
         * 
         * Finalmente se hace la rotacion del pendulo chico.
         * 
         * El orden en el que se aplican las transformaciones es:
         *  1) update (con la longitud, escalado)
         *  2) rotacion en Z
         *  3) traslacion
         * 
         * Como la rotacion y la traslacion se hacen sobre el mismo nodo, la
         * rotacion va primero, y luego la traslacion.
         */
        this.smallPendulum.blueBoxScale = this.guiControls.smallPendulumLength / this.SMALL_PENDULUM_MIN_LENGTH;
        this.smallPendulum.update();
        
        var smallPendulumPosition = this.bigPendulum.redSegmentHeight * this.guiControls.smallPendulumPosition / 100 + 2;
        this.smallPendulum.position.set(0, -smallPendulumPosition, 0.75);

        this.smallPendulum.rotation.z = this.guiControls.smallPendulumRotation;

        /**
         * Rotar todo el pendulo en el eje Z. Esta transformacion se aplica
         * en ultimo lugar.
         */
        this.pendulum.rotation.z = this.guiControls.bigPendulumRotation;
    }
}
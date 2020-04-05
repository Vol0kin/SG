/**
 * Clase que representa al pendulo.
 */
class Pendulum extends THREE.Object3D {
    constructor(gui) {
        // Llamar al constructor de la superclase
        super();

        // Guardar tiempo anterior (para la animacion)
        this.previousTime = Date.now();

        // Crear gui
        this.createGui(gui);

        // Crear pendulos
        this.bigPendulum = new BigPendulum();
        this.smallPendulum = new SmallPendulum();

        // Establecer parametros base de los modelos
        this.BIG_PENDULUM_MIN_LENGTH = 5;
        this.SMALL_PENDULUM_MIN_LENGTH = 10;
        this.SMALL_PENDULUM_MIN_POSITION = 10;

        // Variables para la animacion
        this.increaseRotationBigPendulum = true;
        this.increaseRotationSmallPendulum = true;

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

            // Animacion
            this.bigPendulumAnimation = false;
            this.bigPendulumSpeed = 0;
            this.smallPendulumAnimation = false;
            this.smallPendulumSpeed = 0;
        }

        var folderBigPendulum = gui.addFolder('Primer Péndulo');
        var folderSmallPendulum = gui.addFolder('Segundo Péndulo');
        var folderAnimation = gui.addFolder('Animación');

        folderBigPendulum.add(this.guiControls, 'bigPendulumLength', 5, 10, 1).name('Longitud: ');
        folderBigPendulum.add(this.guiControls, 'bigPendulumRotation', -Math.PI / 4, Math.PI / 4, 0.05).name('Giro: ').listen();

        folderSmallPendulum.add(this.guiControls, 'smallPendulumLength', 10, 20, 1).name('Longitud: ');
        folderSmallPendulum.add(this.guiControls, 'smallPendulumPosition', 10, 90, 1).name('Posición (%): ');
        folderSmallPendulum.add(this.guiControls, 'smallPendulumRotation', -Math.PI / 4, Math.PI / 4, 0.05).name('Giro: ').listen();

        // Cuando se desactiva la animacion se guarda el angulo con el que habia
        // rotado cada pendulo en su correspondiente GUI
        folderAnimation.add(this.guiControls, 'bigPendulumAnimation').name('Primer péndulo: ').onChange(() => {
            if (!this.guiControls.bigPendulumAnimation) {
                this.guiControls.bigPendulumRotation = this.pendulum.rotation.z;
            }
        });
        folderAnimation.add(this.guiControls, 'bigPendulumSpeed', 0, 2, 0.05).name('Velocidad (rad/s): ');
        folderAnimation.add(this.guiControls, 'smallPendulumAnimation').name('Segundo péndulo: ').onChange(() => {
            if (!this.guiControls.smallPendulumAnimation) {
                this.guiControls.smallPendulumRotation = this.smallPendulum.rotation.z;
            }
        });
        folderAnimation.add(this.guiControls, 'smallPendulumSpeed', 0, 2, 0.05).name('Velocidad (rad/s): ');
    }

    update() {
        // Obtener tiempo actual
        var currentTime = Date.now();
        var elapsedTime = (currentTime - this.previousTime) / 1000;

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
         * 
         * Se comprueba si la animacion esta activa o no.
         */
        this.smallPendulum.blueBoxScale = this.guiControls.smallPendulumLength / this.SMALL_PENDULUM_MIN_LENGTH;
        this.smallPendulum.update();
        
        var smallPendulumPosition = this.bigPendulum.redSegmentHeight * this.guiControls.smallPendulumPosition / 100 + 2;
        this.smallPendulum.position.set(0, -smallPendulumPosition, 0.75);

        if (this.guiControls.smallPendulumAnimation) {
            // Obtener incremento de rotacion en funcion del tiempo transcurrido
            // del ultimo update y de la velocidad
            var rotationIncrement = this.guiControls.smallPendulumSpeed * elapsedTime;

            // Intento de umbralizar el incremento para que no se salga del rango
            rotationIncrement = Math.min(rotationIncrement, Math.PI / 4 - rotationIncrement);

            if (this.increaseRotationSmallPendulum) {
                this.smallPendulum.rotation.z += rotationIncrement;
            } else {
                this.smallPendulum.rotation.z -= rotationIncrement;
            }

            if (Math.abs(this.smallPendulum.rotation.z) >= Math.PI / 4) {
                this.increaseRotationSmallPendulum = !this.increaseRotationSmallPendulum;
            }
        } else {
            this.smallPendulum.rotation.z = this.guiControls.smallPendulumRotation;
        }

        /**
         * Rotar todo el pendulo en el eje Z. Esta transformacion se aplica
         * en ultimo lugar.
         * 
         * Se comprueba si la animacion esta activa o no.
         */
        if (this.guiControls.bigPendulumAnimation) {
            // Obtener incremento de rotacion en funcion del tiempo transcurrido
            // del ultimo update y de la velocidad
            var rotationIncrement = this.guiControls.bigPendulumSpeed * elapsedTime;

            // Intento de umbralizar el incremento para que no se salga del rango
            rotationIncrement = Math.min(rotationIncrement, Math.PI / 4 - rotationIncrement);

            if (this.increaseRotationBigPendulum) {
                this.pendulum.rotation.z += rotationIncrement;
            } else {
                this.pendulum.rotation.z -= rotationIncrement;
            }

            if (Math.abs(this.pendulum.rotation.z) >= Math.PI / 4) {
                this.increaseRotationBigPendulum = !this.increaseRotationBigPendulum;
            }
        } else {
            this.pendulum.rotation.z = this.guiControls.bigPendulumRotation;
        }

        // Actualizar tiempo previo
        this.previousTime = currentTime;
    }
}
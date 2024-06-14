class SignCanvas {
    /**
     * Create a new Canvas instance.
     *
     * @param {object} data
     */
    constructor(ref) {
        this.isDrawing = false;
        this.context = null;
        this.lastX = 0;
        this.lastY = 0;

        this.ref = ref;

        this.context = ref.getContext('2d');

        this.initStyle();
    }

    initStyle(){
        this.context.strokeStyle = '#000000';
        this.context.lineWidth = 2;
    }

    startDrawing(event) {
        this.isDrawing = true;
        this.lastX = event.clientX - this.ref.offsetLeft;
        this.lastY = event.clientY - this.ref.offsetTop;
    }

    draw(event) {
        if (!this.isDrawing) return;
        const x = event.clientX - this.ref.offsetLeft;
        const y = event.clientY - this.ref.offsetTop;

        this.context.beginPath();
        this.context.moveTo(this.lastX, this.lastY);
        this.context.lineTo(x, y);
        this.context.stroke();

        this.lastX = x;
        this.lastY = y;
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.ref.width, this.ref.height);
    }

    saveSignature() {
        return this.ref.toDataURL('image/png');
    }


}

export default SignCanvas;

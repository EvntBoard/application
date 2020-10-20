export default ({ start = 0, end = 1, duration = 1000, onStep, onComplete = () => {} }) => {
    const raf = (func => setTimeout(func, 1000/60))

    const stepCount = duration / (1000/60);
    const valueIncrement = (end - start) / stepCount;
    const sinValueIncrement = Math.PI / stepCount;

    let currentValue = start;
    let currentSinValue = 0;

    function step() {
        currentSinValue += sinValueIncrement;
        currentValue += valueIncrement * (Math.sin(currentSinValue) ** 2) * 2;

        if (currentSinValue < Math.PI) {
            onStep(currentValue);
            raf(step);
        } else {
            onStep(end);
            onComplete();
        }
    }

    raf(step);
}
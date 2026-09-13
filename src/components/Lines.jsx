// Turns "Line one.\nLine two." into text with <br /> breaks.
export default function Lines({ text }) {
    return text.split('\n').map((line, i) => (
        <span key={i}>
            {i > 0 && <br />}
            {line}
        </span>
    ));
}

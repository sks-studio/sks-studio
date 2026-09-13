import { METHOD } from '../content';

export default function MethodList() {
    return (
        <div className="method-list">
            {METHOD.map((row) => (
                <div className="method-row reveal" key={row.no}>
                    <span className="num">{row.no}</span>
                    <h3>{row.title}</h3>
                    <p>{row.text}</p>
                    <span aria-hidden="true">↘</span>
                </div>
            ))}
        </div>
    );
}

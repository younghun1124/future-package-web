export default function FutureNote({ item }) {
    return (
        <div className="whitespace-pre-line text-lg leading-relaxed text-accent">
            {item.content}
        </div>
    );
}

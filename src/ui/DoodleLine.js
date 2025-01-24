export default function DoodleLine({ width = 180 }) {
    const imageUrl = "https://storage.googleapis.com/future-box-cdn-public/static/assets/doodleline/doodleline_2x.webp";
    
    return (
        <img 
            src={imageUrl}
            alt="doodle line"
            className="mx-auto mb-2 object-contain"
            style={{
                width: width,
                height: '4px',
                maxHeight: '12px'
            }}
        />
    );
}
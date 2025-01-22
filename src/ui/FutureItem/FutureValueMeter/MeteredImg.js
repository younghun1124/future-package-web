export default function RotatingImage({ className, imgUrl='https://storage.googleapis.com/future-box-cdn-public/static/assets/message_thumbnail/message_thumbnail_1x.webp' }) {
    return (
        <div className={""+className}>
          
            <div className="">
                <img
                    src={imgUrl}
                    width='150px'
                    height='150px'
                    alt="Measuring Content"
                />
            </div>
        </div>
    );
}

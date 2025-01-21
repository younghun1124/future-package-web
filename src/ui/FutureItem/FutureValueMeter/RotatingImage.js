export default function RotatingImage({ className, imgUrl='https://storage.googleapis.com/future-box-cdn-public/static/assets/message_thumbnail/message_thumbnail_1x.webp' }) {
    return (
        <div className={""+className}>
            <style jsx>{`
                .perspective-wrapper {
                    perspective: 200px; /* 원근감을 설정 */
                }
                .rotate-x-3d {
                    transform: rotateX(70deg); /* X축 기준으로 3D 회전 */
                    transform-style: preserve-3d; /* 자식 요소의 3D 효과 유지 */
                }
            `}</style>
            <div className="perspective-wrapper">
                <img
                    className="rotate-x-3d"
                    src={imgUrl}
                    width='150px'
                    height='150px'
                    alt="Measuring Content"
                />
            </div>
        </div>
    );
}

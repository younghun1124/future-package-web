//들어오는 향수 병 모양 id에 따라 향수 병 이미지를 반환하는 컴포넌트
export function PerfumeCase({caseId, size}){
    if (!caseId) return null;
    return <div className="absolute" style={{width: size, height: size}}>
        <img 
            className="w-full h-full object-contain" 
            src={`https://storage.googleapis.com/future-box-cdn-public/futureitem/perfume/bottle_${caseId}_2x.webp`} 
            alt="향수 병" 
        />
    </div>
}

export function PerfumeLiquid({caseId, size}){
    if (!caseId) return null;
    return <div className="absolute" style={{width: size, height: size}}>
        <img 
            className="w-full h-full object-contain" 
            src={`https://storage.googleapis.com/future-box-cdn-public/futureitem/perfume/bottle_${caseId}_liquid_2x.webp`} 
            alt="향수 액체" 
        />
    </div>
}

export function PerfumeColor({caseId, colorId, size}){
    if (!caseId || !colorId) return null;

    // colorId를 0-360도 범위의 hue 값으로 변환 (6개 색상)
    const hueRotate = ((colorId - 1) * 60) % 360;

    return (
        <div className="absolute" style={{width: size, height: size}}>
            <img 
                src={`https://storage.googleapis.com/future-box-cdn-public/futureitem/perfume/bottle_${caseId}_color_2x.webp`} 
                alt="향수 색" 
                className="w-full h-full object-contain" 
                style={{
                    filter: `hue-rotate(${hueRotate}deg)`,
                    transition: 'filter 0.3s ease'
                }}
            />
        </div>
    );
}

export default function Perfume({caseId, colorId, size=200}){
    return (
        <div className='relative mx-auto' style={{width: size, height: size}}>
            <PerfumeCase caseId={caseId} size={size} />
            <PerfumeLiquid caseId={caseId} size={size}/>
            <PerfumeColor caseId={caseId} colorId={colorId} size={size} />
        </div>
    )
}

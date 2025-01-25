//들어오는 향수 병 모양 id에 따라 향수 병 이미지를 반환하는 컴포넌트
export function PerfumeCase({caseId, size, outline_type}){
    if (!caseId) return null;
    // outline_type에 따른 그림자 색상 매핑
    const outlineColors = {
        1: '#FF6B6B', // 빨간색 계열
        2: '#4ECDC4', // 청록색 계열  
        3: '#FFD93D', // 노란색 계열
        4: '#95E1D3', // 민트색 계열
        5: '#A8E6CF', // 연두색 계열
        6: '#FF8B94'  // 분홍색 계열
    };

    const shadowColor = outline_type ? (outlineColors[outline_type] || '#000000') : 'transparent';
    const style = {
        width: size, 
        height: size,
        filter: `drop-shadow(0 0 20px ${shadowColor})`
    };
    return <div className="absolute" style={style}>
        <img 
            className="w-full h-full object-contain" 
            src={`https://storage.googleapis.com/future-box-cdn-public/futureitem/perfume/bottle_${caseId}_2x.webp`} 
            alt="향수 병" 
        />
    </div>
}

export function PerfumeLiquid({caseId, colorId, size}){
    if (!caseId || !colorId) return null;
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

export default function Perfume({caseId, colorId, size=200, outline_type}){
    return (
        <div className='relative mx-auto' style={{width: size, height: size}}>
            <PerfumeCase caseId={caseId} size={size} outline_type={outline_type}/>
            <PerfumeLiquid caseId={caseId} colorId={colorId} size={size}/>
            <PerfumeColor caseId={caseId} colorId={colorId} size={size} />
        </div>
    )
}

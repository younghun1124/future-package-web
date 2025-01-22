
export default function Report({ title, className, isOpen, setIsOpen }) {
    return (
                <div className={`w-[280px] flex flex-col self-center items-center p-4 text-accent h-[448px] bg-[#444F4A] rounded-[18px] border-2 border-[#1decac] ${className}`}>
                    {'<분석 보고서>'}
                    <div className="w-[149px] h-[21px] text-center text-[#1decac] text-xl font-normal font-['Ownglyph PDH'] leading-[17px]">- 2047년 가치 -</div>
                    <p>72500$</p>
                    <h3>- 가치 변동 추이 -</h3>
                    <div className="h-20 flex items-center">그래프~~~~~~~~~~<br /></div>
                    <p>2045년, 이 빈티지 키보드는 미래 해커들의 필수템이 되어, 가격이 10배 올랐습니다. 
                        전 세계의 AI 시스템이 이 키보드로 
                        개발되었대요!
                    </p>
                </div>
         
    );
}



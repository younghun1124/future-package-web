export default function LoadingPage() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center text-white">
                <div className="mb-4">
                    <img 
                        src="https://storage.googleapis.com/future-box-cdn-public/static/assets/packing/packing_2x.webp" 
                        alt="loading" 
                        className="w-[200px] h-[200px] mx-auto"
                    />
                </div>
                <p>포장 중...</p>
            </div>
        </div>
    );
} 
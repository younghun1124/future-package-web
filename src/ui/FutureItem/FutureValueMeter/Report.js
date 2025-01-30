import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Report({ measureData, className, isOpen, setIsOpen }) {
    const chartData = {
        labels: measureData?.map(item => item.year) || [],
        datasets: [
            {
                data: measureData?.map(item => item.value) || [],
                borderColor: '#12DF92',
                backgroundColor: '#444F4A',
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 8,
                pointBackgroundColor: '#444F4A',
                pointBorderColor: '#12DF92',
                pointBorderWidth: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(18, 223, 146, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                callbacks: {
                    label: function(context) {
                        return `₩ ${context.raw.toLocaleString('ko-KR')}`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    color: '#12DF92'
                },
                ticks: {
                    color: '#12DF92',
                    font: {
                        size: 14
                    }
                }
            },
            y: {
                display: false
            }
        }
    };

    const latestPrediction = measureData?.[measureData.length - 1];

    return (
        <div className={`w-[280px] flex flex-col self-center items-center p-4 text-accent bg-[#444F4A] rounded-[18px] border-2 border-[#1decac] ${className}`}>
            <div className="text-center mb-4">
                <h2 className="text-lg mb-2">분석 보고서</h2>
                <div className="text-2xl mb-2">
                    2047년 가치
                </div>
                <div className="text-3xl font-bold text-[#12DF92]">
                    ₩{latestPrediction?.value.toLocaleString('ko-KR')}
                </div>
            </div>

            <div className="h-[140px] w-[240px] mb-4">
                <Line data={chartData} options={options} />
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-bold mb-3">가치 변동 추이</h3>
                {measureData?.map((item, index) => (
                    <div key={index} className="text-sm">
                        <div className="flex justify-between items-center">
                            <span>{item.year}년</span>
                            <span className="text-[#12DF92]">₩{item.value.toLocaleString('ko-KR')}</span>
                        </div>
                        <p className="text-gray-400">{item.story}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}



'use client'
import Image from 'next/image';
import useItemStore from '@/store/useItemStore';

export default function FutureItem({ item, isSelected, isEdit = true, isinBox = false }) {
    const { deleteItem } = useItemStore();

    return (
        <div className="relative">
            <Image
                src={item.icon}
                alt={item.name}
                width={50}
                height={50}
                className={`
                    transition-all duration-200
                    ${isSelected ? 'opacity-50' : 'hover:scale-110'}
                `}
            />
            {isEdit && isinBox && (
                <button
                    onClick={() => deleteItem(item)}
                    className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full text-white text-xs"
                >
                    ×
                </button>
            )}
        </div>
    );
}



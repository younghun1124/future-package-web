import React from 'react';

const ArrayDisplay = ({ items }) => {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-white">아이템 목록</h2>
            <ul className="list-disc pl-5">
                {items.map((item, index) => (
                    <li key={index} className="text-white">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArrayDisplay; 
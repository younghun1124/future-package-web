import ArrayDisplay from '@/ui/ArrayDisplay';

const SomePage = () => {
    const items = ['아이템 1', '아이템 2', '아이템 3'];

    return (
        <div className="p-4">
            <ArrayDisplay items={items} />
        </div>
    );
};

export default SomePage; 
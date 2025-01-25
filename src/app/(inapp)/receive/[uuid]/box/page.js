import DeliveryBox from './DeliveryBox';

export default async function DeliveryPage({ params }) {
    const { uuid } = await params;
    
    return (
        <main>
            <DeliveryBox uuid={uuid} />
        </main>
    );
}
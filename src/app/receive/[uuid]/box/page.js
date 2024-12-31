import { Suspense } from 'react';
import BoxContent from './BoxContent';
import Loading from './loading';

// 서버 컴포넌트
export default async function BoxPage({ params }) {
    const { uuid } = params;
    
    return (
        <Suspense fallback={<Loading />}>
            <BoxContent uuid={uuid} />
        </Suspense>
    );
} 
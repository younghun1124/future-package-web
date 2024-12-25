import Image from 'next/image';

import FullScreenModal from '../FullScreenModal';

import FutureFaceMirror from './FutureFaceMirror';
import FutureGifticon from './FutureGifticon';
import FutureInvention from './FutureInvention';
import FutureNote from './FutureNote';
import FutureMovieTicket from './FutureMovieTicket';
import FutureLotto from './FutureLotto';
import FutureHologram from './FutureHologram';

import { dummyItems } from '@/mocks/items';

const componentsMap={
    'FutureFaceMirror': FutureFaceMirror,
    'FutureGifticon': FutureGifticon,
    'FutureInvention': FutureInvention,
    'FutureNote': FutureNote,
    'FutureMovieTicket': FutureMovieTicket,
    'FutureLotto': FutureLotto,
    'FutureHologram': FutureHologram,
}


export default function FutureItem({item}) {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    
    // item이 없는 경우 dummyItems의 첫번째 아이템 사용
    const iteminfo = item || dummyItems[0];

    const Component = componentsMap[currentItem.type] || (() => <div>Unknown Item</div>);
    return (
        <>
        <div>
            <Image 
              src="/vercel.svg" 
              alt="Vercel Logo" 
              width={100} 
              height={100} 
              onClick={() => setIsOpen(true)}
              className="cursor-pointer"
            />
            <FullScreenModal isOpen={isOpen} onClose={onClose}>
                item
                {/* <Component iteminfo={iteminfo}/> */}
            </FullScreenModal>
        </div>
        </>
        
    );
}



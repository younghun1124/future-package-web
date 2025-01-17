import { create } from 'zustand';

const useItemStore = create((set) => ({
    selectedItems: [],
    currentItemType: null,
    isModalOpen: false,

    // 아이템 추가
    insertItem: (item, contentData) => set((state) => ({
        selectedItems: [...state.selectedItems, {
            ...item,
            id: item.type,
            content: { ...contentData }
        }]
    })),

    // 아이템 삭제
    deleteItem: (item) => set((state) => ({
        selectedItems: state.selectedItems.filter(i => i.id !== item.id)
    })),

    // 아이템 업데이트
    updateItem: (item, data) => set((state) => ({
        selectedItems: state.selectedItems.map(prevItem => 
            prevItem.type === item.type 
                ? { ...item, id: item.type, content: data }
                : prevItem
        )
    })),

    // 모달 상태 관리
    setModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
    setCurrentItemType: (type) => set({ currentItemType: type }),

    // 모든 아이템 초기화
    resetItems: () => set({ selectedItems: [], currentItemType: null, isModalOpen: false })
}));

export default useItemStore; 
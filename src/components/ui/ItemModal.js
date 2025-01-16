'use client';
import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function ItemModal({ isOpen, onClose, onSave }) {
    const [activeTab, setActiveTab] = useState('note');  // 기본 탭

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <div className="bg-[#585858] rounded-[22.5px] p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="note">쪽지</TabsTrigger>
                        <TabsTrigger value="facemirror">미래얼굴</TabsTrigger>
                        <TabsTrigger value="hologram">홀로그램</TabsTrigger>
                        {/* 다른 탭들... */}
                    </TabsList>

                    <TabsContent value="note">
                        <FutureNoteEdit onSave={onSave} />
                    </TabsContent>
                    
                    <TabsContent value="facemirror">
                        <FutureFaceMirrorEdit onSave={onSave} />
                    </TabsContent>
                    
                    <TabsContent value="hologram">
                        <FutureHologramEdit onSave={onSave} />
                    </TabsContent>
                    
                    {/* 다른 탭 컨텐츠들... */}
                </Tabs>
            </div>
        </Dialog>
    );
} 
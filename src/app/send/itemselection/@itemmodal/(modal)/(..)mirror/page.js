'use client'
import { useState } from 'react'

export default function MirrorPage() {
    const [text, setText] = useState('')

    const handleChange = async (newText) => {
        setText(newText)
        // 서버에 임시 저장
        await fetch('/api/draft-note', {
            method: 'POST',
            body: JSON.stringify({ text: newText })
        })
    }

    return (
        <div className="text-white">
            <textarea 
                value={text}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
}



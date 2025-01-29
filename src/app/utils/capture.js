import htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
export default function handleCapture(captureRef, imgName='image') {
    // captureRef로 지정된 요소를 캡처하여 이미지로 변환
    if (captureRef.current === null) {
        
        return
      }
    toPng(captureRef.current,)
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = imgName
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(captureRef)
        console.log(err)
      })
};
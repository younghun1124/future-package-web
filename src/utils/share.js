export async function shareWebsite() {
  try {
    if (!navigator.share) {
      alert('공유하기가 지원되지 않는 환경입니다.');
      return;
    }

    await navigator.share({
      title: '미래에서 온 선물',
      text: '미래에서 온 특별한 선물을 받아보세요!',
      url: window.location.origin
    });
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('공유하기 실패:', error);
    }
  }
} 
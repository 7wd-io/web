const s = new Audio('sound/notify.mp3');
s.volume = 0.3;

const sound = async () => {
  try {
    await s.play();
  } catch (_) {
    // mute
  }
};

export {
  sound,
};

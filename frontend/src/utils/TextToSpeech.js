const message = new SpeechSynthesisUtterance();

export const speechHandler = (text) => {
  message.text = text;
  window.speechSynthesis.speak(message);
};

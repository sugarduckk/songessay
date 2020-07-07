const getWordCount = (text) => {
  return text.split(/\r\n|\r|\n/g).filter(para => para != '').map(para => para.split(' ').filter(w => w != '').length).reduce((a, b) => a + b, 0);
};

export default getWordCount;
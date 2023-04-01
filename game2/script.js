var obj = {
  nmae:  "Домик в горах",
  options: {
    music: "test/music.mp3",
    onstart: () => {
      println('Скоро выйдет. Краткое описание:\n«Вы попадаете в домик-отель на верхушке одной\nиз гор. С виду он вполне безопасный, но\nкто знает, какие тайны он скрывает...»\nИграйте также:');
      opt('Чан в сарае', () =>  { open('https://megospc.github.io/gamebooks/game0/gamebook.html') });
      opt('Тайник под ковром', () =>  { open('https://megospc.github.io/gamebooks/game1/gamebook.html') });
      opt('Играть в пре-альфа версию', () =>  { open('test/gamebook.html') });
    }
  },
  assets: [],
  rooms: []
};
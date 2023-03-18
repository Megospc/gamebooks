var obj = {
  options: {
    music: "music.mp3",
    onstart: () => {
      room('start');
    }
  },
  assets: [],
  rooms: [
    { id: "start", f: function() {
      println('Скоро выйдет. Краткое описание.\nОтодвинув ковёр в одной из комнат\nдома номер «24», вы попадаете в крысиное\nгосударство. Около года назад из него\nпропал король. Теперь в нём творятся\nжуткие беспорядки...\nИграйте также:');
      opt('Чан в сарае', () =>  { open('https://megospc.github.io/gamebooks/game0/gamebook.html') });
    } }
  ]
};
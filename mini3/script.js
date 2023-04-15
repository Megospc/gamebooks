var obj = {
  name: "Королевские сокровища",
  version: "1.0.0",
  options: {
    music: "music.mp3",
    onstart: () => {
      variable("bomb", false);
      variable("watermelon", false);
      variable("key", false);
      variable("card", false);
      if (gamebook.restore) {
        println('Открыть сохранение прогресса?');
        opt('да', () => restore());
        opt('нет', () => room('start'));
      } else room('start');
    },
    room: () => save(),
    render: () => {
      if (bomb) gamebook.ctx.drawImage(img('bomb'), X(800), Y(10), X(20), X(20));
      if (watermelon) gamebook.ctx.drawImage(img('watermelon'), X(780), Y(10), X(20), Y(20));
      if (card) gamebook.ctx.drawImage(img('card'), X(760), Y(10), X(20), Y(20));
      if (key) gamebook.ctx.drawImage(img('key'), X(740), Y(10), X(20), Y(20));
    }
  },
  assets: [
    { type: "image", src: "bomb.png", id: "bomb" },
    { type: "image", src: "watermelon.png", id: "watermelon" },
    { type: "image", src: "key.png", id: "key" },
    { type: "image", src: "card.png", id: "card" },
    { type: "sound", src: "boom.mp3", id: "boom" },
    { type: "sound", src: "gameover.mp3", id: "gameover" }
  ],
  rooms: [
    { id: "start", f: function() {
      println('Однажды вы получили письмо на серебрянной\nбумаге, написаное золотыми чернилами:\n«Умираю... Возьми моё золото. Король».');
      opt('Идти в замок Его Величества', () => room('start:go'));
      opt('Остаться дома', () => room('start:stay'));
    } },
    { id: "start:stay", f: function() {
      println('Прошёл год. Вы подумали: «Не забрать ли\nзолото Его Величества?»');
      opt('Идти в замок Его Величества', () => room('start:go'));
      opt('Остаться дома', () => room('start:stay:stay'));
    } },
    { id: "start:stay:stay", f: function() {
      println('Вы умерли от старости...');
      opt('Продолжить', () => room('gameover'));
    } },
    { id: "start:go", f: function() {
      println('Вы стоите перед замком Его Величества\nкороля. Перед вами большая золотая дверь.');
      opt('Зайти в дверь', () => room('start:go:door'));
      opt('Вернуться домой', () => room('start:stay:stay'));
    } },
    { id: "start:go:door", f: function() {
      println('Вы находитесь в раздевалочной. Перед\nвами крючок для одежды и дверь.');
      opt('Зайти в дверь', () => room('hall'));
      opt('Раздеться', () => room('start:go:door:dress'));
    } },
    { id: "start:go:door:dress", f: function() {
      println('Вы разделись, но едва ваша одежда\nкоснулась крючка, налетела охрана...');
      opt('Продолжить', () => room('jail'));
    } },
    { id: "jail", f: function() {
      println('Вы находитесь в тёмной темнице. Перед\nвами большая решётчатая дверь.');
      opt('Сделать подкоп', () => room('jail:dig'));
      opt('Ломиться в дверь', () => room('jail:boom'));
    } },
    { id: "jail:dig", f: function() {
      println('Пол оказался каменным: вы не смогли\nсделать подкоп.');
      opt('Ломиться в дверь', () => room('jail:boom'));
    } },
    { id: "jail:boom", f: function() {
      println('Вы ломились в дверь. Вдруг вы почувствовали\nслабость...');
      opt('Продолжить', () => room('gameover'));
    } },
    { id: "hall", f: function() {
      println('Вы зашли в большой холл. Из него ведут\nвосемь дверей.');
      opt('Зайти в первую дверь', () => room('hall:1'));
      opt('Зайти во вторую дверь', () => room('hall:2'));
      opt('Зайти в третью дверь', () => room('hall:3'));
      opt('Зайти в четвёртую дверь', () => room('hall:4'));
      opt('Зайти в пятую дверь', () => room('hall:5'));
      opt('Зайти в шестую дверь', () => room('hall:6'));
      opt('Зайти в седьмую дверь', () => room('hall:7'));
      opt('Зайти в восьмую дверь', () => room('hall:8'));
    } },
    { id: "hall:1", f: function() {
      println('Вы зашли в оружейную. Это было тёмное\nпросторное помещение. Вы нашли одну\nбомбу и взяли её.');
      opt('Вернуться в холл', () => room('hall'));
      bomb = true;
    } },
    { id: "hall:2", f: function() {
      println('Дверь оказалась фальшивой — за ней стена.');
      opt('Продолжить', () => room('hall'));
    } },
    { id: "hall:3", f: function() {
      println('Вы зашли в небольшой санузел. Стены\nоблицованы синей плиткой.');
      opt('Вернуться в холл', () => room('hall'));
    } },
    { id: "hall:4", f: function() {
      println('Вы зашли в небольшую спальню. Перед\nвами кровать.');
      opt('Вернуться в холл', () => room('hall'));
      opt('Поспать на кровати', () => room('hall:4:sleep'));
    } },
    { id: "hall:4:sleep", f: function() {
      println('Вы легли на кровать. Через минуту вы крепко\nспали. Вдруг вы почувствовали острую боль\nв ноге...');
      opt('Продолжить', () => room('hall:4:sleep:gameover'));
    } },
    { id: "hall:4:sleep:gameover", f: function() {
      sound('gameover');
      println('Мир погрузился в темноту: вас укусил комар.');
      opt('Начать заново', () => { room('start') });
    } },
    { id: "hall:5", f: function() {
      println('Вы вышли в прекрасный сад. В нём растут\nарбузы. Вы взяли один из них и ушли.');
      opt('Продолжить', () => room('hall'));
      watermelon = true;
    } },
    { id: "hall:6", f: function() {
      println('Вы попали в небольшую комнату. На полу\nлежала какая-то карточка. Вы подняли её и\nушли.');
      opt('Продолжить', () => room('hall'));
      card = true;
    } },
    { id: "hall:7", f: function() {
      if (card) {
        println('Вы зашли в большую комнату. Повсюду\nстоят охранники. Как только вы зашли, один\nиз них посмотрел на вашу карточку, кивнул и\nдал вам какой-то ключ.');
        opt('Вернуться в холл', () => room('hall'));
        key = true;
      } else {
        println('Вы зашли в большую комнату. Повсюду\nстоят охранники. Как только вы зашли, они\nнабросились на вас...');
        opt('Продолжить', () => room('jail'));
      }
    } },
    { id: "hall:8", f: function() {
      println('Вы зашли в маленькую и абсолютно пустую\nкомнату. Перед вами дверь, но она не\nоткрывается.');
      opt('Вернуться в холл', () => room('hall'));
      if (bomb) opt('Взорвать дверь бомбой', () => room('hall:8:bomb'));
    } },
    { id: "hall:8:bomb", f: function() {
      sound('boom');
      println('Вы взорвали дверь бомбой. За ней оказалась\nдругая дверь. Она заперта.');
      opt('Выйти в холл', () => room('hall'));
      if (key) opt('Открыть дверь ключом', () => room('hall:8:bomb:door'));
    } },
    { id: "hall:8:bomb:door", f: function() {
      println('Вы открыли дверь ключом. Вдруг вы\почувствовали приступ голода.');
      opt('Подождать', () => room('hall:8:bomb:door:wait'));
      if (watermelon) opt('Съесть арбуз', () => room('hall:8:bomb:door:eat'));
    } },
    { id: "hall:8:bomb:door:wait", f: function() {
      println('От голода у вас почернело в глазах...');
      opt('Подождать', () => room('gameover'));
    } },
    { id: "hall:8:bomb:door:eat", f: function() {
      println('Вы съели арбуз и зашли в дверь.');
      opt('Продолжить', () => room('win'));
    } },
    { id: "win", f: function() {
      println('Вы находитесь в огромной комнате.\nПовсюду сундуки с золотом. Поздравляем:\nвы выиграли!');
      opt('Об игре', () => room('about'));
      opt('Новая игра', () => restart());
    } },
    { id: "gameover", f: function() {
      sound('gameover');
      println('Мир погрузился в темноту: игра завершена.');
      opt('Начать заново', () => { room('start') });
    } },
    { id: "about", f: function() {
      println('Автор идеи: Supermouse\nРазработчик: Megospace\nДата выпуска: 15.04.2023\nМузыка и звуки: zvukipro.com\nВерсия: '+obj.version+'\nКоличество комнат: '+obj.rooms.length);
      println('\n@@@     @@@  @@@@@@   @@@@@@    @@@@@@\n@@@@   @@@@  @@      @@        @@    @@\n@@ @@ @@ @@  @@@@@@  @@   @@@  @@    @@\n@@  @@@  @@  @@      @@    @@  @@    @@\n@@       @@  @@@@@@   @@@@@@    @@@@@@\n\n @@@@@@  @@@@@@    @@@@@@   @@@@@@  @@@@@@\n@@       @@   @@  @@    @@  @@      @@\n @@@@@   @@@@@@   @@    @@  @@      @@@@@@\n     @@  @@       @@@@@@@@  @@      @@\n@@@@@@   @@       @@    @@  @@@@@@  @@@@@@');
      opt('Назад', () => { room('hall:2:throw') });
    } }
  ]
};
function restart() {
  bomb = false;
  card = false;
  watermelon = false;
  key = false;
  room('start');
}
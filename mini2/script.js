var obj = {
  name: "Прятки",
  version: "1.0.1",
  options: {
    music: "music.mp3",
    onstart: () => {
      variable("found", new Array(5).fill(false));
      variable("TV", false);
      if (gamebook.restore) {
        println('Открыть сохранение прогресса?');
        opt('да', () => restore());
        opt('нет', () => room('start'));
      } else room('start');
    },
    room: () => save(),
    render: () => {
      let txt = "Найдено: ";
      for (let i = 0; i < 5; i++) txt += found[i] ? "#":"_";
      gamebook.ctx.font = `${X(18)}px font`;
      gamebook.ctx.fillStyle = obj.style.first;
      gamebook.ctx.fillText(txt, X(750), Y(20));
    }
  },
  assets: [
    { type: "sound", src: "gameover.mp3", id: "gameover" },
    { type: "sound", src: "nock.mp3", id: "nock" },
    { type: "sound", src: "found.mp3", id: "found" },
    { type: "sound", src: "ghost.mp3", id: "ghost" },
    { type: "sound", src: "boom.mp3", id: "boom" }
  ],
  rooms: [
    { id: "start", f: function() {
      println('Однажды вы купили новый дом. И пригласили\nсвоих друзей сыграть в прятки внутри него.\nВы стоите перед входной дверью вашего дома.');
      opt('Зайти в дверь', () => room('start:door'));
    } },
    { id: "start:door", f: function() {
      println('Вы находитесь в прихожей. Перед вами\nдва шкафа и дверь посередине.');
      opt('Заглянуть в первый шкаф', () => room('start:door:1'));
      opt('Заглянуть во второй шкаф', () => room('start:door:2'));
      opt('Зайти в дверь', () => room('hall'));
    } },
    { id: "start:door:1", f: function() {
      sound('ghost');
      println('Вы заглянули в первый шкаф. В нём висела\nодежда. Поначалу ничего не происходило.\nНо потом вам показалось, что одежда\nшевелится. Вдруг из-за неё вылетел призрак...');
      opt('Продолжить', () => room('gameover'));
    } },
    { id: "start:door:2", f: function() {
      if (found[0]) {
        println('Шкаф был пуст.');
        opt('Продолжить', () => room('start:door'));
      } else {
        println('Вы нашли одного из своих друзей!\nЕго имя — «Рома».');
        found[0] = true;
        sound('found');
        if (!found.includes(false)) opt('Продолжить', () => room('win'));
        else opt('Продолжить', () => room('start:door'));
      }
    } },
    { id: "hall", f: function() {
      println('Вы находитесь в длинном коридоре.\nИз него ведут пять дверей. Две двери —\nслева. Ещё две — справа. И одна в торце.');
      opt('Зайти в первую дверь слева', () => room('hall:l1'));
      opt('Зайти во вторую дверь слева', () => room('hall:l2'));
      opt('Зайти в первую дверь справа', () => room('hall:r1'));
      opt('Зайти во вторую дверь справа', () => room('hall:r2'));
      opt('Зайти в дверь в торце', () => room('hall:door'));
    } },
    { id: "hall:l1", f: function() {
      println('Вы находитесь в небольшой комнате.\nПеред вами дверь.');
      opt('Выйти в коридор', () => room('hall'));
      opt('Зайти в дверь', () => room('hall:l1:door'));
    } },
    { id: "hall:l1:door", f: function() {
      println('Вы находитесь в небольшой спальне.\nПеред вами кровать.');
      opt('Выйти в пустую комнату', () => room('hall:l1'));
      if (TV) opt('Заглянуть под кровать', () => room('hall:l1:door:under'));
    } },
    { id: "hall:l1:door:under", f: function() {
      if (found[1]) {
        println('Под кроватью никого не оказалось.');
        opt('Продолжить', () => room('hall:l1:door'));
      } else {
        println('Вы нашли одного из своих друзей!\nЕго имя — «Вася».');
        found[1] = true;
        sound('found');
        if (!found.includes(false)) opt('Продолжить', () => room('win'));
        else opt('Продолжить', () => room('hall:l1:door'));
      }
    } },
    { id: "hall:l2", f: function() {
      println('Вы зашли в гостиную. Из неё ведёт одна дверь.');
      opt('Вернуться в коридор', () => room('hall'));
      opt('Зайти в дверь', () => room('hall:l2:door'));
    } },
    { id: "hall:l2:door", f: function() {
      println('Вы попали в маленькую комнату. На\nстене перед вами висит телевизор.');
      opt('Вернуться в гостиную', () => room('hall'));
      opt('Включить телевизор', () => room('hall:l2:door:turnon'));
    } },
    { id: "hall:l2:door:turnon", f: function() {
      println('Вы включили телевизор. На нём появилась\nнадпись: «Один из твоих друзей в спальне».');
      opt('Выключить телевизор', () => room('hall:l2:door'));
      TV = true;
    } },
    { id: "hall:r1", f: function() {
      println('За дверью оказалась стена.');
      opt('Вернуться в коридор', () => room('hall'));
      if (found[3]) opt('Постучать по стене', () => room('hall:r1:nock'));
    } },
    { id: "hall:r1:nock", f: function() {
      sound('nock');
      println('Вы постучали по стене. Вдруг она растворилась...');
      opt('Продолжить', () => room('hall:r1:nock:next'));
    } },
    { id: "hall:r1:nock:next", f: function() {
      if (found[2]) {
        println('За стеной никого не оказалось.');
        opt('Продолжить', () => room('hall'));
      } else {
        println('Вы нашли одного из своих друзей!\nЕго имя — «Миша».');
        found[2] = true;
        sound('found');
        if (!found.includes(false)) opt('Продолжить', () => room('win'));
        else opt('Продолжить', () => room('hall'));
      }
    } },
    { id: "hall:r2", f: function() {
      println('Вы зашли в просторную кухню. Перед\nвами стоит газовая плита. На ней —\nбольшая кастрюля.');
      opt('Вернуться в коридор', () => room('hall'));
      opt('Заглянуть в кастрюлю', () => room('hall:r2:open'));
    } },
    { id: "hall:r2:open", f: function() {
      if (found[3]) {
        println('В кастрюле никого не оказалось.');
        opt('Продолжить', () => room('hall'));
      } else {
        println('Вы нашли одного из своих друзей!\nЕго имя — «Гога».');
        found[3] = true;
        sound('found');
        if (!found.includes(false)) opt('Продолжить', () => room('win'));
        else opt('Выйти в коридор', () => room('hall'));
      }
    } },
    { id: "hall:door", f: function() {
      println('Вы находитесь в небольшой комнате.\nПеред вами пульт управления с четырьмя\nкнопками: красной, жёлтой, зелёной и синей.');
      opt('Вернуться в коридор', () => room('hall'));
      opt('Нажать на красную кнопку', () => room('hall:door:red'));
      opt('Нажать на жёлтую кнопку', () => room('hall:door:yellow'));
      opt('Нажать на зелёную кнопку', () => room('hall:door:green'));
      opt('Нажать на синюю кнопку', () => room('hall:door:blue'));
    } },
    { id: "hall:door:red", f: function() {
      sound('boom');
      println('Вы нажали на красную кнопку. Раздалось\nтиканье: 3...2...1...БА-БАХ!!!');
      opt('Продолжить', () => room('gameover'));
    } },
    { id: "hall:door:yellow", f: function() {
      println('Вы нажали на жёлтую кнопку. На потолке\nвключился свет.');
      opt('Продолжить', () => room('hall:door'));
    } },
    { id: "hall:door:green", f: function() {
      println('Вы нажали на зелёную кнопку. На полу\nвыросла трава.');
      opt('Продолжить', () => room('hall:door'));
    } },
    { id: "hall:door:blue", f: function() {
      println('Вы нажали на синюю кнопку. Одна из\nстен растворилась.');
      opt('Продолжить', () => room('hall:door:found'));
    } },
    { id: "hall:door:found", f: function() {
      if (found[4]) {
        println('За ней никого не оказалось.');
        opt('Продолжить', () => room('hall'));
      } else {
        println('Вы нашли одного из своих друзей!\nЕго имя — «Петя».');
        found[4] = true;
        sound('found');
        if (!found.includes(false)) opt('Продолжить', () => room('win'));
        else opt('Выйти в коридор', () => room('hall'));
      }
    } },
    { id: "win", f: function() {
      sound('found');
      println('Вы нашли всех своих друзей. Поздравляем:\nвы выиграли!');
      opt('Новая игра', () => restart());
      opt('Об игре', () => room('about'));
    } },
    { id: "gameover", f: function() {
      sound('gameover');
      println('Мир погрузился в темноту: игра завершена.');
      opt('Начать заново', () => { room('start') });
    } },
    { id: "about", f: function() {
      println('Автор идеи: Supermouse\nРазработчик: Megospace\nДата выпуска: null\nМузыка и звуки: zvukipro.com\nВерсия: '+obj.version+'\nКоличество комнат: '+obj.rooms.length);
      println('\n@@@     @@@  @@@@@@   @@@@@@    @@@@@@\n@@@@   @@@@  @@      @@        @@    @@\n@@ @@ @@ @@  @@@@@@  @@   @@@  @@    @@\n@@  @@@  @@  @@      @@    @@  @@    @@\n@@       @@  @@@@@@   @@@@@@    @@@@@@\n\n @@@@@@  @@@@@@    @@@@@@   @@@@@@  @@@@@@\n@@       @@   @@  @@    @@  @@      @@\n @@@@@   @@@@@@   @@    @@  @@      @@@@@@\n     @@  @@       @@@@@@@@  @@      @@\n@@@@@@   @@       @@    @@  @@@@@@  @@@@@@');
      opt('Назад', () => { room('win') });
    } }
  ]
};
function restart() {
  found = new Array(5).fill(false);
  room('start');
}
var obj = {
  name: "Вампиры",
  version: "1.0.0",
  options: {
    music: "music.mp3",
    onstart: () => {
      variable("word", false);
      variable("letters", new Array(7).fill(false));
      if (gamebook.restore) {
        println('Открыть сохранение прогресса?');
        opt('да', () => restore());
        opt('нет', () => room('start'));
      } else room('start');
    },
    room: () => save(),
    render: () => {
      let txt = "";
      let nd = "вампиры";
      for (let i = 0; i < nd.length; i++) txt += letters[i] ? nd[i]:"?";
      gamebook.ctx.font = `${X(18)}px font`;
      gamebook.ctx.fillStyle = obj.style.first;
      gamebook.ctx.fillText(txt, X(800), Y(20));
    }
  },
  assets: [],
  rooms: [
    { id: "start", f: function() {
      println('Вы отправились выяснять обстоятельства\n«убийства в спальне» к правительству! Вы\nстоите перед дверью замка Его Величества.');
      opt('Зайти в дверь', () => room('start:door'));
    } },
    { id: "start:door", f: function() {
      println('Вы находитесь в прихожей. Перед вами\nстоит шкаф. Вы нашли записку: «Спаси нас!\nНа нас напали...» Дальше бумага была\nоборвана. Вам нужно найти семь букв\nв комнатах замка. А после закончить записку.');
      opt('Заглянуть в шкаф', () => room('start:door:cupboard'));
      opt('Поискать дверь', () => room('start:door:search'));
    } },
    { id: "start:door:cupboard", f: function() {
      println('Вы открыли дверь шкафа. Он пустой.\nНа обратной стороне двери чем-то красным\nнаписана буква «И».\nВы нашли букву «И»!');
      letters[4] = true;
      if (!word && !letters.includes(false)) opt('Продолжить', () => room('word'));
      else opt('Поискать дверь', () => room('start:door:search'));
    } },
    { id: "start:door:search", f: function() {
      println('Вы нашли дверь.');
      opt('Зайти в дверь', () => room('hall'));
      opt('Открыть шкаф', () => room('start:door:cupboard'));
    } },
    { id: "hall", f: function() {
      println('Вы попали в просторный холл. На его стенах\nвисят картины. Перед вами семь дверей.');
      opt('Вернуться в прихожую', () => room('start:door'));
      opt('Зайти в первую дверь', () => room('hall:1'));
      opt('Зайти во вторую дверь', () => room('hall:2'));
      opt('Зайти в третью дверь', () => room('hall:3'));
      opt('Зайти в четвёртую дверь', () => room('hall:4'));
      opt('Зайти в пятую дверь', () => room('hall:5'));
      opt('Зайти в шестую дверь', () => room('hall:6'));
      opt('Зайти в седьмую дверь', () => room('hall:7'));
      opt('Поискать буквы за картинами', () => room('hall:search'));
    } },
    { id: "hall:search", f: function() {
      println('Вы нашли букву «М» за одной из картин.');
      letters[2] = true;
      if (!word && !letters.includes(false)) opt('Продолжить', () => room('word'));
      else opt('Продолжить', () => room('hall'));
    } },
    { id: "hall:1", f: function() {
      println('Вы зашли в небольшую комнату. Перед вами\nлетает летучая мышь, выписывая букву «В».\nВы нашли букву «В»!');
      letters[0] = true;
      if (!word && !letters.includes(false)) opt('Продолжить', () => room('word'));
      else opt('Выйти в холл', () => room('hall'));
    } },
    { id: "hall:2", f: function() {
      if (word) {
        println('Вы вышли на улицу. Идёт снег. На горизонте\nпоказались вампиры.');
        opt('Убежать от вампиров', () => room('hall:2:run'));
        opt('Построить снежную крепость', () => room('hall:2:build'));
        opt('Кидаться снежками в вампиров', () => room('hall:2:throw'));
      } else {
        println('Дверь оказалась заперта.');
        opt('Продолжить', () => room('hall'));
      }
    } },
    { id: "hall:2:run", f: function() {
      println('Вы убегали от вампиров и вдруг споткнулись\nо камень, лежавший в снегу. Вы упали, и тут\nподлетели вампиры. Кус! Кус! Вы почувствовали\nслабость.');
      opt('Начать заново', () => restart());
    } },
    { id: "hall:2:build", f: function() {
      println('Вы строили снежную крепость, и тут\nподлетели вампиры. Кус! Кус! Вы почувствовали\nслабость.');
      opt('Начать заново', () => restart());
    } },
    { id: "hall:2:throw", f: function() {
      println('От каждого поподания снежком, один вампир\nпадал. Вскоре вы победили их всех. Поздравляем:\nвы выиграли!');
      opt('Новая игра', () => restart());
      opt('Об игре', () => room('about'));
    } },
    { id: "hall:3", f: function() {
      println('Вы зашли в роскошную спальню. Перед\nвами стоит кровать. На ней лежит король.\nОн сказал: «А».');
      letters[1] = true;
      if (!word && !letters.includes(false)) opt('Продолжить', () => room('word'));
      else opt('Выйти в холл', () => room('hall'));
    } },
    { id: "hall:4", f: function() {
      println('Вы находитесь в небольшой и абсолютно\nпустой комнате. Перед вами дверь.');
      opt('Выйти в холл', () => room('hall'));
      opt('Зайти в дверь', () => room('hall:4:door'));
    } },
    { id: "hall:4:door", f: function() {
      println('Вы зашли в небольшую и абсолютно\nпустую комнату.');
      opt('Выйти в пустую комнату', () => room('hall:4'));
    } },
    { id: "hall:5", f: function() {
      println('Вы зашли в небольшую комнату. Перед\nвами две палки и лужа.');
      opt('Вернуться в холл', () => room('hall'));
      opt('Подойти поближе', () => room('hall:5:near'));
    } },
    { id: "hall:5:near", f: function() {
      println('Вы поняли, что это буква «Ы».');
      letters[6] = true;
      if (!word && !letters.includes(false)) opt('Продолжить', () => room('word'));
      else opt('Выйти в холл', () => room('hall'));
    } },
    { id: "hall:6", f: function() {
      println('Вы зашли в небольшую кухню. Перед\nвами лежат арбуз и палка, которые\nизображают букву «Р».');
      letters[5] = true;
      if (!word && !letters.includes(false)) opt('Продолжить', () => room('word'));
      else opt('Выйти в холл', () => room('hall'));
    } },
    { id: "hall:7", f: function() {
      println('Вы попали в небольшую комнату. В одной\nиз стен — дырка.');
      opt('Вернуться в холл', () => room('hall'));
      opt('Подойти к дырке', () => room('hall:7:near'));
    } },
    { id: "hall:7:near", f: function() {
      println('Над дыркой была выцарапана буква «П».');
      letters[3] = true;
      if (!word && !letters.includes(false)) opt('Продолжить', () => room('word'));
      else opt('Выйти в холл', () => room('hall'));
    } },
    { id: "word", f: function() {
      println('Вы составили слово «вампиры» получилось:\n«Спаси нас! На нас напали вампиры». Ваша\nцель: победить вампиров.');
      opt('Продолжить', () => room('hall'));
      word = true;
    } },
    { id: "about", f: function() {
      println('Автор идеи: Supermouse\nРазработчик: Megospace\nДата выпуска: null\nМузыка и звуки: zvukipro.com\nВерсия: '+obj.version+'\nКоличество комнат: '+obj.rooms.length);
      println('\n@@@     @@@  @@@@@@   @@@@@@    @@@@@@\n@@@@   @@@@  @@      @@        @@    @@\n@@ @@ @@ @@  @@@@@@  @@   @@@  @@    @@\n@@  @@@  @@  @@      @@    @@  @@    @@\n@@       @@  @@@@@@   @@@@@@    @@@@@@\n\n @@@@@@  @@@@@@    @@@@@@   @@@@@@  @@@@@@\n@@       @@   @@  @@    @@  @@      @@\n @@@@@   @@@@@@   @@    @@  @@      @@@@@@\n     @@  @@       @@@@@@@@  @@      @@\n@@@@@@   @@       @@    @@  @@@@@@  @@@@@@');
      opt('Назад', () => { room('hall:2:throw') });
    } }
  ]
};
function restart() {
  word = false;
  letters = new Array(7).fill(false);
  room('start');
}
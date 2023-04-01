var obj = {
  name:  "Домик в горах",
  options: {
    music: "music.mp3",
    onstart: () => {
      var_("dies", 0);
      var_("achs", [false, false, false]);
      var_("skis", false);
      var_("fivefloor", false);
      var_("roommap", []);
      var_("roomc", 0);
      if (gamebook.restore) restore();
      else room('start');
    },
    render: () => {
      ctx.fillStyle = style.first;
      ctx.font = `${X(18)}px font`;
      if (roomid!= 'stats') ctx.fillText("Настройки", X(50), Y(20-cameraY));
    },
    touchstart: (x, y) => {
      if (x < 100 && y < 20-cameraY&& roomid != 'stats') room('stats', roomid, roomargs);
    },
    room: () => {
      if (!roommap[roomindex]) {
        roommap[roomindex] = true;
        roomc++;
      }
      save();
    }
  },
  assets: [
    { type: "sound", src: "achievement.mp3", id: "ach" },
    { type: "sound", src: "gameover.mp3", id: "gameover" },
    { type: "sound", src: "laugh.mp3", id: "laugh" },
    { type: "sound", src: "boom.mp3", id: "boom" },
    { type: "sound", src: "elevator.mp3", id: "elevator" },
    { type: "sound", src: "cry.mp3", id: "cry" },
    { type: "sound", src: "ghost.mp3", id: "ghost" },
    { type: "sound", src: "door.mp3", id: "door" },
    { type: "sound", src: "bees.mp3", id: "bees" },
    { type: "sound", src: "phone.mp3", id: "phone" },
    { type: "sound", src: "cave.mp3", id: "cave" },
    { type: "sound", src: "doorclose.mp3", id: "doorclose" },
    { type: "sound", src: "dooropen.mp3", id: "dooropen" },
  ],
  rooms: [
    { id: "start", f: function() {
      println('Вы вышли на снежную вершину горы.\nСлева от вас лыжная трасса. Впереди —\nдомик, у него видно четыре этажа. Снег —\nрыхлый. ');
      opt('Подойти к домику', () =>  { room('start:home') });
      opt('Подойти к лыжной трассе', () =>  { room('start:track') });
      if (achs[0]) println('Из него получился отличный снеговик.');
      else {
        println('Из него может получиться отличный\nснеговик.');
        opt('Слепить снеговика', () =>  { room('start:snowman') });
      }
    } },
    { id: "start:snowman", f: function() {
      sound('ach');
      println('Вы слепили снеговика.\nДостижение «Снеговик» открыто!');
      opt('Продолжить', () =>  { room('start') });
      achs[0] = true;
    } },
    { id: "start:track", f: function() {
      println('Вы подошли к лыжной трассе.\nСлева от вас стоит табличка: «Горнолыжная\nтрасса». Вы очень хотите скатиться вниз');
      if (skis) {
        println('.');
        opt('Скатиться вниз на лыжах', () =>  { room('start:track:ski') });
      } else {
        println(',\nно у вас нет лыж.');
        opt('Скатиться вниз без лыж', () =>  { room('start:track:down') });
      }
      opt('Вернуться на вершину', () =>  { room('start') });
    } },
    { id: "start:track:down", f: function() {
      sound('laugh');
      println('Вы начали катиться. Вдруг вы поняли, что\nпревращаетесь в снежный ком...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "stats", f: function(from, args) {
      let aco = 0;
      for (let i = 0; i < achs.length; i++) if (achs[i]) aco++;
      println('Достижения ('+aco+' из '+achs.length+'):\n');
      if (achs[0]) println('Снеговик: слепить снеговика.\n     @@@@@@@\n    @@ * * @@\n\\   @@   > @@   /\n \\  @@@@@@@@@  /\n  \\@@   *   @@/\n   @@   *   @@\n   @@   *   @@\n    @@@@@@@@@\n');
      else println('[неоткрыто]: слепить снеговика.\n');
      if (achs[1]) println('Все углы собрал: проиграть 20 раз.\n@@@@@@@@@\n@  @@@  @\n@@@@@@@@@\n @ @ @ @\n');
      else println('[неоткрыто]: проиграть 20 раз.\n');
      if (achs[2]) println('Мойщик: включить стиральную машину,\nбез последствий.\n@@@@@@@@@@\n@@ @ @ @@@\n@@@@@@@@@@\n@@@    @@@\n@@      @@\n@@@    @@@\n@@@@@@@@@@');
      else println('[неоткрыто]: включить стиральную машину,\nбез последствий.\n');
      println('Статистика:\nКоличество проигрышей: '+dies+'\nКомнат исследовано:'+roomc+' (из '+rooms.length+')');
      opt('Назад', () =>  { room(from, args) });
      opt('Об игре', () =>  { room('about', from, args) });
      opt('Новая игра', () =>  { restart() });
    } },
    { id: "start:home", f: function() {
      sound('door');
      println('Вы подошли к домику. Перед вами дверь.\nОна не заперта.');
      opt('Зайти в дом', () =>  { room('home') });
      opt('Вернуться на вершину', () =>  { room('start') });
    } },
    { id: "home", f: function() {
      println('Вы попали в небольшую прихожую.\nВпереди две двери. Слева от вас стоит шкаф.');
      opt('Зайти в первую дверь', () =>  { room('home:1') });
      opt('Зайти во вторую дверь', () =>  { room('home:2') });
      opt('Выйти на крыльцо', () =>  { room('start:home') });
      opt('Заглянуть в шкаф', () =>  { room('home:cupboard') });
    } },
    { id: "home:cupboard", f: function() {
      println('В шкафу висела одежда, много одежды.');
      opt('Продолжить', () =>  { room('home') });
    } },
    { id: "home:1", f: function() {
      println('Вы попали в гардероб. Всюду вешалки\nс одеждой. Перед вами две двери.');
      opt('Зайти в первую дверь', () =>  { room('home:1:1') });
      opt('Зайти во вторую дверь', () =>  { room('home:1:2') });
      opt('Вернуться в прихожую', () =>  { room('home') });
    } },
    { id: "home:1:1", f: function() {
      println('Вы зашли в большую комнату. Повсюду\nлежат сапоги. Впереди одна дверь.');
      opt('Зайти в дверь', () =>  { room('home:1:1:door') });
      opt('Вернуться в гардероб', () =>  { room('home:1') });
    } },
    { id: "home:1:1:door", f: function() {
      println('Вы находитесь в небольшой комнате.\nОбои — зелёные. Слева от вас — окно. За ним\nградусник. Перед вами дверь.');
      opt('Вернуться в «Сапожную»', () =>  { room('home:1:1') });
      opt('Зайти в дверь', () =>  { room('pre-elevator:1') });
      opt('Посмотреть на градусник', () =>  { room('home:1:1:door:temp') });
    } },
    { id: "home:1:1:door:temp", f: function() {
      println('Градусник показывал крепкий мороз — «-26.9°C».');
      opt('Продолжить', () =>  { room('home:1:1:door') });
    } },
    { id: "home:1:2", f: function() {
      println('Вы попали в большую комнату, обитую синей\nплиткой. Перед вами три стиральные машины.');
      opt('Включить первую стиральную машину', () =>  { room('home:1:2:boom') });
      opt('Включить вторую стиральную машину', () =>  { room('home:1:2:boom') });
      opt('Включить третью стиральную машину', () =>  { room('home:1:2:ok') });
      opt('Вернуться в гардероб', () =>  { room('home:1') });
    } },
    { id: "home:1:2:boom", f: function() {
      sound('boom');
      println('Вы включили стиральную машину.\nВдруг она затарахтела и взорвалась...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "home:1:2:ok", f: function() {
      println('Вы включили стиральную машину.\nНичего не произошло.');
      if (!achs[2]) {
        sound('ach');
        println('Достижение «Мойщик» открыто!');
        achs[2] = true;
      }
      opt('Продолжить', () =>  { room('home:1:2') });
    } },
    { id: "pre-elevator:1", f: function() {
      println('Вы попали в комнату средних размеров.\nБетонные стены окрашены светло-жёлтой\nкраской. На одной из них написанно:\n«1 — приёмная». Слева от вас — лифт. Впереди —\nдве двери.');
      opt('Зайти в лифт', () =>  { room('elevator', 1) });
      opt('Зайти в первую дверь', () =>  { room('home:1:1:door') });
      opt('Зайти во вторую дверь', () =>  { room('beach') });
    } },
    { id: "beach", f: function() {
      println('Вы зашли в маленькую комнату.\nПод потолком висит яркая лампа. На полу —\nпесок. На обоях нарисованы пальмы. Перед\nвами замаскированная дверь.');
      opt('Зайти в дверь', () =>  { room('beach:door') });
      opt('Вернуться к лифту', () =>  { room('pre-elevator:1') });
    } },
    { id: "beach:door", f: function() {
      println('Вы зашли в маленькую пустую комнату.\nНа противоположной стене надпись:\n«Теперь не выйдешь отсюда».');
      opt('Вернуться на «пляж»', () =>  { room('beach:door:closed') });
    } },
    { id: "beach:door:closed", f: function() {
      sound('ghost');
      println('Дверь назад оказалась заперта...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "pre-elevator:2", f: function() {
      println('Вы попали в комнату средних размеров.\nБетонные стены окрашены светло-зелёной\nкраской. На одной из них нарисована красная\nнадпись: «2 — в разработке».');
      opt('Вернуться в лифт', () =>  { room('elevator', 2) });
    } },
    { id: "pre-elevator:3", f: function() {
      println('Вы попали в комнату средних размеров.\nБетонные стены окрашены светло-розовой\nкраской. На одной из них нарисована красная\nнадпись: «3 — в разработке».');
      opt('Вернуться в лифт', () =>  { room('elevator', 3) });
    } },
    { id: "pre-elevator:4", f: function() {
      println('Вы попали в комнату средних размеров.\nБетонные стены окрашены светло-синей\nкраской. На одной из них нарисована красная\nнадпись: «4 — в разработке».');
      opt('Вернуться в лифт', () =>  { room('elevator', 4) });
    } },
    { id: "pre-elevator:5", f: function() {
      println('Вы попали в комнату средних размеров.\nБетонные стены не окрашены.');
      opt('Вернуться в лифт', () =>  { room('elevator', 4) });
    } },
    { id: "elevator", f: function(i) {
      dark();
      sound('elevator');
      println(`Вы находитесь в тёмном лифте. На индикаторе\nсветится цифра «${i}». На панели управления\n${fivefloor ? "пять кнопок.":"четыре кнопки."}`);
      opt('Выйти из лифта', () =>  { day(); room('pre-elevator:'+i); });
      if (i != 1) opt('Нажать на кнопку «1»', () =>  { room('elevator', 1) });
      if (i != 2) opt('Нажать на кнопку «2»', () =>  { room('elevator', 2) });
      if (i != 3) opt('Нажать на кнопку «3»', () =>  { room('elevator', 3) });
      if (i != 4) opt('Нажать на кнопку «4»', () =>  { room('elevator', 4) });
      if (i != 5 && fivefloor) opt('Нажать на кнопку «5»', () =>  { room('elevator', 5) });
    } },
    { id: "home:2", f: function() {
      println('Вы попали в большую комнату.\nНа полу осел толстый слой пыли. Перед вами\nдве двери.');
      opt('Зайти в первую дверь', () =>  { room('first-hall') });
      opt('Зайти во вторую дверь', () =>  { room('home:2:2') });
      opt('Вернуться в прихожую', () =>  { room('home') });
    } },
    { id: "first-hall", f: function() {
      println('Вы находитесь в огромном светлом холле.\nИз него ведут двенадцать дверей.');
      opt('Вернуться в «Пыльную комнату»', () =>  { room('home:2') });
      opt('Зайти в первую дверь', () =>  { room('first-hall:1') });
      opt('Зайти во вторую дверь', () =>  { room('first-hall:2') });
      opt('Зайти в третью дверь', () =>  { room('first-hall:3') });
      opt('Зайти в четвёртую дверь', () =>  { room('first-hall:door:false') });
      opt('Зайти в пятую дверь', () =>  { room('first-hall:5') });
      opt('Зайти в шестую дверь', () =>  { room('first-hall:6') });
      opt('Зайти в седьмую дверь', () =>  { room('first-hall:7') });
      opt('Зайти в восьмую дверь', () =>  { room('first-hall:door:falss') });
      opt('Зайти в девятую дверь', () =>  { room('first-hall:9') });
      opt('Зайти в десятую дверь', () =>  { room('first-hall:10') });
      opt('Зайти в одиннадцатую дверь', () =>  { room('first-hall:door:false') });
      opt('Зайти в двенадцатую дверь', () =>  { room('first-hall:12') });
    } },
    { id: "first-hall:1", f: function() {
      println('Вы зашли в маленькую тёмную комнату.\nУ стен стоят мётлы и веники.');
      opt('Вернуться в холл', () =>  { room('first-hall') });
    } },
    { id: "first-hall:2", f: function() {
      println('Вы вошли в небольшую комнату. На полу\nпостелен искусственный газон. Посредине —\nнадувной бассейн.');
      opt('Вернуться в холл', () =>  { room('first-hall') });
    } },
    { id: "first-hall:3", f: function() {
      println('Вы зашли в небольшую комнату. Стены закрыты\nшкафами.');
      opt('Вернуться в холл', () =>  { room('first-hall') });
    } },
    { id: "first-hall:door:false", f: function() {
      sound('laugh');
      println('Дверь оказалась фальшивой — за ней стена.');
      opt('Продолжить', () =>  { room('first-hall') });
    } },
    { id: "first-hall:5", f: function() {
      println('Вы зашли в маленькую и абсолютно пустую комнату.');
      opt('Вернуться в холл', () =>  { room('first-hall') });
    } },
    { id: "first-hall:6", f: function() {
      println('Вы зашли в огромную комнату. Пол — асфальтовый.\nПод потолком много труб. Перед вами стоят\nнесколько машин.');
      opt('Вернуться в холл', () =>  { room('first-hall') });
    } },
    { id: "first-hall:7", f: function() {
      println('Вы попали в большую комнату со стеклянным\nпотолком. Повсюду стоят горшки с растениями.');
      opt('Вернуться в холл', () =>  { room('first-hall') });
    } },
    { id: "first-hall:9", f: function() {
      println('Вы зашли в небольшую светлую комнату.\nОбои — зелёные. Перед вами на верёвке висит\nпчелиный улей. Раздаётся слабое жужжание.');
      opt('Подойти к улью', () =>  { room('first-hall:9:near') });
      opt('Вернуться в холл', () =>  { room('first-hall') });
    } },
    { id: "first-hall:9:near", f: function() {
      sound('bees');
      println('Вы подошли к улью. Вдруг из него вылетили пчёлы.\nСначала они просто кружилась вокруг вас, но\nпотом начали кусать...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "first-hall:10", f: function() {
      sound('phone');
      println('Вы зашли в небольшую  комнату. Обои — белые.\nДверь в холл окрашены белой краской. Перед\nвами стоит белый стол. В одном углу стоит\nбелый стул. На нём лежит чёрный телефон.\nВдруг он зазвонил.');
      opt('Взять телефон', () =>  { room('first-hall:10:take') });
      opt('Вернуться в холл', () =>  { room('first-hall') });
    } },
    { id: "first-hall:10:take", f: function() {
      println('Вы взяли чёрный телефон. Из него закричали:\n«Фу, как стыдно!!! А ну трубку положи, вор!!! Я сейчас\nтебе покажу!!!» Вдруг вы почувствовали боль в руке,\nдержавшей телефон...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "first-hall:12", f: function() {
      println('Вы вышли на улицу. Идёт снег. Ярко светит\nсолнце. Перед вами небольшой сарай.');
      opt('Подойти к сараю', () =>  { room('first-hall:12:near') });
      opt('Вернуться в холл', () =>  { room('first-hall') });
    } },
    { id: "first-hall:12:near", f: function() {
      sound('cry');
      println('Вы подошли к сараю. Вдруг его дверь\nоткрылась сама. Из-за неё смотрели два больших\nкрасных глаза. Вы упали в обморок от страха.');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "home:2:2", f: function() {
      cave();
      println('Вы находитесь в длинном коридоре-пещере.\nЕго конца не видно. Царит полумрак.');
      opt('Идти вперёд', () =>  { room('home:2:2:next') });
      opt('Выйти в «Пыльную комнату»', () =>  { day(); room('home:2'); });
    } },
    { id: "home:2:2:next", f: function() {
      sound('cave');
      println('Вы дошли до развилки.');
      opt('Свернуть налево', () =>  { room('home:2:2:next:left') });
      opt('Свернуть направо', () =>  { room('home:2:2:next:right') });
      opt('Вернуться в начало коридора', () =>  { room('home:2:2') });
    } },
    { id: "home:2:2:next:left", f: function() {
      sound('cave');
      println('Вы шли по коридору. Ваше дыхание становилось\nвсё тяжелее. Вдруг вы заметили другой коридор\nслева от вас.');
      opt('Свернуть налево', () =>  { room('home:2:2:next:left:left') });
      opt('Идти дальше', () =>  { room('home:2:2:next:left:next') });
      opt('Вернуться к развилке', () =>  { room('home:2:2:next') });
    } },
    { id: "home:2:2:next:left:left", f: function() {
      sound('cave');
      println('Вы попали в огромную пещеру. За вами\nтри коридора. Вдруг вы поняли, что забыли, из\nкакого пришли.');
      opt('Пойти в первый коридор', () =>  { room('home:2:2:next:left:left:false') });
      opt('Пойти во второй коридор', () =>  { room('home:2:2:next:left:left:false') });
      opt('Пойти в третий коридор', () =>  { room('home:2:2:next:left:left:true') });
    } },
    { id: "home:2:2:next:left:left:false", f: function() {
      sound('laugh');
      println('Коридор закончился завалом камней.');
      opt('Вернуться', () =>  { room('home:2:2:next:left:left') });
    } },
    { id: "home:2:2:next:left:left:true", f: function() {
      sound('laugh');
      println('Вы шли и шли по каменному коридору.\nВскоре вы так устали, что упали на пол...');
      opt('Продолжить', () =>  { day(); room('gameover'); });
    } },
    { id: "home:2:2:next:left:next", f: function() {
      sound('laugh');
      println('Коридор закончился завалом камней.');
      opt('Вернуться к повороту', () =>  { room('home:2:2:next:left') });
    } },
    { id: "home:2:2:next:right", f: function() {
      sound('cave');
      println('Вы шли по каменному коридору. Вдруг из-за\nочередного поворота забрезжил свет.\nВскоре вы подошли к концу коридора.\nПеред вами выход на светлую поляну с\nкрасивыми цветами.');
      opt('Выйти на полянку', () =>  { day(); room('home:2:2:next:right:out'); });
      opt('Вернуться к развилке', () =>  { room('home:2:2:next') });
    } },
    { id: "home:2:2:next:right:out", f: function() {
      sound('ghost');
      println('Вы вышли на светлую полянку. Вы очень\nустали и решили лечь на траву. Вдруг\nтрава и цветы исчезли в тумане. Вскоре\nвы почувствовали приятный запах, от которого\nвам захотелось спать. Засыпая, вы услышали\nжуткий смех: «Ха-ха!!! Вот ты и попался!»');
      opt('Продолжить', () =>  { room('robbed') });
    } },
    { id: "robbed", f: function() {
      println('Вы проснулись в небольшой комнате без обоев\nот бъющих в глаза солнечных лучей, которые\nпроникали сквозь маленькое решётчатое окно.\nПеред вами небольшая дверь.');
      opt('Зайти в дверь', () =>  { room('robbed:door1') });
      opt('Остаться в комнате', () =>  { room('robbed:stay') });
    } },
    { id: "robbed:door1", f: function() {
      sound('doorclose');
      println('Вы открыли дверь. Вдруг она захлопнулась.');
      opt('Открыть дверь ещё раз', () =>  { room('robbed:door2') });
      opt('Остаться в комнате', () =>  { room('robbed:stay') });
    } },
    { id: "robbed:door2", f: function() {
      sound('doorclose');
      println('Вы открыли дверь во второй раз. Вдруг\nона резко захлопнулась и защемила вам руку...');
      opt('Продолжить', () =>  { room('gameover', 'robbed') });
    } },
    { id: "robbed:stay", f: function() {
      sound('dooropen');
      println('Вы остались в комнате. Вдруг дверь\nоткрылась сама.');
      opt('Зайти в дверь', () =>  { room('robbed-hall') });
      opt('Остаться в комнате', () =>  { room('robbed:stay:stay') });
    } },
    { id: "robbed:stay:stay", f: function() {
      sound('doorclose');
      println('Вы остались в комнате. Дверь закрылась.\nВдруг вы почувствовали острую боль в голове.');
      opt('Продолжить', () =>  { room('gameover', 'robbed') });
    } },
    { id: "robbed-hall", f: function() {
      println('Вы находитесь в небольшом холле.\nИз него ведут четыре двери.');
      opt('Зайти в первую дверь', () =>  { room('robbed-hall:1') });
      opt('Зайти во вторую дверь', () =>  { room('robbed-hall:2') });
      opt('Зайти в третью дверь', () =>  { room('robbed-hall:3') });
      opt('Зайти в четвёртую дверь', () =>  { room('robbed-hall:4') });
    } },
    { id: "robbed-hall:1", f: function() {
      println('Вы открыли первую дверь. За ней\nоказалась другая дверь.');
      opt('Вернуться в холл', () =>  { room('robbed-hall') });
      opt('Зайти в дверь', () =>  { room('robbed-hall:1:door') });
    } },
    { id: "robbed-hall:1:door", f: function() {
      sound('laugh');
      println('Дверь за дверью оказалась заперта.');
      opt('Вернуться в холл', () =>  { room('robbed-hall') });
    } },
    { id: "robbed-hall:2", f: function() {
      println('Вы зашли в пустую комнату средних\nразмеров. Воздух — влажный. Стены — бетонные.\nПод потолком на проводах висит яркая лампа.');
      opt('Вернуться в холл', () =>  { room('robbed-hall') });
      opt('Остаться в комнате', () =>  { room('robbed-hall:2:stay') });
    } },
    { id: "robbed-hall:2:stay", f: function() {
      sound('laugh');
      println('Вы остались в пустой комнате. Вдруг лампа\nна потолке могрнула, а потом и вовсе погасла.\nСтало подозрительно темно...');
      opt('Продолжить', () =>  { room('gameover', 'robbed') });
    } },
    { id: "robbed-hall:3", f: function() {
      println('Вы зашли в небольшую комнату. Стены —\nкаменные. Перед вами горящий камин. Он\nосвещает всю комнату. Вдруг вам показалось,\nчто в огне появляется силуэт. Вскоре вы поняли,\nчто не ошиблись: фигура в огне становилась\nвсё яснее.');
      opt('Вернуться в пустую комнату', () =>  { room('robbed-hall:3:out') });
      opt('Остаться', () =>  { room('robbed-hall:3:stay') });
    } },
    { id: "robbed-hall:3:stay", f: function() {
      sound('ghost');
      println('Силуэт в камине стал похож на настоящий.\nВскоре вы услышали голос: «Ты пытался убежать?\nОт меня? Да ты знаешь, кто я? Я — дух огня,\nвеликий и ужасный. Что же, отсюда ты не\nвыйдешь!» Вдруг вы почувствовали острую\nболь в голове...');
      opt('Продолжить', () =>  { room('gameover', 'robbed') });
    } },
    { id: "robbed-hall:3:out", f: function() {
      sound('ghost');
      println('Дверь назад оказалась заперта.');
      opt('Подолбить в дверь', () =>  { room('robbed-hall:3:out:door') });
      opt('Вернуться к камину', () =>  { room('robbed-hall:3:stay') });
    } },
    { id: "robbed-hall:3:out:door", f: function() {
      sound('ghost');
      println('Вы добили в дверь, как вдруг вы услышали голос:\n«Не пытайся убежать от меня во второй раз!!!»\nВы обернулись и увидели, что силуэт в камине\nпохож на настоящий. Вдруг вы почувствовали\nострую боль в голове...');
      opt('Продолжить', () =>  { room('gameover', 'robbed') });
    } },
    { id: "robbed-hall:4", f: function() {
      println('Вы оказались в шкафу. В нём висела одежда,\nмного одежды.');
      opt('Вернуться в пустую комнату', () =>  { room('robbed-hall') });
      opt('Выйти из шкафа', () =>  { room('home') });
    } },
    { id: "gameover", f: function(to) {
      sound('gameover');
      println('Мир погрузился в темнту: игра завершена.');
      opt('Начать заново', () =>  { room(to ?? 'start') });
      dies++;
      if (dies == 20) {
        achs[1] = true;
        println('\nДостижение «Все углы собрал» открыто!');
      }
    } },
    { id: "about", f: function(from, back) {
      println('Автор идеи: Megospace\nРазработчик: Megospace\nДата выпуска: 01.04.2023\nМузыка и звуки: zvukipro.com\nВерсия: 0.2.1 (пре-альфа)\nКоличество комнат: 65');
      println('\n@@@     @@@  @@@@@@   @@@@@@    @@@@@@\n@@@@   @@@@  @@      @@        @@    @@\n@@ @@ @@ @@  @@@@@@  @@   @@@  @@    @@\n@@  @@@  @@  @@      @@    @@  @@    @@\n@@       @@  @@@@@@   @@@@@@    @@@@@@\n\n @@@@@@  @@@@@@    @@@@@@   @@@@@@  @@@@@@\n@@       @@   @@  @@    @@  @@      @@\n @@@@@   @@@@@@   @@    @@  @@      @@@@@@\n     @@  @@       @@@@@@@@  @@      @@\n@@@@@@   @@       @@    @@  @@@@@@  @@@@@@');
      opt('Назад', () =>  { room('stats', from, back) });
    } }
  ]
};
function restart() {
  achs = [false, false, false];
  dies = 0;
  skis = false;
  fivefloor = false;
  roommap = [];
  roomc = 0;
  room('start');
}
function day() {
  style = {
    background: "#803000",
    first: "#ffc070",
    second: "#ff8050",
    third: "#502000",
    backgroundbody: "#502000"
  };
}
function night() {
  style = {
    background: "#300080",
    first: "#70c0ff",
    second: "#5080ff",
    third: "#202050", 
    backgroundbody: "#200050"
  };
}
function dark() {
  style = {
    background: "#404040",
    first: "#c0c0c0",
    second: "#a0a0a0",
    third: "#202020", 
    backgroundbody: "#202020"
  };
}
function cave() {
  style = {
    background: "#205050",
    first: "#50d0d0",
    second: "#30d0d0",
    third: "#205050", 
    backgroundbody: "#104040"
  };
}

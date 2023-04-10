var obj = {
  name:  "Домик в горах",
  version: "0.5.1",
  options: {
    music: "music.mp3",
    onstart: () => {
      variable("dies", 0);
      variable("achs", new Array(7).fill(false));
      variable("robbed", new Array(4).fill(false));
      variable("helped", new Array(4).fill(false));
      variable("skis", false);
      variable("fivefloor", false);
      variable("rooms", []);
      variable("roomc", 0);
      variable("thirdfloor", 0);
      if (gamebook.restore) restore();
      else room('start');
    },
    render: () => {
      const ctx = gamebook.ctx;
      const style = obj.style;
      const cameraY = gamebook.special.cy;
      ctx.fillStyle = style.first;
      ctx.font = `${X(18)}px font`;
      if (gamebook.room.id != 'stats' && gamebook.room.id != 'about') ctx.fillText("Настройки", X(50), Y(20-cameraY));
      if (thirdfloor == 1) gamebook.ctx.drawImage(img('thirdfloor1'), X(820), Y(5), X(30), Y(30));
      if (thirdfloor == 2) gamebook.ctx.drawImage(img('thirdfloor2'), X(820), Y(5), X(30), Y(30));
    },
    touchstart: (x, y) => {
      const cameraY = gamebook.special.cy;
      if (x < 100 && y < 20-cameraY && gamebook.room.id != 'stats' && gamebook.room.id != 'about') room('stats', gamebook.room.id, gamebook.room.args);
    },
    room: () => {
      if (!rooms[gamebook.room.i]) {
        rooms[gamebook.room.i] = true;
        roomc++;
      }
      save();
    }
  },
  assets: [
    { type: "image", src: "thirdfloor1.png", id: "thirdfloor1" },
    { type: "image", src: "thirdfloor2.png", id: "thirdfloor2" },
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
    { type: "sound", src: "liftstop.mp3", id: "liftstop" },
    { type: "sound", src: "shago.mp3", id: "shago" },
    { type: "sound", src: "sudden.mp3", id: "sudden" },
    { type: "sound", src: "computerbeep.mp3", id: "computerbeep" },
    { type: "sound", src: "computererror.mp3", id: "computererror" },
    { type: "sound", src: "computeroff.mp3", id: "computeroff" },
    { type: "sound", src: "alarm.mp3", id: "alarm" }
  ],
  rooms: [
    { id: "start", f: function() {
      println('Вы вышли на снежную вершину горы.\nСлева от вас лыжная трасса. Впереди —\nдомик, у него видно четыре этажа. Снег —\nрыхлый. ');
      opt('Подойти к домику', () => { room('start:home') });
      opt('Подойти к лыжной трассе', () => { room('start:track') });
      if (achs[0]) println('Из него получился отличный снеговик.');
      else {
        println('Из него может получиться отличный\nснеговик.');
        opt('Слепить снеговика', () => { room('start:snowman') });
      }
    } },
    { id: "start:snowman", f: function() {
      sound('ach');
      println('Вы слепили снеговика.\nДостижение «Снеговик» открыто!');
      opt('Продолжить', () => { room('start') });
      achs[0] = true;
    } },
    { id: "start:track", f: function() {
      println('Вы подошли к лыжной трассе.\nСлева от вас стоит табличка: «Горнолыжная\nтрасса». Вы очень хотите скатиться вниз');
      if (skis) {
        println('.');
        opt('Скатиться вниз на лыжах', () => { room('start:track:ski') });
      } else {
        println(',\nно у вас нет лыж.');
        opt('Скатиться вниз без лыж', () => { room('start:track:down') });
      }
      opt('Вернуться на вершину', () => { room('start') });
    } },
    { id: "start:track:down", f: function() {
      sound('laugh');
      println('Вы начали катиться. Вдруг вы поняли, что\nпревращаетесь в снежный ком...');
      opt('Продолжить', () => { room('gameover') });
    } },
    { id: "stats", f: function(from, args) {
      let aco = 0;
      for (let i = 0; i < achs.length; i++) if (achs[i]) aco++;
      println('Достижения ('+aco+' из '+achs.length+'):\n\n');
      if (achs[0]) println('Снеговик: слепить снеговика.\n');
      else println('[неоткрыто]: слепить снеговика.\n');
      if (achs[1]) println('Все углы собрал: проиграть 20 раз.\n');
      else println('[неоткрыто]: проиграть 20 раз.\n');
      if (achs[2]) println('Мойщик: включить стиральную машину,\nбез последствий.\n');
      else println('[неоткрыто]: включить стиральную машину,\nбез последствий.\n');
      if (achs[3]) println('Побег: сбежать от духа огня.\n');
      else println('[неоткрыто]: сбежать от духа огня.\n');
      if (achs[4]) println('Оствновочка: застрять в лифте.\n');
      else println('[неоткрыто]: застрять в лифте.\n');
      if (achs[5]) println('Разговорчик: закончить разговор с компьютером.\n');
      else println('[неоткрыто]: закончить разговор с компьютером.\n');
      if (achs[6]) println('Помошник стихий: помочь всем четырём стихиям.\n');
      else println('[неоткрыто]: помочь всем четырём стихиям.\n');
      if (roomc == obj.rooms.length) println('Исследователь: побывать во всех комнатах.\n');
      else println('[неоткрыто]: побывать во всех комнатах.\n');
      println('\nСтатистика:\nКоличество проигрышей: '+dies+'\nКомнат исследовано:'+roomc+' (из '+obj.rooms.length+')');
      opt('Назад', () =>  { room(from, args) });
      opt('Об игре', () => { room('about', from, args) });
      opt('Новая игра', () =>  { restart() });
    } },
    { id: "start:home", f: function() {
      sound('door');
      println('Вы подошли к домику. Перед вами дверь.\nОна не заперта.');
      opt('Зайти в дом', () => { room('home') });
      opt('Вернуться на вершину', () => { room('start') });
    } },
    { id: "home", f: function() {
      println('Вы попали в небольшую прихожую.\nВпереди две двери. Слева от вас стоит шкаф.');
      opt('Зайти в первую дверь', () => { room('home:1') });
      opt('Зайти во вторую дверь', () => { room('home:2') });
      opt('Выйти на крыльцо', () => { room('start:home') });
      opt('Заглянуть в шкаф', () => { room('home:cupboard') });
    } },
    { id: "home:cupboard", f: function() {
      println('В шкафу висела одежда, много одежды.');
      opt('Продолжить', () => { room('home') });
    } },
    { id: "home:1", f: function() {
      println('Вы попали в гардероб. Всюду вешалки\nс одеждой. Перед вами две двери.');
      opt('Зайти в первую дверь', () => { room('home:1:1') });
      opt('Зайти во вторую дверь', () => { room('home:1:2') });
      opt('Вернуться в прихожую', () => { room('home') });
    } },
    { id: "home:1:1", f: function() {
      println('Вы зашли в большую комнату. Повсюду\nлежат сапоги. Впереди одна дверь.');
      opt('Зайти в дверь', () => { room('home:1:1:door') });
      opt('Вернуться в гардероб', () => { room('home:1') });
    } },
    { id: "home:1:1:door", f: function() {
      println('Вы находитесь в небольшой комнате.\nОбои — зелёные. Слева от вас — окно. За ним\nградусник. Перед вами дверь.');
      opt('Вернуться в «Сапожную»', () => { room('home:1:1') });
      opt('Зайти в дверь', () => { room('pre-elevator:1') });
      opt('Посмотреть на градусник', () => { room('home:1:1:door:temp') });
    } },
    { id: "home:1:1:door:temp", f: function() {
      println('Градусник показывал крепкий мороз — «-26.9°C».');
      opt('Продолжить', () => { room('home:1:1:door') });
    } },
    { id: "home:1:2", f: function() {
      println('Вы попали в большую комнату, обитую синей\nплиткой. Перед вами три стиральные машины.');
      opt('Включить первую стиральную машину', () => { room('home:1:2:boom') });
      opt('Включить вторую стиральную машину', () => { room('home:1:2:boom') });
      opt('Включить третью стиральную машину', () => { room('home:1:2:ok') });
      opt('Вернуться в гардероб', () => { room('home:1') });
    } },
    { id: "home:1:2:boom", f: function() {
      sound('boom');
      println('Вы включили стиральную машину.\nВдруг она затарахтела и взорвалась...');
      opt('Продолжить', () => { room('gameover') });
    } },
    { id: "home:1:2:ok", f: function() {
      println('Вы включили стиральную машину.\nНичего не произошло.');
      if (!achs[2]) {
        sound('ach');
        println('\nДостижение «Мойщик» открыто!');
        achs[2] = true;
      }
      opt('Продолжить', () => { room('home:1:2') });
    } },
    { id: "pre-elevator:1", f: function() {
      println('Вы попали в комнату средних размеров.\nБетонные стены окрашены светло-жёлтой\nкраской. На одной из них написанно:\n«1 — приёмная». Слева от вас — лифт.\nВпереди — две двери.');
      opt('Зайти в лифт', () => { room('elevator', 1) });
      opt('Зайти в первую дверь', () => { room('home:1:1:door') });
      opt('Зайти во вторую дверь', () => { room('beach') });
    } },
    { id: "beach", f: function() {
      println('Вы зашли в маленькую комнату.\nПод потолком висит яркая лампа. На полу —\nпесок. На обоях нарисованы пальмы. Перед\nвами замаскированная дверь.');
      opt('Зайти в дверь', () => { room('beach:door') });
      opt('Вернуться к лифту', () => { room('pre-elevator:1') });
    } },
    { id: "beach:door", f: function() {
      println('Вы зашли в маленькую пустую комнату.\nНа противоположной стене надпись:\n«Теперь не выйдешь отсюда».');
      opt('Вернуться на «пляж»', () => { room('beach:door:closed') });
    } },
    { id: "beach:door:closed", f: function() {
      sound('ghost');
      println('Дверь назад оказалась заперта...');
      opt('Продолжить', () => { room('gameover') });
    } },
    { id: "pre-elevator:3", f: function() {
      println('Вы попали в комнату средних размеров.\nБетонные стены окрашены светло-розовой\nкраской. На одной из них нарисована красная\nнадпись: «3 — в разработке».');
      opt('Вернуться в лифт', () => { room('elevator', 3) });
    } },
    { id: "pre-elevator:4", f: function() {
      println('Вы попали в комнату средних размеров.\nБетонные стены окрашены светло-синей\nкраской. На одной из них нарисована красная\nнадпись: «4 — в разработке».');
      opt('Вернуться в лифт', () => { room('elevator', 4) });
    } },
    { id: "pre-elevator:5", f: function() {
      println('Вы попали в комнату средних размеров.\nБетонные стены не окрашены.');
      opt('Вернуться в лифт', () => { room('elevator', 4) });
    } },
    { id: "elevator", f: function(i) {
      dark();
      const troubleprob = 0.01;
      sound('elevator');
      println(`Вы находитесь в тёмном лифте. На индикаторе\nсветится цифра «${i}». На панели управления\n${fivefloor ? "пять кнопок.":"четыре кнопки."}`);
      opt('Выйти из лифта', () =>  { day(); room('pre-elevator:'+i); });
      if (i != 1) opt('Нажать на кнопку «1»', () =>  { room(Math.random() >= troubleprob ? 'elevator':'elevator:stop', 1) });
      if (i != 2) opt('Нажать на кнопку «2»', () =>  { room(Math.random() >= troubleprob ? 'elevator':'elevator:stop', 2) });
      if (i != 3) opt('Нажать на кнопку «3»', () =>  { room(Math.random() >= troubleprob ? 'elevator':'elevator:stop', 3) });
      if (i != 4) opt('Нажать на кнопку «4»', () =>  { room(Math.random() >= troubleprob ? 'elevator':'elevator:stop', 4) });
      if (i != 5 && fivefloor) opt('Нажать на кнопку «5»', () =>  { room(Math.random() >= troubleprob ? 'elevator':'elevator:stop', 5) });
    } },
    { id: "elevator:stop", f: function() {
      sound('liftstop');
      println('Вы ехали в лифте. Вдруг он дёрнулся и\nостановился. Стало очень темно...');
      if (!achs[4]) {
        achs[4] = true;
        println('\nДостижение «Остановачка» открыто!');
      }
      opt('Продолжить', () =>  { day(); room('gameover') });
    } },
    { id: "home:2", f: function() {
      println('Вы попали в большую комнату.\nНа полу осел толстый слой пыли. Перед вами\nдве двери.');
      opt('Зайти в первую дверь', () => { room('first-hall') });
      opt('Зайти во вторую дверь', () => { room('home:2:2') });
      opt('Вернуться в прихожую', () => { room('home') });
    } },
    { id: "first-hall", f: function() {
      println('Вы находитесь в огромном светлом холле.\nИз него ведут двенадцать дверей.');
      opt('Вернуться в «Пыльную комнату»', () => { room('home:2') });
      opt('Зайти в первую дверь', () => { room('first-hall:1') });
      opt('Зайти во вторую дверь', () => { room('first-hall:2') });
      opt('Зайти в третью дверь', () => { room('first-hall:3') });
      opt('Зайти в четвёртую дверь', () => { room('first-hall:door:false') });
      opt('Зайти в пятую дверь', () => { room('first-hall:5') });
      opt('Зайти в шестую дверь', () => { room('first-hall:6') });
      opt('Зайти в седьмую дверь', () => { room('first-hall:7') });
      opt('Зайти в восьмую дверь', () => { room('first-hall:door:falss') });
      opt('Зайти в девятую дверь', () => { room('first-hall:9') });
      opt('Зайти в десятую дверь', () => { room('first-hall:10') });
      opt('Зайти в одиннадцатую дверь', () => { room('first-hall:door:false') });
      opt('Зайти в двенадцатую дверь', () => { room('first-hall:12') });
    } },
    { id: "first-hall:1", f: function() {
      println('Вы зашли в маленькую тёмную комнату.\nУ стен стоят мётлы и веники.');
      opt('Вернуться в холл', () => { room('first-hall') });
    } },
    { id: "first-hall:2", f: function() {
      println('Вы вошли в небольшую комнату. На полу\nпостелен искусственный газон. Посредине —\nнадувной бассейн.');
      opt('Вернуться в холл', () => { room('first-hall') });
    } },
    { id: "first-hall:3", f: function() {
      println('Вы зашли в небольшую комнату. Стены закрыты\nшкафами.');
      opt('Вернуться в холл', () => { room('first-hall') });
    } },
    { id: "first-hall:door:false", f: function() {
      sound('laugh');
      println('Дверь оказалась фальшивой — за ней стена.');
      opt('Продолжить', () => { room('first-hall') });
    } },
    { id: "first-hall:5", f: function() {
      println('Вы зашли в маленькую и абсолютно пустую комнату.');
      opt('Вернуться в холл', () => { room('first-hall') });
    } },
    { id: "first-hall:6", f: function() {
      println('Вы зашли в огромную комнату. Пол — асфальтовый.\nПод потолком много труб. Перед вами стоят\nнесколько машин.');
      opt('Вернуться в холл', () => { room('first-hall') });
    } },
    { id: "first-hall:7", f: function() {
      println('Вы попали в большую комнату со стеклянным\nпотолком. Повсюду стоят горшки с растениями.');
      opt('Вернуться в холл', () => { room('first-hall') });
    } },
    { id: "first-hall:9", f: function() {
      println('Вы зашли в небольшую светлую комнату.\nОбои — зелёные. Перед вами на верёвке висит\nпчелиный улей. Раздаётся слабое жужжание.');
      opt('Подойти к улью', () => { room('first-hall:9:near') });
      opt('Вернуться в холл', () => { room('first-hall') });
    } },
    { id: "first-hall:9:near", f: function() {
      sound('bees');
      println('Вы подошли к улью. Вдруг из него вылетили пчёлы.\nСначала они просто кружилась вокруг вас, но\nпотом начали кусать...');
      opt('Продолжить', () => { room('gameover') });
    } },
    { id: "first-hall:10", f: function() {
      sound('phone');
      println('Вы зашли в небольшую  комнату. Обои — белые.\nДверь в холл окрашены белой краской. Перед\nвами стоит белый стол. В одном углу стоит\nбелый стул. На нём лежит чёрный телефон.\nВдруг он зазвонил.');
      opt('Взять телефон', () => { room('first-hall:10:take') });
      opt('Вернуться в холл', () => { room('first-hall') });
    } },
    { id: "first-hall:10:take", f: function() {
      println('Вы взяли чёрный телефон. Из него закричали:\n«Фу, как стыдно!!! А ну трубку положи, вор!!! Я сейчас\nтебе покажу!!!» Вдруг вы почувствовали боль в руке,\nдержавшей телефон...');
      opt('Продолжить', () => { room('gameover') });
    } },
    { id: "first-hall:12", f: function() {
      println('Вы вышли на улицу. Идёт снег. Ярко светит\nсолнце. Перед вами небольшой сарай.');
      opt('Подойти к сараю', () => { room('first-hall:12:near') });
      opt('Вернуться в холл', () => { room('first-hall') });
    } },
    { id: "first-hall:12:near", f: function() {
      sound('cry');
      println('Вы подошли к сараю. Вдруг его дверь\nоткрылась сама. Из-за неё смотрели два больших\nкрасных глаза. Вы упали в обморок от страха.');
      opt('Продолжить', () => { room('gameover') });
    } },
    { id: "home:2:2", f: function() {
      cave();
      println('Вы находитесь в длинном коридоре-пещере.\nЕго конца не видно. Царит полумрак.');
      opt('Идти вперёд', () => { room('home:2:2:next') });
      opt('Выйти в «Пыльную комнату»', () =>  { day(); room('home:2'); });
    } },
    { id: "home:2:2:next", f: function() {
      sound('cave');
      println('Вы дошли до развилки.');
      opt('Свернуть налево', () => { room('home:2:2:next:left') });
      opt('Свернуть направо', () => { room('home:2:2:next:right') });
      opt('Вернуться в начало коридора', () => { room('home:2:2') });
    } },
    { id: "home:2:2:next:left", f: function() {
      sound('cave');
      println('Вы шли по коридору. Ваше дыхание становилось\nвсё тяжелее. Вдруг вы заметили другой коридор\nслева от вас.');
      opt('Свернуть налево', () => { room('home:2:2:next:left:left') });
      opt('Идти дальше', () => { room('home:2:2:next:left:next') });
      opt('Вернуться к развилке', () => { room('home:2:2:next') });
    } },
    { id: "home:2:2:next:left:left", f: function() {
      sound('cave');
      println('Вы попали в огромную пещеру. За вами\nтри коридора. Вдруг вы поняли, что забыли, из\nкакого пришли.');
      opt('Пойти в первый коридор', () => { room('home:2:2:next:left:left:false') });
      opt('Пойти во второй коридор', () => { room('home:2:2:next:left:left:false') });
      opt('Пойти в третий коридор', () => { room('home:2:2:next:left:left:true') });
    } },
    { id: "home:2:2:next:left:left:false", f: function() {
      sound('laugh');
      println('Коридор закончился завалом камней.');
      opt('Вернуться', () => { room('home:2:2:next:left:left') });
    } },
    { id: "home:2:2:next:left:left:true", f: function() {
      sound('laugh');
      println('Вы шли и шли по каменному коридору.\nВскоре вы так устали, что упали на пол...');
      opt('Продолжить', () =>  { day(); room('gameover'); });
    } },
    { id: "home:2:2:next:left:next", f: function() {
      sound('laugh');
      println('Коридор закончился завалом камней.');
      opt('Вернуться к повороту', () => { room('home:2:2:next:left') });
    } },
    { id: "home:2:2:next:right", f: function() {
      sound('cave');
      println('Вы шли по каменному коридору. Вдруг из-за\nочередного поворота забрезжил свет.\nВскоре вы подошли к концу коридора.\nПеред вами выход на светлую поляну с\nкрасивыми цветами.');
      opt('Выйти на полянку', () =>  { day(); room('home:2:2:next:right:out'); });
      opt('Вернуться к развилке', () => { room('home:2:2:next') });
    } },
    { id: "home:2:2:next:right:out", f: function() {
      sound('ghost');
      println('Вы вышли на светлую полянку. Вы очень\nустали и решили лечь на траву. Вдруг\nтрава и цветы исчезли в тумане. Вскоре\nвы почувствовали приятный запах, от которого\nвам захотелось спать. Засыпая, вы услышали\nжуткий смех: «Ха-ха!!! Вот ты и попался!»');
      opt('Продолжить', () => { room('robbed') });
    } },
    { id: "robbed", f: function() {
      println('Вы проснулись в небольшой комнате без обоев\nот бъющих в глаза солнечных лучей, которые\nпроникали сквозь маленькое решётчатое окно.\nПеред вами небольшая дверь.');
      opt('Зайти в дверь', () => { room('robbed:door1') });
      opt('Остаться в комнате', () => { room('robbed:stay') });
    } },
    { id: "robbed:door1", f: function() {
      sound('doorclose');
      println('Вы открыли дверь. Вдруг она захлопнулась.');
      opt('Открыть дверь ещё раз', () => { room('robbed:door2') });
      opt('Остаться в комнате', () => { room('robbed:stay') });
    } },
    { id: "robbed:door2", f: function() {
      sound('doorclose');
      println('Вы открыли дверь во второй раз. Вдруг\nона резко захлопнулась и защемила вам руку...');
      opt('Продолжить', () => { room('gameover', 'robbed') });
    } },
    { id: "robbed:stay", f: function() {
      sound('dooropen');
      println('Вы остались в комнате. Вдруг дверь\nоткрылась сама.');
      opt('Зайти в дверь', () => { room('robbed-hall') });
      opt('Остаться в комнате', () => { room('robbed:stay:stay') });
    } },
    { id: "robbed:stay:stay", f: function() {
      sound('doorclose');
      println('Вы остались в комнате. Дверь закрылась.\nВдруг вы почувствовали острую боль в голове.');
      opt('Продолжить', () => { room('gameover', 'robbed') });
    } },
    { id: "robbed-hall", f: function() {
      println('Вы находитесь в небольшом холле.\nИз него ведут четыре двери.');
      opt('Зайти в первую дверь', () => { room('robbed-hall:1') });
      opt('Зайти во вторую дверь', () => { room('robbed-hall:2') });
      opt('Зайти в третью дверь', () => { room('robbed-hall:3') });
      opt('Зайти в четвёртую дверь', () => { room('robbed-hall:4') });
    } },
    { id: "robbed-hall:1", f: function() {
      println('Вы открыли первую дверь. За ней\nоказалась другая дверь.');
      opt('Вернуться в холл', () => { room('robbed-hall') });
      opt('Зайти в дверь', () => { room('robbed-hall:1:door') });
    } },
    { id: "robbed-hall:1:door", f: function() {
      sound('laugh');
      println('Дверь за дверью оказалась заперта.');
      opt('Вернуться в холл', () => { room('robbed-hall') });
    } },
    { id: "robbed-hall:2", f: function() {
      println('Вы зашли в пустую комнату средних\nразмеров. Воздух — влажный. Стены — бетонные.\nПод потолком на проводах висит яркая лампа.');
      opt('Вернуться в холл', () => { room('robbed-hall') });
      opt('Остаться в комнате', () => { room('robbed-hall:2:stay') });
    } },
    { id: "robbed-hall:2:stay", f: function() {
      sound('laugh');
      println('Вы остались в пустой комнате. Вдруг лампа\nна потолке могрнула, а потом и вовсе погасла.\nСтало подозрительно темно...');
      opt('Продолжить', () => { room('gameover', 'robbed') });
    } },
    { id: "robbed-hall:3", f: function() {
      println('Вы зашли в небольшую комнату. Стены —\nкаменные. Перед вами горящий камин. Он\nосвещает всю комнату. Вдруг вам показалось,\nчто в огне появляется силуэт. Вскоре вы поняли,\nчто не ошиблись: фигура в огне становилась\nвсё яснее.');
      opt('Вернуться в пустую комнату', () => { room('robbed-hall:3:out') });
      opt('Остаться', () => { room('robbed-hall:3:stay') });
    } },
    { id: "robbed-hall:3:stay", f: function() {
      sound('ghost');
      println('Силуэт в камине стал похож на настоящий.\nВскоре вы услышали голос: «Ты пытался убежать?\nОт меня? Да ты знаешь, кто я? Я — дух огня,\nвеликий и ужасный. Что же, отсюда ты не\nвыйдешь!» Вдруг вы почувствовали острую\nболь в голове...');
      opt('Продолжить', () => { room('gameover', 'robbed') });
    } },
    { id: "robbed-hall:3:out", f: function() {
      sound('ghost');
      println('Дверь назад оказалась заперта.');
      opt('Подолбить в дверь', () => { room('robbed-hall:3:out:door') });
      opt('Вернуться к камину', () => { room('robbed-hall:3:stay') });
    } },
    { id: "robbed-hall:3:out:door", f: function() {
      sound('ghost');
      println('Вы добили в дверь, как вдруг вы услышали голос:\n«Не пытайся убежать от меня во второй раз!!!»\nВы обернулись и увидели, что силуэт в камине\nпохож на настоящий. Вдруг вы почувствовали\nострую боль в голове...');
      opt('Продолжить', () => { room('gameover', 'robbed') });
    } },
    { id: "robbed-hall:4", f: function() {
      println('Вы оказались в шкафу. В нём висела одежда,\nмного одежды.');
      if (!achs[3]) {
        sound('ach');
        achs[3] = true;
        println('\nДостижение «Побег» открыто!');
      }
      opt('Вернуться в пустую комнату', () => { room('robbed-hall') });
      opt('Выйти из шкафа', () => { room('home') });
    } },
    { id: "pre-elevator:2", f: function() {
      println('Вы попали в комнату средних размеров.\nБетонные стены окрашены в светло-зелёный\nцвет. На одной из них красная надпись:\n«2 — жилой комплекс». Перед вами две двери.');
      opt('Зайти в первую дверь', () => { room('huge-hall') });
      opt('Зайти во вторую дверь', () => { room('pre-elevator:2:2') });
      opt('Зайти в лифт', () => { room('elevator', 2) });
    } },
    { id: "huge-hall", f: function() {
      println('Вы находитесь в огромном холле.\nИз него ведут 300 дверей. На каждой из них\nвисит номерок.');
      opt('Проверить каждую дверь', () => { room('huge-hall:check') });
      opt('Вернуться к лифту', () => { room('pre-elevator:2') });
    } },
    { id: "huge-hall:check", f: function() {
      println('Открытыми оказались только двери:\n«13», «37», «42», «68», «131», «182»,\n«224» и «256».');
      opt('Зайти в дверь «13»', () => { room('huge-hall:13') });
      opt('Зайти в дверь «37»', () => { room('huge-hall:37') });
      opt('Зайти в дверь «42»', () => { room('huge-hall:42') });
      opt('Зайти в дверь «68»', () => { room('huge-hall:68') });
      opt('Зайти в дверь «131»', () => { room('huge-hall:131') });
      opt('Зайти в дверь «182»', () => { room('huge-hall:182') });
      opt('Зайти в дверь «224»', () => { room('huge-hall:224') });
      opt('Зайти в дверь «256»', () => { room('huge-hall:256') });
      opt('Вернуться к лифту', () => { room('pre-elevator:2') });
    } },
    { id: "huge-hall:13", f: function() {
      println('Вы зашли в комнату средних размеров.\nПеред вами большой письменный стол.\nНа нём ничего не лежит.');
      opt('Вернуться в холл', () => { room('huge-hall') });
    } },
    { id: "huge-hall:37", f: function() {
      println('Вы зашли в маленькую комнату с низким\nпотолком. Перед вами много крысиные клеток,\nно все они пусты.');
      opt('Вернуться в холл', () => { room('huge-hall') });
    } },
    { id: "huge-hall:42", f: function() {
      sound('computerbeep');
      println('Вы зашли в большую комнату. Стены\nзагораживет огромный компьютер. Его\nлампочки быстро перемигиваются. Раздаётся\nгул. Перед вами пустой экран и большая\nкрасная кнопка.');
      opt('Вернуться в холл', () => { room('huge-hall') });
      opt('Нажать на кнопку', () => { room('huge-hall:42:button') });
    } },
    { id: "huge-hall:42:button", f: function() {
      sound('alarm');
      println('Вы нажали на красную кнопку. Включилась\nоглушительная сирена.');
      opt('Выйти в холл', () => { room('huge-hall') });
      opt('Подождать ещё чуть-чуть', () => { room('huge-hall:42:boom') });
    } },
    { id: "huge-hall:42:boom", f: function() {
      sound('boom');
      println('Вы остались у огромного компьютера.\nНа его экране появилась надпись:\n«Самоуничтожение».\n3... 2... 1... БА-БАХ!!!...');
      opt('Продолжить', () => { room('gameover', 'pre-elevator:2') });
    } },
    { id: "huge-hall:68", f: function() {
      println('Вы зашли в маленькую комнату. На полу\nраскиданы бумажеки с каким-то текстом.');
      opt('Выйти в холл', () => { room('huge-hall') });
      opt('Прочитать одну из бумажек', () => { room('huge-hall:68:1') });
    } },
    { id: "huge-hall:68:1", f: function() {
      println('Люблю тебя я как морковь.\nВнутри меня — к тебе любовь.\nМоя любовь к тебе светлее светлячка.\nМоя любовь к тебе теплее очага.');
      opt('Выйти в холл', () => { room('huge-hall') });
      opt('Прочитать ещё одну бумажку', () => { room('huge-hall:68:2') });
    } },
    { id: "huge-hall:68:2", f: function() {
      println('На чердаке три мышки жили.\nИ жили они не тужили.\nНо тут пришли три рыжих кота\nИ прогнали мышат с чердака...');
      opt('Выйти в холл', () => { room('huge-hall') });
    } },
    { id: "huge-hall:131", f: function() {
      println('Вы зашли в комнату средних размеров.\nПеред вами зеркало. Слева от вас — окно.\nИ справа — тоже окно.');
      opt('Посмотреть в зеркало', () => { room('huge-hall:131:mirror') });
      opt('Посмотреть в первое окно', () => { room('huge-hall:131:window:1') });
      opt('Посмотреть во второе окно', () => { room('huge-hall:131:window:2') });
      opt('Вернуться в холл', () => { room('huge-hall') });
    } },
    { id: "huge-hall:131:mirror", f: function() {
      sound('shago');
      println('Вы посмотрели в зеркало. Вы увидели себя.\nВдруг вы увидели за спиной огромную тень.\nОна медленно подходила к вам, отделяясь от стены.');
      opt('Подождать', () => { room('huge-hall:131:mirror:wait') });
      opt('Обернуться', () => { room('huge-hall:131:mirror:see') });
    } },
    { id: "huge-hall:131:mirror:wait", f: function() {
      sound('shago');
      println('Тень крадучись подходила к вам. Вдруг\nвы начали различать шёпот: «Спаси нас!\nПоднимись на третий этаж». После этого\nтень растворилась в воздухе.');
      opt('Продолжить', () => { room('huge-hall:131') });
    } },
    { id: "huge-hall:131:mirror:see", f: function() {
      sound('sudden');
      println('Вы обернулись. Тень растворилась в воздухе.');
      opt('Продолжить', () => { room('huge-hall:131') });
    } },
    { id: "huge-hall:131:window:1", f: function() {
      println('За первым окном был густой туман.\nВы вглядывались в него, но ничего не увидели.');
      opt('Продолжить', () => { room('huge-hall:131') });
    } },
    { id: "huge-hall:131:window:2", f: function() {
      println('За вторым окном шёл снег.');
      opt('Продолжить', () => { room('huge-hall:131') });
    } },
    { id: "huge-hall:182", f: function() {
      println('Вы зашли в большую комнату. Слева от\nот вас стоят четыре кровати. Справа – ещё\nпять. Между ними проход. В его конце —\nдверь.');
      opt('Выйти в холл', () => { room('huge-hall') });
      opt('Зайти в дверь', () =>  { room(achs[3] ? 'huge-hall:182:door':'huge-hall:182:door:closed') });
    } },
    { id: "huge-hall:182:door:closed", f: function() {
      println('Дверь оказалась заперта.');
      opt('Продолжить', () => { room('huge-hall:182') });
    } },
    { id: "huge-hall:182:door", f: function() {
      println('Вы зашли в небольшую комнату. Стены —\nбетонные. Вдруг вы услышали щелчок, воздух\nв комнате начал вращаться вокруг вас. Вскоре\nвы заметили, что перед вами появляется\nполупрозрачный силуэт. С каждой секундой\nон становился всё яснее.');
      opt('Выйти в комнату с кроватями', () => { room('huge-hall:182:door:out') });
      opt('Остаться в комнате', () => { room('huge-hall:182:door:stay') });
    } },
    { id: "huge-hall:182:door:stay", f: function() {
      sound('ghost');
      println('Силуэт в воздухе становился всё яснее.\nВскоре он стал похож на настоящий. Вдруг вы\nуслышали голос: «Ты сбежал от моего брата!\nНо отсюда ты не выйдешь! Потому что я — дух\nвоздуха! Ха-ха-ха-ха!!!!» — вдруг вам стало\nтяжело дышать...');
      opt('Продолжить', () => { room('gameover', 'pre-elevator:2') });
    } },
    { id: "huge-hall:182:door:out", f: function() {
      sound('ghost');
      println('Дверь назад оказалась заперта.');
      opt('Подолбить в дверь', () => { room('huge-hall:182:door:out:door') });
      opt('Остаться в комнате', () => { room('huge-hall:182:door:stay') });
    } },
    { id: "huge-hall:182:door:out:door", f: function() {
      sound('ghost');
      println('Вы добили в дверь, как вдруг вы услышали голос:\n«Ты сбежал от моего брата!» — вы обернулись и\nувидели, что силуэт в воздухе стал похож на\nнастоящий. Вдруг вам стало тяжело дышать...');
      opt('Продолжить', () => { room('gameover', 'pre-elevator:2') });
    } },
    { id: "huge-hall:224", f: function() {
      println('Вы зашли в комнату средних размеров.\nПеред вами стол и стул. На столе стоит\nкомпьютер.');
      opt('Подойти к столу', () => { room('huge-hall:224:near') });
      opt('Вернуться в холл', () => { room('huge-hall') });
    } },
    { id: "huge-hall:224:near", f: function() {
      sound('computerbeep');
      println('На экране компьютера была большая надпись:\n«Поговори со мной!» И маленькая надпись ниже:\n«Здравствуйте, меня зовут username!» И ещё ниже\n— поле для ввода текста.');
      opt('Написать «Здравствуйте!»', () => { room('huge-hall:224:near:hello') });
      opt('Написать «И вам не хворать»', () => { room('huge-hall:224:near:error') });
      opt('Написать «До свидания»', () => { room('huge-hall:224:near:error') });
      opt('Выйти в холл', () => { room('huge-hall') });
    } },
    { id: "huge-hall:224:near:hello", f: function() {
      sound('computerbeep');
      println('На экране компьютера появилась новая надпись:\n«Хорошая ли у вас погода?»');
      opt('Написать «Хорошая»', () => { room('huge-hall:224:near:error') });
      opt('Написать «Плохая»', () => { room('huge-hall:224:near:error') });
      opt('Написать «А у вас?»', () => { room('huge-hall:224:near:hello:you') });
      opt('Выйти в холл', () => { room('huge-hall') });
    } },
    { id: "huge-hall:224:near:hello:you", f: function() {
      sound('computerbeep');
      println('— Отличная! Идёт снег. Светит солнце. И вообще\nочень жаркий и пасмурный день.');
      opt('Написать «А как у вас дела?»', () => { room('huge-hall:224:near:hello:you:do') });
      opt('Написать «У меня тоже»', () => { room('huge-hall:224:near:error') });
      opt('Написать «А у меня наоборот»', () => { room('huge-hall:224:near:error') });
      opt('Выйти в холл', () => { room('huge-hall') });
    } },
    { id: "huge-hall:224:near:hello:you:do", f: function() {
      sound('computerbeep');
      println('— Превосходно! Ой! Я вспомнил, у меня\nже куча дел! До свидания!');
      opt('Написать «До свидания»', () => { room('huge-hall:224:near:hello:you:do:bye') });
      opt('Написать «Прощайте»', () => { room('huge-hall:224:near:error') });
      opt('Выйти в холл', () => { room('huge-hall') });
    } },
    { id: "huge-hall:224:near:hello:you:do:bye", f: function() {
      sound('computeroff');
      println('Экран компьютера погас.');
      opt('Попытаться включить компьютер', () => { room('huge-hall:224:near:hello:you:do:bye:turnon') });
      opt('Выйти в холл', () => { room('huge-hall') });
      if (!achs[5]) {
        achs[5] = true;
        println('\nДостижение «Разговорчик» открыто!');
      }
    } },
    { id: "huge-hall:224:near:hello:you:do:bye:turnon", f: function() {
      println('Вы нажали на кнопку включения компьютера.\nНа его экране появилась надпись: «У меня\nкуча дел!» Через несколько секунд она пропала.');
      opt('Выйти в холл', () => { room('huge-hall') });
    } },
    { id: "huge-hall:224:near:error", f: function() {
      sound('computererror');
      println('Экран компьютера погас. Вдруг на нём появилась\nбольшая красная надпись: «Ошибка!... Error!...\nКод: 1....Code: 1....»');
      opt('Остаться у компьютера', () => { room('huge-hall:224:near:error:boom') });
      opt('Выйти в холл', () => { room('huge-hall') });
    } },
    { id: "huge-hall:224:near:error:boom", f: function() {
      sound('boom');
      println('Вы остались у компьютера. Вдруг он затарахтел\nи взорвался...');
      opt('Продолжить', () => { room('gameover', 'pre-elevator:2') });
    } },
    { id: "huge-hall:256", f: function() {
      println('Вы зашли в маленькую светлую комнату.\nПеред вами стол. На нём лежит конверт с\nнадписью: «От кого: от меня. Кому: вам.\nОт куда: оттуда. Куда: сюда».');
      opt('Открыть конверт', () => { room('huge-hall:256:open') });
      opt('Перевернуть конверт', () => { room('huge-hall:256:back') });
      opt('Выйти в холл', () => { room('huge-hall') });
    } },
    { id: "huge-hall:256:back", f: function() {
      println('На обратной стороне конверта было написано:\n«Открой меня!»');
      opt('Открыть конверт', () => { room('huge-hall:256:open') });
      opt('Выйти в холл', () => { room('huge-hall') });
    } },
    { id: "huge-hall:256:open", f: function() {
      if (thirdfloor == 0) println('В конверте лежала бумага с надписью:\n«Разрешения на получение пропуска на\nтретий этаж».');
      else println('Конверт был пуст.');
      opt('Перевернуть конверт', () => { room('huge-hall:256:back') });
      opt('Взять бумагу', () => { room('huge-hall:256:open:take') });
      opt('Выйти в холл', () => { room('huge-hall') });
    } },
    { id: "huge-hall:256:open:take", f: function() {
      println('Вы взяли бумагу.');
      thirdfloor = 1;
      opt('Перевернуть конверт', () => { room('huge-hall:256:back') });
      opt('Выйти в холл', () => { room('huge-hall') });
    } },
    { id: "pre-elevator:2:2", f: function() {
      println('Вы зашли в большую комнату. Перед вами\nстоит стол. За ним две двери.');
      opt('Зайти в первую дверь', () => { room('pre-elevator:2:2:1') });
      opt('Зайти во вторую дверь', () => { room('second-hall') });
      opt('Подойти к столу', () => { room('pre-elevator:2:2:table') });
      opt('Вернуться к лифту', () => { room('pre-elevator:2') });
    } },
    { id: "pre-elevator:2:2:table", f: function() {
      println('На столе лежала большая карта.');
      opt('Зайти в первую дверь', () => { room('pre-elevator:2:2:1') });
      opt('Зайти во вторую дверь', () => { room('second-hall') });
      opt('Заглянуть под карту', () => { room('pre-elevator:2:2:table:map') });
      opt('Выйти к лифту', () => { room('pre-elevator:2') });
    } },
    { id: "pre-elevator:2:2:table:map", f: function() {
      println('Под картой была небольшая записка:\n«Третий этаж закрыт на ремонт, но там происходит\nчто-то неладное. Пропуск можно получить\nв офисе...»');
      opt('Зайти в первую дверь', () => { room('pre-elevator:2:2:1') });
      opt('Зайти во вторую дверь', () => { room('second-hall') });
      opt('Выйти к лифту', () => { room('pre-elevator:2') });
    } },
    { id: "pre-elevator:2:2:1", f: function() {
      println('Вы зашли в небольшую комнату. Слева от вас —\nбольшое окно. Впереди одна дверь.');
      opt('Выйти в комнату со столом', () => { room('pre-elevator:2:2') });
      opt('Посмотреть в окно', () => { room('pre-elevator:2:2:1:window') });
      opt('Зайти в дверь', () => { room('pre-elevator:2:2:1:door') });
    } },
    { id: "pre-elevator:2:2:1:window", f: function() {
      println('За окном стоит огромный небоскрёб: его крыша\nскрывается в облаках.');
      opt('Продолжить', () => { room('pre-elevator:2:2:1') });
    } },
    { id: "pre-elevator:2:2:1:door", f: function() {
      println('Вы зашли в большую комнату. Перед вами\nстол с надписью: «Пропуски на третий этаж»,\nтабличка «Добро пожаловать в офис!» и дверь.');
      opt('Вернуться в комнату с окном', () => { room('pre-elevator:2:2:1') });
      opt('Подойти к столу', () => { room('pre-elevator:2:2:1:door:table') });
      opt('Зайти в дверь', () => { room('pre-elevator:2:2:1:door:door') });
    } },
    { id: "pre-elevator:2:2:1:door:door", f: function() {
      sound('laugh');
      println('Дверь оказалась заперта.');
      opt('Продолжить', () => { room('pre-elevator:2:2:1:door') });
    } },
    { id: "pre-elevator:2:2:1:door:table", f: function() {
      println('На столе стоял маленький аппарат. На нём\nнадпись: «Прислоните разрешение».');
      opt('Вернуться к двери', () => { room('pre-elevator:2:2:1:door') });
      if (thirdfloor == 1) opt('Прислонить разрешение', () => { room('pre-elevator:2:2:1:door:table:touch') });
    } },
    { id: "pre-elevator:2:2:1:door:table:touch", f: function() {
      println('Вы прислонили разрешение к аппарату.\nОно раствор лось у вас в руках. Из аппарата\nвыехал пропуск. Вы взяли его.');
      thirdfloor = 2;
      opt('Вернуться к двери', () => { room('pre-elevator:2:2:1:door') });
    } },
    { id: "second-hall", f: function() {
      println('Вы зашли в большой холл.\nИз него ведут семь дверей.');
      opt('Выйти в комнату со столом', () => { room('pre-elevator:2:2') });
      opt('Зайти в первую дверь', () => { room('second-hall:1') });
      opt('Зайти во вторую дверь', () => { room('second-hall:2') });
      opt('Зайти в третью дверь', () => { room('second-hall:3') });
      opt('Зайти в четвёртую дверь', () => { room('second-hall:4') });
      opt('Зайти в пятую дверь', () => { room('second-hall:5') });
      opt('Зайти в шестую дверь', () => { room('second-hall:6') });
      opt('Зайти в седьмую дверь', () => { room('second-hall:7') });
    } },
    { id: "second-hall:1", f: function() {
      println('Вы зашли в маленькую комнату.\nПеред вами какой-то шнур и спички.');
      opt('Поджечь шнур', () => { room('second-hall:1:boom') });
      opt('Вернуться в холл', () => { room('second-hall') });
    } },
    { id: "second-hall:1:boom", f: function() {
      sound('boom');
      println('Вы подожгли шнур. Огонёк быстро\nпобежал по нему. Через несколько секунд весь\nшнур догорел: БА-БАХ!!!');
      opt('Продолжить', () => { room('gameover', 'pre-elevator:2') });
    } },
    { id: "second-hall:2", f: function() {
      println('Вы зашли в комнату средних размеров.\nиз неё ведут две двери. Под потолком висит\nлампа без абажура. Она и освещает всю комнату.');
      opt('Зайти в первую дверь', () => { room('second-hall:2:1') });
      opt('Зайти во вторую дверь', () => { room('second-hall:2:2') });
      opt('Вернуться в холл', () => { room('second-hall') });
    } },
    { id: "second-hall:2:1", f: function() {
      sound('cry');
      println('Вы подошли к первой двери. Вдруг свет в\nкомнате моргнул и погас. Вы открыли дверь.\nИз-за неё на вас смотрели два больших\nсветящихся глаза. Вы упали в обморок от ужаса...');
      opt('Продолжить', () => { room('gameover', 'pre-elevator:2') });
    } },
    { id: "second-hall:2:2", f: function() {
      night();
      println('Вы зашли в маленькую комнату. Свет неё\nпроходит только через открытую вами дверь.\nВдруг она захлопнулась. Стало очень темно.');
      opt('Остаться в комнате', () => { room('second-hall:2:2:stay') });
      opt('Выйти в комнату с лампой', () => { room('second-hall:2:2:door') });
    } },
    { id: "second-hall:2:2:door", f: function() {
      sound('ghost');
      println('Дверь назад не открывалась.');
      opt('Остаться в комнате', () => { room('second-hall:2:2:stay') });
    } },
    { id: "second-hall:2:2:stay", f: function() {
      sound('cry');
      println('Вы остались в тёмной комнате. Вдруг\nперед вами появились два больших светящихся\nглаза. Вы попали в обморок от ужаса.');
      opt('Продолжить', () => { day(); room('gameover', 'pre-elevator:2'); });
    } },
    { id: "second-hall:3", f: function() {
      sound('laugh');
      println('Дверь оказалась заперта.');
      opt('Продолжить', () => { room('second-hall') });
    } },
    { id: "second-hall:4", f: function() {
      println('Вы зашли в комнату средних размеров.\nПеред вами стоит большое яйцо.');
      opt('Подойти к яйцу', () => { room('second-hall:4:near') });
      opt('Выйти в холл', () => { room('second-hall') });
    } },
    { id: "second-hall:4:near", f: function() {
      println('Вы подошли к яйцу. На нём оказалась надпись:\n«Прикоснись ко мне!»');
      opt('Прикоснуться к яйцу', () => { room('second-hall:4:near:touch') });
      opt('Выйти в холл', () => { room('second-hall') });
    } },
    { id: "second-hall:4:near:touch", f: function() {
      println('Вы прикоснулись к яйцу. Вдруг оно вспыхнуло\nярким пламенем, вы быстро отдёрнули руку.\nВскоре на нём появилась трещина, потом другая\nи через несколько секунд яйцо раскололось.\nИз него вылетел феникс! Он немного покружил\nнад вами и куда-то улетел.');
      opt('Выйти в холл', () => { room('second-hall') });
      helped[0] = true;
      if (!helped.includes(false) && !achs[6]) {
        achs[6] = true;
        sound('ach');
        println('\nДостижение «Помошник стихий» открыто!');
      }
    } },
    { id: "second-hall:5", f: function() {
      println('Вы зашли в комнату средних размеров.\nПеред вами стоит горшок с землёй рядом с\nним стоит лейка.');
      opt('Подойти к горшку с землёй', () => { room('second-hall:5:near') });
      opt('Выйти в холл', () => { room('second-hall') });
    } },
    { id: "second-hall:5:near", f: function() {
      println('В горшке рос маленький росток. Он почти\nзасох. Лейка рядом оказалась наполнена\nводой. ');
      opt('Полить росток', () => { room('second-hall:5:near:water') });
      opt('Выйти в холл', () => { room('second-hall') });
    } },
    { id: "second-hall:5:near:water", f: function() {
      println('Вы полили росток. Он тут же выпрямился и\nразвернул свои листья, но они были по прежнему\nжёлтыми. В лейке осталось ещё много воды.');
      opt('Полить росток ещё раз', () => { room('second-hall:5:near:water:water') });
      opt('Выйти в холл', () => { room('second-hall') });
    } },
    { id: "second-hall:5:near:water:water", f: function() {
      println('Вы полили росток во второй раз. Вдруг от него\nстало исходить зелёное сияние, он начал быстро\nрасти. Через минуту он превратился в большое\nдерево. Оно благодарно помахало ветвями.');
      opt('Выйти в холл', () => { room('second-hall') });
      helped[1] = true;
      if (!helped.includes(false) && !achs[6]) {
        achs[6] = true;
        sound('ach');
        println('\nДостижение «Помошник стихий» открыто!');
      }
    } },
    { id: "second-hall:6", f: function() {
      println('Вы зашли в комнату средних размеров.\nПеред вами стоит большая клетка..');
      opt('Подойти к клетке', () => { room('second-hall:6:near') });
      opt('Выйти в холл', () => { room('second-hall') });
    } },
    { id: "second-hall:6:near", f: function() {
      println('Вы подошли к клетке. В ней сидит белый\nголубь. Он жалобно и с надеждой посмотрел на вас.');
      opt('Открыть клетку', () => { room('second-hall:6:near:open') });
      opt('Выйти в холл', () => { room('second-hall') });
    } },
    { id: "second-hall:6:near:open", f: function() {
      println('Вы открыли клетку. Голубь тут же вылетел\nиз неё. Он покружился над вами и благодарно\nзакурлыкал: «Курлы. Курлу!», а потом куда-то\nулетел.');
      opt('Выйти в холл', () => { room('second-hall') });
      helped[2] = true;
      if (!helped.includes(false) && !achs[6]) {
        achs[6] = true;
        sound('ach');
        println('\nДостижение «Помошник стихий» открыто!');
      }
    } },
    { id: "second-hall:7", f: function() {
      println('Вы зашли в комнату средних размеров.\nПеред вами огромный бассейн. И какой-то\nсосуд рядом с ним.');
      opt('Подойти к сосуду', () => { room('second-hall:7:near') });
      opt('Выйти в холл', () => { room('second-hall') });
    } },
    { id: "second-hall:7:near", f: function() {
      println('Вы подошли к сосуду. Оказалось, что это —\nаквариум. В нём плавала маленькая рыбка.\ьОна билась в стенки аквариума, желая выйти.');
      opt('Выпустить рыбку в бассейн', () => { room('second-hall:7:near:open') });
      opt('Выйти в холл', () => { room('second-hall') });
    } },
    { id: "second-hall:7:near:open", f: function() {
      println('Вы выпустили рыбку в бассейн. Она начала\nрадостно резвиться в нём.');
      opt('Выйти в холл', () => { room('second-hall') });
      helped[3] = true;
      if (!helped.includes(false) && !achs[6]) {
        achs[6] = true;
        sound('ach');
        println('\nДостижение «Помошник стихий» открыто!');
      }
    } },
    { id: "gameover", f: function(to) {
      sound('gameover');
      println('Мир погрузился в темнту: игра завершена.');
      opt('Начать заново', () =>  { room(to > ''? to:'start') });
      dies++;
      if (dies == 20) {
        achs[1] = true;
        println('\nДостижение «Все углы собрал» открыто!');
      }
    } },
    { id: "about", f: function(from, back) {
      println('Автор идеи: Megospace\nРазработчик: Megospace\nДата выпуска: 01.04.2023 (08.04.2023)\nМузыка и звуки: zvukipro.com\nВерсия: '+obj.version+' (альфа)\nКоличество комнат: '+obj.rooms.length);
      println('\n@@@     @@@  @@@@@@   @@@@@@    @@@@@@\n@@@@   @@@@  @@      @@        @@    @@\n@@ @@ @@ @@  @@@@@@  @@   @@@  @@    @@\n@@  @@@  @@  @@      @@    @@  @@    @@\n@@       @@  @@@@@@   @@@@@@    @@@@@@\n\n @@@@@@  @@@@@@    @@@@@@   @@@@@@  @@@@@@\n@@       @@   @@  @@    @@  @@      @@\n @@@@@   @@@@@@   @@    @@  @@      @@@@@@\n     @@  @@       @@@@@@@@  @@      @@\n@@@@@@   @@       @@    @@  @@@@@@  @@@@@@');
      opt('Назад', () => { room('stats', from, back) });
    } }
  ]
};
function restart() {
  achs = new Array(7).fill(false);
  robbed = new Array(4).fill(false);
  helped = new Array(4).fill(false);
  dies = 0;
  skis = false;
  fivefloor = false;
  rooms = [];
  roomc = 0;
  day();
  room('start');
}
function day() {
  obj.style = {
    background: "#803000",
    first: "#ffc070",
    second: "#ff8050",
    third: "#502000",
    backgroundbody: "#502000"
  };
}
function night() {
  obj.style = {
    background: "#300080",
    first: "#70c0ff",
    second: "#5080ff",
    third: "#202050", 
    backgroundbody: "#200050"
  };
}
function dark() {
  obj.style = {
    background: "#404040",
    first: "#c0c0c0",
    second: "#a0a0a0",
    third: "#202020", 
    backgroundbody: "#202020"
  };
}
function cave() {
  obj.style = {
    background: "#205050",
    first: "#50d0d0",
    second: "#30d0d0",
    third: "#205050", 
    backgroundbody: "#104040"
  };
}
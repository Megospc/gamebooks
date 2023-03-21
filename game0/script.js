var obj = {
  name: "Чан в сарае",
  options: {
    music: "music.mp3",
    onstart: function() {
      var_("goldsearch", false);
      var_("dinamite", false);
      var_("lamp", false);
      var_("rathint", false);
      if (gamebook.restore) {
        println('Открыть сохранение прогресса?');
        opt('да', () =>  { restore() });
        opt('нет', () =>  { room('start') });
      }
      else room('start');
    },
    render: function() {
      if (dinamite) ctx.drawImage(img('dinamite'), X(800), Y(10), X(18), Y(21));
      if (lamp) ctx.drawImage(img('lamp'), X(762), Y(10), X(25), Y(23));
    },
    room: () => save()
  },
  assets: [
    { src: "boom.mp3", type: "sound", id: "boom" },
    { src: "gameover.mp3", type: "sound", id: "gameover" },
    { src: "laugh.mp3", type: "sound", id: "laugh" },
    { src: "fall.mp3", type: "sound", id: "fall" },
    { src: "cry.mp3", type: "sound", id: "cry" },
    { src: "bonk.mp3", type: "sound", id: "bonk" },
    { src: "melody.mp3", type: "sound", id: "melody" },
    { src: "kettles.mp3", type: "sound", id: "kettles:boom" },
    { src: "victory.mp3", type: "sound", id: "victory" },
    { src: "electric.mp3", type: "sound", id: "electric" },
    { src: "dinamite.png", type: "image", id: "dinamite" },
    { src: "lamp.png", type: "image", id: "lamp" }
  ],
  rooms: [
    { id: "start", f: function() {
      println('Одним дождливым холодным тёмным вечером\nвы подошли к двери. Она была большая\nдубовая. На ней табличка: \n«Внутрь зайдёшь — счастье найдёшь,\nостанешься — нога затянет».\nВам очень хочется зайти внутрь.');
      opt('Не открывать, остаться на улице', () => { room('start:leg'); });
      opt('Открыть, зайти внутрь', () => { room('living-room'); });
    } },
    { id: "start:leg", f: function() {
      sound('laugh');
      println('Дверь приоткрылась. Из-за неё высунулась нога.\nИ затянула вас внутрь. Вы закрыли глаза от\nнеожиданности. Когда вы их открыли...');
      opt('Продолжить', () => { room('living-room') });
    } },
    { id: "living-room", f: function() {
      println('Дверь позади закрылась. Вы находитесь в гостиной.Перед вами телевизор и две двери по бокам\n(слева и справа).');
      opt('Включить телевизор', () =>  { room('TV:1') });
      opt('Зайти в первую дверь.', () =>  { room('cupboard-room') });
      opt('Зайти во вторую дверь.', () =>  { room('long-room') });
    } },
    { id: "TV:1", f: function() {
      println('Вы включили телевизор. Запахло горелым.');
      opt('Подождать ещё', () =>  { room('TV:2') });
      opt('Выключить телевизор', () =>  { room('living-room') });
    } },
    { id: "TV:2", f: function() {
      sound('boom');
      println('Телевизор затарахтел и взорвался.\nВ вас прилетел осколок стекла...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "cupboard-room", f: function() {
      println('Вы находитесь в небольшой комнате.\nПеред вами шкаф.');
      opt('Вернуться в гостиную', () =>  { room('living-room') });
      opt('Залезть в шкаф', () =>  { room('cupboard:1') });
    } },
    { id: "cupboard:1", f: function() {
      sound('laugh');
      println('Вы залезли в шкаф. Там висела одежда.\nВдруг двеца шкафа захлопнулась.');
      opt('Подолбить в дверь шкафа', () =>  { room('cupboard:boom') });
      opt('Поискать что-нибудь среди висящей в\nшкафу одежде', () =>  { room('cupboard:search1') });
    } },
    { id: "cupboard:search1", f: function() {
      println('Вы нащупали кнопку среди одежды.');
      opt('Подолбить в дверь шкафа', () =>  { room('cupboard:boom') });
      opt('Поискать что-нибудь за одеждой', () =>  { room('cupboard:search2') });
      opt('Нажать кнопку', () =>  { room('cupboard:button') });
    } },
    { id: "cupboard:search2", f: function() {
      println('Вы нашли дверь за одеждой.');
      opt('Подолбить в дверь шкафа', () =>  { room('cupboard:boom') });
      opt('Попытаться открыть дверь', () =>  { room('cupboard:door:closed') });
      opt('Нажать кнопку', () =>  { room('cupboard:button') });
    } },
    { id: "cupboard:search3", f: function() {
      println('Вы нашли ключ в кармане одного пальто.');
      opt('Подолбить в дверь шкафа', () =>  { room('cupboard:boom') });
      opt('Попытаться открыть дверь ключом', () =>  { room('cupboard:door:open') });
      opt('Нажать кнопку', () =>  { room('cupboard:button') });
    } },
    { id: "cupboard:door:closed", f: function() {
      sound('laugh');
      println('Дверь за одеждой оказалась закрыта.');
      opt('Подолбить в дверь шкафа', () =>  { room('cupboard:boom') });
      opt('Поискать что-нибудь в одежде', () =>  { room('cupboard:search3') });
      opt('Нажать кнопку', () =>  { room('cupboard:button') });
    } },
    { id: "cupboard:door:open", f: function() {
      println('Вы открыли замок двери ключом.\nИ приоткрыли её. Из-за неё забрезжил свет.\nЗайти?');
      opt('Подолбить в дверь шкафа', () =>  { room('cupboard:boom') });
      opt('Зайти в дверь', () =>  { room('floors-room') });
      opt('Нажать кнопку', () =>  { room('cupboard:button') });
    } },
    { id: "cupboard:boom", f: function() {
      sound('fall');
      println('Вы начали долбить в дверь шкафа.\nВдруг шкаф пошатнулся и упал...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "cupboard:button", f: function() {
      println('Вы нажали на кнопку. Дверь шкафа\nоткрылась сама. Теперь вы можете выйти.');
      opt('Выйти', () =>  { room('cupboard-room') });
    } },
    { id: "long-room", f: function() {
      println('Вы находитесь в длинном коридоре.\nНа стенах висят картины. ');
      opt('Вернуться в гостиную', () =>  { room('living-room') });
      opt('Пройти в конец коридора', () =>  { room('long-room:end') });
      if (goldsearch) opt('Поискать золото за картинами', () =>  { room('long-room:search') });
    } },
    { id: "long-room:end", f: function() {
      println('В конце коридора оказалась дверь.');
      opt('Вернуться в начало коридора', () =>  { room('long-room') });
      opt('Зайти в дверь', () =>  { room('first-hall') });
    } },
    { id: "long-room:search", f: function() {
      println('Вы нашли металлическую дверцу\nсейфа за одной из картин.\nНо она заперта.');
      opt('Вернуться в гостиную', () =>  { room('living-room') });
      opt('Пройти в конец коридора', () =>  { room('long-room:end') });
      if (dinamite) opt('Попытаться открыть дверь динамитом', () =>  { room('long-room:boom') });
    } },
    { id: "long-room:boom", f: function() {
      sound('boom');
      println('Прогремел взрыв, однако дверца\nсейфа осталась на месте. Вдруг\nкто-то зашевелился за ней. Дверца открылась\nсама и из неё высунулась крыса. Она сказала:\n«Золота нет! Ищи его там, где темно».\nИ захлопнула дверцу.');
      opt('Вернуться в гостиную', () =>  { room('living-room') });
      opt('Пройти в конец коридора', () =>  { room('long-room:end') });
      rathint = true;
    } },
    { id: "first-hall", f: function() {
      println('Вы попали в просторный холл.\nИз него ведут десять дверей.');
      opt('Вернуться в коридор с картинами', () =>  { room('long-room') });
      opt('Зайти в первую дверь', () =>  { room('first-hall:1') });
      opt('Зайти во вторую дверь', () =>  { room('first-hall:2') });
      opt('Зайти в третью дверь', () =>  { room('first-hall:3') });
      opt('Зайти в четвёртую дверь', () =>  { room('first-hall:4') });
      opt('Зайти в пятую дверь', () =>  { room('first-hall:5') });
      opt('Зайти в шестую дверь', () =>  { room('first-hall:door:false') });
      opt('Зайти в седьмую дверь', () =>  { room('first-hall:7') });
      opt('Зайти в восьмую дверь', () =>  { room('first-hall:door:false') });
      opt('Зайти в девятую дверь', () =>  { room('first-hall:9') });
      opt('Зайти в десятую дверь', () =>  { room('first-hall:10') });
    } },
    { id: "first-hall:1", f: function() {
      println('Вы находитесь на солнечной полянке\nобнесённой забором. По краям полянки\nрастут красивые цветы.\nПеред вами стоит небольшой сарай.');
      opt('Вернуться в холл', () =>  { room('first-hall') });
      opt('Зайти в сарай', () =>  { room('first-hall:1:barn') });
      opt('Понюхать цветы', () =>  { room('first-hall:1:flowers') });
    } },
    { id: "first-hall:1:flowers", f: function() {
      sound('laugh');
      println('Вы понюхали цветы. Вдруг у вас закружилась\nголова...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "first-hall:1:barn", f: function() {
      println('Вы зашли в сарай. Перед вами стоит\nбольшая печь с чаном на ней.');
      opt('Вернуться на полянку с цветами', () =>  { room('first-hall:1') });
      opt('Залезть в чан', () =>  { room('floors-room') });
    } },
    { id: "first-hall:2", f: function() {
      println('Вы находитесь в тёмном чулане.\nНа стенах висят мечи и кинжалы.');
      opt('Вернуться в холл', () =>  { room('first-hall') });
    } },
    { id: "first-hall:3", f: function() {
      println('Вы находитесь в роскошной спальне.\nВы видите прекрасные картины на стенах.\nПеред вами огромная кровать. \nВы очень хотите спать.');
      opt('Вернуться в холл', () =>  { room('first-hall') });
      opt('Поспать на кровати', () =>  { room('first-hall:3:sleep1') });
    } },
    { id: "first-hall:3:sleep1", f: function() {
      println('Вы уснули. Сначала вы просто спали — без снов.\nНо потом во сне перед вами появилась дверь.\nС табличкой: «Внутрь зайдёшь — счастье найдёшь,\nостанешься — нога затянет».\nВы вдруг вспомнили, что тут есть счастье.');
      opt('Проснуться, чтобы искать счастье', () =>  { room('first-hall:3:aftersleep') });
      opt('Поспать ещё', () =>  { room('first-hall:3:sleep2') });
    } },
    { id: "first-hall:3:sleep2", f: function() {
      println('Вы продолжили спать. Вдруг вы услышали голос.');
      opt('Проснуться', () =>  { room('first-hall:3:aftersleep') });
      opt('Поспать ещё', () =>  { room('first-hall:3:sleep3') });
    } },
    { id: "first-hall:3:sleep3", f: function() {
      sound('laugh');
      println('«Ты не выйдешь отсюда...»');
      opt('Проснуться', () =>  { room('first-hall:3:aftersleep') });
      opt('Поспать ещё', () =>  { room('first-hall:3:sleep4') });
    } },
    { id: "first-hall:3:sleep4", f: function() {
      println('«Ты не выйдешь отсюда, пока не найдёшь золото».');
      opt('Проснуться', () =>  { room('first-hall:3:aftersleep') });
      opt('Поспать ещё', () =>  { room('first-hall:3:sleep5') });
    } },
    { id: "first-hall:3:sleep5", f: function() {
      println('«Динамит и фонарик на втором этаже. Найди их».');
      opt('Проснуться', () =>  { room('first-hall:3:aftersleep') });
      goldsearch = true;
    } },
    { id: "first-hall:3:aftersleep", f: function() {
      println('Вы проснулись. ');
      opt('Встать с кровати', () =>  { room('first-hall:3') });
      opt('Посмотреть под кровать', () =>  { room('first-hall:3:underbed') });
    } },
    { id: "first-hall:3:underbed", f: function() {
      sound('cry');
      println('Вы посмотрели под кровать.\nИ увидели два больших красных глаза.\nВы упали в обморок от ужаса...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "first-hall:door:false", f: function() {
      sound('laugh');
      println('Дверь оказалась фальшивой: за ней стена.');
      opt('Продолжить', () =>  { room('first-hall') })
    } },
    { id: "first-hall:4", f: function() {
      println('Вы находитесь в маленькой комнате. Стены\nи потолок обиты синей плиткой.\nПеред вами много труб. Они закрывают\nпротивоположную стенку.');
      opt('Вернуться в холл', () =>  { room('first-hall') });
      opt('Перелезть через трубы', () =>  { room('first-hall:4:climb') });
    } },
    { id: "first-hall:4:climb", f: function() {
      if (lamp) {
        println('Осветить себе путь фонариком?');
        opt('да', () =>  { room('first-hall:4:climb:lamp') });
        opt('нет', () =>  { room('first-hall:4:climb:nolamp') });
      } else {
        room('first-hall:4:climb:nolamp');
      }
    } },
    { id: "first-hall:4:climb:nolamp", f: function() {
      sound('bonk');
      println('Вы перелезали через трубы,\nи случайно задели одну из них головой...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "first-hall:4:climb:lamp", f: function() {
      println('Вы перелезли через трубы.\nЗа ними оказалась большая дверь.');
      opt('Перелезть через трубы обратно', () =>  { room('first-hall:4') });
      opt('Зайти в дверь', () =>  { room('first-hall:4:door') });
    } },
    { id: "first-hall:4:door", f: function() {
      sound('laugh');
      println('Вы зашли в дверь за трубами. Там было очень темно.\nВдруг вас что-то ударило по голове. Мир уже был поружён во мрак.\nИгра завершена.');
      opt('Начать заново', () =>  { room('start') });
    } },
    { id: "first-hall:5", f: function() {
      println('Вы находитесь в маленькой тёмной комнате.\nСтены - кирпичные. Царит полумрак.');
      opt('Вернуться в холл', () =>  { room('first-hall') });
      if (lamp && rathint) opt('Осветить всё фонариком.', () =>  { room('first-hall:5:lamp') });
    } },
    { id: "first-hall:5:lamp", f: function() {
      sound('victory');
      println('Кирпичи оказались не простые, а золотые.\nПри свете фонаря вам стало это ясно.\nПоздравляем: вы выиграли! ');
      opt('Новая игра', () =>  { 
        lamp = false;
        goldsearch = false;
        rathint = false;
        dinamite = false;
        room('start') ;
      });
      opt('Об игре', () =>  { room('about') });
    } },
    { id: "first-hall:7", f: function() {
      println('Вы находитесь в квадратной комнатушке.\nПеред вами доска с четырьмя кнопками:\nкрасной, жёлтой, зелёной и синей.');
      opt('Вернуться в холл', () =>  { room('first-hall') });
      opt('Нажать на красную кнопку', () =>  { room('first-hall:7:button1') });
      opt('Нажать на жёлтую кнопку', () =>  { room('first-hall:7:button2') });
      opt('Нажать на зелёную кнопку', () =>  { room('first-hall:7:button3') });
      opt('Нажать на синюю кнопку', () =>  { room('first-hall:7:button4') });
    } },
    { id: "first-hall:7:button1", f: function() {
      sound('laugh');
      println('Вы нажали на красную кнопку.\nВдруг вам стало тяжело дышать...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "first-hall:7:button2", f: function() {
      gamebook.music.volume = 0;
      sound('melody');
      setTimeout(() => { gamebook.music.volume = 1 }, 2500);
      println('Вы нажали на жёлтую кнопку.\nПослышалась весёлая мелодия,\nно она скоро прекратилась.');
      opt('Продолжить', () =>  { room('first-hall:7') });
    } },
    { id: "first-hall:7:button3", f: function() {
      println('Вы нажали на зелёную кнопку.\nВключился свет.');
      opt('Продолжить', () =>  { room('first-hall:7') });
    } },
    { id: "first-hall:7:button4", f: function() {
      println('Вы нажали на синюю кнопку.\nОна замигала.');
      opt('Продолжить', () =>  { room('first-hall:7') });
    } },
    { id: "first-hall:9", f: function() {
      println('Вы вышли на улицу. Тут ездят машины —\nочень шумно. За вами дверь в холл.\nНа ней написано: «24».');
      opt('Вернуться в холл', () =>  { room('first-hall') });
    } },
    { id: "first-hall:10", f: function() {
      println('Вы находитесь в круглой комнате.\nИз неё ведут три двери.\nПовсюду лежат чайники.');
      opt('Вернуться в холл', () =>  { room('first-hall') });
      opt('Постучать по одному из чайников', () =>  { room('kettles:boom', 'first-hall:10') });
      opt('Зайти в первую дверь', () =>  { room('kettles:1', 'first-hall:10') });
      opt('Зайти во вторую дверь', () =>  { room('kettles:2', 'first-hall:10') });
      opt('Зайти в третью дверь', () =>  { room('floors-room') });
    } },
    { id: "kettles:1", f: function(from) {
      println('Вы попали в небольшую столовую. Никого нет.\nПеред вами длинный стол. На нём стоит\nтарелка с кашей. Вы голодны.');
      opt('Вернуться к чайникам', () =>  { room(from) });
      opt('Съесть кашу', () =>  { room('kettles:1:eat') });
    } },
    { id: "kettles:1:eat", f: function() {
      sound('laugh');
      println('Вы съели кашу. Вдруг вы почувствовали тошноту...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "kettles:2", f: function(from) {
      println('Вы находитесь в старом погребе.\nВезде лежат банки с солёными огурцами\nи помидорами.');
      opt('Вернуться к чайникам', () =>  { room(from) });
    } },
    { id: "kettles:boom", f: function(from) {
      sound('kettles:boom');
      println('Вы постучали по чайникам.\nВдруг они превратились в кастрюли...');
      opt('Продолжить', () =>  { room('pans', from) });
    } },
    { id: "pans", f: function(from) {
      println('Вы находитесь в круглой комнате. Из неё\nведёт одна дверь. Повсюду лежат кастрюли.');
      opt('Постучать по одной из кастрюль', () =>  { room('pans:boom', from) });
      opt('Зайти в дверь', () =>  { room('pans:1', from) });
    } },
    { id: "pans:1", f: function(from) {
      println('Вы находитесь в просторной пустой комнате.\nИз неё ведёт одна дверь.');
      opt('Вернуться к кастрюлям', () =>  { room('pans', from) });
      opt('Зайти в дверь', () =>  { room('pans:1:fall') });
    } },
    { id: "pans:1:fall", f: function() {
      sound('laugh');
      println('Вы вступили за порог. И вдруг оказалось,\nчто пола нет. Вы начали падать вниз...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "pans:boom", f: function(from) {
      sound('kettles:boom');
      println('Вы постучали по кастрюлям.\nВдруг они превратились в чайники...');
      opt('Продолжить', () =>  { room(from) });
    } },
    { id: "floors-room", f: function() {
      println('Вы находитесь в небольшой комнате.\nИз неё ведут три двери. На первой написано\n«Второй этаж», на второй — «Минус первый этаж»,\nна третьей — ничего.');
      opt('Зайти в первую дверь', () =>  { room('floors-room:1') });
      opt('Зайти во вторую дверь', () =>  { room('floors-room:2') });
      opt('Зайти в третью дверь', () =>  { room('floors-room:3') });
    } },
    { id: "floors-room:1", f: function() {
      println('Перед вами  лестница ведущая вверх.');
      opt('Вернуться в пустую комнату', () =>  { room('floors-room') });
      opt('Подняться по лестнице', () =>  { room('second-hall') });
    } },
    { id: "floors-room:2", f: function() {
      println('Перед вами  лестница ведущая вниз.');
      opt('Вернуться в пустую комнату', () =>  { room('floors-room') });
      opt('Спуститься по лестнице', () =>  { room('third-hall') });
    } },
    { id: "floors-room:3", f: function() {
      println('Вы находитесь в круглой комнате.\nИз неё ведут три двери.\nПовсюду лежат чайники.');
      opt('Вернуться в пустую комнату', () =>  { room('floors-room') });
      opt('Постучать по одному из чайников', () =>  { room('kettles:boom', 'floors-room:3') });
      opt('Зайти в первую дверь', () =>  { room('first-hall') });
      opt('Зайти во вторую дверь', () =>  { room('kettles:1', 'floors-room:3') });
      opt('Зайти в третью дверь', () =>  { room('kettles:2', 'floors-room:3') });
    } },
    { id: "second-hall", f: function() {
      println('Вы попали в большой светлый холл.\nИз него ведут пять дверей.');
      opt('Спуститься вниз по лестнице', () =>  { room('floors-room:1') });
      opt('Зайти в первую дверь', () =>  { room('second-hall:1') });
      opt('Зайти во вторую дверь', () =>  { room('second-hall:2') });
      opt('Зайти в третью дверь', () =>  { room('second-hall:3') });
      opt('Зайти в четвёртую дверь', () =>  { room('second-hall:4') });
      opt('Зайти в пятую дверь', () =>  { room('second-hall:5') });
    } },
    { id: "second-hall:1", f: function() {
      println('Вы находитесь в небольшой комнате.\nПосередине лежит гора садового оборудования:\nлопаты, грабли, тяпки. ');
      opt('Покопаться в горе садового оборудования', () =>  { room('second-hall:1:search') });
      opt('Выйти обратно в холл', () =>  { room('second-hall') });
    } },
    { id: "second-hall:1:search", f: function() {
      println('Вы начали копаться в горе садового\nоборудования. Но в конце концов ничего не нашли.');
      opt('Выйти в холл', () =>  { room('second-hall') });
    } },
    { id: "second-hall:2", f: function() {
      println('Вы находитесь в пустой комнате. Только\nна полу лежит красивый ковёр.');
      opt('Отодвинуть ковёр', () =>  { room('second-hall:2:search') });
      opt('Выйти обратно в холл', () =>  { room('second-hall') });
    } },
    { id: "second-hall:2:search", f: function() {
      println('Вы отодвинули ковёр. Под ним оказалась дверь.\nПродолжение в игре «Тайник под ковром».');
      opt('Выйти в холл', () =>  { room('second-hall') });
      opt('Играть в «Тайник под ковром»', () =>  { open('https://megospc.github.io/gamebooks/game1/gamebook.html') });
    } },
    { id: "second-hall:3", f: function() {
      night();
      println('Вы находитесь в тёмной-тёмной комнате.');
      opt('Выйти в холл', () =>  { day(); room('second-hall') });
      if (lamp) opt('Осветить всё фонариком', () =>  { day(); room('second-hall:3:lamp'); });
      else opt('Пойти на ощупь', () =>  { room('second-hall:3:nolamp'); });
    } },
    { id: "second-hall:3:lamp", f: function() {
      println('Вы находитесь в небольшой пятиугольной комнате.\nПеред вами ');
      if (dinamite) println('дверь и записка.');
      else println('дверь, записка и динамит.');
      opt('Выйти в холл', () =>  { room('second-hall') });
      if (!dinamite) opt('Взять динамит', () =>  { room('second-hall:3:lamp:dinamite') });
      opt('Прочитать записку', () =>  { room('second-hall:3:lamp:note') });
      opt('Зайти в дверь', () =>  { room('second-hall:3:door') });
    } },
    { id: "second-hall:3:lamp:dinamite", f: function() {
      println('Теперь у вас есть динамит.');
      opt('Продолжить', () =>  { room('second-hall:3:lamp') });
      dinamite = true;
    } },
    { id: "second-hall:3:lamp:note", f: function() {
      println('«Посетите минус первый этаж.\nВам там точно понравится!»');
      opt('Продолжить', () =>  { room('second-hall:3:lamp') });
    } },
    { id: "second-hall:3:nolamp", f: function() {
      println('Вы нащупали дверь.');
      opt('Выйти в холл', () =>  { day(); room('second-hall'); });
      opt('Зайти в дверь', () =>  { day(); room('second-hall:3:door'); });
    } },
    { id: "second-hall:3:door", f: function() {
      println('Вы зашли в небольшую пустую комнату.\nПеред вами большой сундук с надписью:\n«Не открывай! Убьёт!»');
      opt('Выйти в тёмную комнату', () =>  { room('second-hall:3') });
      opt('Открыть сундук', () =>  { room('second-hall:3:door:open') });
    } },
    { id: "second-hall:3:door:open", f: function() {
      println('Вы открыли сундук.');
      if (lamp) println('Там пусто');
      else println('Там лежит фонарик.\nВзять его?');
      if (lamp) opt('Закрыть сундук', () =>  { room('second-hall:3:door') }); 
      else {
        opt('да', () =>  { room('second-hall:3:door:open:takelamp') });
        opt('нет', () =>  { room('second-hall:3:door') });
      }
    } },
    { id: "second-hall:3:door:open:takelamp", f: function() {
      println('Вы взяли фонарик.');
      opt('Выйти в тёмную комнату', () =>  { room('second-hall:3') });
      lamp = true;
    } },
    { id: "second-hall:4", f: function() {
      println('Вы вышли на пляж. Перед вами синее-синее\nморе. Слышатся звуки морского сражения,\nно кораблей не видно.');
      opt('Вернуться в холл', () =>  { room('second-hall') });
    } },
    { id: "second-hall:5", f: function() {
      println('Вы открыли пятую дверь.\nПеред вами открылся прекрасный вид:\nвысокие заснеженные вершины гор.\nНа самом кончике одной из них стоит домик.\nПродолжение в игре «Домик в горах».');
      opt('Вернуться в холл', () =>  { room('second-hall') });
    } },
    { id: "third-hall", f: function() {
      println('Вы попали в холл-пещеру.\nВсюду сталактиты и сталагмиты.\nНо пол и потолок — ровные. В центре —\nбольшой камень. В первые секунды\nвам показалось, что он издаёт голубоватое\nсияние. Вскоре вы обнаружили пять дверей.');
      opt('Подняться по лестнице', () =>  { room('floors-room:2') });
      opt('Зайти в первую дверь', () =>  { room('third-hall:1') });
      opt('Зайти во вторую дверь', () =>  { room('third-hall:2') });
      opt('Зайти в третью дверь', () =>  { room('third-hall:3') });
      opt('Зайти в четвёртую дверь', () =>  { room('third-hall:4') });
      opt('Зайти в пятую дверь', () =>  { room('third-hall:5') });
    } },
    { id: "third-hall:1", f: function() {
      println('Вы вошли в небольшую комнату.\nПеред вами огромная цистерна с надписью:\n«Огнеопасно!!! Керосин». Рядом лежит коробок\nсо спичками.');
      opt('Поджечь цистерну с керосином', () =>  { room('third-hall:1:boom') });
      opt('Выйти обратно в холл', () =>  { room('third-hall') });
    } },
    { id: "third-hall:1:boom", f: function() {
      sound('boom');
      println('Вы подожгли цистерну с керосином.\nОна зашипела и взорвалась...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "third-hall:2", f: function() {
      println('Вы зашли в пустую комнату. Впереди дверь.\nНа ней табличка с молнией.');
      opt('Зайти в дверь', () =>  { room('third-hall:2:door') });
      opt('Выйти обратно в холл', () =>  { room('third-hall') });
    } },
    { id: "third-hall:2:door", f: function() {
      println('Вы зашли в комнату средних размеров.\nВсюду кнопки и провода. Впереди электро-щит\nс надписью: «220в. Не открывать!»');
      opt('Открыть электро-щит', () =>  { room('third-hall:2:door:open') });
      opt('Выйти в пустую комнату', () =>  { room('third-hall:2') });
    } },
    { id: "third-hall:2:door:open", f: function() {
      sound('electric');
      println('Вы открыли электро-щит.\nИз него посыпались искры...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "third-hall:3", f: function() {
      println('Вы зашли в небольшую комнату\nобитую зелёными обоями. Левая и правая\nстенки закрыты витринами с лекарствами\nВпереди стол. На нём симпатичная баночка\nс каким-то лекарством.');
      opt('Выпить баночку с лекарством', () =>  { room('third-hall:3:drink') });
      opt('Выйти в холл', () =>  { room('third-hall') });
    } },
    { id: "third-hall:3:drink", f: function() {
      sound('laugh');
      println('Вы выпили лекарство из баночки.\nВдруг вам стало плохо...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "third-hall:4", f: function() {
      println('Вы попали в большую комнату.\nСтены — каменные. Впереди три двери.\nНа первой надпись: «Архив». На второй:\n«Бассейн». А на третьей: «Живой уголок».\nПо середине комнаты большой стол.\nНа нём разложены карты и бумаги, но\nвсе они написаны на незнакомом языке.');
      opt('Зайти в первую дверь', () =>  { room('third-hall:4:door:1') });
      opt('Зайти во вторую дверь', () =>  { room('third-hall:4:door:2') });
      opt('Зайти в третью дверь', () =>  { room('third-hall:4:door:3') });
      opt('Выйти в холл', () =>  { room('third-hall') });
    } },
    { id: "third-hall:4:door:1", f: function() {
      println('Вы зашли в небольшую комнату.\nПовсюду стоят шкафы с бумагами.\nВпереди небольшая дверь.');
      opt('Зайти в дверь', () =>  { room('third-hall:4:door:1:door') });
      opt('Выйти в «Каменный офис»', () =>  { room('third-hall:4') });
    } },
    { id: "third-hall:4:door:1:door", f: function() {
      println('Вы вошли в пустую комнату.\nТолько на стенах висят карты.\nВпереди дверь.');
      opt('Зайти в дверь', () =>  { room('third-hall:4:door:1:door:door') });
      opt('Вернуться в комнату с бумагами', () =>  { room('third-hall:4:door:1') });
    } },
    { id: "third-hall:4:door:1:door:door", f: function() {
      sound('laugh');
      println('Дверь оказалась заперта.');
      opt('Выйти в комнату с бумагами', () =>  { room('third-hall:4:door:1') });
    } },
    { id: "third-hall:4:door:2", f: function() {
      println('Вы попали в большую комнату.\nПеред вами бассейн. В нём плещется вода.');
      opt('Искупаться в бассейне', () =>  { room('third-hall:4:door:2:swim') });
      opt('Вернуться в «Каменный офис»', () =>  { room('third-hall:4') });
    } },
    { id: "third-hall:4:door:2:swim", f: function() {
      sound('laugh');
      println('Вы прыгнули в бассейн.\nВдруг вы начали тонуть...');
      opt('Продолжить', () =>  { room('gameover') });
    } },
    { id: "third-hall:4:door:3", f: function() {
      println('Вы попали в пустую комнату.\nИз неё ведут три двери. На первой\nнаписано: «Грызуны». На второй:\n«Позвоночные рыбы». А на третьей:\n«Бобовые растения».');
      opt('Вернуться в «Каменный офис»', () =>  { room('third-hall:4') });
      opt('Зайти в первую дверь', () =>  { room('third-hall:4:door:3:1') });
      opt('Зайти во вторую дверь', () =>  { room('third-hall:4:door:3:2') });
      opt('Зайти в третью дверь', () =>  { room('third-hall:4:door:3:3') });
    } },
    { id: "third-hall:4:door:3:1", f: function() {
      println('Вы попали в большую комнату.\nНо почти всё место занято клетками с:\nХомяками, мышами и крысами. В конце\nкомнаты две двери. На первой написано:\n«Ондатры». А на второй: «Полёвки».');
      opt('Вернуться в пустую комнату', () =>  { room('third-hall:4:door:3') });
      opt('Зайти в первую дверь', () =>  { room('third-hall:4:door:3:1:door:1') });
      opt('Зайти во вторую дверь', () =>  { room('third-hall:4:door:3:1:door:2') });
    } },
    { id: "third-hall:4:door:3:1:door:1", f: function() {
      println('Вы попали в большую комнату с\nбассейном посредине. В нём плавают ондатры.\nКак только вы зашли, одна из них стала\nпристально наблюдать за вами.');
      opt('Вернуться к грызунам', () =>  { room('third-hall:4:door:3:1') });
    } },
    { id: "third-hall:4:door:3:1:door:2", f: function() {
      println('Вы вошли в огромную комнату.\nВсюду бегают полёвки. Вы боитесь\nнаступить на одну из них.');
      opt('Вернуться к грызунам', () =>  { room('third-hall:4:door:3:1') });
    } },
    { id: "third-hall:4:door:3:2", f: function() {
      println('Вы находитесь в большой комнате.\nПовсюду стоят аквариум с разными\nкрасивыми рыбами, есть только небольшие\nпроходы между ними. Впереди дверь.');
      opt('Вернуться в пустую комнату', () =>  { room('third-hall:4:door:3') });
      opt('Зайти в дверь', () =>  { room('third-hall:4:door:3:2:door') });
    } },
    { id: "third-hall:4:door:3:2:door", f: function() {
      println('Вы попали в комнату средних размеров.\nПеред вами большой аквариум. В нём\nплавают разноцветные рыбки.');
      opt('Вернуться к позвоночным рыбам', () =>  { room('third-hall:4:door:3:2') });
    } },
    { id: "third-hall:4:door:3:3", f: function() {
      println('Вы попали в очень большую комнату.\nВсё заставлено горшками с растениями.\nВ них растёт: Горох, фасоль, арахис,\nчечевица и соя. Впереди дверь с надписью:\n«Семена».');
      opt('Вернуться в пустую комнату', () =>  { room('third-hall:4:door:3') });
      opt('Зайти в дверь', () =>  { room('third-hall:4:door:3:3:door') });
    } },
    { id: "third-hall:4:door:3:3:door", f: function() {
      println('Вы вошли в большую круглую комнату.\nНа стенах весят пакеты с семенами.');
      opt('Вернуться к бобовым растениям', () =>  { room('third-hall:4:door:3:3') });
    } },
    { id: "third-hall:5", f: function() {
      println('Вы попали в не очень длинный,\nно широкий коридор. В его конце дверь.');
      opt('Зайти в дверь', () =>  { room('third-hall:5:door:1') });
      opt('Выйти обратно в холл', () =>  { room('third-hall') });
    } },
    { id: "third-hall:5:door:1", f: function() {
      println('Вы попали в огромную комнату.\nНа полу растёт зелёная трава.\nНа потолке яркая лампа похожая на солнце.\nВпереди дверь.');
      opt('Зайти в дверь', () =>  { room('third-hall:5:door:2') });
      opt('Выйти в коридор', () =>  { room('third-hall:5') });
    } },
    { id: "third-hall:5:door:2", f: function() {
      println('Вы находитесь в огромной и\nабсолютно пустой комнате.\nПол, потолок и стены — ровные.');
      opt('Вернуться на «Поляну»', () =>  { room('third-hall:5:door:1') });
    } },
    { id: "gameover", f: function() {
      sound('gameover');
      println('Мир погрузился в темноту: игра завершена.');
      opt('Начать заново', () =>  { room('start') });
    } },
    { id: "about", f: function() {
      println('Автор идеи: Volodya2021\nРазработчик: Megospace\nДата выпуска: 18.03.2023\nМузыка и звуки: zvukipro.com\nВерсия: 1.0.7\nКоличество комнат: 100');
      println('\n@@@     @@@  @@@@@@   @@@@@@    @@@@@@\n@@@@   @@@@  @@      @@        @@    @@\n@@ @@ @@ @@  @@@@@@  @@   @@@  @@    @@\n@@  @@@  @@  @@      @@    @@  @@    @@\n@@       @@  @@@@@@   @@@@@@    @@@@@@\n\n @@@@@@  @@@@@@    @@@@@@   @@@@@@  @@@@@@\n@@       @@   @@  @@    @@  @@      @@\n @@@@@   @@@@@@   @@    @@  @@      @@@@@@\n     @@  @@       @@@@@@@@  @@      @@\n@@@@@@   @@       @@    @@  @@@@@@  @@@@@@');
      opt('Назад', () =>  { room('first-hall:5:lamp') });
    } }
  ]
};
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

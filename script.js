document.getElementById('players').addEventListener('input', createNameFields);
document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('endGame').addEventListener('click', displayResults);
document.getElementById('restartGame').addEventListener('click', restartGame);
let playerNames = [];
let words = [];
let currentPlayerIndex = 0;

// テーマごとのワードリストを定義
const wordPairs = {
    "Food": [
        ["りんご", "ばなな"],
        ["オレンジ", "ぶどう"],
        ["もも", "りんご"],
        ["パイナップル", "マンゴー"],
        ["メロン", "スイカ"],
        ["いちご", "ブルーベリー"],
        ["キウイ", "グレープフルーツ"],
        ["梨", "柿"],
        ["スパゲッティ", "マカロニ"],
        ["サンドイッチ", "ハンバーガー"],
        ["ラーメン", "つけ麺"],
        ["たこ焼き", "お好み焼き"],
        ["コーンフレーク", "オートミール"],
        ["オムライス", "チャーハン"],
        ["ホットドッグ", "ピザ"],
        ["ドリア", "グラタン"],
        ["ごはん", "パン"],
        ["うどん", "ラーメン"],
        ["カレー", "ハヤシライス"],
        ["コロッケ", "メンチカツ"],
        ["おもち", "おにぎり"],
        ["パスタ", "そば"],
        ["たまごかけごはん", "おにぎり"],
        ["おでん", "しゃぶしゃぶ"],
        ["クレープ", "パンケーキ"],
        ["スープ", "シチュー"],
        ["寿司", "巻き寿司"],
        ["フライドポテト", "チップス"],
        ["餃子", "春巻き"],
        ["タコライス", "タコス"],
        ["ピラフ", "リゾット"],
        ["チャーハン", "焼きそば"],
        ["お雑煮", "味噌汁"],
        ["天ぷら", "フライ"],
        ["そば", "そうめん"],
        ["チキンライス", "ドリア"],
        ["パエリア", "リゾット"],
        ["カツ丼", "天丼"],
        ["ハンバーグ", "メンチカツ"],
        ["焼き鳥", "つくね"],
        ["カレーパン", "あんぱん"],
        ["ナポリタン", "ミートソース"],
        ["オニオンリング", "フライドポテト"],
        ["グラタン", "ラザニア"],
        ["鳥の照り焼き", "ステーキ"],
        ["ビーフシチュー", "クリームシチュー"],
        ["チャーシュー", "焼き豚"],
        ["ミートボール", "ハンバーグ"],
        ["焼きうどん", "焼きそば"],
        ["ピタパン", "サンドイッチ"],
        ["たぬきうどん", "きつねうどん"],
        ["炒飯", "カレーライス"],
        ["ビーフカツ", "ポークカツ"],
        ["シュウマイ", "餃子"],
        ["親子丼", "カツ丼"],
        ["フライドチキン", "唐揚げ"],
        ["リゾット", "チャーハン"],
        ["ロールキャベツ", "キャベツ巻き"],
        ["グラタン", "ドリア"],
        ["ホットケーキ", "フレンチトースト"],
        ["さばの味噌煮", "ぶり大根"],
        ["ミネストローネ", "クラムチャウダー"],
        ["焼き餃子", "水餃子"],
        ["チキンカレー", "バターチキンカレー"],
        ["エビフライ", "カキフライ"],
        ["おしるこ", "ぜんざい"],
        ["牛丼", "豚丼"],
        ["ツナマヨおにぎり", "鮭おにぎり"],
        ["からあげ", "とんかつ"],
        ["肉じゃが", "ポトフ"],
    ],
    "Animal": [
        ["いぬ", "ねこ"],
        ["うさぎ", "ハムスター"],
        ["ライオン", "トラ"],
        ["ぞう", "カバ"],
        ["さる", "ゴリラ"],
        ["きりん", "しまうま"],
        ["ペンギン", "フラミンゴ"],
        ["かえる", "とかげ"],
        ["ひつじ", "やぎ"],
        ["くま", "パンダ"],
        ["あひる", "がちょう"],
        ["にわとり", "ひよこ"],
        ["くじら", "いるか"],
        ["たぬき", "きつね"],
        ["カンガルー", "コアラ"],
        ["わに", "とかげ"],
        ["ぶた", "いのしし"],
        ["しか", "もぐら"],
        ["アシカ", "アザラシ"],
        ["リス", "ねずみ"],
        ["いのしし", "しか"],
        ["アルパカ", "ラマ"],
        ["うし", "やぎ"],
        ["ハリネズミ", "モルモット"],
        ["とり", "こうもり"],
        ["にほんざる", "チンパンジー"],
        ["はち", "ちょうちょ"],
        ["ペリカン", "カモメ"],
        ["ヘビ", "トカゲ"],
        ["うなぎ", "ドジョウ"],
        ["かに", "えび"],
        ["ひつじ", "やぎ"],
        ["ホッキョクグマ", "パンダ"],
        ["いわし", "さば"],
        ["かめ", "すっぽん"],
        ["みつばち", "ハチドリ"],
        ["シマウマ", "うま"],
        ["やもり", "ヤドカリ"],
        ["カバ", "サイ"],
        ["クジャク", "ダチョウ"],
        ["ウサギ", "チンチラ"],
        ["ゴリラ", "チンパンジー"],
        ["トナカイ", "ヘラジカ"],
        ["ヤマアラシ", "ハリネズミ"],
        ["アリクイ", "ナマケモノ"],
        ["ハト", "スズメ"],
        ["ラッコ", "カワウソ"],
        ["オウム", "インコ"],
        ["オオカミ", "ハスキー"],
        ["アリ", "クモ"],
        ["イタチ", "テン"],
        ["カモシカ", "シカ"],
        ["ペリカン", "カワセミ"],
        ["コウモリ", "オオコウモリ"],
        ["ハシビロコウ", "サギ"],
        ["アザラシ", "セイウチ"],
        ["イルカ", "シャチ"],
        ["ヒツジ", "アルパカ"],
        ["サソリ", "ムカデ"],
        ["ネコ", "ライオン"]

    ],
    "Color": [
        ["あか", "あお"],
        ["きいろ", "みどり"],
        ["くろ", "しろ"],
        ["ちゃいろ", "むらさき"],
        ["だいだいいろ", "みずいろ"],
        ["ももいろ", "あか"],
        ["みどり", "あお"],
        ["きいろ", "しゅいろ"],
        ["むらさき", "だいだいいろ"],
        ["しろ", "ぎんいろ"],
        ["くろ", "ねずみいろ"],
        ["ちゃいろ", "あお"],
        ["きんいろ", "ぎんいろ"],
        ["こんいろ", "そらいろ"],
        ["あお", "みずいろ"],
        ["きいろ", "きいろ"],
        ["しゅいろ", "くれない"],
        ["みどり", "もえぎいろ"],
        ["ちゃいろ", "べにいろ"],
        ["あか", "ももいろ"]
    ],
    "Sport": [
        ["サッカー", "バスケットボール"],
        ["やきゅう", "テニス"],
        ["バレーボール", "バドミントン"],
        ["ゴルフ", "ボウリング"],
        ["スキー", "スノーボード"],
        ["すいえい", "ダイビング"],
        ["じゅうどう", "からて"],
        ["フェンシング", "アーチェリー"],
        ["スケート", "フィギュアスケート"],
        ["ボクシング", "レスリング"],
        ["テコンドー", "けんどう"],
        ["卓球", "ソフトテニス"],
        ["馬術", "ポロ"],
        ["ダーツ", "ビリヤード"],
        ["エアロビクス", "ピラティス"],
        ["セーリング", "ヨット"]
    ]
    // 他のテーマに対しても同様にワードペアを追加
};

function createNameFields() {
    const numPlayers = document.getElementById('players').value;
    const playerNamesDiv = document.getElementById('playerNames');
    playerNamesDiv.innerHTML = '';

    for (let i = 0; i < numPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Player ${i + 1} Name`;
        input.className = 'playerName';
        playerNamesDiv.appendChild(input);
    }
}

function startGame() {
    const numPlayers = document.getElementById('players').value;
    let numWolves = document.getElementById('wolves').value;
    if (numPlayers === "" || numPlayers < 3) {  // 人数が未入力または3人未満の場合
        alert('人数をえらんでね');
        return;  // ゲームを開始しない
    }
    if (numWolves === "") {  // 人数が未入力または3人未満の場合
        alert('ウルフの人数をえらんでね');
        return;  // ゲームを開始しない
    }
    // ウルフの人数が過半数を超えないように制限
    const maxWolves = Math.floor(numPlayers / 2);
    if (numWolves > maxWolves) {
        alert(`ウルフの人数が多すぎるよ！ウルフを${maxWolves}人にしました。`);
        numWolves = maxWolves;
        document.getElementById('wolves').value = numWolves; // 入力フィールドも更新
    }
    const theme = document.getElementById('theme').value;
    const nameInputs = document.querySelectorAll('.playerName');
    playerNames = Array.from(nameInputs).map(input => input.value);

    assignWords(theme,numWolves);
    document.getElementById('startGame').style.display = 'none'; // 終了ボタンを消す
    displayNextPlayer();
}

function assignWords(theme, numWolves) {
    const numPlayers = playerNames.length;
    const wordPairList = wordPairs[theme];

    if (!wordPairList) {
        alert('テーマをえらんでね');
        return;
    }

    // テーマ内のワードペアからランダムで一組選ぶ
    const randomPairIndex = Math.floor(Math.random() * wordPairList.length);
    const selectedPair = wordPairList[randomPairIndex];

    // どちらのワードがウルフワードになるかをランダムで決定
    const wolfWordIndex = Math.floor(Math.random() * 2);
    const normalWord = selectedPair[1 - wolfWordIndex];
    const wolfWord = selectedPair[wolfWordIndex];

    let wolfIndices = [];
    while (wolfIndices.length < numWolves) {
        let randomIndex = Math.floor(Math.random() * numPlayers);
        if (!wolfIndices.includes(randomIndex)) {
            wolfIndices.push(randomIndex);
        }
    }

    for (let i = 0; i < numPlayers; i++) {
        if (wolfIndices.includes(i)) {
            words.push(wolfWord);
        } else {
            words.push(normalWord);
        }
    }
}

function displayNextPlayer() {
    if (currentPlayerIndex < playerNames.length) {
        document.getElementById('currentPlayer').innerText = `${playerNames[currentPlayerIndex]}さんのワード：`;
        document.getElementById('wordDisplay').innerText = words[currentPlayerIndex];
        document.getElementById('game').style.display = 'block';
    } else {
        alert('みんなのワードが決まったよ！会話をはじめよう！');
        document.getElementById('game').style.display = 'none';
        document.getElementById('endGame').style.display = 'block'; // ゲーム開始後に終了ボタンを表示
    }
    currentPlayerIndex++;
}

function displayResults() {
    document.getElementById('endGame').style.display = 'none'; // 終了ボタンを消す
    const resultsDiv = document.getElementById('results');
    const playerResults = document.getElementById('playerResults');
    playerResults.innerHTML = ''; // 以前の結果をクリア

    for (let i = 0; i < playerNames.length; i++) {
        const li = document.createElement('li');
        li.textContent = `${playerNames[i]}さん: ${words[i]}`;
        playerResults.appendChild(li);
    }

    resultsDiv.style.display = 'block'; // 結果を表示
}
function restartGame() {
    // ゲームの状態をリセット
    playerNames = [];
    words = [];
    currentPlayerIndex = 0;

    // ゲーム設定画面を再度表示
    document.getElementById('results').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('endGame').style.display = 'none';
    document.getElementById('setup').style.display = 'block';
    document.getElementById('startGame').style.display = 'block'; // ゲーム開始後に終了ボタンを表示

}
document.getElementById('nextPlayer').addEventListener('click', displayNextPlayer);

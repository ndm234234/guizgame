export function getRandomItem(set) {
    let items = Array.from(set);
    return items[Math.floor(Math.random() * items.length)];
  }

export function toQueries(quiz) {
    const queries = new Map();
    for (let i = 0; i < quiz.items.length; i++) {
        let query = { query : quiz.items[i].question, 
                      options : quiz.items[i].options,
                      answers : new Set(quiz.items[i].answers),
                      score : quiz.items[i].score,
                      info : quiz.items[i].info,
                      info_img : quiz.items[i].info_img,
                      category : quiz.items[i].category
                };
        
        if (queries.has(quiz.items[i].category)) {
            if (queries.get(quiz.items[i].category).has(quiz.items[i].score)) {
                queries.get(quiz.items[i].category).get(quiz.items[i].score).add(query );
            }
            else
            {
                queries.get(quiz.items[i].category).set(quiz.items[i].score, new Set());
                queries.get(quiz.items[i].category).get(quiz.items[i].score).add(query);
            }
        }
        else {
            const mapItems = new Map();
            mapItems.set(quiz.items[i].score, new Set());
            mapItems.get(quiz.items[i].score).add(query);
            queries.set(quiz.items[i].category, mapItems);
        }
    }
    return queries; 
}

export  function toTableColumns(queries) {
    var mapColumns = new Set();
    for (let entry of queries) {
        for (let columns of entry[1]) {
            mapColumns.add(columns[0]);
        }
    }

    var sortedColumns = [];
    for (let mapColumn of mapColumns) {
      sortedColumns.push(mapColumn);
    }
    sortedColumns.sort(function(a,b){
      return a - b;
    });
    return sortedColumns;
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        // Generate random number 
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

export function deepCopyArray(array) {
    return JSON.parse(JSON.stringify(array));
}

export function isEqual(a, b) {
    const difference = new Set();
    a.forEach(element => {
      if (!b.has(element)) {
          difference.add(element);
      }
    });
    b.forEach(element => {
      if (!a.has(element)) {
          difference.add(element);
      }
    });
    return difference.size == 0;
}

export function sortedResult(commands) {
    var yourListMaps = [];
    for (let cmd of commands) {
      if (cmd.questions > 0) {
        yourListMaps.push( { command : cmd.name, 
                            questions : cmd.questions, 
                            correctAnswers : cmd.correctAnswers,
                            score : cmd.score });
      }
    }
  
    yourListMaps.sort(function(a,b){
        return b.score - a.score;
    });

    var results = [];

    var index = 0;
    for (let cmd of yourListMaps) {
      var str = ++index + ". Команда <strong>\"" + cmd.command + 
                "\"</strong> ответила на " + cmd.correctAnswers + " вопросов из " + cmd.questions + 
                " на " + cmd.score + " баллов!";
  
      results.push(str);
    }
    if (results.length == 0) {

        results.push("Никто не играл:(");
    } 
    return results;
}

export function uuid() {
    const url = URL.createObjectURL(new Blob())
    const [id] = url.toString().split('/').reverse()
    URL.revokeObjectURL(url)
    return id
  }
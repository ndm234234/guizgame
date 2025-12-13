export function getRandomItem(set) {
    let items = Array.from(set);
    return items[Math.floor(Math.random() * items.length)];
  }

export function toQueries(quizJson) {

    const queries = new Map();
    const sortedItems = [...quizJson.items].sort((a, b) => a.category.localeCompare(b.category));

    for (const item of sortedItems) {
        
        const query = Object.freeze({
            ...item,
            answers: new Set(item.answers)
        });

        const { category, score } = query;
 
        if (!queries.has(category)) {
            queries.set(category, new Map());
        }

        const categoryMap = queries.get(category);

        if (!categoryMap.has(score)) {
            categoryMap.set(score, new Set());
        }
        const scoreSet = categoryMap.get(score);

        scoreSet.add(query);
    }

    return queries;
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

    return yourListMaps;
}

export function uuid() {
    const url = URL.createObjectURL(new Blob())
    const [id] = url.toString().split('/').reverse()
    URL.revokeObjectURL(url)
    return id
  }
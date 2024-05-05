
export const convertTextToArrayOfObjects=(text:String)=>{
    const questionsAndAnswers = [];
    const lines = text.split('\n');
    let currentQuestion = '';
    let currentAnswer = '';

    // Parcourir chaque ligne du texte
    lines.forEach((line:String) => {
        // Si la ligne commence par 'Q :', c'est une nouvelle question
        if (line.startsWith('Q :') || line.startsWith('Q:')) {
            // Ajouter la question précédente et sa réponse à l'array si elles existent
            if (currentQuestion !== '' && currentAnswer !== '') {
                questionsAndAnswers.push({ question: currentQuestion.trim(), answer: currentAnswer.trim() });
            }
            // Réinitialiser les variables pour la nouvelle question
            currentQuestion = line.substring(4);
            currentAnswer = '';
        }
        // Si la ligne commence par 'R :', c'est la réponse à la question précédente
        else if (line.startsWith('R :') || line.startsWith('R:')) {
            currentAnswer += line.substring(4) + ' ';
        }
        // Sinon, c'est une continuation de la réponse précédente
        else if(!line.startsWith("*")) {
            currentAnswer += line + ' ';
        }
    });

    // Ajouter la dernière question et sa réponse à l'array
    if (currentQuestion !== '' && currentAnswer !== '') {
        questionsAndAnswers.push({ question: currentQuestion.trim(), answer: currentAnswer.trim() });
    }

    return questionsAndAnswers;
}


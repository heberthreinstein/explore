var builders = [],
    tools = [];

function ARModel(name, dialogue) {
    //we can make name link to the el id to find it on click?
    this.name = name;
    this.dialogue = dialogue;
    

}

ARModel.prototype.speak = function() {
    return this.dialogue;   
}

//Builder model
function Builder(name, dialogue, tool, successDialogue) {
    ARModel.call(this, name, dialogue);
    this.tool = tool;
    this.successDialogue = successDialogue;
}

Builder.prototype = Object.create(ARModel.prototype);

//Tool model
function Tool(name, dialogue) {
    ARModel.call(this, name, dialogue);
}

Tool.prototype = Object.create(ARModel.prototype);

function initiateModels() {
    var buildersArray = [
      {
        name: 'pyra',
        dialogue: 'Olá! Eu sou Getulio Vargas, Seja Bem Vindo a minha casa! Eu vou te contar um historia sobre a revolução de 1930. Mas primeiro preciso que você encontre meu uniforme da época, ele está aqui na casa em algum lugar.',
        tool: new Tool('hammer', 'Você encontrou o uniforme utilizado por Getulio Vargas na Revoloção de 1930! <br> Volte a falar Getulio Vargas.'),
        successDialogue: 'Muito bem! você encontrou o uniforme! <br><br> Clique para continuar!'
      },
    ];

    buildersArray.forEach(function(builder){
        builders.push(new Builder(builder.name, builder.dialogue, builder.tool, builder.successDialogue));
        if (builder.tool) tools.push(builder.tool);
    });

    console.log('builders', builders);
    console.log('tools', tools)
}

initiateModels();

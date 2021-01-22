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
        dialogue: '"Olá! Eu sou a Formiguinha, nós estamos guardando comida para o inverno. Você poderia nos ajudar?" <br><br> Encontre alguma comida para a Formiguinha utilizando a realidade aumentada.',
        tool: new Tool('hammer', 'Você encontrou uma folha bem grande, acho que as formiguinhas vão adorar! <br> Entregue a folha para a Formiguinha.'),
        successDialogue: 'Muito Obrigado! Essa folha irá nos alimentar por varios dias. <br><br> Clique para continuar!'
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

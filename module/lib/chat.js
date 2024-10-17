const estateChat = {
    template: {
      explosive: "systems/electric-state/templates/chat/explosive-card.hbs",
    },
  };

  async function renderChatMessage(chatOptions, dataSource) {
    const data = dataSource;
    return await Promise.resolve(renderTemplate(chatOptions.template, data));
  }
  
  


export const buildChatCard = function (type, item, chatOptions = {}) {

    console.log("E-STATE | Building Chat Card", type, item);

    let token = "";
    const actor = game.actors.get(ChatMessage.getSpeaker().actor);
    if (actor) {
      token = actor.img;
    } else {
      token = "systems/electric-state/assets/images/logo.webp";
    }

    const data = {
        item: item,
        token: token,
        name: item.name,
        img: item.img,
        system: item.system,
       };

       switch(type){
        case "explosive":
            chatOptions = foundry.utils.mergeObject(
                {
                  user: game.user.id,
                  flavor: data.name,
                  template: estateChat.template.explosive,
                  blind: false,
                },
                chatOptions
              );
        
              break;
       }
       const isPrivate = chatOptions.isPrivate;
       renderChatMessage(chatOptions, data).then((html) => {
         let chatData = {
           speaker: ChatMessage.getSpeaker(),
           user: game.user.id,
           rollMode: game.settings.get("core", "rollMode"),
           content: html,
         };
         if (isPrivate) {
           chatData.whisper = ChatMessage.getWhisperRecipients("GM");
         }
         ChatMessage.create(chatData);
       });

}
module.exports.config = {
  premium: false,  
  prefix: true,
  name: "kick",
  version: "1.0.0",
  permission: 3,
  credits: "D-Jukie",
  description: "kick member from group",
  category: "admin",
  usages: "[tag/reply/all]",
  cooldowns: 0
};


module.exports.run = async function({
  args,
  api,
  event,
  Threads
}) {
  //if (event.senderID !== "100065445284007") {
        //return api.sendMessage("This command is only for my boss SAKIBIN. ❗", event.threadID, event.messageID);}

  var {
    participantIDs
  } = (await Threads.getData(event.threadID)).threadInfo;
  const botID = api.getCurrentUserID();
  try {
    if (args.join().indexOf('@') !== -1) {
      var mention = Object.keys(event.mentions);
      for (let o in mention) {
        setTimeout(() => {
          return api.removeUserFromGroup(mention[o], event.threadID)
        }, 1000)
      }
    } else {
      if (event.type == "message_reply") {
        uid = event.messageReply.senderID
        return api.removeUserFromGroup(uid, event.threadID)
      } else {
        if (!args[0]) return api.sendMessage(`Please tag or reply to the person you want to kick`, event.threadID, event.messageID)
        else {
          if (args[0] == "all") {
            const listUserID = event.participantIDs.filter(ID => ID != botID && ID != event.senderID);
            for (let idUser in listUserID) {
              setTimeout(() => {
                return api.removeUserFromGroup(idUser, event.threadID)
              }, 1000)
            }
          }
        }
      }
    }
  } catch {
    return api.sendMessage('ccc', event.threadID, event.messageID);
  }
}

const fs = require("fs");
const axios = require("axios");

module.exports = {
  config: {
    name: "imagine",
    aliases: [],
    author: "kshitiz",
    version: "1.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "generate an image using the 'imagine' API"
    },
    category: "𝗠𝗘𝗗𝗜𝗔",
    guide: {
      en: "[prompt]"
    }
  },
  onStart: async function ({ api, event, args }) {
    let path = __dirname + "/cache/image.png";
    let prompt = args.join(" ");

    if (args.length === 0) {
      return api.sendMessage("Please provide a prompt.", event.threadID, event.messageID);
    }

    let tid = event.threadID;
    let mid = event.messageID;

    try {
      api.sendMessage("⏳ Generating... please wait, it will take time.", tid, mid);

      let enctxt = encodeURIComponent(prompt);
      let url = `https://imagine-kshitiz.onrender.com/imagine?prompt=${enctxt}`;

      let response = await axios.get(url, { responseType: "json" });

      let imageUrl = response.data.imageUrl;

      let imageResponse = await axios.get(imageUrl, { responseType: "stream" });

      imageResponse.data.pipe(fs.createWriteStream(path));

      imageResponse.data.on("end", () => {
        api.sendMessage({ attachment: fs.createReadStream(path) }, tid, () => fs.unlinkSync(path), mid);
      });
    } catch (e) {
      return api.sendMessage(e.message, tid, mid);
    }
  }
};

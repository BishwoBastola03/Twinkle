const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    aliases: [],
    author: "kshitiz x Aesther ",// idea and half code stolen from mirai coded by Rickiel haha
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "get bot owner info"
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
      try {
        const loadingMessage = "💬 | 𝘢𝘵𝘵𝘦𝘯𝘥 𝘫𝘦 𝘷𝘢𝘪𝘴 𝘮'𝘪𝘯𝘧𝘰𝘳𝘮𝘦𝘳 𝘴𝘶𝘳 𝘮𝘢𝘪𝘵𝘳𝘦𝘴𝘴𝘦 '...";
        await api.sendMessage(loadingMessage, event.threadID);

        const ownerInfo = {
          name: 'LAST UCHIHA',
          gender: 'Male',
          hobby: 'Travelling with homeis',
          relationship: 'Not Single RN',
          facebookLink: 'https://www.facebook.com/Yogesh7Editz',
          bio: '😗🌷'
        };

        const videoUrl = 'https://drive.google.com/uc?export=download&id=1ghhGZ6C7hB7OKwsIEy4MAOCMslwi1duM';
        const tmpFolderPath = path.join(__dirname, 'tmp');

        if (!fs.existsSync(tmpFolderPath)) {
          fs.mkdirSync(tmpFolderPath);
        }

        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

        fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

        const response = `
          𝗼𝘄𝗻𝗲𝗿 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻:
      ▣𝗡𝗔𝗠𝗘 : ${ownerInfo.name}
      ▣𝗚𝗘𝗡𝗗𝗘𝗥: ${ownerInfo.gender}
      ▣𝗛𝗢𝗕𝗕𝗬: ${ownerInfo.hobby}
      ▣𝗥𝗘𝗟𝗔𝗧𝗢𝗡𝗦𝗛𝗜𝗣: ${ownerInfo.relationship}
      ➤𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞: ${ownerInfo.facebookLink}
      ◈ 𝗦𝗧𝗔𝗧𝗨𝗦 ◈: ${ownerInfo.bio}
        `;

        await api.sendMessage({
          body: response,
          attachment: fs.createReadStream(videoPath)
        }, event.threadID);
      } catch (error) {
        console.error('Error in owner command:', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
      }
    },
    onChat: async function({ api, event }) {
      try {
        const lowerCaseBody = event.body.toLowerCase();

        if (lowerCaseBody === "owner" || lowerCaseBody.startsWith("{p}owner")) {
          await this.onStart({ api, event });
        }
      } catch (error) {
        console.error('Error in onChat function:', error);
      }
    }
  };

/*

To add new video 
1. upload your video on drive
2. after uploading change the video acces to anyone with the link 
3. copy video link
4. go to direct drive link convert website
5. paste that link there and copy direct link
6. paste that link in code 

*/
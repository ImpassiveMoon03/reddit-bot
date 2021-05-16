const Discord = require('discord.js')
const request = require('request');

const bot = new Discord.Client({fetchAllMembers:true})

bot.on('ready', async () => {
  console.log(`Logged in as ${bot.user.username}`)
});

bot.on('message', async (message) => {
  if(message.content.toLowerCase() == 'meme'){
    request('https://www.reddit.com/r/dankmemes/random.json', (a,b,c) => {
      data = JSON.parse(c)[0].data.children[0].data
      let embed = new Discord.MessageEmbed()
      .setTitle(`${data.title}`)
      .setURL(`http://reddit.com${data.permalink}`)
      if(data.url_overridden_by_dest){
        embed.setImage(data.url_overridden_by_dest)
      }
      let description = ""
      if(data.selftext){
        description = `${data.selftext}\nBy: [u/${data.author}](http://reddit.com/u/${data.author})`
      }else{
        description = `By: [u/${data.author}](http://reddit.com/u/${data.author})`
      }
      embed.setDescription(description)
      embed.setFooter(`${data.subreddit_name_prefixed}`)
      message.channel.send(embed)
    })
  }

  if(message.content.toLowerCase().startsWith('r/')){
    red = message.content.split('');
    reddit = red.slice(2).join('')
    request(`https://www.reddit.com/r/${reddit}/random.json`, (a,b,c) => {
      if(JSON.parse(c).error){
        message.channel.send('Subreddit not found!')
      }else{
        data = JSON.parse(c)[0].data.children[0].data
        let embed = new Discord.MessageEmbed()
        .setTitle(`${data.title}`)
        .setURL(`http://reddit.com${data.permalink}`)
        if(data.url_overridden_by_dest){
          embed.setImage(data.url_overridden_by_dest)
        }
        let description = ""
        console.log(data.selftext.length)
        if(data.selftext){
          description = `${data.selftext}\nBy: [u/${data.author}](http://reddit.com/u/${data.author})`
        }else if(data.selftext && data.selftext.length > 1999){
          description = `***Post Body Too Large\nBy: [u/${data.author}](http://reddit.com/u/${data.author})`
        }else{
          description = `By: [u/${data.author}](http://reddit.com/u/${data.author})`
        }
        embed.setDescription(description)
        embed.setFooter(`${data.subreddit_name_prefixed}`)
        message.channel.send(embed)
      }
    })
  }
});

bot.login('ODQxNDA3MzY5MDI4MzA0OTc3.YJmTrQ.3TKw105hOrymIypI5ZyfV6aeDYQ')
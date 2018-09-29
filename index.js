const Discord = require("discord.js");
const bot = new Discord.Client();
let prefix = 'itzpet.';
let shop = {'status': 1};
let time = '17:00 - 19:00';
let credit = ' | สร้างโดย Chakung';
bot.on("ready", () => {
    
    let name = bot.user.username;
    let avatar = bot.user.avatarURL;
    let cha = bot.users.get('291149768397422593');
    bot.user.setPresence({ game: { name: `คำสั่ง ${prefix}help | สร้างโดย Chakung#0785` }, type: 0 });
    console.log(`${name} Online! Created by Chakung.`);
    cha.send(`__${name} Online__ `+(new Date));
});
bot.on('message', message => {
    if(!message.content.startsWith(prefix)) return;
    let name = bot.user.username;
    let avatar = bot.user.avatarURL;
    let cha = bot.users.get('291149768397422593');
    let command = message.content.split(' ')[0];
    command = command.slice(prefix.length);
    var args = message.content.split(' ').slice(1);
    if(command === 'help') {
        const embed = new Discord.RichEmbed()
        .addField('รายการคำสั่ง',
        `**${prefix}say** (ข้อความ) : บอทพูดตามที่พิมพ์\n`+
        `**${prefix}help** : คำสั่งช่วยเหลือ\n`+
        `**${prefix}time** : คำสั่งดูเวลาเปิดร้าน\n`+
        `**${prefix}open** : คำสั่งเปิดร้าน\n`+
        `**${prefix}close** : คำสั่งปิดร้าน\n`+
        `**${prefix}status** : คำสั่งดูสถานะว่าร้านเปิดหรือปิด\n`+
        `**${prefix}stock** (จำนวนสัตว์) : คำสั่งบอกจำนวนสัตว์ใน Stock\n`+
        `**${prefix}settime** (เวลาเปิดปิด) : คำสั่งตั้งเวลาเปิดร้าน\n`+
        `**${prefix}credit** : ตรวจสอบข้อมูลคนสร้างบอท\n`)
        .setColor(0xfefefe)
        .setFooter(name+credit, avatar)
        message.channel.sendEmbed(embed);
    }
    if (command === 'time')
    {
        const embed = new Discord.RichEmbed()
        .addField('เวลาทำการ','เปิดร้าน : '+time)
        .setColor(0x00ff00)
        .setFooter(name+credit, avatar)
        message.channel.sendEmbed(embed)
    }
    if (command === 'status')
    {
        if (shop.status === 1)
        {
          const embed = new Discord.RichEmbed()
          .addField('สถานะของร้าน','ร้านเปิด')
          .setColor(0xffffff)
          .setFooter(name+credit, avatar)
          message.channel.sendEmbed(embed);
        }
        else
        {
          const embed = new Discord.RichEmbed()
          .addField('สถานะของร้าน','ร้านปิด')
          .setColor(0x000000)
          .setFooter(name+credit, avatar)
          message.channel.sendEmbed(embed);
        }
    }
    if(command === 'credit') {
        const embed = new Discord.RichEmbed()
        .setAuthor(cha.username+' ผู้สร้างบอท', cha.avatarURL)
        .setDescription('พัฒนาบอท Discord ด้วยภาษา Javascript รับเปิดบอท online 24 ชั่วโมง ราคาเริ่มต้นที่ 100 บาท')
        .setThumbnail(cha.avatarURL)
        .setURL('https://www.facebook.com/polite.cha')
        .addField('ติดต่อสอบถาม','Discord: Chakung#0785\nFacebook: Polite Cha\nYoutube: FriendRPG TV')
        .setColor(0x3399ff)
        .setFooter(name+credit, avatar)
        message.channel.sendEmbed(embed);
    }
});
bot.on('message', message => {
    if(!message.content.startsWith(prefix)) return;
    let name = bot.user.username;
    let avatar = bot.user.avatarURL;
    let cha = bot.users.get('291149768397422593');
    let owner = message.author;
    let command = message.content.split(' ')[0];
    command = command.slice(prefix.length);
    var args = message.content.split(' ').slice(1);
        
    if (command === 'stock') {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR'])) return message.reply('คุณยังไม่ได้เป็นเจ้าของบอท');
        let pet = args.join(' ');
        const embed = new Discord.RichEmbed()
        .setColor(0x886688)
        .addField(`มีสัตว์ทั้งหมด ${pet} ตัว`,'ติดต่อคนขายเพื่อซื้อ <@'+message.author.id+'>')
        .setFooter(name+credit, avatar)
        message.channel.sendEmbed(embed)
        
    }
    if (command === 'settime')
    {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== cha) return message.reply(`❌ คุณไม่ได้รับอนุญาติให้ใช้คำสั่ง ~~${message.content}~~`);
        time = args.join(' ');
        const embed = new Discord.RichEmbed()
        .addField('ตั้งเวลา','เปิดร้าน : '+time)
        .setColor(0xfff000)
        .setFooter(name+credit, avatar)
        message.channel.sendEmbed(embed)
    }
    if (command === 'open')
    {
        message.delete()
        let owner = message.author;
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== cha) return message.reply(`❌ คุณไม่ได้รับอนุญาติให้ใช้คำสั่ง ~~${message.content}~~`);
        shop.status = 1;
        const embed = new Discord.RichEmbed()
        .addField('สถานะของร้าน','ร้านเปิดแล้ว! ทักหาคนขายได้เลยครับ')
        .setColor(0xffffff)
        .setFooter(name+credit, avatar)
        message.channel.sendEmbed(embed)
        .then(message => message.channel.send("@everyone"+` ร้านเปิดแล้วนะงับ ทักหา <@${owner.id}> เพื่อซื้อได้เลย! `));
    }
    if (command === 'close')
    {
        message.delete()
        if(!message.member.hasPermission(['ADMINISTRATOR']) && owner !== cha) return message.reply(`❌ คุณไม่ได้รับอนุญาติให้ใช้คำสั่ง ~~${message.content}~~`);
        shop.status = 0;
        const embed = new Discord.RichEmbed()
        .addField('สถานะของร้าน','ร้านปิดแล้ว! โอกาศหน้าเชิญใหม่นะครับ')
        .setColor(0x000000)
        .setFooter(name+credit, avatar)
        message.channel.sendEmbed(embed)
        .then(message => message.channel.send(`ร้านปิดเเล้วครับ โอกาศหน้าเชิญใหม่นะครับ by ${name} @everyone`));
    }
    if (command === 'say')
    {
        message.delete()
        message.channel.send(args.slice(0).join(' '));
    }
});
bot.login(process.env.token);
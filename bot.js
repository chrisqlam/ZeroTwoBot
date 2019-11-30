//const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = "!";


//create a ready event, the bot will not listen until this checks
const client = new Discord.Client();

client.on("ready", async () => {
    console.log('I am ready ' + client.user.username);

    try {
        let link = await client.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
        client.user.setStatus('available');
        client.user.setPresence({
            game: {
                name: 'with my Darling'
            }
        })
    } catch (e) {
        console.log(e.stack);
    }
});

//commands

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    const args = message.content.slice(prefix.length).trim().split(/\s/g);
    const command = args.shift().toLowerCase();
    const guildId = message.guild.id;
    const guild = client.guilds.get(guildId);

    //no prefix commands
    if (!command.startsWith(prefix)) {
        if (message.content.toLowerCase() === "owo") {
            message.channel.send("What's this?");
        }
    };

    //User info command
    if (command === 'userinfo') {
        let user = message.mentions.members.first();
        try {
            if (!user) {
                message.channel.send('Please tag a member');
            }
            else {
                let highest_role = user.highestRole.name;
                if (guild.owner.user.username === user.user.username) {
                    highest_role = 'BIG SERVER OWNER';
                }
                else {
                    highest_role = user.highestRole.name;
                }
                console.log('run userinfo');
                let embed = new Discord.RichEmbed()
                    .setAuthor(user.user.username, user.user.avatarURL)
                    .setTitle(highest_role)
                    .setColor("#ff0000")
                    .addField("Full Username", `${user.user.username}#${user.user.discriminator}`, true)
                    .addField("ID", `${user.id}`, true)
                    .setImage(user.user.avatarURL)
                message.channel.send(embed);
            }
        }
        catch (e) {
            console.log(e.stack);
            message.channel.send('An ERROR has occured, check the logs.');
        }
    }

    //Moon2Coom react
    if (message.content.includes("644411534767816714")) {
        message.react('644412167537557504');
    }


    //Jovi Sub Command
    if (command === 'jovisub') {
        try {
            if (guild.roles.get('642190113324924949')) {
                console.log("Run Jovi Sub");
                const guildMember = message.member;
                if (guildMember.roles.has('642190113324924949')) {
                    guildMember.removeRole('642190113324924949');
                    message.channel.send(`${guildMember}, you have unsubbed to Jovi`);
                    return;
                }
                else {
                    guildMember.addRole('642190113324924949');
                    message.channel.send(`${guildMember}, you are now subbed to Jovi`);
                    return;
                }
            }
            else {
                message.channel.send('The JovisSub role does not exist');
            }
        }
        catch (e) {
            console.log(e.stack);
            message.channel.send('An ERROR has occured, check the logs.');
        }
    }

    //reminder command
    if (command === 'remind') {
        try {
            let time = args[0].replace(/[a-z||A-Z]$/g, '');
            let timemeasure = args[0].substring(args[0].length - 1, args[0].length)
            let msg = message.content.split(/\s/g);

            console.log('run remind');

            function sendReminder() {
                message.reply(msg);
            }

            switch (timemeasure) {
                case 's':
                    time *= 1000;
                    break;
                case 'm':
                    time *= 1000 * 60;
                    break;
                case 'h':
                    time *= 1000 * 60 * 60;
                    break;
                default:
                    message.reply('Please ensure you set an amount of time to send your reminder.');
            }

            //removes the command & time from message
            msg.splice(0, 2);

            msg = msg.join(' ');

            console.log(`${time} ${timemeasure} ${msg}`);
            console.log('send reminder');
            if (isNaN(args[0].substring(0, 1))) {
                message.reply('Please ensure you set an amount of time to send your reminder.');
            }
            else if (msg) {
                message.reply(`Okay, I\'ll remind you in ${args[0]}, darling.`);
                setTimeout(
                    sendReminder, time
                );
            }
        }
        catch (e) {
            console.log(e.stack);
            message.channel.send('An ERROR has occured, check the logs.');
        }
    }
});

//client.login(botSettings.token);

client.login(process.env.BOT_TOKEN);
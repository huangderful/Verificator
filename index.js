const Discord = require('discord.js');
const nodemailer = require('nodemailer');
const token = require("./config.json");
const client = new Discord.Client();
const codes = token.codes;
const PREFIX = '='; 

var people = new Object();



client.login(token.TOKEN);
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: token.emailUser,
    pass: token.emailPass
    }
});

client.on('ready', ()=>{
    console.log('This bot is online!');
    client.user.setActivity('=help', { type: 'LISTENING' });

});
// client.on('messageDelete', message=>{
//     logMessages();
// });
client.on('message', message=>{
    let args = message.content.substring(PREFIX.length).split(" ");
    switch(args[0]){
        case "verify":
            message.react('✅');
            message.author.send("Please send your school email address");  
            people[message.author.tag] = {
                id: message.author.id,
                step: 0,
                guild: message.guild.id,
                random: (Math.random() * (codes.length-1)).toFixed(0),
                level: -1 
                
            }
        break;
        case "help":
            var helpEmbed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle("Type `=verify`!")
            .setDescription("*Step 2:* Follow what the bot tells you (aka dm school email, then a code)\n" +
            "*Step 3:* Profit \n" +
            "*Caveats:* You cannot type a nonschool email \n"
            + "If you mistype your email dm the bot `back` \n" + 
            "**If the bot is offline, it will not work (aka whenever my server is down)** \n" +
            "If you try to verify in 2 discords at once, you will have problems. \n" +
            "If you are the server moderator and change role names, let @CheeezAir#2420 know \n" + 
            "If the bot DOES NOT dm you, or there are any glitches, please yell at @CheeezAir#2420 \n" +
            "~Richard");
            message.channel.send(helpEmbed); 
        break;
        case "changelog":
            var embed = new Discord.MessageEmbed()
            .setTitle("Version: 1.2.1; Updated 12/17/2020 by CheeezAir (Richard)")
            .setColor('GREEN')
            .setDescription("*1.2 Changes* \n" + 
            "-Made it so that the bot doesn't break if you dm it without saying verify command \n" +
            "-Updated back input to only function during the email step\n" +
            "*1.2.1 Changes* \n" + 
            "-Beautified help and changelog with Embeded messages");
            message.channel.send(embed);
        break;
        case "DEATH":
            message.channel.send("cya!").then(message => client.destroy());
        break;
        
        case "advert":
            if(message.author.id === "253756726677995521"){
                message.channel.send("So, I'm advertising to a really small audience BUT \n" +
                "if you have a position power in any club and have decided that Discord is the way to go ~~because it is the best~~ \n" +
                "and you realize that manual verification sucks, DM @CheeezAir#2420 for an alternative.")
            }
        break;

        case "dQw4":
            message.channel.send("We're no strangers to love \n" +
            "You know the rules and so do I\n" +
            "A full commitment's what I'm thinking of\n" +
            "You wouldn't get this from any other guy\n" +
            "I just wanna tell you how I'm feeling\n" +
            "Gotta make you understand\n" +
            "Never gonna give you up\n" +
            "Never gonna let you down\n" +
            "Never gonna run around and desert you\n" +
            "Never gonna make you cry\n" +
            "Never gonna say goodbye\n" +
            "Never gonna tell a lie and hurt you\n" +
            "We've known each other for so long\n" +
            "Your heart's been aching but you're too shy to say it\n" +
            "Inside we both know what's been going on\n" +
            "We know the game and we're gonna play it\n" +
            "And if you ask me how I'm feeling\n" +
            "Don't tell me you're too blind to see\n" +
            "Never gonna give you up\n" +
            "Never gonna let you down\n" +
            "Never gonna run around and desert you\n" +
            "Never gonna make you cry\n" +
            "Never gonna say goodbye\n" +
            "Never gonna tell a lie and hurt you\n" +
            "Never gonna give you up\n" +
            "Never gonna let you down\n" +
            "Never gonna run around and desert you\n" +
            "Never gonna make you cry\n" +
            "Never gonna say goodbye\n" +
            "Never gonna tell a lie and hurt you\n" +
            "Never gonna give, never gonna give\n" +
            "(Give you up)\n" +
            "(Ooh) Never gonna give, never gonna give\n" +
            "(Give you up)\n" +
            "We've known each other for so long\n" +
            "Your heart's been aching but you're too shy to say it\n" +
            "Inside we both know what's been going on\n" +
            "We know the game and we're gonna play it\n" +
            "I just wanna tell you how I'm feeling\n" +
            "Gotta make you understand\n" +
            "Never gonna give you up\n" +
            "Never gonna let you down\n" +
            "Never gonna run around and desert you\n" +
            "Never gonna make you cry\n" +
            "Never gonna say goodbye\n" +
            "Never gonna tell a lie and hurt you\n" +
            "Never gonna give you up\n" +
            "Never gonna let you down\n" +
            "Never gonna run around and desert you\n" +
            "Never gonna make you cry\n" +
            "Never gonna say goodbye\n" +
            "Never gonna tell a lie and hurt you\n" +
            "Never gonna give you up\n" +
            "Never gonna let you down\n" +
            "Never gonna run around and desert you\n" +
            "Never gonna make you cry");
            message.channel.send("=> https://www.youtube.com/watch?v=dQw4w9WgXcQ <=");
            message.channel.send("**^ BEST SONG LISTEN ^**");



        break;
        //specific people commands
        case "reset":
            if(message.author.id === "253756726677995521"){
                resetBot(message.channel);
            }
        break;
        
        case "triggerspam":
            if(message.author.id === "253756726677995521"){
                message.delete();
                var spamMessage = "";
                for(var u = 1; u < args.length - 1; u++){
                    spamMessage += args[u] + " ";
                }
                for(var z = 0; z < parseInt(args[args.length - 1]); z++){
                    message.channel.send(spamMessage);
                } 
                
            }
        break;
    } 
    if(message.channel instanceof Discord.DMChannel && !message.author.bot){
        //logging area
        console.log("Message from " + message.author.tag + ": " + message.content);
        client.channels.cache.get('770812913761648640').send("" + message.author.tag + ": " + message.content);

        var tag = message.author.tag;
        if(message.content.toUpperCase().indexOf("THANK") != -1 || 
        message.content.toUpperCase().indexOf("TY") != -1){
            message.channel.send("yep yep this is my job :)")
        }
        else if(people[tag] === undefined){
            message.author.send("yikes, well this is awkward; one of the following things probably occured: \n" +
            "**1. You DM'd me without saying `=verify` in the Discord you want to get verified in** \n" +
            "*To fix: Go to the Discord you want to verify in and type `=verify` in the verification channel, *" +
            "*if you do not know where this is, message a moderator/officer on the server.** \n" +
            "**2. You are finished with the process and are messaging this bot** \n" +
            "*beware, I can see all files and messages to this bot so don't message this bot anything too important.* \n" +
            "**If none of the things above are true, then congratulations you have found a bug!**\n" +
            "**Please dm @CheeezAir#2420 so he can fix it for you asap** \n")
        }
        
        else if(message.content.toUpperCase().trim().indexOf("BACK") === 0){
            if(people[tag].step === 1){
                message.author.send("Please send your school email address");
                console.log("hi");  
                people[tag].step--;
            }
            else{
                message.author.send("you should be fine to keep going along.");
            }
        }

        else if(people[tag].step === 0){
            
                if(message.content.trim().indexOf('@student.fuhsd.org') != -1){
                    people[tag].email = message.content.trim();
                    message.channel.send("Sending you an email with a code; please dm it back + \n" +
                    "**IF you misinputed your email type `back`**");
                    mail(people[tag].email, people[tag].random);
                    people[tag].step++;
        
                } else{
                    message.channel.send('Please send an @student.fuhsd.org email account');
                }
        }
        else if(people[tag].step === 1){
            if(message.content.trim() === codes[people[tag].random]){
                //testing
                if(people[tag].guild === '714359263299895347'){
                    endMessage(message, '714359263299895347', "tester", "all verified intesting",
                    "714359263299895350", people[tag].id, people[tag].email);
                    delete people[tag];
                }
                //yes
                else if(people[tag].guild === '679926781507272755'){
                    endMessage(message, '679926781507272755', "Yes", "all verified IN YES GLORY",
                    "714359263299895350", people[tag].id, people[tag].email);
                    delete people[tag];
                }
                //BIOLOGY
                else if(people[tag].guild === '760328969903013889'){

                    endMessage(message, '760328969903013889', "verified",
                    ":DNA: **All verified in the Biology Discord!** :DNA: \n" +
                    "Please read the rules and if you have any further questions, please ask a mod",
                    "760332092449226835", people[tag].id, people[tag].email);
                    delete people[tag];
                }
                //FRENCH
                else if(people[tag].guild === '755879507658932288'){
                    endMessage(message, '755879507658932288', "Baguettes", 
                    "What is your French level? \n" +
                    "(Type `1` for French 1, `2` for French 2, etc. If you are in AP French or"
                        + " are fluent in French, type `5`. If you aren't taking a French class put `0`",
                    "770712642809364510", people[tag].id, people[tag].email);
                    people[tag].step++;
                }
                
            }
            else{
                message.channel.send("wrong code, try again");
            }
        }
        else if(people[tag].step === 2){
            if(people[tag].guild === '755879507658932288'){
                if(message.content.trim() === "0" ||message.content.trim() === "1" ||message.content.trim() === "2" ||
                message.content.trim() === "3" ||message.content.trim() === "4" ||message.content.trim() === "5"){
                    message.channel.send("Are you sure? `Y`/`N`");
                    people[tag].level = parseInt(message.content.trim().charAt(0));
                    people[tag].step++;
                }
                else{
                    message.channel.send("Please a number between `0` and `5` that indicates your French level.");
                }
            }
        }
        else if(people[tag].step === 3){
            if(people[tag].guild === '755879507658932288'){
                if(message.content.toUpperCase().indexOf("N") != -1){
                    message.channel.send("What is your French level? \n" +
                    "(Type `1` for French 1, `2` for French 2, etc. If you are in AP French or"
                        + " are fluent in French, type `5`. If you aren't taking a French class put `0`")
                }
                else if(message.content.toUpperCase().indexOf("Y") != -1){
                    if(people[tag].level === 0){
                        message.channel.send("Aw, you should take a French class!");
                    }
                    else if(people[tag].level === 1){
                        assignRole("755879507658932288", "French 1", people[tag].id);
                    }
                    else if(people[tag].level === 2){
                        assignRole("755879507658932288", "French 2", people[tag].id);

                    }
                    else if(people[tag].level === 3){
                        assignRole("755879507658932288", "French 3", people[tag].id);

                    }
                    else if(people[tag].level === 4){
                        assignRole("755879507658932288", "French Honors", people[tag].id);

                    }
                    else if(people[tag].level === 5){
                        assignRole("755879507658932288", "AP French/Fluent", people[tag].id);

                    }
                    else{
                        message.channel.send("uh oh there's a bug.")
                    }
                    message.channel.send("Alrighty, are you in French Club or FNHS? \n" +
                    "(Type `0` for neither, `1` for French Club, and `2` for FNHS)")
                    people[tag].step++;  
                }
            }
        }
        else if(people[tag].step === 4){
            if(people[tag].guild === '755879507658932288'){
                if(message.content.trim() === "0" ||message.content.trim() === "1" ||message.content.trim() === "2"){
                    message.channel.send("Are you sure? `Y`/`N`");
                    people[tag].level = parseInt(message.content.trim().charAt(0));
                    people[tag].step++;
                }
                else{
                    message.channel.send("Please a number between `0` and `2` that indicates whether you are in French Club or FNHS.")
                }
            }
        }
        else if(people[tag].step === 5){
            if(people[tag].guild === '755879507658932288'){
                if(message.content.toUpperCase().indexOf("N") != -1){
                    people[tag].step--;
                    people[tag].level = -1;
                    message.channel.send("Are you in French Club or FNHS? \n" +
                    "(Type `0` for neither, `1` for French Club, and `2` for FNHS)")
                }
                else if(message.content.toUpperCase().indexOf("Y") != -1){
                    if(people[tag].level === 0){
                        message.channel.send("May I suggest that you join ;)");
                    }
                    else if(people[tag].level === 1){
                        assignRole("755879507658932288", "French Club", people[tag].id);
                    }
                    else if(people[tag].level === 2){
                        assignRole("755879507658932288", "FNHS", people[tag].id);

                    }
                    else{
                        message.channel.send("uh oh there's a bug.")
                    }
                    message.channel.send("**All verified in the FNHS Discord!** \n" + 
                    "Please read the rules and if you have any further questions please ask an officer!");
                    delete people[tag];
                }
            }
            
            
        }
        }

});

function resetBot(channel){
    channel.send('Resetting...')
    .then(message => client.destroy)
    .then(() => client.login(token.TOKEN))
    .then(channel.send('Back online'));
}
function assignRole(guildID, roleName, personID){
    var role = client.guilds.cache.get(guildID).
    roles.cache.find(role => role.name === roleName);
    client.guilds.cache.get(guildID).
    members.cache.get(personID).roles.add(role);
}
function endMessage(msgparam, guildID, roleName, finalMessage, emailLog, personID, email){
    var role = client.guilds.cache.get(guildID).
    roles.cache.find(role => role.name === roleName);
    client.guilds.cache.get(guildID).
    members.cache.get(personID).roles.add(role);
    msgparam.channel.send(finalMessage);
    

    client.channels.cache.get(emailLog).send("<@" + personID + "> => " + email);
}
function logMessages(message){


}
async function mail(email, ran){
    let mailOptions = {
        from: 'cheeezydiscverifier@gmail.com',
        to: email,
        subject: 'Verification Code',
        text: codes[ran]
    };
        
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

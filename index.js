import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const binarySearchString =`
const binarySearch = function search(arr, x) {
    let lo = 0, hi = arr.length - 1;
    while(lo <= hi){
        let mid = lo + Math.floor((hi - lo)/2);
        if(arr[mid] == x) return mid;
        else if(arr[mid] < x) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return undefined;
};   
`

try{
    bot.start((ctx) => ctx.reply('Welcome to Kushagra\'s bot')); // /start

    bot.help((ctx) => ctx.reply(`
        Here are the available commands:
        - /binarysearch: Get the binary search algorithm in JavaScript.
        - /toplinuxcommands: Get a list of commonly used Linux commands.
        - /queueusingLL: Get the JavaScript code for implementing a queue using linked lists.
        Type 'hi' to say hello to me!
    `));

    bot.on('sticker', (ctx) => ctx.reply('👍'));

    bot.command('binarysearch', (ctx) => ctx.reply(binarySearchString));

    bot.command('toplinuxcommands', (ctx) => ctx. reply('ls cd pwd grep rm mkdir touch'));

    bot.command('queueusingLL', async (ctx) => {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/singhsanket143/FrontendDSA/refs/heads/master/Aug_16/queueUsingLL.js');
        ctx.reply(response.data);
    } catch (error) {
        ctx.reply('Sorry, there was an error fetching the data.');
        console.error(error);
    }
    });

    bot.on('text', (ctx) => {
        if (ctx.message.text.toLowerCase() === 'hi') {
            ctx.reply('Hello there! How can I assist you today?');
        } else {
            ctx.reply('I only understand /binarysearch, /queueusingLL, and /toplinuxcommands. Type /help for more info.');
        }
    });

    bot.launch();

    console.log('Bot is up and running...');
    
} catch {
    console.log('unexpected command');
}
const Discowd = require('discord.js')
let CwyptoRPC = require('bitcoin-rpc-promise')

let bot = new Discowd.Client();
let hook = new Discowd.WebhookClient("<CLIENT_ID>", "<CLIENT_SECRET>");
let rpc = new CwyptoRPC('http://user:pass@localhost:10332');

let lastBlockHash = "";

let scanInterval = setInterval(function(){
    rpc.call("getbestblockhash").then(bHash => {
        if (bHash === lastBlockHash) return;

        lastBlockHash = bHash;
        rpc.call("getblock", bHash).then(block => {
            var embed = {
                "color": 6080248,
                "description": "Block " + block.height + " was mined! <:beyondcoin:<SERVER_ID>>",
                "fields": [
                {
                  "name": "Block Hash",
                  "value": "`" + bHash + "`",
                  "inline": false
                },
                {
                  "name": "Transactions inside block",
                  "value": block.tx.length + " TXs",
                  "inline": false
                }
                ]
            };
            
            hook.send({embeds: [embed]});
        });
    });
}, 1000);

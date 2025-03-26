import {update, hide, get} from '../func.js';
const In =document.getElementById('In')
let messagenum = 0
const url = "https://api.github.com/repos/J9133/messageData/contents/data.json";
const url2 = "https://api.github.com/repos/J9133/messageData/contents/datanum.json";
const token = "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";

async function sand() {
  if (In.value) {
    const datanum = await get(url2, token);
    let num = JSON.parse(datanum).num;
    let key = "message" + num;
    update(url, token, { [key]: In.value });
    update(url2, token, { num: num + 1
    });
    console.log(key);
    In.value = ''
    
  }
}

async function reset() {
  await update(url, token, {}); 
  await update(url2, token, { num: 0 }); 
  document.querySelectorAll('#message').forEach(element => element.remove());
  messagenum = 0;
}

async function main() {
  try {
    const datanum = await get(url2, token)
    let num = JSON.parse(datanum).
    num
    messagenum = num
    
    const messages = document.querySelectorAll('#message');
    const d = await get(url, token);
    const jsondata = JSON.parse(d);
    const data = Object.values(jsondata);
    console.log(data);
    
    messages.forEach(element => element.remove());
    
    for (let i = 0; i < data.length; i++) {
      hide(data[i]);
    }
  } catch (error) {
    console.error("حدث خطأ:", error);
  }
}
main()

setInterval(main, 1000)

window.sand = sand
window.reset = reset

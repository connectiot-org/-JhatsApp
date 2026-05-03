const fs = require('fs');

function run() {
  const data = fs.readFileSync('elon.txt', 'utf8');
  
  const threadRegex = /\{"doc_id":"([^"]+)",(?:.*?)?(?:,"count":(\d+))?,(?:.*?)?"subject":"([^"]*)",(?:.*?)?"latest_sender_name":"([^"]*)",(?:.*?)?"latest_sender_email":"([^"]*)",(?:.*?)?"formatted_date":"([^"]*)",(?:.*?)?"preview":"([^"]*)"(?:.*?)?\}/g;

  const parsedThreads = [];
  for (const match of data.matchAll(threadRegex)) {
    parsedThreads.push({
      doc_id: match[1],
      count: match[2],
      subject: match[3],
      sender_name: match[4],
      sender_email: match[5],
      formatted_date: match[6],
      preview: match[7]
    });
  }

  // Deduplicate
  const unique = [];
  const seen = new Set();
  for (const t of parsedThreads) {
    if (!seen.has(t.doc_id)) {
      seen.add(t.doc_id);
      unique.push(t);
    }
  }

  // Sort by date
  unique.sort((a, b) => new Date(a.formatted_date) - new Date(b.formatted_date));

  const messages = [];
  let idCounter = 1;

  for (const t of unique) {
    let from = "them";
    const name = (t.sender_name || "").toLowerCase();
    const email = (t.sender_email || "").toLowerCase();
    
    if (name.includes("jeffrey") || email.includes("jeffrey") || name.includes("epstein") || email.includes("epstein") || email.includes("jeevacation")) {
      from = "me";
    }

    const dateObj = new Date(t.formatted_date);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${days[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
    const timeStr = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    messages.push({
      id: idCounter++,
      from: from,
      text: t.preview,
      time: timeStr,
      date: formattedDate
    });
  }

  const lastMessage = messages[messages.length - 1];
  let lastDate = "";
  if (lastMessage) {
    const d = new Date(unique[unique.length - 1].formatted_date);
    lastDate = `${(d.getMonth()+1).toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}/${d.getFullYear().toString().slice(2)}`;
  }

  const elonData = {
    contact: {
      id: "elon-musk",
      name: "Elon Musk",
      role: "CEO of Tesla & SpaceX",
      avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Felon-musk.png&w=128&q=75"
    },
    conversation: {
      last: lastDate,
      preview: lastMessage ? lastMessage.text : "",
      msgs: messages
    }
  };

  const fileContent = `window.__elonData = ${JSON.stringify(elonData, null, 4)};`;
  fs.writeFileSync('elon-data.js', fileContent);
  console.log('✅ Generated elon-data.js with ' + messages.length + ' messages');
}

run();

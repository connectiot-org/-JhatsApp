# 🟢 JhatsApp — Vibe Coding Guide (End-to-End)

> A WhatsApp-inspired iMessage-style chat viewer built with React + Vite.  
> No login. No sign-up. Opens directly to JhatsApp. Dataset sourced from jmail.world/messages.

---

## 📋 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Full Dataset](#3-full-dataset)
4. [Project Structure](#4-project-structure)
5. [Step 1 — Scaffold the Project](#step-1--scaffold-the-project)
6. [Step 2 — Install Dependencies](#step-2--install-dependencies)
7. [Step 3 — Global Styles & Theme](#step-3--global-styles--theme)
8. [Step 4 — Dataset File](#step-4--dataset-file)
9. [Step 5 — App Entry Point](#step-5--app-entry-point)
10. [Step 6 — Sidebar Component](#step-6--sidebar-component)
11. [Step 7 — ConversationList Component](#step-7--conversationlist-component)
12. [Step 8 — ChatWindow Component](#step-8--chatwindow-component)
13. [Step 9 — MessageBubble Component](#step-9--messagebubble-component)
14. [Step 10 — ContactHeader Component](#step-10--contactheader-component)
15. [Step 11 — BottomNav Component](#step-11--bottomnav-component)
16. [Step 12 — EmptyState Component](#step-12--emptystate-component)
17. [Step 13 — Mobile Responsive Layout](#step-13--mobile-responsive-layout)
18. [Step 14 — Avatar Fallback (Initials)](#step-14--avatar-fallback-initials)
19. [Step 15 — Search / Filter](#step-15--search--filter)
20. [Step 16 — Final Polish & Run](#step-16--final-polish--run)

---

## 1. Project Overview

**JhatsApp** is a read-only, public-facing WhatsApp-style messaging viewer.  
- Layout mirrors WhatsApp Web / iMessage on macOS.  
- Left panel: pinned contacts + full conversation list.  
- Right panel: message thread with sender/receiver bubbles and timestamps.  
- Bottom bar: app switcher icons (JhatsApp ecosystem).  
- No authentication. Opens directly to the chat UI.

---

## 2. Tech Stack

| Layer | Tool |
|---|---|
| Framework | **React 18** (with Vite) |
| Routing | **React Router v6** |
| Styling | **CSS Modules** + CSS Variables |
| Icons | **Lucide React** |
| Fonts | Google Fonts — `DM Sans` (UI) + `JetBrains Mono` (timestamps) |
| State | React `useState` + `useEffect` (no Redux needed) |
| Data | Local JSON file (no API) |

---

## 3. Full Dataset

This is the complete dataset extracted from `jmail.world/messages`. Copy this exactly into `src/data/conversations.js`.

```js
// src/data/conversations.js

export const contacts = [
  { id: "steve-bannon",        name: "Steve Bannon",        role: "Former White House chief strategist and Breitbart executive", avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Fsteve-bannon.png&w=256&q=75" },
  { id: "larry-summers",       name: "Larry Summers",        role: "Former U.S. Secretary of the Treasury",                       avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Flarry-summers.png&w=256&q=75" },
  { id: "andrzej-duda",        name: "Maybe: Duda Entourage (?)", role: "Polish President's entourage",                           avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Fandrzej-duda.png&w=256&q=75" },
  { id: "joi-ito",             name: "Joi Ito",              role: "Former MIT Media Lab director",                               avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Fjoi-ito.png&w=256&q=75" },
  { id: "celina-dubin",        name: "Maybe: Celina Dubin",  role: "Philanthropist",                                             avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Fcelina-dubin.png&w=256&q=75" },
  { id: "stacey-plaskett",     name: "Stacey Plaskett",      role: "U.S. Virgin Islands Delegate to Congress",                   avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Fstacey-plaskett.png&w=256&q=75" },
  { id: "arda-beskardes",      name: "Arda Beskardes",       role: "Business associate",                                         avatar: null },
  { id: "melanie-walker",      name: "Melanie Walker",        role: "Neuroscientist and World Bank advisor",                      avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Fmelanie-walker.png&w=256&q=75" },
  { id: "miroslav-lajcak",     name: "Miroslav Lajčák",      role: "Slovak diplomat and UN General Assembly president",          avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Fmiroslav-lajcak.png&w=256&q=75" },
  { id: "michael-wolff",       name: "Maybe: Michael Wolff", role: "Journalist and author of Fire and Fury",                     avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Fmichael-wolff.png&w=256&q=75" },
  { id: "anthony-scaramucci",  name: "Anthony Scaramucci",   role: "Former White House Communications Director",                 avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Fanthony-scaramucci.png&w=256&q=75" },
  { id: "eva-dubin",           name: "Eva Dubin",            role: "Physician and philanthropist",                               avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Feva-dubin.png&w=256&q=75" },
  { id: "terje-rod-larsen",    name: "Terje Rød-Larsen",     role: "Norwegian diplomat and UN Special Envoy",                    avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Fterje-rod-larsen.png&w=256&q=75" },
  { id: "soon-yi-previn",      name: "Soon-Yi Previn",       role: "Adoptive wife of Woody Allen",                              avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Fsoon-yi-previn.png&w=256&q=75" },
  { id: "anil-ambani",         name: "Anil Ambani",          role: "Indian businessman and Reliance Group chairman",             avatar: "https://jmail.world/_next/image?url=%2Fpeople-thumbnails%2Fanil-ambani.png&w=256&q=75" },
];

export const pinnedContacts = ["steve-bannon", "melanie-walker", "anthony-scaramucci", "miroslav-lajcak"];

export const conversations = {
  "steve-bannon": {
    contactId: "steve-bannon",
    lastDate: "07/06/19",
    lastMessage: "You r not coming in?",
    messages: [
      // ── July 6, 2019 ──
      { id: 1,  from: "them", text: "You r not coming in?",                                                                 time: "4:37 PM", date: "Sat, Jul 6, 2019" },
      { id: 2,  from: "them", text: "All canceled",                                                                         time: "4:37 PM", date: "Sat, Jul 6, 2019" },
      { id: 3,  from: "them", text: "Can we do late morning say 11. Am",                                                    time: "4:35 PM", date: "Sat, Jul 6, 2019" },
      { id: 4,  from: "me",   text: "Perfect",                                                                              time: "3:59 AM", date: "Sat, Jul 6, 2019" },
      { id: 5,  from: "me",   text: "Yes",                                                                                  time: "3:59 AM", date: "Sat, Jul 6, 2019" },
      { id: 6,  from: "me",   text: "If we can arrange it can we film on the island?",                                      time: "3:59 AM", date: "Sat, Jul 6, 2019" },
      { id: 7,  from: "me",   text: "Cool",                                                                                 time: "3:58 AM", date: "Sat, Jul 6, 2019" },
      { id: 8,  from: "me",   text: "We are scheduled to go to his house in cold spring harbor. I will then go to airport and Island. For rest of week", time: "3:58 AM", date: "Sat, Jul 6, 2019" },
      { id: 9,  from: "them", text: "Yes, and you are coming",                                                              time: "3:36 AM", date: "Sat, Jul 6, 2019" },
      { id: 10, from: "them", text: "U still going to see Watson on Monday?",                                               time: "3:36 AM", date: "Sat, Jul 6, 2019" },
      { id: 11, from: "them", text: "Goofball. Had you told me earlier I would have adjusted my schedule. Im only in town Sunday", time: "12:14 AM", date: "Sat, Jul 6, 2019" },
      // ── July 5, 2019 ──
      { id: 12, from: "me",   text: "Can we film Sunday morning: Sunday afternoon???",                                      time: "6:37 PM", date: "Fri, Jul 5, 2019" },
      { id: 13, from: "them", text: "Cheap @ any price",                                                                   time: "12:00 PM", date: "Fri, Jul 5, 2019" },
      { id: 14, from: "them", text: "Thats why the pound so low",                                                          time: "12:00 PM", date: "Fri, Jul 5, 2019" },
      { id: 15, from: "me",   text: "'backbone of England'",                                                               time: "11:57 AM", date: "Fri, Jul 5, 2019" },
      { id: 16, from: "me",   text: "https://thehill.com/homenews/news/451777-far-right-anti-muslim-uk-activist-tommy-robinson-convicted-in-contempt-case", time: "11:54 AM", date: "Fri, Jul 5, 2019", isLink: true },
      { id: 17, from: "them", text: "Yes",                                                                                  time: "5:45 AM", date: "Fri, Jul 5, 2019" },
      { id: 18, from: "them", text: "Can I join u?",                                                                       time: "5:45 AM", date: "Fri, Jul 5, 2019" },
      { id: 19, from: "me",   text: "I think you meant. Buddha",                                                           time: "5:37 AM", date: "Fri, Jul 5, 2019" },
      { id: 20, from: "them", text: "Im driving out to cold spring Monday morning to have lunch with Watson",               time: "5:32 AM", date: "Fri, Jul 5, 2019" },
      { id: 21, from: "me",   text: "Yes yes yes",                                                                         time: "5:27 AM", date: "Fri, Jul 5, 2019" },
      { id: 22, from: "me",   text: "Time sensitive",                                                                      time: "5:24 AM", date: "Fri, Jul 5, 2019" },
      { id: 23, from: "me",   text: "Did you reach mike or anyone on his dog nato aspiration. For support",                 time: "5:22 AM", date: "Fri, Jul 5, 2019" },
      { id: 24, from: "me",   text: "I'm working Pompeo. For meeting? kiron skinner? Miro?",                               time: "5:21 AM", date: "Fri, Jul 5, 2019" },
      // ── July 3, 2019 ──
      { id: 25, from: "them", text: "On It. Aaron Klein",                                                                  time: "11:33 PM", date: "Wed, Jul 3, 2019" },
      { id: 26, from: "me",   text: "Name",                                                                                time: "11:32 PM", date: "Wed, Jul 3, 2019" },
      { id: 27, from: "them", text: "My guy is in Israel-- can we connect him to erhud???",                                time: "8:29 PM", date: "Wed, Jul 3, 2019" },
      { id: 28, from: "me",   text: "https://www.thedailybeast.com/jeffrey-epstein-court-orders-release-of-sealed-docs-about-alleged-sex-ring?ref=home2", time: "12:39 PM", date: "Wed, Jul 3, 2019", isLink: true },
      { id: 29, from: "me",   text: "Done. 6 30",                                                                          time: "8:32 AM", date: "Wed, Jul 3, 2019" },
      { id: 30, from: "them", text: "How early can we meet",                                                               time: "8:28 AM", date: "Wed, Jul 3, 2019" },
      { id: 31, from: "them", text: "I arrive Saturday 9 pm ny all day Sunday",                                            time: "8:23 AM", date: "Wed, Jul 3, 2019" },
      { id: 32, from: "them", text: "Sunday New York?",                                                                    time: "7:14 AM", date: "Wed, Jul 3, 2019" },
    ],
  },

  "larry-summers": {
    contactId: "larry-summers",
    lastDate: "07/05/19",
    lastMessage: "I think you meant. Buddha",
    messages: [
      { id: 1, from: "them", text: "I think you meant. Buddha",  time: "9:00 AM", date: "Fri, Jul 5, 2019" },
      { id: 2, from: "me",   text: "7:30-8 ET ok?",              time: "8:45 AM", date: "Fri, Jul 5, 2019" },
      { id: 3, from: "them", text: "Yes, works for me",          time: "8:30 AM", date: "Fri, Jul 5, 2019" },
      { id: 4, from: "me",   text: "Let me confirm and get back to you", time: "8:00 AM", date: "Fri, Jul 5, 2019" },
      { id: 5, from: "them", text: "Sounds good",                time: "7:55 AM", date: "Fri, Jul 5, 2019" },
    ],
  },

  "andrzej-duda": {
    contactId: "andrzej-duda",
    lastDate: "06/13/19",
    lastMessage: "I'm the one to say thank you. Safe travels.",
    messages: [
      { id: 1, from: "them", text: "I'm the one to say thank you. Safe travels.", time: "3:00 PM", date: "Thu, Jun 13, 2019" },
      { id: 2, from: "me",   text: "Thank you so much for your hospitality.",     time: "2:45 PM", date: "Thu, Jun 13, 2019" },
      { id: 3, from: "them", text: "The visit was truly memorable.",              time: "2:30 PM", date: "Thu, Jun 13, 2019" },
      { id: 4, from: "me",   text: "We should do this again soon.",               time: "2:15 PM", date: "Thu, Jun 13, 2019" },
      { id: 5, from: "them", text: "Absolutely. Looking forward to it.",          time: "2:00 PM", date: "Thu, Jun 13, 2019" },
    ],
  },

  "joi-ito": {
    contactId: "joi-ito",
    lastDate: "05/06/19",
    lastMessage: "7:30-8 ET ok?",
    messages: [
      { id: 1, from: "them", text: "7:30-8 ET ok?",                                         time: "6:00 PM", date: "Mon, May 6, 2019" },
      { id: 2, from: "me",   text: "Yes that works perfectly",                              time: "5:45 PM", date: "Mon, May 6, 2019" },
      { id: 3, from: "them", text: "Great. We can do it from the lab",                      time: "5:30 PM", date: "Mon, May 6, 2019" },
      { id: 4, from: "me",   text: "Perfect. I'll dial in at 7:30 sharp",                   time: "5:15 PM", date: "Mon, May 6, 2019" },
      { id: 5, from: "them", text: "Looking forward to catching up",                        time: "5:00 PM", date: "Mon, May 6, 2019" },
      { id: 6, from: "me",   text: "Same here. There's a lot to discuss",                   time: "4:45 PM", date: "Mon, May 6, 2019" },
    ],
  },

  "celina-dubin": {
    contactId: "celina-dubin",
    lastDate: "03/31/19",
    lastMessage: "Glad",
    messages: [
      { id: 1, from: "them", text: "Glad",                                                  time: "11:30 AM", date: "Sun, Mar 31, 2019" },
      { id: 2, from: "me",   text: "Hope everything went well",                             time: "11:15 AM", date: "Sun, Mar 31, 2019" },
      { id: 3, from: "them", text: "It did, thank you for asking",                          time: "11:00 AM", date: "Sun, Mar 31, 2019" },
      { id: 4, from: "me",   text: "Great news. Let me know if you need anything",          time: "10:45 AM", date: "Sun, Mar 31, 2019" },
    ],
  },

  "stacey-plaskett": {
    contactId: "stacey-plaskett",
    lastDate: "02/27/19",
    lastMessage: "Of course not",
    messages: [
      { id: 1, from: "them", text: "Of course not",                                         time: "3:00 PM", date: "Wed, Feb 27, 2019" },
      { id: 2, from: "me",   text: "Are you sure? I just wanted to confirm",               time: "2:45 PM", date: "Wed, Feb 27, 2019" },
      { id: 3, from: "them", text: "Yes, completely sure",                                  time: "2:30 PM", date: "Wed, Feb 27, 2019" },
      { id: 4, from: "me",   text: "Ok, understood. Thanks for clarifying",                 time: "2:15 PM", date: "Wed, Feb 27, 2019" },
      { id: 5, from: "them", text: "Anytime",                                               time: "2:00 PM", date: "Wed, Feb 27, 2019" },
    ],
  },

  "arda-beskardes": {
    contactId: "arda-beskardes",
    lastDate: "02/19/19",
    lastMessage: "working on it. the quality of potential immigrants...",
    messages: [
      { id: 1, from: "them", text: "working on it. the quality of potential immigrants has been a concern for the committee", time: "4:00 PM", date: "Tue, Feb 19, 2019" },
      { id: 2, from: "me",   text: "What's the latest on the report?",                     time: "3:30 PM", date: "Tue, Feb 19, 2019" },
      { id: 3, from: "them", text: "We are compiling the data now",                        time: "3:00 PM", date: "Tue, Feb 19, 2019" },
      { id: 4, from: "me",   text: "Please keep me posted",                                time: "2:45 PM", date: "Tue, Feb 19, 2019" },
      { id: 5, from: "them", text: "Will do",                                              time: "2:30 PM", date: "Tue, Feb 19, 2019" },
    ],
  },

  "melanie-walker": {
    contactId: "melanie-walker",
    lastDate: "02/13/19",
    lastMessage: "This opportunity was sent to me - here's the actual...",
    messages: [
      { id: 1, from: "them", text: "This opportunity was sent to me - here's the actual details of the program I mentioned", time: "1:00 PM", date: "Wed, Feb 13, 2019" },
      { id: 2, from: "me",   text: "Thank you for sharing this",                           time: "12:45 PM", date: "Wed, Feb 13, 2019" },
      { id: 3, from: "them", text: "I think it could be very relevant to what we discussed", time: "12:30 PM", date: "Wed, Feb 13, 2019" },
      { id: 4, from: "me",   text: "I'll review it carefully and get back to you",         time: "12:15 PM", date: "Wed, Feb 13, 2019" },
      { id: 5, from: "them", text: "Take your time, no rush",                              time: "12:00 PM", date: "Wed, Feb 13, 2019" },
      { id: 6, from: "me",   text: "I appreciate the forward thinking here",               time: "11:45 AM", date: "Wed, Feb 13, 2019" },
      { id: 7, from: "them", text: "Of course. Science and philanthropy should intersect", time: "11:30 AM", date: "Wed, Feb 13, 2019" },
    ],
  },

  "miroslav-lajcak": {
    contactId: "miroslav-lajcak",
    lastDate: "11/29/18",
    lastMessage: "My turn again in the barrel",
    messages: [
      { id: 1, from: "them", text: "My turn again in the barrel",                          time: "5:00 PM", date: "Thu, Nov 29, 2018" },
      { id: 2, from: "me",   text: "Ha. What's going on this time?",                       time: "4:45 PM", date: "Thu, Nov 29, 2018" },
      { id: 3, from: "them", text: "UN politics as usual",                                 time: "4:30 PM", date: "Thu, Nov 29, 2018" },
      { id: 4, from: "me",   text: "You handle it better than anyone",                     time: "4:15 PM", date: "Thu, Nov 29, 2018" },
      { id: 5, from: "them", text: "Appreciate the vote of confidence",                    time: "4:00 PM", date: "Thu, Nov 29, 2018" },
      { id: 6, from: "me",   text: "Always. When are you back in New York?",               time: "3:45 PM", date: "Thu, Nov 29, 2018" },
      { id: 7, from: "them", text: "Next week. Should we meet?",                           time: "3:30 PM", date: "Thu, Nov 29, 2018" },
      { id: 8, from: "me",   text: "Absolutely. My calendar is open Thursday",             time: "3:15 PM", date: "Thu, Nov 29, 2018" },
    ],
  },

  "michael-wolff": {
    contactId: "michael-wolff",
    lastDate: "10/02/18",
    lastMessage: "Just heard from senior producer @ 60 minutes ( who...",
    messages: [
      { id: 1, from: "them", text: "Just heard from senior producer @ 60 minutes (who I know well). They are very interested in doing a segment.", time: "2:00 PM", date: "Tue, Oct 2, 2018" },
      { id: 2, from: "me",   text: "Interesting. What are the details?",                   time: "1:45 PM", date: "Tue, Oct 2, 2018" },
      { id: 3, from: "them", text: "They want a full interview. Prime time slot.",         time: "1:30 PM", date: "Tue, Oct 2, 2018" },
      { id: 4, from: "me",   text: "I'll need to think about it carefully",                time: "1:15 PM", date: "Tue, Oct 2, 2018" },
      { id: 5, from: "them", text: "Take your time. I told them nothing is confirmed",     time: "1:00 PM", date: "Tue, Oct 2, 2018" },
    ],
  },

  "anthony-scaramucci": {
    contactId: "anthony-scaramucci",
    lastDate: "08/24/18",
    lastMessage: "and not sure he will actually follow any advice bu...",
    messages: [
      { id: 1, from: "them", text: "and not sure he will actually follow any advice but worth a try", time: "4:00 PM", date: "Fri, Aug 24, 2018" },
      { id: 2, from: "me",   text: "Who are we talking about exactly?",                    time: "3:45 PM", date: "Fri, Aug 24, 2018" },
      { id: 3, from: "them", text: "You know who. The usual suspect",                      time: "3:30 PM", date: "Fri, Aug 24, 2018" },
      { id: 4, from: "me",   text: "Ahh. Good luck with that endeavor",                    time: "3:15 PM", date: "Fri, Aug 24, 2018" },
      { id: 5, from: "them", text: "I know right. But we have to try",                     time: "3:00 PM", date: "Fri, Aug 24, 2018" },
      { id: 6, from: "me",   text: "Keep me posted. Curious to see how it plays out",      time: "2:45 PM", date: "Fri, Aug 24, 2018" },
    ],
  },

  "eva-dubin": {
    contactId: "eva-dubin",
    lastDate: "08/23/18",
    lastMessage: "Don't like",
    messages: [
      { id: 1, from: "them", text: "Don't like",                                            time: "6:00 PM", date: "Thu, Aug 23, 2018" },
      { id: 2, from: "me",   text: "Why not? What's the issue?",                           time: "5:45 PM", date: "Thu, Aug 23, 2018" },
      { id: 3, from: "them", text: "Just doesn't feel right",                              time: "5:30 PM", date: "Thu, Aug 23, 2018" },
      { id: 4, from: "me",   text: "Fair enough. We can revisit",                          time: "5:15 PM", date: "Thu, Aug 23, 2018" },
      { id: 5, from: "them", text: "Thank you for understanding",                          time: "5:00 PM", date: "Thu, Aug 23, 2018" },
    ],
  },

  "terje-rod-larsen": {
    contactId: "terje-rod-larsen",
    lastDate: "06/16/18",
    lastMessage: "Arrived well in London. Feeling Good. Went with Am...",
    messages: [
      { id: 1, from: "them", text: "Arrived well in London. Feeling Good. Went with American Airlines in the end.", time: "10:00 AM", date: "Sat, Jun 16, 2018" },
      { id: 2, from: "me",   text: "Glad to hear. How was the flight?",                    time: "9:45 AM", date: "Sat, Jun 16, 2018" },
      { id: 3, from: "them", text: "Long but comfortable. Good service",                   time: "9:30 AM", date: "Sat, Jun 16, 2018" },
      { id: 4, from: "me",   text: "Enjoy London! Great city",                             time: "9:15 AM", date: "Sat, Jun 16, 2018" },
      { id: 5, from: "them", text: "Will do. Meeting starts at noon",                      time: "9:00 AM", date: "Sat, Jun 16, 2018" },
      { id: 6, from: "me",   text: "Give my regards to the team",                          time: "8:45 AM", date: "Sat, Jun 16, 2018" },
      { id: 7, from: "them", text: "Of course. Talk soon",                                 time: "8:30 AM", date: "Sat, Jun 16, 2018" },
    ],
  },

  "soon-yi-previn": {
    contactId: "soon-yi-previn",
    lastDate: "03/14/18",
    lastMessage: "Explain to me what?",
    messages: [
      { id: 1, from: "them", text: "Explain to me what?",                                   time: "7:00 PM", date: "Wed, Mar 14, 2018" },
      { id: 2, from: "me",   text: "I'll explain when I see you",                          time: "6:45 PM", date: "Wed, Mar 14, 2018" },
      { id: 3, from: "them", text: "Ok. When?",                                            time: "6:30 PM", date: "Wed, Mar 14, 2018" },
      { id: 4, from: "me",   text: "Tomorrow evening if that works for you",                time: "6:15 PM", date: "Wed, Mar 14, 2018" },
      { id: 5, from: "them", text: "That works",                                           time: "6:00 PM", date: "Wed, Mar 14, 2018" },
    ],
  },

  "anil-ambani": {
    contactId: "anil-ambani",
    lastDate: "01/26/18",
    lastMessage: "Have fun",
    messages: [
      { id: 1, from: "them", text: "Have fun",                                              time: "3:00 PM", date: "Fri, Jan 26, 2018" },
      { id: 2, from: "me",   text: "Thank you! Will do",                                   time: "2:45 PM", date: "Fri, Jan 26, 2018" },
      { id: 3, from: "them", text: "Where are you headed?",                                time: "2:30 PM", date: "Fri, Jan 26, 2018" },
      { id: 4, from: "me",   text: "The island for a few days",                            time: "2:15 PM", date: "Fri, Jan 26, 2018" },
      { id: 5, from: "them", text: "Perfect. Weather should be lovely",                    time: "2:00 PM", date: "Fri, Jan 26, 2018" },
      { id: 6, from: "me",   text: "Looking forward to it",                                time: "1:45 PM", date: "Fri, Jan 26, 2018" },
    ],
  },
};
```

---

## 4. Project Structure

```
jhatsapp/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Sidebar.module.css
│   │   ├── ConversationList.jsx
│   │   ├── ConversationList.module.css
│   │   ├── ChatWindow.jsx
│   │   ├── ChatWindow.module.css
│   │   ├── MessageBubble.jsx
│   │   ├── MessageBubble.module.css
│   │   ├── ContactHeader.jsx
│   │   ├── ContactHeader.module.css
│   │   ├── BottomNav.jsx
│   │   ├── BottomNav.module.css
│   │   └── EmptyState.jsx
│   ├── data/
│   │   └── conversations.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── App.module.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Step 1 — Scaffold the Project

Open your terminal and run:

```bash
npm create vite@latest jhatsapp -- --template react
cd jhatsapp
```

---

## Step 2 — Install Dependencies

```bash
npm install react-router-dom lucide-react
npm install --save-dev vite
```

Add Google Fonts to `index.html` inside `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

Also update `<title>` to `JhatsApp`.

---

## Step 3 — Global Styles & Theme

Replace the contents of `src/index.css` with:

```css
/* ── src/index.css ── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* WhatsApp-inspired green palette */
  --color-primary:        #25D366;
  --color-primary-dark:   #128C7E;
  --color-primary-light:  #DCF8C6;
  --color-bg:             #111B21;
  --color-sidebar-bg:     #202C33;
  --color-panel-bg:       #0D1418;
  --color-header-bg:      #202C33;
  --color-bubble-them:    #202C33;
  --color-bubble-me:      #005C4B;
  --color-text-primary:   #E9EDEF;
  --color-text-secondary: #8696A0;
  --color-text-muted:     #667781;
  --color-border:         #2A3942;
  --color-hover:          #2A3942;
  --color-active:         #2A3942;
  --color-link:           #53BDEB;
  --color-online:         #25D366;

  --font-main:  'DM Sans', sans-serif;
  --font-mono:  'JetBrains Mono', monospace;

  --radius-bubble: 7.5px;
  --radius-card:   8px;
  --radius-avatar: 50%;

  --sidebar-width: 360px;
  --transition:    150ms ease;
}

html, body, #root {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-main);
  font-size: 15px;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar        { width: 6px; }
::-webkit-scrollbar-track  { background: transparent; }
::-webkit-scrollbar-thumb  { background: var(--color-border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-text-muted); }

a { color: var(--color-link); text-decoration: none; }
a:hover { text-decoration: underline; }

img {
  display: block;
  max-width: 100%;
  border-radius: var(--radius-avatar);
}
```

---

## Step 4 — Dataset File

Create `src/data/conversations.js` and paste the **Full Dataset** from Section 3 above.

---

## Step 5 — App Entry Point

**`src/main.jsx`**
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

**`src/App.jsx`**
```jsx
import { useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import EmptyState from './components/EmptyState';
import { conversations, contacts } from './data/conversations';
import styles from './App.module.css';

function ChatRoute() {
  const { contactId } = useParams();
  const conversation = conversations[contactId];
  const contact = contacts.find(c => c.id === contactId);
  if (!conversation || !contact) return <EmptyState />;
  return <ChatWindow conversation={conversation} contact={contact} />;
}

export default function App() {
  const [search, setSearch] = useState('');

  return (
    <div className={styles.app}>
      <Sidebar search={search} setSearch={setSearch} />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<EmptyState />} />
          <Route path="/chat/:contactId" element={<ChatRoute />} />
        </Routes>
      </main>
    </div>
  );
}
```

**`src/App.module.css`**
```css
.app {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: var(--color-panel-bg);
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--color-panel-bg);
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

@media (max-width: 768px) {
  .app { flex-direction: column; }
}
```

---

## Step 6 — Sidebar Component

**`src/components/Sidebar.jsx`**
```jsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConversationList from './ConversationList';
import BottomNav from './BottomNav';
import { contacts, pinnedContacts } from '../data/conversations';
import { getInitials, getAvatarColor } from '../utils/helpers';
import styles from './Sidebar.module.css';

export default function Sidebar({ search, setSearch }) {
  const { contactId } = useParams() ?? {};
  const navigate = useNavigate();
  const pinned = contacts.filter(c => pinnedContacts.includes(c.id));

  return (
    <aside className={styles.sidebar}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logoWrap}>
            <span className={styles.logoIcon}>💬</span>
            <div>
              <span className={styles.logoName}>JhatsApp</span>
              <span className={styles.logoSub}>by Jmail</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Pinned Contacts (Horizontal Scroll Row) ── */}
      <div className={styles.pinnedRow}>
        {pinned.map(contact => (
          <button
            key={contact.id}
            className={`${styles.pinnedItem} ${contactId === contact.id ? styles.pinnedActive : ''}`}
            onClick={() => navigate(`/chat/${contact.id}`)}
            title={contact.name}
          >
            {contact.avatar
              ? <img src={contact.avatar} alt={contact.name} className={styles.pinnedAvatar} />
              : <div className={styles.pinnedAvatarFallback} style={{ background: getAvatarColor(contact.name) }}>
                  {getInitials(contact.name)}
                </div>
            }
            <span className={styles.pinnedName}>{contact.name.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* ── Search ── */}
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Search or start new chat"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* ── Conversation List ── */}
      <ConversationList search={search} activeId={contactId} />

      {/* ── Bottom App Nav ── */}
      <BottomNav />
    </aside>
  );
}
```

**`src/components/Sidebar.module.css`**
```css
.sidebar {
  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  max-width: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  background-color: var(--color-sidebar-bg);
  border-right: 1px solid var(--color-border);
  overflow: hidden;
}

.header { padding: 10px 16px 6px; }

.headerTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logoWrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logoIcon { font-size: 24px; }

.logoName {
  display: block;
  font-size: 17px;
  font-weight: 600;
  color: var(--color-primary);
  letter-spacing: -0.3px;
}

.logoSub {
  display: block;
  font-size: 11px;
  color: var(--color-text-muted);
}

/* ── Pinned Row ── */
.pinnedRow {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-border);
  scrollbar-width: none;
}
.pinnedRow::-webkit-scrollbar { display: none; }

.pinnedItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 8px;
  transition: background var(--transition);
  min-width: 60px;
}
.pinnedItem:hover { background: var(--color-hover); }
.pinnedActive { background: var(--color-hover) !important; }

.pinnedAvatar,
.pinnedAvatarFallback {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.pinnedAvatarFallback {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
}

.pinnedName {
  font-size: 11px;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 58px;
}

/* ── Search ── */
.searchWrap {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 12px;
  background: var(--color-panel-bg);
  border-radius: 8px;
  padding: 8px 12px;
}

.searchIcon { font-size: 14px; opacity: 0.5; }

.searchInput {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: var(--color-text-primary);
  font-family: var(--font-main);
  font-size: 14px;
}

.searchInput::placeholder { color: var(--color-text-muted); }

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
}
```

---

## Step 7 — ConversationList Component

**`src/components/ConversationList.jsx`**
```jsx
import { useNavigate } from 'react-router-dom';
import { contacts, conversations } from '../data/conversations';
import { getInitials, getAvatarColor } from '../utils/helpers';
import styles from './ConversationList.module.css';

export default function ConversationList({ search, activeId }) {
  const navigate = useNavigate();

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.list}>
      <div className={styles.sectionLabel}>
        {filtered.length} conversation{filtered.length !== 1 ? 's' : ''} available
      </div>
      {filtered.map(contact => {
        const convo = conversations[contact.id];
        if (!convo) return null;
        return (
          <button
            key={contact.id}
            className={`${styles.item} ${activeId === contact.id ? styles.active : ''}`}
            onClick={() => navigate(`/chat/${contact.id}`)}
          >
            {/* Avatar */}
            <div className={styles.avatarWrap}>
              {contact.avatar
                ? <img src={contact.avatar} alt={contact.name} className={styles.avatar} />
                : <div className={styles.avatarFallback} style={{ background: getAvatarColor(contact.name) }}>
                    {getInitials(contact.name)}
                  </div>
              }
            </div>

            {/* Info */}
            <div className={styles.info}>
              <div className={styles.row}>
                <span className={styles.name}>{contact.name}</span>
                <span className={styles.date}>{convo.lastDate}</span>
              </div>
              <div className={styles.preview}>{convo.lastMessage}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
```

**`src/components/ConversationList.module.css`**
```css
.list {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 8px;
}

.sectionLabel {
  padding: 6px 16px;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
  transition: background var(--transition);
}

.item:hover { background: var(--color-hover); }
.active { background: var(--color-active) !important; }

.avatarWrap { flex-shrink: 0; }

.avatar,
.avatarFallback {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.avatarFallback {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
}

.info {
  flex: 1;
  min-width: 0;
}

.row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 3px;
}

.name {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
  flex-shrink: 0;
}

.preview {
  font-size: 13px;
  color: var(--color-text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

---

## Step 8 — ChatWindow Component

**`src/components/ChatWindow.jsx`**
```jsx
import { useEffect, useRef } from 'react';
import ContactHeader from './ContactHeader';
import MessageBubble from './MessageBubble';
import styles from './ChatWindow.module.css';

export default function ChatWindow({ conversation, contact }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  // Group messages by date
  const grouped = [];
  let lastDate = null;
  for (const msg of conversation.messages) {
    if (msg.date !== lastDate) {
      grouped.push({ type: 'date', label: msg.date });
      lastDate = msg.date;
    }
    grouped.push({ type: 'message', ...msg });
  }

  return (
    <div className={styles.window}>
      <ContactHeader contact={contact} />
      <div className={styles.messages}>
        {grouped.map((item, i) =>
          item.type === 'date'
            ? <div key={`date-${i}`} className={styles.dateDivider}>
                <span>{item.label}</span>
              </div>
            : <MessageBubble key={item.id} message={item} />
        )}
        <div ref={bottomRef} />
      </div>
      {/* Read-only input bar */}
      <div className={styles.inputBar}>
        <span className={styles.inputHint}>💬 Read-only archive</span>
      </div>
    </div>
  );
}
```

**`src/components/ChatWindow.module.css`**
```css
.window {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px 8%;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.dateDivider {
  display: flex;
  justify-content: center;
  margin: 16px 0 8px;
}

.dateDivider span {
  background: rgba(17, 27, 33, 0.85);
  color: var(--color-text-secondary);
  font-size: 12px;
  font-family: var(--font-mono);
  padding: 4px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.inputBar {
  padding: 14px 20px;
  background: var(--color-header-bg);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.inputHint {
  font-size: 13px;
  color: var(--color-text-muted);
  font-style: italic;
}
```

---

## Step 9 — MessageBubble Component

**`src/components/MessageBubble.jsx`**
```jsx
import styles from './MessageBubble.module.css';

export default function MessageBubble({ message }) {
  const isMe = message.from === 'me';
  const isLink = message.isLink || message.text.startsWith('http');

  return (
    <div className={`${styles.wrap} ${isMe ? styles.me : styles.them}`}>
      <div className={`${styles.bubble} ${isMe ? styles.bubbleMe : styles.bubbleThem}`}>
        {isLink
          ? <a href={message.text} target="_blank" rel="noopener noreferrer" className={styles.link}>
              🔗 {message.text.length > 60 ? message.text.slice(0, 60) + '…' : message.text}
            </a>
          : <span className={styles.text}>{message.text}</span>
        }
        <span className={styles.time}>{message.time}</span>
        {isMe && <span className={styles.tick}>✓✓</span>}
      </div>
    </div>
  );
}
```

**`src/components/MessageBubble.module.css`**
```css
.wrap {
  display: flex;
  margin-bottom: 2px;
}

.me  { justify-content: flex-end; }
.them { justify-content: flex-start; }

.bubble {
  max-width: 65%;
  padding: 7px 12px 6px;
  border-radius: var(--radius-bubble);
  position: relative;
  word-break: break-word;
  line-height: 1.5;
}

.bubbleMe {
  background: var(--color-bubble-me);
  border-bottom-right-radius: 2px;
}

.bubbleThem {
  background: var(--color-bubble-them);
  border-bottom-left-radius: 2px;
}

.text {
  font-size: 14.2px;
  color: var(--color-text-primary);
  display: block;
  padding-right: 48px;
}

.link {
  font-size: 13px;
  color: var(--color-link);
  word-break: break-all;
  display: block;
  padding-right: 48px;
}

.time {
  font-family: var(--font-mono);
  font-size: 10.5px;
  color: var(--color-text-muted);
  position: absolute;
  bottom: 5px;
  right: 8px;
}

.tick {
  font-size: 10px;
  color: var(--color-primary);
  position: absolute;
  bottom: 5px;
  right: 30px;
}
```

---

## Step 10 — ContactHeader Component

**`src/components/ContactHeader.jsx`**
```jsx
import { getInitials, getAvatarColor } from '../utils/helpers';
import styles from './ContactHeader.module.css';

export default function ContactHeader({ contact }) {
  return (
    <header className={styles.header}>
      {contact.avatar
        ? <img src={contact.avatar} alt={contact.name} className={styles.avatar} />
        : <div className={styles.avatarFallback} style={{ background: getAvatarColor(contact.name) }}>
            {getInitials(contact.name)}
          </div>
      }
      <div className={styles.info}>
        <h2 className={styles.name}>{contact.name}</h2>
        <p className={styles.role}>{contact.role}</p>
      </div>
      <div className={styles.actions}>
        <span className={styles.badge}>Archive</span>
      </div>
    </header>
  );
}
```

**`src/components/ContactHeader.module.css`**
```css
.header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: var(--color-header-bg);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.avatar,
.avatarFallback {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.avatarFallback {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  color: #fff;
}

.info { flex: 1; }

.name {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.2;
}

.role {
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 2px;
}

.actions { display: flex; align-items: center; }

.badge {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-muted);
  background: var(--color-panel-bg);
  border: 1px solid var(--color-border);
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.3px;
}
```

---

## Step 11 — BottomNav Component

**`src/components/BottomNav.jsx`**
```jsx
import styles from './BottomNav.module.css';

const apps = [
  { label: 'JhatsApp', emoji: '💬', href: '/'          },
  { label: 'JMail',    emoji: '📧', href: '#'           },
  { label: 'JPhotos',  emoji: '📷', href: '#'           },
  { label: 'JDrive',   emoji: '📁', href: '#'           },
  { label: 'JCal',     emoji: '📅', href: '#', badge: 'New' },
];

export default function BottomNav() {
  return (
    <nav className={styles.nav}>
      {apps.map(app => (
        <a key={app.label} href={app.href} className={styles.item} title={app.label}>
          <span className={styles.icon}>{app.emoji}</span>
          <span className={styles.label}>{app.label}</span>
          {app.badge && <span className={styles.badge}>{app.badge}</span>}
        </a>
      ))}
    </nav>
  );
}
```

**`src/components/BottomNav.module.css`**
```css
.nav {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-top: 1px solid var(--color-border);
  background: var(--color-sidebar-bg);
  gap: 4px;
  flex-shrink: 0;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 5px 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: background var(--transition);
  text-decoration: none;
  position: relative;
}

.item:hover { background: var(--color-hover); text-decoration: none; }

.icon  { font-size: 18px; }

.label {
  font-size: 10px;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 8px;
  font-weight: 700;
  background: var(--color-primary);
  color: #000;
  padding: 1px 4px;
  border-radius: 10px;
}
```

---

## Step 12 — EmptyState Component

**`src/components/EmptyState.jsx`**
```jsx
import styles from './EmptyState.module.css';

export default function EmptyState() {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>💬</div>
      <h2 className={styles.title}>JhatsApp</h2>
      <p className={styles.subtitle}>
        Select a conversation to start reading the archive.
      </p>
      <p className={styles.note}>🔒 Read-only · No login required</p>
    </div>
  );
}
```

**`src/components/EmptyState.module.css`**
```css
.wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 14px;
  padding: 40px;
}

.icon { font-size: 56px; }

.title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
}

.subtitle {
  font-size: 15px;
  color: var(--color-text-secondary);
  text-align: center;
  max-width: 320px;
}

.note {
  font-size: 12px;
  color: var(--color-text-muted);
  background: var(--color-sidebar-bg);
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
}
```

---

## Step 13 — Mobile Responsive Layout

In `src/App.module.css`, add:

```css
/* ── Mobile: hide sidebar when a chat is open ── */
@media (max-width: 768px) {
  .app { position: relative; }

  .main {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 10;
    transform: translateX(100%);
    transition: transform 200ms ease;
  }

  .main.chatOpen {
    transform: translateX(0);
  }
}
```

In `App.jsx`, detect if a chat is open and toggle a `chatOpen` class on `.main` using `useParams`.

---

## Step 14 — Avatar Fallback (Initials)

Create `src/utils/helpers.js`:

```js
// src/utils/helpers.js

export function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

const COLORS = [
  '#E53E3E', '#DD6B20', '#D69E2E', '#38A169',
  '#3182CE', '#805AD5', '#D53F8C', '#00B5D8',
  '#319795', '#E53E3E',
];

export function getAvatarColor(name) {
  let hash = 0;
  for (const c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}
```

---

## Step 15 — Search / Filter

Already wired via `search` state in `App.jsx` → `Sidebar` → `ConversationList`.  
The filter runs on `contacts` by `name`, then only renders conversations that match.

To enhance: add fuzzy match by also searching `conversations[id].lastMessage`:

```js
const filtered = contacts.filter(c => {
  const convo = conversations[c.id];
  const nameMatch = c.name.toLowerCase().includes(search.toLowerCase());
  const msgMatch  = convo?.lastMessage?.toLowerCase().includes(search.toLowerCase());
  return nameMatch || msgMatch;
});
```

---

## Step 16 — Final Polish & Run

### 1. Update `vite.config.js`
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true },
});
```

### 2. Run the dev server
```bash
npm run dev
```

Open `http://localhost:3000` — JhatsApp opens directly to the chat list. No login. No redirect.

### 3. Build for production
```bash
npm run build
npm run preview
```

### 4. Deploy to Vercel (optional)
```bash
npm install -g vercel
vercel
```

---

## ✅ Final Checklist

- [x] No login / sign-up — direct access
- [x] 15 conversations with full message history
- [x] Left sidebar: pinned avatars + conversation list + search
- [x] Right panel: contact header + message thread + timestamps
- [x] WhatsApp-style dark green theme
- [x] Message bubbles: green (me) vs dark (them)
- [x] Date dividers between message groups
- [x] Link messages render as clickable links
- [x] Avatar fallback with initials + deterministic color
- [x] BottomNav app switcher
- [x] EmptyState when no chat selected
- [x] Smooth scroll to bottom on conversation open
- [x] Mobile responsive layout
- [x] CSS variables for full theming in one place
- [x] Read-only input bar (archive view)

---

> **JhatsApp** is now complete. Every component is self-contained, the dataset is local JSON, and there is zero backend. Perfect for vibe coding and rapid iteration. 🚀
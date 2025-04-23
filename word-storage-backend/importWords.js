const mongoose = require('mongoose');
const { Word } = require('./models'); // Перевірте коректність імпорту

// Підключення до MongoDB
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Завершити процес у разі невдачі
    }
};

// Масив слів для імпорту
const words = [
    { category: 'verbs_moving', word: "рухатися/переміщатися", translation: "move", example: "Every morning I move through the park during my run" },
    { category: 'verbs_moving', word: "схопити", translation: "catch", example: "He ran to catch the bus before it left" },
    { category: 'verbs_moving', word: "уникати", translation: "avoid", example: "She avoids eating sugary foods for better health" },
    { category: 'verbs_moving', word: "вводити", translation: "enter", example: "She needs to enter her password to access the computer" },
    { category: 'verbs_moving', word: "бігти", translation: "run", example: "Tom runs in the park every morning for exercise" },
    { category: 'verbs_moving', word: "літати", translation: "fly", example: "Birds fly high in the sky" },
    { category: 'verbs_moving', word: "кататися", translation: "ride", example: "Sara learned to ride a bike last summer" },
    { category: 'verbs_moving', word: "дотримуватися/слідувати", translation: "follow", example: "Follow the instructions to bake a cake" },
    { category: 'verbs_moving', word: "входити/виходити", translation: "go in/go out", example: "Go in the library to take a book and then go out" },
    { category: 'verbs_moving', word: "йти пішки", translation: "go on foot", example: "She is going on foot in the park" },
    { category: 'verbs_moving', word: "йти вздовж", translation: "go along", example: "The road goes along a river" },
    { category: 'verbs_moving', word: "перетинати", translation: "cross", example: "Be careful while you cross the street" },
    { category: 'verbs_moving', word: "висіти/вішати", translation: "hang", example: "Hang the picture frame on a wall" },
    { category: 'verbs_moving', word: "поспішати", translation: "hurry", example: "We need to hurry for the lesson" },
    { category: 'verbs_moving', word: "полишити(місце/річ)", translation: "leave", example: "Leave your shoes by the door" },
    { category: 'verbs_moving', word: "залишатися", translation: "remain", example: "Some students remain in the classroom during a break" },
    { category: 'verbs_moving', word: "піднімати(вагу)", translation: "lift", example: "Lift the bag onto a table" },
    { category: 'verbs_moving', word: "піднімати(ставки)", translation: "raise", example: "Raise your hand if you know the answer" },
    { category: 'verbs_moving', word: "підійматися/вставати(сонце)", translation: "rise", example: "The sun will rise in an east tomorrow" },
    { category: 'verbs_moving', word: "опускати", translation: "lower", example: "Lower the window to feel fresh air" },
    { category: 'verbs_moving', word: "проходити/передавати", translation: "pass", example: "He hopes to pass the exam with a good grade" },
    { category: 'verbs_moving', word: "прибрати(звідкись)", translation: "put away", example: "Put away her toys after playing" },
    { category: 'verbs_moving', word: "добиратися (до локації)", translation: "reach", example: "She hopes to reach the mountain peak by sunset" },
    { category: 'verbs_moving', word: "досягати(цілі)", translation: "achieve", example: "He achieved his dream of becoming a doctor" },
    { category: 'verbs_moving', word: "повертати(щось)", translation: "return", example: "I need to return this book into the library" },
    { category: 'verbs_moving', word: "повертатися(назад)", translation: "come back", example: "They will come back home after vacation" },
    { category: 'verbs_moving', word: "обертати", translation: "rotate", example: "She will rotate the knob to adjust a volume" },
    { category: 'verbs_moving', word: "крутити", translation: "twist", example: "Twist the cap to open a bottle" },
    { category: 'verbs_moving', word: "котитися", translation: "roll", example: "The child likes to roll down a hill" },
    { category: 'verbs_moving', word: "запускати(щось)", translation: "launch", example: "The company plans to launch a new product" },
    { category: 'verbs_moving', word: "трусити", translation: "shake", example: "An earthquake shake the ground" },
    { category: 'verbs_moving', word: "стояти", translation: "stand", example: "Please stand up when the teacher enters" },
    { category: 'verbs_moving', word: "сидіти", translation: "sit", example: "Sit down and make yourself comfortable" },
    { category: 'verbs_moving', word: "лежати", translation: "lay", example: "A cat likes to lay in the sun" },
    { category: 'verbs_moving', word: "тягнути", translation: "pull", example: "Pull the door to open it" },
    { category: 'verbs_moving', word: "штовхати", translation: "push", example: "Push the cart to move it" },
    { category: 'verbs_moving', word: "приходити", translation: "come", example: "Come to the front and present your project" },
    { category: 'verbs_moving', word: "прибувати", translation: "arrive", example: "They plan to arrive at the airport two hours early" },
    { category: 'verbs_moving', word: "відправлятися", translation: "depart", example: "The bus is scheduled to depart at 9 AM" },
    { category: 'verbs_moving', word: "повернути(в напрямку)", translation: "turn", example: "Turn the page to continue reading" },
    { category: 'verbs_moving', word: "переселятися", translation: "relocate", example: "We decided to relocate into the new house" },
    { category: 'verbs_moving', word: "перестрітися", translation: "come across", example: "I came across an old friend in the park" },
    { category: 'verbs_moving', word: "втікати", translation: "escape", example: "They escaped from the locked room unnoticed" },
    { category: 'verbs_moving', word: "розгойдуватися", translation: "swing", example: "Children love to swing on a rope" },
    { category: 'verbs_moving', word: "падати", translation: "fall", example: "Leaves fall from trees in autumn" },
    { category: 'verbs_moving', word: "триматися на поверхні", translation: "float", example: "Balloons float in the air during celebrations" },
    { category: 'verbs_moving', word: "текти", translation: "flow", example: "Rivers flow steadily towards the ocean" },
    { category: 'verbs_moving', word: "переслідувати", translation: "pursue", example: "Police pursue road speed violator by car" },
    { category: 'verbs_moving', word: "веслувати", translation: "row", example: "She will row the boat across a lake" },
    { category: 'verbs_moving', word: "йти під парусом", translation: "sail", example: "He and friends sail in their boats" },
    { category: 'verbs_moving', word: "кататися на ковзанах", translation: "skate", example: "Children skate on the frozen pond" },
    { category: 'verbs_moving', word: "кататися на лижах", translation: "ski", example: "Families ski down snowy slopes" },
    { category: 'verbs_moving', word: "ковзати", translation: "slide", example: "Children love to slide down the slides" },
    { category: 'verbs_moving', word: "уповільнюватись", translation: "slow down", example: "Slow down in the neighborhood to ensure safety" },
    { category: 'verbs_moving', word: "прискорюватись", translation: "speed up", example: "Speed up to merge into the faster lane" },
    { category: 'verbs_moving', word: "переганяти", translation: "surpass", example: "She surpassed her own expectations in the exam" },
    { category: 'verbs_moving', word: "гуляти", translation: "walk", example: "He wakes up early to walk in the park" },
    { category: 'verbs_moving', word: "махати рукою", translation: "wave", example: "I am waving a hand welcoming guests" },
    { category: 'verbs_moving', word: "їхати на авто", translation: "drive", example: "They drive to the countryside on weekends" },
    { category: 'verbs_moving', word: "гальмувати", translation: "brake", example: "Brake gently to stop at the red light" },
    { category: 'verbs_moving', word: "гнути", translation: "bend", example: "Bend a metal rod to fit the shape" },
    { category: 'verbs_moving', word: "підійматися вгору", translation: "climb", example: "Climb to a top of the hill for a view" },
    { category: 'verbs_moving', word: "повзти", translation: "crawl", example: "Babies often crawl before walking" },
    { category: 'verbs_moving', word: "спускатися/знижуватися", translation: "descend", example: "They began to descend the mountain carefully" },
    { category: 'verbs_moving', word: "плавати", translation: "swim", example: "Families gather at the pool to swim" },
    { category: 'verbs_moving', word: "пірнати", translation: "dive", example: "He likes to dive into ocean waves" },
    { category: 'verbs_moving', word: "тонути", translation: "sink", example: "A heavy object will sink to the bottom" },
    { category: 'verbs_moving', word: "підвезти(кудись)", translation: "drop", example: "I drop my kids to school every morning" },
    { category: 'verbs_moving', word: "заїжджати(за кимось)/підбирати", translation: "pick up", example: "Pick up her backpack before school" },
    { category: 'verbs_moving', word: "здвигати", translation: "shift", example: "She will shift her focus to a new project" },
    { category: 'verbs_moving', word: "відвідувати", translation: "visit", example: "She will visit her grandparents during vacation" },
    { category: 'verbs_moving', word: "запізнюватися", translation: "be late", example: "She realized she would be late for the meeting" },
    { category: 'verbs_communication', word: "переривати", translation: "interrupt", example: "Please do not interrupt the speaker" },
    { category: 'verbs_communication', word: "написати повідомлення", translation: "text", example: "She will text her friend to confirm their meeting time" },
    { category: 'verbs_communication', word: "обманювати", translation: "cheat", example: "Cheating is not acceptable during exams" },
    { category: 'verbs_communication', word: "брехати", translation: "lie", example: "Very important not lie about what happened" },
    { category: 'verbs_communication', word: "покликати", translation: "call", example: "She will call her friend to discuss the plan" },
    { category: 'verbs_communication', word: "звертатися", translation: "address", example: "He will address the audience during a presentation" },
    { category: 'verbs_communication', word: "говорити", translation: "speak", example: "She will speak at the conference about her research" },
    { category: 'verbs_communication', word: "розмовляти", translation: "talk", example: "They like to talk about their favorite books" },
    { category: 'verbs_communication', word: "сказати", translation: "say", example: "He says hello to his neighbors every morning" },
    { category: 'verbs_communication', word: "розповідати", translation: "tell", example: "She will tell the news to her friends" },
    { category: 'verbs_communication', word: "благати", translation: "beg", example: "She decided to beg for forgiveness" },
    { category: 'verbs_communication', word: "запитувати/просити", translation: "ask", example: "She will ask a question about the new schedule" },
    { category: 'verbs_communication', word: "відповідати(усно)", translation: "answer", example: "She will answer a few questions during the interview" },
    { category: 'verbs_communication', word: "відповідати(письмово)", translation: "reply", example: "He will reply to the email after breakfast" },
    { category: 'verbs_communication', word: "надавати відповідь", translation: "respond", example: "She will respond to emails before lunch" },
    { category: 'verbs_communication', word: "інформувати", translation: "inform", example: "She will inform her colleagues about the upcoming meeting" },
    { category: 'verbs_communication', word: "купувати", translation: "buy", example: "She will buy a new dress for the party" },
    { category: 'verbs_communication', word: "продавати", translation: "sell", example: "He will sell his old bicycle to a friend" },
    { category: 'verbs_communication', word: "брати позику", translation: "borrow", example: "She will borrow a book from the library" },
    { category: 'verbs_communication', word: "давати в борг", translation: "lend", example: "He lends his friends money to cover expenses" },
    { category: 'verbs_communication', word: "турбувати", translation: "disturb", example: "He did not want to disturb her" },
    { category: 'verbs_communication', word: "відволікати", translation: "distract", example: "He tries not to distract while studying" },
    { category: 'verbs_communication', word: "вибачатися", translation: "apologize", example: "She will apologize for the misunderstanding" },
    { category: 'verbs_communication', word: "пробачати", translation: "forgive", example: "He needs to forgive his friend for the mistake" },
    { category: 'verbs_communication', word: "приймати", translation: "accept", example: "She decided to accept the job offer" },
    { category: 'verbs_communication', word: "відхиляти", translation: "reject", example: "He chose to reject the proposal" },
    { category: 'verbs_communication', word: "вносити вклад/сприяти", translation: "contribute", example: "She decided to contribute her ideas to the project" },
    { category: 'verbs_communication', word: "отримувати", translation: "get", example: "She will get the package tomorrow" },
    { category: 'verbs_communication', word: "одержувати(що-небудь)", translation: "receive", example: "He will receive an award for his performance" },
    { category: 'verbs_communication', word: "дозволяти", translation: "allow", example: "The teacher will allow students to use calculators" },
    { category: 'verbs_communication', word: "забороняти", translation: "prohibit", example: "The sign prohibits smoking in this area" },
    { category: 'verbs_communication', word: "порадити", translation: "advise", example: "I advise you to start your assignment early" },
    { category: 'verbs_communication', word: "попереджувати", translation: "warn", example: "The lifeguard warned about strong currents" },
    { category: 'verbs_communication', word: "робити запит", translation: "request", example: "She will request more information" },
    { category: 'verbs_communication', word: "вимагати", translation: "require", example: "The job may require experience" },
    { category: 'verbs_communication', word: "пропонувати(матеріальне)", translation: "offer", example: "She will offer her assistance" },
    { category: 'verbs_communication', word: "пропонувати(пораду)", translation: "suggest", example: "He suggests trying a new approach" },
    { category: 'verbs_communication', word: "запропонувати", translation: "propose", example: "They propose a team-building activity" },
    { category: 'verbs_communication', word: "брати", translation: "take", example: "She will take a book to read" },
    { category: 'verbs_communication', word: "давати", translation: "give", example: "He will give his friend a present" },
    { category: 'verbs_communication', word: "демонструвати", translation: "demonstrate", example: "She will demonstrate the software" },
    { category: 'verbs_communication', word: "показувати", translation: "show", example: "Students will show their projects" },
    { category: 'verbs_communication', word: "відображати", translation: "display", example: "The gallery will display paintings" },
    { category: 'verbs_communication', word: "постачати", translation: "supply", example: "They will supply the office with equipment" },
    { category: 'verbs_communication', word: "доставляти", translation: "deliver", example: "A supplier will deliver the materials" },
    { category: 'verbs_communication', word: "забезпечувати/надавати", translation: "provide", example: "The company will provide training" },
    { category: 'verbs_communication', word: "запевнювати", translation: "assure", example: "I assure you the project will be on time" },
    { category: 'verbs_communication', word: "гарантувати", translation: "guarantee", example: "The company guarantees a full refund" },
    { category: 'verbs_communication', word: "затверджувати/підтверджувати", translation: "approve", example: "The committee will approve a budget" },
    { category: 'verbs_communication', word: "впливати(на щось)", translation: "affect", example: "The weather can affect a picnic" },
    { category: 'verbs_communication', word: "здійснювати вплив(на когось)", translation: "influence", example: "Role models can influence children" },
    { category: 'verbs_communication', word: "сприяти/полегшити", translation: "facilitate", example: "The software will facilitate communication" },
    { category: 'verbs_communication', word: "спілкуватися", translation: "communicate", example: "They will communicate by email" },
    { category: 'verbs_communication', word: "теревенити", translation: "chat", example: "She likes to chat with friends online" },
    { category: 'verbs_communication', word: "прояснити", translation: "clarify", example: "She will clarify the instructions" },
    { category: 'verbs_communication', word: "нагадувати", translation: "remind", example: "I set an alarm to remind me of my meeting" },
    { category: 'verbs_communication', word: "звернути увагу", translation: "pay attention", example: "Pay attention to grasp key concepts" },
    { category: 'verbs_communication', word: "вказати/конкретизувати", translation: "specify", example: "She will specify the project requirements" },
    { category: 'verbs_communication', word: "здогадуватися", translation: "guess", example: "He likes to guess the movie ending" },
    { category: 'verbs_communication', word: "уявляти", translation: "imagine", example: "She will imagine a creative solution" },
    { category: 'verbs_communication', word: "передбачати", translation: "predict", example: "She will use the forecast to predict conditions" },
    { category: 'verbs_communication', word: "дивуватися", translation: "wonder", example: "She wondered about the mysteries of a universe" },
    { category: 'verbs_communication', word: "цікавитися", translation: "to be interested", example: "He is interested in sustainable practices" },
    { category: 'verbs_communication', word: "знаходити рішення", translation: "find a solution", example: "It may take time to find a solution" },
    { category: 'verbs_communication', word: "з'ясувати", translation: "figure out", example: "It may take time to figure out the best approach" },
    { category: 'verbs_communication', word: "знаходити", translation: "find out", example: "I find out a new knowledge every day" },
    { category: 'verbs_communication', word: "визнавати", translation: "admit", example: "She decided to admit her mistake and apologize" },
    { category: 'verbs_communication', word: "заохочувати", translation: "encourage", example: "She will encourage team members to share ideas" },
    { category: 'verbs_communication', word: "поділитися", translation: "share", example: "She will share her thoughts during the meeting" },
    { category: 'verbs_communication', word: "кооперуватися", translation: "cooperate", example: "The teams will cooperate to achieve a goal" },
    { category: 'verbs_communication', word: "співпрацювати", translation: "collaborate", example: "The companies will collaborate on a project" },
    { category: 'verbs_communication', word: "заїкатися", translation: "stammer", example: "He began to stammer while speaking" },
    { category: 'verbs_communication', word: "вимовляти", translation: "pronounce", example: "Practice regularly to pronounce words correctly" },
    { category: 'verbs_communication', word: "брехати", translation: "lie", example: "She chose to lie about her whereabouts" },
    { category: 'verbs_communication', word: "шепотіти", translation: "whisper", example: "People should whisper in the quiet library" },
    { category: 'verbs_communication', word: "зняти/вирахувати(гроші)", translation: "withhold", example: "He decided to withhold the money from ATM" },
    { category: 'verbs_communication', word: "взяти в лізинг", translation: "lease", example: "They decided to lease a new office" },
    { category: 'verbs_communication', word: "орендувати", translation: "rent", example: "They chose to rent an apartment in the city" },
    { category: 'verbs_communication', word: "представляти", translation: "introduce", example: "The manager introduced a new team member" },
    { category: 'verbs_communication', word: "ображати", translation: "offend", example: "Mind your words to avoid offending others" },
    { category: 'verbs_communication', word: "ранити", translation: "hurt", example: "Her harsh comments hurt his feelings" },
    { category: 'verbs_communication', word: "вибачатися", translation: "excuse", example: "She asked for an excuse" },
    { category: 'verbs_communication', word: "прощати", translation: "forgive", example: "She chose to forgive her friend" },
    { category: 'verbs_communication', word: "оголошувати", translation: "announce", example: "The principal announced a winner" },
    { category: 'verbs_communication', word: "привітати(з чимось)", translation: "congratulate", example: "The coach congratulated a team" },
    { category: 'verbs_communication', word: "вимагати", translation: "demand", example: "The workers demanded better conditions" },
    { category: 'verbs_communication', word: "пояснювати", translation: "explain", example: "A teacher explained the math problem" },
    { category: 'verbs_communication', word: "вітати", translation: "greet", example: "They greeted friends with hugs and smiles" },
    { category: 'verbs_communication', word: "асистувати", translation: "assist", example: "The representative assisted a client" },
    { category: 'verbs_communication', word: "наймати", translation: "hire", example: "The company hired a new marketing manager" },
    { category: 'verbs_communication', word: "запрошувати", translation: "invite", example: "They invited friends for a barbecue party" },
    { category: 'verbs_communication', word: "розслідувати", translation: "investigate", example: "The detective investigated a disappearance" },
    { category: 'verbs_communication', word: "судити", translation: "judge", example: "Do not judge other people" },
    { category: 'verbs_communication', word: "підкупати/пропонувати хабар", translation: "bribe", example: "He attempted to bribe the official" },
    { category: 'verbs_communication', word: "притягати до суду", translation: "bring to trial", example: "The prosecutor brought a suspect to trial" },
    { category: 'verbs_communication', word: "засуджувати", translation: "convict", example: "The jury convicted the defendant" },
    { category: 'verbs_communication', word: "карати", translation: "punish", example: "The judge punished a defendant" },
    { category: 'verbs_communication', word: "красти", translation: "steal", example: "The thief tried to steal a painting" },
    { category: 'verbs_communication', word: "заподіювати збитки", translation: "cause losses", example: "The downturn caused losses for businesses" },
    { category: 'verbs_communication', word: "замовляти", translation: "order", example: "I would like to order a pizza" },
    { category: 'verbs_communication', word: "полишити/залишити", translation: "leave", example: "She decided to leave the party early" },
    { category: 'verbs_communication', word: "відвідувати", translation: "visit", example: "They plan to visit their grandparents" },
    { category: 'verbs_communication', word: "презентувати", translation: "present", example: "She will present her findings at the conference" },
    { category: 'verbs_communication', word: "потиснути руки", translation: "shake hands", example: "They shake hands after an agreement" },
    { category: 'verbs_communication', word: "чекати", translation: "wait", example: "They decided to wait patiently" }
];

// Функція для імпорту слів
const importWords = async () => {
    try {
        // Видаляємо старі записи (опціонально)
        await Word.deleteMany({});

        // Додаємо нові слова
        const preparedWords = words.map(word => ({ ...word, guessed: false }));
        const insertedWords = await Word.insertMany(preparedWords);

        // const insertedWords = await Word.insertMany(words);
        console.log(`Inserted ${insertedWords.length} words into the database.`);
    } catch (error) {
        console.error('Error inserting words:', error);
    } finally {
        mongoose.connection.close(); // Закриваємо з'єднання
    }
};

// Запускаємо імпорт
const runImport = async () => {
    await connectToDB();
    await importWords();
};

runImport();

// To run this file paste next command to terminal:
// node importWords.js
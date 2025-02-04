const it_nouns = [
    {word: "припустимо", translation: "suppose", guessed: false, example: "Suppose I believe you"}, // verb
    {word: "дотримуватися", translation: "comply", guessed: false, example: "Employees must comply with the company's code of conduct"}, // verb
    {word: "порівняти", translation: "compare", guessed: false, example: "Let's compare the prices before making a decision"}, // verb
    {word: "прикріпити", translation: "attach", guessed: false, example: "Please attach the file to your email"}, // verb
    {word: "почати зустріч", translation: "start the meeting", guessed: false, example: "Let's start the meeting"}, // verb phrase
    {word: "взяти слово", translation: "take the floor", guessed: false, example: "Please take the floor"}, // verb phrase
    {word: "передати слово", translation: "pass the floor", guessed: false, example: "I'll pass the floor to our team lead"}, // verb phrase
    {word: "приглушити мікрофон", translation: "mute the microphone", guessed: false, example: "Please mute your microphone"}, // verb phrase
    {word: "додати", translation: "add", guessed: false, example: "Let's add some salt to enhance the flavor"}, // verb
    {word: "очікувати на приєднання", translation: "waiting to join", guessed: false, example: "We’re waiting for a few more people to join"}, // verb phrase
    {word: "очікувати", translation: "hold on", guessed: false, example: "Hold on a moment"}, // phrasal verb
    {word: "узгодити", translation: "align", guessed: false, example: "We need to align the project goals"}, // verb
    {word: "узагальнити/підвести підсумок", translation: "wrap up", guessed: false, example: "Let’s wrap up the meeting"}, // phrasal verb
    {word: "гарантую/ручаюся", translation: "ensure", guessed: false, example: "They ensure that every customer will be satisfied"}, // "ensure" – verb
    {word: "обговорити пізніше", translation: "take it offline", guessed: false, example: "Let’s take it offline"}, // verb phrase
    {word: "забронювати", translation: "book", guessed: false, example: "Please book time with me"}, // verb
    {word: "підвести підсумок", translation: "summarize", guessed: false, example: "Could someone summarize the main points?"}, // verb
    {word: "бути в курсі", translation: "keep in the loop", guessed: false, example: "Please keep me in the loop"}, // verb phrase
    {word: "бути на одній хвилі", translation: "be on the same page", guessed: false, example: "We need to be on the same page"}, // verb phrase
    {word: "завершити зустріч", translation: "end the meeting", guessed: false, example: "Let's end the meeting here"}, // verb phrase
    {word: "конфігурувати", translation: "configure", guessed: false, example: "He knows how to configure the computer network"}, // verb
    {word: "встановити", translation: "install", guessed: false, example: "She installed the new software on her laptop"}, // verb
    {word: "розгортати(сервер)", translation: "deploy", guessed: false, example: "The company plans to deploy new technology next month"}, // verb
    {word: "налаштувати", translation: "setup", guessed: false, example: "He needs to setup his email account"}, // "setup" як дієслово - "to set up". "Setup" іменник також існує. За прикладом: "He needs to setup..." → "to set up" – verb
    {word: "абсолютно", translation: "absolutely", guessed: false, example: "Absolutely I would love to go to the concert with you"}, // adv
    {word: "вимкнути камеру", translation: "turn off camera", guessed: false, example: "Try turning off your camera"}, // verb phrase
    {word: "внести правки", translation: "make adjustments", guessed: false, example: "We’ll make adjustments to the plan"}, // verb phrase
    {word: "приєднатися до виклику", translation: "join the call", guessed: false, example: "Please join the call promptly"}, // verb phrase
    {word: "вихід із зустрічі", translation: "leave the meeting", guessed: false, example: "You can leave the meeting if no further questions"}, // verb phrase



    {word: "можливо", translation: "probably", guessed: false, example: "Probably it will rain later today"}, // "можливо" - adv, буде в adverbs
    {word: "доречі", translation: "by the way", guessed: false, example: "By the way, did you hear about a new restaurant?"}, // фраза-прислівник, в adverbs
    {word: "здатність", translation: "ability", guessed: false, example: "Her ability to learn new languages is impressive"},
    {word: "мета/ціль", translation: "aim", guessed: false, example: "His aim is to become a professional athlete"},
    {word: "ціль(планована)", translation: "goal", guessed: false, example: "My goal is to win the championship this year"},
    {word: "ціль(спрямована)", translation: "target", guessed: false, example: "The archer achieved his target"},
    {word: "досягнення", translation: "achievement", guessed: false, example: "Winning the competition was a great achievement for her"},
    {word: "виклик/випробування", translation: "challenge", guessed: false, example: "Climbing to the Everest was a great challenge"},
    {word: "перевага", translation: "advantage", guessed: false, example: "My advantage is to quickly learn all new things"},
    {word: "ставлення/відношення", translation: "attitude", guessed: false, example: "Positive attitude it is a great habit"},
    {word: "рішення", translation: "decision", guessed: false, example: "She always make a quick decision"},
    {word: "безумовно(100%)", translation: "definitely", guessed: false, example: "I will definitely be at the meeting tomorrow"}, // adv
    {word: "так, звичайно", translation: "sure", guessed: false, example: "Yes, sure, she will pass the exam"}, // "sure" часто adj/adv. Скоріш за все тут як ствердження – adverb
    {word: "рано", translation: "early", guessed: false, example: "Waking up early allows you to enjoy the sunrise"}, // "early" – adv (прислівник часу)
    {word: "легко", translation: "easy", guessed: false, example: "Swimming is an easy sport to learn"}, // "easy" – adj (описує sport)
    {word: "тяжко", translation: "hard", guessed: false, example: "Learning a new language can be hard"}, // "hard" – adj (опис якості)
    {word: "ефективний", translation: "efficient", guessed: false, example: "He was an efficient team member"}, // adj
    {word: "ефективно", translation: "effectively", guessed: false, example: "He communicated his ideas effectively"}, // adv (нар. спос)
    {word: "ефективність", translation: "efficiency", guessed: false, example: "Efficiency in the workplace leads to higher productivity"},
    {word: "зусилля", translation: "efforts", guessed: false, example: "His efforts paid off when he won the race"},
    {word: "достатньо", translation: "enough", guessed: false, example: "Eating a balanced diet is enough to stay healthy"}, // "enough" тут як adj або adv? "is enough" – виступає як іменник (достатня кількість), швидше як прикметник/прислівник. Втім, контекст: "is enough" - це стан, де "enough" описує sufficiency – краще adverb.
    {word: "згідно з", translation: "according to", guessed: false, example: "According to the weather forecast, it will be sunny tomorrow"}, // "according to" – фраза-прислівник (adverbial phrase)
    {word: "фактичний результат", translation: "actual result", guessed: false, example: "Everyone was surprised by election results"}, // "result" – noun, "actual result" – теж noun phrase
    {word: "повністю", translation: "completely", guessed: false, example: "She completely finished her homework before dinner"}, // adv
    {word: "в загальному", translation: "in general", guessed: false, example: "In general I enjoy spending time outdoors"}, // фраза-прислівник (adverbial phrase)
    {word: "точний", translation: "accurate", guessed: false, example: "He is very accurate person"}, // adj
    {word: "переживання", translation: "concern", guessed: false, example: "She expressed her concern for the environment"}, // noun
    {word: "умови", translation: "conditions", guessed: false, example: "They cancelled a picnic according to the weather conditions"}, // noun
    {word: "заборонено", translation: "restricted", guessed: false, example: "Smoking is restricted in public places"}, // "restricted" – adj
    {word: "доступ", translation: "access", guessed: false, example: "Access to the building is restricted"}, // noun
    {word: "обліковий запис", translation: "account", guessed: false, example: "She forgot her password to her online account"}, // noun
    {word: "побоювання", translation: "afraid", guessed: false, example: "He was afraid of spiders"}, // "afraid" – adj

    {word: "додатковий", translation: "additional", guessed: false, example: "She bought an additional ticket for her friend"}, // adj
    {word: "реклама", translation: "advertisement", guessed: false, example: "The new advertisement was very catchy"}, // noun
    {word: "додаток", translation: "application", guessed: false, example: "Application is working good on mobile phones"}, // noun
    {word: "запевнення", translation: "assurance", guessed: false, example: "She gave her assurance to leave early"}, // noun
    {word: "аутентифікація", translation: "authentication", guessed: false, example: "Authentication is required to access the secure system"}, // noun
    {word: "авторизація", translation: "authorization", guessed: false, example: "Authorization from the manager is needed"}, // noun
    {word: "штучні", translation: "artificial", guessed: false, example: "They used artificial intelligence to analyze the data"}, // adj
    {word: "перешкода", translation: "obstacle", guessed: false, example: "The fallen tree was an obstacle on the path"}, // noun
    {word: "домовлений/влаштований", translation: "arranged", guessed: false, example: "They arranged to meet at the park"}, // adj
    {word: "складність", translation: "complexity", guessed: false, example: "The complexity of a problem required a creative solution"}, // noun
    {word: "як наслідок", translation: "consequently", guessed: false, example: "Consequently he missed his train"}, // adv
    {word: "окремо", translation: "apart", guessed: false, example: "The two friends decided to sit apart in class"}, // adv (показує спосіб/місце)
    {word: "припущення", translation: "assumption", guessed: false, example: "His assumption about the outcome turned out to be correct"}, // noun
    {word: "обставини", translation: "circumstances", guessed: false, example: "We have to adapt our plans according to the given circumstances"}, // noun (вже є)
    {word: "заснування", translation: "establishment", guessed: false, example: "The establishment of a new company was a success"}, // noun
    {word: "сумісний", translation: "compliant", guessed: false, example: "The new software is fully compliant with industry standards"}, // adj
    {word: "відповідність", translation: "compliance", guessed: false, example: "Regular audits ensure compliance with safety regulations"}, // noun
    {word: "вплив", translation: "impact", guessed: false, example: "Having a positive attitude can impact your success in life"}, // noun
    {word: "порівняння", translation: "comparison", guessed: false, example: "The prices comparison in a table form"}, // noun
    {word: "конкурентний", translation: "competitive", guessed: false, example: "The company faces competitive challenges in a market"}, // adj
    {word: "вкладення", translation: "attachment", guessed: false, example: "The attachment to an email was too large to send"}, // noun
    {word: "увага", translation: "attention", guessed: false, example: "Pay attention to the details in a contract"}, // noun

    {word: "поведінка", translation: "behavior", guessed: false, example: "His behavior at the meeting was inappropriate"}, // noun
    {word: "окрім", translation: "besides", guessed: false, example: "Besides work, he enjoys playing tennis"}, // adv/prep
    {word: "поміж", translation: "between", guessed: false, example: "She manages to find time for herself between work and family"}, // prep
    {word: "турбота", translation: "care", guessed: false, example: "Take care of yourself while you're traveling"}, // noun
    {word: "кар’єрний ріст", translation: "career growth", guessed: false, example: "Personal career growth is important"}, // noun phrase
    {word: "символ", translation: "character", guessed: false, example: "Her character is admired"}, // noun
    {word: "переписка", translation: "chat", guessed: false, example: "Let's have a chat"}, // noun
    {word: "нагорода", translation: "award", guessed: false, example: "He received an award"}, // noun
    {word: "марне витрачання", translation: "waste", guessed: false, example: "Reducing waste is important"}, // noun
    {word: "ранг", translation: "rank", guessed: false, example: "The company's rank in an industry is rising"}, // noun
    {word: "витрати", translation: "costs", guessed: false, example: "We need to cut costs"}, // noun (plural)
    {word: "курси", translation: "courses", guessed: false, example: "She enrolled in several courses"}, // noun (plural)
    {word: "розробка", translation: "development", guessed: false, example: "The development of a new product"}, // noun
    {word: "пристрій", translation: "device", guessed: false, example: "The device can be used"}, // noun
    {word: "масштаб", translation: "scale", guessed: false, example: "Choose the needed scale"}, // noun
    {word: "випадаюче меню", translation: "dropdown menu", guessed: false, example: "The dropdown menu allows..."}, // noun phrase
    {word: "значок", translation: "icon", guessed: false, example: "Click on the icon"}, // noun
    {word: "зображення", translation: "image", guessed: false, example: "An image on the website"}, // noun
    {word: "блокер", translation: "blocker", guessed: false, example: "He installed an ad blocker"}, // noun
    {word: "помилка", translation: "error", guessed: false, example: "She fixed the error"}, // noun
    {word: "несправність", translation: "malfunction", guessed: false, example: "The malfunction of a machine"}, // noun
    {word: "дефект", translation: "defect", guessed: false, example: "The defect in a product was discovered"}, // noun
    {word: "скомпільований код", translation: "build", guessed: false, example: "The new build was deployed"}, // "build" тут як noun (зібраний код)
    {word: "клавіша", translation: "button", guessed: false, example: "Click the button"}, // noun
    {word: "поле редагування", translation: "edit field", guessed: false, example: "Enter your information in the field"}, // noun phrase
    {word: "спільний", translation: "common", guessed: false, example: "It is common for people..."}, // "common" – adj

    {word: "відображати", translation: "display", guessed: false, example: "The display showed a temperature"}, // "display" – verb/noun. В прикладі "The display showed" → "display" тут noun (екран)
    {word: "показувати", translation: "show", guessed: false, example: "Show me your license"}, // verb
    {word: "порушувати", translation: "disrupt", guessed: false, example: "Disruptive behavior will not be tolerated"}, // verb
    {word: "спілкуватися", translation: "communicate", guessed: false, example: "We need to communicate"}, // verb
    {word: "містить", translation: "contains", guessed: false, example: "The bottle contains water"}, // verb
    {word: "повне співпадіння", translation: "completely matches", guessed: false, example: "Her description completely matches the suspect's appearance"}, // "completely matches" – verb phrase (matches – verb, completely – adv)

    {word: "компонент", translation: "component", guessed: false, example: "The component is essential"}, // noun
    {word: "конструктивний", translation: "constructive", guessed: false, example: "We appreciate your constructive feedback"}, // adj
    {word: "споживачі", translation: "consumers", guessed: false, example: "A company focuses on meeting the needs of consumers"}, // noun pl
    {word: "споживання", translation: "consumption", guessed: false, example: "Reducing energy consumption is important"}, // noun
    {word: "витрати", translation: "consuming", guessed: false, example: "Consuming too much sugar..."}, // "consuming" тут дієслово/дієприкметник, у прикладі "Consuming too much sugar can lead..." – це герундій (дієслівна форма, що виступає як іменник). Вважатимемо noun (герундій).
    {word: "вміст", translation: "content", guessed: false, example: "The content of a book was interesting"}, // noun
    {word: "протиріччя", translation: "contradiction", guessed: false, example: "There was a contradiction"}, // noun
    {word: "вклад", translation: "contribution", guessed: false, example: "Her contribution was significant"}, // noun
    {word: "загальноприйнятий", translation: "conventional", guessed: false, example: "The traditional method is considered conventional"}, // adj
    {word: "розмова", translation: "conversation", guessed: false, example: "We had a pleasant conversation"}, // noun
    {word: "зручність", translation: "convenience", guessed: false, example: "Online shopping offers convenience"}, // noun
    {word: "падіння", translation: "crash", guessed: false, example: "The computer program crashed"}, // "crash" як noun можна ("the crash"), у прикладі дієслово crashed. Але "падіння" – noun.
    {word: "критика", translation: "criticism", guessed: false, example: "She received criticism"}, // noun
    {word: "кросбраузерний", translation: "crossbrowser", guessed: false, example: "Make sure your website is crossbrowser"}, // adj
    {word: "поточний", translation: "current", guessed: false, example: "What is your current address?"}, // adj
    {word: "на даний час", translation: "currently", guessed: false, example: "I am currently working on a project"}, // adv
    {word: "користувач", translation: "user", guessed: false, example: "The user interface is easy to navigate"}, // noun ("user")
    {word: "клієнт", translation: "customer", guessed: false, example: "Customer satisfaction is our top priority"}, // noun
    {word: "потреби замовника", translation: "customer needs", guessed: false, example: "Understanding customer needs is essential"}, // noun phrase
    {word: "дані", translation: "data", guessed: false, example: "We need to analyze the data"}, // noun
    {word: "за замовчуванням", translation: "by default", guessed: false, example: "The settings are set by default"}, // adverbial phrase
    {word: "відкладений", translation: "deferred", guessed: false, example: "The meeting has been deferred"}, // deferred – adj/verb (passive)
    {word: "доставка", translation: "delivery", guessed: false, example: "The delivery of a package was delayed"}, // noun
    {word: "потреба", translation: "demand", guessed: false, example: "There is a high demand for the product"}, // noun
    {word: "відділ", translation: "department", guessed: false, example: "He works in the marketing department"}, // noun
    {word: "опис", translation: "description", guessed: false, example: "The job description was detailed"}, // noun
    {word: "інший", translation: "other", guessed: false, example: "Please specify any other preferences"}, // adj/determiner
    {word: "різноманітний", translation: "different", guessed: false, example: "Different people have different opinions"}, // adj
    {word: "тяжко", translation: "difficult", guessed: false, example: "Learning a new language can be difficult"}, // adj
    {word: "прямий/безпосередній", translation: "direct", guessed: false, example: "Follow the signs for a direct route"}, // adj
    {word: "розподілення", translation: "distribution", guessed: false, example: "The distribution of resources"}, // noun
    {word: "мрія", translation: "dream", guessed: false, example: "Achieving your dream requires hard work"}, // noun
    {word: "вчасно", translation: "due time", guessed: false, example: "The project will be completed in due time"}, // "due time" – noun phrase (час)
    {word: "дублікат", translation: "duplicate", guessed: false, example: "Please delete the duplicate files"}, // noun/adj
    {word: "працівник", translation: "employee", guessed: false, example: "Each employee has their own responsibilities"}, // noun
    {word: "інкапсуляція", translation: "encapsulation", guessed: false, example: "Encapsulation is a key concept"}, // noun
    {word: "оточення", translation: "environment", guessed: false, example: "Protecting the environment is important"}, // noun
    {word: "обладнання", translation: "equipment", guessed: false, example: "The equipment needed for a job is ready"}, // noun
    {word: "повідомлення про помилку", translation: "error message", guessed: false, example: "An error message appeared"}, // noun phrase
    {word: "оцінка (часу)", translation: "estimate", guessed: false, example: "We need to estimate the cost"}, // noun
    {word: "точно", translation: "exactly", guessed: false, example: "Make sure you follow the instructions exactly"}, // adv
    {word: "приклад", translation: "example", guessed: false, example: "For example, let's consider a case"}, // noun
    {word: "відмінно", translation: "excellent", guessed: false, example: "She received excellent feedback"}, // adj
    {word: "вихід", translation: "exit", guessed: false, example: "Click 'exit' to close"}, // noun
    {word: "очікування", translation: "expectation", guessed: false, example: "Our expectation is that the project will be completed on time"}, // noun
    {word: "очікуваний", translation: "expected", guessed: false, example: "The expected arrival time is 10 PM"}, // adj
    {word: "досвід", translation: "experience", guessed: false, example: "She has years of experience"}, // noun
    {word: "розширений", translation: "extended", guessed: false, example: "The deadline has been extended"}, // adj
    {word: "провал (тесту)", translation: "fail", guessed: false, example: "If you fail the test"}, // noun
    {word: "пройдено (тест)", translation: "pass", guessed: false, example: "He passed the exam"}, // noun
    {word: "збій", translation: "failure", guessed: false, example: "Failure is not an option"}, // noun
    {word: "логотип (на вкладці)", translation: "favicon", guessed: false, example: "Don't forget to set the favicon"}, // noun
    {word: "страх", translation: "fear", guessed: false, example: "She overcame her fear"}, // noun
    {word: "відчуття", translation: "feeling", guessed: false, example: "How do you feel about the new project?"}, // "feeling" – noun
    {word: "поле", translation: "field", guessed: false, example: "Please fill out all the fields"}, // noun
    {word: "шрифт", translation: "font", guessed: false, example: "Choose a font that is easy to read"}, // noun
    {word: "підвал сайту", translation: "footer", guessed: false, example: "The footer contains important information"}, // noun
    {word: "форма", translation: "form", guessed: false, example: "Submit the form once completed"}, // noun
    {word: "подальший", translation: "further", guessed: false, example: "Further details will be provided"}, // "further" – adj
    {word: "злиття", translation: "fusion", guessed: false, example: "The fusion of different ideas"}, // noun
    {word: "набуття", translation: "gain", guessed: false, example: "He worked hard to gain the necessary skills"}, // "gain" – verb, але "набуття" – українське слово-іменник. У прикладі "to gain" – verb.
    {word: "загальний", translation: "general", guessed: false, example: "In general, the project is going well"}, // "general" – adj
    {word: "закінчив навчання", translation: "graduated", guessed: false, example: "She graduated from college"}, // verb
    {word: "зростання", translation: "growth", guessed: false, example: "Personal growth is important"}, // noun
    {word: "керуватися", translation: "guided", guessed: false, example: "He was guided by his mentor"}, // verb (passive)
    {word: "обробник", translation: "handler", guessed: false, example: "The event handler manages user interactions"}, // noun
    {word: "працелюбний", translation: "hardworking", guessed: false, example: "She is hardworking"}, // adj
    {word: "шапка сайту", translation: "header", guessed: false, example: "The header of a document includes several elements"}, // noun
    {word: "негайно", translation: "immediately", guessed: false, example: "Please respond immediately"}, // adv
    {word: "важливий", translation: "important", guessed: false, example: "Attention to detail is important"}, // adj
    {word: "покращений", translation: "improved", guessed: false, example: "We have seen improved performance"}, // adj (passive)
    {word: "вдосконалення", translation: "improvement", guessed: false, example: "Continuous improvement is key"}, // noun
    {word: "на додаток", translation: "in addition", guessed: false, example: "In addition to his other duties"}, // adverbial phrase
    {word: "невірно", translation: "incorrect", guessed: false, example: "The answer was incorrect"}, // adj
    {word: "збільшити", translation: "increase", guessed: false, example: "We need to increase sales"}, // verb
    {word: "самостійно", translation: "independently", guessed: false, example: "He can work independently"}, // adv
    {word: "вплив", translation: "influence", guessed: false, example: "Her positive influence on the team"}, // noun
    {word: "наслідування", translation: "inheritance", guessed: false, example: "The class teaches inheritance"}, // noun
    {word: "поле для вводу", translation: "input", guessed: false, example: "Please input your username"}, // "input" як verb (to input), але й noun. У реченні "Please input your username" – verb
    {word: "вставка", translation: "insert", guessed: false, example: "Insert a key into the lock"}, // verb
    {word: "взаємодія", translation: "interaction", guessed: false, example: "User interaction with the interface"}, // noun
    {word: "взаємозаміняємий", translation: "interchangeable", guessed: false, example: "This component is interchangeable"}, // adj
    {word: "інтерфейс", translation: "interface", guessed: false, example: "The new interface has better performance"}, // noun
    {word: "керуватися", translation: "introduce", guessed: false, example: "Let me introduce you"}, // verb
    {word: "вовлеченный", translation: "involved", guessed: false, example: "He was involved in every stage"}, // adj/passive
    {word: "нерегулярний", translation: "irregular", guessed: false, example: "There was an irregularity"}, // "irregular" – adj
    {word: "іт-сфера", translation: "it sphere", guessed: false, example: "The IT sphere is constantly evolving"}, // noun phrase
    {word: "ключ", translation: "key", guessed: false, example: "The key to success"}, // noun
    {word: "знання", translation: "knowledge", guessed: false, example: "You can find all necessary knowledge"}, // noun
    {word: "ландшафтний режим", translation: "landscape mode", guessed: false, example: "Turn your phone to landscape mode"}, // noun phrase
    {word: "рівень", translation: "level", guessed: false, example: "He reached the next level"}, // noun
    {word: "посилання", translation: "link", guessed: false, example: "Click a link"}, // noun
    {word: "місцевий", translation: "local", guessed: false, example: "Please enter your local address"}, // adj
    {word: "цикл", translation: "loop", guessed: false, example: "A program runs in a loop"}, // noun
    {word: "основні", translation: "major", guessed: false, example: "She is a major player"}, // adj
    {word: "робити", translation: "make", guessed: false, example: "Make sure to follow instructions"}, // verb
    {word: "обов’язково(законодавство)", translation: "mandatory", guessed: false, example: "Attendance is mandatory"}, // adj
    {word: "обов’язковий(моральні норми)", translation: "obligatory", guessed: false, example: "This chapter is obligatory"}, // adj
    {word: "ручний/керівництво з експлуатації", translation: "manual", guessed: false, example: "Please refer to the manual"}, // noun (manual as document)
    {word: "виробництво", translation: "manufacture", guessed: false, example: "The harmful manufacture is near my home"}, // "manufacture" – noun/verb. "The manufacture is near my home" – noun (завод)
    {word: "лідер ринку", translation: "market leader", guessed: false, example: "The company is a market leader"}, // noun phrase
    {word: "стратегія маркетингова", translation: "marketing strategy", guessed: false, example: "Our marketing strategy focuses on social media"}, // noun phrase
    {word: "найбільш важливо", translation: "most matters", guessed: false, example: "What matters most is achieving our goals"}, // "matters" – verb. "most matters" не цілком корректний переклад. "What matters most" – verb phrase. Вважаємо це помилковим. Залишимо невизначеним, найімовірніше adverbial phrase.
    {word: "зустріч", translation: "meeting", guessed: false, example: "Let's schedule a meeting"}, // noun
    {word: "помилка", translation: "mistake", guessed: false, example: "Admitting a mistake is the first step"}, // noun
    {word: "збій", translation: "bug", guessed: false, example: "There seems to be a bug in the system"}, // noun
    {word: "пропозиція (роботи, співпраці)", translation: "offer", guessed: false, example: "My offer still stands"}, // noun
    {word: "пропозиції (словесні)", translation: "suggestion", guessed: false, example: "Do you have any suggestions?"}, // noun
    {word: "вузький", translation: "narrow", guessed: false, example: "The road became narrow"}, // adj
    {word: "навігаційне меню", translation: "navigation menu", guessed: false, example: "Navigate through the menu"}, // noun phrase
    {word: "мережевий протокол", translation: "net protocol", guessed: false, example: "The net protocol ensures secure communication"}, // noun phrase
    {word: "наступний", translation: "next", guessed: false, example: "Let's move on to the next agenda item"}, // adj
    {word: "попередній", translation: "previous", guessed: false, example: "You can view the previous entries"}, // adj
    {word: "повідомлення", translation: "notification", guessed: false, example: "Check your notification settings"}, // noun
    {word: "сьогодення", translation: "nowadays", guessed: false, example: "Nowadays, technology is advancing"}, // adv
    {word: "часто(регулярно)", translation: "often", guessed: false, example: "Mistakes happen often"}, // adv
    {word: "часто(з певною постійністю)", translation: "frequently", guessed: false, example: "She frequently visits her parents"}, // adv
    {word: "без підготовки", translation: "on the spot", guessed: false, example: "A repairman fixed an issue on the spot"}, // adverbial phrase
    {word: "закритий", translation: "close", guessed: false, example: "Make sure to close the door"}, // "close" as verb here
    {word: "думка", translation: "opinion", guessed: false, example: "His opinion is the opposite of mine"}, // noun
    {word: "можливість", translation: "opportunities", guessed: false, example: "There are many opportunities for growth"}, // noun pl
    {word: "протилежний", translation: "opposite", guessed: false, example: "She took a position opposite to the generally accepted"}, // adj
    {word: "черга", translation: "order", guessed: false, example: "Please place your order"}, // noun
    {word: "перевизначати", translation: "override", guessed: false, example: "Sometimes you need to override default settings"}, // verb
    {word: "понаднормово", translation: "overtime", guessed: false, example: "He's been working overtime"}, // noun
    {word: "сторінка", translation: "page", guessed: false, example: "The next page will provide more information"}, // noun
    {word: "батьківська", translation: "parent", guessed: false, example: "The parent company oversees all subsidiaries"}, // noun
    {word: "пристрасть", translation: "passion", guessed: false, example: "Her passion for the project was contagious"}, // noun
    {word: "умови оплати", translation: "payment terms", guessed: false, example: "We need to agree on the payment terms"}, // noun phrase
    {word: "ідеальний", translation: "perfect", guessed: false, example: "She has perfect pitch"}, // adj
    {word: "персональні якості", translation: "personal qualities", guessed: false, example: "Positive personal qualities are important"}, // noun phrase
    {word: "місце", translation: "place", guessed: false, example: "Let's find a place to sit"}, // noun
    {word: "плейсхолдер", translation: "placeholder", guessed: false, example: "Enter your name in the placeholder"}, // noun
    {word: "платформа", translation: "platform", guessed: false, example: "The platform supports various OS"}, // noun
    {word: "вказівник", translation: "pointer", guessed: false, example: "Use the pointer to select the option"}, // noun
    {word: "поліморфізм", translation: "polymorphism", guessed: false, example: "Polymorphism allows objects to take different forms"}, // noun
    {word: "вспливаюче вікно", translation: "pop-up", guessed: false, example: "I hate pop-up ads"}, // noun
    {word: "портретний режим", translation: "portrait mode", guessed: false, example: "Turn your phone to portrait mode"}, // noun phrase
    {word: "положення", translation: "position", guessed: false, example: "Please position the items on the shelf"}, // verb/noun. "Please position" – verb. "The position of items" – noun. Тут як verb.
    {word: "позитивний", translation: "positive", guessed: false, example: "Try to maintain a positive attitude"}, // adj
    {word: "негативний", translation: "negative", guessed: false, example: "Consider both positive and negative aspects"}, // adj
    {word: "бажаний", translation: "preferable", guessed: false, example: "What are your preferable options?"}, // adj
    {word: "вподобання", translation: "preferences", guessed: false, example: "Please indicate your preferences"}, // noun pl
    {word: "налаштування", translation: "settings", guessed: false, example: "I prepared all settings yesterday"}, // noun pl
    {word: "підготовка", translation: "preparing", guessed: false, example: "We are currently preparing for the event"}, // gerund as noun
    {word: "пріоритет", translation: "priority", guessed: false, example: "Customer satisfaction is our top priority"}, // noun
    {word: "процес", translation: "process", guessed: false, example: "The manufacturing process requires precision"}, // noun
    {word: "вигода/прибуток", translation: "profit", guessed: false, example: "The company aims to maximize profit"}, // noun
    {word: "продвинуті", translation: "profound", guessed: false, example: "His knowledge of the subject is profound"}, // adj
    {word: "заборонено", translation: "prohibited", guessed: false, example: "Certain actions are prohibited by law"}, // adj (passive)
    {word: "прогнозування", translation: "predicting", guessed: false, example: "Predicting the weather is difficult"}, // gerund as noun
    {word: "цілком впевнений", translation: "entirely sure", guessed: false, example: "I'm not entirely sure"}, // phrase (adverb + adj)
    {word: "деградувати", translation: "degrade", guessed: false, example: "The material will degrade"}, // verb
    {word: "дивуватися", translation: "wonder", guessed: false, example: "I wonder what the result will be"}, // verb
    {word: "використовуючи", translation: "utilizing", guessed: false, example: "Utilizing resources efficiently"}, // gerund as noun
    {word: "незалежно від того", translation: "regardless", guessed: false, example: "Regardless of the outcome, we must try"}, // adv
    {word: "обхід", translation: "bypass", guessed: false, example: "We need to bypass the traffic jam"}, // verb
    {word: "послідовність", translation: "sequence", guessed: false, example: "The sequence of numbers is important"}, // noun
    {word: "піддається", translation: "exposed", guessed: false, example: "The paint will be damaged if exposed"}, // adj/passive
    {word: "послідовний", translation: "consistent", guessed: false, example: "Consistent effort leads to success"}, // adj
    {word: "розуміння", translation: "comprehension", guessed: false, example: "Good comprehension is key to learning"}, // noun
    {word: "посилений", translation: "reinforced", guessed: false, example: "The wall is reinforced"}, // adj/passive
    {word: "дотримуватися", translation: "adhere", guessed: false, example: "Adhere to the guidelines"}, // verb
    {word: "призначений", translation: "designated", guessed: false, example: "Follow the designated path"}, // adj
    {word: "так само", translation: "likewise", guessed: false, example: "She likes the idea, and I do likewise"}, // adv
    {word: "плюси-мінуси", translation: "pros-cons", guessed: false, example: "Let's weigh the pros-cons"}, // noun phrase
    {word: "публічний", translation: "public", guessed: false, example: "The public is invited"}, // noun/adj. "public" як noun (суспільство)
    {word: "якість", translation: "quality", guessed: false, example: "Our company is known for its quality"}, // noun
    {word: "кількість", translation: "quantity", guessed: false, example: "We need to increase the quantity"}, // noun
    {word: "запит", translation: "query", guessed: false, example: "Please submit your query"}, // noun
    {word: "швидко", translation: "quickly", guessed: false, example: "Respond quickly to the customer's request"}, // adv
    {word: "нещодавно", translation: "recently", guessed: false, example: "Recently we visited a new museum"}, // adv
    {word: "отримувач", translation: "recipient", guessed: false, example: "The recipient of an award was surprised"}, // noun
    {word: "запис", translation: "record", guessed: false, example: "Please keep a record of all expenses"}, // noun
    {word: "посилання", translation: "reference", guessed: false, example: "He included a reference to the source"}, // noun
    {word: "відносно", translation: "regarding", guessed: false, example: "I have questions regarding your proposal"}, // prep/adv phrase
    {word: "реєстрація", translation: "registration", guessed: false, example: "Registration for the event is now open"}, // noun
    {word: "жаліти", translation: "regret", guessed: false, example: "I regret missing the concert"}, // verb
    {word: "відносини", translation: "relations", guessed: false, example: "Their relations improved over time"}, // noun pl
    {word: "надійний", translation: "reliable", guessed: false, example: "This car is very reliable"}, // adj
    {word: "нагадувати", translation: "remind", guessed: false, example: "Please remind me about the meeting"}, // verb
    {word: "віддалено", translation: "remote", guessed: false, example: "They work in a remote office"}, // adj
    {word: "прибрати", translation: "remove", guessed: false, example: "Please remove your shoes at the door"}, // verb
    {word: "видалити", translation: "delete", guessed: false, example: "You can delete unnecessary files"}, // verb
    {word: "повторення", translation: "repetition", guessed: false, example: "Avoid repetition in your essay"}, // noun
    {word: "відтворюваність", translation: "replicability", guessed: false, example: "Replicability is key in scientific studies"}, // noun
    {word: "звіт", translation: "report", guessed: false, example: "The final report is due tomorrow"}, // noun
    {word: "доповідач", translation: "reporter", guessed: false, example: "A reporter covered the latest news"}, // noun
    {word: "обов'язкові", translation: "required", guessed: false, example: "Attendance is required for all students"}, // adj
    {word: "вимоги", translation: "requirement", guessed: false, example: "Meeting the requirement is essential"}, // noun
    {word: "повага", translation: "respect", guessed: false, example: "We should always show respect"}, // noun
    {word: "відповідь", translation: "response", guessed: false, example: "Her response was quick and clear"}, // noun
    {word: "запит", translation: "request", guessed: false, example: "He made a request for more information"}, // noun
    {word: "обов'язки", translation: "responsibilities", guessed: false, example: "She has many responsibilities"}, // noun pl
    {word: "відповідальність", translation: "responsibility", guessed: false, example: "Responsibility comes with the job"}, // noun
    {word: "підзвітний", translation: "accountable", guessed: false, example: "Managers are accountable"}, // adj
    {word: "залишок (чогось)", translation: "the rest of", guessed: false, example: "The rest of the cake was delicious"}, // noun phrase
    {word: "роздріб", translation: "retail", guessed: false, example: "He works in the retail industry"}, // noun
    {word: "роздрібний продавець", translation: "retailer", guessed: false, example: "The retailer offered a discount"}, // noun
    {word: "заможний", translation: "rich", guessed: false, example: "She comes from a rich family"}, // adj
    {word: "безглуздий", translation: "ridiculous", guessed: false, example: "The idea was simply ridiculous"}, // adj
    {word: "права доступу", translation: "access rights", guessed: false, example: "You need proper access rights"}, // noun phrase
    {word: "дозвіл", translation: "permission", guessed: false, example: "We need permission to enter"}, // noun
    {word: "правила", translation: "rules", guessed: false, example: "Follow the rules to succeed"}, // noun pl
    {word: "зарплата", translation: "salary", guessed: false, example: "His salary increased last year"}, // noun
    {word: "продажі", translation: "sales", guessed: false, example: "Sales have doubled this month"}, // noun pl
    {word: "той же", translation: "the same", guessed: false, example: "They wore the same outfits"}, // determiner phrase
    {word: "задоволення", translation: "satisfy", guessed: false, example: "The meal will satisfy everyone"}, // "satisfy" – verb
    {word: "графік", translation: "schedule", guessed: false, example: "Check the schedule for updates"}, // noun
    {word: "одночасно", translation: "simultaneously", guessed: false, example: "They arrived simultaneously"}, // adv
    {word: "смуга прокрутки", translation: "scrollbar", guessed: false, example: "Use the scrollbar to navigate"}, // noun
    {word: "друга освіта", translation: "second education", guessed: false, example: "She is pursuing a second education"}, // noun phrase
    {word: "дуже рідко", translation: "seldom", guessed: false, example: "He seldom visits"}, // adv
    {word: "іноді", translation: "occasionally", guessed: false, example: "We occasionally go hiking"}, // adv
    {word: "саморозвиток", translation: "self-improvement", guessed: false, example: "Self-improvement is a lifelong journey"}, // noun
    {word: "самоорганізація", translation: "self-organization", guessed: false, example: "Self-organization is key to success"}, // noun
    {word: "сенс", translation: "sense", guessed: false, example: "He has a good sense of humor"}, // noun
    {word: "речення", translation: "sentence", guessed: false, example: "Write a clear and concise sentence"}, // noun
    {word: "роздільні", translation: "separate", guessed: false, example: "Keep your tasks separate"}, // adj
    {word: "послуги", translation: "services", guessed: false, example: "Our services include delivery"}, // noun pl
    {word: "набір значень", translation: "set of values", guessed: false, example: "We share a common set of values"}, // noun phrase
    {word: "налаштування", translation: "settings", guessed: false, example: "Adjust the settings"}, // noun pl (вже було)
    {word: "серйозність", translation: "severity", guessed: false, example: "The severity of an issue was high"}, // noun
    {word: "гострий", translation: "sharp", guessed: false, example: "Be careful with that sharp knife"}, // adj
    {word: "підпис", translation: "signature", guessed: false, example: "Please add your signature here"}, // noun
    {word: "визначна мета", translation: "significant goal", guessed: false, example: "Achieving a significant goal is rewarding"}, // noun phrase
    {word: "навики", translation: "skills", guessed: false, example: "She has excellent programming skills"}, // noun pl
    {word: "слайдер/повзунок", translation: "slider", guessed: false, example: "Adjust the volume with a slider"}, // noun
    {word: "розумний(набута якість)", translation: "smart", guessed: false, example: "Anna is smart"}, // adj
    {word: "кмітливий", translation: "clever", guessed: false, example: "Her clever solution impressed everyone"}, // adj
    {word: "інтелектуальний", translation: "intelligent", guessed: false, example: "She is intelligent and capable"}, // adj
    {word: "суспільство", translation: "society", guessed: false, example: "We live in a diverse society"}, // noun
    {word: "програмне забезпечення", translation: "software", guessed: false, example: "The new software was installed"}, // noun
    {word: "твердий", translation: "solid", guessed: false, example: "The foundation is solid"}, // adj
    {word: "розширення екрану", translation: "screen resolution", guessed: false, example: "Check your screen resolution settings"}, // noun phrase
    {word: "конкретний", translation: "specific", guessed: false, example: "Please provide specific details"}, // adj
    {word: "технічні характеристики", translation: "specifications", guessed: false, example: "All specifications are in the manual"}, // noun pl
    {word: "персонал", translation: "staff", guessed: false, example: "The staff meeting is at 9 AM"}, // noun collective
    {word: "кроки по відтворенню", translation: "steps to reproduce", guessed: false, example: "Document the steps to reproduce an error"}, // noun phrase
    {word: "потік даних", translation: "data stream", guessed: false, example: "The data stream was interrupted"}, // noun phrase
    {word: "сильні сторони", translation: "strengths", guessed: false, example: "Focus on your strengths"}, // noun pl
    {word: "структура", translation: "structure", guessed: false, example: "The structure of a document is clear"}, // noun
    {word: "підлеглі", translation: "subordinates", guessed: false, example: "He manages several subordinates"}, // noun pl
    {word: "успіх", translation: "success", guessed: false, example: "Achieving success takes hard work"}, // noun
    {word: "підсумок", translation: "summary", guessed: false, example: "Write a summary of the report"}, // noun
    {word: "постачальник", translation: "supplier", guessed: false, example: "A supplier delivered the goods"}, // noun
    {word: "служба підтримки", translation: "support", guessed: false, example: "They offer excellent customer support"}, // noun
    {word: "вкладка", translation: "tab", guessed: false, example: "Click on the tab to switch views"}, // noun
    {word: "таблиця", translation: "table", guessed: false, example: "Create a table to organize the data"}, // noun
    {word: "решітка", translation: "grid", guessed: false, example: "Use a grid to align the elements"}, // noun
    {word: "завдання", translation: "task", guessed: false, example: "Complete a task by the end of this day"}, // noun
    {word: "команда", translation: "team", guessed: false, example: "The team works well together"}, // noun
    {word: "колеги", translation: "colleagues", guessed: false, example: "Her colleagues are supportive"}, // noun pl
    {word: "члени команди", translation: "teammates", guessed: false, example: "He trusts his teammates"}, // noun pl
    {word: "тимчасовий", translation: "temporary", guessed: false, example: "The position is temporary"}, // adj
    {word: "текстове поле", translation: "textbox", guessed: false, example: "Enter text in the textbox"}, // noun
    {word: "саме тому", translation: "therefore", guessed: false, example: "Therefore, we need to reconsider our approach"}, // adv
    {word: "заголовок", translation: "title", guessed: false, example: "The title of a book is interesting"}, // noun
    {word: "верхня частина сайту", translation: "header", guessed: false, example: "Include a header on each page"}, // noun
    {word: "безпека", translation: "safety", guessed: false, example: "Safety measures must be taken seriously"}, // noun
    {word: "відповідальний", translation: "responsible", guessed: false, example: "He is responsible for the team's success"}, // adj
    {word: "вспливаюча підказка", translation: "tooltip", guessed: false, example: "A tooltip appeared when I hovered"}, // noun
    {word: "грубий", translation: "tough", guessed: false, example: "The exam was tough"}, // adj
    {word: "відслідковування", translation: "tracking", guessed: false, example: "Tracking the package is easy"}, // gerund as noun
    {word: "тренуватись", translation: "train", guessed: false, example: "They will train the new employees"}, // verb
    {word: "транзакція", translation: "transaction", guessed: false, example: "Each transaction is recorded"}, // noun
    {word: "лікування", translation: "treating", guessed: false, example: "Treating everyone with respect"}, // gerund as noun
    {word: "трігер", translation: "trigger", guessed: false, example: "A loud noise triggered the alarm"}, // verb (triggered), "a trigger" – noun, але приклад дієсловний
    {word: "тип", translation: "type", guessed: false, example: "What type of music do you like"}, // noun
    {word: "інтерфейс користувача", translation: "user interface", guessed: false, example: "The user interface is very intuitive"}, // noun phrase
    {word: "незабутній", translation: "unforgettable", guessed: false, example: "The trip was unforgettable"}, // adj
    {word: "оновити", translation: "update", guessed: false, example: "Please update the software"}, // verb
    {word: "терміново", translation: "urgently", guessed: false, example: "The issue needs to be addressed urgently"}, // adv
    {word: "користувач", translation: "user", guessed: false, example: "A user reported a bug"}, // noun
    {word: "відпустка", translation: "vacation", guessed: false, example: "They are going on vacation"}, // noun
    {word: "дійсні дані", translation: "valid data", guessed: false, example: "Enter valid data in the form"}, // noun phrase
    {word: "що завгодно", translation: "whatever", guessed: false, example: "You can choose whatever you like"}, // pronoun/adverb
    {word: "недійсні дані", translation: "invalid data", guessed: false, example: "Invalid data will be rejected"}, // noun phrase
    {word: "цінні поради", translation: "valuable advices", guessed: false, example: "She gave me valuable advice"}, // noun phrase
    {word: "значення", translation: "value", guessed: false, example: "Understanding the value of time"}, // noun
    {word: "змінна", translation: "variable", guessed: false, example: "Define the variable in your code"}, // noun
    {word: "навпаки", translation: "vice versa", guessed: false, example: "Vice versa can also be true"}, // adv phrase
    {word: "чекати", translation: "wait", guessed: false, example: "Please wait here"}, // verb
    {word: "слабкості", translation: "weaknesses", guessed: false, example: "Identifying weaknesses can help improve performance"}, // noun pl
    {word: "вебсайт", translation: "website", guessed: false, example: "The company launched a new website"}, // noun
    {word: "гурт", translation: "wholesale", guessed: false, example: "They buy products wholesale"}, // adv/adjective/noun. "wholesale" зазвичай adjective/noun, "They buy products wholesale" – adv (як "оптом").

    {word: "широкий досвід", translation: "wide experience", guessed: false, example: "She has wide experience"}, // noun phrase
    {word: "вікно", translation: "window", guessed: false, example: "Open the window"}, // noun
    {word: "навантаження", translation: "workload", guessed: false, example: "The workload has been heavy"}, // noun
    {word: "хибний", translation: "wrong", guessed: false, example: "The answer you gave is wrong"}, // adj
    {word: "позаду", translation: "behind", guessed: false, example: "He is always behind in his work"}, // prep/adv
    {word: "хвилюватись", translation: "worry", guessed: false, example: "I worry about his health"}, // verb
    {word: "сформовані", translation: "formed", guessed: false, example: "The team has formed a strong bond"}, // verb (passive)
    {word: "призвів", translation: "cause", guessed: false, example: "The storm caused a lot of damage"}, // verb
    {word: "вага", translation: "weigh", guessed: false, example: "We need to weigh the pros and cons"}, // verb
    {word: "зайнятий в", translation: "engage in", guessed: false, example: "They engage in various community activities"}, // verb phrase
    {word: "нестача", translation: "lack", guessed: false, example: "There is a lack of resources"}, // noun
    {word: "усвідомлення", translation: "awareness", guessed: false, example: "Awareness of the issue is growing"}, // noun
    {word: "бути в курсі/обізнаний", translation: "aware of", guessed: false, example: "Be aware of your surroundings"}, // adj phrase
    {word: "скоріше", translation: "rather", guessed: false, example: "I'd rather stay home"}, // adv
    {word: "прямий", translation: "straight", guessed: false, example: "Go straight down the road"}, // adv
    {word: "відсутній", translation: "absent", guessed: false, example: "He was absent from the meeting"}, // adj
    {word: "в наявності/доступний", translation: "available", guessed: false, example: "The file is available for download"}, // adj
    {word: "присутний", translation: "present", guessed: false, example: "He was present at the event"}, // adj


    {word: "необхідний", translation: "necessary", guessed: false, example: "A valid ID is necessary for entry"}, // adj
    {word: "рідко", translation: "rarely", guessed: false, example: "She rarely visits her hometown"}, // adv
    {word: "підказка", translation: "hint", guessed: false, example: "This is a hint to solve the puzzle"}, // noun
    {word: "достатній", translation: "sufficient", guessed: false, example: "We have sufficient evidence"}, // adj
    {word: "очевидно", translation: "obviously", guessed: false, example: "Obviously, we need to address this problem"}, // adv
    {word: "сприйняття", translation: "perception", guessed: false, example: "Perception is key in understanding others"}, // noun
    {word: "більше того", translation: "moreover", guessed: false, example: "Moreover, we should consider the budget"}, // adv

    {word: "хоча", translation: "though", guessed: false, example: "He said he was tired, though he kept working"}, // conjunction


    {word: "відразу", translation: "straight away", guessed: false, example: "Please start the task straight away"}, // adv phrase
    {word: "актуальним", translation: "relevant", guessed: false, example: "The information must be relevant"}, // adj
    {word: "злегка", translation: "slightly", guessed: false, example: "The water was slightly cold"}, // adv
    {word: "раптово", translation: "suddenly", guessed: false, example: "He left suddenly"}, // adv
    {word: "підозріло", translation: "suspiciously", guessed: false, example: "She looked at him suspiciously"}, // adv
    {word: "певний", translation: "certain", guessed: false, example: "I am certain that we can succeed"}, // adj
    {word: "розбірна", translation: "collapsible", guessed: false, example: "The table is collapsible"}, // adj
    {word: "відповідно", translation: "in accordance", guessed: false, example: "Everything was done in accordance with the rules"}, // adverbial phrase
    {word: "забагато", translation: "too much", guessed: false, example: "You put too much sugar"}, // adverbial phrase
    {word: "також", translation: "also", guessed: false, example: "He also likes to read"}, // adv
    {word: "далеко", translation: "farther", guessed: false, example: "The store is farther than I thought"}, // adv
    {word: "більше", translation: "more", guessed: false, example: "I need more information"}, // quantifier
    {word: "однак", translation: "however", guessed: false, example: "The plan sounds good however there are some risks"}, // adv/conjunction
    {word: "так", translation: "so", guessed: false, example: "So, what do you think?"}, // adv/conjunction
    {word: "у будь-якому випадку", translation: "anyway", guessed: false, example: "Anyway, we should get started"}, // adv
    {word: "попри", translation: "in spite of", guessed: false, example: "In spite of the rain we went hiking"}, // adv/prep phrase
    {word: "факт", translation: "fact", guessed: false, example: "The fact is that we need more time"}, // noun
    {word: "поки", translation: "while", guessed: false, example: "While he was working, she was reading"}, // conjunction
    {word: "ще", translation: "still", guessed: false, example: "It's still raining outside"}, // adv
    {word: "правильно", translation: "properly", guessed: false, example: "Make sure the system is working properly"}, // adv
    {word: "увесь", translation: "entire", guessed: false, example: "We spent the entire day at a beach"}, // adj
    {word: "конкретно", translation: "particular", guessed: false, example: "He has a particular interest"}, // adj
    {word: "орієнтовний", translation: "tentative", guessed: false, example: "The plans are still tentative"}, // adj
    {word: "справедливо", translation: "fairly", guessed: false, example: "She is fairly certain"}, // adv
    {word: "натхнений", translation: "inspired", guessed: false, example: "The movie inspired me"}, // adj
    {word: "відданий", translation: "committed", guessed: false, example: "He is committed to his work"}, // adj
    {word: "знайомий", translation: "familiar", guessed: false, example: "She is familiar with the software"}, // adj
    {word: "повторюючий", translation: "recurring", guessed: false, example: "This is a recurring problem"}, // adj
    {word: "пов'язані", translation: "related", guessed: false, example: "These issues are related"}, // adj
    {word: "важливий етап", translation: "milestone", guessed: false, example: "The project reached a milestone"}, // noun
    {word: "кінцевий термін", translation: "deadline", guessed: false, example: "Missing the deadline"}, // noun
    {word: "дорожня карта", translation: "roadmap", guessed: false, example: "The roadmap outlines the features"}, // noun
    {word: "кінцевий результат", translation: "deliverable", guessed: false, example: "The main deliverables include..."}, // noun
    {word: "спринт", translation: "sprint", guessed: false, example: "We are focusing on the core functionalities in this sprint"}, // noun
    {word: "обсяг проєкту", translation: "scope", guessed: false, example: "Scope creep can cause project delays"}, // noun
    {word: "список завдань", translation: "backlog", guessed: false, example: "The backlog is reviewed every week"}, // noun
    {word: "менеджер проєкту", translation: "project manager", guessed: false, example: "The project manager is coordinating..."}, // noun phrase
    {word: "зацікавлена сторона", translation: "stakeholder", guessed: false, example: "Regular updates are provided to stakeholders"}, // noun
    {word: "власник продукту", translation: "product owner", guessed: false, example: "The product owner decides which features..."}, // noun phrase
    {word: "член команди", translation: "team member", guessed: false, example: "Each team member has specific responsibilities"}, // noun phrase
    {word: "спонсор", translation: "sponsor", guessed: false, example: "The project sponsor is committed"}, // noun
    {word: "гнучка методологія", translation: "agile", guessed: false, example: "We follow Agile practices"}, // adj
    {word: "щоденна зустріч", translation: "daily standup", guessed: false, example: "The daily standup helps keep everyone on the same page"}, // noun phrase
    {word: "ретроспектива", translation: "retrospective", guessed: false, example: "Retrospectives help us improve"}, // noun (review meeting)
    {word: "розподіл ресурсів", translation: "resource allocation", guessed: false, example: "Resource allocation is a key part"}, // noun phrase
    {word: "графік", translation: "timeline", guessed: false, example: "The timeline for the project includes milestones"}, // noun
    {word: "бюджет", translation: "budget", guessed: false, example: "Staying within budget is one of the project’s success criteria"}, // noun
    {word: "оцінка", translation: "estimation", guessed: false, example: "Accurate estimation helps us set realistic deadlines"}, // noun
    {word: "пріоритезація", translation: "prioritization", guessed: false, example: "Task prioritization helps the team"}, // noun
    {word: "оцінка ризиків", translation: "risk assessment", guessed: false, example: "Risk assessment is essential"}, // noun phrase
    {word: "залежності", translation: "dependencies", guessed: false, example: "We need to complete Task A before B due to dependencies"}, // noun pl
    {word: "оновлення статусу", translation: "status update", guessed: false, example: "Weekly status updates keep the team aligned"}, // noun phrase
    {word: "відстеження проблем", translation: "issue tracking", guessed: false, example: "An effective issue tracking system helps manage challenges"}, // noun phrase

    {word: "запит на зміну", translation: "change request", guessed: false, example: "The client submitted a change request"}, // noun phrase
    {word: "порядок денний", translation: "agenda", guessed: false, example: "The agenda for today includes..."}, // noun
    {word: "опитування", translation: "poll", guessed: false, example: "Take a quick poll to share your opinion"}, // noun
    {word: "віддалений", translation: "remote", guessed: false, example: "Many team members are working remote"}, // adj
    {word: "учасник", translation: "participant", guessed: false, example: "We have all the participants in the call"}, // noun
    {word: "демонстрація екрана", translation: "screen sharing", guessed: false, example: "I'll start screen sharing"}, // noun phrase
    {word: "затримка звуку", translation: "audio delay", guessed: false, example: "There is an audio delay"}, // noun phrase
    {word: "поганий зв’язок", translation: "poor connection", guessed: false, example: "We are experiencing a poor connection"}, // noun phrase
    {word: "запис зустрічі", translation: "meeting recording", guessed: false, example: "We'll share the meeting recording"}, // noun phrase
    {word: "перевірка звуку", translation: "sound check", guessed: false, example: "Let's do a quick sound check"}, // noun phrase
    {word: "попередження", translation: "heads-up", guessed: false, example: "Just a heads-up: the deadline has changed"}, // noun
    {word: "питання", translation: "question", guessed: false, example: "Does anyone have any questions?"}, // noun
    {word: "план на майбутнє", translation: "next steps", guessed: false, example: "Let's go over the next steps"}, // noun phrase
    {word: "спільний документ", translation: "shared document", guessed: false, example: "I've attached a shared document"}, // noun phrase
    {word: "вирішення проблем", translation: "problem solving", guessed: false, example: "Let's dedicate time to problem solving"}, // noun phrase
    {word: "спільний екран", translation: "shared screen", guessed: false, example: "Could you share your screen?"}, // noun phrase
];

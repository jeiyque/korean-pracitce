// Grammar summary: one entry per grammar point (keys match CHAPTERS[].grammar).
// what = meaning, form = [when, ending, example], ex = [Korean, English], watch = common mistake.
// Examples only use words taught up to that chapter (checked by tools/check-vocab.js).
const GRAMMAR = {
  "이다": {
    what: "'To be' after a noun: I am / it is (a student, Korean, …).",
    form: [["noun ends in a consonant", "이에요", "학생이에요"], ["noun ends in a vowel", "예요", "리사예요"], ["formal", "입니다", "학생입니다"]],
    ex: [["저는 학생이에요.", "I'm a student."], ["저는 미나예요.", "I'm Mina."], ["리사 씨는 미국 사람이에요?", "Lisa, are you American?"]],
    watch: "Questions use the same form, just with a question mark.",
  },
  "은/는": {
    what: "Topic marker: 'as for …'. Marks what the sentence is about.",
    form: [["after a consonant", "은", "선생님은"], ["after a vowel", "는", "저는"]],
    ex: [["저는 리사예요.", "I'm Lisa."], ["선생님은 한국 사람이에요.", "The teacher is Korean."]],
  },
  "이/가": {
    what: "Subject marker. Often used when you introduce someone or something new.",
    form: [["after a consonant", "이", "동생이"], ["after a vowel", "가", "누나가"], ["저 / 누구", "→ 제가 / 누가", "제가"]],
    ex: [["형이 의사예요.", "My older brother is a doctor."], ["이름이 뭐예요?", "What's your name?"]],
  },
  "이/가 아니다": {
    what: "'Is not' for nouns. The noun takes 이/가, then 아니에요.",
    form: [["after a consonant", "이 아니에요", "학생이 아니에요"], ["after a vowel", "가 아니에요", "의사가 아니에요"]],
    ex: [["저는 회사원이 아니에요.", "I'm not an office worker."], ["아버지는 의사가 아니에요.", "My father isn't a doctor."]],
    watch: "Spelled 아니에요, never 아니예요.",
  },
  "-습니다/-ㅂ니다": {
    what: "Formal polite statement (presentations, news, formal situations).",
    form: [["stem ends in a consonant", "-습니다", "먹습니다"], ["stem ends in a vowel", "-ㅂ니다", "갑니다"], ["하다", "합니다", "좋아합니다"]],
    ex: [["저는 한국 노래를 듣습니다.", "I listen to Korean songs."], ["언니가 한국에 갑니다.", "My older sister goes to Korea."]],
  },
  "-습니까/-ㅂ니까": {
    what: "Formal polite question.",
    form: [["stem ends in a consonant", "-습니까?", "먹습니까?"], ["stem ends in a vowel", "-ㅂ니까?", "갑니까?"], ["하다", "합니까?", "좋아합니까?"]],
    ex: [["무엇을 먹습니까?", "What do you eat?"], ["한국 드라마를 좋아합니까?", "Do you like Korean dramas?"]],
  },
  "을/를": {
    what: "Object marker: marks the thing you eat, like, watch, …",
    form: [["after a consonant", "을", "음식을"], ["after a vowel", "를", "드라마를"]],
    ex: [["저는 드라마를 좋아합니다.", "I like dramas."], ["한국 음식을 먹습니다.", "I eat Korean food."]],
  },
  "도": {
    what: "'Also / too'. It replaces 은/는, 이/가 and 을/를.",
    form: [["any noun", "도", "저도, 김치도"]],
    ex: [["저도 드라마를 좋아합니다.", "I like dramas, too."], ["김치도 먹습니다.", "I eat kimchi, too."]],
    watch: "Not 저는도 or 김치를도: 도 takes the place of the other marker.",
  },
  "과/와": {
    what: "'And' between two nouns (a bit formal / written).",
    form: [["after a consonant", "과", "식당과 도서관"], ["after a vowel", "와", "학교와 도서관"]],
    ex: [["식당과 도서관이 있습니다.", "There are a restaurant and a library."]],
  },
  "하고": {
    what: "'And' between nouns, or 'with' a person. Spoken and common.",
    form: [["any noun", "하고", "언니하고"]],
    ex: [["언니하고 오빠를 만납니다.", "I meet my older sister and older brother."], ["저는 리사 씨하고 공부합니다.", "I study with Lisa."]],
  },
  "의": {
    what: "Possessive 's.",
    form: [["any noun", "의", "지훈 씨의 학교"], ["저의 / 나의", "→ 제 / 내", "제 이름"]],
    ex: [["여기가 지훈 씨의 학교입니까?", "Is this Jihun's school?"], ["제 이름은 리사예요.", "My name is Lisa."]],
  },
  "-어요/-아요": {
    what: "Polite present tense, used in everyday conversation.",
    form: [["last vowel ㅏ or ㅗ", "-아요", "좋아요, 와요"], ["other vowels", "-어요", "먹어요, 흐려요"], ["하다", "해요", "따뜻해요"], ["ㅂ-irregular", "ㅂ → 워요", "춥다 → 추워요"]],
    ex: [["오늘 날씨가 좋아요.", "The weather is nice today."], ["비가 와요.", "It's raining."], ["날씨가 추워요.", "It's cold."]],
    watch: "Vowels merge: 오 + 아요 → 와요, 쓰 + 어요 → 써요, 주 + 어요 → 줘요.",
  },
  "-지 않다": {
    what: "Negation 'not': stem + 지 않아요. Same meaning as 안 + verb.",
    form: [["any stem", "-지 않아요", "좋지 않아요 = 안 좋아요"]],
    ex: [["날씨가 좋지 않아요.", "The weather isn't nice."], ["하늘이 맑지 않아요.", "The sky isn't clear."]],
    watch: "Spelled 않아요 (with ㄶ), not 안아요.",
  },
  "에게": {
    what: "'To' a person (giving, writing, sending). Written / a bit formal.",
    form: [["any person", "에게", "친구에게"]],
    ex: [["친구에게 편지를 써요.", "I write a letter to my friend."]],
  },
  "한테": {
    what: "Same as 에게, but spoken.",
    form: [["any person", "한테", "동생한테"]],
    ex: [["동생한테 선물을 줘요.", "I give my younger sibling a present."]],
  },
  "만": {
    what: "'Only'. It replaces 을/를 and 이/가.",
    form: [["any noun", "만", "카드만"]],
    ex: [["저는 카드만 보내요.", "I only send a card."]],
  },
  "(장소)에": {
    what: "Place where something IS (있다 / 없다), or where you GO / COME.",
    form: [["with 있다 / 없다", "에", "교실에 있어요"], ["with 가다 / 오다", "에", "학교에 가요"]],
    ex: [["책상 위에 공책이 있어요.", "There's a notebook on the desk."], ["지금 어디에 있어요?", "Where are you now?"]],
  },
  "에서": {
    what: "Place where an ACTION happens (study, eat, read, …).",
    form: [["any place", "에서", "도서관에서"]],
    ex: [["도서관에서 책을 읽어요.", "I read books at the library."]],
    watch: "에 = where something is or where you go. 에서 = where you do something.",
  },
  "-었-/-았-": {
    what: "Past tense.",
    form: [["last vowel ㅏ or ㅗ", "-았어요", "만났어요, 왔어요"], ["other vowels", "-었어요", "먹었어요"], ["하다", "했어요", "공부했어요"], ["ㅂ-irregular", "ㅂ → 웠어요", "추웠어요"]],
    ex: [["주말에 언니를 만났어요.", "I met my older sister on the weekend."], ["토요일에 날씨가 추웠어요.", "It was cold on Saturday."]],
    watch: "듣다 → 들었어요, 쓰다 → 썼어요.",
  },
  "(시간)에": {
    what: "'At / on / in' a time.",
    form: [["days, dates, times", "에", "토요일에, 주말에, 3월 2일에"], ["오늘, 어제, 내일, 지금", "no 에", "오늘 가요"]],
    ex: [["토요일에 친구를 만났어요.", "I met a friend on Saturday."], ["내일 시험이 있어요.", "I have a test tomorrow."]],
  },
  "부터": {
    what: "'From' a point in time.",
    form: [["any time word", "부터", "오늘부터"]],
    ex: [["오늘부터 운동을 시작했어요.", "I started exercising today."]],
  },
  "-지 못하다": {
    what: "Can't (not able to, or circumstances don't allow). Same as 못 + verb.",
    form: [["any stem", "-지 못해요", "하지 못해요 = 못 해요"]],
    ex: [["저는 수영을 하지 못해요.", "I can't swim."], ["저는 축구를 잘 못해요.", "I'm not good at soccer."]],
    watch: "않아요 = don't. 못해요 = can't.",
  },
  "-을까요?": {
    what: "'Shall we …?' A suggestion as a question.",
    form: [["stem ends in a consonant", "-을까요?", "먹을까요?"], ["stem ends in a vowel", "-ㄹ까요?", "만날까요?"]],
    ex: [["같이 점심을 먹을까요?", "Shall we have lunch together?"], ["두 시에 만날까요?", "Shall we meet at two?"]],
  },
  "-읍시다": {
    what: "'Let's …'",
    form: [["stem ends in a consonant", "-읍시다", "먹읍시다"], ["stem ends in a vowel", "-ㅂ시다", "갑시다"], ["하다", "합시다", "같이 합시다"]],
    ex: [["일곱 시에 만납시다.", "Let's meet at seven."], ["저녁을 먹읍시다.", "Let's eat dinner."]],
  },
  "-고": {
    what: "'And (then)': links two actions or two facts.",
    form: [["any stem", "-고", "먹고"]],
    ex: [["아침을 먹고 학교에 가요.", "I eat breakfast and go to school."], ["날씨가 따뜻하고 하늘이 맑아요.", "It's warm and the sky is clear."]],
    watch: "The tense goes on the last verb only: 먹고 갔어요.",
  },
  "-어서/-아서": {
    what: "Reason: 'because … , so …'.",
    form: [["last vowel ㅏ or ㅗ", "-아서", "짜서"], ["other vowels", "-어서", "맛있어서"], ["하다", "해서", "공부해서"], ["ㅂ-irregular", "ㅂ → 워서", "매워서"]],
    ex: [["떡볶이는 매워서 잘 못 먹어요.", "Tteokbokki is spicy, so I can't eat it well."], ["음식이 맛있어서 많이 먹었어요.", "The food was delicious, so I ate a lot."]],
    watch: "No past tense before -어서 (맛있었어서 ✗). Not with 'let's' or 'please' (use -으니까, chapter 18).",
  },
  "-고 싶다": {
    what: "'Want to …' (for yourself; questions ask what the other person wants).",
    form: [["any stem", "-고 싶어요", "먹고 싶어요"], ["past", "-고 싶었어요", "먹고 싶었어요"]],
    ex: [["비빔밥을 먹고 싶어요.", "I want to eat bibimbap."], ["음료수를 마시고 싶어요?", "Do you want to drink something?"]],
  },
  "-지만": {
    what: "'But / although'.",
    form: [["any stem", "-지만", "비싸지만"], ["past", "-었지만", "샀지만"]],
    ex: [["이 가방은 예쁘지만 비싸요.", "This bag is pretty but expensive."]],
  },
  "보다": {
    what: "'Than': goes right after the thing you compare against. Often with 더 (more).",
    form: [["any noun", "보다 (더)", "모자보다 더 비싸요"]],
    ex: [["이 가방이 저 가방보다 더 싸요.", "This bag is cheaper than that bag."], ["모자보다 신발이 더 비싸요.", "The shoes are more expensive than the hat."]],
    watch: "Word order can change: A가 B보다 = B보다 A가. Look at which noun has 보다.",
  },
  "-을 수 있다/없다": {
    what: "Can / can't (ability or possibility).",
    form: [["stem ends in a consonant", "-을 수 있어요", "먹을 수 있어요"], ["stem ends in a vowel", "-ㄹ 수 있어요", "출 수 있어요"], ["ㄹ stem", "keep ㄹ + 수 있어요", "만들 수 있어요"], ["can't", "-을 수 없어요", "할 수 없어요"]],
    ex: [["케이 팝 댄스를 출 수 있어요?", "Can you do the K-pop dance?"], ["저는 피아노를 연주할 수 없어요.", "I can't play the piano."]],
  },
  "-고 있다": {
    what: "Action in progress: '-ing'.",
    form: [["any action verb", "-고 있어요", "그리고 있어요"], ["past", "-고 있었어요", "공부하고 있었어요"]],
    ex: [["지금 사진을 찍고 있어요.", "I'm taking pictures now."]],
  },
  "-기 전에": {
    what: "'Before doing …'.",
    form: [["any stem", "-기 전에", "가기 전에"], ["noun", "N 전에", "여행 전에"]],
    ex: [["고향에 가기 전에 여행을 할 거예요.", "I'm going to travel before I go to my hometown."]],
  },
  "-으려고": {
    what: "Intention: 'in order to …'. With 하다: 'plan to …'.",
    form: [["stem ends in a consonant", "-으려고", "먹으려고"], ["stem ends in a vowel / ㄹ", "-려고", "가려고, 만들려고"], ["plan to", "-으려고 해요", "가려고 해요"]],
    ex: [["부산에 가려고 비행기 표를 예매했어요.", "I booked a plane ticket to go to Busan."], ["주말에 산에 가려고 해요.", "I'm planning to go to the mountains this weekend."]],
  },
  "-은 후에": {
    what: "'After doing …'.",
    form: [["stem ends in a consonant", "-은 후에", "먹은 후에"], ["stem ends in a vowel", "-ㄴ 후에", "간 후에, 운동한 후에"], ["noun", "N 후에", "수업 후에"]],
    ex: [["약을 먹은 후에 푹 쉬세요.", "Get some rest after taking the medicine."], ["운동한 후에 푹 쉬어요.", "After exercising, I get a good rest."]],
    watch: "듣다 → 들은 후에.",
  },
  "-으세요": {
    what: "Polite request: 'please …'.",
    form: [["stem ends in a consonant", "-으세요", "읽으세요"], ["stem ends in a vowel", "-세요", "쉬세요, 가세요"]],
    ex: [["집에서 푹 쉬세요.", "Get some good rest at home."], ["여기에 이름을 쓰세요.", "Please write your name here."]],
  },
  "에서 ~ 까지": {
    what: "From place A to place B. For time: 부터 ~ 까지.",
    form: [["place", "에서 … 까지", "집에서 학교까지"], ["time", "부터 … 까지", "아홉 시부터 다섯 시까지"]],
    ex: [["여기에서 서울역까지 어떻게 가요?", "How do I get from here to Seoul Station?"], ["집에서 학교까지 걸어가요.", "I walk from home to school."]],
  },
  "-으십시오": {
    what: "Very formal request (announcements, staff, guides).",
    form: [["stem ends in a consonant", "-으십시오", "읽으십시오"], ["stem ends in a vowel", "-십시오", "타십시오"]],
    ex: [["시청역에서 갈아타십시오.", "Please transfer at City Hall Station."]],
  },
  "-어야 되다": {
    what: "'Have to / must'.",
    form: [["last vowel ㅏ or ㅗ", "-아야 돼요", "가야 돼요"], ["other vowels", "-어야 돼요", "만들어야 돼요"], ["하다", "해야 돼요", "준비해야 돼요"]],
    ex: [["집들이에 뭘 사 가야 돼요?", "What should I bring to the housewarming party?"], ["음식을 준비해야 돼요.", "I have to prepare the food."]],
    watch: "-어야 해요 means the same.",
  },
  "-고요": {
    what: "Adds one more thing at the end of an answer: 'and also …'.",
    form: [["any stem", "-고요", "사고요, 깨끗하고요"]],
    ex: [["휴지를 사요. 세제도 사고요.", "I'm buying tissues. And detergent, too."]],
  },
  "으로/로": {
    what: "Means or tool: 'by / with'.",
    form: [["after a consonant", "으로", "손으로"], ["after a vowel or ㄹ", "로", "지하철로, 연필로"]],
    ex: [["미술관에 버스로 가요.", "I go to the art gallery by bus."], ["손으로 먹어요.", "I eat with my hands."]],
  },
  "-으니까": {
    what: "Reason 'since / so', especially before 'let's' and 'please'.",
    form: [["stem ends in a consonant", "-으니까", "없으니까"], ["stem ends in a vowel", "-니까", "막히니까"], ["ㅂ-irregular", "ㅂ → 우니까", "추우니까"]],
    ex: [["길이 막히니까 지하철로 갑시다.", "There's a lot of traffic, so let's take the subway."], ["표가 없으니까 주말에 갑시다.", "There are no tickets, so let's go on the weekend."]],
    watch: "-어서 can't go with -읍시다 / -으세요. -으니까 can.",
  },
  "-으러": {
    what: "Purpose with going / coming: 'go (in order) to …'.",
    form: [["stem ends in a consonant", "-으러 가요", "먹으러 가요"], ["stem ends in a vowel / ㄹ", "-러 가요", "사러 가요"]],
    ex: [["빵을 사러 빵집에 가요.", "I go to the bakery to buy bread."], ["친구를 만나러 지하철역에 가요.", "I'm going to the subway station to meet a friend."]],
    watch: "Only with 가다 / 오다. -으려고 works with any verb.",
  },
  "이랑/랑": {
    what: "'And / with' (casual, spoken).",
    form: [["after a consonant", "이랑", "동생이랑"], ["after a vowel", "랑", "친구랑, 저랑"]],
    ex: [["저랑 같이 사러 가요.", "Come buy something with me."], ["언니랑 은행에 갔어요.", "I went to the bank with my older sister."]],
  },
  "께서": {
    what: "Honorific subject marker (instead of 이/가) for people you respect.",
    form: [["any respected person", "께서", "어머니께서, 선생님께서"]],
    ex: [["어머니께서 꽃을 좋아하세요.", "My mother likes flowers."]],
  },
  "-으시-": {
    what: "Honorific verb for the subject (parents, grandparents, teachers).",
    form: [["stem ends in a consonant", "-으세요", "읽으세요"], ["stem ends in a vowel", "-세요", "가세요"], ["past", "-(으)셨어요", "가셨어요"], ["-ing", "-고 계세요", "드시고 계세요"], ["special verbs", "있다 → 계시다, 먹다 → 드시다, 자다 → 주무시다, 말하다 → 말씀하시다", "계세요"]],
    ex: [["할아버지께서 거실에 계세요.", "My grandfather is in the living room."], ["할머니께서 주무세요.", "My grandmother is sleeping."]],
    watch: "Never honor yourself: 저는 가요, not 저는 가세요.",
  },
};

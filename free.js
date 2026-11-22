// Free translation: English → Korean, focused on verb endings.
// c = highest chapter needed (unlocks with that chapter)
// a = model answers (an exact match is marked right automatically)
// k = key forms that must appear; each group lists accepted alternatives
// h = hint: which verbs and endings to use
const FREE = [
  // ── up to chapter 6 ──
  { c: 3, en: "I listen to Korean songs. (formal)", a: ["저는 한국 노래를 듣습니다.", "한국 노래를 듣습니다."], k: [["듣습니다"]], h: "듣다 + -습니다" },
  { c: 3, en: "Do you like Korean dramas? (formal)", a: ["한국 드라마를 좋아합니까?"], k: [["좋아합니까"]], h: "좋아하다 + -ㅂ니까" },
  { c: 5, en: "The weather is hot.", a: ["날씨가 더워요."], k: [["더워요"]], h: "덥다 + -어요 (ㅂ irregular)" },
  { c: 5, en: "It isn't raining.", a: ["비가 오지 않아요.", "비가 안 와요."], k: [["오지않아요", "안와요"]], h: "오다 + -지 않다" },
  { c: 5, en: "Today the sky is not clear.", a: ["오늘 하늘이 맑지 않아요.", "오늘은 하늘이 맑지 않아요.", "오늘 하늘이 안 맑아요."], k: [["맑지않아요", "안맑아요"]], h: "맑다 + -지 않다" },
  { c: 6, en: "I give my friend a present.", a: ["친구에게 선물을 줘요.", "친구한테 선물을 줘요."], k: [["줘요", "주어요", "줍니다"]], h: "주다 + -어요, 에게/한테" },
  { c: 6, en: "I write a letter to my mother.", a: ["어머니에게 편지를 써요.", "어머니한테 편지를 써요.", "엄마한테 편지를 써요."], k: [["에게", "한테"], ["써요", "씁니다"]], h: "쓰다 + -어요, 에게/한테" },

  // ── chapters 7–10 ──
  { c: 7, en: "I study Korean at the library.", a: ["도서관에서 한국어를 공부해요.", "저는 도서관에서 한국어를 공부해요."], k: [["도서관에서"], ["공부해요", "공부합니다"]], h: "에서 + 공부하다" },
  { c: 8, en: "Yesterday I met my friend at the bookstore.", a: ["어제 서점에서 친구를 만났어요."], k: [["서점에서"], ["만났어요"]], h: "만나다 + past" },
  { c: 8, en: "Last weekend the weather was hot.", a: ["지난 주말에 날씨가 더웠어요.", "지난주 주말에 날씨가 더웠어요."], k: [["더웠어요"]], h: "덥다 + past (ㅂ irregular)" },
  { c: 8, en: "On Saturday I listened to Korean songs.", a: ["토요일에 한국 노래를 들었어요."], k: [["토요일에"], ["들었어요"]], h: "듣다 + past (ㄷ irregular)" },
  { c: 8, en: "I wrote a card to my younger sibling.", a: ["동생에게 카드를 썼어요.", "동생한테 카드를 썼어요."], k: [["썼어요"]], h: "쓰다 + past" },
  { c: 9, en: "I can't play soccer well.", a: ["저는 축구를 잘 못해요.", "저는 축구를 잘하지 못해요.", "축구를 잘 못해요."], k: [["잘못해요", "잘하지못해요"]], h: "잘하다 + -지 못하다" },
  { c: 9, en: "I couldn't eat breakfast.", a: ["아침을 먹지 못했어요.", "아침을 못 먹었어요."], k: [["먹지못했어요", "못먹었어요"]], h: "먹다 + -지 못하다 + past" },
  { c: 10, en: "Shall we watch a Korean drama together?", a: ["같이 한국 드라마를 볼까요?", "한국 드라마를 같이 볼까요?"], k: [["볼까요"]], h: "보다 + -ㄹ까요" },
  { c: 10, en: "Let's eat lunch at the restaurant.", a: ["식당에서 점심을 먹읍시다."], k: [["식당에서"], ["먹읍시다"]], h: "먹다 + -읍시다" },
  { c: 10, en: "I eat breakfast and go to school.", a: ["아침을 먹고 학교에 가요."], k: [["먹고"], ["가요", "갑니다"]], h: "먹다 + -고, 가다 + -아요" },
  { c: 10, en: "Let's meet at three o'clock.", a: ["세 시에 만납시다."], k: [["세시에"], ["만납시다"]], h: "native number + 시, 만나다 + -ㅂ시다" },
  { c: 10, en: "The weather is warm and the sky is clear.", a: ["날씨가 따뜻하고 하늘이 맑아요."], k: [["따뜻하고"], ["맑아요"]], h: "따뜻하다 + -고, 맑다 + -아요" },

  // ── chapters 11–13 ──
  { c: 11, en: "I want to eat tteokbokki.", a: ["떡볶이를 먹고 싶어요.", "저는 떡볶이를 먹고 싶어요."], k: [["먹고싶어요"]], h: "먹다 + -고 싶다" },
  { c: 11, en: "Tteokbokki is spicy, so I can't eat it well.", a: ["떡볶이가 매워서 잘 못 먹어요.", "떡볶이는 매워서 잘 못 먹어요."], k: [["매워서"], ["못먹어요", "먹지못해요"]], h: "맵다 + -어서, 못 + 먹다" },
  { c: 11, en: "It's cold, so I want to stay at home.", a: ["추워서 집에 있고 싶어요.", "날씨가 추워서 집에 있고 싶어요."], k: [["추워서"], ["있고싶어요"]], h: "춥다 + -어서, 있다 + -고 싶다" },
  { c: 11, en: "The food was delicious, so I ate a lot.", a: ["음식이 맛있어서 많이 먹었어요."], k: [["맛있어서"], ["먹었어요"]], h: "맛있다 + -어서 (no past before -어서!), 먹다 + past" },
  { c: 11, en: "I want to go to Korea.", a: ["한국에 가고 싶어요.", "저는 한국에 가고 싶어요."], k: [["가고싶어요"]], h: "가다 + -고 싶다" },
  { c: 11, en: "I wanted to drink a beverage.", a: ["음료수를 마시고 싶었어요."], k: [["마시고싶었어요"]], h: "마시다 + -고 싶다 + past" },
  { c: 12, en: "The bag is pretty but expensive.", a: ["가방이 예쁘지만 비싸요.", "가방은 예쁘지만 비싸요."], k: [["예쁘지만"], ["비싸요"]], h: "예쁘다 + -지만" },
  { c: 12, en: "This hat is more expensive than that bag.", a: ["이 모자가 저 가방보다 더 비싸요.", "이 모자는 저 가방보다 더 비싸요."], k: [["가방보다"], ["비싸요"]], h: "N보다 더 + 비싸다" },
  { c: 12, en: "I like shopping, but I don't have money.", a: ["쇼핑을 좋아하지만 돈이 없어요.", "저는 쇼핑을 좋아하지만 돈이 없어요."], k: [["좋아하지만"], ["없어요"]], h: "좋아하다 + -지만" },
  { c: 12, en: "I wanted to buy sneakers, but they were expensive.", a: ["운동화를 사고 싶었지만 비쌌어요."], k: [["사고싶었지만"], ["비쌌어요"]], h: "사다 + -고 싶다 + past + -지만" },
  { c: 13, en: "I can make Korean food.", a: ["한국 음식을 만들 수 있어요.", "저는 한국 음식을 만들 수 있어요."], k: [["만들수있어요"]], h: "만들다 + -ㄹ 수 있다 (ㄹ stem)" },
  { c: 13, en: "My younger sibling is drawing a picture now.", a: ["동생이 지금 그림을 그리고 있어요.", "지금 동생이 그림을 그리고 있어요."], k: [["그리고있어요"]], h: "그리다 + -고 있다" },
  { c: 13, en: "I'm studying Korean at the library.", a: ["도서관에서 한국어를 공부하고 있어요."], k: [["도서관에서"], ["공부하고있어요"]], h: "공부하다 + -고 있다" },
  { c: 13, en: "I can't swim, but I can play the piano.", a: ["수영을 못하지만 피아노를 연주할 수 있어요.", "수영을 할 수 없지만 피아노를 연주할 수 있어요.", "저는 수영을 못하지만 피아노를 연주할 수 있어요."], k: [["지만"], ["연주할수있어요"]], h: "-지만, 연주하다 + -ㄹ 수 있다" },
  { c: 13, en: "Can you eat kimchi?", a: ["김치를 먹을 수 있어요?"], k: [["먹을수있어요"]], h: "먹다 + -을 수 있다" },

  // ── chapters 14–16 ──
  { c: 14, en: "Before going to Korea, I study Korean.", a: ["한국에 가기 전에 한국어를 공부해요."], k: [["가기전에"], ["공부해요", "공부합니다"]], h: "가다 + -기 전에" },
  { c: 14, en: "I'm planning to go to Jeju Island this weekend.", a: ["이번 주말에 제주도에 가려고 해요.", "주말에 제주도에 가려고 해요."], k: [["가려고해요"]], h: "가다 + -려고 하다" },
  { c: 14, en: "I went to the travel agency to buy a plane ticket.", a: ["비행기표를 사려고 여행사에 갔어요."], k: [["사려고"], ["갔어요"]], h: "사다 + -려고, 가다 + past" },
  { c: 14, en: "I wash my hands before eating.", a: ["먹기 전에 손을 씻어요.", "밥을 먹기 전에 손을 씻어요."], k: [["먹기전에"], ["씻어요"]], h: "먹다 + -기 전에, 씻다 + -어요" },
  { c: 14, en: "I plan to take a lot of pictures in Busan.", a: ["부산에서 사진을 많이 찍으려고 해요."], k: [["찍으려고해요"]], h: "찍다 + -으려고 하다" },
  { c: 15, en: "After eating lunch, please take the medicine.", a: ["점심을 먹은 후에 약을 드세요.", "점심을 먹은 후에 약을 먹으세요."], k: [["먹은후에"], ["드세요", "먹으세요"]], h: "먹다 + -은 후에, -으세요" },
  { c: 15, en: "Please get some good rest at home.", a: ["집에서 푹 쉬세요."], k: [["쉬세요"]], h: "쉬다 + -세요" },
  { c: 15, en: "After exercising, I drank water.", a: ["운동한 후에 물을 마셨어요."], k: [["운동한후에"], ["마셨어요"]], h: "운동하다 + -ㄴ 후에, 마시다 + past" },
  { c: 15, en: "I have a headache, so I want to go to the hospital.", a: ["머리가 아파서 병원에 가고 싶어요."], k: [["아파서"], ["가고싶어요"]], h: "아프다 + -아서, 가다 + -고 싶다" },
  { c: 15, en: "Please write your name here.", a: ["여기에 이름을 쓰세요."], k: [["쓰세요"]], h: "쓰다 + -세요" },
  { c: 16, en: "How do I get from here to the station?", a: ["여기에서 역까지 어떻게 가요?", "여기서 역까지 어떻게 가요?"], k: [["에서", "여기서"], ["역까지"], ["어떻게가요"]], h: "에서 ~ 까지 + 어떻게 가요" },
  { c: 16, en: "Please take the subway. (very formal)", a: ["지하철을 타십시오."], k: [["타십시오"]], h: "타다 + -십시오" },
  { c: 16, en: "I walk from home to school.", a: ["집에서 학교까지 걸어가요."], k: [["집에서"], ["학교까지"], ["걸어가요"]], h: "에서 ~ 까지, 걸어가다 + -아요" },
  { c: 16, en: "Please transfer at City Hall Station. (very formal)", a: ["시청역에서 갈아타십시오."], k: [["갈아타십시오"]], h: "갈아타다 + -십시오" },

  // ── chapters 17–20 ──
  { c: 17, en: "I have to prepare food for the housewarming party.", a: ["집들이 음식을 준비해야 돼요.", "집들이 음식을 준비해야 해요."], k: [["준비해야돼요", "준비해야해요"]], h: "준비하다 + -어야 되다" },
  { c: 17, en: "Tomorrow I have to go to school.", a: ["내일 학교에 가야 돼요.", "내일 학교에 가야 해요."], k: [["가야돼요", "가야해요"]], h: "가다 + -아야 되다" },
  { c: 17, en: "My friend moved, so I have to help.", a: ["친구가 이사해서 도와줘야 돼요.", "친구가 이사해서 도와줘야 해요."], k: [["이사해서"], ["도와줘야돼요", "도와줘야해요"]], h: "이사하다 + -어서, 도와주다 + -어야 되다" },
  { c: 18, en: "The roads are busy, so let's take the subway.", a: ["길이 막히니까 지하철을 탑시다.", "길이 막히니까 지하철로 갑시다."], k: [["막히니까"], ["탑시다", "갑시다"]], h: "막히다 + -니까, -ㅂ시다" },
  { c: 18, en: "It's raining, so let's watch TV at home.", a: ["비가 오니까 집에서 텔레비전을 봅시다."], k: [["오니까"], ["봅시다"]], h: "오다 + -니까, 보다 + -ㅂ시다" },
  { c: 18, en: "There are no tickets, so let's go to the museum.", a: ["표가 없으니까 박물관에 갑시다."], k: [["없으니까"], ["갑시다"]], h: "없다 + -으니까" },
  { c: 18, en: "I go to school by bus.", a: ["버스로 학교에 가요.", "학교에 버스로 가요."], k: [["버스로"], ["가요", "갑니다"]], h: "N + 로" },
  { c: 19, en: "I go to the bakery to buy bread.", a: ["빵을 사러 빵집에 가요."], k: [["사러"], ["가요", "갑니다"]], h: "사다 + -러 가다" },
  { c: 19, en: "Let's go eat lunch together.", a: ["같이 점심을 먹으러 갑시다.", "같이 점심 먹으러 갑시다.", "점심을 같이 먹으러 갑시다."], k: [["먹으러"], ["갑시다"]], h: "먹다 + -으러, 가다 + -ㅂ시다" },
  { c: 19, en: "I went to the bank with my friend.", a: ["친구랑 은행에 갔어요.", "친구하고 은행에 갔어요.", "친구랑 같이 은행에 갔어요."], k: [["랑", "하고"], ["갔어요"]], h: "N랑, 가다 + past" },
  { c: 20, en: "My grandmother is sleeping.", a: ["할머니께서 주무세요.", "할머니께서 주무시고 계세요."], k: [["께서"], ["주무세요", "주무시고계세요", "주무시고있어요"]], h: "께서 + 자다 → 주무시다" },
  { c: 20, en: "My father reads the newspaper.", a: ["아버지께서 신문을 읽으세요."], k: [["께서"], ["읽으세요"]], h: "께서 + 읽다 + -으시-" },
  { c: 20, en: "My teacher went to Korea.", a: ["선생님께서 한국에 가셨어요."], k: [["께서"], ["가셨어요"]], h: "께서 + 가다 + -시- + past" },
  { c: 20, en: "My grandfather is eating lunch.", a: ["할아버지께서 점심을 드세요.", "할아버지께서 점심을 드시고 계세요.", "할아버지께서 점심을 드시고 있어요."], k: [["께서"], ["드세요", "드시고계세요", "드시고있어요"]], h: "께서 + 먹다 → 드시다" },
];

(function () {
  const count = {};
  for (const it of FREE) {
    count[it.c] = (count[it.c] || 0) + 1;
    it.id = `f${it.c}-${count[it.c]}`;
    it.t = "free";
    it.g = "free";
  }
})();

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
  { c: 6, en: "I write a letter to my mother.", a: ["어머니에게 편지를 써요.", "어머니한테 편지를 써요."], k: [["에게", "한테"], ["써요", "씁니다"]], h: "쓰다 + -어요, 에게/한테" },

  // ── chapters 7–10 ──
  { c: 7, en: "I study Korean at the library.", a: ["도서관에서 한국어를 공부해요.", "저는 도서관에서 한국어를 공부해요."], k: [["도서관에서"], ["공부해요", "공부합니다"]], h: "에서 + 공부하다" },
  { c: 8, en: "On Saturday I met my friend at the bookstore.", a: ["토요일에 서점에서 친구를 만났어요."], k: [["서점에서"], ["만났어요"]], h: "만나다 + past" },
  { c: 8, en: "On the weekend the weather was hot.", a: ["주말에 날씨가 더웠어요."], k: [["더웠어요"]], h: "덥다 + past (ㅂ irregular)" },
  { c: 8, en: "On Saturday I listened to Korean songs.", a: ["토요일에 한국 노래를 들었어요."], k: [["토요일에"], ["들었어요"]], h: "듣다 + past (ㄷ irregular)" },
  { c: 8, en: "I wrote a card to my younger sibling.", a: ["동생에게 카드를 썼어요.", "동생한테 카드를 썼어요."], k: [["썼어요"]], h: "쓰다 + past" },
  { c: 9, en: "I can't play soccer well.", a: ["저는 축구를 잘 못해요.", "저는 축구를 잘하지 못해요.", "축구를 잘 못해요."], k: [["잘못해요", "잘하지못해요"]], h: "잘하다 + -지 못하다" },
  { c: 10, en: "I couldn't eat breakfast.", a: ["아침을 먹지 못했어요.", "아침을 못 먹었어요."], k: [["먹지못했어요", "못먹었어요"]], h: "먹다 + -지 못하다 + past" },
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
  { c: 12, en: "I like shopping, but I don't have time.", a: ["쇼핑을 좋아하지만 시간이 없어요.", "저는 쇼핑을 좋아하지만 시간이 없어요."], k: [["좋아하지만"], ["없어요"]], h: "좋아하다 + -지만" },
  { c: 12, en: "I wanted to buy sneakers, but they were expensive.", a: ["운동화를 사고 싶었지만 비쌌어요."], k: [["사고싶었지만"], ["비쌌어요"]], h: "사다 + -고 싶다 + past + -지만" },
  { c: 13, en: "I can make Korean food.", a: ["한국 음식을 만들 수 있어요.", "저는 한국 음식을 만들 수 있어요."], k: [["만들수있어요"]], h: "만들다 + -ㄹ 수 있다 (ㄹ stem)" },
  { c: 13, en: "My younger sibling is drawing a picture now.", a: ["동생이 지금 그림을 그리고 있어요.", "지금 동생이 그림을 그리고 있어요."], k: [["그리고있어요"]], h: "그리다 + -고 있다" },
  { c: 13, en: "I'm studying Korean at the library.", a: ["도서관에서 한국어를 공부하고 있어요."], k: [["도서관에서"], ["공부하고있어요"]], h: "공부하다 + -고 있다" },
  { c: 13, en: "I can't swim, but I can play the piano.", a: ["수영을 못하지만 피아노를 연주할 수 있어요.", "수영을 할 수 없지만 피아노를 연주할 수 있어요.", "저는 수영을 못하지만 피아노를 연주할 수 있어요."], k: [["지만"], ["연주할수있어요"]], h: "-지만, 연주하다 + -ㄹ 수 있다" },
  { c: 13, en: "Can you eat kimchi?", a: ["김치를 먹을 수 있어요?"], k: [["먹을수있어요"]], h: "먹다 + -을 수 있다" },

  // ── chapters 14–16 ──
  { c: 14, en: "Before going to Korea, I study Korean.", a: ["한국에 가기 전에 한국어를 공부해요."], k: [["가기전에"], ["공부해요", "공부합니다"]], h: "가다 + -기 전에" },
  { c: 14, en: "I'm planning to go to Jeju Island this weekend.", a: ["이번 주말에 제주도에 가려고 해요.", "주말에 제주도에 가려고 해요."], k: [["가려고해요"]], h: "가다 + -려고 하다" },
  { c: 14, en: "I went to the travel agency to book a plane ticket.", a: ["비행기 표를 예매하려고 여행사에 갔어요."], k: [["예매하려고"], ["갔어요"]], h: "예매하다 + -려고, 가다 + past" },
  { c: 14, en: "Before going to the hotel, I called the travel agency.", a: ["호텔에 가기 전에 여행사에 전화했어요."], k: [["가기전에"], ["전화했어요"]], h: "가다 + -기 전에, 전화하다 + past" },
  { c: 14, en: "I plan to take a lot of pictures in Busan.", a: ["부산에서 사진을 많이 찍으려고 해요."], k: [["찍으려고해요"]], h: "찍다 + -으려고 하다" },
  { c: 15, en: "After eating lunch, please take the medicine.", a: ["점심을 먹은 후에 약을 먹으세요."], k: [["먹은후에"], ["드세요", "먹으세요"]], h: "먹다 + -은 후에, -으세요" },
  { c: 15, en: "Please get some good rest at home.", a: ["집에서 푹 쉬세요."], k: [["쉬세요"]], h: "쉬다 + -세요" },
  { c: 15, en: "After exercising, I drank a beverage.", a: ["운동한 후에 음료수를 마셨어요."], k: [["운동한후에"], ["마셨어요"]], h: "운동하다 + -ㄴ 후에, 마시다 + past" },
  { c: 15, en: "I have a headache, so I want to go to the hospital.", a: ["머리가 아파서 병원에 가고 싶어요."], k: [["아파서"], ["가고싶어요"]], h: "아프다 + -아서, 가다 + -고 싶다" },
  { c: 15, en: "Please write your name here.", a: ["여기에 이름을 쓰세요."], k: [["쓰세요"]], h: "쓰다 + -세요" },
  { c: 16, en: "How do I get from here to the station?", a: ["여기에서 역까지 어떻게 가요?", "여기서 역까지 어떻게 가요?"], k: [["에서", "여기서"], ["역까지"], ["어떻게가요"]], h: "에서 ~ 까지 + 어떻게 가요" },
  { c: 16, en: "Please take the subway. (very formal)", a: ["지하철을 타십시오."], k: [["타십시오"]], h: "타다 + -십시오" },
  { c: 16, en: "I walk from home to school.", a: ["집에서 학교까지 걸어가요."], k: [["집에서"], ["학교까지"], ["걸어가요"]], h: "에서 ~ 까지, 걸어가다 + -아요" },
  { c: 16, en: "Please transfer at City Hall Station. (very formal)", a: ["시청역에서 갈아타십시오."], k: [["갈아타십시오"]], h: "갈아타다 + -십시오" },

  // ── chapters 17–20 ──
  { c: 17, en: "I have to prepare food for the housewarming party.", a: ["집들이 음식을 준비해야 돼요.", "집들이 음식을 준비해야 해요."], k: [["준비해야돼요", "준비해야해요"]], h: "준비하다 + -어야 되다" },
  { c: 17, en: "On the weekend I have to go to school.", a: ["주말에 학교에 가야 돼요.", "주말에 학교에 가야 해요."], k: [["가야돼요", "가야해요"]], h: "가다 + -아야 되다" },
  { c: 17, en: "My friend moved, so I have to help.", a: ["친구가 이사해서 도와줘야 돼요.", "친구가 이사해서 도와줘야 해요."], k: [["이사해서"], ["도와줘야돼요", "도와줘야해요"]], h: "이사하다 + -어서, 도와주다 + -어야 되다" },
  { c: 18, en: "The roads are busy, so let's take the subway.", a: ["길이 막히니까 지하철을 탑시다.", "길이 막히니까 지하철로 갑시다."], k: [["막히니까"], ["탑시다", "갑시다"]], h: "막히다 + -니까, -ㅂ시다" },
  { c: 18, en: "It's raining, so let's watch TV at home.", a: ["비가 오니까 집에서 텔레비전을 봅시다."], k: [["오니까"], ["봅시다"]], h: "오다 + -니까, 보다 + -ㅂ시다" },
  { c: 18, en: "There are no tickets, so let's go to the museum.", a: ["표가 없으니까 박물관에 갑시다."], k: [["없으니까"], ["갑시다"]], h: "없다 + -으니까" },
  { c: 18, en: "I go to school by bus.", a: ["버스로 학교에 가요.", "학교에 버스로 가요."], k: [["버스로"], ["가요", "갑니다"]], h: "N + 로" },
  { c: 19, en: "I go to the bakery to buy bread.", a: ["빵을 사러 빵집에 가요."], k: [["사러"], ["가요", "갑니다"]], h: "사다 + -러 가다" },
  { c: 19, en: "Let's go eat lunch together.", a: ["같이 점심을 먹으러 갑시다.", "같이 점심 먹으러 갑시다.", "점심을 같이 먹으러 갑시다."], k: [["먹으러"], ["갑시다"]], h: "먹다 + -으러, 가다 + -ㅂ시다" },
  { c: 19, en: "I went to the bank with my friend.", a: ["친구랑 은행에 갔어요.", "친구하고 은행에 갔어요.", "친구랑 같이 은행에 갔어요."], k: [["랑", "하고"], ["갔어요"]], h: "N랑, 가다 + past" },
  { c: 20, en: "My grandmother is sleeping.", a: ["할머니께서 주무세요.", "할머니께서 주무시고 계세요."], k: [["께서"], ["주무세요", "주무시고계세요", "주무시고있어요"]], h: "께서 + 자다 → 주무시다" },
  { c: 20, en: "My father reads a book.", a: ["아버지께서 책을 읽으세요."], k: [["께서"], ["읽으세요"]], h: "께서 + 읽다 + -으시-" },
  { c: 20, en: "My teacher went to Korea.", a: ["선생님께서 한국에 가셨어요."], k: [["께서"], ["가셨어요"]], h: "께서 + 가다 + -시- + past" },
  { c: 20, en: "My grandfather is eating lunch.", a: ["할아버지께서 점심을 드세요.", "할아버지께서 점심을 드시고 계세요.", "할아버지께서 점심을 드시고 있어요."], k: [["께서"], ["드세요", "드시고계세요", "드시고있어요"]], h: "께서 + 먹다 → 드시다" },
];

// Second batch: more practice for later chapters, mixing in earlier grammar.
FREE.push(
  // ── 8–10 ──
  { c: 8, en: "On Saturday I studied at the library.", a: ["토요일에 도서관에서 공부했어요."], k: [["토요일에"], ["도서관에서"], ["공부했어요"]], h: "(time)에, 에서, 공부하다 + past" },
  { c: 8, en: "On Saturday I read a book at the library.", a: ["토요일에 도서관에서 책을 읽었어요."], k: [["도서관에서"], ["읽었어요"]], h: "에서, 읽다 + past" },
  { c: 8, en: "My older brother sent me a letter.", a: ["형이 저한테 편지를 보냈어요.", "오빠가 저한테 편지를 보냈어요.", "형이 저에게 편지를 보냈어요.", "오빠가 저에게 편지를 보냈어요."], k: [["저한테", "저에게"], ["보냈어요"]], h: "한테/에게, 보내다 + past" },
  { c: 9, en: "From today I exercise every day.", a: ["오늘부터 매일 운동해요."], k: [["오늘부터"], ["운동해요", "운동합니다"]], h: "부터, 운동하다 + -아요" },
  { c: 9, en: "I couldn't meet my friend on the weekend.", a: ["주말에 친구를 못 만났어요.", "주말에 친구를 만나지 못했어요."], k: [["못만났어요", "만나지못했어요"]], h: "만나다 + -지 못하다 + past" },
  { c: 10, en: "Shall we eat lunch and then go to the library?", a: ["점심을 먹고 도서관에 갈까요?"], k: [["먹고"], ["갈까요"]], h: "먹다 + -고, 가다 + -ㄹ까요" },
  { c: 10, en: "What time shall we meet?", a: ["몇 시에 만날까요?"], k: [["몇시에"], ["만날까요"]], h: "몇 시에, 만나다 + -ㄹ까요" },
  { c: 10, en: "I studied Korean and watched a drama.", a: ["한국어를 공부하고 드라마를 봤어요."], k: [["공부하고"], ["봤어요"]], h: "공부하다 + -고, 보다 + past" },

  // ── 11–13 ──
  { c: 11, en: "Tteokbokki is spicy, so I want to eat gimbap.", a: ["떡볶이가 매워서 김밥을 먹고 싶어요.", "떡볶이는 매워서 김밥을 먹고 싶어요."], k: [["매워서"], ["먹고싶어요"]], h: "맵다 + -어서, 먹다 + -고 싶다" },
  { c: 11, en: "The soup was salty, so I didn't eat it.", a: ["국이 짜서 안 먹었어요.", "국이 짜서 먹지 않았어요."], k: [["짜서"], ["안먹었어요", "먹지않았어요"]], h: "짜다 + -아서, 안 + 먹다 + past" },
  { c: 11, en: "I want to listen to Korean songs.", a: ["한국 노래를 듣고 싶어요."], k: [["듣고싶어요"]], h: "듣다 + -고 싶다" },
  { c: 15, en: "I'm tired, so I want to rest.", a: ["피곤해서 쉬고 싶어요."], k: [["피곤해서"], ["쉬고싶어요"]], h: "피곤하다 + -어서, 쉬다 + -고 싶다" },
  { c: 11, en: "I met my friend and ate bibimbap.", a: ["친구를 만나고 비빔밥을 먹었어요."], k: [["만나고"], ["먹었어요"]], h: "만나다 + -고, 먹다 + past" },
  { c: 12, en: "Korean food is spicy but delicious.", a: ["한국 음식은 맵지만 맛있어요.", "한국 음식이 맵지만 맛있어요."], k: [["맵지만"], ["맛있어요"]], h: "맵다 + -지만" },
  { c: 12, en: "Winter is colder than autumn.", a: ["겨울이 가을보다 더 추워요.", "겨울은 가을보다 더 추워요."], k: [["가을보다"], ["추워요"]], h: "N보다 더, 춥다 + -어요" },
  { c: 12, en: "I wanted to go, but I couldn't.", a: ["가고 싶었지만 못 갔어요.", "가고 싶었지만 가지 못했어요."], k: [["가고싶었지만"], ["못갔어요", "가지못했어요"]], h: "-고 싶다 + past + -지만, 못 + past" },
  { c: 12, en: "The clerk is kind, but the price is high.", a: ["점원은 친절하지만 가격이 비싸요.", "점원이 친절하지만 가격이 비싸요."], k: [["친절하지만"], ["비싸요"]], h: "친절하다 + -지만" },
  { c: 12, en: "Is this bag cheaper than that bag?", a: ["이 가방이 저 가방보다 더 싸요?", "이 가방이 저 가방보다 싸요?"], k: [["가방보다"], ["싸요"]], h: "N보다 (더) + 싸다" },
  { c: 13, en: "I can read Korean.", a: ["한국어를 읽을 수 있어요.", "저는 한국어를 읽을 수 있어요."], k: [["읽을수있어요"]], h: "읽다 + -을 수 있다" },
  { c: 18, en: "It was hot, so I couldn't sleep.", a: ["더워서 잘 수 없었어요.", "더워서 못 잤어요.", "더워서 자지 못했어요."], k: [["더워서"], ["잘수없었어요", "못잤어요", "자지못했어요"]], h: "덥다 + -어서, 자다 + -ㄹ 수 없다 + past" },
  { c: 13, en: "I'm cooking right now.", a: ["지금 요리하고 있어요."], k: [["요리하고있어요"]], h: "요리하다 + -고 있다" },
  { c: 13, en: "On the weekend I was studying at the library.", a: ["주말에 도서관에서 공부하고 있었어요."], k: [["도서관에서"], ["공부하고있었어요"]], h: "-고 있다 + past" },
  { c: 13, en: "Can I take pictures here?", a: ["여기에서 사진을 찍을 수 있어요?", "여기서 사진을 찍을 수 있어요?"], k: [["찍을수있어요"]], h: "찍다 + -을 수 있다" },
  { c: 13, en: "My friend can dance well, but I can't.", a: ["친구는 댄스를 잘 출 수 있지만 저는 못 춰요.", "친구는 댄스를 잘 추지만 저는 못 춰요.", "친구는 댄스를 잘 출 수 있지만 저는 출 수 없어요."], k: [["지만"], ["못춰요", "출수없어요"]], h: "추다, -지만, 못 / -ㄹ 수 없다" },

  // ── 14–16 ──
  { c: 14, en: "Before I came to Korea, I studied Korean.", a: ["한국에 오기 전에 한국어를 공부했어요."], k: [["오기전에"], ["공부했어요"]], h: "오다 + -기 전에, 공부하다 + past" },
  { c: 14, en: "I'm going to Seoul to meet my friend.", a: ["친구를 만나려고 서울에 가요."], k: [["만나려고"], ["가요", "갑니다"]], h: "만나다 + -려고" },
  { c: 14, en: "This weekend I plan to learn K-pop dance.", a: ["이번 주말에 케이 팝 댄스를 배우려고 해요.", "주말에 케이 팝 댄스를 배우려고 해요."], k: [["배우려고해요"]], h: "배우다 + -려고 하다" },
  { c: 18, en: "Before sleeping, I read a book.", a: ["자기 전에 책을 읽어요."], k: [["자기전에"], ["읽어요"]], h: "자다 + -기 전에, 읽다 + -어요" },
  { c: 14, en: "I want to go to Korea, so I plan to study Korean.", a: ["한국에 가고 싶어서 한국어를 공부하려고 해요."], k: [["가고싶어서"], ["공부하려고해요"]], h: "-고 싶다 + -어서, -려고 하다" },
  { c: 14, en: "Before traveling, I want to book a hotel.", a: ["여행하기 전에 호텔을 예약하고 싶어요.", "여행 가기 전에 호텔을 예약하고 싶어요."], k: [["기전에"], ["예약하고싶어요"]], h: "-기 전에, -고 싶다" },
  { c: 14, en: "I planned to go to the sea, but it rained.", a: ["바다에 가려고 했지만 비가 왔어요."], k: [["가려고했지만"], ["왔어요"]], h: "-려고 하다 + past + -지만, 오다 + past" },
  { c: 18, en: "Before eating dinner, shall we take a walk?", a: ["저녁을 먹기 전에 산책할까요?", "저녁 먹기 전에 산책할까요?"], k: [["먹기전에"], ["산책할까요"]], h: "-기 전에, -ㄹ까요" },
  { c: 15, en: "After meeting my friend, I went home.", a: ["친구를 만난 후에 집에 갔어요."], k: [["만난후에"], ["갔어요"]], h: "만나다 + -ㄴ 후에, 가다 + past" },
  { c: 15, en: "Please take the medicine and get some good rest.", a: ["약을 먹고 푹 쉬세요.", "약을 먹고 쉬세요."], k: [["먹고"], ["쉬세요"]], h: "-고, 쉬다 + -세요" },
  { c: 15, en: "My stomach hurts, so I can't eat.", a: ["배가 아파서 먹을 수 없어요.", "배가 아파서 못 먹어요."], k: [["아파서"], ["먹을수없어요", "못먹어요"]], h: "아프다 + -아서, -을 수 없다" },
  { c: 15, en: "After studying, shall we eat dinner?", a: ["공부한 후에 저녁을 먹을까요?"], k: [["공부한후에"], ["먹을까요"]], h: "-ㄴ 후에, -을까요" },
  { c: 15, en: "Please read this book before traveling.", a: ["여행하기 전에 이 책을 읽으세요.", "여행 가기 전에 이 책을 읽으세요."], k: [["기전에"], ["읽으세요"]], h: "-기 전에, 읽다 + -으세요" },
  { c: 15, en: "After listening to that song, I wanted to learn Korean.", a: ["그 노래를 들은 후에 한국어를 배우고 싶었어요."], k: [["들은후에"], ["배우고싶었어요"]], h: "듣다 + -은 후에 (ㄷ → ㄹ), -고 싶다 + past" },
  { c: 16, en: "After studying, I exercise in the park.", a: ["공부한 후에 공원에서 운동해요."], k: [["공부한후에"], ["공원에서"], ["운동해요"]], h: "공부하다 + -ㄴ 후에, 에서" },
  { c: 18, en: "It's cold, so please rest at home.", a: ["추우니까 집에서 쉬세요."], k: [["추우니까"], ["쉬세요"]], h: "춥다 + -으니까 (not -어서 before -세요!), 쉬다 + -세요" },
  { c: 16, en: "Please take the train from Seoul to Busan. (very formal)", a: ["서울에서 부산까지 기차를 타십시오."], k: [["서울에서"], ["부산까지"], ["타십시오"]], h: "에서 ~ 까지, 타다 + -십시오" },
  { c: 16, en: "I took a bus from the station to my house.", a: ["역에서 집까지 버스를 탔어요."], k: [["역에서"], ["집까지"], ["탔어요"]], h: "에서 ~ 까지, 타다 + past" },
  { c: 16, en: "Please take the bus here. (very formal)", a: ["여기에서 버스를 타십시오.", "여기서 버스를 타십시오."], k: [["타십시오"]], h: "타다 + -십시오" },
  { c: 16, en: "I want to walk from school to the park.", a: ["학교에서 공원까지 걸어가고 싶어요."], k: [["학교에서"], ["공원까지"], ["걸어가고싶어요"]], h: "에서 ~ 까지, 걸어가다 + -고 싶다" },
  { c: 16, en: "Please read this book. (very formal)", a: ["이 책을 읽으십시오."], k: [["읽으십시오"]], h: "읽다 + -으십시오" },
  { c: 19, en: "Please get off at Seoul Station. (very formal)", a: ["서울역에서 내리십시오."], k: [["서울역에서"], ["내리십시오"]], h: "내리다 + -십시오" },
  { c: 16, en: "I studied from nine to twelve o'clock.", a: ["아홉 시부터 열두 시까지 공부했어요."], k: [["아홉시부터"], ["열두시까지"], ["공부했어요"]], h: "(time) 부터 ~ 까지, past" },
  { c: 16, en: "Can I take a bus from here to Incheon?", a: ["여기에서 인천까지 버스를 탈 수 있어요?", "여기서 인천까지 버스를 탈 수 있어요?"], k: [["인천까지"], ["탈수있어요"]], h: "에서 ~ 까지, 타다 + -ㄹ 수 있다" },

  // ── 17–20 ──
  { c: 17, en: "Before the housewarming party, I have to prepare food.", a: ["집들이하기 전에 음식을 준비해야 돼요.", "집들이 전에 음식을 준비해야 돼요.", "집들이하기 전에 음식을 준비해야 해요."], k: [["전에"], ["준비해야돼요", "준비해야해요"]], h: "-기 전에, 준비하다 + -어야 되다" },
  { c: 17, en: "I'm sick, so I have to go to the hospital.", a: ["아파서 병원에 가야 돼요.", "아파서 병원에 가야 해요."], k: [["아파서"], ["가야돼요", "가야해요"]], h: "아프다 + -아서, 가다 + -아야 되다" },
  { c: 17, en: "Do I have to buy a present?", a: ["선물을 사야 돼요?", "선물을 사야 해요?"], k: [["사야돼요", "사야해요"]], h: "사다 + -아야 되다" },
  { c: 17, en: "The house is big. And it's clean, too.", a: ["집이 커요. 깨끗하고요."], k: [["커요"], ["깨끗하고요"]], h: "크다 + -어요, -고요" },
  { c: 17, en: "I have to buy detergent and tissues.", a: ["세제하고 휴지를 사야 돼요.", "세제와 휴지를 사야 돼요.", "세제하고 휴지를 사야 해요."], k: [["하고", "와"], ["사야돼요", "사야해요"]], h: "하고 / 와, 사다 + -아야 되다" },
  { c: 17, en: "I want to go, but I have to study.", a: ["가고 싶지만 공부해야 돼요.", "가고 싶지만 공부해야 해요."], k: [["가고싶지만"], ["공부해야돼요", "공부해야해요"]], h: "-고 싶다 + -지만, 공부하다 + -어야 되다" },
  { c: 17, en: "I have class, so I have to go to school.", a: ["수업이 있어서 학교에 가야 돼요.", "수업이 있어서 학교에 가야 해요."], k: [["있어서"], ["가야돼요", "가야해요"]], h: "있다 + -어서, 가다 + -아야 되다" },
  { c: 18, en: "It's cold, so please wear a lot of clothes.", a: ["추우니까 옷을 많이 입으세요."], k: [["추우니까"], ["입으세요"]], h: "춥다 + -으니까 (ㅂ → 우), 입다 + -으세요" },
  { c: 18, en: "I'm busy now, so let's meet on the weekend.", a: ["지금 바쁘니까 주말에 만납시다."], k: [["바쁘니까"], ["만납시다"]], h: "바쁘다 + -니까, -ㅂ시다" },
  { c: 18, en: "Let's go to the concert by subway.", a: ["지하철로 콘서트에 갑시다.", "콘서트에 지하철로 갑시다."], k: [["지하철로"], ["갑시다"]], h: "로, -ㅂ시다" },
  { c: 18, en: "The movie is popular, so let's watch it together.", a: ["영화가 인기가 많으니까 같이 봅시다.", "그 영화가 인기가 많으니까 같이 봅시다."], k: [["많으니까"], ["봅시다"]], h: "인기가 많다 + -으니까, 보다 + -ㅂ시다" },
  { c: 18, en: "There are many people at the theater, so let's go to the museum.", a: ["극장에 사람이 많으니까 박물관에 갑시다."], k: [["많으니까"], ["갑시다"]], h: "많다 + -으니까" },
  { c: 18, en: "Please write with a pencil.", a: ["연필로 쓰세요."], k: [["연필로"], ["쓰세요"]], h: "로 (after ㄹ), 쓰다 + -세요" },
  { c: 18, en: "I'm tired, so I have to go home.", a: ["피곤하니까 집에 가야 돼요.", "피곤하니까 집에 가야 해요."], k: [["피곤하니까"], ["가야돼요", "가야해요"]], h: "피곤하다 + -니까, 가다 + -아야 되다" },
  { c: 19, en: "I went to the bookstore to buy a book.", a: ["책을 사러 서점에 갔어요."], k: [["사러"], ["갔어요"]], h: "사다 + -러, 가다 + past" },
  { c: 19, en: "Shall we go to the park together to take a walk?", a: ["같이 산책하러 공원에 갈까요?", "공원에 같이 산책하러 갈까요?"], k: [["산책하러"], ["갈까요"]], h: "-러 가다, -ㄹ까요" },
  { c: 19, en: "I came to Korea to learn Korean.", a: ["한국어를 배우러 한국에 왔어요."], k: [["배우러"], ["왔어요"]], h: "배우다 + -러, 오다 + past" },
  { c: 19, en: "I'm going to the bank with my mother.", a: ["어머니랑 은행에 가요.", "어머니하고 은행에 가요."], k: [["랑", "하고"], ["가요", "갑니다"]], h: "N랑, 가다" },
  { c: 19, en: "The bank is to the left of the bakery.", a: ["은행은 빵집 왼쪽에 있어요.", "은행이 빵집 왼쪽에 있어요."], k: [["왼쪽에"], ["있어요"]], h: "N 왼쪽에 있다" },
  { c: 19, en: "It's raining, so let's go eat at a restaurant nearby.", a: ["비가 오니까 근처 식당에 먹으러 갑시다.", "비가 오니까 근처 식당에 밥을 먹으러 갑시다."], k: [["오니까"], ["먹으러"], ["갑시다"]], h: "-니까, -으러, -ㅂ시다" },
  { c: 20, en: "My grandmother likes flowers, so I bought flowers.", a: ["할머니께서 꽃을 좋아하셔서 꽃을 샀어요."], k: [["좋아하셔서"], ["샀어요"]], h: "-시- + -어서 → 하셔서, 사다 + past" },
  { c: 20, en: "Grandfather, please eat.", a: ["할아버지, 드세요.", "할아버지, 많이 드세요."], k: [["드세요"]], h: "먹다 → 드시다 + -세요" },
  { c: 20, en: "My teacher is at home.", a: ["선생님께서 댁에 계세요."], k: [["께서"], ["댁에"], ["계세요"]], h: "께서, 집 → 댁, 있다 → 계시다" },
  { c: 20, en: "My mother is reading a book.", a: ["어머니께서 책을 읽고 계세요.", "어머니께서 책을 읽으세요.", "어머니께서 책을 읽고 있으세요."], k: [["께서"], ["읽고계세요", "읽으세요", "읽고있으세요"]], h: "께서, -고 계시다" },
  { c: 20, en: "Did your father go to work?", a: ["아버지께서 회사에 가셨어요?"], k: [["가셨어요"]], h: "가다 + -시- + past" },
  { c: 20, en: "My grandmother was sick, so she went to the hospital.", a: ["할머니께서 아프셔서 병원에 가셨어요."], k: [["아프셔서"], ["가셨어요"]], h: "아프다 + -시- + -어서, 가다 + -시- + past" },
);

(function () {
  const count = {};
  for (const it of FREE) {
    count[it.c] = (count[it.c] || 0) + 1;
    it.id = `f${it.c}-${count[it.c]}`;
    it.t = "free";
    it.g = "free";
  }
})();

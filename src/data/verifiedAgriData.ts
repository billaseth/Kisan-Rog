export interface VerifiedAgriRecord {
  id: string;
  cropHindi: string;
  cropEnglish: string;
  diseaseHindi: string;
  diseaseEnglish: string;
  category: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest' | 'Nutrient' | 'Soil';
  keywords: string[];
  symptoms: string[];
  treatmentDosage: string;
  precautions: string;
}

export const VERIFIED_AGRI_DATABASE: VerifiedAgriRecord[] = [
  // WHEAT / GEHU
  {
    id: 'wheat-yellow-rust',
    cropHindi: 'गेहूं (Gehu)',
    cropEnglish: 'Wheat',
    diseaseHindi: 'पीला रतुआ (Yellow Rust / Stripe Rust - Puccinia striiformis)',
    diseaseEnglish: 'Yellow Rust',
    category: 'Fungal',
    keywords: ['gehu', 'gehun', 'gehoon', 'wheat', 'pila ratuwa', 'peela ratwa', 'yellow rust', 'peeli pattiya', 'stripe rust', 'haldi jaisa powder', 'rust'],
    symptoms: ['पत्तियों पर पीले रंग की समानांतर धारियां या हल्दी जैसा पीला चूर्ण जमना', 'पत्तियां छूने पर उंगलियों पर पीला पाउडर लगना'],
    treatmentDosage: 'Propiconazole 25% EC (Tilt) @ 1 ml प्रति लीटर पानी (200 ml प्रति 200 लीटर पानी प्रति एकड़) अथवा Tebuconazole 25.9% EC @ 1-1.25 ml प्रति लीटर पानी का छिड़काव करें।',
    precautions: 'लक्षण दिखते ही तुरंत छिड़काव करें; तेज धूप में छिड़काव न करें; यदि संक्रमण अधिक हो तो 12-15 दिन बाद दोबारा छिड़काव करें; नाइट्रोजन युक्त खाद (यूरिया) का अत्यधिक प्रयोग बंद करें।'
  },
  {
    id: 'wheat-brown-rust',
    cropHindi: 'गेहूं (Gehu)',
    cropEnglish: 'Wheat',
    diseaseHindi: 'भूरा रतुआ (Brown Rust / Leaf Rust - Puccinia recondita)',
    diseaseEnglish: 'Brown Rust',
    category: 'Fungal',
    keywords: ['gehu', 'gehun', 'wheat', 'bhura ratuwa', 'brown rust', 'leaf rust', 'bhure dhabbe', 'brown spots'],
    symptoms: ['पत्तियों पर छोटे-छोटे गोल भूरे या नारंगी रंग के फफोले बनना'],
    treatmentDosage: 'Mancozeb 75% WP @ 2.5 ग्राम प्रति लीटर पानी (500 ग्राम प्रति 200 लीटर पानी प्रति एकड़) या Propiconazole 25% EC @ 1 ml प्रति लीटर पानी।',
    precautions: 'फसल की नियमित निगरानी रखें; हवा के रुख की दिशा में ही स्प्रे करें; सुरक्षा मास्क और दस्ताने पहनें।'
  },
  {
    id: 'wheat-karnal-bunt',
    cropHindi: 'गेहूं (Gehu)',
    cropEnglish: 'Wheat',
    diseaseHindi: 'करनाल बंट (Karnal Bunt - Tilletia indica)',
    diseaseEnglish: 'Karnal Bunt',
    category: 'Fungal',
    keywords: ['gehu', 'gehun', 'wheat', 'karnal bunt', 'kala dana', 'sade machhli jaisi badbu', 'bunt'],
    symptoms: ['बालियों में दानों का काला चूर्ण बन जाना एवं सड़ी मछली जैसी तीखी गंध आना'],
    treatmentDosage: 'बाली निकलने की अवस्था (Boot stage) पर Propiconazole 25% EC @ 1 ml प्रति लीटर पानी (200 ml प्रति एकड़) का छिड़काव करें। बीज उपचार: Carboxin 37.5% + Thiram 37.5% DS @ 2.5 ग्राम प्रति किग्रा बीज।',
    precautions: 'संक्रमित बीज को कभी भी अगली फसल के लिए न रखें; प्रमाणित एवं उपचारित बीज ही बोएं; फूल आने के समय अधिक सिंचाई से बचें।'
  },
  {
    id: 'wheat-loose-smut',
    cropHindi: 'गेहूं (Gehu)',
    cropEnglish: 'Wheat',
    diseaseHindi: 'कंडुआ रोग / खुली कंडुवा (Loose Smut - Ustilago segetum var. tritici)',
    diseaseEnglish: 'Loose Smut',
    category: 'Fungal',
    keywords: ['gehu', 'wheat', 'loose smut', 'kandua', 'kali bali', 'black ear', 'smut'],
    symptoms: ['गेहूं की पूरी बाली काले चूर्ण (Black soot) में बदल जाती है और केवल डंठल बाकी रह जाता है'],
    treatmentDosage: 'बीज शोधन: Carboxin 75% WP (Vitavax) @ 2 ग्राम प्रति किग्रा बीज अथवा Tebuconazole 2% DS @ 1.25 ग्राम प्रति किग्रा बीज की दर से उपचारित कर बोएं।',
    precautions: 'रोग आंतरिक बीज जनित है, इसलिए प्रमाणित एवं उपचारित बीज ही बोएं; खेत में दिखते ही काली बालियों को पन्नी से ढककर उखाड़ें और जला दें।'
  },
  {
    id: 'wheat-termites',
    cropHindi: 'गेहूं (Gehu)',
    cropEnglish: 'Wheat',
    diseaseHindi: 'दीमक (Termites - Odontotermes obesus)',
    diseaseEnglish: 'Termites',
    category: 'Pest',
    keywords: ['gehu', 'gehun', 'wheat', 'dimak', 'deemak', 'termites', 'sukhti jad', 'termite', 'dry root'],
    symptoms: ['पौधों का सूखना और जड़ से आसानी से उखड़ जाना, जड़ों पर दीमक का लगा होना'],
    treatmentDosage: 'खड़ी फसल में: Chlorpyrifos 20% EC @ 1.25 लीटर प्रति एकड़ को 20-25 किग्रा रेत या बालू में मिलाकर सिंचाई के समय पानी के साथ दें। बीज उपचार: Fipronil 5% SC @ 5 ml प्रति किग्रा बीज।',
    precautions: 'खेत में कच्चा गोबर न डालें; खेत की मेड़ों को साफ रखें; दीमक प्रभावित खेत में सूखी सिंचाई न रहने दें।'
  },

  // PADDY / DHAAN / RICE
  {
    id: 'paddy-blast',
    cropHindi: 'धान (Dhaan / Chawal)',
    cropEnglish: 'Paddy / Rice',
    diseaseHindi: 'झुलसा / ब्लास्ट रोग (Rice Blast - Magnaporthe oryzae)',
    diseaseEnglish: 'Blast Disease',
    category: 'Fungal',
    keywords: ['dhaan', 'dhan', 'paddy', 'rice', 'blast', 'jhulka', 'jhulsa', 'leaf blast', 'neck blast', 'aankh jaise dhabbe', 'chawal'],
    symptoms: ['पत्तियों पर नाव या आंख के आकार के धब्बे जिनके किनारे कत्थई और बीच का भाग भूरा/राख के रंग का होता है'],
    treatmentDosage: 'Tricyclazole 75% WP @ 0.6 ग्राम प्रति लीटर पानी (120-150 ग्राम प्रति 200 लीटर पानी प्रति एकड़) अथवा Isoprothiolane 40% EC @ 1.5 ml प्रति लीटर पानी।',
    precautions: 'यूरिया की अत्यधिक खुराक न दें; खेत में लगातार जलभराव न रखें, बीच-बीच में पानी निकालकर हवा लगने दें।'
  },
  {
    id: 'paddy-bacterial-blight',
    cropHindi: 'धान (Dhaan / Chawal)',
    cropEnglish: 'Paddy / Rice',
    diseaseHindi: 'जीवाणु झुलसा (Bacterial Leaf Blight - Xanthomonas oryzae)',
    diseaseEnglish: 'Bacterial Leaf Blight (BLB)',
    category: 'Bacterial',
    keywords: ['dhaan', 'dhan', 'paddy', 'blb', 'bacterial leaf blight', 'bacterial blight', 'sukhe kinare', 'kresek', 'rice blight'],
    symptoms: ['पत्तियों के किनारों से ऊपर से नीचे की ओर पीलापन और सूखना, बाद में पुआल जैसे रंग का होना'],
    treatmentDosage: 'Copper Oxychloride 50% WP @ 2.5 ग्राम + Streptocycline (Streptomycin sulphate + Tetracycline) @ 0.03 ग्राम प्रति लीटर पानी (500 ग्राम COC + 6 ग्राम स्ट्रेप्टोसाइक्लिन प्रति 200 लीटर पानी प्रति एकड़)।',
    precautions: 'संक्रमित खेत का पानी दूसरे स्वस्थ खेत में न जाने दें; यूरिया का प्रयोग रोकें एवं पोटाश (MOP) 15-20 किग्रा/एकड़ डालें।'
  },
  {
    id: 'paddy-sheath-blight',
    cropHindi: 'धान (Dhaan / Chawal)',
    cropEnglish: 'Paddy / Rice',
    diseaseHindi: 'शीथ ब्लाइट (Sheath Blight - Rhizoctonia solani)',
    diseaseEnglish: 'Sheath Blight',
    category: 'Fungal',
    keywords: ['dhaan', 'dhan', 'paddy', 'sheath blight', 'tana galan', 'sarpanch dhabba', 'rice sheath blight'],
    symptoms: ['पानी की सतह के पास तने और पर्ण-आवरण पर सांप की केंचुली जैसे अनियमित हरे-भूरे धब्बे'],
    treatmentDosage: 'Hexaconazole 5% SC @ 2 ml प्रति लीटर पानी (400 ml प्रति 200 लीटर पानी प्रति एकड़) या Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml प्रति लीटर पानी।',
    precautions: 'घनी रोपाई से बचें; खेत से खरपतवार नष्ट करें; पोटाश का संतुलित प्रयोग करें।'
  },
  {
    id: 'paddy-khaira',
    cropHindi: 'धान (Dhaan / Chawal)',
    cropEnglish: 'Paddy / Rice',
    diseaseHindi: 'खैरा रोग (Khaira Disease - जिंक की कमी)',
    diseaseEnglish: 'Khaira Disease (Zinc Deficiency)',
    category: 'Nutrient',
    keywords: ['dhaan', 'dhan', 'paddy', 'khaira', 'khaira rog', 'zinc kami', 'laal bhura rang', 'zinc deficiency', 'chawal khaira'],
    symptoms: ['पुरानी पत्तियों पर लाल-भूरे या कत्थई रंग के छोटे-छोटे धब्बे, पौधों की वृद्धि रुकना और बौना रह जाना'],
    treatmentDosage: 'Zinc Sulphate (21% Zn) @ 5 किग्रा + बुझा हुआ चूना 2.5 किग्रा या यूरिया 2 किग्रा को 200 लीटर पानी में घोलकर प्रति एकड़ छिड़काव करें (अथवा Chelated Zinc 12% EDTA @ 1 ग्राम प्रति लीटर पानी)।',
    precautions: 'जिंक सल्फेट को कभी भी डीएपी (DAP) या फॉस्फोरस युक्त खाद के साथ सीधे न मिलाएं; पहला छिड़काव रोपाई के 15-20 दिन बाद करें।'
  },
  {
    id: 'paddy-bph',
    cropHindi: 'धान (Dhaan / Chawal)',
    cropEnglish: 'Paddy / Rice',
    diseaseHindi: 'भूरा माहू / तेला (Brown Plant Hopper - Nilaparvata lugens)',
    diseaseEnglish: 'Brown Plant Hopper (BPH)',
    category: 'Pest',
    keywords: ['dhaan', 'dhan', 'paddy', 'bph', 'brown plant hopper', 'bhura tela', 'hopper burn', 'ras chusak', 'rice bph'],
    symptoms: ['पौधों के तने के निचले हिस्से पर भूरे कीड़ों का जमावड़ा, पत्तियों का अचानक सूखकर गोलाकार घेरों में गिरना (हॉपर बर्न)'],
    treatmentDosage: 'Pymetrozine 50% WDG @ 0.6 ग्राम प्रति लीटर पानी (120 ग्राम प्रति 200 लीटर पानी प्रति एकड़) अथवा Dinotefuran 20% SG @ 0.4 ग्राम प्रति लीटर पानी (80 ग्राम प्रति एकड़)।',
    precautions: 'स्प्रे का नोजल पौधे के निचले तने की तरफ रखें; खेत से 2-3 दिन के लिए पानी निकाल दें; सिंथेटिक पाइरेथ्रॉइड कीटनाशकों का छिड़काव न करें।'
  },
  {
    id: 'paddy-stem-borer',
    cropHindi: 'धान (Dhaan / Chawal)',
    cropEnglish: 'Paddy / Rice',
    diseaseHindi: 'तना छेदक (Yellow Stem Borer - Scirpophaga incertulas)',
    diseaseEnglish: 'Stem Borer',
    category: 'Pest',
    keywords: ['dhaan', 'dhan', 'paddy', 'stem borer', 'tana chhedak', 'dead heart', 'safed bali', 'white earhead'],
    symptoms: ['कल्ले फूटते समय मध्य कल्ले का सूखना (Dead Heart) तथा बाली निकलते समय सफेद थोथी बाली बनना (White Earhead)'],
    treatmentDosage: 'Chlorantraniliprole 0.4% GR (Ferterra) @ 4 किग्रा प्रति एकड़ अथवा Cartap Hydrochloride 4% GR @ 7.5-10 किग्रा प्रति एकड़ को हल्की बालू में मिलाकर रोपाई के 20-25 दिन बाद बखेरें।',
    precautions: 'खेत में फेरोमोन ट्रैप @ 8 प्रति एकड़ लगाएं; रोपाई के समय पौध की ऊपरी पत्तियों की नोक तोड़ दें ताकि कीट के अंडे नष्ट हो जाएं।'
  },

  // TOMATO / TAMATAR
  {
    id: 'tomato-early-blight',
    cropHindi: 'टमाटर (Tamatar)',
    cropEnglish: 'Tomato',
    diseaseHindi: 'अगेती झुलसा (Early Blight - Alternaria solani)',
    diseaseEnglish: 'Early Blight',
    category: 'Fungal',
    keywords: ['tamatar', 'timatar', 'tamater', 'tomato', 'early blight', 'ageti jhulsa', 'target board', 'chhallenuma dhabba', 'tomato blight'],
    symptoms: ['निचली पत्तियों पर गोल भूरे धब्बे जिनमें संकेंद्री छल्ले (Target board rings) स्पष्ट दिखाई देते हैं'],
    treatmentDosage: 'Mancozeb 75% WP @ 2.5 ग्राम प्रति लीटर पानी या Chlorothalonil 75% WP @ 2 ग्राम प्रति लीटर पानी (400-500 ग्राम प्रति एकड़ 200 लीटर पानी में)।',
    precautions: 'निचली संक्रमित पत्तियों को तोड़कर गड्ढे में दबाएं; पौधों के ऊपर से पानी की फुहार (स्प्रिंकलर) न चलाएं।'
  },
  {
    id: 'tomato-late-blight',
    cropHindi: 'टमाटर (Tamatar)',
    cropEnglish: 'Tomato',
    diseaseHindi: 'पिछेती झुलसा (Late Blight - Phytophthora infestans)',
    diseaseEnglish: 'Late Blight',
    category: 'Fungal',
    keywords: ['tamatar', 'timatar', 'tomato', 'late blight', 'picheti jhulsa', 'kale dhabbe', 'phaphundi', 'tamatar jhulsa', 'tomato rot'],
    symptoms: ['पत्तियों पर गीले पानीदार काले-भूरे धब्बे, नम मौसम में पत्तियों के नीचे सफेद फफूंद, फलों का तेजी से सड़ना'],
    treatmentDosage: 'Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold) @ 2.5 ग्राम प्रति लीटर पानी (500 ग्राम प्रति 200 लीटर पानी प्रति एकड़) अथवा Cymoxanil 8% + Mancozeb 64% WP @ 2 ग्राम प्रति लीटर पानी।',
    precautions: 'ठंडे और अत्यधिक नमी वाले मौसम में रोग अति तीव्र गति से फैलता है, लक्षण दिखते ही तत्काल छिड़काव करें; जल निकासी दुरुस्त रखें।'
  },
  {
    id: 'tomato-leaf-curl',
    cropHindi: 'टमाटर (Tamatar)',
    cropEnglish: 'Tomato',
    diseaseHindi: 'पर्ण कुंचन / लीफ कर्ल वायरस (Tomato Leaf Curl Virus - ToLCV)',
    diseaseEnglish: 'Leaf Curl Virus',
    category: 'Viral',
    keywords: ['tamatar', 'timatar', 'tomato', 'leaf curl', 'leaf curl virus', 'patti mudna', 'patta mudna', 'safed makhi', 'whitefly', 'curly leaves'],
    symptoms: ['पत्तियों का ऊपर या नीचे की ओर मुड़ना, सिकुड़ना, पीला पड़ना और पौधों का झाड़ीनुमा बौना हो जाना'],
    treatmentDosage: 'वाहक सफेद मक्खी (Whitefly) का नियंत्रण करें: Diafenthiuron 50% WP @ 1.25 ग्राम प्रति लीटर पानी या Acetamiprid 20% SP @ 0.5 ग्राम प्रति लीटर पानी या Thiamethoxam 25% WG @ 0.4 ग्राम प्रति लीटर पानी।',
    precautions: 'वायरस प्रभावित पौधों को तुरंत उखाड़कर जला दें या मिट्टी में दबा दें; खेत में पीले चिपचिपे जाल (Yellow Sticky Traps) @ 15 प्रति एकड़ लगाएं।'
  },
  {
    id: 'tomato-fruit-borer',
    cropHindi: 'टमाटर (Tamatar)',
    cropEnglish: 'Tomato',
    diseaseHindi: 'फल छेदक इल्ली (Tomato Fruit Borer - Helicoverpa armigera)',
    diseaseEnglish: 'Fruit Borer',
    category: 'Pest',
    keywords: ['tamatar', 'timatar', 'tomato', 'fruit borer', 'phal chhedak', 'sundi', 'chhedak kida', 'tomato borer', 'hole in tomato'],
    symptoms: ['फलों में गोल छेद होना और अंदर इल्ली द्वारा गूदा खाया जाना'],
    treatmentDosage: 'Chlorantraniliprole 18.5% SC (Coragen) @ 0.35 ml प्रति लीटर पानी (60 ml प्रति 200 लीटर पानी प्रति एकड़) अथवा Emamectin Benzoate 5% SG @ 0.5 ग्राम प्रति लीटर पानी (100 ग्राम प्रति एकड़)।',
    precautions: 'फेरोमोन ट्रैप (Helilure) @ 5-6 प्रति एकड़ लगाएं; फल तुड़ाई से कम से कम 3 दिन पहले रासायनिक कीटनाशक का प्रयोग रोकें।'
  },
  {
    id: 'tomato-bacterial-wilt',
    cropHindi: 'टमाटर (Tamatar)',
    cropEnglish: 'Tomato',
    diseaseHindi: 'जीवाणु विल्ट / मुरझान (Bacterial Wilt - Ralstonia solanacearum)',
    diseaseEnglish: 'Bacterial Wilt',
    category: 'Bacterial',
    keywords: ['tamatar', 'tomato', 'bacterial wilt', 'wilt', 'murjhana', 'akasmik sukhna'],
    symptoms: ['पौधों का हरा रहते हुए ही अचानक दोपहर में मुरझा जाना और शाम को भी ठीक न होना, तने को पानी में डालने पर सफेद दूधिया धागे निकलना'],
    treatmentDosage: 'Copper Oxychloride 50% WP @ 3 ग्राम + Streptocycline @ 0.1 ग्राम प्रति लीटर पानी का घोल बनाकर पौधों की जड़ों के पास ड्रेन्चिंग (Drenching) करें।',
    precautions: 'फसल चक्र अपनाएं (सोलनेसी कुल जैसे बैंगन/आलू के बाद न लगाएं); ट्राइकोडर्मा और स्यूडोमोनास फ्लोरेसेंस से भूमि उपचार करें।'
  },

  // POTATO / ALOO
  {
    id: 'potato-late-blight',
    cropHindi: 'आलू (Aloo)',
    cropEnglish: 'Potato',
    diseaseHindi: 'पिछेती झुलसा (Late Blight - Phytophthora infestans)',
    diseaseEnglish: 'Late Blight of Potato',
    category: 'Fungal',
    keywords: ['aloo', 'alu', 'aaloo', 'potato', 'late blight', 'picheti jhulsa', 'aloo jhulsa', 'sadan', 'potato blight', 'potato disease'],
    symptoms: ['पत्तियों की नोक और किनारों पर जलसिक्त अनियमित काले धब्बे, कोहरे में तेजी से फैलना और पत्तों का झुलस जाना'],
    treatmentDosage: 'रोकथाम हेतु: Mancozeb 75% WP @ 2.5 ग्राम/लीटर। रोग आने पर: Dimethomorph 50% WP @ 1 ग्राम + Mancozeb @ 2 ग्राम प्रति लीटर पानी (200 ग्राम Dimethomorph + 400 ग्राम Mancozeb प्रति 200 लीटर पानी प्रति एकड़)।',
    precautions: 'कोहरा और बादल छाए रहने पर बिना लक्षण के भी सुरक्षात्मक स्प्रे करें; संक्रमित कंदों को बीज के रूप में न लगाएं।'
  },
  {
    id: 'potato-early-blight',
    cropHindi: 'आलू (Aloo)',
    cropEnglish: 'Potato',
    diseaseHindi: 'अगेती झुलसा (Early Blight - Alternaria solani)',
    diseaseEnglish: 'Early Blight of Potato',
    category: 'Fungal',
    keywords: ['aloo', 'alu', 'potato', 'early blight', 'ageti jhulsa', 'chhallenuma dhabba'],
    symptoms: ['पत्तियों पर संकेंद्री छल्लेदार (Concentric rings) गोल भूरे धब्बे, पत्तियां पीली पड़कर सूखना'],
    treatmentDosage: 'Chlorothalonil 75% WP @ 2 ग्राम प्रति लीटर पानी (400 ग्राम प्रति 200 लीटर पानी प्रति एकड़) या Propineb 70% WP @ 2.5 ग्राम प्रति लीटर पानी।',
    precautions: 'फसल में नाइट्रोजन व पोटाश का संतुलित प्रयोग करें; पुरानी सूखी पत्तियों को खेत से निकालें।'
  },
  {
    id: 'potato-black-scurf',
    cropHindi: 'आलू (Aloo)',
    cropEnglish: 'Potato',
    diseaseHindi: 'काली रूसी / ब्लैक स्कर्फ (Black Scurf - Rhizoctonia solani)',
    diseaseEnglish: 'Black Scurf',
    category: 'Fungal',
    keywords: ['aloo', 'alu', 'aaloo', 'potato', 'black scurf', 'kali rusi', 'chhilke par kala dhabba', 'scurf'],
    symptoms: ['आलू के कंदों के छिलके पर काले रंग की पपड़ी या खुरदरी गांठें बन जाना जो धोने पर नहीं छूटती'],
    treatmentDosage: 'बुवाई पूर्व कंद उपचार: Moncut (Flutolanil 40% SC) @ 1.25 ml प्रति लीटर पानी या Pencycuron 22.9% SC @ 2 ml प्रति लीटर पानी में 10 मिनट डुबोकर छाया में सुखाएं।',
    precautions: 'कच्ची गोबर की खाद न डालें; फसल चक्र अपनाएं; खेत में ट्राइकोडर्मा विरिडी 2.5 किग्रा प्रति एकड़ गोबर की खाद में मिलाकर डालें।'
  },

  // COTTON / KAPAS
  {
    id: 'cotton-pink-bollworm',
    cropHindi: 'कपास (Kapas)',
    cropEnglish: 'Cotton',
    diseaseHindi: 'गुलाबी सुंडी (Pink Bollworm - Pectinophora gossypiella)',
    diseaseEnglish: 'Pink Bollworm',
    category: 'Pest',
    keywords: ['kapas', 'kapaas', 'cotton', 'pink bollworm', 'gulabi sundi', 'tiddi', 'rosetted flower', 'bollworm'],
    symptoms: ['फूलों का बंद होकर गुलाब की कली जैसा (Rosetted flower) बन जाना, टिंडों के अंदर सुंडी का बीजों और रुई को खाना'],
    treatmentDosage: 'Profenofos 50% EC @ 2 ml प्रति लीटर पानी (400 ml प्रति एकड़) अथवा Spinetoram 11.7% SC @ 1 ml प्रति लीटर पानी (170-200 ml प्रति एकड़)।',
    precautions: 'खेत में गुलाबी सुंडी फेरोमोन ट्रैप @ 8 प्रति एकड़ लगाएं; प्रभावित टिंडों व कलियों को तोड़कर नष्ट करें।'
  },
  {
    id: 'cotton-whitefly',
    cropHindi: 'कपास (Kapas)',
    cropEnglish: 'Cotton',
    diseaseHindi: 'सफेद मक्खी (Whitefly - Bemisia tabaci)',
    diseaseEnglish: 'Whitefly',
    category: 'Pest',
    keywords: ['kapas', 'cotton', 'whitefly', 'safed makhi', 'chitiya', 'kali phaphund', 'cotton whitefly'],
    symptoms: ['पत्तियों के नीचे सफेद मक्खियों का झुंड, पत्तियों का पीला पड़ना और मधुबिंदु स्राव के कारण काली फफूंद जमना'],
    treatmentDosage: 'Pyriproxyfen 10% + Bifenthrin 10% EC @ 2 ml प्रति लीटर पानी (400 ml प्रति 200 लीटर पानी प्रति एकड़) या Afidopyropen 50 g/L DC @ 2 ml प्रति लीटर पानी।',
    precautions: 'सिंथेटिक कीटनाशकों का अंधाधुंध छिड़काव न करें; पीले स्टिकी कार्ड लगाएं; खेत की मेड़ों से खरपतवार हटाएं।'
  },
  {
    id: 'cotton-leaf-curl',
    cropHindi: 'कपास (Kapas)',
    cropEnglish: 'Cotton',
    diseaseHindi: 'कपास लीफ कर्ल वायरस (Cotton Leaf Curl Virus - CLCuV)',
    diseaseEnglish: 'Cotton Leaf Curl Virus',
    category: 'Viral',
    keywords: ['kapas', 'cotton', 'leaf curl', 'clcuv', 'enation', 'safed makhi'],
    symptoms: ['पत्तियों की शिराओं का मोटा होना, पत्तियां प्याले के आकार में मुड़ना और पत्तियों के नीचे छोटी-छोटी पत्ती जैसी वृद्धि (Enation) बनना'],
    treatmentDosage: 'सफेद मक्खी का नियंत्रण करें: Diafenthiuron 50% WP @ 1.25 ग्राम प्रति लीटर पानी या Flonicamid 50% WG @ 0.4 ग्राम प्रति लीटर पानी (80 ग्राम प्रति एकड़)।',
    precautions: 'प्रमाणित रोगरोधी बीटी किस्में ही लगाएं; संक्रमित पौधों को प्रारंभिक अवस्था में उखाड़कर नष्ट करें।'
  },

  // MUSTARD / SARSON
  {
    id: 'mustard-white-rust',
    cropHindi: 'सरसों (Sarson / Raai)',
    cropEnglish: 'Mustard',
    diseaseHindi: 'सफेद रतुआ (White Rust - Albugo candida)',
    diseaseEnglish: 'White Rust',
    category: 'Fungal',
    keywords: ['sarson', 'sarso', 'mustard', 'raai', 'rai', 'white rust', 'safed ratuwa', 'safed phaphund', 'staghead'],
    symptoms: ['पत्तियों की निचली सतह पर सफेद या मलाईदार रंग के उभरे हुए फफोले, तने व फूलों का विकृत व मोटा हो जाना (Staghead)'],
    treatmentDosage: 'Metalaxyl 35% WS @ 6 ग्राम प्रति किग्रा बीज उपचार। खड़ी फसल में: Ridomil MZ (Metalaxyl 8% + Mancozeb 64% WP) @ 2 ग्राम प्रति लीटर पानी (400-500 ग्राम प्रति एकड़)।',
    precautions: 'रोग प्रतिरोधी किस्में लगाएं; समय पर बुवाई (15 से 30 अक्टूबर) करें; पछेती बुवाई में यह रोग बहुत अधिक आता है।'
  },
  {
    id: 'mustard-aphid',
    cropHindi: 'सरसों (Sarson / Raai)',
    cropEnglish: 'Mustard',
    diseaseHindi: 'माहू / मोयला / चेंपा (Mustard Aphid - Lipaphis erysimi)',
    diseaseEnglish: 'Mustard Aphid',
    category: 'Pest',
    keywords: ['sarson', 'sarso', 'mustard', 'aphid', 'mahu', 'chepa', 'moyla', 'har-bhure kide', 'mustard pest'],
    symptoms: ['टहनियों, पत्तियों और फलियों पर हरे-भूरे छोटे चिपचिपे कीड़ों का झुंड जो रस चूसकर पौधों को सुखा देते हैं'],
    treatmentDosage: 'Dimethoate 30% EC (Rogor) @ 1.5 ml प्रति लीटर पानी (300 ml प्रति 200 लीटर पानी प्रति एकड़) अथवा Imidacloprid 17.8% SL @ 0.5 ml प्रति लीटर पानी (100 ml प्रति एकड़)।',
    precautions: 'छिड़काव शाम के समय करें ताकि मधुमक्खियों को नुकसान न पहुंचे; बादल छाए रहने पर निरंतर निरीक्षण करें।'
  },

  // CHILLI / MIRCH
  {
    id: 'chilli-thrips-mites',
    cropHindi: 'मिर्च (Mirch)',
    cropEnglish: 'Chilli',
    diseaseHindi: 'थ्रिप्स व माइट / मरोड़िया रोग (Chilli Murda / Churda Complex)',
    diseaseEnglish: 'Thrips and Mites (Chilli Leaf Curl)',
    category: 'Pest',
    keywords: ['mirch', 'mirchi', 'chilli', 'chili', 'thrips', 'mite', 'murda', 'churda', 'churda murda', 'boat shaped leaves', 'leaf curl in chilli'],
    symptoms: ['थ्रिप्स से पत्तियां ऊपर नाव की तरह मुड़ती हैं; माइट से पत्तियां नीचे की ओर उल्टी मुड़ती हैं और मोटी चमड़े जैसी हो जाती हैं'],
    treatmentDosage: 'थ्रिप्स हेतु: Fipronil 5% SC @ 2 ml/लीटर पानी। माइट हेतु: Spiromesifen 22.9% SC @ 1 ml/लीटर पानी या Fenpyroximate 5% EC @ 1.5 ml प्रति लीटर पानी (200-300 ml प्रति एकड़)।',
    precautions: 'थ्रिप्स और माइट दोनों के लिए बारी-बारी से कीटनाशक बदलें; नीले व पीले स्टिकी ट्रैप @ 20 प्रति एकड़ लगाएं।'
  },
  {
    id: 'chilli-anthracnose',
    cropHindi: 'मिर्च (Mirch)',
    cropEnglish: 'Chilli',
    diseaseHindi: 'फल सड़न / एंथ्रेक्नोज (Anthracnose / Dieback - Colletotrichum capsici)',
    diseaseEnglish: 'Anthracnose / Fruit Rot',
    category: 'Fungal',
    keywords: ['mirch', 'mirchi', 'chilli', 'anthracnose', 'dieback', 'phal sadan', 'shakha sukhna', 'chilli rot'],
    symptoms: ['पके व कच्चे फलों पर गोल धंसे हुए काले-भूरे धब्बे, टहनियों का ऊपर से नीचे की ओर सूखना (डाईबैक)'],
    treatmentDosage: 'Azoxystrobin 23% SC @ 1 ml प्रति लीटर पानी (200 ml प्रति एकड़) या Copper Oxychloride 50% WP @ 2.5 ग्राम प्रति लीटर पानी।',
    precautions: 'संक्रमित फलों को तोड़कर नष्ट करें; बीज शोधन Thiram @ 3 ग्राम प्रति किग्रा से अवश्य करें।'
  },

  // SUGARCANE / GANNA
  {
    id: 'sugarcane-red-rot',
    cropHindi: 'गन्ना (Ganna)',
    cropEnglish: 'Sugarcane',
    diseaseHindi: 'लाल सड़न / रेड रॉट (Red Rot - Colletotrichum falcatum)',
    diseaseEnglish: 'Red Rot',
    category: 'Fungal',
    keywords: ['ganna', 'sugarcane', 'red rot', 'laal sadan', 'ganna sukha', 'alkahalik badbu', 'sugar cane'],
    symptoms: ['गन्ने के तने को चीरने पर अंदर का गूदा लाल दिखाई देना जिसमें सफेद आड़ी पट्टियां हों और सिरके जैसी खट्टी गंध आना'],
    treatmentDosage: 'बीज शोधन: Carbendazim 50% WP @ 2 ग्राम प्रति लीटर पानी में गन्ने के टुकड़ों को 15 मिनट डुबोकर बोएं। खड़ी फसल में रोगग्रस्त पौधों को जड़ सहित उखाड़कर गड्ढे में ब्लीचिंग पाउडर डालकर दबाएं।',
    precautions: 'यह गन्ने का कैंसर कहलाता है; खड़ी फसल में इसका कोई 100% रासायनिक इलाज नहीं है; लाल सड़न प्रभावित खेत से कभी भी बीज न लें।'
  },

  // MAIZE / MAKKA
  {
    id: 'maize-fall-armyworm',
    cropHindi: 'मक्का (Makka)',
    cropEnglish: 'Maize / Corn',
    diseaseHindi: 'फॉल आर्मीवर्म / सैनिक सुंडी (Fall Armyworm - Spodoptera frugiperda)',
    diseaseEnglish: 'Fall Armyworm (FAW)',
    category: 'Pest',
    keywords: ['makka', 'makai', 'maize', 'corn', 'fall armyworm', 'faw', 'sainik sundi', 'gobbh me kida', 'armyworm'],
    symptoms: ['मक्के की गोभ (Whorl) में इल्ली का छिपकर खाना, पत्तियों पर बड़े-बड़े कटे हुए छेद और लकड़ी के बुरादे जैसा मल भरा होना'],
    treatmentDosage: 'Chlorantraniliprole 18.5% SC @ 0.4 ml प्रति लीटर पानी (80 ml प्रति एकड़) अथवा Spinetoram 11.7% SC @ 0.5 ml प्रति लीटर पानी को सीधे पौधों की गोभ के अंदर स्प्रे करें।',
    precautions: 'स्प्रे की धार सीधे पौधे के चक्र (Whorl/गोभ) में पहुंचनी चाहिए; सुंडी बड़ी होने से पहले ही (प्रथम 15-20 दिनों में) छिड़काव करें।'
  },

  // GRAM / CHANA
  {
    id: 'gram-wilt',
    cropHindi: 'चना (Chana)',
    cropEnglish: 'Chickpea / Gram',
    diseaseHindi: 'उकठा रोग / विल्ट (Fusarium Wilt - Fusarium oxysporum f. sp. ciceris)',
    diseaseEnglish: 'Fusarium Wilt',
    category: 'Fungal',
    keywords: ['chana', 'gram', 'chickpea', 'ukhta', 'wilt', 'chana sukhna', 'kale reshe'],
    symptoms: ['पौधों का हरा रहते हुए ही अचानक मुरझाकर सूख जाना, मुख्य जड़ को लंबवत चीरने पर अंदर संवहनी नलिकाओं का काला/भूरा दिखाई देना'],
    treatmentDosage: 'बुवाई पूर्व बीज उपचार: Trichoderma viride @ 10 ग्राम प्रति किग्रा बीज या Carbendazim 50% WP @ 2 ग्राम प्रति किग्रा बीज। भूमि शोधन: Trichoderma @ 2.5 किग्रा प्रति एकड़ 100 किग्रा सड़ी गोबर खाद में मिलाकर।',
    precautions: 'गर्म मौसम में गहरी बुवाई से बचें; 3-4 वर्षीय फसल चक्र अपनाएं; रोगरोधी किस्में (जैसे JG 11, RVG 202) ही लगाएं।'
  },
  {
    id: 'gram-pod-borer',
    cropHindi: 'चना (Chana)',
    cropEnglish: 'Chickpea / Gram',
    diseaseHindi: 'घाटी छेदक / फली छेदक (Gram Pod Borer - Helicoverpa armigera)',
    diseaseEnglish: 'Pod Borer',
    category: 'Pest',
    keywords: ['chana', 'gram', 'pod borer', 'ghati chhedak', 'fali chhedak', 'sundi'],
    symptoms: ['चने की फलियों में गोल छेद और दानों को खाया जाना, सुंडी का आधा शरीर फली के अंदर और आधा बाहर लटकना'],
    treatmentDosage: 'Emamectin Benzoate 5% SG @ 0.5 ग्राम प्रति लीटर पानी (100 ग्राम प्रति 200 लीटर पानी प्रति एकड़) या Indoxacarb 14.5% SC @ 1 ml प्रति लीटर पानी (200 ml प्रति एकड़)।',
    precautions: 'फूल आने के समय खेत में पक्षी बैठका (T-shaped Bird Perches) @ 20 प्रति एकड़ लगाएं; फेरोमोन ट्रैप @ 5 प्रति एकड़ लगाएं।'
  },

  // SOYBEAN
  {
    id: 'soybean-yellow-mosaic',
    cropHindi: 'सोयाबीन (Soybean)',
    cropEnglish: 'Soybean',
    diseaseHindi: 'पीला मोजेक वायरस (Yellow Mosaic Virus - YMV)',
    diseaseEnglish: 'Yellow Mosaic Virus',
    category: 'Viral',
    keywords: ['soybean', 'yellow mosaic', 'ymv', 'pila rog', 'safed makhi', 'soyabean'],
    symptoms: ['पत्तियों पर चमकीले पीले और हरे रंग के चितकबरे धब्बे, नई पत्तियों का पूरी तरह पीला पड़ जाना'],
    treatmentDosage: 'रोग फैलाने वाली सफेद मक्खी का नियंत्रण: Thiamethoxam 12.6% + Lambda Cyhalothrin 9.5% ZC @ 0.5 ml प्रति लीटर पानी (100-125 ml प्रति 200 लीटर पानी प्रति एकड़)।',
    precautions: 'संक्रमित पौधों को तुरंत उखाड़कर नष्ट करें; अनुशंसित प्रतिरोधी किस्में (JS 20-34, JS 20-29 आदि) ही बोएं।'
  },

  // MANGO / AAM
  {
    id: 'mango-powdery-mildew',
    cropHindi: 'आम (Aam)',
    cropEnglish: 'Mango',
    diseaseHindi: 'चूर्णिल आसिता / दहिया रोग (Powdery Mildew - Oidium mangiferae)',
    diseaseEnglish: 'Powdery Mildew',
    category: 'Fungal',
    keywords: ['aam', 'mango', 'powdery mildew', 'dahiya', 'bhabha', 'safed powder', 'mor jhadna', 'mango flower drop'],
    symptoms: ['बौर (Inflorescence) और नई पत्तियों पर सफेद चूर्ण जम जाना, बौर का सूखकर काले होकर झड़ जाना'],
    treatmentDosage: 'Hexaconazole 5% EC @ 1 ml प्रति लीटर पानी अथवा घुलनशील गंधक (Wettable Sulphur 80% WP) @ 2-3 ग्राम प्रति लीटर पानी का बौर खिलने से पहले छिड़काव करें।',
    precautions: 'फूल पूरी तरह खिलने (Full bloom) के दौरान तेज रसायनों का छिड़काव न करें ताकि परागण करने वाले कीट सुरक्षित रहें।'
  },

  // ONION / PYAAZ
  {
    id: 'onion-purple-blotch',
    cropHindi: 'प्याज (Pyaaz)',
    cropEnglish: 'Onion',
    diseaseHindi: 'बैंगनी धब्बा रोग (Purple Blotch - Alternaria porri)',
    diseaseEnglish: 'Purple Blotch',
    category: 'Fungal',
    keywords: ['pyaaz', 'pyaj', 'onion', 'purple blotch', 'baingani dhabba', 'pyaaz jhulsa'],
    symptoms: ['पत्तियों पर छोटे पानीदार धब्बे जो बाद में गहरे बैंगनी रंग के हो जाते हैं जिनके किनारे लाल या पीले होते हैं'],
    treatmentDosage: 'Mancozeb 75% WP @ 2.5 ग्राम प्रति लीटर पानी + स्टीकर (Sticker/Adjuvant) @ 0.5 ml प्रति लीटर पानी या Tebuconazole 25.9% EC @ 1 ml प्रति लीटर पानी।',
    precautions: 'प्याज की पत्तियां मोमयुक्त और चिकनी होती हैं, इसलिए दवा में स्टीकर या चिपकाने वाला पदार्थ (Sticker) अवश्य मिलाएं।'
  },

  // ROSE / GULAAB
  {
    id: 'rose-black-spot',
    cropHindi: 'गुलाब (Rose / Gulaab)',
    cropEnglish: 'Rose',
    diseaseHindi: 'काला धब्बा रोग (Black Spot - Diplocarpon rosae)',
    diseaseEnglish: 'Black Spot of Rose',
    category: 'Fungal',
    keywords: ['rose', 'gulaab', 'gulab', 'black spot', 'kala dhabba', 'kala dhabba rog', 'diplocarpon rosae', 'rose leaf spot'],
    symptoms: ['पत्तियों की ऊपरी सतह पर गोल या अनियमित काले धब्बे जिनके किनारे पंखनुमा होते हैं, पत्तियां पीली पड़कर गिरना'],
    treatmentDosage: 'Carbendazim 12% + Mancozeb 63% WP (SAAF) @ 2 ग्राम प्रति लीटर पानी या Propiconazole 25% EC @ 1 ml प्रति लीटर पानी का 10-14 दिन के अंतराल पर छिड़काव करें।',
    precautions: 'संक्रमित व गिरी हुई पत्तियों को इकट्ठा कर जलाएं; पौधों के ऊपर से पानी न डालें (पानी सीधे तने/जड़ में दें); झाड़ी की छंटाई कर वायु संचार दुरुस्त रखें।'
  },
  {
    id: 'rose-dieback',
    cropHindi: 'गुलाब (Rose / Gulaab)',
    cropEnglish: 'Rose',
    diseaseHindi: 'डाईबैक / टहनी सूखना (Dieback - Colletotrichum gloeosporioides)',
    diseaseEnglish: 'Dieback of Rose',
    category: 'Fungal',
    keywords: ['rose', 'gulab', 'gulaab', 'dieback', 'shakha sukhna', 'rose dieback'],
    symptoms: ['छंटाई के बाद टहनियों का ऊपर से नीचे की ओर काला होकर सूखना'],
    treatmentDosage: 'सूखी टहनी को 2 इंच नीचे से काटकर कटे भाग पर कॉपर ऑक्सीक्लोराइड 50% WP (Blitox) का लेप लगाएं व 2.5 ग्राम/लीटर का स्प्रे करें।',
    precautions: 'छंटाई हमेशा तेज व रोगाणुरहित औजार से 45 डिग्री कोण पर करें; छंटाई के तुरंत बाद फफूंदनाशी का लेप लगाएं।'
  },

  // LEMON / CITRUS / NIMBU
  {
    id: 'lemon-citrus-canker',
    cropHindi: 'नींबू (Lemon / Citrus)',
    cropEnglish: 'Lemon',
    diseaseHindi: 'सिट्रस कैंकर (Citrus Canker - Xanthomonas axonopodis pv. citri)',
    diseaseEnglish: 'Citrus Canker',
    category: 'Bacterial',
    keywords: ['nimbu', 'lemon', 'citrus', 'citrus canker', 'nimbu khurand', 'canker'],
    symptoms: ['पत्तियों, टहनियों और फलों पर खुरदरे भूरे उभरे हुए दानेदार धब्बे जिनके चारों ओर पीला घेरा (Yellow halo) होता है'],
    treatmentDosage: 'Copper Oxychloride 50% WP @ 2.5 ग्राम + Streptocycline @ 0.05 ग्राम प्रति लीटर पानी (500 ग्राम COC + 10 ग्राम स्ट्रेप्टोसाइक्लिन प्रति 200 लीटर पानी) का छिड़काव करें।',
    precautions: 'संक्रमित टहनियों को काटकर नष्ट करें; लीफ माइनर कीट का नियंत्रण करें क्योंकि वह बैक्टीरिया के प्रवेश का मुख्य माध्यम है।'
  },

  // GUAVA / AMROOD
  {
    id: 'guava-wilt',
    cropHindi: 'अमरूद (Guava / Amrood)',
    cropEnglish: 'Guava',
    diseaseHindi: 'उकठा रोग / विल्ट (Guava Wilt - Fusarium oxysporum f. sp. psidii)',
    diseaseEnglish: 'Guava Wilt',
    category: 'Fungal',
    keywords: ['amrood', 'amrud', 'guava', 'guava wilt', 'amrood ukhta', 'wilt'],
    symptoms: ['पौधों का हरा रहते हुए या पत्तियां पीली पड़कर अचानक मुरझाना और पूरा पेड़ सूख जाना'],
    treatmentDosage: 'जड़ों के पास Carbendazim 50% WP @ 2 ग्राम प्रति लीटर पानी की दर से ड्रेन्चिंग करें या Trichoderma viride @ 50 ग्राम प्रति पेड़ गोबर खाद में मिलाकर दें।',
    precautions: 'जलभराव से बचें; रोगग्रस्त पेड़ को जड़ सहित उखाड़कर ब्लीचिंग पाउडर डालकर गड्ढा भरें।'
  },

  // BRINJAL / BAINGAN
  {
    id: 'brinjal-shoot-fruit-borer',
    cropHindi: 'बैंगन (Baingan)',
    cropEnglish: 'Brinjal / Eggplant',
    diseaseHindi: 'तना एवं फल छेदक (Shoot and Fruit Borer - Leucinodes orbonalis)',
    diseaseEnglish: 'Shoot and Fruit Borer',
    category: 'Pest',
    keywords: ['baingan', 'brinjal', 'eggplant', 'shoot and fruit borer', 'tana chhedak', 'phal chhedak', 'muda hua tana'],
    symptoms: ['शुरुआत में पौधे की ऊपरी कोमल टहनी का मुरझाकर लटक जाना, बाद में फलों में छेद और मल का बाहर निकलना'],
    treatmentDosage: 'Chlorantraniliprole 18.5% SC @ 0.4 ml प्रति लीटर पानी (80 ml प्रति 200 लीटर पानी प्रति एकड़) या Emamectin Benzoate 5% SG @ 0.4 ग्राम प्रति लीटर पानी।',
    precautions: 'मुरझाई हुई शाखाओं को 2 इंच नीचे से कैंची से काटकर नष्ट करें; ल्यूसिनोड्स फेरोमोन ट्रैप @ 12 प्रति एकड़ लगाएं।'
  },

  // SOIL DEFICIENCIES / URVARAK DISORDERS
  {
    id: 'soil-nitrogen-deficiency',
    cropHindi: 'सभी फसलें (All Crops)',
    cropEnglish: 'All Crops',
    diseaseHindi: 'नाइट्रोजन की कमी (Nitrogen Deficiency)',
    diseaseEnglish: 'Nitrogen Deficiency',
    category: 'Soil',
    keywords: ['nitrogen', 'urea', 'pili patti', 'purani patti pili', 'v shaped yellowing', 'soil deficiency', 'khad kami'],
    symptoms: ['निचली पुरानी पत्तियों की नोक से शुरू होकर मध्य शिरा की ओर V-आकार में पीलापन, पौधों का विकास रुकना'],
    treatmentDosage: 'यूरिया (46% N) @ 25-30 किग्रा प्रति एकड़ सिंचाई के समय बखेरें (Top dressing) अथवा आपातकालीन अवस्था में 2% यूरिया (20 ग्राम प्रति लीटर पानी) का पत्तियों पर छिड़काव करें।',
    precautions: 'खेत में पर्याप्त नमी होने पर ही यूरिया बखेरें; अत्यधिक यूरिया से रसचूसक कीटों और फफूंद जनित रोगों का प्रकोप बढ़ जाता है।'
  },
  {
    id: 'soil-iron-deficiency',
    cropHindi: 'सभी फसलें / मूंगफली / गन्ना / धान',
    cropEnglish: 'All Crops / Groundnut / Sugarcane / Paddy',
    diseaseHindi: 'आयरन / लोहे की कमी (Iron Chlorosis)',
    diseaseEnglish: 'Iron Chlorosis',
    category: 'Soil',
    keywords: ['iron', 'loha', 'iron chlorosis', 'safed patti', 'nayi patti pili', 'chuna mitti'],
    symptoms: ['नई कोमल पत्तियों की शिराओं के बीच का भाग पीला या लगभग सफेद हो जाना जबकि शिराएं हल्की हरी रहती हैं'],
    treatmentDosage: 'Ferrous Sulphate (FeSO4 19% Fe) @ 5 ग्राम + 1 ग्राम साइट्रिक एसिड (नींबू सत्व) प्रति लीटर पानी (1 किग्रा FeSO4 + 200 ग्राम साइट्रिक एसिड प्रति 200 लीटर पानी प्रति एकड़) का छिड़काव करें।',
    precautions: 'चूनेदार व क्षारीय (High pH) मिट्टी में भूमि उपचार के बजाय पत्तियों पर पर्णीय छिड़काव (Foliar spray) ही सबसे प्रभावी होता है।'
  },
  {
    id: 'soil-saline-alkaline',
    cropHindi: 'मृदा सुधार (Soil Reclamation)',
    cropEnglish: 'Soil Reclamation',
    diseaseHindi: 'ऊसर / क्षारीय मृदा विकार (Alkaline / Sodic Soil - High pH > 8.5)',
    diseaseEnglish: 'Alkaline Soil (Usar)',
    category: 'Soil',
    keywords: ['usar', 'khari mitti', 'gypsum', 'sodic soil', 'chuna', 'safed parat', 'saline'],
    symptoms: ['मिट्टी की सतह पर सफेद लवण की परत जमना, पानी का नीचे न रिसना, बीजों का अंकुरण न होना या पौधों का जल जाना'],
    treatmentDosage: 'मिट्टी परीक्षण के अनुसार कृषि जिप्सम (Gypsum - CaSO4.2H2O) @ 1.5 से 2.5 टन (1500-2500 किग्रा) प्रति एकड़ जुताई के समय समान रूप से मिलाकर 15 दिन तक खेत में पानी भरकर रखें।',
    precautions: 'जिप्सम डालने के बाद खेत में जलनिकासी (Leaching) की व्यवस्था रखें; इसके बाद ढैंचा (Green manure) की फसल लगाकर हरी खाद दें।'
  }
];

// Common typo & transliteration dictionary (both Latin and Devanagari Hindi)
const SYNONYM_MAP: Record<string, string> = {
  // Common typo / English terms
  'desies': 'disease',
  'diesease': 'disease',
  'deasease': 'disease',
  'disese': 'disease',
  'bimari': 'disease',
  'beemari': 'disease',
  'rog': 'disease',
  'dawai': 'treatment',
  'dawae': 'treatment',
  'ilaj': 'treatment',
  
  // Latin crops
  'gulab': 'rose',
  'gulaab': 'rose',
  'rose': 'rose',
  'amrood': 'guava',
  'amrud': 'guava',
  'nimbu': 'lemon',
  'aalu': 'potato',
  'aaloo': 'potato',
  'alu': 'potato',
  'patato': 'potato',
  'tamater': 'tomato',
  'timatar': 'tomato',
  'timator': 'tomato',
  'gehoon': 'wheat',
  'gehun': 'wheat',
  'dhan': 'paddy',
  'chawal': 'paddy',
  'mirchi': 'chilli',
  'chili': 'chilli',
  'sarso': 'mustard',
  'rai': 'mustard',
  'makai': 'maize',
  'corn': 'maize',
  'kapaas': 'cotton',
  'kapas': 'cotton',
  'pyaj': 'onion',
  'pyaaz': 'onion',
  'baingan': 'brinjal',
  'chana': 'gram',
  'ganna': 'sugarcane',
  'soyabean': 'soybean',
  'aam': 'mango',

  // Devanagari Hindi crops
  'गुलाब': 'rose',
  'गेहूं': 'wheat',
  'गेहू': 'wheat',
  'धान': 'paddy',
  'चावल': 'paddy',
  'टमाटर': 'tomato',
  'आलू': 'potato',
  'कपास': 'cotton',
  'मिर्च': 'chilli',
  'सरसों': 'mustard',
  'राई': 'mustard',
  'मक्का': 'maize',
  'चना': 'gram',
  'गन्ना': 'sugarcane',
  'सोयाबीन': 'soybean',
  'आम': 'mango',
  'प्याज': 'onion',
  'प्याज़': 'onion',
  'बैंगन': 'brinjal',
  'नींबू': 'lemon',
  'अमरूद': 'guava',

  // Descriptors
  'peela': 'yellow',
  'pila': 'yellow',
  'पीला': 'yellow',
  'safed': 'white',
  'सफेद': 'white',
  'bhura': 'brown',
  'भूरा': 'brown',
  'kala': 'black',
  'काला': 'black',
  'sundi': 'borer',
  'सुंडी': 'borer',
  'keeda': 'pest',
  'कीड़ा': 'pest',
  'kida': 'pest',
  'illii': 'caterpillar'
};

function normalizeQuery(raw: string): string {
  let cleaned = raw.toLowerCase().trim();
  const words = cleaned.split(/[\s,+/_\-()]+/).filter(Boolean);
  const normalized = words.map(w => SYNONYM_MAP[w] || w);
  return normalized.join(' ');
}

export function searchVerifiedAgriRecords(query: string): VerifiedAgriRecord[] {
  if (!query || !query.trim()) return [];
  const q = normalizeQuery(query);
  const rawQ = query.toLowerCase().trim();
  const words = q.split(' ').filter(w => w.length >= 2);

  // Check if query specifically mentions a known crop
  const allKnownCrops = Array.from(new Set(VERIFIED_AGRI_DATABASE.map(r => r.cropEnglish.toLowerCase())));
  const mentionedCrop = allKnownCrops.find(c => {
    const single = c.split('/')[0].trim();
    return q.includes(single) || rawQ.includes(single);
  });

  const scored = VERIFIED_AGRI_DATABASE.map(record => {
    let score = 0;
    const cropEng = record.cropEnglish.toLowerCase();
    const cropHin = record.cropHindi.toLowerCase();

    // If query mentioned a specific crop, filter out completely unrelated crops
    if (mentionedCrop && !cropEng.includes(mentionedCrop) && !cropHin.includes(mentionedCrop)) {
      return { record, score: -1 };
    }

    const allKeywords = [
      ...record.keywords,
      cropEng,
      cropHin,
      record.diseaseEnglish.toLowerCase(),
      record.diseaseHindi.toLowerCase()
    ];

    // Direct match with record id or normalized query or raw query
    if (record.id === rawQ || record.id === q) score += 120;
    if (allKeywords.some(k => k === rawQ || k === q)) score += 60;
    if (allKeywords.some(k => rawQ.includes(k) && k.length > 4)) score += 35;
    if (allKeywords.some(k => q.includes(k) && k.length > 4)) score += 30;

    // Direct match on crop name itself gets highest priority
    if (cropEng.includes(q) || q.includes(cropEng.split('/')[0].trim())) score += 80;
    if (cropHin.includes(rawQ) || rawQ.includes(cropHin.split('(')[0].trim())) score += 80;

    // Word by word matching
    for (const w of words) {
      if (['disease', 'treatment', 'black', 'white', 'yellow', 'brown', 'spot', 'rog', 'dhabba'].includes(w)) {
        // Generic descriptor words get low weight
        if (allKeywords.some(k => k.includes(w))) score += 2;
      } else {
        if (cropEng.includes(w) || cropHin.includes(w)) {
          score += 40; // Crop word match gets high weight
        } else if (allKeywords.some(k => k.includes(w))) {
          score += 15;
        }
      }
    }

    return { record, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.record);
}

export function lookupVerifiedAgriRecord(query: string): VerifiedAgriRecord | null {
  const matches = searchVerifiedAgriRecords(query);
  return matches.length > 0 ? matches[0] : null;
}

export function formatAgriOutput(record: VerifiedAgriRecord): string {
  return [
    `- Paudha (Plant): ${record.cropHindi} [${record.cropEnglish}]`,
    `- Bimari (Disease): ${record.diseaseHindi}`,
    `- Ilaaj aur Dawai (Treatment & Dosage): ${record.treatmentDosage}`,
    `- Savdhani (Precautions): ${record.precautions}`
  ].join('\n');
}

export const NOT_FOUND_TEXT = 'Sateek data uplabdh nahi hai.';
export const STRICT_DATA_NOT_FOUND = 'Data not found in verified records.';

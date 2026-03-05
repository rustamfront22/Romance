import { computed, ref } from "vue";

export function useI18n() {
    const girlName = "Guli";
    const lang = ref("ru");

    const t = computed(() => {
        const tr = translations[lang.value];
        return {
            ...tr,
            girlName,
        };
    });

    function setLang(code) {
        lang.value = code;
        localStorage.setItem("gift_lang", code);
    }

    function initLang() {
        const saved = localStorage.getItem("gift_lang");
        if (saved === "ru" || saved === "uz") lang.value = saved;
    }

    return { lang, t, setLang, initLang };
}

const translations = {
    ru: {
        mini: "8 марта сюрприз",
        open: "Открыть сюрприз 💝",
        next: "Дальше",
        back: "Назад",
        goQuiz: "Начать игру 🌸",
        goLetter: "Открыть письмо 💌",
        goGallery: "Наши моменты 📸",
        goReasons: "Почему ты особенная ✨",
        goGift: "Подарок 🎁",
        tip: "Нажимай смело — тут всё сделано с теплом.",
        introTitle: "Только для Guli 💞",
        introSub: "Маленький сайт-подарок. Открой и улыбнись 🙂",
        letterTitle: "Письмо для тебя 💌",
        galleryTitle: "Moments 📸",
        reasonsTitle: "Почему ты особенная ✨",
        giftTitle: "Твой подарок 🎁",
        finalBig: "С 8 марта, Guli 💗",
        finalSmall: "Пусть весна принесёт тебе счастье и свет.",
        quizTitle: "Мини-игра 🎮",
        quizSub: "Нажми любой вариант 🙂",
        quizCorrect: "Правильный ответ:",
        quizNext: "Следующий вопрос",
        quizDone: "Готово ✨",
        letterBtn: "Читать письмо 💌",
        galleryBtn: "Смотреть фото 📸",
        reasonsBtn: "Почему ты особенная ✨",
        giftBtn: "Открыть подарок 🎁",

        reasonsCards: [
            "Ты очень нежная и добрая",
            "С тобой спокойно и тепло",
            "Твоя улыбка — моя слабость",
            "Ты вдохновляешь меня становиться лучше",
            "Я ценю твою искренность",
            "Ты моя радость"
        ],

        couponsTitle: "Маленькие купоны 🎟",
        coupons: [
            { title: "Кино-вечер", desc: "Выбираешь фильм — я покупаю вкусняшки 🍿" },
            { title: "Сладкое свидание", desc: "Кофе/чай + десерт, где ты захочешь 🍰" },
            { title: "Прогулка", desc: "Тёплая прогулка и разговоры обо всём 🌙" },
            { title: "Обнимашки", desc: "Безлимит 😄🫶" },
        ],
    },
    uz: {
        mini: "8-mart sovg‘a",
        open: "Syurprizni ochish 💝",
        next: "Keyingi",
        back: "Orqaga",
        goQuiz: "O‘yin boshlash 🌸",
        goLetter: "Xatni ochish 💌",
        goGallery: "Lahzalarimiz 📸",
        goReasons: "Nega sen alohidasan ✨",
        goGift: "Sovg‘a 🎁",
        tip: "Bemalol bos — hammasi mehr bilan qilingan.",
        introTitle: "Faqat Guli uchun 💞",
        introSub: "Kichkina sayt-sovg‘a. Ochib jilmay 🙂",
        letterTitle: "Senga xat 💌",
        galleryTitle: "Moments 📸",
        reasonsTitle: "Nega sen alohidasan ✨",
        giftTitle: "Sovg‘ang 🎁",
        finalBig: "8-mart muborak, Guli 💗",
        finalSmall: "Bahor senga quvonch va nur olib kelsin.",
        quizTitle: "Mini-o‘yin 🎮",
        quizSub: "Istalganini bos 🙂",
        quizCorrect: "To‘g‘ri javob:",
        quizNext: "Keyingi savol",
        quizDone: "Tayyor ✨",
        letterBtn: "Xatni o‘qish 💌",
        galleryBtn: "Rasmlarni ko‘rish 📸",
        reasonsBtn: "Nega sen alohidasan ✨",
        giftBtn: "Sovg‘ani ochish 🎁",

        reasonsCards: [
            "Sen juda mehribon va muloyimsan",
            "Sen bilan ko‘nglim tinch bo‘ladi",
            "Tabassuming — mening zaif joyim",
            "Sen meni yaxshiroq bo‘lishga ilhomlantirasan",
            "Sening samimiyligingni qadrlayman",
            "Sen mening quvonchim"
        ],

        couponsTitle: "Kichkina kuponlar 🎟",
        coupons: [
            { title: "Kino kechasi", desc: "Filmni sen tanlaysan — men snack olaman 🍿" },
            { title: "Shirin uchrashuv", desc: "Qahva/choy + desert — qayerda xohlasang 🍰" },
            { title: "Sayr", desc: "Issiq sayr va uzoq suhbatlar 🌙" },
            { title: "Quchoqlar", desc: "Cheksiz 😄🫶" },
        ],
    },
};
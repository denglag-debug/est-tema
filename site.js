/*
  ===================================================================
  НАСТРОЙКИ САЙТА: всё, что может поменяться, лежит здесь, в одном месте.
  Этот файл подключён ко всем страницам сайта (главная и страницы наборов).
  Название, слоган, цена и контакт подставляются автоматически во все места,
  где стоит атрибут data-site="...".
  ===================================================================
*/
const SITE = {
  // Название проекта. Поменяйте здесь, и оно сменится на всех страницах.
  name: "Есть тема",
  // Слоган. Стоит на первом экране сразу после названия.
  slogan: "Зови своих",
  // Цена набора. Пока пусто: на странице написано, что цену объявим к запуску.
  price: "",
  // Как с вами связаться (почта, Telegram). Пока пусто: блок покажет заглушку.
  contact: "",
  // Данные продавца. По закону они должны быть на сайте: в подвале и в документах.
  // Пока пусто: на их месте видны заглушки в квадратных скобках.
  sellerName: "",   // ФИО полностью
  sellerInn: "",    // ИНН, 12 цифр
  sellerEmail: "",  // почта для покупателей
  // Сервис, через который принимаем оплату (появится в оферте и политике).
  paymentService: "",
  // Полоса «Скоро Новый год» на главной. После праздников поставьте false, и она исчезнет.
  newYearBanner: true,
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Подставляем настройки во все места с атрибутом data-site.
  const fill = (key) => {
    if (!SITE[key]) return;
    document.querySelectorAll('[data-site="' + key + '"]').forEach(el => { el.textContent = SITE[key]; });
  };
  ["name", "slogan", "price", "contact", "sellerName", "sellerInn", "sellerEmail", "paymentService"].forEach(fill);

  // 2. Полоса «Скоро Новый год»: прячем, если она выключена в настройках.
  const season = document.getElementById("season");
  if (season && !SITE.newYearBanner) season.hidden = true;

  // 3. Фильтр каталога: кнопки «Все», «Страны», «Эпохи и книги», «Праздники».
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
      const kind = btn.dataset.kind;
      document.querySelectorAll(".catalog .card").forEach(card => {
        card.hidden = kind !== "all" && card.dataset.kind !== kind;
      });
    });
  });
});

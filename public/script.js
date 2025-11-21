(function () {
    const API_BASE_URL = "/api/bookings";
    let selectedDates = [];
    let currentApartment = "first";
    let elemCalendar = {};
    let currentDateCal = new Date();
    let bookedDates = []; // Массив для хранения забронированных дат

    function getCurrentDate() {
        return new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
        );
    }

    function formatDateForLaravel(dateString) {
        const [year, month, day] = dateString.split(",");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    async function fetchBookedDates() {
        try {
            const response = await fetch(
                `${API_BASE_URL}?owner=${currentApartment}`,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (!response.ok)
                throw new Error("Ошибка при получении забронированных дат");
            const bookings = await response.json();
            bookedDates = bookings.flatMap((booking) => booking.date); // Собираем все даты из ответа
            markBookedDates();
        } catch (error) {
            console.error("Ошибка при загрузке броней:", error);
        }
    }

    function markBookedDates() {
        const days = document.querySelectorAll(".calendar__days .dayName");
        days.forEach((day) => {
            const formattedDate = formatDateForLaravel(day.id);
            if (bookedDates.includes(formattedDate)) {
                day.classList.add("bron");
                day.classList.remove("day", "active");
            }
        });
    }

    function displaySelectedDates() {
        const selectedDatesContainer =
            document.getElementById("selected-dates");
        const datesList = document.getElementById("dates-list");

        if (selectedDatesContainer && datesList) {
            if (selectedDates.length > 0) {
                selectedDatesContainer.style.display = "block";
                datesList.innerHTML = selectedDates
                    .map((date) => {
                        const d = new Date(date);
                        const displayDate = `${d
                            .getDate()
                            .toString()
                            .padStart(2, "0")}.${(d.getMonth() + 1)
                            .toString()
                            .padStart(2, "0")}.${d.getFullYear()}`;
                        return `<div class="selected-date mb-1">${displayDate}</div>`;
                    })
                    .join("");
                datesList.innerHTML += `<p class="mt-2 small text-muted">Выбрана ${
                    currentApartment === "first" ? "первая" : "вторая"
                } квартира</p>`;
            } else {
                selectedDatesContainer.style.display = "none";
                datesList.innerHTML = "<p>Нет выбранных дат</p>";
            }
        }
    }

    function elementsCalendar() {
        return {
            monthYearEl: document.getElementById("month-year"),
            daysContainer: document.getElementById("calendar-days"),
            dayNamesContainer: document.querySelector(".calendar__day-names"),
            prevBtn: document.getElementById("prev-btn"),
            nextBtn: document.getElementById("next-btn"),
        };
    }

    const monthNames = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];
    const daysNamesCal = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    function renderDayNames() {
        elemCalendar.dayNamesContainer.innerHTML = daysNamesCal
            .map((day) => `<span>${day}</span>`)
            .join("");
    }

    function addEmptyElemInCalendar(firstDay) {
        for (let i = 0; i < firstDay; i++) {
            elemCalendar.daysContainer.innerHTML +=
                '<span class="calendar__days-hidden"></span>';
        }
    }

    function addDaysInCalendar(year, month, daysInMonth) {
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday =
                day === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();
            const dateId = `${year},${month + 1},${day}`;
            const formattedDate = formatDateForLaravel(dateId);
            const isBooked = bookedDates.includes(formattedDate);
            elemCalendar.daysContainer.innerHTML += `<span id="${dateId}" class="${
                isToday ? "today dayName" : "dayName"
            } ${isBooked ? "bron" : "day"}">${day}</span>`;
        }
    }

    function changeMonth(delta) {
        currentDateCal.setMonth(currentDateCal.getMonth() + delta);
        const year = currentDateCal.getFullYear();
        const month = currentDateCal.getMonth();
        const firstDay = (new Date(year, month).getDay() + 6) % 7;
        const daysInMonth = 32 - new Date(year, month, 32).getDate();
        renderCalendar(year, month, firstDay, daysInMonth);
    }

    function renderCalendar(year, month, firstDay, daysInMonth) {
        elemCalendar.monthYearEl.textContent = `${monthNames[month]} ${year}`;
        elemCalendar.daysContainer.textContent = "";
        addEmptyElemInCalendar(firstDay);
        addDaysInCalendar(year, month, daysInMonth);
    }

    function createNewCalendar() {
        changeMonth(0);
        elemCalendar.prevBtn.addEventListener("click", () => {
            changeMonth(-1);
            markBookedDates();
        });
        elemCalendar.nextBtn.addEventListener("click", () => {
            changeMonth(1);
            markBookedDates();
        });
        renderDayNames();
    }

    function choseDay(elem) {
        if (
            !elem.id ||
            !elem.classList.contains("dayName") ||
            elem.classList.contains("bron")
        )
            return;
        const formattedDate = formatDateForLaravel(elem.id);
        if (
            !isValidDate(formattedDate) ||
            getCurrentDate().getTime() > new Date(formattedDate).getTime()
        )
            return;

        const dateIndex = selectedDates.indexOf(formattedDate);
        if (dateIndex === -1 && elem.classList.contains("day")) {
            selectedDates.push(formattedDate);
            elem.classList.remove("day");
            elem.classList.add("active");
        } else if (dateIndex !== -1 && elem.classList.contains("active")) {
            selectedDates.splice(dateIndex, 1);
            elem.classList.remove("active");
            elem.classList.add("day");
        }
        displaySelectedDates();
    }

    function isValidDate(dateString) {
        return !isNaN(new Date(dateString).getTime());
    }

    function clickAndActionDay() {
        document
            .querySelector(".calendar__body")
            .addEventListener("click", (e) => {
                if (e.target.classList.contains("dayName")) {
                    choseDay(e.target);
                }
            });
    }

    function newSwiper() {
        new Swiper(".swiper", {
            slidesPerView: 1,
            touchRatio: 1,
            autoHeight: true,
            speed: 500,
            nested: true,
            navigation: {
                nextEl: ".swiper-button-prev",
                prevEl: ".swiper-button-next",
            },
        });
    }

    async function createBooking(name, tel, dates, apartment) {
        try {
            const response = await fetch(API_BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: JSON.stringify({
                    name,
                    tel,
                    date: dates,
                    owner: apartment,
                }),
            });
            if (!response.ok) throw new Error("Network response was not ok");
            const booking = await response.json();
            bookedDates.push(...dates); // Добавляем новые даты в забронированные
            return booking;
        } catch (error) {
            console.error("Error creating booking:", error);
            alert(
                "Произошла ошибка при создании бронирования. Пожалуйста, попробуйте еще раз."
            );
            return null;
        }
    }

    function addBronIn() {
        const form = document.getElementById("booking-form");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = form.querySelector(".input-name").value.trim();
            const tel = form.querySelector(".input-tel").value.trim();

            if (!name || !tel) {
                alert("Пожалуйста, заполните все поля формы");
                return;
            }
            if (selectedDates.length === 0) {
                alert("Пожалуйста, выберите хотя бы одну дату");
                return;
            }

            const booking = await createBooking(
                name,
                tel,
                selectedDates,
                currentApartment
            );
            if (booking) {
                form.querySelector(".input-name").value = "";
                form.querySelector(".input-tel").value = "";
                document
                    .querySelectorAll(".calendar__days .active")
                    .forEach((day) => {
                        day.classList.remove("active");
                        day.classList.add("bron");
                    });
                selectedDates = [];
                displaySelectedDates();
                alert("Бронирование успешно создано!");
            }
        });
    }

    function initTabBackgroundChange() {
        const firstApartmentTab = document.getElementById(
            "first-apartment-tab"
        );
        const secondApartmentTab = document.getElementById(
            "second-apartment-tab"
        );
        const body = document.body;

        const fot = [
            "foto/cyt.png",
            "foto/cyt2.png",
            "foto/town-night.png",
            "foto/cyt3.png",
            "foto/cyt4.png",
            "foto/cyt5.png",
            "foto/cyt6.png",
        ];

        function changeBackground() {
            const fotoIndex = Math.floor(Math.random() * fot.length);
            body.style.cssText = `background: url(${fot[fotoIndex]}) center center no-repeat; background-size: cover`;
        }

        firstApartmentTab.addEventListener("shown.bs.tab", changeBackground);
        secondApartmentTab.addEventListener("shown.bs.tab", changeBackground);
    }

    function createClientApp(container, title) {
        const body = [...document.getElementsByTagName("body")][0];
        const fot = [
            "foto/cyt.png",
            "foto/cyt2.png",
            "foto/town-night.png",
            "foto/cyt3.png",
            "foto/cyt4.png",
            "foto/cyt5.png",
            "foto/cyt6.png",
        ];

        const fotoIndex = Math.floor(Math.random() * fot.length);
        body.style.cssText = `background: url(${fot[fotoIndex]}) center center no-repeat; background-size: cover`;

        newSwiper();
        initTabBackgroundChange();
        elemCalendar = elementsCalendar();
        createNewCalendar();
        clickAndActionDay();
        addBronIn();
        displaySelectedDates();
        fetchBookedDates(); // Загружаем забронированные даты при инициализации
    }

    window.createClientApp = createClientApp;
})();

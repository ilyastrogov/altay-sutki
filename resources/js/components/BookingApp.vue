<template>
    <div id="todo-app" class="container mx-auto">
        <h1 class="title__main text-start">Квартиры посуточно</h1>
        <div class="shell__nav">
            <form
                @click.prevent="activeSearch"
                @submit.prevent="switchTab(clickGeoAddress)"
                class="form__search input-g g-2 col-md-9 rounded-2 justify-content-sm-center justify-content-lg-center justify-content-xl-center"
                style="height: 50px"
                >
                
                    <input

                        id="search-input"
                        type="search"
                        name="search"
                        autocomplete="on"
                        class="input-search form-control"
                        placeholder="Введите ФИО"
                        required
                    />
                        
            </form>
            <nav class="nav flex-nowrap">
                <a
                    class="nav-link nav__zero text-white"
                    href="#"
                    @click.prevent="switchTab('zero')"
                >
                    Главная
                </a>

                <a
                    class="nav-link nav__hundred text-white"
                    href="#"
                    @click.prevent="switchTab('hundred')"
                >
                    Для арендодателей
                </a>
            </nav>
        </div>
        <div
            class="photo__wrapper row justify-content-between"
        >
            <a 
                v-for="(item, key) in apartmentsAll" 
                :key="key"
                :id="`links${key} card`"
                class="swiper big__swip__container1 col-md-3 swiper-initialized swiper-horizontal swiper-pointer-events swiper-autoheight"
                href="#"
                @click.prevent="switchTab(key)"
            >
                {{ newSwiper() }}
                <div class="swiper-wrapper big__wrapper">
                    <picture
                        v-for="(image, index) in item"
                        :key="index"
                        class="swiper-slide big__slide"
                    >
                        <img :src="image.src" :alt="image.alt" class="w-100" />
                    </picture>
                </div>
                <span
                    class="swiper-notification"
                    aria-live="assertive"
                    aria-atomic="true"
                ></span>
            </a>
        </div>
        <div
            class="swiper big__swip__container col-md-9 swiper-initialized swiper-horizontal swiper-pointer-events swiper-autoheight deactive"
        >
            <div class="swiper-wrapper big__wrapper">
                <picture
                    v-for="(image, index) in apartmentsAll[currentApartment]"
                    :key="index"
                    class="swiper-slide big__slide"
                >
                    <img :src="image.src" :alt="image.alt" class="w-100" />
                </picture>
             
            </div>
            <span
                class="swiper-notification"
                aria-live="assertive"
                aria-atomic="true"
            ></span>
        </div>
        <section class="form__posting mb-3 deactive">
            <h2 class="form__title">Форма для размещения апартаментов</h2>
            <form
                @submit.prevent="handleSubmit2"
                
                class="form__posting__apartment input-g g-2 col-md-9 rounded-2 justify-content-sm-center justify-content-lg-center justify-content-xl-center swiper-slide"
                style="height: 250px"
            >
                <div class="input-group flex-row">
                    <input
                        v-model="formPosting.name"
                        type="text"
                        name="name"
                        autocomplete="on"
                        class="input-name form-control"
                        placeholder="Введите ФИО"
                        required
                    />
                    <input
                        v-model="formPosting.tel"
                        v-maska
                        data-maska="+7 (###) ###-##-##"
                        type="tel"
                        name="tel"
                        autocomplete="on"
                        class="input-tel form-control"
                        placeholder="Введите ваш номер телефона"
                        required
                    />
                </div>    
                <div class="input-group flex-col">    
                    
                    <label for="formFile" class="form-label">Выбирите фото апартаментов</label>
                    <input
                        @change="handleFileChange"
                        ref="myFile"
                        type="file"
                        id="formFile"
                        class="input-photo form-control"
                        accept="image/jpeg,image/png,application/pdf"
                        multiple
                        required
                    />
                </div>
                <div class="input-group-append">
                    <button 
                    type="submit" class="btn btn-primary px-4 py-2"
                    >
                        Разместить
                    </button>
                    
                </div>
            </form>
        </section>
        <section class="form__booking mb-3 deactive">
            <h2 class="form__title">Форма для бронирования</h2>
            <form
                @submit.prevent="handleSubmit"
                
                class="form__bron input-g g-2 col-md-9 rounded-2 justify-content-sm-center justify-content-lg-center justify-content-xl-center swiper-slide"
                style="height: 550px"
            >
                <div class="input-group flex-row gap-0">
                    <input
                        v-model="form1.name"
                        type="text"
                        name="name"
                        autocomplete="on"
                        class="input-name form-control"
                        placeholder="Введите ФИО"
                        required
                    />
                    <input
                        v-model="form1.tel"
                        v-maska
                        data-maska="+7 (###) ###-##-##"
                        type="tel"
                        name="tel"
                        autocomplete="on"
                        class="input-tel form-control"
                        placeholder="Введите ваш номер телефона"
                        required
                    />
                </div>
                <div class="calendar col-sm-9">
                    <div class="calendar__header">
                        <div class="calendar__month" id="month-year">
                            {{ monthYear }}
                        </div>
                        <div class="calendar__btns">
                            <button
                                type="button"
                                class="calendar__btn"
                                id="prev-btn"
                                @click="changeMonth(-1)"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="none"
                                        stroke="rgb(30, 8, 192)"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m15 4l-8 8l8 8"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                class="calendar__btn"
                                id="next-btn"
                                @click="changeMonth(1)"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="none"
                                        stroke="rgb(30, 8, 192)"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m8 4l8 8l-8 8"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="calendar__body">
                        <div class="calendar__day-names">
                            <span v-for="day in daysNamesCal" :key="day">{{
                                day
                            }}</span>
                        </div>
                        <div class="calendar__days" id="calendar-days">
                            <span
                                v-for="empty in emptyDays"
                                :key="`empty-${empty}`"
                                class="calendar__days-hidden"
                            ></span>
                            <span
                                v-for="day in daysInMonth"
                                :key="day"
                                :id="`${year.value},${month.value + 1},${day}`"
                                :class="{
                                    dayName: true,
                                    day: !isBooked(day) && !isToday(day),
                                    today: isToday(day),
                                    bron: isBooked(day),
                                    active: isSelected(day),
                                }"
                                @click="choseDay(day)"
                            >
                                {{ day }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="input-group-append">
                    <button 
                    type="submit" class="btn btn-primary px-4 py-2"
                    >
                        Забронировать
                    </button>
                    
                </div>
            </form>
        </section>
        <section class="cards__start col-md-9">
            
            <div 
                v-for="(item, index) in bookedDatesAll" 
                :key="index"
                :class="`card${index} card`" 
                :id="`${item['id']}`" 
            >
            
                <div class="card-body">
                    <div class="inao__client">
                        <p class="name__surname">ФИО: {{ item['name'] }}</p>
                        <a href="https://t.me/+GtaRHS5l_t45NTEy" target="_new">
                            Telegram
                        </a>
  
                    </div>
                    <div class="shell__for__date">
                        <p class="card__date">Дата:</p>
                        <p
                            v-for="(date, index) in item['date']"
                            :key="date"
                            class="`card__date ${date index selectedDates.length - 1}`"
                        >
                            {{ formatDisplayDate(date)
                            }}{{ index < selectedDates.length - 1 ? "," : "" }}
                        </p>
                    </div>
                    
                </div>
                
            </div>
        </section> 
    </div>

</template>

<script>
import Swiper from "swiper";
import "swiper/css";
import Toastify from "toastify-js";
import { computed, onMounted, ref } from "vue";
import * as Yup from "yup";

export default {
    data() {  
        return { file: "" };  
    },  
    methods: {  
        
   

    }, 

    name: "BookingApp",
    setup() {
        const API_BASE_URL = "/api/bookings";
        const selectedDates = ref([]);
        const currentApartment = ref("zero");
        const currentDateCal = ref(new Date());
        const bookedDates = ref([]);
        const bookedDatesAll = ref([]);
        const blobPhoto = ref([]);
        const form1 = ref({ name: "", tel: "" });
        const formPosting = ref({ name: "", tel: "", token: "", chatid: "" });
        const formFile = ref({id: 0, files: []});
        const Token = '8448804399:AAHraGC8kK_FEGkYMzTPbG-QU2YW3YlCu0o';
        const Chat_id = '2882961977';
        const URI_API = `https://api.telegram.org/bot${Token}/sendMessage`;
        const geoAddress = {"г Горно-Алтайск, ул П.Сухова, д 10": "second"};
        let elemId = "";
        const apartmentsAll = ref({1: [
            { src: "/foto/room1.jpeg", alt: "Первая квартира" },
            { src: "/foto/room2.jpeg", alt: "Первая квартира" },
        ], 2: [
            { src: "/foto/rooms1.jpeg", alt: "Вторая квартира" },
            { src: "/foto/rooms2.jpeg", alt: "Вторая квартира" },
        ], 3: [
            { src: "/foto/room3.jpeg", alt: "Третья квартира" },
            { src: "/foto/room4.jpeg", alt: "Третья квартира" },
            { src: "/foto/room5.jpeg", alt: "Третья квартира" },
        ]});

        const fourthApartmentImages = [
            { src: "/foto/rooms3.jpeg", alt: "Четвертая квартира" },
            { src: "/foto/rooms4.jpeg", alt: "Четвертая квартира" },
            { src: "/foto/rooms5.jpeg", alt: "Четвертая квартира" },
        ];
      

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

        const year = computed(() => currentDateCal.value.getFullYear());
        const month = computed(() => currentDateCal.value.getMonth());
        const firstDay = computed(() => {
            const date = new Date(year.value, month.value);
            return (date.getDay() + 6) % 7; // Корректный расчет первого дня (понедельник = 0)
        });
        const daysInMonth = computed(() => {
            const date = new Date(year.value, month.value + 1, 0); // Последний день месяца
            const days = date.getDate();
            return isNaN(days) ? 30 : days; // Защита от NaN, дефолт 30 дней
        });
        const emptyDays = computed(() => {
            const count = firstDay.value;
            return isNaN(count) ? [] : Array.from({ length: count });
        });
        const monthYear = computed(() => {
            return isNaN(month.value) || isNaN(year.value)
                ? "Январь 2025"
                : `${monthNames[month.value]} ${year.value}`;
        });

        function scrollToElem() {
            
            
            let lastCard = document.getElementById(elemId);

            if (lastCard !== undefined && lastCard !== null) {
            
                lastCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            };
    
        }

        async function testStartInPhoto() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}?owner=payment1`
                );
                if (!response.ok)
                    throw new Error("Ошибка при получении забронированных дат");
                const bookings = await response.json();
                const dataString = JSON.stringify(bookings);
                const data = JSON.parse(dataString);
                convertingBlubToFile(data);
                
            } catch (error) {
                console.error("Ошибка при загрузке броней:", error);
                Toastify({
                    text: "Ошибка при загрузке броней",
                    background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                    duration: 3000,
                }).showToast();
            }
        }


        function getCurrentDate() {
            return new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
            );
        }
        function getRandomBackground() {
            const backgroundImages = [
                "/foto/cyt.png",
                "/foto/cyt2.png",
                "/foto/town-night.png",
                "/foto/cyt3.png",
                "/foto/cyt4.png",
                "/foto/cyt5.png",
                "/foto/cyt6.png",
            ];
            const fotoIndex = Math.floor(Math.random() * 7);
            document.body.style.cssText = `background: url(${backgroundImages[fotoIndex]}) center center no-repeat fixed; background-size: cover`;
            testStartInPhoto();
        }

        function formatDateForLaravel(year, month, day) {
            return `${year}-${String(month + 1).padStart(2, "0")}-${String(
                day
            ).padStart(2, "0")}`;
        }

        function formatDisplayDate(date) {
            const d = new Date(date);
            return isNaN(d.getTime())
                ? "01.01.2025"
                : `${d.getDate().toString().padStart(2, "0")}.${(
                      d.getMonth() + 1
                  )
                      .toString()
                      .padStart(2, "0")}.${d.getFullYear()}`;
        }

        function deleteDateInElem(arrDate) {
            let newDate = [];
            for (let date of arrDate) {
                if (getCurrentDate().getTime() <= new Date(date).getTime()) {
                    newDate.push(date);
                };
            };

            return newDate;
        }

        function addElemInArr(bookings) {
            const newArr = [];
            const dataString = JSON.stringify(bookings);
            const data = JSON.parse(dataString);
            let id = 0;
            for (let elem of data) {
                id = elem.id;
                let newDate = deleteDateInElem(elem.date);
                if (newDate.length !== 0) {
                    elem.date = newDate;

                    newArr.push(elem);
                    
                };
            };
            elemId = id;
            console.log(elemId);
            console.log(newArr);
            bookedDatesAll.value = newArr;
            
        }

        async function fetchBookedDates() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}?owner=${currentApartment.value}`
                );
                if (!response.ok)
                    throw new Error("Ошибка при получении забронированных дат");
                const bookings = await response.json();
                addElemInArr(bookings);
                bookedDates.value = bookedDatesAll.value.flatMap((bookedDatesAll) => bookedDatesAll.date); // Убираем лишнюю обработку
            } catch (error) {
                console.error("Ошибка при загрузке броней:", error);
                Toastify({
                    text: "Ошибка при загрузке броней",
                    background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                    duration: 3000,
                }).showToast();
            }
        }

        function isBooked(day) {
            const formattedDate = formatDateForLaravel(
                year.value,
                month.value,
                day
            );
            const isBooked = bookedDates.value.includes(formattedDate);
            return isBooked;
        }

        function isToday(day) {
            return (
                day === new Date().getDate() &&
                month.value === new Date().getMonth() &&
                year.value === new Date().getFullYear()
            );
        }

        function isSelected(day) {
            const formattedDate = formatDateForLaravel(
                year.value,
                month.value,
                day
            );
            return selectedDates.value.includes(formattedDate);
        }

        function changeMonth(delta) {
            const newDate = new Date(
                currentDateCal.value.getFullYear(),
                currentDateCal.value.getMonth() + delta
            );
            if (!isNaN(newDate.getTime())) {
                currentDateCal.value = newDate;
                fetchBookedDates();
            }
        }

        function choseDay(day) {
            const formattedDate = formatDateForLaravel(
                year.value,
                month.value,
                day
            );
            if (
                isBooked(day) ||
                !isValidDate(formattedDate) ||
                getCurrentDate().getTime() > new Date(formattedDate).getTime()
            ) {
                return;
            }

            const dateIndex = selectedDates.value.indexOf(formattedDate);
            const dayElement = document.getElementById(
                `${year.value},${month.value + 1},${day}`
            );
            if (dateIndex === -1) {
                selectedDates.value.push(formattedDate);
                if (dayElement) {
                    dayElement.classList.add("active");
                }
            } else {
                selectedDates.value.splice(dateIndex, 1);
                if (dayElement) {
                    dayElement.classList.remove("active");
                }
            }
        }

        function isValidDate(dateString) {
            return !isNaN(new Date(dateString).getTime());
        }

        const schema = Yup.object().shape({
            name: Yup.string()
                .required("Пожалуйста, введите ФИО")
                .min(2, "ФИО должно содержать минимум 2 символа"),
            tel: Yup.string()
                .required("Пожалуйста, введите номер телефона")
                .matches(
                    /^\+\d{1}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
                    "Неверный формат номера телефона"
                ),
        });

        function clickGeoAddress() {
            const formSearch = [...document.getElementsByClassName("input-search")][0];
            const keys = Object.keys(geoAddress);
            for (let key of keys) {
                if (key == formSearch.value) {
                    console.log(formSearch.value);
                    return geoAddress[key];
                };
            };
            
        };

        

        function searchAdress(formSearch) {
            Dadata.createSuggestions(formSearch, {
            token: "674ba733abbee43529527e780ebc503c4797859c",
            type: "address",
            });                
        };

        function activeSearch() {
            const formSearch = [...document.getElementsByClassName("input-search")][0];
            searchAdress(formSearch);
        };

        function sendDataToTelegram(formData) {

            const botToken = '8252045193:AAHhTLHe0DDxJhBJyTAmfmRLI-tnLYicfWg';
            const chatId = '1299852236';
            const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

            const message = `
            <b>${formData.name}</b>
            <b>${formData.tel}</b>
            <b>${formData.date}</b>
            `;

            const params = {
                chat_id: chatId,
                text: message,
                parse_mode: 'html'
            };

            return fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            }).then(response => response.json());
        };

        

        async function handleSubmit2() {
            const payment1 = "payment1";
            const newArr = [];
            const owner = payment1;
            const booking = await createBooking(
                    formPosting.value.name,
                    formPosting.value.tel,
                    blobPhoto.value,
                    owner
                );
            newArr.push(booking);
            console.log(booking);
            convertingBlubToFile(newArr);
        }

        function dataURLToBlob(dataURL) {

            const parts = dataURL.split(',');

            const mimeType = parts[0].match(/:(.*?);/)[1]; 
            const fileName = mimeType.replace("/", ".");

            const base64Data = parts[1]; 

        
            const byteString = atob(base64Data); 
            const byteArray = new Uint8Array(byteString.length);
            
            for (let i = 0; i < byteString.length; i++) {
                byteArray[i] = byteString.charCodeAt(i);  // Преобразуем каждый символ в код ASCII
            }


            return new File([byteArray], fileName, { type: mimeType });
        }


        function convertingBlubToFile(booking) { 
            console.log(booking);
            
            for (let datada of booking) {
                const newArr = [];
                console.log(datada);

                const datas = datada['date']; 
                for (let dataURL of datas) {   
                    const file = dataURLToBlob(dataURL);
                    const objNewPhoto = {src: "", alt: ""};
                    const fal = URL.createObjectURL(file);
                    objNewPhoto.src = fal;
                    
                    objNewPhoto.alt = datada['name'];
                    newArr.push(objNewPhoto);
                };
                const newApartmentsAll = apartmentsAll.value; 
                newApartmentsAll[datada['name']] = newArr;
                console.log(apartmentsAll.value);
            }; 
        }  
        
        function readerOnload(image) {
            const reader = new FileReader();

            let newArr = [];
            
            reader.readAsDataURL(image);
            reader.onload = e =>{
                
                newArr.push(e.target.result);
                console.log(newArr);
                blobPhoto.value.push(e.target.result);
                console.log(blobPhoto.value);
            };

            
        }

        function handleFileChange(e) {
            

            const images  = e.target.files;
            console.log(images);
            const keys = Object.keys(images);
            for (let key of keys) {
                readerOnload(images[key]);
            }
            console.log('newArr '+blobPhoto.value);
        }
        
        async function handleSubmit() {
            try {
                await schema.validate(form1.value, { abortEarly: false });
                if (selectedDates.value.length === 0) {
                    Toastify({
                        text: "Пожалуйста, выберите хотя бы одну дату",
                        backgroundColor:
                            "linear-gradient(to right, #ff5f6d, #ffc371)",
                        duration: 3000,
                    }).showToast();
                    return;
                }

                console.log('date ' + selectedDates.value);

                const booking = await createBooking(
                    form1.value.name,
                    form1.value.tel,
                    selectedDates.value,
                    currentApartment.value
                );

                await sendDataToTelegram(booking);
                if (booking) {
                    selectedDates.value.forEach((date) => {
                        const [year, month, day] = date.split("-").map(Number);
                        const dayElement = document.getElementById(
                            `${year},${month},${day}`
                        );
                        if (dayElement) {
                            dayElement.classList.add("bron");
                            dayElement.classList.remove("active");
                        }
                    });
                    form1.value = { name: "", tel: "" };
                    selectedDates.value = [];
                    Toastify({
                        text: "Бронирование успешно создано!",
                        backgroundColor:
                            "linear-gradient(to right, #00b09b, #96c93d)",
                        duration: 3000,
                    }).showToast();
                    
                    await fetchBookedDates(); // Обновляем список забронированных дат
                    await scrollToElem();
                }
            } catch (error) {
                console.error(error);
                const message = error.errors
                    ? error.errors.join(", ")
                    : "Произошла ошибка при создании бронирования";
                Toastify({
                    text: message,
                    backgroundColor:
                        "linear-gradient(to right, #ff5f6d, #ffc371)",
                    duration: 3000,
                }).showToast();
            }
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
                        date: dates, // Теперь отправляем массив напрямую
                        owner: apartment,
                    }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(
                        error.message || "Network response was not ok"
                    );
                }

                const booking = await response.json();
                bookedDates.value.push(...dates);
                return booking;
            } catch (error) {
                console.error("Ошибка при создании бронирования:", error);
                throw error;
            }
        }

        function addAndRemoveClassDeactive(apartment) {
            const bigSwipContainer = [...document.getElementsByClassName("big__swip__container")][0];
            console.log('bigSwipContainer '+bigSwipContainer);
            const formBooking = [...document.getElementsByClassName("form__booking")][0];
            const photoWrapper = [...document.getElementsByClassName("photo__wrapper")][0];
            const formPosting = [...document.getElementsByClassName("form__posting")][0];
            if (apartment === 'zero') {
                bigSwipContainer.classList.add('deactive');  
                formBooking.classList.add('deactive');
                formPosting.classList.add('deactive');
                photoWrapper.classList.remove('deactive');
                
            } else if (apartment === 'hundred') {
                formPosting.classList.remove('deactive');
                bigSwipContainer.classList.add('deactive');  
                formBooking.classList.add('deactive');
                photoWrapper.classList.add('deactive');
            } else {
                bigSwipContainer.classList.remove('deactive');  
                formBooking.classList.remove('deactive');
                photoWrapper.classList.add('deactive');
                formPosting.classList.add('deactive');
            };
        }

        function switchTab(apartment) {
            currentApartment.value = apartment;
            const backgroundImages = [
                "/foto/cyt.png",
                "/foto/cyt2.png",
                "/foto/town-night.png",
                "/foto/cyt3.png",
                "/foto/cyt4.png",
                "/foto/cyt5.png",
                "/foto/cyt6.png",
            ];
            const fotoIndex = Math.floor(Math.random() * 7);
            document.body.style.cssText = `background: url(${backgroundImages[fotoIndex]}) center center no-repeat fixed; background-size: cover`;
            
            addAndRemoveClassDeactive(apartment);
            
            fetchBookedDates();
            newSwiper();
            
        }

        function newSwiper() {
            const mySwiper = new Swiper(".swiper", {
                slidesPerView: 1,
                touchRatio: 1,
                autoHeight: true,
                speed: 500,
            });
        }

        onMounted(() => {
            newSwiper();
            fetchBookedDates();
            getRandomBackground();
            switchTab('zero');
        });

        return {
            newSwiper,
            blobPhoto,
            handleSubmit2,
            handleFileChange,
            apartmentsAll,
            scrollToElem,
            bookedDatesAll,
            selectedDates,
            currentApartment,
            form1,
            formPosting,
            monthYear,
            daysNamesCal,
            emptyDays,
            daysInMonth,
            changeMonth,
            choseDay,
            handleSubmit,
            formatDisplayDate,
            isToday,
            isBooked,
            isSelected,
            switchTab,
            year,
            month,
            activeSearch,
        };
    },
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, "Segoe UI";
}

p {
    margin: 0;
    padding: 0;
}

.shell__nav {
    max-height: 100%;
}

.nav {
    width: 100%;
    overflow-x: scroll;
}

.nav::-webkit-scrollbar {
    display: none;
}

.nav-link {
    white-space: nowrap;
    color: #fff !important;
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
}

.nav-link.active {
    background-color: #0d6efd;
    border-radius: 0.25rem;
}

.deactive {
    display: none;
}

.cardd1 {
   display: none; 
}

.form__title {
    color: #fff;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.75rem;
}

.input-g {
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.2);
    /* backdrop-filter: blur(30px); */
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 80px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.calendar {
    position: relative;
    height: 370px;
    border-radius: 25px;
    margin: auto;
    background: rgba(255, 255, 255, 0.2);
    /* backdrop-filter: blur(30px); */
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 80px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    margin-bottom: 25px;
}

.calendar__header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 15px 20px 25px;
    color: #fff;
    font-weight: bold;
}

.calendar__btns {
    display: flex;
    column-gap: 35px;
}

.calendar__btn {
    background: none;
    border: none;
    cursor: pointer;
    transition: opacity 0.1s;
}

.calendar__btn:hover {
    opacity: 0.7;
}

.calendar__month {
    color: #1e08c0;
}

.calendar__day-names,
.calendar__days {
    display: grid;
    font-weight: bold;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    color: #1e08c0;
    justify-items: center;
}

.calendar__day-names span {
    font-size: 16px;
}

.calendar__days {
    row-gap: 5px;
}

.calendar__days span:not(.calendar__days-hidden) {
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    color: #1e08c0;
    cursor: pointer;
    font-size: 20px;
    border-radius: 50px;
    transition: background-color 0.3s;
}

.calendar__days span.today {
    background-color: #fff;
    outline: 2px solid #1e08c0;
    font-weight: bold;
    border-radius: 50px;
}

.calendar__days span:not(.calendar__days-hidden):hover {
    background-color: rgb(255, 192, 189);
    opacity: 0.7;
}

.big__swip__container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto 1.5rem;
}

.big__swip__container1 {
    width: 100%;
    max-width: 300px;
    height: 196px;
    margin: 0 auto 1.5rem;
    cursor: pointer;
}

.big__slide {
    object-fit: cover;
}

.big__slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.title__main {
    max-width: 800px;
    color: #fff;
    opacity: 0.9;
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
}

.input-group {
    padding-bottom: 30px;
    display: flex;
    gap: 0.5rem;
}

.input-group-append {
    display: flex;
    justify-content: center;
}

.input-group > .form-control {

    background: rgba(255, 255, 255, 0.2);
    /* backdrop-filter: blur(30px); */
    box-shadow: 0 0 80px rgba(0, 0, 0, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.1);
    color: #1e08c0;
    min-height: 40px;
    padding: 0.5rem 1rem;
}

.input-photo {
    width: 100%;
}

.form-label {
    color: #1e08c0;
}

.form-control::placeholder {
    color: #1e08c0 !important;
    opacity: 1;
}

.calendar__days span.bron {
    background-color: rgba(182, 16, 227, 0.6);
}

.active {
    border: 3px solid #08ba0b;
    color: #1e08c0;
}

.cards__start {
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.cards {
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.card {
    max-width: 100%;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(30px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 80px rgba(0, 0, 0, 0.2);
    border-radius: 25px;
    margin-bottom: 1.5rem;
}

.card__foto {
    height: 0px;
    background: url(/foto/skinali-2883.jpg) center center no-repeat;
    background-size: cover;
}

.title__card {
    font-size: 18px;
    color: #b458ee;
    margin-bottom: 5px;
}

.name__surname,
.teleph {
    display: block;
    margin-bottom: 5px;
    color: #3ac6ee;
}

.shell__for__date {
    display: flex;
    flex-wrap: wrap;
}

.card__date:not(:last-child) {
    margin-right: 7px;
}

.card__date {
    margin-bottom: 5px;
    color: #18e84e;
}
</style>

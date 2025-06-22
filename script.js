// import { getClients } from './js/sutkiApi.js';

(function() {
	

	// Глобальные переменные
	let title1 = '';
	let arrClientele = [];
	let arrElemDay = [];
	let arrClienteleLength = -1;
	let elemCalendar = [];

	function foolDate() {
		nowDate1 = new Date();
		nowDate = new Date(nowDate1.getFullYear(), nowDate1.getMonth(), nowDate1.getDate());
		return nowDate;
	};

	function createAppTitle(titleForm) {
		let appTitle = document.createElement('h2');
		appTitle.classList.add('form__title');
		appTitle.innerHTML = titleForm;

		return appTitle
	};

	function sortArrElemDay(arrFromDate) {
		if (arrFromDate.length > 1) {
			arrFromDate.sort((a, b) => (new Date(a.id).getTime() < new Date(b.id).getTime()) ? -1 : 0);
		};
		
		// console.log('sortArrElemDay', arrElemDay);
	};

	// Сортировка р по дате, с переворотом даты строки
	// function sortArrClientele(arrFromDate) {
		// console.log('blin_0', arrFromDate);
	// 	if (arrFromDate.length > 1) {

	// 		arrFromDate.sort((a, b) => {
	// 			let elemA = a.textContent.split('.');
	// 			elemA = elemA[2].concat('.', elemA[1], '.', elemA[0]);
	// 			let elemB = b.textContent.split('.');
	// 			elemB = elemB[2].concat('.', elemB[1], '.', elemB[0]);
				// console.log('blin', new Date(elemA).getTime(), new Date(elemB).getTime())
	// 			return (new Date(elemA).getTime() < new Date(elemB).getTime()) ? -1 : 0;
	// 		});
	// 	};
		
		// console.log('arrFromDate', arrFromDate);
	// };

	function addInArrElemDay(elem) {
		// console.log(arrElemDay);
		if(elem.classList.contains('active')) {
			arrElemDay.push(elem);
		
			sortArrElemDay(arrElemDay);

		} else if(elem.classList.contains('day')) {
			
			delElemInElemDay(elem);
		};
		
		// console.log('arrElemDay', arrElemDay);
	};
    
;
	
	function addActiveOutArrElemDay() {
		let newArr = [];
		
		if (arrElemDay != undefined) {

			for (elem of arrElemDay) {
				const realElem = document.getElementById(elem.id);
				if (realElem !== null) {
					realElem.classList.add('active');
					realElem.classList.remove('day');

					newArr.push(realElem);
				} else {
					newArr.push(elem);
				};
			
			};

			if (newArr.length !== 0) {
				arrElemDay = newArr;
			};
		};	
	};

	function delElemInElemDay(elem) {
		newArr = [];
		for (let element of arrElemDay) {
			if (element !== elem) {
      			newArr.push(element);
			};
		};
		arrElemDay = newArr;
	};

	function createTodoItemForm() {
		let form = document.createElement('form');

		let inputName = document.createElement('input');
		let inputTel = document.createElement('input');
		let inputgroup = document.createElement('div');
		let buttonWrapper = document.createElement('div');
		// let formCalendar  = document.createElement('div');		
		let button = document.createElement('button');
		const calendar = addElemCalendarInContainer();
	


		form.style = 'height: 550px';

		form.classList.add(
			'input-g', 
			'g-2', 
			'col-md-9', 
			'rounded-2',
			'justify-content-sm-center',
			'justify-content-lg-center',
			'justify-content-xl-center',
			'swiper-slide'
		);
		inputgroup.classList.add('input-group');
		inputName.classList.add('input-name', 'form-control');
		inputName.name = 'name';
		inputName.type = 'name';
		inputName.placeholder = 'Введите ФИО';

		inputTel.name = 'tel'
		inputTel.type = 'tel'
		inputTel.placeholder = 'Введите ваш номер телефона';
		inputTel.classList.add('input-tel', 'form-control');
		buttonWrapper.classList.add('input-group-append');
		button.classList.add('btn', 'btn-primary');
		button.textContent = 'Забронировать';

		buttonWrapper.append(button);
		inputgroup.append(inputName)
		inputgroup.append(inputTel)
		form.append(inputgroup, calendar, buttonWrapper);


		return {
			form,
			inputName,
			inputTel,
			buttonWrapper,
			button
		};
	};

    
	// Создаем контейнер-скилет для календаря

	function createContainerCalendar() {
		const calendar1 = document.createElement('div');
		calendar1.classList.add('calendar', 'col-sm-9');
		return calendar1
	};

	const calendar = createContainerCalendar();

	function createCalendarHeader() {
		const calendarHeader1 = document.createElement('div');
		calendarHeader1.classList.add('calendar__header');
		return calendarHeader1;
	};

	const calendarHeader = createCalendarHeader();

	function createCalendarMonth() {
		const calendarMonth1 = document.createElement('div');
		calendarMonth1.classList.add('calendar__month');
		calendarMonth1.id = "month-year";
		return calendarMonth1;
	};

	const calendarMonth = createCalendarMonth();

	function createContainerBtns() {
		const calendarBtns1 = document.createElement('div');
		calendarBtns1.classList.add('calendar__btns');
		return calendarBtns1
	};

	const calendarBtns = createContainerBtns();

	function createCalBtnPrev() {
		const calendarBtn1 = document.createElement('button');
		calendarBtn1.classList.add('calendar__btn');
		calendarBtn1.id = "prev-btn";
		calendarBtn1.type = 'button';
		return calendarBtn1;
	};

	const calendarBtnPrev = createCalBtnPrev();

	function createCalBtnNext() {
		const calendarBtn2 = document.createElement('button');
		calendarBtn2.classList.add('calendar__btn');
		calendarBtn2.id = "next-btn";
		calendarBtn2.type = 'button';
		return calendarBtn2;
	};

	const calendarBtnNext = createCalBtnNext();

	function createCalendarBody() {
		const calendarBody1 = document.createElement('div');
		calendarBody1.classList.add('calendar__body');
		return calendarBody1;
	};

	const calendarBody0 = createCalendarBody();

	function createCalendarDayNames() {
		const calendarDayNames1 = document.createElement('div');
		calendarDayNames1.classList.add('calendar__day-names');
		return calendarDayNames1;
	};

	const calendarDayNames = createCalendarDayNames();

	function createCalendarDays() {
		const calendarDays1 = document.createElement('div');
		calendarDays1.classList.add('calendar__days');
		calendarDays1.id = "calendar-days";
		return calendarDays1;
	};

	const calendarDays = createCalendarDays();

	function addDaysInBody() {
		calendarBody0.append(calendarDayNames, calendarDays);
		return calendarBody0;
	};

	const calendarBody = addDaysInBody();

	function addElemCalendarInContainer() {
		calendarBtns.append(calendarBtnPrev, calendarBtnNext);
		calendarHeader.append(calendarMonth, calendarBtns);
		calendar.append(calendarHeader, calendarBody);
		return calendar;
	};

	// В МЕСТО СОЗДАНИЯ ID СТАВИМ ДАТУ БРОНИРОВАНИЯ


	function createH3() {		
		const titleCardDate = document.createElement('h3');
		titleCardDate.classList.add('title__card');
		titleCardDate.textContent = `Вы забронировали квартру по ул. Ленина 1`;	
		return titleCardDate;
	};

	function createP(data) {
		let descr__client = document.createElement('p');
		descr__client.textContent = `${data}`;
		return descr__client;
	};

	function searchDayNamesBron() {
		const days = [...elemCalendar.daysContainer.getElementsByClassName('dayName')];
		const elemDayNames = [];

		for (dayName of days) {
			for (elem of arrClientele) {
				console.log('way1', dayName.id)
console.log('way2', elem.date)
				for (date of elem.date) {
					if (dayName.id == date) {
						elemDayNames.push(dayName);
						// dayName.classList.remove('active');
						// console.log('way', dayName)
					}; 
				};
			};		
		};
		// Создание списка в который не входят выделенные элементы.

		// let elemDayNamesBron = [];
		// let newArr = [];
		// let c = 0;
		// for (elem of elemDayNames) {
		// 	if (c == 0) {
		// 		for (dayName of days) {
		// 			if (dayName !== elem) {
		// 				elemDayNamesBron.push(dayName);
		// 			}; 
		// 		};
		// 	} else {
		// 		for (dayName of newArr) {
		// 			if (dayName !== elem) {
		// 				elemDayNamesBron.push(dayName);
		// 			}; 
		// 		};
		// 	};
		// 	c += 1;
		// 	newArr = elemDayNamesBron;
		// 	elemDayNamesBron = [];	
		// };
		// return {
		// 	elemDayNames,
		// 	newArr
		// };
		return elemDayNames
	};

	function addBronDay() {
		searchDay = searchDayNamesBron();
		for (elemDay of searchDay) {
console.log('НННУУУ', searchDay)
			elemDay.classList.add('bron');
			elemDay.classList.remove('active');
		};
	};

	function addBronDayFromPush() {
		// searchDay = searchDayNamesBron();
		for (elemDay of searchDay) {
			elemDay.classList.add('bron');
			elemDay.classList.remove('active');
		};
	};

	function appendCardsInContainer(elem) {
		const container = document.getElementById('todo-app');
		
		addBronDay();
		let tbody = createTbody(elem);	
		if (tbody !== undefined) {
			let cards = createCards();
			cards.append(tbody);
			container.append(cards);
		};
	};


	function checkIdenticalData(elem, arrClient) {
		flag = 0;
		for (elemClient of arrClient) {
			if (elemClient.date !== elem.date && elemClient.name === elem.name && elemClient.tel === elem.tel && elemClient.id === elem.id) {
				flag += 1;
			} else {
				flag += 0;
			};
		};
		return flag;
	};

	function addArrClientele(elem) {
		// console.log('addArr', arrClientele);
		arrClientele.push(elem);	
		console.log('addArr', arrClientele);
		console.log('addArr elem', elem);	
		appendCardsInContainer(elem);

	};

	function createCardBody() {
		const tbody = document.createElement('div');
		tbody.classList.add('card-body');
		return tbody;
	};

	function createDisc(name, tel) {
		const p1 = createP(`ФИО: ${name}`);
		const p2 = createP(`Телефон: ${tel}`);
		p1.classList.add('name__surname');
		p2.classList.add('teleph');
		const infoClient = document.createElement('div');
		infoClient.classList.add('inao__client');
		infoClient.append(p1, p2);
		return infoClient;
	};

	function createDateInCard() {
		const shellForDate = document.createElement('div');
		shellForDate.classList.add('shell__for__date');
		return shellForDate;
	};

	function searchNameAndTel(elemClient) {
		const cardBody = [...document.getElementsByClassName('card-body')];

		let elemCard;
		let flag = 0;
		for (cardElem of cardBody) {
			const nameSurname = [...cardElem.getElementsByClassName('name__surname')][0];
			console.log('searchName', nameSurname.textContent.split(':').slice(1).join())

			const teleph = [...cardElem.getElementsByClassName('teleph')][0];
			if (nameSurname.textContent.split(': ').slice(1).join() === elemClient.name && teleph.textContent.split(': ').slice(1).join() === elemClient.tel) {
				// checkAndAndDateInCard2(cardElem);
				elemCard = nameSurname;
				flag += 1;
			} else {
				flag += 0;
			};
		};

		if (flag === 0) {
			return flag;
		} else {
			return elemCard;
		};
	};

	function checkAndAndDateInCard2(cardElem, ) {
		// const shellForDecs = cardElem.parentElement;
		console.log('shellForDecs11111', cardElem)
		const shellForDecs = cardElem.parentElement.nextElementSibling;		
console.log('shellForDecs11111', cardElem.parentElement.nextElementSibling)
		// for (let elem of shellForDecs) {
		// 	const name1 = [...elem.getElementsByClassName('name__surname')][0];
		// 	const tel1 = [...elem.getElementsByClassName('name__surname')][0];
		// 	if (elemClient.name === name1.textContent && elemClient.tel === tel1.textContent) {
		// 		for (let elemDate of arrDate) {

			
				
		// 			p3 = createP(`${new Date(elemDate).toLocaleDateString()}`);
		// 			p3.classList.add('card__date');
		// 			// shellForDate.append(p3)
		// 			elem.nextElementSibling.append(p3);
					
				
		// 		};
		// 	};
		// };


		// if ()
		for (let elemDate of arrElemDay) {

			
				console.log('elemDate', elemDate)
					p3 = createP(`${new Date(elemDate.id).toLocaleDateString()}`);
					p3.classList.add('card__date');
					// shellForDate.append(p3)
					shellForDecs.append(p3);
					
				
				};
		// arrElemDay = [];
	}

	function searchElemParentForClass(elem, searchClass) {
        if (elem !== undefined) {
            let elemParent = elem;
console.log('elem',elemParent.classList.contains(searchClass))
				while(!elemParent.classList.contains(searchClass)){
					if (elemParent.parentElement != null) {
						elemParent = elemParent.parentElement;
					};
					
				};
            return elemParent;
        };   
    };

	function checkAndAndDateInCard(elemClient) {
		console.log('elemmmmMMMmmm', elemClient)
		const shellForDate = createDateInCard();
		let p3;
		const dateTitle = createP('Дата:'); 
		dateTitle.classList.add('card__date');
		shellForDate.append(dateTitle);
console.log('elemmmmMMMmmm', elemClient.date)
		for (let date of elemClient.date) {
			// console.log('date_0', elemClient.data);
			if (elemClient.date.indexOf(date) === elemClient.date.length - 1) {
				p3 = createP(`${new Date(date).toLocaleDateString()}`);
				p3.classList.add('card__date');
				shellForDate.append(p3);
			} else {
				p3 = createP(`${new Date(date).toLocaleDateString()},`);
				p3.classList.add('card__date');
				shellForDate.append(p3);
			};
							
		};
		return shellForDate;
	};

	function addDataInCardInComtainer(elem) {
		const elemClient = elem;
console.log('elemClient ', elemClient)
		const tbody = createCardBody();
		const dateH3  = createH3();
		// const shellForDate = createDateInCard();
		const infoClient = createDisc(elemClient.name, elemClient.tel);
		const elemCard = searchNameAndTel(elemClient);
		// const dateTitle = createP('Дата:'); 
		// dateTitle.classList.add('card__date');
			
		if (elemCard !== 0) {
			// const shellForDate1 = [...elemCard.getElementsByClassName('shell__for__date')][0];
			// let p3;
			// for (let date of elemClient.date) {
			// 	if (elemClient.date.indexOf(date) === elemClient.date.length - 1) {
			// 		p3 = createP(`${new Date(date).toLocaleDateString()}`);
			// 		p3.classList.add('card__date');
			// 		shellForDate1.append(p3);
			// 	} else {
			// 		p3 = createP(`${new Date(date).toLocaleDateString()},`);
			// 		p3.classList.add('card__date');
			// 		shellForDate1.append(p3);
			// 	};
			// };
			
			// p3.classList.add('card__date');
			// shellForDate1.append(p3);
			checkAndAndDateInCard2(elemCard);
	
			// searchNameAndTel(elemClient);
			return 0;
		} else {
			// let p3;
			// shellForDate.append(dateTitle);
			// for (let date of elemClient.date) {
			// 	// console.log('date_0', elemClient.data);
			// 	if (elemClient.date.indexOf(date) === elemClient.date.length - 1) {
			// 		p3 = createP(`${new Date(date).toLocaleDateString()}`);
			// 		p3.classList.add('card__date');
			// 		shellForDate.append(p3);
			// 	} else {
			// 		p3 = createP(`${new Date(date).toLocaleDateString()},`);
			// 		p3.classList.add('card__date');
			// 		shellForDate.append(p3);
			// 	};
								
			// };
			
			// shellForDate.append(dateTitle, p3);
			const shellForDate = checkAndAndDateInCard(elemClient);
			tbody.append(dateH3, infoClient, shellForDate);
			return tbody;
		};
		
	};



	function createCardImg() {
		const img = document.createElement('img');
		img.classList.add('card__foto');
		return img;
	};


	function createTbody(elem) {
		if (arrClientele.length > 0) {

			const tbody = addDataInCardInComtainer(elem);		
			if (tbody !== 0) {
				let cards1 = document.createElement('div');
				const cardFoto = createCardImg();
	
				cards1.classList.add('card');
				cards1.append(cardFoto, tbody);
				return cards1;
			};

			return;
			
		};	
	};


	function createCards() {
		let cards = document.createElement('div');

		cards.classList.add('cards', 'col-md-9');

		return cards;
	};


	function addObject(elemClient) {
		console.log('data save', elemClient)
		const objClient = {date: jsonClientData(elemClient.date), name: elemClient.name, tel: elemClient.tel, id: elemClient.id};
		return objClient;
	};

	function clientChangeObj(elemClient) {
		const newDate = [];
		let flag = 0;
		// console.log('elemClient.date', JSON.parse(elemClient.date))

	    let datas = jsonClientData(elemClient.date)
		for (let date of datas) {
			// console.log('date', new Date(date))
			if (foolDate().getTime() <= new Date(date).getTime()) {
				newDate.push(date);
				flag += 0;
			} else {
				flag += 1;
			};
		};
		// console.log('flag', flag)
		return {
			flag,
			newDate	
		};
	};

	function addSystrm(elemClient) {

		// for (let elemDate of jsonClientData(elemClient.date)) {

		const objClient = addObject(elemClient);

		// 	addArrClientele(objClient);
		// };
		addArrClientele(objClient);
	};

	async function startCards({ onChangesOut }, { outOfServer }, { onDelete }) {

		const respons = await outOfServer();
		// console.log(respons);
		const oldDataClients = await respons.json();
		console.log(oldDataClients);
		for (let elemClient of oldDataClients) {

			const changeObj = clientChangeObj(elemClient);
			// console.log(changeObj.flag)
			if (changeObj.flag !== 0 && changeObj.newDate.length !== 0) {	

				elemClient.date = changeObj.newDate;
				const respons = await onChangesOut(elemClient);
				elemClient = await respons.json();
				const objClient = addObject(elemClient);
				addArrClientele(objClient);
				break
			} else if(changeObj.flag !== 0 && changeObj.newDate.length === 0) {

				onDelete(elemClient.id);
				continue;
			};
			// elemClient['data'] = jsonClientData(elemClient.date);
			// console.log('elemClient.data', elemClient)
			const objClient = addObject(elemClient);

		// 	addArrClientele(objClient);
		// };
			addArrClientele(objClient);
			// addSystrm(elemClient);
		};
	
	};


	function dataClientJson(data) {
		return JSON.stringify(data);
	};

	//вернет входящу строку в виде данных
	function jsonClientData(data) {
		return JSON.parse(data);
	};



	// Создаём календарь

	function elementsCalendar() {
		const monthYearEl = document.getElementById('month-year');
		const daysContainer = document.getElementById('calendar-days');
		// console.log('das', daysContainer);
		const dayNamesContainer = document.querySelector('.calendar__day-names');
		const prevBtn = document.getElementById('prev-btn');
		const nextBtn = document.getElementById('next-btn');

		return {
			monthYearEl,
			daysContainer,
			dayNamesContainer,
			prevBtn,
			nextBtn	
		};
	};

	// const elementsCal = elementsCalendar();

	function monthCalendar() {
		const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
		return months;
	};

	const monthNames = monthCalendar();

	function daysNamesCalendar() {
		const daysNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
		return daysNames;
	};

	const daysNamesCal = daysNamesCalendar();

	function currentDateCalendar() {
		let currentDate = new Date();
		return currentDate;
	};

	const currentDateCal = currentDateCalendar();

	function renderDayNames() {
		elemCalendar.dayNamesContainer.innerHTML = daysNamesCal.map(day => `<span>${day}</span>`).join('');
	};

	function addEmptyElemInCalendar(firstDay) {
		for (let i = 0; i < firstDay; i++) {
			elemCalendar.daysContainer.innerHTML += '<span class="calendar__days-hidden"></span>'; 
		}
	};

	function addDaysInCalendar(year, month, daysInMonth) {
		for (let day = 1; day <= daysInMonth; day++) {

			const isToday = day === new Date().getDate() &&
							month === new Date().getMonth() &&
							year === new Date().getFullYear();

			elemCalendar.daysContainer.innerHTML += `<span id="${year},${month+1},${day}" class="${isToday ? 'day today dayName'  : `day dayName`}">${day}</span>`;

		};
	};



	function changeMonth(delta) {
	// Год месяц, первый день, кол-во дней в месяце
		currentDateCal.setMonth(currentDateCal.getMonth() + delta);
		const year = currentDateCal.getFullYear();
		const month = currentDateCal.getMonth();
		const firstDay = (new Date(year, month).getDay() + 6) % 7;
		const daysInMonth = 32 - new Date(year, month, 32).getDate();
		renderCalendar(year, month, firstDay, daysInMonth);
	};

	function renderCalendar(year, month, firstDay, daysInMonth) {
		elemCalendar.monthYearEl.textContent = `${monthNames[month]} ${year}`;
		elemCalendar.daysContainer.textContent = '';
		addEmptyElemInCalendar(firstDay);
		addDaysInCalendar(year, month, daysInMonth);
		// addBronDay();

		// addActiveOutArrElemDay();
	};

	function createNewCalendar() {
		changeMonth(0)
		elemCalendar.prevBtn.addEventListener('click',() => {
			changeMonth(-1);
			addActiveOutArrElemDay();
		});
		elemCalendar.nextBtn.addEventListener('click',() => {
			changeMonth(1);
			addActiveOutArrElemDay();
		});

		renderDayNames();

	};

	function choseDay(elem) {
		if(elem.classList.contains('day') && !elem.classList.contains('bron') && foolDate().getTime() <= new Date(elem.id).getTime()) {
			elem.classList.add('active');
			elem.classList.remove('day');

		} else if(elem.classList.contains('active')  && !elem.classList.contains('bron') && foolDate().getTime() <= new Date(elem.id).getTime()) {
			elem.classList.remove('active');
			elem.classList.add('day');

		};
	};

	function clickAndActionDay() {
	const newCalendar = [...document.getElementsByClassName('calendar__body')];
		newCalendar[0].addEventListener('click', e => {
			
			choseDay(e.target);
			addInArrElemDay(e.target);
			
		});
	};

	function newSwiper() {
		new Swiper('.swiper', {

			slidesPerView: 1,
	  
			touchRatio: 1,

			autoHeight: true,
		  
			speed: 500,  
			  
			nested: true,    
			navigation: {
			  nextEl: '.swiper-button-next',
			  prevEl: '.swiper-button-prev',
			},
			  
		});
	};

	const pushServer = {
        onOut(date, name, tel1) {
            const response = fetch("http://localhost:5500/api/todos", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                owner: title1,
				tel: tel1,
                date: date
                }),
                'Content_Type': "application/json",
            });
            return response;
        }
        
    };

	const getServer = {
		outOfServer() {
			const response = fetch(`http://localhost:5500/api/todos?owner=${title1}`);
			return response;
		}
	};

	const pushChangesServer = {

		onChangesOut(elemClient) {
            const response = fetch(`http://localhost:5500/api/todos/${elemClient.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                name: elemClient.name,
                owner: title1,
				tel: elemClient.tel,
                date: elemClient.date
                }),
                'Content_Type': "application/json",
            });
            return response;
        }
    };

	const deleteData = {
			
        onDelete(id) {
            fetch(`http://localhost:5500/api/todos/${id}`, {
                method: 'DELETE'
            });
        }
    };

	function addClientOutOfServer(elemClient) {
		// console.log('elementClient', elementClient)	
		// for (elemDate of jsonClientData(elementClient.date)) {
			
		// 	let objClient = {date: jsonClientData(elemDate), name: elementClient.name, tel: elementClient.tel, id: elementClient.id};
		// 	addArrClientele(objClient);
			
		// 	let lastCards = [...document.getElementsByClassName('cards')];
		// 	lastCards = lastCards[lastCards.length - 1];
		// 	lastCards.scrollIntoView({ behavior: 'smooth', block: 'end' });
		const objClient = addObject(elemClient);

		// 	addArrClientele(objClient);
		// };
		addArrClientele(objClient);
		// };
		// elemClient.data = jsonClientData(elemClient.date);
		// console.log('elemClient.data', elemClient.data)
		// addSystrm(elemClient);
	};

	function addDateInArrDate(arrDate, elemClient) {
// console.log('arrDate ', arrDate)
// console.log('elemClientDate.date ', elemClientDate.date)
//  сдесь флаги	

		const newArr  = [];

		for (let date of arrDate) {
			let flag = 0;
			for (let elemDate of elemClient.date) {
				if (elemDate !== date) {
					flag += 0;
				} else {
					flag += 1;
				};
			};
			if (flag === 0) {
				newArr.push(date);
				elemClient.date = newArr;
				console.log('arrDate ', elemClient)
			};

		};
		return elemClient;
	};

	function checkNameAndTel(name, tel) {
		let flag = 0;
		let newElemClient;
		for (let elemClient of arrClientele) {
			console.log('arrClientele', arrClientele)
			
			if (elemClient.name === name && elemClient.tel === tel) {
				for (let elemDate of arrElemDay) {
					console.log('elemClient.date', elemClient.date)
					console.log('elemDate.id', elemDate.id)
					const date1 = elemClient.date;
					date1.push(elemDate.id);
				
					const objClient = {date: date1, name: elemClient.name, tel: elemClient.tel, id: elemClient.id};
					newElemClient = objClient;
					
				
				};
				// const objClient = {date: elemClient.date.push(arrElemDay), name: elemClient.name, tel: elemClient.tel, id: elemClient.id};
				// newElemClient = elemClient;
				flag += 1;
				
			} else {
				flag += 0;
				
			};

		};
// и отправить его
		return {flag,
		newElemClient
		};
	};

	async function addBronIn({ onOut }, { onChangesOut }, todoItemForm) {
		await todoItemForm.form.addEventListener('submit', async function (e) {
			let name = todoItemForm.inputName.value;
			let tel = todoItemForm.inputTel.value;
			// console.log([...e.target.getElementsByClassName('calendar__btn')][0]);
			
			e.preventDefault();
			if (!todoItemForm.inputName.value & !todoItemForm.inputTel.value) {
				return;
			};
			
			const arrDate = [];
			for (elem of arrElemDay) {
				arrDate.push(elem.id);
			};

			// const response = await onOut(arrDate, name, tel);
			// const elementClient = await response.json();

			// addClientOutOfServer(elementClient);
			const checker = checkNameAndTel(name, tel);
			if (checker.flag === 0) {
				const response = await onOut(arrDate, name, tel);
				const elementClient = await response.json();
				addClientOutOfServer(elementClient);
			} else {
				let elemClient = checker.newElemClient;
			    // elemClient = addDateInArrDate(arrDate, elemClient);
				// elemClient.date = newDate; 
				const respons = await onChangesOut(elemClient);
				elemClient = await respons.json();
				console.log('bla1',elemClient)
				const objClient = addObject(elemClient);
				console.log('bla2',objClient)
				addArrClientele(objClient);
// addClientOutOfServer(elemClient);
				// appendCardsInContainer(elemClient);
			}
// addBronDay();
			arrElemDay = [];
			
			[...document.getElementsByClassName('input-name')][0].value = '';
			[...document.getElementsByClassName('input-tel')][0].value = '';
		});
	};

	function createClientApp(container, title) {
		let body = [...document.getElementsByTagName('body')][0];
		const fot = ['foto/cyt.png', 'foto/cyt2.png', 'foto/town-night.png', 'foto/cyt3.png', 'foto/cyt4.png', 'foto/cyt5.png', 'foto/cyt6.png'];
		
		fotoIndex = Math.floor(Math.random() * 7);

		body.style.cssText = `background: url(${fot[fotoIndex]}) center center no-repeat; background-size: cover`;
 
		
		title1 = title;
		let todoAppTitle = createAppTitle('Форма для бронирования');
		let todoItemForm = createTodoItemForm();
	
		
		newSwiper();

		container.append(todoAppTitle, todoItemForm.form);
		
	
		
		elemCalendar = elementsCalendar();
// addBronIn(pushServer, pushChangesServer, todoItemForm);
		startCards(pushChangesServer, getServer, deleteData);
addBronIn(pushServer, pushChangesServer, todoItemForm);
		createNewCalendar();
		clickAndActionDay();

		// addBronIn(pushServer, pushChangesServer, todoItemForm);
	
		
	};	
	
	window.createClientApp = createClientApp;
})();
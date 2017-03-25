const event = {};//事件对象
const lunarInfo = [
	0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
	0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
	0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
	0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
	0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
	0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
	0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
	0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
	0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
	0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
	0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
	0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
	0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
	0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
	0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
];
const animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
const gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const zhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

let dateObj = new Date();

dateObj.year = dateObj.getFullYear();
dateObj.month = dateObj.getMonth();
dateObj.date = dateObj.getDate();

/*工具函数*/
const dateUtils = {
	sNow(dateObj){
		dateObj = new Date();
		dateObj.year = dateObj.getFullYear();
		dateObj.month = dateObj.getMonth();
		dateObj.date = dateObj.getDate();
	},
	
	sYear(n) {
		dateObj.setFullYear(dateObj.year + n);
		dateObj.year = dateObj.getFullYear();
		dateObj.month = dateObj.getMonth();
		dateObj.date = dateObj.getDate();
	},
	
	sMonth(n) {
		const date = dateObj.getDate();
		const month = dateObj.getMonth();
		
		//修正月大时间溢出bug
		if (month !== 1) {
			//非二月
			if (date === 31) {
				dateObj.debugDate = 31;
				dateObj.setDate(30);
			}
		} else {
			//二月
			if (date === 29) {
				dateObj.debugDate = 29;
				dateObj.setDate(28);
			}
		}
		
		dateObj.setMonth(month + n);
		dateObj.year = dateObj.getFullYear();
		dateObj.month = dateObj.getMonth();
		dateObj.date = dateObj.getDate();
	},
	
	sDate(n){
		dateObj.setDate(dateObj.date + n);
		dateObj.year = dateObj.getFullYear();
		dateObj.month = dateObj.getMonth();
		dateObj.date = dateObj.getDate();
	},
	
	/**
	 * 传入 offset 传回干支, 0=甲子
	 * @param num
	 * @returns {string}
	 */
	cyclical(num) {
		return gan[num % 10] + zhi[num % 12];
	},
	
	/**
	 * 传回农历 y年的总天数
	 * @param y
	 * @returns {*}
	 */
	lYearDays(y) {
		let sum = 348;
		
		for (let i = 0x8000; i > 0x8; i >>= 1) {
			sum += (lunarInfo[y - 1900] & i) ? 1: 0;
		}
		
		return sum + this.leapDays(y);
	},
	
	/**
	 * 传回农历 y年闰月的天数
	 * @param y
	 * @returns {number}
	 */
	leapDays(y) {
		if (this.leapMonth(y)) {
			return (lunarInfo[y - 1900] & 0x10000) ? 30: 29;
		}
		
		return 0;
	},
	
	/**
	 * 传回农历 y年闰哪个月 1-12 , 没闰传回 0
	 * @param y
	 * @returns {number}
	 */
	leapMonth(y) {
		return lunarInfo[y - 1900] & 0xf;
	},
	
	/**
	 * 传回农历 y年m月的总天数
	 * @param y
	 * @param m
	 * @returns {number}
	 */
	monthDays(y, m) {
		return (lunarInfo[y - 1900] & (0x10000 >> m)) ? 30: 29;
	},
	
	/**
	 * 返回格式时间,yymmdd:年，月，日
	 * @param formatStr
	 * @returns {string}
	 */
	format(formatStr = 'yymmdd') {
		let tag = '<span>';
		
		if (formatStr === 'yymm') {
			return `<span>${tag}${dateObj.year}年</span><span>${dateObj.month + 1}月</span></span>`;
		}
		
		if (formatStr === 'yy') {
			return `${tag}${dateObj.year}年</span>`;
		}
		
		if (formatStr === 'mm') {
			return `${tag}${dateObj.month + 1}月</span>`;
		}
		
		//星期日和星期六
		if (dateObj.getDay() === 0) {
			tag = '<span class="sun">';
		}
		if (dateObj.getDay() === 6) {
			tag = '<span class="sat">';
		}
		
		return `<span>${tag}${dateObj.year}年</span><span>${dateObj.month + 1}月</span><span>${dateObj.date}日</span></span>`;
	},
	
	weekday() {
		const day = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
		const thisDay = dateObj.getDay();
		
		if (thisDay === 0) {
			return `<span class="sun">${day[dateObj.getDay()]}</span>`;
		}
		
		if (thisDay === 6) {
			return `<span class="sat">${day[dateObj.getDay()]}</span>`;
		}
		
		return `<span>${day[dateObj.getDay()]}</span>`;
	},
	
	/**
	 * 中文日期
	 * @param m
	 * @param d
	 * @returns {string}
	 */
	cDay(m, d) {
		const nStr1 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
		const nStr2 = ['初', '十', '廿', '卅', '　'];
		let s;
		
		if (m > 10) {
			s = '十' + nStr1[m - 10]
		} else {
			s = nStr1[m]
		}
		
		s += '月';
		
		switch (d) {
			case 10:
				s += '初十';
				break;
			case 20:
				s += '二十';
				break;
			case 30:
				s += '三十';
				break;
			default:
				s += nStr2[Math.floor(d / 10)];
				s += nStr1[Math.floor(d % 10)];
		}
		
		return s;
	},
	
	/**
	 * 返回农历
	 * @returns {string}
	 */
	/*solarDay2() {
	 //const sDObj = new Date(dateObj.year, dateObj.month, dateObj.date);
	 const lDObj = new Lunar(dateObj);
	 const cl = '<span class="lunar">';
	 
	 //农历BB'+(cld[d].isLeap?'闰 ':' ')+cld[d].lMonth+' 月 '+cld[d].lDay+' 日
	 return cl + this.cDay(lDObj.month, lDObj.day) + '</span>';
	 },*/
	
	/**
	 * 返回节气和节假日
	 * @returns {*}
	 */
	solarDay3() {
		const sTermInfo = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];
		const solarTerm = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
		const lFtv = ["0101*春节", "0115 元宵节", "0505 端午节", "0707 七夕情人节", "0715 中元节", "0815 中秋节", "0909 重阳节", "1208 腊八节", "1224 小年", "0100*除夕"];
		const sFtv = ["0101*元旦", "0214 情人节", "0308 妇女节", "0312 植树节", "0315 消费者权益日", "0401 愚人节", "0501 劳动节", "0504 青年节", "0512 护士节", "0601 儿童节", "0701 建党节 香港回归纪念", "0801 建军节", "0808 父亲节", "0909 南晟网周年纪念日", "0910 教师节", "0928 孔子诞辰", "1001*国庆节", "1006 老人节", "1024 联合国日", "1112 孙中山诞辰", "1220 澳门回归纪念", "1225 圣诞节", "1226 毛主席诞辰"];
		
		//var sDObj = new Date(dateObj.year, dateObj.month, dateObj.date);
		const lDObj = new Lunar(dateObj);
		let solarTerms = '';
		let solarFestival = '';
		let lunarFestival = '';
		let tmp1;
		let tmp2;
		
		//农历节日
		for (let [i] of lFtv) {
			if (lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
				tmp1 = Number(RegExp.$1) - lDObj.month;
				tmp2 = Number(RegExp.$2) - lDObj.day;
				if (tmp1 == 0 && tmp2 == 0) {
					lunarFestival = RegExp.$4;
				}
			}
		}
		
		//国历节日
		for (let [i] of sFtv) {
			if (sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
				tmp1 = Number(RegExp.$1) - (dateObj.month + 1);
				tmp2 = Number(RegExp.$2) - dateObj.date;
				if (tmp1 == 0 && tmp2 == 0) {
					solarFestival = RegExp.$4;
				}
			}
		}
		
		//节气
		tmp1 = new Date((31556925974.7 * (dateObj.year - 1900) + sTermInfo[dateObj.month * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
		tmp2 = tmp1.getUTCDate();
		
		if (tmp2 == dateObj.date) {
			solarTerms = solarTerm[dateObj.month * 2 + 1];
		}
		
		tmp1 = new Date((31556925974.7 * (dateObj.year - 1900) + sTermInfo[dateObj.month * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
		tmp2 = tmp1.getUTCDate();
		
		if (tmp2 == dateObj.date) {
			solarTerms = solarTerm[dateObj.month * 2];
		}
		
		if (solarTerms == '' && solarFestival == '' && lunarFestival == '') {
			return '';
		} else {
			return '<span class="festival">' + solarTerms + ' ' + solarFestival + ' ' + lunarFestival + '</span>';
		}
	},
	
	/**
	 * 获取当月的阳历天数
	 * @param year
	 * @param month
	 * @returns {number}
	 */
	getNowMonthDays(year, month) {
		let isy = false;
		
		if (dateObj.year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
			isy = true;
		}
		
		switch (month) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				return 31;
			case 4:
			case 6:
			case 9:
			case 11:
				return 30;
			case 2:
				return isy ? 28: 29;
		}
	},
	
	/**
	 * 获取该月一号是周几
	 * @returns {number}
	 */
	getStartWeek() {
		const d=dateObj.date % 7;
		let startweek;
		
		if (d > 0) {
			startweek = dateObj.getDay() + 1 + 7 - d;
		}else {
			startweek = dateObj.getDay() + 1;
		}
		
		return startweek > 7 ? startweek % 7: startweek;
	},
	
	/**
	 * 获取农历
	 * @param year
	 * @param month
	 * @param day
	 * @returns {*|string}
	 */
	getSolarDay(year, month, day) {
		const lDObj = new Lunar(dateObj);
		
		//农历BB'+(cld[d].isLeap?'闰 ':' ')+cld[d].lMonth+' 月 '+cld[d].lDay+' 日
		return this.cDay(lDObj.month, lDObj.day);
	},
	
	/**
	 * 最近相匹配自身或父元素
	 * @param elem
	 * @param selector
	 * @returns {*}
	 */
	closest(elem, selector) {
		if (!elem) {
			return this;
		}
		
		let parentDom = elem;
		
		while (parentDom) {
			if (parentDom.matches(selector)) {
				return parentDom;
			}
			
			parentDom = parentDom.parentElement;
		}
	},
	
	/**
	 * 初始化日历基本html
	 * @param calendarDom
	 */
	creatDom(calendarDom) {
		calendarDom.innerHTML = `
<header class="r-calendar-header">
  <!--年月日显示在一块-->
  <div class="r-calendar-date">
    <span class="r-calendar-date-prev">&lt;</span>
    <span class="r-calendar-date-data"></span>
    <span class="r-calendar-date-next">&gt;</span>
  </div>
  <!--显示年份-->
  <div class="r-calendar-year-box">
    <span class="r-calendar-year-prev">&lt;</span>
    <span class="r-calendar-year-data"></span>
    <span class="r-calendar-year-next">&gt;</span>
  </div>
  <!--显示月份-->
  <div class="r-calendar-month-box">
    <span class="r-calendar-month-prev">&lt;</span>
    <span class="r-calendar-month-data"></span>
    <span class="r-calendar-month-next">&gt;</span>
  </div>
</header>

<div class="r-calendar-week">
  <span>一</span>
  <span>二</span>
  <span>三</span>
  <span>四</span>
  <span>五</span>
  <span>六</span>
  <span>日</span>
</div>

<ul class="r-calendar-month"></ul>
<footer class="r-calendar-footer">
  <!--时分秒选择-->
  <div class="r-calendar-time">
    <span class="r-calendar-time-hh" contenteditable="true">10</span>:
    <span class="r-calendar-time-mm" contenteditable="true">45</span>:
    <span class="r-calendar-time-ss" contenteditable="true">08</span>
  </div>
  <!--基本操作按扭-->
  <div class="r-calendar-btn-box">
  <button class="r-btn r-btn-default r-calendar-btn-clear">清空</button>
  <button class="r-btn r-btn-default r-calendar-btn-today">今天</button>
  <button class="r-btn r-btn-default r-calendar-btn-yes">确定</button>
</div>
</footer>`;
	}
};

/**
 * 算出农历, 传入日期物件, 传回农历日期物件
 * 该物件属性有 .year .month .day .isLeap .yearCyl .dayCyl .monCyl
 */
class Lunar {
	constructor(objDate) {
		let i;
		let leap = 0;
		let temp = 0;
		let offset = (objDate - new Date(1900, 0, 31)) / 86400000;
		
		this.dayCyl = offset + 40;
		this.monCyl = 14;
		
		for (i = 1900; i < 2050 && offset > 0; i++) {
			temp = dateUtils.lYearDays(i);
			offset -= temp;
			this.monCyl += 12
		}
		if (offset < 0) {
			offset += temp;
			i--;
			this.monCyl -= 12
		}
		
		this.year = i;
		this.yearCyl = i - 1864;
		
		leap = dateUtils.leapMonth(i);//闰哪个月
		this.isLeap = false;
		
		for (i = 1; i < 13 && offset > 0; i++) {
			//闰月
			if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
				--i;
				this.isLeap = true;
				temp = dateUtils.leapDays(this.year);
			} else {
				temp = dateUtils.monthDays(this.year, i);
			}
			
			//解除闰月
			if (this.isLeap == true && i == (leap + 1)) {
				this.isLeap = false;
			}
			
			offset -= temp;
			if (this.isLeap == false) {
				this.monCyl++;
			}
		}
		
		if (offset == 0 && leap > 0 && i == leap + 1)
			if (this.isLeap) {
				this.isLeap = false;
			}
			else {
				this.isLeap = true;
				--i;
				--this.monCyl;
			}
		
		if (offset < 0) {
			offset += temp;
			--i;
			--this.monCyl;
		}
		
		this.month = i;
		this.day = offset + 1
	}
}

/**
 * Calendar日历类
 */
class Calendar {
	constructor(target, {
			tag = {},//日期标记数据
			
			//年月日显示在一块相关
			dateBox='r-calendar-date',
			dateData='r-calendar-date-data',
			datePrvBtn='r-calendar-date-prev',
			dateNextBtn='r-calendar-date-next',
			
			//显示年份相关
			yearBox='r-calendar-year-box',
			yearData='r-calendar-year-data',
			yearPrvBtn='r-calendar-year-prev',
			yearNextBtn='r-calendar-year-next',
			
			//显示月份相关
			monthBox='r-calendar-month-box',
			monthData='r-calendar-month-data',
			monthPrvBtn='r-calendar-month-prev',
			monthNextBtn='r-calendar-month-next',
			showMonthBox='r-calendar-month',
			
			//显示底部相关
			footerBox='r-calendar-footer',
			timeBox='r-calendar-time',
			timeHH='r-calendar-time-hh',
			timeMM='r-calendar-time-mm',
			timeSS='r-calendar-time-ss',
			btnBox='r-calendar-btn-box',
			btnClear='r-calendar-btn-clear',
			btnToday='r-calendar-btn-today',
			btnYes='r-calendar-btn-yes',
			
			mode='pc',//显示模式,'pc':pc模式；'phone':手机模式
			isShowdateInline=true,
			isShowFooter=true,
			disabled='disabled',
			lunar='lunar',
			note='note',
			prevMonthScope=2,//向前一个月范围
			nextMonthScope=0,//向后一个月范围
			isShowLunar=true,//是否显示农历
			isShowNote=true,//是否显示日期状态
			initDate=dateObj,//初始化时间
	}={}) {
		this._opts = {
			disabled,
			lunar,
			note,
			prevMonthScope,
			nextMonthScope,
			isShowLunar,
			isShowNote,
			isShowdateInline,
			isShowFooter,
			initDate
		};
		
		this.resetDate();
		
		//初始化基本html结构
		dateUtils.creatDom(target);
		
		//一些控件dom元素
		this.target = target;
		this.dateBox = target.getElementsByClassName(dateBox)[0];
		this.dateData = this.dateBox.getElementsByClassName(dateData)[0];
		this.prevDateBtn = this.dateBox.getElementsByClassName(datePrvBtn)[0];
		this.nextDateBtn = this.dateBox.getElementsByClassName(dateNextBtn)[0];
		
		this.yearBox = target.getElementsByClassName(yearBox)[0];
		this.yearData = this.yearBox.getElementsByClassName(yearData)[0];
		this.prevYearBtn = this.yearBox.getElementsByClassName(yearPrvBtn)[0];
		this.nextYearBtn = this.yearBox.getElementsByClassName(yearNextBtn)[0];
		
		this.monthBox = target.getElementsByClassName(monthBox)[0];
		this.monthData = this.monthBox.getElementsByClassName(monthData)[0];
		this.prevMonthBtn = this.monthBox.getElementsByClassName(monthPrvBtn)[0];
		this.nextMonthBtn = this.monthBox.getElementsByClassName(monthNextBtn)[0];
		
		this.footerBox = target.getElementsByClassName(footerBox)[0];
		
		this.showMonthBox = target.getElementsByClassName(showMonthBox)[0];
		
		this.tag = tag;
		this._config();
		this._bindEvent();
		
		//Calendar.showYearDate(this.yearData);

		this._opts.initDate&&this.initDate(this._opts.initDate);//初始化日期
		this.showMonth(this.showMonthBox);
		
		this.dateData.innerHTML = dateUtils.format('yymm');
		this.yearData.innerHTML = this.year + '年';
		this.monthData.innerHTML = this.month + '月';

		Calendar.pub('loaded.calendar', this);
	}
	
	/**
	 * 显示下一月
	 */
	initDate(date) {
		//ios时间兼容转换
		date=date.split('-').join('/');

		dateObj=new Date(date);
		dateObj.year = dateObj.getFullYear();
		dateObj.month = dateObj.getMonth();
		dateObj.date = dateObj.getDate();
		
		this.today = { year: dateObj.year, month: dateObj.month, date: dateObj.date };
		this.year = dateObj.year;
		this.month = dateObj.month + 1;
	}

　resetDate(){
	 this.today = { year: dateObj.year, month: dateObj.month, date: dateObj.date };
	 this.year = dateObj.year;
	 this.month = dateObj.month + 1;
 }
	
	//显示日历
	show() {}
	
	//显示年份选择器
	showYearSelecter() {}
	
	//显示月份选择器
	showMonthSelecter() {}
	
	//显示时间选择器
	showTimeSelecter() {}
	
	//隐藏日历
	hide() {}
	
	//清空并复原，把时间重设到现在时间
	clear() {}
	
	/**
	 * 显示上一月
	 */
	prevMonth(noteData) {
		this.month--;
		dateUtils.sMonth(-1);
		this.resetDate();
		noteData&&(this.tag = noteData);//设置状态信息
		
		if (this._opts.isShowdateInline) {
			Calendar.showDate(this.dateData);
		} else {
			Calendar.showMonthDate(this.monthData);
		}
		
		this.showMonth(this.showMonthBox);
	}
	
	/**
	 * 显示下一月
	 */
	nextMonth(noteData) {
		this.month++;
		dateUtils.sMonth(1);
		this.resetDate();
		this.tag = noteData;//设置状态信息
		if (this._opts.isShowdateInline) {
			Calendar.showDate(this.dateData);
		} else {
			Calendar.showMonthDate(this.monthData);
		}
		this.showMonth(this.showMonthBox);
	}
	
	selectFn(date) {
		const arr = [];
		arr.forEach.call(this.showMonthBox.children, function (item) {
			arr.forEach.call(item.children, function (item) {
				item.classList.remove('select')
			});
		});
		date.classList.add('select');
		
		const thisDate = `${dateObj.year}-${dateObj.month + 1}-${Number.parseInt(date.textContent, 10)}`;
		Calendar.pub('select.calendar', thisDate);
	}
	
	selectDay(day) {
		const dayDoms=this.showMonthBox.querySelectorAll('li>span');
		
		[].forEach.call(dayDoms,function (item,i) {
			if (Number.parseInt(item.textContent,10)===day) {
				c.selectFn(item);
			}
		});
	}
	
	/**
	 * 年份和月份一块显示
	 * @param dateBox
	 */
	static showDate(dateBox) {
		dateBox.innerHTML = dateUtils.format('yymm');
	}
	
	/**
	 * 显示年分
	 * @param yearBox
	 */
	static showYearDate(yearBox) {
		yearBox.innerHTML = dateUtils.format('yy');
	}
	
	/**
	 * 显示月份
	 * @param monthBox
	 */
	static showMonthDate(monthBox) {
		monthBox.innerHTML = dateUtils.format('mm');
	}
	
	/**
	 * 显示月视图
	 * @param showMonthBox
	 */
	showMonth(showMonthBox) {
		const days = dateUtils.getNowMonthDays(dateObj.year, dateObj.month + 1);
		const startweek = dateUtils.getStartWeek();
		let html = '<li>';
		let index = 0;
		
		//灰愎时间修正
		if (dateObj.debugDate && this.today.month === dateObj.month) {
			dateObj.setDate(dateObj.debugDate);
			dateObj.year = dateObj.getFullYear();
			dateObj.month = dateObj.getMonth();
			dateObj.date = dateObj.debugDate;
		}
		for (let i = startweek - 1; i > 0; i--) {
			html += "<span>&nbsp;</span>";
			index++;
		}
		
		for (let i = 1; i <= days; i++) {
			//一个星期结束位置
			if (index % 7 == 0) {
				html += "</li><li>";
			}
			
			if (i === dateObj.date && this.today.month === dateObj.month) {
				//当天日期
				if (this.tag[i]) {
					if (this.tag[i] === '超时') {
						html += "<span class='today select err'>" + i + "<b class='lunar'>" + dateUtils.getSolarDay(dateObj.year, dateObj.month, i) + "</b>" + "<b class='note'>" + this.tag[i] + "</b>" + "</span>";
					} else if (this.tag[i] === '正常') {
						html += "<span class='today select leave'>" + i + "<b class='lunar'>" + dateUtils.getSolarDay(dateObj.year, dateObj.month, i) + "</b>" + "<b class='note'>" + this.tag[i] + "</b>" + "</span>";
					}else if (this.tag[i] === '未打卡') {
						html += "<span class='today select chuqing'>" + i + "<b class='lunar'>" + dateUtils.getSolarDay(dateObj.year, dateObj.month, i) + "</b>" + "<b class='note'>" + this.tag[i] + "</b>" + "</span>";
					} else {
						html += "<span class='today select'>" + i + "<b class='lunar'>" + dateUtils.getSolarDay(dateObj.year, dateObj.month, i) + "</b>" + "<b class='note'>" + this.tag[i] + "</b>" + "</span>";
					}
				} else {
					html += "<span class='today select'>" + i + "<b class='lunar'>" + dateUtils.getSolarDay(dateObj.year, dateObj.month, i) + "</b>" + "</span>";
				}
			} /*else if(this.today.month>=month&&i>date){
			 //无效日期
			 }*/
			else {
				//正常日期
				if (this.tag[i]) {
					if (this.tag[i] === '超时') {
						html += "<span class='err'>" + i + "<b class='lunar'>" + dateUtils.getSolarDay(dateObj.year, dateObj.month, i) + "</b>" + "<b class='note'>" + this.tag[i] + "</b>" + "</span>";
					} else if (this.tag[i] === '正常') {
						html += "<span class='leave'>" + i + "<b class='lunar'>" + dateUtils.getSolarDay(dateObj.year, dateObj.month, i) + "</b>" + "<b class='note'>" + this.tag[i] + "</b>" + "</span>";
					}else if (this.tag[i] === '未打卡') {
						html += "<span class='chuqing'>" + i + "<b class='lunar'>" + dateUtils.getSolarDay(dateObj.year, dateObj.month, i) + "</b>" + "<b class='note'>" + this.tag[i] + "</b>" + "</span>";
					} else {
						html += "<span>" + i + "<b class='lunar'>" + dateUtils.getSolarDay(dateObj.year, dateObj.month, i) + "</b>" + "<b class='note'>" + this.tag[i] + "</b>" + "</span>";
					}
				} else {
					html += "<span>" + i + "<b class='lunar'>" + dateUtils.getSolarDay(dateObj.year, dateObj.month, i) + "</b>" + "</span>";
				}
			}
			
			index++;
		}
		
		for (var i = 0; i < 7; i++) {
			if (index % 7 == 0) {
				break;
			}
			
			html += "<span>&nbsp;</span>";
			index++;
		}
		
		html += "</li>";
		showMonthBox.innerHTML = html;
	}
	
	/**
	 * 订阅事件
	 * 用法：$.sub('r.this.event',function(e,data){ console.log(data); });
	 * @param type
	 * @param eventHandler
	 */
	static sub(type, eventHandler) {
		event[type] || (event[type] = []);
		event[type].push(eventHandler);
	}
	
	/**
	 * 触发事件
	 * setTimeout(function(){ $.pub('r.this.event','ruying'); },2000);
	 * @param type
	 * @param data
	 */
	static pub(type, data) {
		const eventLists = event[type];
		const e = { type };
		
		if (eventLists) {
			for (let handler of eventLists) {
				handler(e, data);
			}
		}
	}
	
	/**
	 * 移除事件
	 * @param type
	 */
	static off(type) {
		event[type] = null;
	}
	
	/**
	 * 一些基本设置
	 */
	_config() {
		if (!this._opts.isShowLunar) {
			this.target.classList.add('hide-' + this._opts.lunar);
		}
		
		if (!this._opts.isShowNote) {
			this.target.classList.add('hide-' + this._opts.note);
		}
		
		//头部日期显示设置
		if (this._opts.isShowdateInline) {
			this.yearBox.classList.add('hide');
			this.monthBox.classList.add('hide');
		} else {
			this.dateBox.classList.add('hide');
		}
		
		//是否显示底部相关信息
		if (!this._opts.isShowFooter) {
			this.footerBox.classList.add('hide');
		}
	}
	
	/**
	 * 绑定事件
	 * @private
	 */
	_bindEvent() {
		//点击日历事件
		this.showMonthBox.addEventListener('click', e=> {
			const target = e.target;
			var thisDate = dateUtils.closest(target, 'span');
			
			if (!(thisDate && thisDate.children.length && thisDate.getElementsByClassName('note').length) && dateUtils.closest(target, 'ul') && dateUtils.closest(target, 'ul').classList.contains('r-calendar-month')) {
				return;
			}
			
			//this.selectFn(thisDate);
		}, false);
	}
}

Object.assign(Calendar.prototype, {
	sYear: dateUtils.sYear,
	sMonth: dateUtils.sMonth,
	sDate: dateUtils.sDate
});

//导出日历类
window.Calendar = Calendar;
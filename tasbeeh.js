/* =========================================
   ذَكِّرني - التسبيح الإلكتروني
========================================= */


/* العداد الحالي */
let count = 0;


/* الذكر المختار */
let selectedDhikr =
    "سُبْحَانَ اللَّهِ";


/* عناصر الصفحة */

const countElement =
    document.getElementById(
        "tasbeehCount"
    );

const selectedElement =
    document.getElementById(
        "selectedDhikr"
    );

const todayElement =
    document.getElementById(
        "todayCount"
    );

const savedElement =
    document.getElementById(
        "savedCount"
    );

const totalElement =
    document.getElementById(
        "totalCount"
    );

const savedMessage =
    document.getElementById(
        "savedMessage"
    );

const tasbeehButton =
    document.getElementById(
        "tasbeehButton"
    );


/* =========================================
   تحويل الأرقام
========================================= */

function arabicNumbers(number) {

    return String(number).replace(
        /\d/g,
        digit => "٠١٢٣٤٥٦٧٨٩"[digit]
    );

}


/* =========================================
   صوت التسبيح
========================================= */

function playTasbeehSound() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) {
            return;
        }


        const audio =
            new AudioContext();


        const oscillator =
            audio.createOscillator();

        const gain =
            audio.createGain();


        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
            650,
            audio.currentTime
        );


        gain.gain.setValueAtTime(
            0.08,
            audio.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + 0.09
        );


        oscillator.connect(gain);

        gain.connect(
            audio.destination
        );


        oscillator.start();

        oscillator.stop(
            audio.currentTime + 0.09
        );


        setTimeout(() => {

            if (
                audio &&
                audio.state !== "closed"
            ) {

                audio.close();

            }

        }, 150);

    }

    catch (error) {

        console.log(
            "Audio error:",
            error
        );

    }

}


/* =========================================
   تحميل البيانات
========================================= */

function loadTasbeeh() {

    const savedCount =
        localStorage.getItem(
            "zakkirni_count"
        );

    const todayCount =
        localStorage.getItem(
            "zakkirni_today"
        );

    const totalCount =
        localStorage.getItem(
            "zakkirni_total"
        );

    const savedDhikr =
        localStorage.getItem(
            "zakkirni_selected_dhikr"
        );


    count =
        savedCount
            ? Number(savedCount)
            : 0;


    if (savedDhikr) {

        selectedDhikr =
            savedDhikr;

    }


    updateScreen();


    if (todayElement) {

        todayElement.textContent =
            arabicNumbers(
                todayCount
                    ? Number(todayCount)
                    : 0
            );

    }


    if (totalElement) {

        totalElement.textContent =
            arabicNumbers(
                totalCount
                    ? Number(totalCount)
                    : 0
            );

    }


    const savedDhikrCount =
        localStorage.getItem(
            "zakkirni_saved_count"
        );


    if (savedElement) {

        savedElement.textContent =
            arabicNumbers(
                savedDhikrCount
                    ? Number(savedDhikrCount)
                    : 0
            );

    }

}


/* =========================================
   إضافة تسبيحة
========================================= */

function addTasbeeh() {

    count++;


    let today =
        Number(
            localStorage.getItem(
                "zakkirni_today"
            ) || 0
        );


    let total =
        Number(
            localStorage.getItem(
                "zakkirni_total"
            ) || 0
        );


    today++;

    total++;


    /* حفظ البيانات */

    localStorage.setItem(
        "zakkirni_count",
        count
    );


    localStorage.setItem(
        "zakkirni_today",
        today
    );


    localStorage.setItem(
        "zakkirni_total",
        total
    );


    localStorage.setItem(
        "zakkirni_selected_dhikr",
        selectedDhikr
    );


    /* تحديث الشاشة */

    updateScreen();


    if (todayElement) {

        todayElement.textContent =
            arabicNumbers(today);

    }


    if (totalElement) {

        totalElement.textContent =
            arabicNumbers(total);

    }


    /* تشغيل الصوت */

    playTasbeehSound();


    /* حركة الزر */

    if (tasbeehButton) {

        tasbeehButton.classList.add(
            "pressed"
        );


        setTimeout(() => {

            tasbeehButton.classList.remove(
                "pressed"
            );

        }, 120);

    }

}


/* =========================================
   اختيار الذكر
========================================= */

function selectDhikr(dhikr) {

    selectedDhikr =
        dhikr;


    count = 0;


    localStorage.setItem(
        "zakkirni_count",
        0
    );


    localStorage.setItem(
        "zakkirni_selected_dhikr",
        selectedDhikr
    );


    updateScreen();


    showMessage(
        "تم اختيار الذكر"
    );

}


/* =========================================
   تصفير العداد
========================================= */

function resetTasbeeh() {

    count = 0;


    localStorage.setItem(
        "zakkirni_count",
        0
    );


    updateScreen();


    showMessage(
        "تم تصفير العداد"
    );

}


/* =========================================
   حفظ التسبيح
========================================= */

function saveTasbeeh() {

    localStorage.setItem(
        "zakkirni_saved_dhikr",
        selectedDhikr
    );


    localStorage.setItem(
        "zakkirni_saved_count",
        count
    );


    if (savedElement) {

        savedElement.textContent =
            arabicNumbers(count);

    }


    showMessage(
        `تم حفظ ${arabicNumbers(count)} تسبيحة`
    );

}


/* =========================================
   تحديث العداد
========================================= */

function updateScreen() {

    if (countElement) {

        countElement.textContent =
            arabicNumbers(count);

    }


    if (selectedElement) {

        selectedElement.textContent =
            selectedDhikr;

    }

}


/* =========================================
   رسالة صغيرة
========================================= */

function showMessage(message) {

    if (!savedMessage) {
        return;
    }


    savedMessage.textContent =
        message;


    savedMessage.classList.add(
        "show"
    );


    setTimeout(() => {

        savedMessage.classList.remove(
            "show"
        );

    }, 2000);

}


/* =========================================
   الضغط على زر التسبيح
========================================= */

if (tasbeehButton) {

    tasbeehButton.addEventListener(
        "click",
        addTasbeeh
    );

}


/* =========================================
   زر Space للتسبيح
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.code === "Space" &&
            document.activeElement.tagName !==
            "BUTTON" &&
            document.activeElement.tagName !==
            "INPUT" &&
            document.activeElement.tagName !==
            "TEXTAREA"
        ) {

            event.preventDefault();

            addTasbeeh();

        }

    }
);


/* =========================================
   تشغيل الموقع
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadTasbeeh();

    }
);
// ========================================
// ذَكِّرني - التسبيح الإلكتروني
// ========================================


// العناصر
const tasbeehButton =
    document.getElementById("tasbeehButton");

const resetButton =
    document.getElementById("resetBtn");

const saveButton =
    document.getElementById("saveBtn");

const countElement =
    document.getElementById("tasbeehCount");

const currentDhikrElement =
    document.getElementById("currentDhikr");

const statDhikrElement =
    document.getElementById("statDhikr");

const statCountElement =
    document.getElementById("statCount");

const totalCountElement =
    document.getElementById("totalCount");

const dhikrOptions =
    document.querySelectorAll(".dhikr-option");


// ========================================
// البيانات
// ========================================

const STORAGE_KEY =
    "zakkirni_tasbeeh_data";


// ========================================
// البيانات الافتراضية
// ========================================

let tasbeehData = {

    currentDhikr: "سبحان الله",

    counts: {

        "سبحان الله": 0,

        "الحمد لله": 0,

        "الله أكبر": 0,

        "أستغفر الله": 0

    },

    total: 0

};


// ========================================
// تحويل الأرقام للعربي
// ========================================

function arabicNumbers(number) {

    return String(number).replace(
        /\d/g,
        digit => "٠١٢٣٤٥٦٧٨٩"[digit]
    );

}


// ========================================
// تحميل البيانات
// ========================================

function loadData() {

    try {

        const savedData =
            localStorage.getItem(
                STORAGE_KEY
            );

        if (!savedData) {

            updateUI();

            return;

        }


        const parsedData =
            JSON.parse(savedData);


        if (
            parsedData &&
            typeof parsedData === "object"
        ) {

            if (
                typeof parsedData.currentDhikr ===
                "string"
            ) {

                tasbeehData.currentDhikr =
                    parsedData.currentDhikr;

            }


            if (
                parsedData.counts &&
                typeof parsedData.counts ===
                "object"
            ) {

                Object.keys(
                    tasbeehData.counts
                ).forEach(dhikr => {

                    if (
                        typeof parsedData.counts[dhikr] ===
                        "number"
                    ) {

                        tasbeehData.counts[dhikr] =
                            Math.max(
                                0,
                                parsedData.counts[dhikr]
                            );

                    }

                });

            }


            if (
                typeof parsedData.total ===
                "number"
            ) {

                tasbeehData.total =
                    Math.max(
                        0,
                        parsedData.total
                    );

            }

        }

    } catch (error) {

        console.error(
            "خطأ في تحميل التسبيح:",
            error
        );

    }


    updateUI();

}


// ========================================
// حفظ البيانات
// ========================================

function saveData() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(tasbeehData)
        );

    } catch (error) {

        console.error(
            "خطأ في حفظ التسبيح:",
            error
        );

    }

}


// ========================================
// تحديث الواجهة
// ========================================

function updateUI() {

    const dhikr =
        tasbeehData.currentDhikr;


    const count =
        tasbeehData.counts[dhikr] || 0;


    currentDhikrElement.textContent =
        dhikr;


    countElement.textContent =
        arabicNumbers(count);


    statDhikrElement.textContent =
        dhikr;


    statCountElement.textContent =
        arabicNumbers(count);


    totalCountElement.textContent =
        arabicNumbers(
            tasbeehData.total
        );


    // تحديد الذكر الحالي

    dhikrOptions.forEach(button => {

        if (
            button.dataset.dhikr ===
            dhikr
        ) {

            button.classList.add(
                "active"
            );

        } else {

            button.classList.remove(
                "active"
            );

        }

    });

}


// ========================================
// صوت التسبيح
// ========================================

let audioContext = null;


function playTapSound() {

    try {

        if (!audioContext) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }


        if (
            audioContext.state ===
            "suspended"
        ) {

            audioContext.resume();

        }


        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();


        oscillator.type =
            "sine";


        oscillator.frequency.setValueAtTime(
            520,
            audioContext.currentTime
        );


        oscillator.frequency.exponentialRampToValueAtTime(
            700,
            audioContext.currentTime + 0.05
        );


        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.12,
            audioContext.currentTime + 0.01
        );


        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + 0.07
        );


        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );


        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + 0.08
        );

    } catch (error) {

        console.log(
            "الصوت غير متاح:",
            error
        );

    }

}


// ========================================
// زيادة التسبيحة
// ========================================

function increaseCount() {

    const dhikr =
        tasbeehData.currentDhikr;


    if (
        typeof tasbeehData.counts[dhikr] !==
        "number"
    ) {

        tasbeehData.counts[dhikr] =
            0;

    }


    tasbeehData.counts[dhikr]++;


    tasbeehData.total++;


    saveData();

    updateUI();

    playTapSound();


    // حركة بسيطة للزر

    tasbeehButton.classList.remove(
        "tasbeeh-click"
    );


    void tasbeehButton.offsetWidth;


    tasbeehButton.classList.add(
        "tasbeeh-click"
    );

}


// ========================================
// اختيار الذكر
// ========================================

dhikrOptions.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const selectedDhikr =
                this.dataset.dhikr;


            if (!selectedDhikr) {
                return;
            }


            tasbeehData.currentDhikr =
                selectedDhikr;


            saveData();

            updateUI();

        }
    );

});


// ========================================
// زر التسبيح
// ========================================

tasbeehButton.addEventListener(
    "click",
    increaseCount
);


// ========================================
// دعم زر المسافة
// ========================================

document.addEventListener(
    "keydown",
    function (event) {

        // منع زيادة العداد
        // لو المستخدم بيكتب في input

        const tag =
            document.activeElement?.tagName;


        if (
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT"
        ) {

            return;

        }


        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            increaseCount();

        }

    }
);


// ========================================
// زر التصفير
// ========================================

resetButton.addEventListener(
    "click",
    function () {

        const dhikr =
            tasbeehData.currentDhikr;


        const confirmed =
            confirm(
                `هل تريد تصفير عدد "${dhikr}"؟`
            );


        if (!confirmed) {
            return;
        }


        tasbeehData.counts[dhikr] =
            0;


        saveData();

        updateUI();

    }
);


// ========================================
// زر الحفظ
// ========================================

saveButton.addEventListener(
    "click",
    function () {

        saveData();


        const oldText =
            saveButton.textContent;


        saveButton.textContent =
            "✅ تم الحفظ";


        setTimeout(
            () => {

                saveButton.textContent =
                    oldText;

            },
            1200
        );

    }
);


// ========================================
// فتح القائمة في الموبايل
// ========================================

const menuBtn =
    document.getElementById(
        "menuBtn"
    );

const navLinks =
    document.getElementById(
        "navLinks"
    );


if (
    menuBtn &&
    navLinks
) {

    menuBtn.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle(
                "show"
            );

        }
    );

}


// ========================================
// تشغيل الموقع
// ========================================

loadData();

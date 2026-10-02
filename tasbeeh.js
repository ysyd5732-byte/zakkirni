const countEl = document.getElementById("tasbeehCount");
const currentDhikrEl = document.getElementById("currentDhikr");
const statDhikrEl = document.getElementById("statDhikr");
const statCountEl = document.getElementById("statCount");
const totalCountEl = document.getElementById("totalCount");

const tasbeehButton = document.getElementById("tasbeehButton");
const resetButton = document.getElementById("resetBtn");
const saveButton = document.getElementById("saveBtn");

const dhikrButtons =
    document.querySelectorAll(".dhikr-option");

const STORAGE_KEY = "zakkirni_tasbeeh";

let data = {
    current: "سبحان الله",
    counts: {
        "سبحان الله": 0,
        "الحمد لله": 0,
        "الله أكبر": 0,
        "أستغفر الله": 0
    },
    total: 0
};


/* تحميل */

function load() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (saved) {

            const parsed =
                JSON.parse(saved);

            if (parsed.current) {
                data.current = parsed.current;
            }

            if (parsed.counts) {
                Object.assign(
                    data.counts,
                    parsed.counts
                );
            }

            if (
                typeof parsed.total === "number"
            ) {
                data.total = parsed.total;
            }
        }

    } catch (error) {

        console.log(error);

    }

    update();

}


/* حفظ */

function save() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}


/* تحديث الشاشة */

function update() {

    const count =
        data.counts[data.current] || 0;

    currentDhikrEl.textContent =
        data.current;

    countEl.textContent =
        count;

    statDhikrEl.textContent =
        data.current;

    statCountEl.textContent =
        count;

    totalCountEl.textContent =
        data.total;


    dhikrButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.dhikr === data.current
        );

    });

}


/* صوت */

function sound() {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        const audio =
            new AudioContext();

        const oscillator =
            audio.createOscillator();

        const gain =
            audio.createGain();

        oscillator.frequency.value = 600;

        oscillator.type = "sine";

        gain.gain.value = 0.08;

        oscillator.connect(gain);

        gain.connect(
            audio.destination
        );

        oscillator.start();

        oscillator.stop(
            audio.currentTime + 0.06
        );

    } catch (error) {

        console.log(error);

    }

}


/* التسبيح */

function count() {

    data.counts[data.current]++;

    data.total++;

    save();

    update();

    sound();


    tasbeehButton.classList.remove(
        "tasbeeh-click"
    );

    void tasbeehButton.offsetWidth;

    tasbeehButton.classList.add(
        "tasbeeh-click"
    );

}


/* اختيار الذكر */

dhikrButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            data.current =
                button.dataset.dhikr;

            save();

            update();

        }
    );

});


/* زر التسبيح */

tasbeehButton.addEventListener(
    "click",
    count
);


/* التصفير */

resetButton.addEventListener(
    "click",
    () => {

        data.counts[data.current] = 0;

        save();

        update();

    }
);


/* الحفظ */

saveButton.addEventListener(
    "click",
    () => {

        save();

        const old =
            saveButton.textContent;

        saveButton.textContent =
            "✅ تم الحفظ";

        setTimeout(() => {

            saveButton.textContent =
                old;

        }, 1200);

    }
);


/* زر المسافة */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.code === "Space" &&
            !["INPUT", "TEXTAREA", "SELECT"]
                .includes(
                    document.activeElement.tagName
                )
        ) {

            event.preventDefault();

            count();

        }

    }
);


/* القائمة */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "show"
            );

        }
    );

}


load();
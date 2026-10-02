let currentSurah = 1;
let currentPage = 1;
let currentAyah = null;

let surahs = [];
let pages = [];

const surahSelect = document.getElementById("surahSelect");
const quranReader = document.getElementById("quranReader");

const prevButton = document.getElementById("prevSurah");
const nextButton = document.getElementById("nextSurah");


/* =========================
   أرقام عربية
========================= */

function arabicNumbers(number) {
    return String(number).replace(
        /\d/g,
        d => "٠١٢٣٤٥٦٧٨٩"[d]
    );
}


/* =========================
   تحميل السور
========================= */

async function loadSurahs() {

    try {

        const response = await fetch(
            "https://api.alquran.cloud/v1/surah"
        );

        if (!response.ok) {
            throw new Error();
        }

        const result = await response.json();

        surahs = result.data;

        surahSelect.innerHTML = "";

        surahs.forEach(surah => {

            const option =
                document.createElement("option");

            option.value = surah.number;

            option.textContent =
                `${arabicNumbers(surah.number)} — ${surah.name}`;

            surahSelect.appendChild(option);
        });


        const params =
            new URLSearchParams(
                window.location.search
            );

        const urlSurah =
            Number(params.get("surah"));

        const urlAyah =
            Number(params.get("ayah"));

        currentSurah =
            urlSurah >= 1 && urlSurah <= 114
                ? urlSurah
                : 1;

        currentAyah =
            urlAyah >= 1
                ? urlAyah
                : null;

        surahSelect.value =
            currentSurah;

        await loadSurah(currentSurah);

    } catch (error) {

        console.error(error);

        quranReader.innerHTML = `
            <div class="loading">
                ⚠️ حصلت مشكلة في تحميل القرآن.
                <br>
                تأكد من الإنترنت وجرب تاني.
            </div>
        `;
    }
}


/* =========================
   تحميل السورة
========================= */

async function loadSurah(surahNumber) {

    quranReader.innerHTML = `
        <div class="loading">
            ⏳ جاري تجهيز صفحات المصحف...
        </div>
    `;

    try {

        const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`
        );

        if (!response.ok) {
            throw new Error();
        }

        const result = await response.json();

        const surah = result.data;

        currentSurah =
            surah.number;

        /*
         * نقسم السورة إلى صفحات
         *
         * كل صفحة فيها مجموعة آيات
         * حتى تظهر مثل صفحات المصحف
         */

        pages = [];

        const ayahsPerPage = 12;

        for (
            let i = 0;
            i < surah.ayahs.length;
            i += ayahsPerPage
        ) {

            pages.push(
                surah.ayahs.slice(
                    i,
                    i + ayahsPerPage
                )
            );
        }


        /*
         * لو فيه آية جاية من قصص الأنبياء
         * نحدد الصفحة الخاصة بيها
         */

        if (currentAyah) {

            const index =
                surah.ayahs.findIndex(
                    ayah =>
                        ayah.numberInSurah ===
                        currentAyah
                );

            if (index !== -1) {

                currentPage =
                    Math.floor(
                        index / ayahsPerPage
                    ) + 1;

            } else {

                currentPage = 1;
            }

        } else {

            currentPage = 1;
        }


        localStorage.setItem(
            "zakkirni_last_surah",
            currentSurah
        );

        renderPage();

    } catch (error) {

        console.error(error);

        quranReader.innerHTML = `
            <div class="loading">
                ⚠️ حصلت مشكلة في تحميل السورة.
                <br><br>

                <button
                    class="save-btn"
                    onclick="loadSurah(${currentSurah})"
                >
                    🔄 إعادة المحاولة
                </button>
            </div>
        `;
    }
}


/* =========================
   عرض الصفحة
========================= */

function renderPage() {

    const page =
        pages[currentPage - 1];

    if (!page) return;


    const surah =
        surahs.find(
            s =>
                s.number === currentSurah
        );


    let html = `

        <div class="mushaf-page">

            <div class="mushaf-top">

                <span>
                    ${surah ? surah.name : ""}
                </span>

                <span>
                    صفحة ${arabicNumbers(currentPage)}
                </span>

            </div>

            <h2 class="quran-title">
                ${surah ? surah.name : ""}
            </h2>
    `;


    /*
     * البسملة
     */

    if (
        currentPage === 1 &&
        currentSurah !== 9
    ) {

        html += `
            <div class="basmala">
                ﷽
            </div>
        `;
    }


    /*
     * الآيات
     */

    html += `
        <div class="mushaf-text">
    `;


    page.forEach(ayah => {

        const target =
            currentAyah ===
            ayah.numberInSurah;


        html += `

            <span
                class="mushaf-ayah ${
                    target
                        ? "target-ayah"
                        : ""
                }"
                id="ayah-${ayah.numberInSurah}"
            >

                ${ayah.text}

                <span class="mushaf-number">
                    ۝${arabicNumbers(
                        ayah.numberInSurah
                    )}
                </span>

            </span>

        `;
    });


    html += `
        </div>

        <div class="mushaf-page-number">
            ${arabicNumbers(currentPage)}
        </div>

        </div>
    `;


    quranReader.innerHTML =
        html;


    updateButtons();


    /*
     * تحديد الآية
     */

    if (currentAyah) {

        setTimeout(() => {

            const target =
                document.getElementById(
                    `ayah-${currentAyah}`
                );

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }, 300);
    }
}


/* =========================
   التالي
========================= */

function nextPage() {

    if (
        currentPage <
        pages.length
    ) {

        currentPage++;

        currentAyah = null;

        renderPage();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


/* =========================
   السابق
========================= */

function previousPage() {

    if (currentPage > 1) {

        currentPage--;

        currentAyah = null;

        renderPage();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


/* =========================
   تغيير السورة
========================= */

surahSelect.addEventListener(
    "change",
    async function () {

        currentSurah =
            Number(this.value);

        currentAyah = null;

        currentPage = 1;

        history.replaceState(
            null,
            "",
            `quran.html?surah=${currentSurah}`
        );

        await loadSurah(
            currentSurah
        );
    }
);


/* =========================
   أزرار التنقل
========================= */

prevButton.addEventListener(
    "click",
    previousPage
);

nextButton.addEventListener(
    "click",
    nextPage
);


/* =========================
   تحديث الأزرار
========================= */

function updateButtons() {

    prevButton.disabled =
        currentPage <= 1;

    nextButton.disabled =
        currentPage >= pages.length;


    /*
     * تغيير النص
     */

    prevButton.innerHTML =
        "← الصفحة السابقة";

    nextButton.innerHTML =
        "الصفحة التالية →";
}


/* =========================
   موبايل
========================= */

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
        () => {

            navLinks.classList.toggle(
                "show"
            );

        }
    );
}


/* =========================
   تشغيل
========================= */

loadSurahs();
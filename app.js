/* ==================================================
   ذَكِّرني - التطبيق الرئيسي
   مواقيت الصلاة + قائمة الموبايل
================================================== */


/* ==================================================
   مواقيت الصلاة
   القاهرة - 2 أكتوبر 2026
================================================== */

const prayerTimes = [
    {
        name: "الفجر",
        time: "٥:٣٠",
        period: "الصبح",
        icon: "🌅"
    },

    {
        name: "الضهر",
        time: "١٢:٤٤",
        period: "الضهر",
        icon: "☀️"
    },

    {
        name: "العصر",
        time: "٤:٠٧",
        period: "العصر",
        icon: "🌤️"
    },

    {
        name: "المغرب",
        time: "٦:٣٩",
        period: "المغرب",
        icon: "🌇"
    },

    {
        name: "العِشا",
        time: "٧:٥٩",
        period: "بالليل",
        icon: "🌙"
    }
];


/* ==================================================
   عرض مواقيت الصلاة
================================================== */

function loadPrayerTimes() {

    const container =
        document.getElementById("prayerTimes");


    /* لو العنصر مش موجود */
    if (!container) {
        return;
    }


    /* عرض المواقيت */

    container.innerHTML = prayerTimes.map(
        prayer => {

            return `
                <div class="prayer-card">

                    <div class="prayer-icon">
                        ${prayer.icon}
                    </div>

                    <div class="prayer-info">

                        <h3>
                            ${prayer.name}
                        </h3>

                        <p>
                            الساعة
                            ${prayer.time}
                            ${prayer.period}
                        </p>

                    </div>

                </div>
            `;

        }
    ).join("");

}


/* ==================================================
   القائمة في الموبايل
================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


if (menuBtn && navLinks) {

    menuBtn.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle("show");

        }
    );

}


/* ==================================================
   إغلاق القائمة بعد اختيار صفحة
================================================== */

if (navLinks) {

    const links =
        navLinks.querySelectorAll("a");


    links.forEach(link => {

        link.addEventListener(
            "click",
            function () {

                navLinks.classList.remove(
                    "show"
                );

            }
        );

    });

}


/* ==================================================
   تشغيل الموقع
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadPrayerTimes();

    }
);
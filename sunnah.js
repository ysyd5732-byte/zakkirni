const sunnahs = [

    {
        title: "السنن الرواتب",
        icon: "🕌",
        text:
            "السنن الرواتب من النوافل المرتبطة بالصلوات المفروضة، وقد وردت في السنة أحاديث في فضل المحافظة عليها."
    },

    {
        title: "السواك",
        icon: "🌿",
        text:
            "السواك من سنن الفطرة، وكان النبي ﷺ يحث عليه ويستعمله."
    },

    {
        title: "إفشاء السلام",
        icon: "🤝",
        text:
            "إفشاء السلام من الأخلاق الإسلامية العظيمة، ويزيد المودة بين المسلمين."
    },

    {
        title: "التسمية قبل الطعام",
        icon: "🍽️",
        text:
            "من آداب الطعام أن يسمي المسلم الله قبل أن يأكل، وأن يأكل بيمينه."
    },

    {
        title: "حمد الله بعد الطعام",
        icon: "🥣",
        text:
            "يحمد المسلم الله بعد الطعام على نعمة الطعام والشراب."
    },

    {
        title: "آداب النوم",
        icon: "🛏️",
        text:
            "من هدي النبي ﷺ أذكار النوم والاستعداد للنوم وذكر الله."
    },

    {
        title: "صلة الرحم",
        icon: "👨‍👩‍👦",
        text:
            "صلة الرحم تكون بالسؤال عن الأقارب وزيارتهم ومساعدتهم والإحسان إليهم."
    },

    {
        title: "الابتسامة والكلمة الطيبة",
        icon: "😊",
        text:
            "الكلمة الطيبة وحسن التعامل من الأخلاق الحسنة التي يحبها الإسلام."
    },

    {
        title: "الدعاء",
        icon: "🤲",
        text:
            "الدعاء عبادة، ويسأل المسلم ربه الخير في الدنيا والآخرة."
    }

];


const grid =
    document.getElementById("sunnahGrid");

const reader =
    document.getElementById("sunnahReader");


function renderSunnahs() {

    grid.innerHTML =
        sunnahs.map((item,index) => `

            <button
                class="feature-card sunnah-card"
                onclick="openSunnah(${index})">

                <div class="card-icon">
                    ${item.icon}
                </div>

                <h3>
                    ${item.title}
                </h3>

                <p>
                    ${item.text.substring(0,80)}...
                </p>

                <b>
                    افتح السنة ←
                </b>

            </button>

        `).join("");
}


function openSunnah(index) {

    const item =
        sunnahs[index];

    reader.innerHTML = `

        <div class="reader-title">

            <div class="reader-title-icon">
                ${item.icon}
            </div>

            <div>

                <small>
                    سنة وآداب
                </small>

                <h2>
                    ${item.title}
                </h2>

            </div>

        </div>

        <p>
            ${item.text}
        </p>

    `;

    reader.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


renderSunnahs();


const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");

if (menuBtn) {

    menuBtn.onclick = () => {
        navLinks.classList.toggle("show");
    };

}